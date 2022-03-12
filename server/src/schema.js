const { gql } = require('apollo-server');
const typeDefs = gql`
  type Country {
    name: String!
    capital: String
    region: String!
    timezone: String!
    area: Float
    population: Int!
    language: Language!
    flag: String!
    currencies: Currencies!
  }
  type Picture {
    link: String
  }
  type Language{
    name: String!
    nativeName: String!
  }
  type Currencies{
    name: String!
    symbol: String!
  }
  type Query {
    countries: [Country!]!
    country( countryName: String! = "", countryCode: String! = ""): Country
    picture( countryName: String!): Picture
    pictures( countryName: String! ): [Picture!]!
  }
` 

module.exports = typeDefs;
