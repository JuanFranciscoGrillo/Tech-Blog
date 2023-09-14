// Import Sequelize library and load environment variables
const Sequelize = require('sequelize');
require('dotenv').config();

// Create a Sequelize instance with database connection details
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

// Export the sequelize instance for use in other parts of the application
module.exports = sequelize;
