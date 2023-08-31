document.addEventListener("DOMContentLoaded", function () {
    var searchButton = document.getElementById("searchButton");
    var recipeContainer = document.querySelector(".grid");

    searchButton.addEventListener("click", function () {
        var searchTerm = document.querySelector("input[type='text']").value;
        fetchRecipes(searchTerm);
    });

    function fetchRecipes(searchTerm) {
        // Simulate API response (replace with actual API call)
        var fakeApiResponse = [
            { title: "Delicious Pasta", description: "A mouthwatering pasta recipe that you'll love!" },
            { title: "Tasty Chicken", description: "A flavorful chicken dish for any occasion." },
            // Put more Data here later when i have more time
        ];

        displayRecipes(fakeApiResponse);
    }

    function displayRecipes(recipeData) {
        // Clear previous results
        recipeContainer.innerHTML = ""; 

        recipeData.forEach(recipe => {
            var recipeCard = document.createElement("div");
            recipeCard.classList.add("bg-white", "rounded-lg", "shadow-md", "p-6");

            var recipeTitle = document.createElement("h2");
            recipeTitle.classList.add("text-xl", "font-semibold", "mb-2");
            recipeTitle.textContent = recipe.title;

            var recipeDescription = document.createElement("p");
            recipeDescription.classList.add("text-gray-600", "mb-4");
            recipeDescription.textContent = recipe.description;

            var getRecipeLink = document.createElement("a");
            getRecipeLink.classList.add("text-blue-500", "hover:underline", "mr-4");
            getRecipeLink.href = "#";
            getRecipeLink.textContent = "Get Recipe";

            recipeCard.appendChild(recipeTitle);
            recipeCard.appendChild(recipeDescription);
            recipeCard.appendChild(getRecipeLink);

            recipeContainer.appendChild(recipeCard);
        });
    }
});
