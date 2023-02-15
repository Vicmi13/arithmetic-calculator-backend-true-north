/* eslint-disable implicit-arrow-linebreak */
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface
      .addColumn("records", "userId", {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      })
      .then(() =>
        queryInterface.addColumn("records", "operationId", {
          type: Sequelize.INTEGER,
          references: {
            model: "operations",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        })
      ),
  down: (queryInterface, Sequelize) =>
    // remove distribution_notifications hasOne distributions, siteId, userId
    queryInterface
      .removeColumn("records", "userId")
      .then(() => queryInterface.removeColumn("records", "operationId")),
};
