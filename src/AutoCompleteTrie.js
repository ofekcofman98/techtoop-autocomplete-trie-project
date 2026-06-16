class AutoCompleteTrie {
  constructor(value = '') {
    this.value = value;
    this.children = {};
    this.endOfWord = false;
    }

    addWord(word) {
        word = word.toLowerCase();

        let currentNode = this;

        for (let char of word) {
            if (!currentNode.children[char]) {
                currentNode.children[char] = new AutoCompleteTrie(char);
            }
            
            currentNode = currentNode.children[char];
        }

        currentNode.endOfWord = true;
  }

  findWord(word) {
    word = word.toLowerCase();

    let currentNode = this;

    for (let char of word) {
      if (!currentNode.children[char]) {
        return false;
      } 
      currentNode = currentNode.children[char];
    }

    return currentNode.endOfWord;
  }

  predictWords(prefix) {
    prefix = prefix.toLowerCase();

    let startingNode = this._getRemainingTree(prefix, this);

    if (!startingNode) return [];

    return this._allWordsHelper(prefix, startingNode, []);
  }


  _getRemainingTree(prefix, node) {
    if (prefix === '') {
        return node;
    }

    const firstChar = prefix[0];
    const remainingPrefix = prefix.slice(1);

    if (!node.children[firstChar]) {
        return null;
    }

    return this._getRemainingTree(remainingPrefix, node.children[firstChar]);
  }

  _allWordsHelper(prefix, node, allWords) {
    if (node.endOfWord) {
      allWords.push(prefix);
    }

    for(let char in node.children) {
      let childNode = node.children[char];
      this._allWordsHelper(prefix + char, childNode, allWords);
    }

    return allWords;
  }
}

export default AutoCompleteTrie;