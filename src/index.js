const readline = require('readline');
const AutoCompleteTrie = require('./AutoCompleteTrie');
const createCommands = require('./commands');

const trie = new AutoCompleteTrie();
const commands = createCommands(trie);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("=== AutoComplete Trie Console ===");
console.log("Type 'help' for commands\n");

function promptUser() {
  rl.question('> ', (input) => {
    const trimmed = input.trim();
    if (!trimmed) return promptUser();

    const parts = trimmed.split(/\s+/); 
    const commandName = parts[0].toLowerCase();
    const args = parts.slice(1);

    if (commandName === 'exit') {
        console.log('Goodbye!');
        rl.close();
        return;
    }

    const command = commands[commandName];

    if (!command) {
        console.log(`Unknown command: '${commandName}'. Type 'help' for available commands.`);
    } else if (args.length < command.numOfArgs) {
        console.log(`✗ Missing arguments. Usage: ${commandName} ${command.usage}`);
    } else {
        try {
            if (commandName === 'help') {
                command.activate(commands);
            } else {
                command.activate(args);
            }
        } catch (error) {
            console.log(`Error: ${error.message}`);
        }
    }

    console.log();
    promptUser();
  });
}

promptUser();