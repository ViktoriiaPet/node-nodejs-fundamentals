import fs from 'fs';
import fsp from 'fs/promises';
import path from 'path';
import { createBrotliDecompress } from 'zlib';

const decompressDir = async () => {

   const sourceDir = path.join('workspace', 'compressed');
  const archivePath = path.join(sourceDir, 'archive.br');
  const targetDir = path.join('workspace', 'decompressed');

  try {
    await fsp.access(sourceDir);
    await fsp.access(archivePath);
  } catch {
    throw new Error('FS operation failed');
  }

  await fsp.mkdir(targetDir, { recursive: true });

  const brotli = createBrotliDecompress();
  const stream = fs.createReadStream(archivePath);

  let buffer = '';

  stream.pipe(brotli);

  for await (const chunk of brotli) {

    buffer += chunk.toString();
    
  }

  const parts = buffer.split('\n').filter(Boolean);

  for (let i = 0; i < parts.length; i += 2) {

    const meta = JSON.parse(parts[i]);
    const data = parts[i + 1];

    const filePath = path.join(targetDir, meta.path);
    await fsp.mkdir(path.dirname(filePath), { recursive: true });
    await fsp.writeFile(filePath, data);
  }

  // Write your code here
  // Read archive.br from workspace/compressed/
  // Decompress and extract to workspace/decompressed/
  // Use Streams API
};

await decompressDir();
