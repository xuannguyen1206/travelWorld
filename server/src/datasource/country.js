const { RESTDataSource } = require('apollo-datasource-rest');

class CountryAPI extends RESTDataSource{
  constructor(){
    super();
    this.baseURL = 'https://restcountries.com/v2/';
  }
  async getCountryByName(countryName){
    console.log(countryName)
    const response = await this.get(`name/${countryName}`);
    return this.countryFormat(response[0]);
  }
  async getCountryByCode(countryCode){
    const response = await this.get(`https://restcountries.com/v2/alpha/${countryCode}`);
    return this.countryFormat(response);
  }
  async getAllCountries(){ /* get 3 random countries */ 
    const response = await this.get('all');
    // return Array.isArray(response)
    // ? response.map(country => this.countryFormat(country))
    // : [];
    if(Array.isArray(response)){
      const result = []
      for(let i = 0; i < 3; i++){
        result.push(this.countryFormat(response[Math.round(Math.random() * response.length)]));
      }
      return result;
    } else {
      return [];
    }
  }
  countryFormat(country){
    return {
      name: (country.name.includes(')') ? country.name.split('(')[0] : country.name ),
      capital: country.capital,
      region: country.subregion,
      timezone: country.timezones[0],
      area: country.area,
      population: country.population,
      language: {
        name: country.languages[0].name,
        nativeName: country.languages[0].nativeName,
      },
      flag: country.flags.png,
      currencies: country.currencies ? {
        name: country.currencies[0].name,
        symbol: country.currencies[0].symbol
      } : {
        name:'',
        symbol: ''
      }
    }
  }
}


module.exports = CountryAPI;