'use strict';

export default class CommandsHandler {

    constructor(msg) {
        this.msg = msg;
        this.command = mdg.content;
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

    getAuthorId() {
        return this.msg.author.id;
    }


};