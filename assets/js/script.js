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