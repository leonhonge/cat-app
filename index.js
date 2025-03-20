
// providing variables according to their respective IDs in the html file 
const catPress = document.getElementById("catbut");
const catContainer = document.getElementById("catcontainer");
const favPress = document.getElementById("favbut");
const favContainer = document.getElementById("favcontainer");
const nextPress = document.getElementById("next");
const prevPress = document.getElementById("prev");

// initializes the image
let imageurl = "";

// initializes the history array
let history = [];

// initializes the index
let index = -1;

// gets the favorite pictures from refresh
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// displays the current image by looking through the history array
function currDisplay(){
    if(index >= 0 && index < history.length){

        // resets the previous image
        catContainer.innerHTML = "";

        // the webpage creates a new image element
        const image = document.createElement("img");
        image.src = history[index];
        
        // resets the cat container
        catContainer.innerHTML = "";

        // the cat container is now filled with the new image
        catContainer.appendChild(image);
    }
    
}

function favDisplay(){
    // resets the favorites container
    favContainer.innerHTML = "";

    // adds each favorite image to the favorites container
    favorites.forEach(imageurl => {
        const favImg = document.createElement("img");
        favImg.src = imageurl;
        favContainer.appendChild(favImg);
    });
}

// providing a function that runs when the button is pressed
catPress.addEventListener("click", () => {
    // changes the button text to loading to indicate that the picture is loading
    catPress.textContent = "LOADING...";

    // fetches a cat image from the API
    fetch("https://cataas.com/cat?json=true")
        .then(response => {
            // checks if the call to the API connected
            if(!response.ok){
                throw new Error("Network response failed");
            }
            return response.json();
        })
        .then(data=>{
            // builds the image from the website
            imageurl = data.url;

            // pushes the image into the history array
            history.push(imageurl);

            // sets the index to be the last index of the history array
            index = history.length - 1;
            
            // displays current image
            currDisplay();

            // the button resets to original text
            catPress.textContent = "Show me a cute cat!";
        })
        
        // any error encounters
        .catch(error => {
            console.error("The call encountered a problem with the fetch:", error);
            catPress.textContent = "Show me a cute cat!";
        })
});

favPress.addEventListener("click", ()=>{
    // checks if the imageurl exists and that the favorites array does not include the current image
    if(imageurl && !favorites.includes(imageurl)){

        // adds the image to the favorites array
        favorites.push(imageurl);

        // add the image to local storage
        localStorage.setItem("favorites", JSON.stringify(favorites));

        // display favorite images
        favDisplay();
    }
});

nextPress.addEventListener("click", () => {
    catPress.textContent = "LOADING...";
    
    // if the history index is less than the last index, we can go next
    if(index < history.length - 1){
        index++;
        currDisplay();
        
    }
    catPress.textContent = "Show me a cute cat!";
});

prevPress.addEventListener("click", () => {
    catPress.textContent = "LOADING...";

    // if the history index is greater than or equal to the first index, we can go previous
    if(index >= 0){
        index--;
        currDisplay();
        
    }
    catPress.textContent = "Show me a cute cat!";
});

// display favorite images
favDisplay();