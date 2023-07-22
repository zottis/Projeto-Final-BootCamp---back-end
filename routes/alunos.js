const express = require('express');
const { ValidationError } = require('sequelize');

const { middlewareAutenticacao } = require('../middlewares/autenticacao');
const { checarResultadoValidacao } = require('../validators');
const Alunos = require('../models/Alunos');

const { validadorCadastroAluno, validadorAtualizacaoAluno } = require('../validators/alunos');

const router = express.Router();

function erroNomeDuplicado(error) {
  if (!(error instanceof ValidationError)) {
    return false;
  }

  return error.errors.find((databaseError) => (
    databaseError.type === 'unique violation' && databaseError.path === 'alunos_nome_unico'
  ));
}

router.post(
  '/',
  middlewareAutenticacao,
  validadorCadastroAluno,
  async (req, res) => {
    if (checarResultadoValidacao(req, res)) {
      return;
    }
    try {
      const { usuarioLogado, body } = req;

      const { nome, dt_nasc, sexo } = body;

      const aluno = await Alunos.create({
        nome,
        dt_nasc,
        sexo,
        id_usuario: usuarioLogado.id_usuario,
      });

      res.status(201).json(aluno);
    } catch (error) {
      console.warn(error);
      if (erroNomeDuplicado(error)) {
        res.status(402).send('Aluno já cadastrado!');
        return;
      }
      res.status(500).send();
    }
  },
);

/**
 * Retorna Aluno por ID do Usuario
 */
router.get(
  '/byusuario/',
  middlewareAutenticacao,
  async (req, res) => {
    try {
      const { usuarioLogado, params } = req;

      console.log(usuarioLogado);
      
      const alunos = await Alunos.findAll({
        where: {
          id_usuario: usuarioLogado.id_usuario,
        },
      });

      if (!alunos) {
        res.status(404).send('Alunos não encontrados para o usuário logado!');
        return;
      }

      res.status(200).json(alunos);

    } catch (error) {
      console.warn(error);
      res.status(500).send();
    }
  },
);


/**
 * Consulta de Alunos
 */
router.get(
  '/',
  middlewareAutenticacao,
  async (req, res) => {
    try {
      const { usuarioLogado } = req;

      const alunos = await Alunos.findAll({
      });

      res.status(200).json(alunos);
    } catch (error) {
      console.warn(error);
      res.status(500).send();
    }
  },
);

/**
 * Retorna Aluno por ID
 */
router.get(
  '/:alunoId',
  middlewareAutenticacao,
  async (req, res) => {
    try {
      const { usuarioLogado, params } = req;

      const { alunoId } = params;

      const aluno = await Alunos.findOne({
        where: {
          id_aluno: alunoId,
        },
      });

      res.status(200).json(aluno);

      if (!aluno) {
        res.status(404).send('Aluno não encontrado!');
        return;
      }
    } catch (error) {
      console.warn(error);
      res.status(500).send();
    }
  },
);


router.patch(
  '/:alunoId',
  middlewareAutenticacao,
  validadorAtualizacaoAluno,
  async (req, res) => {
    if (checarResultadoValidacao(req, res)) {
      return;
    }

    try {
      const { usuarioLogado, params, body } = req;

      const { alunoId } = params;
      const { nome, dt_nasc, sexo } = body;

      await Alunos.update(
        {
          nome,
          dt_nasc,
          sexo,
        },
        {
          where: {
            id_aluno: alunoId,
          },
        },
      );

      const aluno = await Alunos.findOne({
        where: {
          id_aluno: alunoId,
        },
      });

      if (!aluno) {
        res.status(404).send('Aluno não encontrado!');
        return;
      };

      res.status(200).json(aluno);
    } catch (error) {
      console.warn(error);
      res.status(500).send();
    }
  },
);

/*Rota de exclusão de Aluno*/
router.delete(
  '/:alunoId',
  middlewareAutenticacao,
  async (req, res) => {
    try {
      const { usuarioLogado, params } = req;
      const { alunoId } = params;

      const result = await Alunos.destroy({
        where: {
          id_aluno: alunoId,
        },
      });

      if (!result) {
        res.status(404).send('Aluno não encontrado');
        return;
      };

      res.status(204).send();
    } catch (error) {
      console.warn(error);
      res.status(500).send();
    }
  }
);

module.exports = router;
