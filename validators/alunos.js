const { checkSchema } = require('express-validator');

const validarSexo = (value) => {
  const opcoesPermitidas = ['F', 'M'];
  if (!value || !opcoesPermitidas.includes(value)) {
    throw new Error('O campo sexo deve ser "F" ou "M".');
  }
  return true;
};

const validadorCadastroAluno = checkSchema(
  {
    nome: {
      trim: {
        errorMessage: 'O nome é Obrigatório!',
      },
      noEmpty: {
        errorMessage: 'O nome é Obrigatório!',
      },
      isLength: {
        options: {
          min: 3,
          max: 100,
        },

        errorMessage: 'O nome deve ter no mínimo 3 e no máximo 100 caracteres!',

      },

      isString: {
        errorMessage: 'O nome deve ser um texto!',
      },

    },
    dt_nasc: {
      noEmpty: {
        errorMessage: 'A Data de nascimento é Obrigatória!',
      },
      isDate: {
        errorMessage: 'A Data de nascimento Precisa ser uma data',
      },
      optional: true,
    },

    sexo: {
      trim: {
        errorMessage: 'O campo sexo é Obrigatório!',
      },
      noEmpty: {
        errorMessage: 'O campo sexo é Obrigatório!',
      },
      isLength: {
        options: {
          min: 1,
          max: 1,
        },
        errorMessage: 'O campo sexo deve ter 1 caracter!',
      },
      isString: {
        errorMessage: 'O campo sexo deve ser um texto!',
      },
      custom: {
        options: validarSexo,
        errorMessage: 'O campo sexo deve ser "F" ou "M".',
      },
    },
  },
  ['body'],
);

const validadorAtualizacaoAluno = checkSchema(
  {
    nome: {
      optional: true,

      noEmpty: {
        errorMessage: 'O nome é Obrigatório!',
      },
      isLength: {
        options: {
          min: 3,
          max: 100,
        },
        errorMessage: 'O nome deve ter no mínimo 3 e no máximo 100 caracteres!',
      },

      isString: {
        errorMessage: 'O nome deve ser um texto!',
      },

    },
    dt_nasc: {
      optional: true,
      noEmpty: {
        errorMessage: 'A data de nascimento é Obrigatória!',
      },
      isDate: {
        errorMessage: 'A data de nascimento deve ser uma data!',
      },
    },
    sexo: {
      optional: true,
      trim: {
        errorMessage: 'O campo sexo é Obrigatório!',
      },
      noEmpty: {
        errorMessage: 'O campo sexo é Obrigatório!',
      },
      isLength: {
        options: {
          min: 1,
          max: 1,
        },
        errorMessage: 'O campo sexo deve ter 1 caracter!',
      },
      isString: {
        errorMessage: 'O campo sexo deve ser um texto!',
      },
      custom: {
        options: validarSexo,
        errorMessage: 'O campo sexo deve ser F ou M.',
      },
    },
  },
  ['body'],
);

module.exports = {
  validadorCadastroAluno,
  validadorAtualizacaoAluno,
};
