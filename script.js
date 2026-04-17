//let masterItems = []; 
/*function makeCards() {
    const tbody = document.getElementByID('featuredlist');
    if (!tbody) return;
    let html = "";
    sortedItems.forEach(item => {
        html += `<a href="recipedetails.html" class="card-link">
        <div class = "recipe-card" >
            < div class = "card-inner" >
            < div class = "card-front" >
            < div class = "card-header" >
            < span class = "card-number" > No. $(item.id) < /span> 
            <span class = "card-heart" > &#9825;</span>
            <h3 class= "card-title" > $(item.name) < /h3> < /div >
            <img src = "$(item.images[0])" alt = "recipe" class = "recipefeat" >
            < div class = "card-tags" >
            < span class = "tag" > $(item.season) < /span>
            <span class = "tag" > $(item.cuisine) < /span>
            <span class = "tag" > Prep Time: $(item.prep_time) < /span> < /div >
            </div>
            <div class = "card-back" >
            < div class = "card-header" >
            < span class = "card-number" > No. $(item.id) < /span>
            <span class = "card-heart" > &#9825;</span>
            <h3 class= "card-title" > $(item.name) < /h3> < /div >
            < div class = "card-body" >
            < div class = "card-info" >
            < ul >
            < li > Approximate time to complete: $(item.prep_time) < /li>
            <li > Required ingredients: $(item.ingredients) < /li> < /ul >
            <div class = "card-tags" >
            < span class = "tag" > $(item.season) < /span>
            <span class = "tag" > $(item.cuisine) < /span>
            <span class = "tag" > Prep Time: $(item.prep_time) < /span>
            </div> </div> </div> </div> </div> </a> `
    });
    tbody.innerHTML = html;
}*/

/*
    fetch("./json/winter_recipes.json")
        .then(res => res.json())
        .then(data => {
            masterItems = data;
            makeCards();
        })
        .catch(err => console.error("Could not load table1.json:", err));
*/

console.log("H3110 W0r1d");

/*
============================================================
TO-DO LOGIC
Guard: only runs on todo.html where #CreateTask exists
============================================================
*/

const taskText = document.getElementById('WriteTask');
const taskMake = document.getElementById('CreateTask');
const taskList = document.getElementById('TaskDiv');
const empty = document.getElementById('NoTasks');
let taskCount = 0;


if (taskMake) {

    function addTask(event) {
        event.preventDefault();

        const newText = taskText.value;
        if (newText === "") return;

        taskCount++;
        if (taskCount > 0) {
            empty.style.display = "none"; // hide "no tasks" message
        }

        const EachTask = document.createElement('div');
        const CheckBox = document.createElement('input');
        CheckBox.type = "checkbox";
        const TaskName = document.createElement('span');
        TaskName.innerText = newText;
        const DeleteBtn = document.createElement('input');
        DeleteBtn.type = "button";
        DeleteBtn.value = "Delete";

        EachTask.appendChild(CheckBox);
        EachTask.appendChild(TaskName);
        EachTask.appendChild(DeleteBtn);
        taskList.appendChild(EachTask);
        taskText.value = "";

        DeleteBtn.addEventListener('click', function() {
            EachTask.remove();
            taskCount--;
            if (taskCount <= 0) {
                empty.style.display = "block"; // show "no tasks" message again
            }
        });

        CheckBox.addEventListener('change', function() {
            EachTask.classList.toggle("completed");
        });
    }

    taskMake.addEventListener('click', addTask);

    const toggleBtn = document.getElementById('toggleBtn');
    const todoContent = document.getElementById('todoContent');

    toggleBtn.addEventListener('click', function() {
        todoContent.classList.toggle('hidden');
        toggleBtn.textContent = todoContent.classList.contains('hidden') ? "Show List" : "Hide List";
    });

}


/*
============================================================
COOKING TIMER
Guard: only runs on recipedetails.html where #timer-window exists
============================================================
*/

const timerWindow = document.getElementById("timer-window");

