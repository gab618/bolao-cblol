module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('teams', 'code', {
      type: Sequelize.STRING,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('teams', 'code');
  },
};
