module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('matches', 'winner', {
      type: Sequelize.INTEGER,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('matches', 'winner');
  },
};
