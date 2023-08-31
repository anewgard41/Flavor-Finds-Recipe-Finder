
  // Get the DOM elements
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');

  let searchQuery = "";
  const APP_Key = '9ddc8cb8ba63145367540ecdb0325eca'
  const APP_ID = '768d6b62' 

  // Event Listener for search button click
  searchButton.addEventListener('click', function() {
    const searchQuery = searchInput.value; // Get the value from the search input
    fetchRecipes(searchQuery);
    fetchYouTubeVideos(searchQuery)
  });

  // Function to fetch recipes
  function fetchRecipes(query) {
    fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_Key}&from=0&to=10`)
      .then(response => response.json())
      .then(data => {
        // Handle the data here
        console.log(data.hits);
      })
    }

    function fetchYouTubeVideos(query) {
      const youtubeApiKey = 'AIzaSyDlsKcDuBF3IJ7tLet9c-tx9HslfPMTFGw'; 
      fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${youtubeApiKey}&maxResults=5&type=video`)
        .then(response => response.json())
        .then(data => {
          // Handle the YouTube video data here
          // You can update the videoResultsDiv with the data
          console.log(data.items);
        })
        .catch(error => {
          console.error('Error fetching YouTube data:', error);
        });
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