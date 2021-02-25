import {writeFile, readFileSync, existsSync, mkdirSync} from 'fs';
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
  const tempPath = path.join(__dirname, '..', '..', 'tmp');
  const filePath = path.join(tempPath, 'firebase-private-keys.json');

  return new Promise((resolve, reject) => {
    try {
      const file = readFileSync(filePath);
      resolve(true);
    } catch {
      if (!existsSync(tempPath)) {
        mkdirSync(tempPath);
      }

      writeFile(filePath, process.env.FIREBASE_FILE_KEYS, {encoding: 'utf-8'}, writeError => {
        if (!writeError) {
          resolve(true);
          return;
        }
        reject(false);
      });
    }
  });
}

export default async function connectToFirestore() {
  if(await createTemporaryKeyFile()) {
    establishConnection();
    return bucket;
  }
  return null;
}