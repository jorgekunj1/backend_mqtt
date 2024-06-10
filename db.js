const Sequelize = require('sequelize');

const sequelize = new Sequelize('u817008098_backend', 'u817008098_backend', 'ftId6lIwA6F=', {
  host: 'srv691.hstgr.io',
  dialect: 'mysql',
});

module.exports = sequelize;