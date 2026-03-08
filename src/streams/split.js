import fs from 'fs';

const split = async () => {

  const args = process.argv.slice(2);
let maxLines = 10;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--lines') {
    maxLines = Number(args[i + 1]) || 10
  }
}

const createSplit = () => {
  const stream = fs.createReadStream('source.txt', 'utf-8')

  let buffer = ''
  let fileIndex = 1
  let lineCount = 0;
  let writer = fs.createWriteStream(`chunk_${fileIndex}.txt`);

  stream.on('data', chunk => {
    buffer += chunk;
    const lines = buffer.split('\n');
    buffer = lines.pop()
    for (const line of lines) {
      if (lineCount >= maxLines) {
        writer.end();
        fileIndex++
        lineCount = 0;
        writer = fs.createWriteStream(`chunk_${fileIndex}.txt`);
      }

      writer.write(line + '\n');
      lineCount++;
    }
  });

  stream.on('end', () => {
    if (buffer) {
      if (lineCount >= maxLines) {
        writer.end();
        fileIndex++;
        writer = fs.createWriteStream(`chunk_${fileIndex}.txt`);
      }
      writer.write(buffer);
    }
    writer.end()
  });
};

createSplit();

  // Write your code here
  // Read source.txt using Readable Stream
  // Split into chunk_1.txt, chunk_2.txt, etc.
  // Each chunk max N lines (--lines CLI argument, default: 10)
};

await split();
