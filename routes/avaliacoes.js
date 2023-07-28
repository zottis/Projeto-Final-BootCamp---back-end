const express = require('express');

const { middlewareAutenticacao } = require('../middlewares/autenticacao');
const { checarResultadoValidacao } = require('../validators');

const Avaliacoes = require('../models/Avaliacoes');
const { validadorCadastroAvaliacao, validadorAtualizacaoAvaliacao } = require('../validators/avaliacoes');
const { ValidationError } = require('sequelize');

const router = express.Router();

function erroDuplicado(error) {
  if (!(error instanceof ValidationError)) {
    return false;
  }

  return error.errors.find((databaseError) => (
    databaseError.type === 'unique violation' && databaseError.path === 'avaliacoes_unico'
  ));
}


/**
 * Cadastro de avaliacoes para o usuário logado
 */
router.post(
  '/',
  middlewareAutenticacao,
  validadorCadastroAvaliacao,
  async (req, res) => {
    if (checarResultadoValidacao(req, res)) {
      return;
    }

    try {
      const { usuarioLogado, body } = req;

      const { dt_avaliacao, id_aluno, idade, peso, altura, resultado, situacao } = body;

      const avaliacao = await Avaliacoes.create({
        dt_avaliacao,
        id_aluno,
        idade,
        peso,
        altura,
        resultado,
        situacao,
        id_usuario: usuarioLogado.id_usuario,
      });

      res.status(201).json(avaliacao);
    } catch (error) {
      console.warn(error);
      if (erroDuplicado(error)) {
        res.status(402).send('Avaliação DT_AVALIACAO/ID_ALUNO/IDADE/PESO/ALTURA já cadastrada!');
        return;
      }

      res.status(500).send();
    }
  },
);


/**
 * Retorna avaliacao por ID do usuário logado
 */
router.get(
  '/alunos/:alunoId',
  middlewareAutenticacao,
  async (req, res) => {
    try {
      const { usuarioLogado, params } = req;

      const { alunoId } = params;

      const avaliacoes = await Avaliacoes.findAll({
        where: {
          id_aluno: alunoId,
        },
      });

      if (!avaliacoes) {
        res.status(404).send('Avaliações não encontradas para este aluno!');
        return;
      }

      res.status(200).json(avaliacoes);

    } catch (error) {
      console.warn(error);
      res.status(500).send();
    }
  },
);



/**
 * Consulta de avaliacoes do usuário logado
 */
router.get(
  '/',
  middlewareAutenticacao,
  async (req, res) => {
    try {
      const { usuarioLogado } = req;

      const avaliacoes = await Avaliacoes.findAll({
        // where: {
        //   id_usuario: usuarioLogado.id_usuario,
        // },
      });

      if (!avaliacoes) {
        //res.status(404).send('Avaliações não encontradas para o usuário logado!');
        res.status(404).send('Avaliações não encontradas!');
        return;
      }

      res.status(200).json(avaliacoes);

    } catch (error) {
      console.warn(error);
      res.status(500).send();
    }
  },
);

/**
 * Retorna avaliacao por ID do usuário logado
 */
router.get(
  '/:avaliacaoId',
  middlewareAutenticacao,
  async (req, res) => {
    try {
      const { usuarioLogado, params } = req;

      const { avaliacaoId } = params;

      const avaliacao = await Avaliacoes.findAll({
        where: {
          id_avaliacao: avaliacaoId,
        },
      });

      if (!avaliacao) {
        res.status(404).send('Avaliação não encontrada!');
        return;
      }

      res.status(200).json(avaliacao);
      
    } catch (error) {
      console.warn(error);
      res.status(500).send();
    }
  },
);

/**
 * Atualiza os dados da Avaliação do usuário de forma parcial
 */
router.patch(
  '/:avaliacaoId',
  middlewareAutenticacao,
  validadorAtualizacaoAvaliacao,
  async (req, res) => {
    if (checarResultadoValidacao(req, res)) {
      return;
    }

    try {
      const { usuarioLogado, params, body } = req;

      const { avaliacaoId } = params;
      const { dt_avaliacao, idade, peso, altura, resultado, situacao } = body;

      await Avaliacoes.update(
        {
          dt_avaliacao,
          idade,
          peso,
          altura,
          resultado,
          situacao,
        },
        {
          where: {
            id_avaliacao: avaliacaoId,            
          },
        },
      );

      const avaliacao = await Avaliacoes.findAll({
        where: {
          id_avaliacao: avaliacaoId,
        },

      });

      if (!avaliacao) {
        res.status(404).send('avaliacao não encontrada!');
        return;
      };

      res.status(200).json(avaliacao);
    } catch (error) {
      console.warn(error);
      res.status(500).send();
    }
  },
);

/*Rota de exclusão de Avaliacoes*/
router.delete(
  '/:avaliacaoId',
  middlewareAutenticacao,
  async (req, res) => {
    try {
      const { usuarioLogado, params } = req;
      const { avaliacaoId } = params;

      const result = await Avaliacoes.destroy({
        where: {
          id_avaliacao: avaliacaoId,          
        },
      });

      if (!result) {
        res.status(404).send('Avaliação não encontrada');
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
