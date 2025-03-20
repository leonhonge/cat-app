
// providing variables according to their respective IDs in the html file 
const catPress = document.getElementById("catbut");
const catContainer = document.getElementById("catcontainer")

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
            const imageurl = data.url;

            // resets the previous image
            catContainer.innerHTML = "";

            // the webpage creates a new image element
            const image = document.createElement("img");
            image.src = imageurl;

            // the cat container is now filled with the new image
            catContainer.appendChild(image);

            // the button resets to original text
            catPress.textContent = "Show me a cute cat!";
        })
        
        // any error encounters
        .catch(error => {
            console.error("The call encountered a problem with the fetch:", error);
            catPress.textContent = "Show me a cute cat!";
        })
});