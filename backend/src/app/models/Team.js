import Sequelize, { Model } from 'sequelize';

class Team extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        image: Sequelize.STRING,
        code: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default Team;
