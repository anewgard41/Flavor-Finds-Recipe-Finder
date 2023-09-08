// Get the DOM elements
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const recipesContainer = document.getElementById('recipesContainer');
const changingHeader = document.getElementById('changingHeader');
// localStorage.clear();
let searchQuery = "";
const APP_Key = '9ddc8cb8ba63145367540ecdb0325eca';
const APP_ID = '768d6b62';

let lastFetchedRecipes = [];
let savedRecipes = [];
// Event Listener for search button click
searchButton.addEventListener('click', function() {
    const searchQuery = searchInput.value;
    changingHeader.innerHTML = "Showing Results for: '" + searchQuery + "'"
    fetchRecipes(searchQuery);
});

// Add an event listener for the "Enter" key press in the input field
searchInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const searchQuery = searchInput.value;
        fetchRecipes(searchQuery)
    }
});

// Function to search for "Chicken"
function searchForChicken() {
    const chickenQuery = 'Chicken';
    searchInput.value = chickenQuery;
    fetchRecipes(chickenQuery);
}

// Function to search for "Pork"
function searchForPork() {
    const porkQuery = 'Pork';
    searchInput.value = porkQuery;
    fetchRecipes(porkQuery);
}

// Function to search for "Beef"
function searchForBeef() {
    const beefQuery = 'Beef';
    searchInput.value = beefQuery;
    fetchRecipes(beefQuery);
}

// Function to search for "Seafood"
function searchForSeafood() {
    const seafoodQuery = 'Seafood';
    searchInput.value = seafoodQuery;
    fetchRecipes(seafoodQuery);
}

// Function to search for "Pasta"
function searchForPasta() {
    const pastaQuery = 'Pasta';
    searchInput.value = pastaQuery;
    fetchRecipes(pastaQuery);
}

// Function to search for "Fruit"
function searchForFruit() {
    const fruitQuery = 'Fruit';
    searchInput.value = fruitQuery;
    fetchRecipes(fruitQuery);
}

// Function to search for "Vegetables"
function searchForVegetables() {
    const vegetablesQuery = 'Vegetables';
    searchInput.value = vegetablesQuery;
    fetchRecipes(vegetablesQuery);
}

// Function to search for "Pizza"
function searchForPizza() {
    const pizzaQuery = 'Pizza';
    searchInput.value = pizzaQuery;
    fetchRecipes(pizzaQuery);
}

