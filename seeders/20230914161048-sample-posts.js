'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Posts', [{
      title: 'Sample Post 1',
      content: 'This is the content for the sample post 1.',
      userId: 1, 
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Sample Post 2',
      content: 'This is the content for the sample post 2.',
      userId: 2, 
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Posts', null, {});
  }
};