if (timerWindow) {

    const messages = {
        idle: [
            "Awaiting your sigma cooking orders...",
            "The grill waits for no one. Set your timer.",
            "A knight never burns his feast. Stay vigilant.",
            "Time is the secret ingredient.",
            "Only a true sigma measures their cook time."
        ],
        running: [
            "The grind never stops. Stay focused.",
            "Your dish is ascending. Do not abandon it.",
            "A sigma chef does not leave his post.",
            "The heat is on. Remain stoic.",
            "Cooking in silence. Maximum sigma output.",
            "Every second counts on the path to culinary greatness."
        ],
        paused: [
            "Paused. Even sigmas need a moment.",
            "The flame waits. Resume when ready.",
            "Mid-cook pause. Respect.",
            "Patience is a virtue. So is not burning things."
        ],
        done: [
            "🤺 YOUR DISH IS READY, KNIGHT!",
            "The sigma feast is complete. Serve with honor.",
            "Time's up. Your culinary grindset has paid off.",
            "Done. A true knight never overcooks."
        ]
    };

    function getMessage(category) {
        const list = messages[category];
        return list[Math.floor(Math.random() * list.length)];
    }

    let totalSeconds = 0;
    let remainSeconds = 0;
    let timerInterval = null;
    let isRunning = false;

    const msgEl = document.getElementById("timer-message");
    const inputH = document.getElementById("input-hours");
    const inputM = document.getElementById("input-minutes");
    const inputS = document.getElementById("input-seconds");
    const progressBar = document.getElementById("progress-bar");
    const btnStart = document.getElementById("btn-start");
    const btnPause = document.getElementById("btn-pause");
    const btnReset = document.getElementById("btn-reset");
    const minimizeBtn = document.getElementById("minimize-btn");
    const closeBtn = document.getElementById("close-btn");
    const openBtn = document.getElementById("open-timer-btn");
    const titleBar = document.getElementById("timer-titlebar");

    let isDragging = false,
        dragOffsetX = 0,
        dragOffsetY = 0;

    titleBar.addEventListener("mousedown", function(e) {
        if (e.target.closest("#titlebar-controls")) return;
        isDragging = true;
        timerWindow.classList.add("dragging");
        const rect = timerWindow.getBoundingClientRect();
        dragOffsetX = e.clientX - rect.left;
        dragOffsetY = e.clientY - rect.top;
        e.preventDefault();
    });

    document.addEventListener("mousemove", function(e) {
        if (!isDragging) return;
        let newLeft = Math.max(0, Math.min(e.clientX - dragOffsetX, window.innerWidth - timerWindow.offsetWidth));
        let newTop = Math.max(0, Math.min(e.clientY - dragOffsetY, window.innerHeight - timerWindow.offsetHeight));
        timerWindow.style.transform = "none";
        timerWindow.style.left = newLeft + "px";
        timerWindow.style.top = newTop + "px";
    });

    document.addEventListener("mouseup", function() {
        isDragging = false;
        timerWindow.classList.remove("dragging");
    });

    function getInputSeconds() {
        return (parseInt(inputH.value) || 0) * 3600 +
            (parseInt(inputM.value) || 0) * 60 +
            (parseInt(inputS.value) || 0);
    }

    function setDisplayFromSeconds(secs) {
        inputH.value = String(Math.floor(secs / 3600)).padStart(2, "0");
        inputM.value = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
        inputS.value = String(secs % 60).padStart(2, "0");
    }

    function updateProgress() {
        progressBar.style.width = totalSeconds === 0 ? "100%" :
            (remainSeconds / totalSeconds * 100) + "%";
    }

    function setMessage(category) {
        //msgEl.style.opacity = "0";
        setTimeout(function() {
            msgEl.textContent = getMessage(category);
            msgEl.style.opacity = "1";
        }, 200);
    }

    function setRunningStyle(on) {
        [inputH, inputM, inputS].forEach(function(el) {
            el.classList.toggle("running", on);
        });
    }

    btnStart.addEventListener("click", function() {
        if (isRunning) return;
        const secs = getInputSeconds();
        if (secs <= 0) { msgEl.textContent = "Set a time first, chef."; return; }

        if (remainSeconds === 0) {
            totalSeconds = secs;
            remainSeconds = secs;
        }

        isRunning = true;
        setRunningStyle(true);
        setMessage("running");

        timerInterval = setInterval(function() {
            remainSeconds--;
            updateProgress();

            if (remainSeconds <= 0) {
                remainSeconds = 0;
                setDisplayFromSeconds(0);
                progressBar.style.width = "0%";
                clearInterval(timerInterval);
                isRunning = false;
                setRunningStyle(false);
                timerWindow.classList.add("done");
                setMessage("done");
                setTimeout(function() { timerWindow.classList.remove("done"); }, 3500);
                return;
            }
            setDisplayFromSeconds(remainSeconds);
        }, 1000);

        updateProgress();
    });

    btnPause.addEventListener("click", function() {
        if (!isRunning) return;
        clearInterval(timerInterval);
        isRunning = false;
        setRunningStyle(false);
        setMessage("paused");
    });

    btnReset.addEventListener("click", function() {
        clearInterval(timerInterval);
        isRunning = false;
        totalSeconds = 0;
        remainSeconds = 0;
        setRunningStyle(false);
        setDisplayFromSeconds(0);
        progressBar.style.width = "100%";
        timerWindow.classList.remove("done");
        setMessage("idle");
    });

    minimizeBtn.addEventListener("click", function() {
        timerWindow.classList.toggle("minimized");
        minimizeBtn.textContent = timerWindow.classList.contains("minimized") ? "□" : "—";
    });

    closeBtn.addEventListener("click", function() {
        timerWindow.style.display = "none";
        openBtn.style.display = "block";
    });

    openBtn.addEventListener("click", function() {
        timerWindow.style.display = "block";
        openBtn.style.display = "none";
    });

    setMessage("idle");
}


