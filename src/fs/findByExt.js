import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url'

const findByExt = async () => {
  const inpExt = process.argv[3]

  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)

  const workspacePath = path.join(__dirname, '..', '..', 'workspace').replace(/\\/g, '/')
  
  if (!fs.existsSync(workspacePath)) {
    throw new Error('FS operation failed');
  }

  let ways = [];
  function crowl(dir = workspacePath) {
  const files = fs.readdirSync(dir)
      for (const file in files) {
        const next = path.join(dir, files[file])
        const relativePath = path.relative(workspacePath, next).replace(/\\/g, '/');
        if (fs.lstatSync(next).isDirectory() === true ) {
          crowl(next)
        } else {
          const fullname = path.basename(next)
          if(inpExt === path.extname(fullname).slice(1)){
          ways.push(relativePath)
          }
        }
      }
      }
crowl(workspacePath)
ways.sort()
ways.forEach(way => {
  console.log(way)
});
  // Write your code here
  // Recursively find all files with specific extension
  // Parse --ext CLI argument (default: .txt)
};

await findByExt();
