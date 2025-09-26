$(document).ready(function() {
    // Sample Recipe Data (acting as a local database)
    const recipes = [
        {
            id: 1,
            title: "Spaghetti Carbonara",
            description: "A classic Italian pasta dish with eggs, cheese, and pancetta.",
            image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=2070",
            cuisine: "Italian",
            difficulty: "Easy",
            cookTime: "25 min",
            ingredients: ["200g spaghetti", "100g pancetta", "2 large eggs", "50g pecorino cheese", "Black pepper"],
            steps: ["Cook pasta.", "Fry pancetta until crisp.", "Whisk eggs and cheese.", "Combine everything off-heat."]
        },
        {
            id: 2,
            title: "Chicken Tacos",
            description: "Delicious and easy-to-make chicken tacos with fresh salsa.",
            image: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?q=80&w=2071",
            cuisine: "Mexican",
            difficulty: "Easy",
            cookTime: "30 min",
            ingredients: ["2 chicken breasts", "1 packet taco seasoning", "8 small tortillas", "Salsa, lettuce, cheese"],
            steps: ["Cook and shred chicken with seasoning.", "Warm tortillas.", "Assemble tacos with toppings."]
        },
        {
            id: 3,
            title: "Margherita Pizza",
            description: "Simple yet delicious pizza with tomato, mozzarella, and basil.",
            image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?q=80&w=2069",
            cuisine: "Italian",
            difficulty: "Medium",
            cookTime: "20 min",
            ingredients: ["1 pizza dough", "1/2 cup tomato sauce", "150g mozzarella", "Fresh basil leaves"],
            steps: ["Preheat oven to 220°C.", "Roll out dough and spread sauce.", "Top with cheese and basil.", "Bake for 12-15 minutes."]
        },
        {
            id: 4,
            title: "Butter Chicken",
            description: "A rich and creamy Indian curry that is loved worldwide.",
            image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=2070",
            cuisine: "Indian",
            difficulty: "Medium",
            cookTime: "45 min",
            ingredients: ["500g chicken", "1 cup tomato puree", "1/2 cup cream", "Spices (garam masala, turmeric)"],
            steps: ["Marinate and cook chicken.", "Prepare tomato-based gravy.", "Add cream and chicken.", "Simmer and serve."]
        },
         {
            id: 6,
            title: "Paneer Tikka Masala",
            description: "A popular vegetarian Indian dish with grilled paneer in a spicy gravy.",
            image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=2070",
            cuisine: "Indian",
            difficulty: "Medium",
            cookTime: "50 min",
            ingredients: ["250g paneer", "1 cup yogurt", "Spices (tandoori masala)", "Tomato gravy"],
            steps: ["Marinate paneer in yogurt and spices.", "Grill or pan-fry paneer.", "Add to a creamy tomato gravy and simmer."]
        },
        {
            id: 7,
            title: "Chocolate Lava Cake",
            description: "Decadent chocolate dessert with a gooey molten center.",
            image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=2070",
            cuisine: "French",
            difficulty: "Medium",
            cookTime: "20 min",
            ingredients: ["200g dark chocolate", "100g butter", "4 eggs", "100g sugar", "2 tbsp flour"],
            steps: ["Melt chocolate and butter", "Mix eggs and sugar", "Combine all ingredients", "Bake at 200°C for 12 minutes"]
        },
        {
            id: 8,
            title: "Fresh Summer Sushi Roll",
            description: "Light and refreshing sushi rolls with cucumber and avocado.",
            image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=2070",
            cuisine: "Japanese",
            difficulty: "Medium",
            cookTime: "40 min",
            ingredients: ["Sushi rice", "Nori sheets", "Cucumber", "Avocado", "Wasabi"],
            steps: ["Prepare sushi rice", "Layer nori with rice", "Add fillings", "Roll and cut"]
        },
        {
            id: 9,
            title: "Greek Mediterranean Salad",
            description: "Fresh and healthy salad with feta cheese and olives.",
            image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=2070",
            cuisine: "Greek",
            difficulty: "Easy",
            cookTime: "15 min",
            ingredients: ["Cucumber", "Tomatoes", "Red onion", "Feta cheese", "Kalamata olives"],
            steps: ["Chop vegetables", "Add feta and olives", "Dress with olive oil and oregano"]
        },
        {
            id: 10,
            title: "Classic French Croissants",
            description: "Buttery and flaky traditional French pastries.",
            image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=2026",
            cuisine: "French",
            difficulty: "Medium",
            cookTime: "3 hrs",
            ingredients: ["Flour", "Butter", "Yeast", "Milk", "Sugar"],
            steps: ["Prepare dough", "Laminate with butter", "Shape croissants", "Bake until golden"]
        }
    ];

    // Function to render recipes to the grid
    function renderRecipes(recipeList) {
        const recipeGrid = $('#recipe-grid');
        recipeGrid.empty(); // Clear existing recipes
        $('#no-results').addClass('d-none');

        if (recipeList.length === 0) {
            $('#no-results').removeClass('d-none');
            return;
        }

        recipeList.forEach(recipe => {
            const cardHtml = `
                <div class="col">
                    <div class="card h-100 shadow-sm recipe-card" data-id="${recipe.id}">
                        <img src="${recipe.image}" class="card-img-top" alt="${recipe.title}">
                        <div class="card-body">
                            <h5 class="card-title">${recipe.title}</h5>
                            <p class="card-text">${recipe.description}</p>
                        </div>
                        <div class="card-footer bg-transparent border-top-0">
                             <span class="badge bg-secondary me-2">${recipe.cuisine}</span>
                             <span class="badge bg-success">${recipe.difficulty}</span>
                        </div>
                    </div>
                </div>
            `;
            recipeGrid.append(cardHtml);
        });
    }

    // Function to apply filters and search
    function applyFilters() {
        const searchTerm = $('#search-input').val().toLowerCase();
        
        const selectedCuisines = [];
        $('input[name="cuisine"]:checked').each(function() {
            selectedCuisines.push($(this).val());
        });

        const selectedDifficulty = $('input[name="difficulty"]:checked').val();

        let filteredRecipes = recipes.filter(recipe => {
            // Search filter
            const matchesSearch = recipe.title.toLowerCase().includes(searchTerm) || recipe.description.toLowerCase().includes(searchTerm);

            // Cuisine filter
            const matchesCuisine = selectedCuisines.length === 0 || selectedCuisines.includes(recipe.cuisine);

            // Difficulty filter
            const matchesDifficulty = !selectedDifficulty || recipe.difficulty === selectedDifficulty;

            return matchesSearch && matchesCuisine && matchesDifficulty;
        });

        renderRecipes(filteredRecipes);
    }
    
    // Event listener for opening the modal
    $('#recipe-grid').on('click', '.recipe-card', function() {
        const recipeId = $(this).data('id');
        const recipe = recipes.find(r => r.id === recipeId);

        if (recipe) {
            $('#recipeModalLabel').text(recipe.title);
            $('#modal-img').attr('src', recipe.image);
            
            const ingredientsList = $('#modal-ingredients');
            ingredientsList.empty();
            recipe.ingredients.forEach(ing => {
                ingredientsList.append(`<li>${ing}</li>`);
            });

            const stepsList = $('#modal-steps');
            stepsList.empty();
            recipe.steps.forEach(step => {
                stepsList.append(`<li>${step}</li>`);
            });

            $('#recipeModal').modal('show');
        }
    });

    // Event listeners for filters and search
    $('#search-input').on('keyup', applyFilters);
    $('#filter-form').on('change', 'input', applyFilters);
    $('#filter-form').on('reset', function() {
        setTimeout(applyFilters, 0); // Allow reset to complete before refiltering
    });

    // Initial render of all recipes
    renderRecipes(recipes);
});