import DiscordClient from "./DiscordClient";
import Database from "./Database";
import sha1 from 'sha1';
import generator from 'generate-password'



export default class PanelEvents {

    constructor() {

        this.db = new Database();
        this.client = new DiscordClient();
        this.onGuildCreate();
        this.onGuildDelete();
    
    }

    onGuildCreate() {


        this.client.on('guildCreate', async guild => {
            let members = guild.members;
            let owner = guild.ownerID;
            let generatedPassword = generator.generate({
                length: 10,
                numbers: true
            });
            let pwd = sha1(generatedPassword);
            let insertUser = "INSERT INTO membres VALUES ('"+ owner + "', '" + pwd + "')";

            try{
                await this.db.query(insertUser);
            }catch (e) {
                console.log(e);
            }

            members.tap(member => {
                if (member.id === owner) {
                    member.send('Identifiant : ' + owner + '\nMot de passe : ' + generatedPassword);
                }
            });
        });


    }

    onGuildDelete() {


        this.client.on('guildDelete', async guild => {
            let owner = guild.ownerID;
            let deleteUser = "DELETE FROM membres WHERE id_discord = '" + owner + "'";
            try{
                this.db.query(deleteUser);
            } catch(e) {
                console.log(e);
            }
        });


    }

}
