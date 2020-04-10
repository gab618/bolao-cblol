module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('matches', 'round_id', {
      type: Sequelize.INTEGER,
      references: { model: 'rounds', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('matches', 'round_id');
  },
};
