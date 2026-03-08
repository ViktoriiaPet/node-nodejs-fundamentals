const dynamic = async () => {
  const plaginName = process.argv[2];

  async function runPlagin(plaginName) {
    try{
      const module = await import(`./plugins/${plaginName}.js`);
      const { run } = module;
      console.log(run());
    } catch (err){
      console.error("Plugin not found")
      process.exit(1);
    }
  }
  
runPlagin(plaginName);

  // Write your code here
  // Accept plugin name as CLI argument
  // Dynamically import plugin from plugins/ directory
  // Call run() function and print result
  // Handle missing plugin case
};

await dynamic();
