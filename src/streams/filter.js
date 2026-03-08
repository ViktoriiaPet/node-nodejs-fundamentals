import { Transform } from 'stream';

const filter = () => {

  const args = process.argv.slice(2);
let pattern = '';

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--pattern') {
    pattern = args[i + 1] || '';
  }
}

const filterNew = () => {
  let buffer = '';

  const transformer = new Transform({
    transform(chunk, encoding, callback) {
      buffer += chunk.toString();
      const lines = buffer.split('\n');
      buffer = lines.pop();

      for (const line of lines) {
        if (line.includes(pattern)) {
          this.push(line + '\n');
        }
      }

      callback();
    },
    flush(callback) {
      if (buffer && buffer.includes(pattern)) {
        this.push(buffer);
      }
      callback();
    }
  });

  process.stdin.pipe(transformer).pipe(process.stdout);
};

filterNew();

  // Write your code here
  // Read from process.stdin
  // Filter lines by --pattern CLI argument
  // Use Transform Stream
  // Write to process.stdout
};

filter();
