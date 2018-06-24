const Discord = require('discord.js');
const client = new Discord.Client();
const YTDL = require("ytdl-core");

var prefix = "fth";

var servers = {};

var servers = {};

function play(connection, message) {
    var server = servers[message.guild.id];

    server.dispatcher = connection.playStream(YTDL(server.queue[0], { filter: 
    "audioonly" }));

    server.dispatcher.setVolume(0.2);

    server.queue.shift();

    server.dispatcher.on("end", function () {

    if (server.queue[0]) play(connection, message);
    else connection.disconnect();

});

}

client.login("NDQ5MjQyMDE2MTc4NjM0NzUy.Deh0zQ.BTbGg4KT2mv92R7jIWxTT5JbHBw");

client.on("ready", () => {
    client.user.setStatus("dnd");
console.log("Ready to botter le cul à tsukiyo");
client.user.setPresence({ game: { name: `fthaide | ${client.guilds.size} serveurs | FrenchTryHard`,  type: 0} });
});


client.on('message', message => { 

    if(message.content === "FrenchTryBot ?"){
        message.reply("Bonjour monsieur ou madame, je suis un prototype de monsieur Laïkitu, mes commandes sont avec le fthaide");
        console.log('Le bot dit la phrase Bonjour monsieur...');
    }
    if(message.content === prefix + "botinvite"){
        message.reply(":heart: Invitation du bot >> https://discordapp.com/api/oauth2/authorize?client_id=449242016178634752&permissions=8&scope=bot");
        console.log('Invite demandée');
    }
    if(message.content === prefix + "aide"){
        var help_embed = new Discord.RichEmbed()
        .setColor("#66CCFF")
        .setTitle("Page 1 !")
        .setDescription ("Un bot au début, c'est pas très facile, voici une liste des commandes pour vous y habituer")
        .addField(":question: fthaide", "Affiche les commandes du bot")
        .addField(":chart_with_upwards_trend: fthstatistiques", "Affiche vos stats")
        .addField(":rocket: fthkick @(quelqu'un)", 'Le bot kick la personne')
        .addField(":satellite_orbital: fthban @(quelqu'un)", 'Le bot ban la personne')
        .addField(":confetti_ball: fthclear (nombre)", 'Le bot clear le chat')
        .addField(":x: fthmute @(quelqu'un)", 'Le bot mute quelqu un')
        .addField(":heavy_check_mark: fthunmute @(quelqu'un)", 'Le bot unmute quelqu un')
        .addField(":heart: fthbotinvite", 'Vous obtenez l invitation pour avoir le bot')
        .addField(":fast_forward: fthaide 2", 'Nous vous affichons la deuxième page des commandes')
        .setFooter("Notre serveur => https://discord.gg/jeJgzbf bot développé par Laïkitu. FTH")
        .setThumbnail(message.author.avatarURL)
        message.channel.sendMessage(help_embed);
        console.log("Un user a effectué la commande d'aide")
    }
    if(message.content === prefix + "aide 2"){
        var help_embed = new Discord.RichEmbed()
        .setColor("#66CCFF")
        .setTitle("Page 2 !")
        .setDescription ("Un bot au début, c'est pas très facile, voici une liste des commandes pour vous y habituer")
        .addField("--------------", 'Fonctionnalités bêta')
        .addField(":warning: Attention : bêta", 'Ceci peut ne pas marcher et faire dysfonctionner les commandes')
        .addField(":tools: Si cela se produit", 'Ajoutez @Agent "Stealth" Laïkitu -frth#8170 en amis')
        .addField(":arrow_forward: fthplay (lien)", 'Le bot joue un son')
        .addField(":fast_forward: fthskip", 'Le bot fait le son suivant')
        .addField(":stop_button: fthstop", 'Le bot arrête la musique')
        .addField(":bust_in_silhouette: FrenchTryBot ?", "Le bot répond")
        .setThumbnail(message.author.avatarURL)
        message.channel.sendMessage(help_embed);
        console.log("Un user a effectué la commande d'aide 2")
    }
    
    if (!message.content.startsWith(prefix)) return;

    var args = message.content.substring(prefix.length).split(" ");
    switch (args[0]) {
        case "play":
               if (!args[1]) {
                   message.reply("Vous devez mettre un lien !")
                   return;
               }

               if (!message.member.voiceChannel) {
                   message.channel.send("Vous devez être dans un channel vocal")
                   return;

               }

               if (!servers[message.guild.id]) servers[message.guild.id] = {
                   queue: []
               }

               var server = servers[message.guild.id];
       
               server.queue.push(args[1]);
       
               if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function (connection) {
                       play(connection, message);

               });
               break;
        case "skip":
               var server = servers[message.guild.id];
       
               if (server.dispatcher) server.dispatcher.end();
               break;
       
        case "stop":
               var server = servers[message.guild.id];
       
               if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
               break;
       }
    switch (args[0].toLowerCase()) {
        case "statistiques":

        var userCreateDate = message.author.createdAt.toString().split(" ");

        var stats_embed = new Discord.RichEmbed()
        
        .setColor("#66CCFF")
        .setTitle(`Statistiques de l'utilisateur : ${message.author.username}`)
        .addField("Date de création de l'utilisateur :", userCreateDate[1] + ' ' + userCreateDate[2] + ' ' + userCreateDate[3])
        .addField(" :robot: Statistiques du bot :", `${client.user.tag}`, true)
        .addField(":hash: Hashtag du bot", `#${client.user.discriminator}`)
        .addField(":black_joker: Nombre de membres :", message.guild.members.size)
        .addField(":telephone_receiver: Nombre de catégories et de salons :", message.guild.channels.size)
        .setFooter("https://discord.gg/jeJgzbf")
        .setThumbnail(message.author.avatarURL)
        message.reply({embed: stats_embed})
        break;
    }
    if(message.content.startsWith(prefix + "kick")) {
        if(!message.guild.member(message.author).hasPermissions("KICK_MEMBERS")) return message.channel.send("Tu n'as pas les permissions !");

        if(message.mentions.users.size === 0) {
            return message.channel.send("Vous devez mentionner un utilisateur :(")
        }

        var kick = message.guild.member(message.mentions.users.first());
        if(!kick) {
            return message.channel.send("L'utilisateur existe t-il ou c'est un fail ?")

        }

        if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) {
            return message.channel.send ("Je n'ai pas la permission. Tu me déçois je croyais que nous étions frères :'( ");
        }
        
        kick.kick().then(member => {
            message.channel.send(`${member.user.username} à été kick par ${message.author.username}`)
        });
    }

    if(message.content.startsWith(prefix + "ban")) {
        if(!message.guild.member(message.author).hasPermissions("BAN_MEMBERS")) return message.channel.send("Tu n'as pas les permissions !");

        if(message.mentions.users.size === 0) {
            return message.channel.send("Vous devez mentionner un utilisateur :(")
        }

        var kick = message.guild.member(message.mentions.users.first());
        if(!kick) {
            return message.channel.send("L'utilisateur existe t-il ou c'est un fail ?")

        }

        if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) {
            return message.channel.send ("Je n'ai pas la permission. Tu me déçois je croyais que nous étions frères :'( ");
        }
        
        kick.kick().then(member => {
            message.channel.send(`:bomb: ${member.user.username} à été banni par ${message.author.username} :crossed_swords: `)
        });
    }

    if(message.content.startsWith(prefix + "clear")) {
        if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGE")) return message.channel.send("Vous n'avez pas la permission :'( ");

        let args = message.content.split(" ").slice(1);

        if(!args[0]) return message.channel.send("Tu dois préciser un nombre de messages à supprimer !")
        message.channel.bulkDelete(args[0]).then(() => {
            message.channel.send(`${args[0]} messages ont été supprimés ! :tada: `);
        })
    }

    if(message.content.startsWith(prefix + "mute")) {
        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission !");
 
        if(message.mentions.users.size === 0) {
            return message.channel.send('Vous devez mentionner un utilisateur !');
        }
 
        var mute = message.guild.member(message.mentions.users.first());
        if(!mute) {
            return message.channel.send("Je n'ai pas trouvé l'utilisateur ou il l'existe pas !");
        }
 
        if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send("Je n'ai pas la permission !");
        message.channel.overwritePermissions(mute, { SEND_MESSAGES: false}).then(member => {
            message.channel.send(`${mute.user.username} est mute ! :shield: `);
        })
    }    
    if(message.content.startsWith(prefix + "unmute")) {
        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission !");
 
        if(message.mentions.users.size === 0) {
            return message.channel.send('Vous devez mentionner un utilisateur !');
        }
 
        var mute = message.guild.member(message.mentions.users.first());
        if(!mute) {
            return message.channel.send("Je n'ai pas trouvé l'utilisateur ou il l'existe pas !");
        }
 
        if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send("Je n'ai pas la permission !");
        message.channel.overwritePermissions(mute, { SEND_MESSAGES: true}).then(member => {
            message.channel.send(`${mute.user.username} n'est plus mute ! :white_check_mark: `);
        })
    }    
});