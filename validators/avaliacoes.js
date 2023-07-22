const { checkSchema } = require('express-validator');

const validadorCadastroAvaliacao = checkSchema(
  {
    dt_avaliacao: {
      noEmpty: {
        errorMessage: 'A Data da Avaliação é Obrigatório!',
      },
      isDate: {
        errorMessage: 'A Data da Avaliação deve ser uma data!',
      },
    },

    id_aluno: {
      noEmpty: {
        errorMessage: 'O id do aluno é Obrigatório!',
      },
      isInt: {
        errorMessage: 'O id do aluno deve ser um Inteiro!',
      },
    },

    idade: {
      noEmpty: {
        errorMessage: 'A idade é Obrigatório!',
      },
      isInt: {
        errorMessage: 'A idade deve ser um Inteiro!',
      },
    },

    peso: {
      noEmpty: {
        errorMessage: 'O Peso é Obrigatório!',
      },
      isFloat: {
        errorMessage: 'O peso deve ser um float!',
      },
    },

    altura: {
      noEmpty: {
        errorMessage: 'A altura é Obrigatório!',
      },
      isFloat: {
        errorMessage: 'A altura deve ser um float!',
      },
    },


    resultado: {
      noEmpty: {
        errorMessage: 'O resultado é Obrigatório!',
      },

      isFloat: {
        errorMessage: 'O resultado deve ser um float!',
      },
    },
  },
  ['body'],
);

const validadorAtualizacaoAvaliacao = checkSchema(
  {
    dt_avaliacao: {
      optional: true,
      noEmpty: {
        errorMessage: 'A Data da Avaliação é Obrigatório!',
      },
      isDate: {
        errorMessage: 'A Data da Avaliação deve ser uma data!',
      },

      id_aluno: {
        optional: true,
        noEmpty: {
          errorMessage: 'O id do aluno é Obrigatório!',
        },
        isInt: {
          errorMessage: 'O id do aluno deve ser um Inteiro!',
        },
      },
      idade: {
        optional: true,
        noEmpty: {
          errorMessage: 'A idade é Obrigatório!',
        },
        isInt: {
          errorMessage: 'A idade deve ser um Inteiro!',
        },
      },

      peso: {
        optional: true,
        noEmpty: {
          errorMessage: 'O Peso é Obrigatório!',
        },
        isFloat: {
          errorMessage: 'O peso deve ser um float!',
        },
      },

      altura: {
        optional: true,
        noEmpty: {
          errorMessage: 'A altura é Obrigatório!',
        },
        isFloat: {
          errorMessage: 'A altura deve ser um float!',
        },
      },


      resultado: {
        optional: true,
        noEmpty: {
          errorMessage: 'O resultado é Obrigatório!',
        },
        isFloat: {
          errorMessage: 'O resultado deve ser um float!',
        },
      },
    },
  },
  ['body'],
);


module.exports = {
  validadorCadastroAvaliacao,
  validadorAtualizacaoAvaliacao,
};
