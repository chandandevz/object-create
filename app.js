// get value from input field
let imgSrcField = document.querySelector("#imgSrc");
let titleField = document.querySelector("#title");
let fileLinkField = document.querySelector("#fileLink");

//set value to object template
let displayImgSrc = document.getElementById("displayImgSrc");
let displayTitle = document.getElementById("displayTitle");
let displayFileLink = document.getElementById("displayFileLink");

let btn = document.querySelector("button");


// trigger input event to show data
imgSrcField.addEventListener("input", function(){
    
     displayImgSrc.innerText = imgSrcField.value;
});

titleField.addEventListener("input", function(){
    
     displayTitle.innerText = titleField.value;
});

fileLinkField.addEventListener("input", function(){
    
     displayFileLink.innerText = fileLinkField.value;
});