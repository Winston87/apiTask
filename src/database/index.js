import Sequelize from 'sequelize';
import dataBaseConfig from '../config/database';

import User from '../app/model/user';

import Task from '../app/model/Task';
// configuraçao do banco com os model para se comunicar

const models = [User,Task ];

class Database {

    constructor() {

        this.init();

    }

    init() {
        //conexao do banco com os model
        this.connection = new Sequelize(dataBaseConfig);

        //faz a conexao e carrega os models
        models.map(model => model.init(this.connection)).
        map(model => model.associate && model.associate(this.connection.models));
    }
}

export default new Database();
