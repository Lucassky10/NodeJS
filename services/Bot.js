import DiscordClient from "./DiscordClient";
import Database from "./Database";
import CommandsHandler from "./CommandsHandler";
import moment from 'moment';
 
export default class Bot {

    constructor() {

        this.client = new DiscordClient();
        this.db = new Database();



        this.client.on('message', async (msg) => {

        


            this.command = new CommandsHandler(msg);
            this.commandSplit = this.command.split();

            if(this.command.isCommand()){
                
                try{
                    await this.onMessage();
                } catch(e) {
                    console.log(e);
                }
            }

        });

    }

    async onMessage() {

        let msgInfo = {

            guild :  {
                id : this.command.getDiscordServerId(),
                nom : this.command.getGuild().name,
                guildObject : this.command.getGuild(),
                member : this.command.getGuildMember()
            },
            auteur : {
                id : this.command.getAuthorId(),
                auteurObject : this.command.getAuthor()
            }

        }

        let idLocalServer = await this.getLocalServerId([msgInfo.guild.id])


        let numAutorite = await this.getNumAutoriteAuthor([idLocalServer, msgInfo.auteur.id])

        if(numAutorite !== false) {

            let niveauAutoriteCommande  = await this.getNiveauAutoriteCommande([this.commandSplit[0].substr(1)])


            if(niveauAutoriteCommande !== false) {

                if(numAutorite <= niveauAutoriteCommande) {
          
                    this.executeCommand(this.commandSplit[0], msgInfo, idLocalServer);        

                } else {
                this.command.msg.reply("Vous n'avez pas les droits pour effectuer cette opération !");

                }


            } else {
                this.command.msg.reply('La commande ' + this.commandSplit[0] + ' n\'existe pas. ' + await this.getCommmandesDisponibles());

            }
        }

   }

   async getLocalServerId(params) {


    let result = await this.db.query('Select id from serveurs where id_discord=$1', params);

    return result.rows[0].id;

}
 
    async getNumAutoriteAuthor(params) {

        let result = await this.db.query("Select num from roles where id_serveur=$1 and id_user_discord=$2", params);
        if(result.rowCount > 0) {
            return result.rows[0].num;
        } else {
            return false;
        }
    }

    async getNiveauAutoriteCommande(params) {

       let result = await this.db.query('Select niveau_autorite as num from commandes where nom=$1 and disponible = true', params);
        
       if(result.rowCount > 0) {
           return result.rows[0].num;
       } else {
           return false;
       }

    }

    async getCommmandesDisponibles() {

        let result = await this.db.query("select nom from Commandes where disponible = true");
        let i=0;
        let texte = null;
        if(result.rowCount > 0) {
            texte="Les commandes disponibles sont "
            while (i<result.rowCount) {
                if(i === result.rowCount - 1) {
                    texte=texte + "!" + result.rows[i].nom + ".";
                } else {
                    texte=texte + "!" + result.rows[i].nom + ", ";
                }
                i++;
            }
        } else {
            texte = "Aucune commande n'est disponible !";
        }
       
        return texte;

    }

