import { Transform } from 'stream';

const lineNumberer = () => {

  let buffer = '';
  let count = 1;

  const transformer = new Transform({
    transform(chunk, encoding, callback) {
      buffer += chunk.toString();
      const lines = buffer.split('\n');
      buffer = lines.pop();

      for (const line of lines) {
        this.push(`${count} | ${line}\n`);
        count++;
      }

      callback();
    },
    flush(callback) {
      if (buffer) {
        this.push(`${count} | ${buffer}`);
      }
      callback();
    }
  });

  process.stdin.pipe(transformer).pipe(process.stdout);
  // Write your code here
  // Read from process.stdin
  // Use Transform Stream to prepend line numbers
  // Write to process.stdout
};

lineNumberer();
