import {readFile, writeFile,} from 'fs';
import path from 'path';
import {Storage, Bucket} from '@google-cloud/storage';

let bucket = null as Bucket;

function establishConnection() {
  if (!bucket) {
    bucket = new Storage({
      projectId: process.env.FIREBASE_PROJECT_ID,
      keyFilename: path.join(__dirname, '..', '..', 'tmp', 'firebase-private-keys.json')
    }).bucket(process.env.FIREBASE_BUCKET);
  }
}

function createTemporaryKeyFile() {
  const filePath = path.join(__dirname, '..', '..', 'tmp', 'firebase-private-keys.json');

  return new Promise((resolve, reject) => {
    readFile(filePath, {encoding: 'utf-8'}, err => {
      if (err) {
        writeFile(filePath, process.env.FIREBASE_FILE_KEYS, {encoding: 'utf-8'}, writeError => {
          if (!writeError) {
            console.log('início')
            resolve(true);
            return;
          }
          reject(false);
        });
        return;
      }
      resolve(true);
    });
  });
}

export default async function connectToFirestore() {
  if(await createTemporaryKeyFile()) {
    establishConnection();
    return bucket;
  }
  return null;
}