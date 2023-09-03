// Get the DOM elements
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const recipesContainer = document.getElementById('recipesContainer'); // Moved up

let searchQuery = "";
const APP_Key = '9ddc8cb8ba63145367540ecdb0325eca';
const APP_ID = '768d6b62';

let youtubeVideoUrls = {};
let lastFetchedRecipes = []; // To store the last fetched recipes

// Event Listener for search button click
searchButton.addEventListener('click', function() {
    const searchQuery = searchInput.value; // Get the value from the search input
    fetchRecipes(searchQuery);
    fetchYouTubeVideos(searchQuery);
});

// Function to fetch recipes
function fetchRecipes(query) {
    fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_Key}&from=0&to=10`)
        .then(response => response.json())
        .then(data => {
            console.log(data.hits);
            lastFetchedRecipes = data.hits; // Save fetched recipes
            displayRecipes(data.hits);
        });
}

function displayRecipes(recipes) {
    recipesContainer.innerHTML = '';

    recipes.forEach(recipe => {
        const recipeData = recipe.recipe;
        const videoUrl = youtubeVideoUrls[recipeData.label] || '';

        const recipeCard = `
        <div class="bg-white shadow-md rounded p-4 my-4 w-64 inline-block mr-4">
            <img src="${recipeData.image}" alt="${recipeData.label}" class="w-full h-40 rounded-md">
            <h2 class="text-lg font-bold my-2">${recipeData.label}</h2>
            <a href="${recipeData.url}" target="_blank" class="text-blue-500 hover:underline">View Recipe</a>
            <a href="#" onclick="handleWatchVideoClick('${recipeData.label}')" class="text-blue-500 hover:underline">Watch Video</a>
        </div>
    `;

    recipesContainer.innerHTML += recipeCard;
    });
}

function handleWatchVideoClick(recipeLabel) {
    recipesContainer.innerHTML = ''; // Clear the existing recipes
    fetchYouTubeVideos(recipeLabel);
}

function fetchYouTubeVideos(query) {
    const youtubeApiKey = 'AIzaSyDlsKcDuBF3IJ7tLet9c-tx9HslfPMTFGw'; 
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${youtubeApiKey}&maxResults=10&type=video`)
        .then(response => response.json())
        .then(data => {
            console.log(data.items);
            displayYouTubeVideos(data.items); // Pass the video results to the display function
        })
        .catch(error => {
            console.error('Error fetching YouTube data:', error);
        });
}

function displayYouTubeVideos(videos) {
    recipesContainer.innerHTML = ''; // Clear the recipes
  
    videos.forEach(video => {
        const videoTitle = video.snippet.title;
        const videoThumbnail = video.snippet.thumbnails.medium.url;
        const videoUrl = `https://www.youtube.com/watch?v=${video.id.videoId}`;

        const videoCard = `
            <div class="bg-white shadow-md rounded p-4 my-4 w-64 inline-block mr-4">
                <img src="${videoThumbnail}" alt="${videoTitle}" class="w-full h-40 rounded-md">
                <h2 class="text-lg font-bold my-2">${videoTitle}</h2>
                <a href="${videoUrl}" target="_blank" class="text-blue-500 hover:underline">Go to Video</a>
            </div>
        `;

        recipesContainer.innerHTML += videoCard;
    });

    // Add the back button after displaying YouTube videos
    const backButton = document.createElement('button');
    backButton.textContent = "Go Back to Recipes";
    backButton.onclick = function() {
        recipesContainer.innerHTML = ''; // Clear current videos
        displayRecipes(lastFetchedRecipes); // Redisplay previous recipes
    };

    recipesContainer.appendChild(backButton);
}

    
    


function saveRecipe(recipeName) {
    // Check if local storage is supported by the browser
    if (typeof(Storage) !== "undefined") {
        // Retrieve existing saved recipes or initialize an empty array
        let savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
        
        // Check if the recipe is already saved
        if (!savedRecipes.includes(recipeName)) {
            savedRecipes.push(recipeName); // Add the recipe to the list
            localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes)); // Save the updated list
            alert('Recipe saved successfully!');
        } else {
            alert('Recipe is already saved.');
        }
    } else {
        alert('Local storage is not supported by your browser.');
    }
}

function toggleCheckbox(checkboxId) {
    const checkbox = document.getElementById(checkboxId);
    checkbox.checked = !checkbox.checked; // Toggle checkbox's checked state
}

function displayRecipes(recipeData) {
    const recipeContainer = document.querySelector('.grid'); 
    // Clear previous results
    recipeContainer.innerHTML = ""; 

    recipeData.forEach(recipe => {
        const recipeCard = document.createElement("div");
        recipeCard.classList.add("bg-white", "rounded-lg", "shadow-md", "m-4", "p-6", "flex", "flex-col");
        
        // Creates recipe title
        const recipeTitle = document.createElement("h2");
        recipeTitle.classList.add("text-xl", "font-semibold", "mb-2");
        recipeTitle.textContent = recipe.title;

        // Creates recipe description
        const recipeDescription = document.createElement("p");
        recipeDescription.classList.add("text-gray-600", "mb-4");
        recipeDescription.textContent = recipe.description;

        // Create a container for action buttons
        const actionContainer = document.createElement("div");
        actionContainer.classList.add("mt-auto", "flex", "space-x-2");
        
        // Creates the "Get Recipe" link
        const getRecipeLink = document.createElement("a");
        getRecipeLink.classList.add("text-blue-500", "hover:underline");
        getRecipeLink.href = "#";
        getRecipeLink.textContent = "Get Recipe";

        // Creates "Save Recipe" button
        const saveRecipeButton = document.createElement("button");
        saveRecipeButton.classList.add("btn", "btn-primary");
        saveRecipeButton.textContent = "Save Recipe";
        saveRecipeButton.addEventListener("click", function () {
            saveRecipe(recipe.title); // saveRecipe function is place holder for favorites function
        });

        actionContainer.appendChild(getRecipeLink);
        actionContainer.appendChild(saveRecipeButton);
        recipeCard.appendChild(recipeTitle);
        recipeCard.appendChild(recipeDescription);
        recipeCard.appendChild(actionContainer);
        recipeContainer.appendChild(recipeCard);
    });
}
