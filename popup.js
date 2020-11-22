function build_stored_word_list_html(items) {
    var word_ul = document.getElementById("word-list");

    for(headword in items) {
        var li = document.createElement("li");
        li.className = headword;

        var t = document.createTextNode(headword);

        li.appendChild(t);
        word_ul.appendChild(li);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // List the stored word as <li>s
    chrome.storage.sync.get(null, build_stored_word_list_html);

    // Hide the storage-clearing confirmation button
    var clear_yes = document.getElementById("yes");
    clear_yes.style.display = "none";
    
    // Add clear button's behavior:
    //   if pushed, show confirmation button 'yes'
    var clear_link = document.getElementById("clear");
    clear_link.addEventListener("click", function(){
        clear_yes.style.display = "inline-block";
    }, false);
    
    // Hide the confirmation button 'yes' if it is mouseouted
    clear_yes.addEventListener("mouseout", function(){
        clear_yes.style.display = "none";
    }, false);
    
    // Clear the stored words data if the 'yes' button is pushed
    clear_yes.addEventListener("click", function(){
        chrome.storage.sync.clear();
        clear_yes.style.display ="none";
    }, false);
});