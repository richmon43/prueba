const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({path: 'variables.env'});

const crearToken = (usuario, secreta, expiresIn) => {
  // console.log(usuario);
  const { id, nombre, apellido, email } = usuario;

  return jwt.sign( { id, nombre, apellido, email }, secreta, { expiresIn } );
}

// Resolvers
const resolvers = {
  Query: {
    obtenerCurso: () => "Algo"
  },
  Mutation: {
    nuevoUsuario: async (_, {input} ) => {
      const { email, password } = input;
      // Revisar si el usaurio ya esta registrado
      const existeUsuario = await Usuario.findOne({email});
      if (existeUsuario) {
        throw new Error('El usuario ya esta registrado');
      }
      // Hashear su pasword
      const salt = await bcrypt.genSalt(10);
      input.password = await bcrypt.hash(password, salt);
      try {
        // Guardarlo en la base de datos
        const usuario = new Usuario(input);
        usuario.save(); // guardarlo en la DB
        return usuario;
      } catch (error) {
        console.log(error);
      }
    },
    autenticarUsuario: async (_, {input} ) => {
      const { email, password } = input;
      // Si el ususario existe
      const existeUsuario = await Usuario.findOne({email});
      if (!existeUsuario) {
        throw new Error('El usuario no existe');
      }
      // Revisar si el prassword es correcto
      const passwordCorrecto = await bcrypt.compare(password, existeUsuario.password);
      if(!passwordCorrecto) {
        throw new Error('El password es incorrecto');
      }
      // Crear el token
      return {
        token: crearToken(existeUsuario, process.env.SECRETA, '1h')
      }
    }
  }
}

module.exports = resolvers;