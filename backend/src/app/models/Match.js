import Sequelize, { Model } from 'sequelize';

class Match extends Model {
  static init(sequelize) {
    super.init(
      {
        start_time: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Team, { foreignKey: 'blue_team', as: 'blue' });
    this.belongsTo(models.Team, { foreignKey: 'red_team', as: 'red' });
  }
}

export default Match;