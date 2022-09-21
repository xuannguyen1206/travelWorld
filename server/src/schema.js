const { gql } = require('apollo-server');
const typeDefs = gql`
  type Country {
    name: String!
    capital: City
    region: String!
    area: Float
    population: Int!
    currencies: Currencies
    flag: String!
    picture: Pictures
    borders: [Country]
  }
  type City{
    name: String
    picture: Pictures
  }
  type Pictures{
    portrait( quantity:Float!): [Pic]
    landscape( quantity:Float!): [Pic]
  }
  type Pic{
    id:String
    link:String
    des: String
    blur:String
    location:String 
  }
  type Currencies{
    name: String!
    symbol: String!
  }
  type Query {
    countries( quantity:Float! ) : [Country]!
    country( countryName: String! = "", countryCode: String! = ""): Country
    test(quantity:Float!):[Country]
    testPicture(place:String!, quantity:Float!): [Pic]
  }  
  
` 

module.exports = typeDefs;
