const AutoCompleteTrie = require('../src/AutoCompleteTrie');

describe('AutoCompleteTrie - Basic Operations', () => {
  let trie;

  beforeEach(() => {
    trie = new AutoCompleteTrie();
  });

  // ==========================================
  //  addWord Tests
  // ==========================================
  
  test('addWord should add a word to the trie', () => {
    trie.addWord('cat');

    expect(trie.children['c']).toBeDefined();
    expect(trie.children['c'].children['a']).toBeDefined();
    expect(trie.children['c'].children['a'].children['t']).toBeDefined();
    
    expect(trie.children['c'].endOfWord).toBe(false);
    expect(trie.children['c'].children['a'].endOfWord).toBe(false);
    expect(trie.children['c'].children['a'].children['t'].endOfWord).toBe(true);  
  });

  test('addWord should reuse existing nodes for words with the same prefix', () => {
    trie.addWord('cat');
    trie.addWord('car');

    const nodeAForCat = trie.children['c'].children['a'];
    
    expect(nodeAForCat.children['t']).toBeDefined();
    expect(nodeAForCat.children['r']).toBeDefined();
    
    expect(nodeAForCat.children['t'].endOfWord).toBe(true);
    expect(nodeAForCat.children['r'].endOfWord).toBe(true);
  });

  test('addWord should convert uppercase words to lowercase automatically', () => {
    trie.addWord('CAT');

    expect(trie.children['C']).toBeUndefined();
    expect(trie.children['c']).toBeDefined();
    expect(trie.children['c'].children['a'].children['t'].endOfWord).toBe(true);  
  });


  // ==========================================
  //  findWord Tests
  // ==========================================

  test('findWord should return true for an existing word', () => {
    trie.addWord('cat');
    trie.addWord('car');

    expect(trie.findWord('cat')).toBe(true);
    expect(trie.findWord('car')).toBe(true);
  });

  test('findWord should return false for a non-existing word', () => {
    expect(trie.findWord('dog')).toBe(false);
  });

  test('findWord should return false for a prefix that is not a complete word', () => {
    trie.addWord('cat');

    expect(trie.findWord('ca')).toBe(false);
  });

  test('findWord should find a word even if searched with uppercase letters', () => {
    trie.addWord('cat');
    trie.addWord('car');

    expect(trie.findWord('CAT')).toBe(true);
    expect(trie.findWord('CaR')).toBe(true);
  });


  // ==========================================
  //  predictWords Tests
  // ==========================================

  test('should return all words matching the prefix', () => {
    trie.addWord('cat');
    trie.addWord('car');
    trie.addWord('card');
    trie.addWord('dog');

    const suggestions = trie.predictWords('ca');
    
    expect(suggestions).toContain('cat');
    expect(suggestions).toContain('car');
    expect(suggestions).toContain('card');

    expect(suggestions).not.toContain('dog');

    expect(suggestions.length).toBe(3);
  });

  test('should return an empty array if prefix does not exist', () => {
    trie.addWord('cat');
    
    const suggestions = trie.predictWords('ba');
    expect(suggestions).toEqual([]);
  });

  test('should include the prefix itself if it is also a complete word', () => {
    trie.addWord('car');
    trie.addWord('card');

    const suggestions = trie.predictWords('car');
    expect(suggestions).toContain('car');
    expect(suggestions).toContain('card');
    expect(suggestions.length).toBe(2);
  });
});