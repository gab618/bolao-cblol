module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('bets', 'win', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('bets', 'win');
  },
};
