chrome.runtime.onInstalled.addListener(function(){
    const menu = chrome.contextMenus.create({
        id: "store",
        title: "'%s' is selected",
        contexts: ['selection']
    });
});

chrome.contextMenus.onClicked.addListener(function(info, tab){
    headword = info.selectionText;

    chrome.storage.sync.set({[headword]: "test"}, function() {
        console.log(chrome.runtime.lastError);
        console.log(headword + " is stored.");

        check = chrome.storage.sync.get(null, function(items) {
            console.log("storage: ");
            console.log(items);
        });
    });
});