/*
===========================================================
GLOBAL STATE & DOM REFERENCES
Used by the recipe fetching, rendering, and search system
============================================================
*/

let allRecipes = []; // master list — all recipes from all JSON files
let allStories = [];
let filteredRecipes = []; // current working list — filtered by search query
let currentIndex = 0; // tracks how far into filteredRecipes we've rendered
const recipesPerPage = 4; // how many cards to show per Load More click

const recipeContainer = document.getElementById('recipe-container');
const detailContainer = document.getElementById('recipe-details');
const favoritesContainer = document.getElementById('favorites-container');
const loadMoreBtn = document.getElementById('load-more');
const searchInput = document.getElementById('recipe-search');


/* 
==================================================================
TASK 6: DATA FETCHING
Loads all JSON files in parallel using Promise.all,
flattens them into one master array, then renders the first batch
==================================================================
*/

async function loadAndMergeRecipes() {
    const files = [
        'json/recipes/breakfast_recipes_part1.json',
        'json/recipes/breakfast_recipes_part2.json',
        'json/recipes/breakfast_recipes_part3.json',
        'json/recipes/lunch_recipes_part1.json',
        'json/recipes/lunch_recipes_part2.json',
        'json/recipes/dinner_recipes_part1.json',
        'json/recipes/dinner_recipes_part2.json',
        'json/recipes/snacks_recipes.json',
        'json/recipes/dessert_recipes_part1.json',
        'json/recipes/dessert_recipes_part2.json',
        'json/recipes/beverages_recipes.json',
        'json/recipes/summer_recipes.json',
        'json/recipes/winter_recipes.json',
        'json/recipes/spring_recipes.json',
        'json/recipes/autumn_recipes.json',
        'json/recipes/appetizer_recipes.json'
    ];

    try {
        const responses = await Promise.all(files.map(file => fetch(file)));

        responses.forEach(res => {
            if (!res.ok) throw new Error(`Could not find ${res.url}`);
        });

        const dataArrays = await Promise.all(responses.map(res => res.json()));

        allRecipes = dataArrays.flat();
        filteredRecipes = [...allRecipes]; // start with all recipes visible

        renderBatch();
    } catch (error) {
        console.error("Data Load Error:", error);
        recipeContainer.innerHTML = "<p>Error: Run this on a local server (Live Server) to load recipes.</p>";
    }
}


/*
==========================================================================
TASK 6: RENDER BATCH
Displays the next 4 recipes from filteredRecipes.

CHANGED: added class="recipe-card fade-in" - triggers Animation 2
            (cards fade up from below when they appear)

   CHANGED: added heart-btn button inside card-header — Animation 1
            (heart pops and floats when clicked to favorite a recipe)
            onclick="event.preventDefault()" stops the card link
            from navigating when the heart button is clicked

   CHANGED: fixed image path from images/ to images/images/
            to match the actual folder structure in the project

   CHANGED: added ratings-section inside card-back — Ratings & Reviews
            data-recipe="recipe-${recipe.id}" is the unique localStorage
            key that ties this section to a specific recipe

   CHANGED: calls initNewHeartButtons() and initNewRatings() after
            inserting cards — these functions attach event listeners
            to the newly created elements. They must run AFTER
            insertAdjacentHTML so the elements exist in the DOM
=========================================================================
*/

