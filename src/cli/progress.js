import { argv } from 'node:process'
const progress = () => {

const inpExt = process.argv.slice(2)

const options = {};

for (let i = 0; i < inpExt.length; i += 2) {
  const key = inpExt[i].replace('--', '');
  const value = inpExt[i + 1];
  options[key] = value;
}

console.log(options)
function startProgressBar (width = 30, time = 5000, waitInterval = 100, color = 0) {

  function isValidHex(hex) {
  return /^#([0-9A-Fa-f]{6})$/.test(hex);
}

function hexToAnsi(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `\x1b[38;2;${r};${g};${b}m`;
}

  const progressBarImage = (progress) =>{
    const fillWidth = Math.floor(progress/100*width)
    const emptyWidth = width - fillWidth
    let fill = '█'.repeat(fillWidth);
    let empty = ' '.repeat(emptyWidth)
     if (color && isValidHex(color)) {
    const ansi = hexToAnsi(color);
    fill = `${ansi}${fill}\x1b[0m`;
  }
    return `[${fill}${empty}] ${progress}%`;
  }


let currentTime = 0;


const interval = setInterval(() => {

    currentTime += waitInterval

    let progressPerc = Math.floor(currentTime / time * 100)

    if (progressPerc >= 100) {
      progressPerc = 100
      process.stdout.write(`\r${progressBarImage(progressPerc)}`)
      clearInterval(interval)
      console.log("\nDone!")
      return
    }

    process.stdout.write(`\r${progressBarImage(progressPerc)}`)

  }, waitInterval)
}
  startProgressBar(
  Number(options.length) || 30,
  Number(options.duration) || 5000,
  Number(options.interval) || 100,
  options.color)

  // Write your code here
  // Simulate progress bar from 0% to 100% over ~5 seconds
  // Update in place using \r every 100ms
  // Format: [████████████████████          ] 67%
};

progress();
