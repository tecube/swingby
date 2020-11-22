function build_stored_word_list_html(items) {
    var word_ul = document.getElementById("word-list");

    for(headword in items) {
        var li = document.createElement("li");
        li.className = headword;

        // Add headword text
        var headword_div = document.createElement("div");
        headword_div.className = "headword";
        var headword_textnode = document.createTextNode(headword);
        headword_div.appendChild(headword_textnode)
        li.appendChild(headword_div);

        // Add meanings text
        var meanings_div = document.createElement("div");
        meanings_div.className = "meanings";
        var meanings_str = items[headword];
        var meanings_textnode = document.createTextNode(meanings_str);
        meanings_div.appendChild(meanings_textnode)
        li.appendChild(meanings_div);

        // Add a handler for editing the meanings
        meanings_div.addEventListener("click", enable_editing_meanings);

        word_ul.appendChild(li);
    }
}

function enable_editing_meanings(event) {
    var meanings_div = event.target;
    var parent = event.target.parentNode;
    var meanings_textarea = document.createElement("textarea");

    meanings_textarea.value = meanings_div.textContent;

    parent.insertBefore(meanings_textarea, meanings_div);

    meanings_div.style.display = "none";
    meanings_textarea.focus();

    meanings_textarea.addEventListener("blur", disable_editing_meanings);
}

function disable_editing_meanings(event) {
    var meanings_textarea = event.target;

    var meanings_div = meanings_textarea.nextSibling;
    meanings_div.textContent = meanings_textarea.value;

    meanings_textarea.remove();

    meanings_div.style.display = "block";
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