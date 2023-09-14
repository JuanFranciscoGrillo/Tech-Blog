'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      username: 'sampleUser1',
      password: 'password123',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: 'sampleUser2',
      password: 'password456',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
