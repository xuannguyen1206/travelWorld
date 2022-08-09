const { RESTDataSource } = require('apollo-datasource-rest');
class PictureAPI extends RESTDataSource{
  constructor(){
    super();
    this.baseURL = 'https://api.unsplash.com/'
  }
  willSendRequest(request) { /* attach API key before sneding querries */
    const keys = ['I4DvHa0lATZ62_AujTcSPJM-JZin81zUKR_4nxR7gqc','5Te5pe5INDKXontmMdewyOe77WYyyDFgJpZeVMB-aNs','-qPbH1XBuwSmLkYJLKye9Vk_Y_NneX93Q9y_wJOHBXQ',
      'ZKGyPHf6UqDZZipyyOT7kRR96h9uGHBKs-K3BXObaf4','3amQK_sniJj4j1hZnh0fWNW_ig0D0mEi7HoDqtJ8Qis','9vdE2l3z9fhXPBarpdH5bzLdnAq9PM0b53mi7SwlUw4','LhMs5_wOu_K5qC8_B0iC27azGBeTQ9UELSXlwAtJl8o','NIqZyxrIEeNP0drNcBd1NWhx4w4bhYUzQXmLSkveqwc']
    request.headers.set('Authorization',`Client-ID ${keys[Math.floor(Math.random()*8)]}`)
  }
  async getCardPicture(countryName){
    let response = await this.get('search/photos', {
      query: countryName,
      page: Math.floor(Math.random() * 30) + 1,
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
      return { link: 'https://1d59b73swr1f1swu2v451xcx-wpengine.netdna-ssl.com/wp-content/uploads/2016/09/green-leaves-Sameera-Madusanka-2160x1440.jpeg' }
    }
    return this.pictureFormat(response.results[0])
  }
  async getLandscapePicture(countryName){
    let response = await this.get('search/photos', {
      query: countryName,
      page: Math.floor(Math.random() * 30) + 1,
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
      return { link: 'https://1d59b73swr1f1swu2v451xcx-wpengine.netdna-ssl.com/wp-content/uploads/2016/09/green-leaves-Sameera-Madusanka-2160x1440.jpeg' }
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