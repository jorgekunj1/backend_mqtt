const Sequelize = require('sequelize');
const database = require('./db');

const Produto = database.define('produto', {
  nome: Sequelize.STRING,
  descricao: Sequelize.TEXT,
  preco: Sequelize.DECIMAL(10,2),
}, {
  timestamps: true,
});

module.exports = Produto;