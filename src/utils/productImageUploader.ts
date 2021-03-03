import { Bucket } from "@google-cloud/storage";
import fs from 'fs';
import path from 'path';
import connectToFirestore from "../connectors/FirestoreConnector";

class ProductImageUploader {
  productID: string;
  bucket: Bucket;

  constructor(productID: string, bucket: Bucket) {
    this.productID = productID;
    this.bucket = bucket;
  }

  async uploadImages(images: any[]) {
    let errors = [];

    for (let x = 0; x < images.length; x++) {
      try {
        const newFileName = `${x}.${images[x].originalname.split('.')[1]}`;
        await this.bucket.upload(images[x].path, {
          destination: `products/${this.productID}/${newFileName}`
        });  
      }
      catch (e){
        console.log(e)
        errors.push(images[x].originalname);
      }
    }

    return errors;
  }

  async getProductImages() {
    let imageLinks = [];
    const imageFiles = await this.bucket.getFiles({prefix: `products/${this.productID}`});

    for(let x = 0; x < imageFiles.length; x++) {
      let images = imageFiles[x];

      for(let y = 0; y < images.length; y++) {
        imageLinks.push({
          url: (await images[y].getSignedUrl({action: 'read', expires: Date.now()*1.25})).join(),
          id: images[y].name
        })
      }
    }
    
    return imageLinks;
  }

  static async addImagesToProductsQuery(products: any[]) {
    const bucket = await connectToFirestore();
    for(let x = 0; x < products.length; x++) {
      const connector = new ProductImageUploader(String(products[x]._id), bucket);
      products[x] = {images: await connector.getProductImages(), ...products[x].toJSON()};
    }
    return products;
  }  
}

export default ProductImageUploader;