const { RESTDataSource } = require('apollo-datasource-rest');

class CountryAPI extends RESTDataSource{
  constructor(){
    super();
    this.countryCodes = require('./countriesCode.json') /* import list of most tourism countries */
    this.baseURL = 'https://restcountries.com/v2/';
  }
  async getCountryByName(countryName){
    countryName = countryName.split(" ");
    countryName = countryName.map((word) => {
      word = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(); 
      // capitalize each word in country name
      return word
    })
    countryName = countryName.join(" ") /* input processing */ 
    if(!Object.values(this.countryCodes).find(country=> country.includes(countryName))){
      return null
    } 
    
   return await this.getCountryByCode(Object.keys(this.countryCodes).find((key)=> this.countryCodes[key].includes(countryName)));
   
  }
  async getCountryByCode(countryCode){
    if(!this.countryCodes[countryCode]) return null /* if the country is not on the list */
    const response = await this.get(`https://restcountries.com/v2/alpha/${countryCode}`);
    return this.countryFormat(response);
  }
  async getRandomCountries(quantity){ /* get 3 random countries for homepage */ 
    const choosenCountries = [];
    for(let i = 0; i < quantity; i++){
      choosenCountries.push(Object.keys(this.countryCodes)[Math.floor(Math.random()*(Object.keys(this.countryCodes).length))])
    }
    let promises = [];
    for(let i = 0; i < quantity; i++){
      promises.push(this.getCountryByCode(choosenCountries[i]))
    }
    const response = await Promise.all(promises)
    return response;
  }
  countryFormat(country){
    return {
      name: this.countryCodes[country.alpha3Code],
      capital: country.capital,
      region: country.subregion,
      area: country.area,
      population: country.population,
      currencies: country.currencies ? {
        name: country.currencies[0].name,
        symbol: country.currencies[0].symbol
      } : {
        name:'',
        symbol: ''
      },
      borders: country.borders !== undefined ? country.borders : null,
      flag: country.flags.png 
      
    }
  }
}


module.exports = CountryAPI;