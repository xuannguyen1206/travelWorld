const resolvers = {
  Query:{
    countries: async (_,__,{ dataSources }) => {
      return dataSources.CountryAPI.getAllCountries();
    },
    country: async (parent,{ countryName, countryCode },{ dataSources }) => {
      // if (parent.name) return dataSources.CountryAPI.getCountryByName(parent.name);
      if(countryName) return dataSources.CountryAPI.getCountryByName(countryName);
      else return dataSources.CountryAPI.getCountryByCode(countryCode);
    },
    pictures: async (_,{ countryName },{ dataSources }) => {
      return dataSources.PictureAPI.getPictures(countryName);
    },
    picture: async (parent, { countryName }, { dataSources }) => {
      return dataSources.PictureAPI.getCardPicture(countryName);
    },
    
  },
  Country:{
    picture: (parent)=>parent.name
  },
  HomePicture:{
    portrait:async (countryName,__,{ dataSources }) => {
      return dataSources.PictureAPI.getCardPicture(countryName);
    },
    landscape:async (countryName,__,{ dataSources }) => {
      return dataSources.PictureAPI.getLandscapePicture(countryName);
    },
  }
}
module.exports = resolvers;