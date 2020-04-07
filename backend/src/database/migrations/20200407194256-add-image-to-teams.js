module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('teams', 'image', {
      type: Sequelize.STRING,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('teams', 'image');
  },
};
