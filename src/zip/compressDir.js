import fs from 'fs';
import fsp from 'fs/promises';
import path from 'path';
import { createBrotliCompress } from 'zlib';

const compressDir = async () => {

  const sourceDir = path.join('workspace', 'toCompress');
  const targetDir = path.join('workspace', 'compressed');
  const archivePath = path.join(targetDir, 'archive.br');

  try {

    await fsp.access(sourceDir);
    
  } catch {

    throw new Error('FS operation failed');

  }

  await fsp.mkdir(targetDir, { recursive: true });

  const files = [];

  const walk = async (dir) => {

    const items = await fsp.readdir(dir, { withFileTypes: true });
    for (const item of items) {
      const full = path.join(dir, item.name);
      const rel = path.relative(sourceDir, full);
      if (item.isDirectory()) {
        await walk(full);
      } else {

        files.push({ full, rel })

      }
    }
  };

  await walk(sourceDir);

  const out = fs.createWriteStream(archivePath);
  const brotli = createBrotliCompress();
  brotli.pipe(out);

  for (const file of files) {
    const data = await fsp.readFile(file.full);
    const header = JSON.stringify({ path: file.rel, size: data.length }) + '\n'
    brotli.write(header)
    brotli.write(data)
    brotli.write('\n')
  }
  brotli.end();

  await new Promise((res) => out.on('finish', res));

  // Write your code here
  // Read all files from workspace/toCompress/
  // Compress entire directory structure into archive.br
  // Save to workspace/compressed/
  // Use Streams API
};

await compressDir();
