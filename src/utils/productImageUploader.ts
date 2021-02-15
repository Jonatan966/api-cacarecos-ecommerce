import { Bucket } from "@google-cloud/storage";
import fs from 'fs';
import path from 'path';

class ProductImageUploader {
  productID: string;
  bucket: Bucket;

  constructor(productID: string, bucket: Bucket) {
    this.productID = productID;
    this.bucket = bucket;
  }

  private _saveImagesIntoTmp(images: any[]) {
    images.forEach((img, x) => {
      const newProductsPath = path.join(__dirname, '..', '..', 'tmp', this.productID);
      const newFilePath = path.join(newProductsPath, x + img.originalFilename.substr(-4));
      if (!fs.existsSync(newProductsPath)) {
        fs.mkdirSync(newProductsPath);
      }
      fs.renameSync(img.path, newFilePath);
    });
    return true;
  }

  async uploadImages(images: any[]) {
    this._saveImagesIntoTmp(images);
    let errors = [];

    for (let x = 0; x < images.length; x++) {
      try {
        const newFileName = x + images[x].originalFilename.split('.')[1];
        const oldPath = path.join('tmp', this.productID, newFileName);
        await this.bucket.upload(oldPath, {destination: `products/${this.productID}/${newFileName}`});  
      }
      catch {
        errors.push(images[x].originalFilename);
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
        imageLinks.push((await images[y].getSignedUrl({action: 'read', expires: Date.now()*1.25})).join())
      }
    }
    
    return imageLinks;
  }
}

export default ProductImageUploader;