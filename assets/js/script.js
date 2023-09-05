// Get the DOM elements
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const recipesContainer = document.getElementById('recipesContainer');

let searchQuery = "";
const APP_Key = '9ddc8cb8ba63145367540ecdb0325eca';
const APP_ID = '768d6b62';

let lastFetchedRecipes = [];

// Event Listener for search button click
searchButton.addEventListener('click', function() {
    const searchQuery = searchInput.value;
    fetchRecipes(searchQuery);
});

// Function to fetch recipes
function fetchRecipes(query) {
    fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_Key}&from=0&to=10`)
        .then(response => response.json())
        .then(data => {
            console.log(data.hits);
            lastFetchedRecipes = data.hits;
            displayRecipes(data.hits);
        });
}

function displayRecipes(recipes) {
    recipesContainer.innerHTML = '';
    recipes.forEach(recipe => {
        const recipeData = recipe.recipe;

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
    fetchYouTubeVideos(recipeLabel);
}

function fetchYouTubeVideos(query) {
    const youtubeApiKey = 'AIzaSyDlsKcDuBF3IJ7tLet9c-tx9HslfPMTFGw'; 
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${youtubeApiKey}&maxResults=5&type=video`)
        .then(response => response.json())
        .then(data => {
            console.log(data.items);
            displayYouTubeVideos(data.items);
        })
        .catch(error => {
            console.error('Error fetching YouTube data:', error);
        });
}

function displayYouTubeVideos(videos) {
    recipesContainer.innerHTML = ''; 
  
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
        displayRecipes(lastFetchedRecipes); // Redisplay previous recipes
    };

    recipesContainer.appendChild(backButton);
}

function saveRecipe(recipeName) {
    if (typeof(Storage) !== "undefined") {
        let savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
        if (!savedRecipes.includes(recipeName)) {
            savedRecipes.push(recipeName);
            localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
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
    checkbox.checked = !checkbox.checked;
}
