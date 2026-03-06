import fs from 'fs'
import path from 'path'

const restore = async () => {
  const snapshotPath = path.join(process.cwd(), 'snapshot.json')
  const restorePath = path.join(process.cwd(), 'workspace_restored')
  if (!fs.existsSync(snapshotPath)) {
  throw new Error('FS operation failed')
}
if (fs.existsSync(restorePath)) {
  throw new Error('FS operation failed')
}
const snapshotData = fs.readFileSync(snapshotPath, 'utf-8')
const snapshot = JSON.parse(snapshotData)

fs.mkdirSync(restorePath)

for (const entry of snapshot.entries) {
  const fullPath = path.join(restorePath, entry.path)
  if (entry.type === 'directory') {
  fs.mkdirSync(fullPath, { recursive: true })
}
  if (entry.type === 'file') {
  const buffer = Buffer.from(entry.content, 'base64')
  fs.mkdirSync(path.dirname(fullPath), { recursive: true })
  fs.writeFileSync(fullPath, buffer)

}
}

  // Write your code here
  // Read snapshot.json
  // Treat snapshot.rootPath as metadata only
  // Recreate directory/file structure in workspace_restored
};

await restore();
