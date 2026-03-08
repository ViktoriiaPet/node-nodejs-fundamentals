import fs from 'fs'; // для createReadStream
import fsp from 'fs/promises'; // для readFile
import crypto from 'crypto';

const verify = async () => {
  let checksums;

  try {
    const data = await fsp.readFile('checksums.json', 'utf-8');
    checksums = JSON.parse(data);
  } catch (err) {
    console.error("FS operation failed");
    process.exit(1);
  }

  function sha256File(filePath) {
    return new Promise((resolve, reject) => {
      const hash = crypto.createHash('sha256');
      const stream = fs.createReadStream(filePath);

      stream.on('error', reject);
      hash.on('error', reject);

      stream.on('end', () => {
        resolve(hash.digest('hex'));
      });

      stream.pipe(hash);
    });
  }

  for (const [file, expectedHash] of Object.entries(checksums)) {
    try {
      const actualHash = await sha256File(file);
      if (actualHash === expectedHash) {
        console.log(`${file} — OK`);
      } else {
        console.log(`${file} — FAIL`);
      }
    } catch (err) {
      console.log(`${file} — ERROR`);
    }
  }
};

await verify();