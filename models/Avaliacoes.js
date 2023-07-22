const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');
const Usuarios = require('./Usuarios');
const Alunos = require('./Alunos');

const Avaliacoes = sequelize.define(
  'avaliacoes',
  {
    id_avaliacao: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    dt_avaliacao: {
      type: DataTypes.DATE,
      allowNull: false,
      index: true,
    },

    id_aluno: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    idade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    peso: {
      type: DataTypes.DECIMAL(10.0),
      allowNull: false,
    },

    altura: {
      type: DataTypes.DECIMAL(10.0),
      allowNull: false,
    },

    resultado: {
      type: DataTypes.DECIMAL(10.0),
      allowNull: false,
      index: true,
    },

    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: {
      //   model: 'Usuarios',
      //   key: 'id_usuario',
      // },
      // onUpdate: 'CASCADE',
      // onDelete: 'NO ACTION',
      // name: 'avaliacoes_fk_usu', 
    },
  },
  {
    // Docs: https://sequelize.org/docs/v6/core-concepts/model-basics

    // renomeia as colunas timestamps padrões do sequelize
    createdAt: 'criado_em',
    updatedAt: 'atualizado_em',

    indexes: [
      {
        name: 'avaliacoes_unico',
        unique: true,
        fields: ['dt_avaliacao', 'id_aluno', 'idade', 'peso', 'altura'],
      },

      {
        //type: 'KEY',
        fields: ['dt_avaliacao'],
      },

      {
        //type: 'KEY',
        fields: ['resultado'],
      },
    ],
  },
);

/**
 * Configura a relação entre usuários e alunos
 *
 * Deste modo será criada uma chave estrangeira "usuarios_id" na tabela "tarefas".
 *
 * Docs: https://sequelize.org/docs/v6/core-concepts/assocs/
 */

// Avaliacoes.belongsTo(Usuarios, {
//   as: 'usuario',
//   foreignKey: 'id_usuario',
// });

Avaliacoes.belongsTo(Usuarios, {
  as: 'usuario',
  //uniqueKey: 'avaliacoes_fk_usu',

  foreignKey: {
    name: 'avaliacoes_fk_usu',
    field: 'id_usuario',
  },
  targetKey: 'id_usuario',
  onDelete: 'NO ACTION',
  onUpdate: 'CASCADE',
});

// Avaliacoes.belongsTo(Alunos, {
//   as: 'aluno',
//   uniqueKey: 'avaliacoes_fk_alu',
//   foreignKey: 'id_aluno',
//   targetKey: 'id_aluno',
//   onDelete: 'CASCADE',
//   onUpdate: 'CASCADE',
// });

Avaliacoes.belongsTo(Alunos, {
  as: 'aluno',
  //  uniqueKey: 'avaliacoes_fk_alu',
  foreignKey: {
    name: 'avaliacoes_fk_alu',
    field: 'id_aluno',
  },
  targetKey: 'id_aluno',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

module.exports = Avaliacoes;
