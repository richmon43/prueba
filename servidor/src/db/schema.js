const { gql } = require('apollo-server');

// Schema
const typeDefs = gql`
  type Usuario {
    id: ID
    nombre: String
    apellido: String
    email: String
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
    dni: String!
    email: String!
    password: String!
  }
  input AutenticarInput {
    email: String!
    password: String!
  }
  input ProyectoInput {
    titulo: String!
    objGenerales: String!
    presupuesto: Int!
    dniLider: String!
    nombreLider: String!
    estado: String
    fase: String!
    creado: String!
    duracion: Int!
  }

  type Query {
    obtenerUsuario(token: String!): Usuario
  }
  type Mutation {
    # Usuarios
    nuevoUsuario(input: UsuarioInput): Usuario
    autenticarUsuario(input: AutenticarInput): Token
    # Proyectos
    nuevoProyecto(input: ProyectoInput): Proyecto
  }
`;

module.exports = typeDefs;