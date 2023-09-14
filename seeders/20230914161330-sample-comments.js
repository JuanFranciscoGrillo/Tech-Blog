'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Comments', [{
      text: 'This is a comment for post 1 by user 1.',
      userId: 1, 
      postId: 1, 
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      text: 'This is another comment for post 1 by user 2.',
      userId: 2, 
      postId: 1, 
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Comments', null, {});
  }
};
