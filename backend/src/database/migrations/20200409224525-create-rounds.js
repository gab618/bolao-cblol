module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('rounds', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      start_time: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      completed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      strategy: {
        type: Sequelize.STRING,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('rounds');
  },
};
