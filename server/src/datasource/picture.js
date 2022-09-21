const { RESTDataSource } = require('apollo-datasource-rest');
let decodeBlurHash,getImgFromArr;
import('./utils.mjs').then((utils => {
  decodeBlurHash =  utils.decodeBlurHash;
  getImgFromArr = utils.getImgFromArr;
  console.log(typeof getImgFromArr(decodeBlurHash('LWAn.QMytRI;c[smW=ofI]t7V@t7',64,64)));
}))
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
  async getPictures(place, quantity, orientation){
    let maxPageNum = 500;
    let attempt = 1;
    let response = await this.get('search/photos', {
      query: place,
      page: Math.floor(Math.random() * maxPageNum),
      per_page: quantity, 
      orientation: orientation
    });
    if(response.results.length === 0){
      maxPageNum = response.total_pages;
      response = await this.get('search/photos', {
        query: place,
        page: Math.floor(Math.random() * maxPageNum),
        per_page: quantity, 
        orientation: orientation
      });
      attempt++;
    }
    const result = response.results.map(pic => {
      return this.pictureFormat(pic)
    })
    return result
  }
  async getPicLocation(picId){
    let response = await this.get(`photos/${picId}`);
    console.log(response.location)
    return(response.location.name);
  }
  pictureFormat(picture){
    return {
      id: picture.id,
      link: picture.urls.full,
      blur: getImgFromArr(decodeBlurHash(picture.blur_hash,64,64)),
      des: picture.description !== null ? picture.description : picture.alt_description !== null ? picture.alt_description  : 'No comment' 
    }
  }
}

module.exports = PictureAPI;