module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('bets', 'completed', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('bets', 'completed');
  },
};
