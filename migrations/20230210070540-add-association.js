/* eslint-disable implicit-arrow-linebreak */
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface
      .addColumn("Records", "id_user", {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      })
      .then(() =>
        queryInterface.addColumn("Records", "id_operation", {
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
      .removeColumn("Records", "id_user")
      .then(() => queryInterface.removeColumn("Records", "id_operation")),
};
