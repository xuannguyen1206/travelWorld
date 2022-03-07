const resolvers = {
  Query:{
    countries: async (_,__,{ dataSources }) => {
      return dataSources.CountryAPI.getAllCountries();
    },
    country: async (_,{ countryName, countryCode },{ dataSources }) => {
      if(countryName) return dataSources.CountryAPI.getCountryByName(countryName);
      else return dataSources.CountryAPI.getCountryByCode(countryCode);
    },
    pictures: async (_,{ countryName },{ dataSources }) => {
      return dataSources.PictureAPI.getPictures(countryName);
    },
    picture: async (_, { countryName }, { dataSources }) => {
      return dataSources.PictureAPI.getCardPicture(countryName);
    }
  }
}
module.exports = resolvers;