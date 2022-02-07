var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;
const STORAGE_KEY = 'questDB'

function createQuestsTree() {
    gQuestsTree = _loadQuestsFromStorage(STORAGE_KEY);
    if (!gQuestsTree) {
        gQuestsTree = createQuest('Male?');
        gQuestsTree.yes = createQuest('Gandhi');
        gQuestsTree.no = createQuest('Rita');

    }
    _saveQuestsToStorage();
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}

function moveToNextQuest(res) {
    //update the gPrevQuest, gCurrQuest global vars
    gPrevQuest = gCurrQuest;
    console.log('gPrevQuest', gPrevQuest);
    gCurrQuest = gPrevQuest[res]; // yes or no
    console.log('gCurrQuest', gCurrQuest);
    return gCurrQuest;
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
    // Create and Connect the 2 Quests to the quetsions tree
    const newQuest = createQuest(newQuestTxt); // create new quest
    newQuest.yes = createQuest(newGuessTxt);
    newQuest.no = gCurrQuest
    gPrevQuest[lastRes] = newQuest; // connect the new quest to the tree
    _saveQuestsToStorage(STORAGE_KEY, gQuestsTree)


}

function getCurrQuest() {
    return gCurrQuest
}



function _saveQuestsToStorage() {
    saveToStorage(STORAGE_KEY, gCurrQuest)
}

function _loadQuestsFromStorage() {
    gCurrQuest = loadFromStorage(STORAGE_KEY)

}