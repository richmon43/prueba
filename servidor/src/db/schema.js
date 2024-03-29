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

  type Query {
    obtenerCurso: String
  }
  type Mutation {
    nuevoUsuario(input: UsuarioInput): Usuario
    autenticarUsuario(input: AutenticarInput): Token
  }
`;

module.exports = typeDefs;