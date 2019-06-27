'use strict';

export default class CommandsHandler {

    constructor(msg) {
        this.msg = msg;
        this.command = msg.content;
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
        return this.msg.author.id;
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


};