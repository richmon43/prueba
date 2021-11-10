const { gql } = require('apollo-server');

// Schema
const typeDefs = gql`
  type Usuario {
    id: ID
    nombre: String
    apellido: String
    email: String
    estado: String
    creado: String
  }
  type Token {
    token: String
  }
  type Proyecto {
    id: ID
    titulo: String
    objGenerales: String
    presupuesto: Int
    dniLider: String
    nombreLider: String
    estado: String
    fase: String
    creado: String
    duracion: Int
  }

  input UsuarioInput {
    nombre: String!
    apellido: String!
    estado: String
    email: String!
    password: String!
  }
  input AutenticarInput {
    email: String!
    password: String!
  }
  input ProyectoInput {
    titulo: String!
    objGenerales: String
    presupuesto: Int
    dniLider: String!
    nombreLider: String!
    estado: String
    fase: String
    creado: String
    duracion: Int
  }

  type Query {
    # Usuarios
    obtenerUsuario(token: String!): Usuario
    # Proyectos
    obtenerProyectos: [Proyecto]
    obtenerProyecto(id: ID!): Proyecto
  }
  type Mutation {
    # Usuarios
    nuevoUsuario(input: UsuarioInput): Usuario
    autenticarUsuario(input: AutenticarInput): Token
    actualizarUsuario(id: ID!, input: UsuarioInput): Usuario
    eliminarUsuario(id: ID!): String
    # Proyectos
    nuevoProyecto(input: ProyectoInput): Proyecto
    actualizarProyecto(id: ID!, input: ProyectoInput): Proyecto
    eliminarProyecto(id: ID!): String
  }
`;

module.exports = typeDefs;