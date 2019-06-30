'use strict';

import Database from "./Database";

export default class CommandsHandler {

    constructor(msg) {
        this.msg = msg;
        this.command = msg.content;
        this.db = new Database();
    }

    isCommand() {
        return this.command.charAt(0) === '!';
    }

    split() {
        return this.command.split(' ');
    }

    getDiscordServerId() {
        return this.msg.guild.id;
    }

    getAuthor() {
        return this.msg.author;
    }

    getAuthorId() {
        return String(this.msg.author.id);
    }

    getGuild() {
        return this.msg.guild;
    }

    getGuildMember(){
        return this.getGuild().member(this.msg.mentions.users.first());
    }
    getGuildMemberID(){
        return this.getGuildMember().id;
    }

    get1stMentioned() {
        return this.msg.mentions.users.first();
    }

    async getAvailableCommands() {

        let result = await this.db.query("SELECT nom FROM Commandes WHERE disponible = true");
        let commands = [];


        console.log(result.rows);


    }


};