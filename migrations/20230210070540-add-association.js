/* eslint-disable implicit-arrow-linebreak */
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface
      .addColumn("Records", "userId", {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      })
      .then(() =>
        queryInterface.addColumn("Records", "operationId", {
          type: Sequelize.INTEGER,
          references: {
            model: "Operations",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        })
      ),
  down: (queryInterface, Sequelize) =>
    // remove distribution_notifications hasOne distributions, siteId, userId
    queryInterface
      .removeColumn("Records", "userId")
      .then(() => queryInterface.removeColumn("Records", "operationId")),
};
