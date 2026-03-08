import readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process';
const interactive = () => {

  const rl = readline.createInterface({input, output, prompt: '> '})
  rl.prompt()

    rl.on('line', (line) => {
    const command = line.trim()

    switch (command) {
      case 'uptime':
        console.log(`Uptime: ${process.uptime()}s`)
        break
      case 'cwd':
        console.log(process.cwd())
        break
      case 'date':
        console.log(new Date().toISOString())
        break
      case 'exit':
        console.log('Goodbye!')
        rl.close()
        return
      default:
        console.log('Unknown command')
    }
    rl.prompt()
  })

rl.on('SIGINT', () => {
    console.log('Goodbye!')
    rl.close()
  })

  rl.on('close', () => {
    process.exit(0)
  })

  // Write your code here
  // Use readline module for interactive CLI
  // Support commands: uptime, cwd, date, exit
  // Handle Ctrl+C and unknown commands
};

interactive();
