'use strict';

// As a student, I'm populating the 'Posts' table with example data.

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkInsert('Posts', [
        {
          title: 'My First Post',
          content: 'This is the content of my first post.',
          userId: 1, // Replace with the user's ID
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Another Post',
          content: 'This is another post I\'m creating.',
          userId: 2, // Replace with another user's ID
          createdAt: new Date(),
          updatedAt: new Date()
        },
        // Add more posts here
      ], {});
      
      console.log('Sample posts added successfully!');
    } catch (error) {
      console.error('Error adding sample posts:', error.message);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkDelete('Posts', null, {});
      console.log('Sample posts removed.');
    } catch (error) {
      console.error('Error removing sample posts:', error.message);
    }
  }
};
