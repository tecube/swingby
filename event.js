chrome.runtime.onInstalled.addListener(function(){
    const menu = chrome.contextMenus.create({
        id: "store",
        title: "'%s' is selected",
        contexts: ['selection']
    });
});

chrome.contextMenus.onClicked.addListener(function(info, tab){
    headword = info.selectionText;

    chrome.storage.sync.get([headword], function(items) {
        // Skip if existing word
        if(Object.keys(items).length){
            return;
        }

        // Save the word
        chrome.storage.sync.set({[headword]: "EDIT"});
    });
});