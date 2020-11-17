chrome.runtime.onInstalled.addListener(function(){
    const menu = chrome.contextMenus.create({
        id: "store",
        title: "'%s' is selected",
        contexts: ['selection']
    });
});

chrome.contextMenus.onClicked.addListener(function(info, tab){
    console.log("clicked.");
});