const resolvers = {
  Query:{
    countries: async (_,{ quantity },{ dataSources }) => {
      return dataSources.CountryAPI.getRandomCountries(quantity);
    },
    country: async (parent,{ countryName, countryCode },{ dataSources }) => {
      // if (parent.name) return dataSources.CountryAPI.getCountryByName(parent.name);
      if(countryName) return dataSources.CountryAPI.getCountryByName(countryName);
      else return dataSources.CountryAPI.getCountryByCode(countryCode);
    }, /* not in use */
    test: async(_,{ quantity },{ dataSources }) => {
      return dataSources.CountryAPI.getRandomCountries(quantity);
    },
    testPicture: async(_,{ place,quantity },{ dataSources }) => {
      return dataSources.PictureAPI.getCardPictureTest(place,quantity)
    }
  },
  Country:{
    borders: async (parent,_,{ dataSources})=> {
      if(parent.borders === null) return null;
      const promises = [];
      for(let i = 0; i < parent.borders.length; i++){
        promises.push(dataSources.CountryAPI.getCountryByCode(parent.borders[i]))
      };
      return Promise.all(promises);
    },
    capital: (parent)=>parent.capital,
    picture: (parent)=>parent.name
  },
  City:{
    name: (cityName) => cityName,
    picture:(cityName) => cityName
  },
  Pictures:{
    portrait:async (place,{quantity},{ dataSources }) => {
      return dataSources.PictureAPI.getPictures(place,quantity,'portrait');
    },
    landscape:async (place,{quantity},{ dataSources }) => {
      return dataSources.PictureAPI.getPictures(place,quantity,'landscape');
    },
  },
  Pic:{
    location:async(pic,{quantity},{ dataSources }) => {
      return dataSources.PictureAPI.getPicLocation(pic.id);
    }
  }
}
module.exports = resolvers;