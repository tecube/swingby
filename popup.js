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

    meanings_textarea.addEventListener("blur", function(event) {
        var meanings_textarea = event.target;
        var meanings_str = meanings_textarea.value;

        chrome.storage.sync.set({[headword]: meanings_str});

        disable_editing_meanings(meanings_textarea);
    });
}

function disable_editing_meanings(meanings_textarea) {
    var meanings_div = meanings_textarea.nextSibling;
    meanings_div.textContent = meanings_textarea.value;

    meanings_textarea.remove();

    meanings_div.style.display = "block";
}

function generate_output_str(words_ul) {
    output = "";
    li_list = words_ul.querySelectorAll("li");

    for(var i = 0, len = li_list.length; i < len; i++) {
        var li = li_list[i];
        output += li.getElementsByClassName("headword")[0].textContent;
        output += "\t";
        output += li.getElementsByClassName("meanings")[0].textContent;
        output += "\n\n";
    }

    return output;
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

    // Generate a string to be imported to Quizlet
    var export_link = document.getElementById("export");
    export_link.addEventListener("click", function() {
        var word_ul = document.getElementById("word-list");
        var output_str = generate_output_str(word_ul);
        var output_textnode = document.createTextNode(output_str);
        var output_textarea = document.getElementById("output");
        output_textarea.appendChild(output_textnode);

        // Copy the string
        output_textarea.select();
        document.execCommand("copy");
    });
});