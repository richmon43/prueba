const Usuario = require("../models/Usuario");
const Proyecto = require("../models/Proyecto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "variables.env" });

const crearToken = (usuario, secreta, expiresIn) => {
  // console.log(usuario);
  const { id, nombre, apellido, email } = usuario;

  return jwt.sign({ id, nombre, apellido, email }, secreta, { expiresIn });
};

// Resolvers
const resolvers = {
  Query: {
    obtenerUsuario: async (_, { token }) => {
      const usuarioId = await jwt.verify(token, process.env.SECRETA);
      return usuarioId;
    },
    obtenerProyectos: async () => {
      try {
        const proyectos = await Proyecto.find({});
        return proyectos;
      } catch (error) {
        console.log(error);
      }
    },
    obtenerProyecto: async (_, { id }) => {
      // revisar si el producto existe
      const proyecto = await Proyecto.findById(id);
      if (!proyecto) {
        throw new Error("Proyecto no encontrado");
      }
      return proyecto;
    },
  },
  Mutation: {
    nuevoUsuario: async (_, { input }) => {
      const { email, password } = input;
      // Revisar si el usaurio ya esta registrado
      const existeUsuario = await Usuario.findOne({ email });
      if (existeUsuario) {
        throw new Error("El usuario ya esta registrado");
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
    autenticarUsuario: async (_, { input }) => {
      const { email, password } = input;
      // Si el ususario existe
      const existeUsuario = await Usuario.findOne({ email });
      if (!existeUsuario) {
        throw new Error("El usuario no existe");
      }
      // Revisar si el prassword es correcto
      const passwordCorrecto = await bcrypt.compare(
        password,
        existeUsuario.password
      );
      if (!passwordCorrecto) {
        throw new Error("El password es incorrecto");
      }
      // Crear el token
      return {
        token: crearToken(existeUsuario, process.env.SECRETA, "1h"),
      };
    },
    nuevoProyecto: async (_, { input }) => {
      try {
        const proyecto = new Proyecto(input);
        // almacenar en la DB
        const resultado = await proyecto.save();
        return resultado;
      } catch (error) {
        console.log(error);
      }
    },
    actualizarProyecto: async (_, { id, input }) => {
      // Revisar si el proyecto existe o no
      let proyecto = await Proyecto.findById(id);
      if (!proyecto) {
        throw new Error("Proyecto no encontrado");
      }
      // guardarlo en la base de datos
      proyecto = await Proyecto.findOneAndUpdate({ _id: id }, input, {
        new: true,
      });
      return proyecto;
    },
    eliminarProyecto: async (_, {id}) => {
      // Revisar si el proyecto existe o no
      let proyecto = await Proyecto.findById(id);
      if (!proyecto) {
        throw new Error("Proyecto no encontrado");
      }
      // Eliminarlo de la DB
      await Proyecto.findByIdAndDelete({_id: id});
      return 'Proyecto eliminado correctamente';
    }
  },
};

module.exports = resolvers;
