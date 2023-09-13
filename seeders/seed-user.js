'use strict';

const bcrypt = require('bcrypt');


module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      const hashedPassword1 = await bcrypt.hash('password1', 10); 
      const hashedPassword2 = await bcrypt.hash('password2', 10); 
      
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
