import { Sequelize } from 'sequelize';
import databaseConfig from '../config/database';

import User from '../app/models/User';
import File from '../app/models/File';
import Team from '../app/models/Team';
import Match from '../app/models/Match';
import Bet from '../app/models/Bet';
import Round from '../app/models/Round';
import Bo5Bet from '../app/models/Bo5Bet';

const models = [User, File, Team, Match, Bet, Round, Bo5Bet];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
