import Sequelize, { Model } from 'sequelize';

class Round extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        start_time: Sequelize.DATE,
        completed: Sequelize.BOOLEAN,
        strategy: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.hasMany(models.Match, { foreignKey: 'round_id', as: 'round' });
  }
}

export default Round;