// Get the "Home" link element by its ID
const homeLink = document.getElementById('homeLink');
// Add an event listener to the "Home" link
homeLink.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default link behavior
    location.reload(); // Reload the page
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
        <div class="card flex flex-col rounded space-y-2 bg-white rounded p-2 m-2 w-72 shadow-xl">
            <div class="mx-auto rounded bg-white p-2 m-2 flex-1">
            <img src="${recipeData.image}" alt="${recipeData.label}" class="mx-auto">
            <h2 class="text-2xl font-semibold my-2">${recipeData.label}</h2>
            </div>
            <div class = "mx-auto mt-auto">
            <a href="${recipeData.url}" target="_blank" class="inline-flex items-center h-8 px-2 m-1 text-sm transition-colors duration-150 btn rounded-lg focus:shadow-outline">View Recipe</a>
            <a href="#" onclick="handleWatchVideoClick('${recipeData.label}')" class="inline-flex items-center h-8 px-4 m-2 text-sm transition-colors duration-150 btn rounded-lg focus:shadow-outline">Watch Video</a>
            <button class="save-recipe-button" data-recipe='${JSON.stringify(recipeData)}'
            onclick="saveRecipe(JSON.parse(this.getAttribute('data-recipe')))">
              <i class="far fa-heart"></i>
              </button>
            </div>
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
            <div class="bg-white flex flex-col shadow-md rounded p-4 my-4 w-64 inline-block mr-4">
            <div class = "flex-1">     
            <img src="${videoThumbnail}" alt="${videoTitle}" class="w-full h-40 rounded-md">
                <h2 class="text-lg font-bold my-2">${videoTitle}</h2>
                </div>
                <a href="${videoUrl}" target="_blank" class="mt-auto self-start inline-flex items-center h-8 px-4 m-2 text-sm transition-colors duration-150 btn rounded-lg focus:shadow-outline">Go to Video</a>
            </div>
        `;

        recipesContainer.innerHTML += videoCard;
    });

    // Add the back button after displaying YouTube videos
    const backButton = document.createElement('button');
    backButton.textContent = "Go Back to Recipes";
    backButton.classList.add("mt-auto", "mb-auto", "self-start", "items-center", "h-8", "px-4", "m-2", "text-sm", "transition-colors", "duration-150", "btn", "rounded-lg", "focus:shadow-outline");
    backButton.onclick = function() {
        displayRecipes(lastFetchedRecipes); // Redisplay previous recipes
    };

    recipesContainer.appendChild(backButton);
}

const modal = document.getElementById("myModal");
const closeModal = document.querySelector(".close");
const modalText = document.getElementById("modalText");

closeModal.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function showModal(message) {
    modalText.textContent = message;
    modal.style.display = "block";
}


function saveRecipe(recipeData) {
    if (typeof(Storage) !== "undefined" || "null") {
        let savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
        // Check if the recipeData object is not already in savedRecipes
        console.log(savedRecipes)
        const isDuplicate = savedRecipes.some(savedRecipe => savedRecipes.label === recipeData.label);
        if (!isDuplicate) {
            savedRecipes.push(recipeData);
            localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
            console.log(savedRecipes)
            showModal('Recipe saved successfully!');
        } else {
          showModal('Recipe is already saved.');
        }
    } else {
      showModal('Local storage is not supported by your browser.');
    }
  }
  

function displaySavedRecipes(recipes) {
  recipesContainer.innerHTML = '';
  changingHeader.innerHTML = "";
  changingHeader.innerHTML = "Favorite Saved Recipes!"
  console.log(localStorage.getItem('savedRecipes'))
  console.log(recipes)
  recipes.forEach(recipe => {
    const recipeCard = `
    <div class="card flex flex-col rounded space-y-2 bg-white rounded p-2 m-2 w-72 shadow-xl">
            <div class="card__body mx-auto rounded bg-white p-2 m-2 flex-1">
            <img src="${recipes.image}" alt="${recipes.label}" class="mx-auto card__image">
            <h2 class="text-2xl font-semibold my-2">${recipes.label}</h2>
            </div>
            <div class = "mx-auto mt-auto">
            <a href="${recipes.url}" target="_blank" class="inline-flex items-center h-8 px-2 m-1 text-sm transition-colors duration-150 btn rounded-lg focus:shadow-outline">View Recipe</a>
            <a href="#" onclick="handleWatchVideoClick('${recipes.label}')" class="inline-flex items-center h-8 px-4 m-2 text-sm transition-colors duration-150 btn rounded-lg focus:shadow-outline">Watch Video</a>
            </div>
        </div>
`;

          recipesContainer.innerHTML += recipeCard;
      }
  );
  const clearButton = document.createElement('button');
    clearButton.textContent = 'Clear Saved Recipes';
    clearButton.classList.add("mt-auto", "mb-auto", "self-start", "items-center", "h-8", "px-4", "m-2", "text-sm", "transition-colors", "duration-150", "btn", "rounded-lg", "focus:shadow-outline");
  
    // Add an event listener to the Clear button
    clearButton.addEventListener('click', function () {
      // Clear local storage for saved recipes
      localStorage.removeItem('savedRecipes');
      // Hide the Clear button
      clearButton.style.display = 'none';
      // Clear the recipesContainer
      recipesContainer.innerHTML = '';
    });
  
    // Append the Clear button to the recipesContainer
    recipesContainer.appendChild(clearButton);
}
function isRecipeSaved(label) {
  if (typeof(Storage) !== "undefined") {
      let savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
      return savedRecipes.some(savedRecipe => savedRecipe.label === label);
  } else {
      return false;
  }
}

// Check if there are saved recipes in local storage and retrieve them

const recipeHistoryLink = document.getElementById('recipeHistoryLink');

recipeHistoryLink.addEventListener('click', function(event) {
    event.preventDefault();
    console.log(savedRecipes)
    console.log(localStorage.getItem('savedRecipes'))
    displaySavedRecipes(JSON.parse(localStorage.getItem('savedRecipes')));;
});

function toggleCheckbox(checkboxId) {
    const checkbox = document.getElementById(checkboxId);
    checkbox.checked = !checkbox.checked;
}

function clearResults() {
    recipesContainer.innerHTML = '';
    searchInput.value = '';
    lastFetchedRecipes = [];
}