    async executeCommand(command, msgInfo, idLocalServer) {

        let params = null;
        let res = null;
        let newrole = null;
        // let commandesDisponibles = await
        switch(command) {

            case '!ban':
                // para = ['ban'];


                    await this.command.get1stMentioned().send('Votre comportement n\'est pas adapté, vous êtes banni de ' + msgInfo.guild.nom  + ' pour la raison suivante : ' + this.commandSplit[3] + ', pour une durée de ' + this.commandSplit[2] + ' jours');

                    msgInfo.guild.member.ban({reason: this.commandSplit[3]});

                    params = [idLocalServer, msgInfo.auteur.id, msgInfo.guild.member.id, 'ban', moment().format('YYYY-MM-DD HH:mm:ss'), moment().add(this.commandSplit[2], 'days').format('YYYY-MM-DD  HH:mm:ss'), this.commandSplit[3]];
                    res = this.db.query('insert into sanctions (id_serveur, id_moderateur_discord, id_user_discord, commande, date_debut, date_fin,raison) values ($1, $2, $3, $4, $5,$6,$7)', params);

            break;

            case '!kick':
                // para = ['kick'];

                    this.command.get1stMentioned().send('Votre comportement n\'est pas adapté, vous êtes exclu de ' + msgInfo.guild.nom  + ' pour la raison suivante : ' + this.commandSplit[2]);

                    msgInfo.guild.member.kick()
                    .then(() => console.log(`Kicked ${member.displayName}`))
                    params = [idLocalServer, msgInfo.auteur.id, msgInfo.guild.member.id, 'kick', moment().format('YYYY-MM-DD HH:mm:ss'), this.commandSplit[2]];
                    res = this.db.query('insert into sanctions (id_serveur, id_moderateur_discord, id_user_discord, commande, date_debut,raison) values ($1, $2, $3, $4, $5,$6)', params);

            break;

            case '!mute':
                // para = ['mute'];

                    let mute = null;
                    msgInfo.guild.guildObject.roles.tap(roles => {
                        if (roles.name === 'Mute') {
                            (mute = roles.id)
                        }
                    });
                    msgInfo.guild.member.addRole(mute, this.commandSplit[3]);

                    params = [idLocalServer, msgInfo.auteur.id, msgInfo.guild.member.id, 'mute', moment().format('YYYY-MM-DD HH:mm:ss'), moment().add(this.commandSplit[2], 'days').format('YYYY-MM-DD  HH:mm:ss'), this.commandSplit[3]];
                    console.log(params);
                    res = this.db.query('insert into sanctions (id_serveur, id_moderateur_discord, id_user_discord, commande, date_debut, date_fin,raison) values ($1, $2, $3, $4, $5,$6,$7)', params);

            break;

            case '!rankup':
                // para = ['rankup'];
                    newrole = null;

                    msgInfo.guild.guildObject.roles.tap(roles => {
                        if (roles.name === this.commandSplit[2]) {
                            (newrole = roles.id)
                        }
                    });
                    if (newrole != null) {
                        msgInfo.guild.member.addRole(newrole, this.commandSplit[3]);

                        this.command.msg.reply('Le role ' + this.commandSplit[2] + ' a bien été ajouté à ' + this.command.msg.mentions.users.first().username);
                    } else {
                        this.command.msg.reply('Le role ' + this.commandSplit[2] + ' n\'existe pas');
                    }


            break;

            case '!rankdown':
                            // para = ['rankdown'];
                    newrole = null;
                    msgInfo.guild.guildObject.roles.tap(roles => {
                        if (roles.name === this.commandSplit[2]) {
                            (newrole = roles.id)
                        }
                    });
                    if (newrole != null) {
                        msgInfo.guild.member.removeRole(newrole, this.commandSplit[3]);

                        this.command.msg.reply('Le role ' + this.commandSplit[2] + ' a bien été enlevé à ' + this.command.get1stMentioned().username);
                    } else {
                        this.command.msg.reply( this.command.get1stMentioned().username + ' ne possède pas le role ' + this.commandSplit[2]);
                    }
            break;
            case '!warn':
                // para = ['warn'];

                    this.command.get1stMentioned().send('Attention votre comportement n\'est pas adapté, vous recevez un avertissement pour la raison suivante : ' + this.commandSplit[2]);
                    params = [idLocalServer, msgInfo.auteur.id, msgInfo.guild.member.id, 'warn', moment().format('YYYY-MM-DD HH:mm:ss'), this.commandSplit[2]];
                    res =  this.db.query('insert into sanctions (id_serveur, id_moderateur_discord, id_user_discord, commande, date_debut,raison) values ($1, $2, $3, $4, $5,$6)', params);

            break;
            default:

                this.command.msg.reply('La commande ' + command + ' n\'existe pas. ' + await this.getCommmandesDisponibles());
            
            break;

        }

    } 


}