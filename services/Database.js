'use strict';

import pg from 'pg'

export default class Database {

    constructor() {
        this.url = "pg://postgres:postgres@localhost:5432/Discord";
        this.db = new pg.Client(this.url);
        this.db.connect();
        console.log(pg);
        return this.db;
    }

    async query(sql, params) {

        return await this.db.query(sql, params).rows;

    }




};