function renderBatch() {
    const batch = filteredRecipes.slice(currentIndex, currentIndex + recipesPerPage);
 
    batch.forEach(recipe => {
        // Determine initial heart state from localStorage
        const isFav = localStorage.getItem(`fav-${recipe.id}`) === 'true';
        const heartChar = isFav ? '♥' : '♡';
    
        const cardHTML = `
            <a href="recipedetails.html?id=${recipe.id}" class="card-link">
                <div class="recipe-card fade-in">
                    <div class="card-inner">
                        <div class="card-front">
                            <div class="card-header">
                                <button class="heart-btn" data-card="${recipe.id}" aria-label="Favorite">${heartChar}</button>
                                <span class="card-number">No. ${recipe.id}</span>
                                <h3 class="card-title">${recipe.name}</h3>
                            </div>
                            <img src="images/images/${recipe.images[0]}" alt="${recipe.name}" class="recipefeat">
                            <div class="card-tags">
                                <span class="tag">${recipe.season}</span>
                                <span class="tag">${recipe.cuisine}</span>
                                <span class="tag">${recipe.prep_time}</span>
                            </div>
                        </div>
    
                        <div class="card-back">
                            <div class="card-header">
                                <button class="heart-btn" data-card="${recipe.id}" aria-label="Favorite">${heartChar}</button>
                                <span class="card-number">No. ${recipe.id}</span>
                                <h3 class="card-title">${recipe.name}</h3>
                            </div>
                            <div class="card-body">
                                <p class="ingredient-text">Ingredients List:</p>
                                <span class="tag line-tag"></span>
                                <ul class="card-ingredients">
                                    ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
                                </ul>
                            </div>
                            </div>
                    </div>
                </div>
            </a>`;
        recipeContainer.insertAdjacentHTML('beforeend', cardHTML);
    });
 
    currentIndex += recipesPerPage;
 
    /* init hearts and ratings on the newly added cards.
       Must be called after insertAdjacentHTML so the elements exist in the DOM */
    initNewHeartButtons();
    initNewRatings();
 
    // hide Load More button when all recipes are shown
    if (loadMoreBtn) {
        loadMoreBtn.style.display = (currentIndex >= filteredRecipes.length) ? 'none' : 'inline-block';
    }
}


/*
============================================================
TASK 7: SEARCH / FILTER
Filters allRecipes by name or ingredient as the user types
============================================================
*/

function handleSearch(e) {
    const query = e.target.value.toLowerCase();

    filteredRecipes = allRecipes.filter(recipe => {
        const matchName = recipe.name.toLowerCase().includes(query);
        const matchIngredient = recipe.ingredients.some(ing => ing.toLowerCase().includes(query));
        return matchName || matchIngredient;
    });

    // reset and re-render from the beginning with the filtered list
    recipeContainer.innerHTML = '';
    currentIndex = 0;
    renderBatch();
}


/*
============================================================
CHANGED: ANIMATION 1 - HEART FAVORITE
   
Called by renderBatch() after each batch of cards is inserted
   
Uses querySelectorAll(".heart-btn:not([data-init])") to find
only buttons that haven't been initialized yet — this prevents
duplicate event listeners when Load More adds more cards
   
On click:
   - toggles .favorited class (red filled heart vs hollow)
   - saves favorite state to localStorage
   - triggers heartPop CSS animation via .popping class
     (void btn.offsetWidth forces a reflow so animation restarts)
   - creates a floating .heart-burst <span> that rises and fades,
     then removes itself when the animation ends
   - e.stopPropagation() prevents the click from bubbling up
     to the parent <a> tag and navigating away
============================================================ 
*/

