function build_stored_word_list_html(items) {
    var word_ul = document.getElementById("word-list");

    for(headword in items) {
        var li = document.createElement("li", {"id": "headword-" + headword});
        var t = document.createTextNode(headword);
        console.log(headword)
        li.appendChild(t);
        word_ul.appendChild(li);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.sync.get(null, build_stored_word_list_html);

    var clear_yes = document.getElementById("yes");
    clear_yes.style.display = "none";
    
    // Add clear button's behavior:
    //   if pushed, show confirmation button 'yes'
    var clear_link = document.getElementById("clear");
    clear_link.addEventListener("click", function(){
        clear_yes.style.display = "inline-block";
    }, false);
    
    clear_yes.addEventListener("mouseout", function(){
        clear_yes.style.display = "none";
    }, false);
    
    clear_yes.addEventListener("click", function(){
        chrome.storage.sync.clear();
        clear_yes.style.display ="none";
    }, false);
});