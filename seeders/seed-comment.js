'use strict';


module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkInsert('Comments', [
        {
          text: 'This is my first comment on a post.',
          userId: 1,
          postId: 1, 
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          text: 'Im leaving another comment here.',
          userId: 2, 
          postId: 1, 
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ], {});
      
      console.log('Sample comments added successfully!');
    } catch (error) {
      console.error('Error adding sample comments:', error.message);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkDelete('Comments', null, {});
      console.log('Sample comments removed.');
    } catch (error) {
      console.error('Error removing sample comments:', error.message);
    }
  }
};