function initNewHeartButtons() {
    /* :not([data-init]) only selects buttons not yet set up */
    const heartBtns = document.querySelectorAll(".heart-btn:not([data-init])");

    heartBtns.forEach(function(btn) {
        btn.dataset.init = "true"; /* mark so we skip it next time */
        const cardId = btn.dataset.card;

        /* restore saved favorite state on page load */
        if (localStorage.getItem("fav-" + cardId) === "true") {
            btn.classList.add("filled");
            btn.innerHTML = "&#9829;"; /* filled heart ❤️ */
        }

        btn.addEventListener("click", function(e) {
            e.preventDefault(); /* stop card link from navigating */
            e.stopPropagation(); /* stop click bubbling to parent <a> */

            const isFav = btn.classList.toggle("filled");
            btn.innerHTML = isFav ? "&#9829;" : "&#9829;"; /* makes the heart filled or hollow */
            localStorage.setItem("fav-" + cardId, isFav);

            /* retrigger heartPop: remove, force reflow, re-add */
            btn.classList.remove("popping");
            void btn.offsetWidth; /* forces browser to recalculate layout,resetting the animation so it can fire again */
            btn.classList.add("popping");

            /* create the floating heart burst */
            const burst = document.createElement("span");
            burst.classList.add("heart-burst");
            burst.innerHTML = "&#9829;";
            btn.appendChild(burst);

            /* remove burst after its 0.8s animation ends */
            burst.addEventListener("animationend", function() { burst.remove(); });

            /* remove .popping after 350ms so it can retrigger on next click */
            setTimeout(function() { btn.classList.remove("popping"); }, 350);
        });
    });
}


/* 
==============================================================================
CHANGED: RATINGS & REVIEWS
   
Called by renderBatch() after each batch of cards is inserted.
Same :not([data-init]) pattern as hearts to avoid duplicates.
   
Per recipe:
   - "ratings-recipe-{id}" in localStorage = array of numbers i.e. [4,5,3]
   - "reviews-recipe-{id}" in localStorage = array of {stars, text} objects
   - loadRatings() sums the array and displays the average
   - loadReviews() renders all saved review objects into .reviews-list
   - Star mouseenter/mouseleave handles hover highlighting
   - Clicking a star sets pendingRating for this section
   - Submit saves both rating + text, refreshes display, resets form
   - e.stopPropagation() on all buttons prevents card navigation
==============================================================================
*/

