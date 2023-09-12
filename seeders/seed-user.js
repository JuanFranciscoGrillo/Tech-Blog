'use strict';

const bcrypt = require('bcrypt');

// As a student, I'm populating the 'Users' table with example data.

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      const hashedPassword1 = await bcrypt.hash('password1', 10); // Replace with hashed password
      const hashedPassword2 = await bcrypt.hash('password2', 10); // Replace with hashed password
      
      await queryInterface.bulkInsert('Users', [
        {
          username: 'user1',
          password: hashedPassword1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          username: 'user2',
          password: hashedPassword2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        // Add more users here
      ], {});
      
      console.log('Sample users added successfully!');
    } catch (error) {
      console.error('Error adding sample users:', error.message);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkDelete('Users', null, {});
      console.log('Sample users removed.');
    } catch (error) {
      console.error('Error removing sample users:', error.message);
    }
  }
};
