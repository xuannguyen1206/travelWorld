const { RESTDataSource } = require('apollo-datasource-rest');

class PictureAPI extends RESTDataSource{
  constructor(){
    super();
    this.baseURL = 'https://api.unsplash.com/'
  }
  willSendRequest(request) { /* attach API key before sneding querries */
    request.headers.set('Authorization','Client-ID I4DvHa0lATZ62_AujTcSPJM-JZin81zUKR_4nxR7gqc')
  }
  async getCardPicture(countryName){
    let response = await this.get('search/photos', {
      query: countryName,
      page: Math.floor(Math.random() * 100) + 1,
      per_page: 1, 
      orientation: 'portrait'
    });
    if(response.results.length === 0){ /* some country doesnt have 100 pictures to select */
      response = await this.get('search/photos', {
        query: countryName,
        page: Math.floor(Math.random() * 10) + 1,
        per_page: 1, 
        orientation: 'portrait'
      });
    } 
    if(response.results.length === 0){ /* some country doesnt have 10 pictures to select */
      response = await this.get('search/photos', {
        query: countryName,
        page: Math.floor(Math.random() * 3) + 1,
        per_page: 1, 
        orientation: 'portrait'
      });
    } 
    if(response.results.length === 0){ /* if that country doesnt have 5 pics, return none */
      return { link: '' }
    }
    return this.pictureFormat(response.results[0])
  }
  async getLandscapePicture(countryName){
    let response = await this.get('search/photos', {
      query: countryName,
      page: Math.floor(Math.random() * 100) + 1,
      per_page: 1, 
      orientation: 'landscape'
    });
    if(response.results.length === 0){ /* some country doesnt have 100 pictures to select */
      response = await this.get('search/photos', {
        query: countryName,
        page: Math.floor(Math.random() * 10) + 1,
        per_page: 1, 
        orientation: 'landscape'

      });
    } 
    if(response.results.length === 0){ /* some country doesnt have 10 pictures to select */
      response = await this.get('search/photos', {
        query: countryName,
        page: Math.floor(Math.random() * 3) + 1,
        per_page: 1, 
        orientation: 'landscape'
      });
    } 
    if(response.results.length === 0){ /* if that country doesnt have 5 pics, return none */
      return { link: '' }
    }
    return this.pictureFormat(response.results[0])
  }
  async getPictures(countryName){
    const response = await this.get('search/photos', {
      query: countryName,
      page: Math.floor(Math.random() * 15) + 1,
      per_page: 7, 
    });
    return Array.isArray(response.results)
    ? response.results.map(picture => this.pictureFormat(picture))
    : [];
  }
  pictureFormat(picture){
    return {
      link: picture.urls.full
    }
  }
}

module.exports = PictureAPI;