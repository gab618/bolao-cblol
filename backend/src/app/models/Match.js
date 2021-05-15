import Sequelize, { Model } from 'sequelize';

class Match extends Model {
  static init(sequelize) {
    super.init(
      {
        start_time: Sequelize.DATE,
        winner: Sequelize.INTEGER,
        is_bo5: Sequelize.BOOLEAN,
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
    this.belongsTo(models.Round, { foreignKey: 'round_id', as: 'round' });
  }
}

export default Match;