function initNewRatings() {
    const ratingSections = document.querySelectorAll(".ratings-section:not([data-init])");

    ratingSections.forEach(function(section) {
        section.dataset.init = "true"; /* mark as initialized */

        const recipeKey = section.dataset.recipe;
        const starBtns = section.querySelectorAll(".star");
        const avgEl = section.querySelector(".avg-rating");
        const countEl = section.querySelector(".rating-count");
        const reviewsList = section.querySelector(".reviews-list");
        const reviewInput = section.querySelector(".review-input");
        const submitBtn = section.querySelector(".submit-review");

        let pendingRating = 0; /* tracks which star the user clicked */

        /* recalculates average from saved ratings and updates display */
        function loadRatings() {
            const saved = JSON.parse(localStorage.getItem("ratings-" + recipeKey)) || [];
            if (saved.length === 0) {
                avgEl.textContent = "☆☆☆☆☆";
                countEl.textContent = "(0 ratings)";
                return;
            }
            /* reduce adds all numbers: [4,5,3] → 12 */
            const sum = saved.reduce(function(a, b) { return a + b; }, 0);
            const avg = sum / saved.length;
            let stars = "";
            for (let i = 1; i <= 5; i++) {
                stars += i <= Math.round(avg) ? "★" : "☆";
            }
            avgEl.textContent = stars;
            countEl.textContent = "(" + saved.length + " rating" +
                (saved.length !== 1 ? "s" : "") + " — avg: " + avg.toFixed(1) + ")";
        }

        /* clears and re-renders all saved review cards */
        function loadReviews() {
            reviewsList.innerHTML = "";
            const saved = JSON.parse(localStorage.getItem("reviews-" + recipeKey)) || [];
            saved.forEach(function(review) {
                const item = document.createElement("div");
                item.classList.add("review-item");
                let stars = "";
                for (let i = 1; i <= 5; i++) {
                    stars += i <= review.stars ? "★" : "☆";
                }
                item.innerHTML = `
                
                    <div class="review-stars"> <span class="tag"> ${stars}</span></div>
                    <div class="review-text">${review.text}</div>`;
                reviewsList.appendChild(item);
            });
        }

        /* hover highlights stars up to the cursor, resets on mouse leave */
        starBtns.forEach(function(star) {
            star.addEventListener("mouseenter", function() {
                const val = parseInt(star.dataset.value);
                starBtns.forEach(function(s) {
                    s.classList.toggle("selected", parseInt(s.dataset.value) <= val);
                });
            });
            star.addEventListener("mouseleave", function() {
                /* reset back to pendingRating so locked selection stays visible */
                starBtns.forEach(function(s) {
                    s.classList.toggle("selected", parseInt(s.dataset.value) <= pendingRating);
                });
            });
            star.addEventListener("click", function(e) {
                e.stopPropagation(); /* prevent card link from firing */
                pendingRating = parseInt(star.dataset.value);
                starBtns.forEach(function(s) {
                    s.classList.toggle("selected", parseInt(s.dataset.value) <= pendingRating);
                });
            });
        });

        /* submit: saves rating + review to localStorage, refreshes display */
        submitBtn.addEventListener("click", function(e) {
            e.stopPropagation();
            const text = reviewInput.value.trim();

            if (pendingRating === 0) {
                reviewInput.placeholder = "Select a star rating first!";
                return;
            }

            /* save the rating number into the array */
            const savedRatings = JSON.parse(localStorage.getItem("ratings-" + recipeKey)) || [];
            savedRatings.push(pendingRating);
            localStorage.setItem("ratings-" + recipeKey, JSON.stringify(savedRatings));

            /* only save review text if user actually typed something */
            if (text !== "") {
                const savedReviews = JSON.parse(localStorage.getItem("reviews-" + recipeKey)) || [];
                savedReviews.push({ stars: pendingRating, text: text });
                localStorage.setItem("reviews-" + recipeKey, JSON.stringify(savedReviews));
            }

            loadRatings(); /* refresh average display */
            loadReviews(); /* refresh review list */

            /* reset form */
            reviewInput.value = "";
            pendingRating = 0;
            starBtns.forEach(function(s) { s.classList.remove("selected"); });
        });

        /* load saved data on first render */
        loadRatings();
        loadReviews();
    });
}


/*
==============================================================
INITIALIZATION
Guard: only runs on index.html where #recipe-container exists
==============================================================
*/

if (recipeContainer) {
    loadMoreBtn.addEventListener('click', renderBatch);
    searchInput.addEventListener('input', handleSearch);
    loadAndMergeRecipes();
}

function renderDetails() {
    /* read the ?id= value from the URL
       e.g. recipedetails.html?id=3 gives recipeId = 3 */
    const params = new URLSearchParams(window.location.search);
    const recipeId = parseInt(params.get("id"));

    /* find the matching recipe and story by id */
    const recipe = allRecipes.find(r => r.id === recipeId);
    const story = allStories.find(s => s.id === recipeId);

    if (!recipe) {
        detailContainer.innerHTML = "<p>Recipe not found.</p>";
        return;
    }

    /* handle recipes that have fewer than 4 images */
    let img1 = 0;
    let img2 = 1;
    let img3 = 2;
    let img4 = 3;
    if (img2 >= recipe.images.length) img2 = 0;
    if (img3 >= recipe.images.length) img3 = 0;
    if (img4 >= recipe.images.length) img4 = recipe.images.length - 1;

    const detailHTML = `
        <h1>${recipe.name}</h1>
        <div>
            <!-- RECIPE OVERVIEW -->
            <div class="recipelayout">
                <img src="images/images/${recipe.images[img1]}" class="recipephoto" alt="completed">
                <blockquote></blockquote>
            </div>
            <hr>
            <h1>Ingredients</h1>
            <!-- RECIPE INGREDIENTS -->
            <div class="recipelayout">
                <blockquote>${recipe.ingredients}</blockquote>
                <img src="images/images/${recipe.images[img2]}" class="recipephoto" alt="ingredients">
            </div>
            <hr>
            <!-- RECIPE PREP STEPS -->
            <h1>Instructions</h1>
            <div class="recipelayout">
                <img src="images/images/${recipe.images[img3]}" class="recipephoto" alt="prep">
                <blockquote>${recipe.steps}</blockquote>
            </div>
        </div>
        <hr>
        <h1>Share with your fellow sigmas!</h1>
        <!-- RECIPE COMPLETE -->
        <img src="images/images/${recipe.images[img4]}" class="recipephoto" alt="completeAlt">
        <button class="heart-btn" data-card="${recipe.id}"
                onclick="event.preventDefault();"
                style="font-size:28px; margin-bottom:10px;">&#9829;</button>
        <p style="font-style:italic; color:var(--crimson-violet); margin-bottom:16px;">Click to favorite this recipe</p>
        <button class="navbutton">
            <a href="recipelist.html" title="Go to All Recipes">All Recipes</a>
        </button>`;

    detailContainer.innerHTML = detailHTML;

    /* init the heart button now that it's been injected into the DOM */
    initNewHeartButtons();
}


