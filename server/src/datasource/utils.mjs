import {decodeBlurHash} from 'fast-blurhash';

/**
 * @function getDataUrlFromArr
 * @param {Uint8ClampedArray} arr
 * @param {int} w
 * @param {int} h
 * @returns {string}
 */
import { createCanvas,createImageData } from 'canvas'
function getDataUrlFromArr(arr, w, h) {
  if(typeof w === 'undefined' || typeof h === 'undefined') {
    w = h = Math.sqrt(arr.length / 4);
  }
  try {
    // for browser 
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');  
    canvas.width = w;
    canvas.height = h;
    var imgData = ctx.createImageData(w, h);
    imgData.data.set(arr);
    ctx.putImageData(imgData, 0, 0); 
    return canvas.toDataURL();
  } catch (error) {
    // for node which doesnt have default canvas element
    const canvas = createCanvas(w, h)
    const ctx = canvas.getContext('2d')
    const imgData = createImageData(w,h)
    imgData.data.set(arr);
    ctx.putImageData(imgData,0,0) 
    return canvas.toDataURL();
  }
}


/**
 * @function getImgFromArr
 * @param {Uint8ClampedArray} arr
 * @param {int} w
 * @param {int} h
 * @returns {HTMLImageElement}
 */
function getImgFromArr(arr, w, h) {
  return getDataUrlFromArr(arr, w, h);
}

export  {decodeBlurHash, getImgFromArr};