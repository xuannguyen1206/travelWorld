const { RESTDataSource } = require('apollo-datasource-rest');

class PictureAPI extends RESTDataSource{
  constructor(){
    super();
    this.baseURL = 'https://api.unsplash.com/'
  }
  willSendRequest(request) {
    request.headers.set('Authorization','Client-ID I4DvHa0lATZ62_AujTcSPJM-JZin81zUKR_4nxR7gqc')
  }
  async getCardPicture(countryName){
    const response = await this.get('search/photos', {
      query: countryName,
      page: Math.floor(Math.random() * 100) + 1,
      per_page: 1, 
      orientation: 'portrait'
    });
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
      link: picture.urls.regular
    }
  }
}

module.exports = PictureAPI;