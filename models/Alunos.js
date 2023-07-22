const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');
const Usuarios = require('./Usuarios');

const Alunos = sequelize.define(
  'alunos',
  {
    id_aluno: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    dt_nasc: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    sexo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    // Docs: https://sequelize.org/docs/v6/core-concepts/model-basics

    // renomeia as colunas timestamps padrões do sequelize
    createdAt: 'criado_em',
    updatedAt: 'atualizado_em',

    indexes: [
      {
        name: 'alunos_nome_unico',
        unique: true,
        fields: ['nome'],
      },   
      {
        type: 'FULLTEXT',
        fields: ['nome'],
      },
    ],
  },
);

/**
 * Configura a relação entre usuários e alunos
 
 * Docs: https://sequelize.org/docs/v6/core-concepts/assocs/
 */
Alunos.belongsTo(Usuarios, { 
  as: 'usuario',
  uniqueKey: 'alunos_fk_usu',
  targetKey: 'id_usuario',
  foreignKey: 'id_usuario',
  onDelete: 'NO ACTION',
  onUpdate: 'CASCADE',
});

module.exports = Alunos;
