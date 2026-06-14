const createCommands = (trie) => ({
    add: {
        numOfArgs: 1,
        usage: '<word>',
        explanation: 'Add word to dictionary',
        activate: function(args) {
            const [word] = args;
            trie.addWord(word);
            console.log(`✓ Added '${word}' to dictionary`);
        }
    },
    find: {
        numOfArgs: 1,
        usage: '<word>',
        explanation: 'Check if word exists',
        activate: function(args) {
            const [word] = args;
            const exists = trie.findWord(word);
            if (exists) {
                console.log(`✓ '${word}' exists in dictionary`);
            } else {
                console.log(`✗ '${word}' not found in dictionary`);
            }
        }
    },
    complete: {
        numOfArgs: 1,
        usage: '<prefix>',
        explanation: 'Get completions',
        activate: function(args) {
            const [prefix] = args;
            const suggestions = trie.predictWords(prefix);
            if (suggestions.length > 0) {
                console.log(`${`Suggestions for '${prefix}':`} ${suggestions.join(', ')}`);
            } else {
                console.log(`No suggestions found for '${prefix}'`);
            }
        }
    },
    help: {
        numOfArgs: 0,
        usage: '',
        explanation: 'Show this message',
        activate: function(allCommands) {
            console.log("Commands:");
            for (let name in allCommands) {
                console.log(`  ${name.padEnd(15)} - ${allCommands[name].explanation}`);
            }
        }
    }
});

module.exports = createCommands;