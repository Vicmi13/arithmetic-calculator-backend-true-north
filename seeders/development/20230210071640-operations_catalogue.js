/* eslint-disable strict */

"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("operations", [
      {
        type: "addition",
        cost: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: "substraction",
        cost: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: "multiplication",
        cost: 2.5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: "division",
        cost: 2.5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: "square-root",
        cost: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: "random-string",
        cost: 0.5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("operations", null, {});
  },
};
