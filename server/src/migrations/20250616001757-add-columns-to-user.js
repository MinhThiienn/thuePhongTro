"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Users", "isAdmin", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });

    await queryInterface.addColumn("Users", "balance", {
      type: Sequelize.FLOAT,
      defaultValue: 0,
    });

    await queryInterface.addColumn("Users", "vipLevel", {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    });

    await queryInterface.addColumn("Users", "vipExpire", {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Users", "isAdmin");
    await queryInterface.removeColumn("Users", "balance");
    await queryInterface.removeColumn("Users", "vipLevel");
    await queryInterface.removeColumn("Users", "vipExpire");
  },
};
