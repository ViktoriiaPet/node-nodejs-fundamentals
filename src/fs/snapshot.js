import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url'

const snapshot = async () => {
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const workspacePath = path.join(__dirname, '..', '..', 'workspace').replace(/\\/g, '/')

if (!fs.existsSync(workspacePath)) {
  throw new Error('FS operation failed');
}

const entries = [];
  function crowl(dir){
    const files = fs.readdirSync(dir)
    for (const file in files) {
      const next = path.join(dir, files[file])
      const stats = fs.statSync(next);
      const relativePath = path.relative(workspacePath, next).replace(/\\/g, '/');
      if (fs.lstatSync(next).isDirectory() === true ) {
        entries.push({
        path: relativePath,
        type: 'directory'
      });
        crowl(next)
      } else {
        let fileData = fs.readFileSync(next)
        entries.push({
          path: relativePath,
          type: 'file',
          size: stats.size,
          content: fileData.toString('base64')
        })
      }
    }
  }
  crowl(workspacePath)
  const snapshot = {
  rootPath: workspacePath,
  entries: entries
};
  fs.writeFileSync(path.join(workspacePath,'..','snapshot.json'), JSON.stringify(snapshot, null, 2))
}

await snapshot();
