module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('matches', 'blue_team_wins', {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('matches', 'blue_team_wins');
  },
};
