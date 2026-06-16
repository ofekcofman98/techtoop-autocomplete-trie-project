import AutoCompleteTrie from "../src/AutoCompleteTrie.js";

const trie = new AutoCompleteTrie();
let wordCount = 0;

const addButton = document.getElementById("add-button");
const wordInput = document.getElementById("word-input");
const searchInput = document.getElementById('search-input');
const alertBox = document.getElementById('alert-box');
const suggestionsBox = document.getElementById('suggestions-box');
const wordsCountDisplay = document.getElementById('words-count');


// 1. UI Rendering

function showAlert(message, type) {
    alertBox.textContent = message;
    alertBox.className = `alert ${type}`;
    setTimeout(() => alertBox.className = 'alert hidden', 3000);
}


function updateWordCounter() {
    wordsCountDisplay.textContent = wordCount;
}


function clearSuggestions() {
    suggestionsBox.innerHTML = '';
    suggestionsBox.classList.add('hidden');
}


function renderSuggestions(suggestions, prefix) {
    suggestionsBox.innerHTML = '';
    
    suggestions.forEach(word => {
        const li = createSuggestionItem(word, prefix);
        suggestionsBox.appendChild(li);
    });

    suggestionsBox.classList.remove('hidden');
}


function createSuggestionItem(word, prefix) {
    const li = document.createElement('li');
    const lowerPrefix = prefix.toLowerCase();

    if (word.startsWith(lowerPrefix)) {
        const suffix = word.slice(prefix.length);
        li.innerHTML = `<strong>${lowerPrefix}</strong>${suffix}`;
    } else {
        li.textContent = word;
    }

    li.addEventListener('click', () => {
        searchInput.value = word;
        clearSuggestions();
    });

    return li;
}

// 2. Business Logic

function handleAddWord(word) {
    if (word === '') {
        showAlert('✗ Cannot add empty word', 'error');
        return;
    }

    if (trie.findWord(word)) {
        showAlert(`'${word}' is already in the dictionary`, 'error');
        wordInput.value = '';
        return;
    }

    trie.addWord(word);
    wordCount++;

    updateWordCounter();
    showAlert(`✓ Added '${word.toLowerCase()}' to dictionary`, 'success');
    wordInput.value = '';

    refreshSuggestions(searchInput.value.trim());
}


function refreshSuggestions(prefix) {
    if (prefix === '') {
        clearSuggestions();
        return;
    }

    const suggestions = trie.predictWords(prefix);

    if (suggestions.length === 0) {
        clearSuggestions();
        return;
    }

    renderSuggestions(suggestions, prefix);
}


// 3. Event Listeners

addButton.addEventListener('click', () => {
    const word = wordInput.value.trim();
    handleAddWord(word);
});

searchInput.addEventListener('input', (event) => {
    const prefix = event.target.value.trim(); 
    refreshSuggestions(prefix);
});