/* 
============================================================================
FAVORITES PAGE
CHANGED: added loadFavorites() to populate favorites.html

   How it works:
   - Reads every key in localStorage
   - Filters for keys that start with "fav-" and have value "true"
   - Extracts the card ID from each key (e.g. "fav-3" → "3")
   - Waits for allRecipes to be loaded (same JSON fetch as index.html)
   - Finds each matching recipe by id and renders it using the same
     card HTML as renderBatch() so favorites look identical to normal cards
   - If no favorites exist, shows the #no-favorites message instead
=============================================================================
*/

async function loadFavorites() {
    /* step 1: load all recipe JSON — same files as loadAndMergeRecipes() */
    const files = [
        'json/recipes/breakfast_recipes_part1.json',
        'json/recipes/breakfast_recipes_part2.json',
        'json/recipes/breakfast_recipes_part3.json',
        'json/recipes/lunch_recipes_part1.json',
        'json/recipes/lunch_recipes_part2.json',
        'json/recipes/dinner_recipes_part1.json',
        'json/recipes/dinner_recipes_part2.json',
        'json/recipes/snacks_recipes.json',
        'json/recipes/dessert_recipes_part1.json',
        'json/recipes/dessert_recipes_part2.json',
        'json/recipes/beverages_recipes.json',
        'json/recipes/summer_recipes.json',
        'json/recipes/winter_recipes.json',
        'json/recipes/spring_recipes.json',
        'json/recipes/autumn_recipes.json',
        'json/recipes/appetizer_recipes.json'
    ];

    try {
        const responses = await Promise.all(files.map(file => fetch(file)));
        responses.forEach(res => {
            if (!res.ok) throw new Error(`Could not find ${res.url}`);
        });
        const dataArrays = await Promise.all(responses.map(res => res.json()));
        allRecipes = dataArrays.flat(); /* fill the global allRecipes array */
    } catch (error) {
        console.error("Favorites load error:", error);
        favoritesContainer.innerHTML = "<p>Error: Run this on a local server (Live Server) to load recipes.</p>";
        return;
    }

    /* 
    step 2: collect all favorited IDs from localStorage
        localStorage.key(i) iterates every key stored in the browser
        We look for keys that start with "fav-" and have value "true"
    */
    const favIds = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("fav-") && localStorage.getItem(key) === "true") {
            /* key is e.g. "fav-3" — slice(4) removes "fav-" leaving "3" */
            favIds.push(key.slice(4));
        }
    }

    /* step 3: if nothing is favorited, show the empty state message */
    const noFavEl = document.getElementById("no-favorites");
    if (favIds.length === 0) {
        favoritesContainer.style.display = "none";
        if (noFavEl) noFavEl.style.display = "block";
        return;
    }

    /* step 4: find each favorited recipe in allRecipes by matching id
       recipe.id is a number in JSON, favIds entries are strings,
       so we use == (loose equality) to match both "3" == 3           */
    const favRecipes = allRecipes.filter(recipe => favIds.includes(String(recipe.id)));

    /* step 5: render each favorited recipe using the same card HTML
       as renderBatch() so they look identical to the homepage cards  */
    favRecipes.forEach(recipe => {
        const cardHTML = `
            <a href="recipedetails.html?id=${recipe.id}" class="card-link">
                <div class="recipe-card fade-in">
                    <div class="card-inner">

                        <div class="card-front">
                            <div class="card-header">
                                <span class="card-number">No. ${recipe.id}</span>
                                <!-- heart already filled since this card is favorited -->
                                <button class="heart-btn favorited" data-card="${recipe.id}"
                                        onclick="event.preventDefault();"
                                        aria-label="Unfavorite">&#9829;</button>
                                <h3 class="card-title">${recipe.name}</h3>
                            </div>
                            <img src="images/images/${recipe.images[0]}" alt="${recipe.name}" class="recipefeat">
                            <div class="card-tags">
                                <span class="tag">${recipe.season}</span>
                                <span class="tag">${recipe.cuisine}</span>
                            </div>
                        </div>

                        <div class="card-back">
                            <div class="card-header">
                                <h3 class="card-title">${recipe.name}</h3>
                            </div>
                            <div class="card-body">
                                <p><strong>Ingredients:</strong> ${recipe.ingredients.slice(0, 3).join(', ')}...</p>
                                <p><strong>Prep Time:</strong> ${recipe.prep_time}</p>
                            </div>
                            <!-- note: unfavoriting a card here removes it from the page on next reload -->
                        </div>

                    </div>
                </div>
            </a>`;
        favoritesContainer.insertAdjacentHTML('beforeend', cardHTML);
    });

    /* step 6: attach heart listeners so unfavoriting works here too */
    initNewHeartButtons();
}

