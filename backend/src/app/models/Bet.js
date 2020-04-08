import Sequelize, { Model } from 'sequelize';

class Bet extends Model {
  static init(sequelize) {
    super.init(
      {
        date: Sequelize.DATE,
        choice: Sequelize.INTEGER,
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

export default Bet;
