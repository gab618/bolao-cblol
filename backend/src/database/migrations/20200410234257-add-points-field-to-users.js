module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'points', {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'points');
  },
};