/* Guard: only runs on favorites.html where #favorites-container exists */
if (favoritesContainer) {
    loadFavorites();
}

async function loadObama() {
    const files = [
        'json/recipes/breakfast_recipes_part1.json',
        'json/recipes/breakfast_recipes_part2.json',
        'json/recipes/breakfast_recipes_part3.json',
        'json/recipes/lunch_recipes_part1.json',
        'json/recipes/lunch_recipes_part2.json',
        'json/recipes/dinner_recipes_part1.json',
        'json/recipes/dinner_recipes_part2.json',
        'json/recipes/snacks_recipes.json',
        'json/recipes/dessert_recipes_part1.json',
        'json/recipes/dessert_recipes_part2.json',
        'json/recipes/beverages_recipes.json',
        'json/recipes/summer_recipes.json',
        'json/recipes/winter_recipes.json',
        'json/recipes/spring_recipes.json',
        'json/recipes/autumn_recipes.json',
        'json/recipes/appetizer_recipes.json'
    ];

    try {
        const responses = await Promise.all(files.map(file => fetch(file)));

        responses.forEach(res => {
            if (!res.ok) throw new Error(`Could not find ${res.url}`);
        });

        const dataArrays = await Promise.all(responses.map(res => res.json()));

        allRecipes = dataArrays.flat();
    } catch (error) {
        console.error("Data Load Error:", error);
        detailContainer.innerHTML = "<p>Error: Run this on a local server (Live Server) to load recipes.</p>";
    }

    const flax = [
        'json/recipes/All_recipe_stories.json'
    ];

    try {
        const responses = await Promise.all(flax.map(file => fetch(file)));

        responses.forEach(res => {
            if (!res.ok) throw new Error(`Could not find ${res.url}`);
        });

        const dataArrays = await Promise.all(responses.map(res => res.json()));

        allStories = dataArrays.flat();
        renderDetails();
    } catch (error) {
        console.error("Data Load Error:", error);
        detailContainer.innerHTML = "<p>Error: Run this on a local server (Live Server) to load recipes.</p>";
    }

}

if (detailContainer) {
    loadObama();
}

function initNewHeartButtons() {
    const heartButtons = document.querySelectorAll('.heart-btn');

    heartButtons.forEach(btn => {
        // Use onclick to overwrite existing listeners and prevent duplicates
        btn.onclick = function(event) {
            event.preventDefault();
            event.stopPropagation(); // CRITICAL: Stops the card link from firing

            const recipeId = btn.getAttribute('data-card');
            const key = `fav-${recipeId}`;
            
            // Toggle state in localStorage
            const isFav = localStorage.getItem(key) === 'true';
            const newState = !isFav;
            localStorage.setItem(key, newState);

            // Find the parent card and update BOTH hearts (front and back)
            const parentCard = btn.closest('.recipe-card');
            const heartsInThisCard = parentCard.querySelectorAll('.heart-btn');
            
            heartsInThisCard.forEach(heart => {
                heart.innerHTML = newState ? '♥' : '♡';
            });
        };
    });
}