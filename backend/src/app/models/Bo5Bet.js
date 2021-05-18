import Sequelize, { Model } from 'sequelize';

class Bo5Bet extends Model {
  static init(sequelize) {
    super.init(
      {
        date: Sequelize.DATE,
        blue_team_wins: Sequelize.INTEGER,
        red_team_wins: Sequelize.INTEGER,
        win: Sequelize.BOOLEAN,
        completed: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.Match, { foreignKey: 'match_id', as: 'match' });
  }
}

export default Bo5Bet;
