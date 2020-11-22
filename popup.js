document.addEventListener('DOMContentLoaded', function() {
    var clear_yes = document.getElementById("yes");
    clear_yes.style.display = "none";
    
    var clear_link = document.getElementById("clear");
    clear_link.addEventListener("click", function(){
        if(clear_yes.style.display=="none"){
            clear_yes.style.display = "inline-block";
        }else{
            clear_yes.style.display = "none";
        }
    }, false);
    
    clear_yes.addEventListener("mouseout", function(){
        clear_yes.style.display = "none";
    }, false);
    
    clear_yes.addEventListener("click", function(){
        chrome.storage.sync.clear();
        clear_yes.style.display ="none";
    }, false);
    
    var option_link = document.getElementById("option");
    option_link.addEventListener("click", function(){
        chrome.tabs.create({ "url": "option.html" });
    }, false);
});