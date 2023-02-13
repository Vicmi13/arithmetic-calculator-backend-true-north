/** @type {import('sequelize-cli').Migration} */

/**TODO AGREGAR CAMPO SOFT DELETE */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Records", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      amount: {
        type: Sequelize.FLOAT,
      },
      user_balance: {
        type: Sequelize.FLOAT,
      },
      operation_response: {
        type: Sequelize.STRING,
      },
      is_archived: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Records");
  },
};
