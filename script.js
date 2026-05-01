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
let featuredRecipes = []; // for featured recipe on homepage
let allStories = [];
let filteredRecipes = []; // current working list — filtered by search/filter
let currentIndex = 0; // tracks how far into filteredRecipes we've rendered
const recipesPerPage = 4; // how many cards to show per Load More click

const recipeContainer = document.getElementById('recipe-container');
const featuredContainer = document.getElementById('featured-recipe');
const seasonalContainer = document.getElementById('seasonal');
const detailContainer = document.getElementById('recipe-details');
const favoritesContainer = document.getElementById('favorites-container');
const loadMoreBtn = document.getElementById('load-more');
const searchInput = document.getElementById('recipe-search');

/* CHANGED: added references for the new filter/sort controls on recipelist.html
   These will be null on other pages — the guards below handle that safely       */
const filterSeason = document.getElementById('filter-season');
const filterCuisine = document.getElementById('filter-cuisine');
const sortSelect = document.getElementById('sort-by');
const resetFilters = document.getElementById('reset-filters');
const resultsCount = document.getElementById('results-count');


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

        /* on index.html the seasonal section filters by current month */
        if (seasonalContainer) {
            const d = new Date();
            let index = d.getMonth();
            let matchSeason;
            if (index >= 3 && index < 6) matchSeason = "Spring";
            else if (index >= 6 && index < 9) matchSeason = "Summer";
            else if (index >= 9 && index < 11) matchSeason = "Autumn";
            else matchSeason = "Winter";

            console.log("Filter");
            filteredRecipes = allRecipes.filter(recipe => recipe.season === matchSeason);
        }

        renderBatch();

        if (featuredContainer) {
            renderFeatured();
        }
    } catch (error) {
        console.error("Data Load Error:", error);
        recipeContainer.innerHTML = "<p>Error: Run this on a local server (Live Server) to load recipes.</p>";
    }
}


/*
==========================================================================
TASK 6: RENDER BATCH
Displays the next 4 recipes from filteredRecipes.

CHANGED: added class="recipe-card fade-in" — triggers Animation 2
         (cards fade up from below when they appear)

CHANGED: heart-btn is inside card-back header so it stays accessible
         when the card is flipped. initNewHeartButtons() attaches listeners
         after insertAdjacentHTML so the elements exist in the DOM.

CHANGED: fixed image path from images/ to images/images/

CHANGED: ratings-section inside card-back for Ratings & Reviews feature.
         data-recipe="recipe-${recipe.id}" is the unique localStorage key.

CHANGED: calls initNewHeartButtons() and initNewRatings() after inserting
         cards so newly created elements get their event listeners attached.
=========================================================================
*/

function renderBatch() {
    const batch = filteredRecipes.slice(currentIndex, currentIndex + recipesPerPage);

    batch.forEach(recipe => {
                const cardHTML = `
            <a href="recipedetails.html?id=${recipe.id}" class="card-link">
                <div class="recipe-card fade-in">

                    <div class="card-inner">

                        <div class="card-front">
                            <div class="card-header">
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
                                <button class="heart-btn" data-card="${recipe.id}"
                                        onclick="event.preventDefault();"
                                        aria-label="Favorite">&#9829;</button>
                                <h3 class="card-title">${recipe.name}</h3>
                            </div>
                            <div class="card-body">
                                <p class="ingredient-text">Ingredients List:</p>
                                <span class="tag line-tag"></span>
                                <ul class="card-ingredients">
                                    ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
                                </ul>
                            </div>
                            <!-- ratings section — data-recipe is the localStorage key -->
                            <div class="ratings-section" data-recipe="recipe-${recipe.id}">
                                <div class="star-display">
                                    <span class="avg-rating">&#9734;&#9734;&#9734;&#9734;&#9734;</span>
                                    <span class="rating-count">(0 ratings)</span>
                                </div>
                                <div class="star-input">
                                    <button class="star" data-value="1" onclick="event.preventDefault();">&#9733;</button>
                                    <button class="star" data-value="2" onclick="event.preventDefault();">&#9733;</button>
                                    <button class="star" data-value="3" onclick="event.preventDefault();">&#9733;</button>
                                    <button class="star" data-value="4" onclick="event.preventDefault();">&#9733;</button>
                                    <button class="star" data-value="5" onclick="event.preventDefault();">&#9733;</button>
                                </div>
                                <div class="review-form">
                                    <textarea class="review-input" placeholder="Leave a review..." rows="2"
                                              onclick="event.preventDefault();"></textarea>
                                    <button class="submit-review" onclick="event.preventDefault();">Post Review</button>
                                </div>
                                <div class="reviews-list"></div>
                            </div>
                        </div>

                    </div>
                </div>
            </a>`;
        recipeContainer.insertAdjacentHTML('beforeend', cardHTML);
    });

    currentIndex += recipesPerPage;

    // Re-initialize logic for the new elements
    initNewHeartButtons();
    initNewRatings();

    if (loadMoreBtn) {
        loadMoreBtn.style.display = (currentIndex >= filteredRecipes.length) ? 'none' : 'inline-block';
    }
}


/*
============================================================
TASK 7: ADVANCED DYNAMIC SEARCH + DYNAMIC FILTER & SORTING

CHANGED: replaced the old single handleSearch() with
applyFiltersAndSort() which handles all four controls at once:
  1. Text search    — filters by name OR any ingredient
  2. Season filter  — exact match on recipe.season
  3. Cuisine filter — exact match on recipe.cuisine
  4. Sort           — sorts filtered results by name or prep time

All four controls call applyFiltersAndSort() on any change.
The results count below the filter bar updates live so the
user always knows how many recipes match their current filters.

How prep time sorting works:
  recipe.prep_time is a string like "20 min" or "1 hr 10 min"
  parsePrepTime() converts it to total minutes as a number
  so we can compare values correctly (not alphabetically)
============================================================
*/

/* converts prep_time strings like "20 min" or "1 hr 10 min"
   into a plain number of minutes for sorting purposes        */
function parsePrepTime(prepStr) {
    if (!prepStr) return 0;
    let total = 0;
    const hrMatch  = prepStr.match(/(\d+)\s*h/i);
    if (hrMatch)  total += parseInt(hrMatch[1]) * 60;
    const minMatch = prepStr.match(/(\d+)\s*m/i);
    if (minMatch) total += parseInt(minMatch[1]);
    if (total === 0) {
        const plain = parseInt(prepStr);
        if (!isNaN(plain)) total = plain;
    }
    return total;
}

function applyFiltersAndSort() {
    /* read current values from all four controls */
    const query   = searchInput   ? searchInput.value.trim().toLowerCase() : "";
    const season  = filterSeason  ? filterSeason.value                      : "";
    const cuisine = filterCuisine ? filterCuisine.value                     : "";
    const sortBy  = sortSelect    ? sortSelect.value                        : "";

    /* step 1: filter allRecipes against all active criteria */
    filteredRecipes = allRecipes.filter(recipe => {

        /* text search — matches name OR any ingredient */
        if (query) {
            const matchName       = recipe.name.toLowerCase().includes(query);
            const matchIngredient = recipe.ingredients.some(ing =>
                ing.toLowerCase().includes(query)
            );
            if (!matchName && !matchIngredient) return false;
        }

        /* season filter — skip if dropdown is "" (All Seasons) */
        if (season && recipe.season !== season) return false;

        /* cuisine filter — skip if dropdown is "" (All Cuisines) */
        if (cuisine && recipe.cuisine !== cuisine) return false;

        return true; /* recipe passed all active filters */
    });

    /* step 2: sort the filtered results */
    if (sortBy === "name-asc") {
        filteredRecipes.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "name-desc") {
        filteredRecipes.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === "prep-asc") {
        filteredRecipes.sort((a, b) => parsePrepTime(a.prep_time) - parsePrepTime(b.prep_time));
    } else if (sortBy === "prep-desc") {
        filteredRecipes.sort((a, b) => parsePrepTime(b.prep_time) - parsePrepTime(a.prep_time));
    }

    /* step 3: update the live results count */
    if (resultsCount) {
        resultsCount.textContent = filteredRecipes.length === allRecipes.length
            ? ""
            : `${filteredRecipes.length} recipe${filteredRecipes.length !== 1 ? "s" : ""} found`;
    }

    /* step 4: re-render from the start with the new filtered+sorted list */
    recipeContainer.innerHTML = "";
    currentIndex = 0;
    renderBatch();
}


/*
============================================================
CHANGED: ANIMATION 1 - HEART FAVORITE

Called by renderBatch() after each batch of cards is inserted.

Uses querySelectorAll(".heart-btn:not([data-init])") to find
only buttons that haven't been initialized yet — this prevents
duplicate event listeners when Load More adds more cards.

On click:
   - toggles .filled class (red filled heart vs hollow)
   - saves favorite state to localStorage
   - triggers heartPop CSS animation via .popping class
     (void btn.offsetWidth forces a reflow so animation restarts)
   - creates a floating .heart-burst span that rises and fades,
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
            btn.innerHTML = "&#9829;"; /* filled heart */
        }

        btn.addEventListener("click", function(e) {
            e.preventDefault();  /* stop card link from navigating */
            e.stopPropagation(); /* stop click bubbling to parent <a> */

            const isFav = btn.classList.toggle("filled");
            btn.innerHTML = isFav ? "&#9829;" : "&#9825;"; /* filled or hollow heart */
            localStorage.setItem("fav-" + cardId, isFav);

            /* retrigger heartPop: remove, force reflow, re-add */
            btn.classList.remove("popping");
            void btn.offsetWidth; /* forces layout recalc so animation restarts */
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
   - "ratings-recipe-{id}" in localStorage = array of numbers e.g. [4,5,3]
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

        const recipeKey   = section.dataset.recipe;
        const starBtns    = section.querySelectorAll(".star");
        const avgEl       = section.querySelector(".avg-rating");
        const countEl     = section.querySelector(".rating-count");
        const reviewsList = section.querySelector(".reviews-list");
        const reviewInput = section.querySelector(".review-input");
        const submitBtn   = section.querySelector(".submit-review");

        let pendingRating = 0; /* tracks which star the user clicked */

        /* recalculates average from saved ratings and updates display */
        function loadRatings() {
            const saved = JSON.parse(localStorage.getItem("ratings-" + recipeKey)) || [];
            if (saved.length === 0) {
                avgEl.innerHTML   = "&#9734;&#9734;&#9734;&#9734;&#9734;";
                countEl.textContent = "(0 ratings)";
                return;
            }
            /* reduce adds all numbers: [4,5,3] = 12 */
            const sum = saved.reduce(function(a, b) { return a + b; }, 0);
            const avg = sum / saved.length;
            let stars = "";
            for (let i = 1; i <= 5; i++) {
                /* CHANGED: unicode chars so innerHTML renders correctly */
                stars += i <= Math.round(avg) ? "★" : "☆";
            }
            avgEl.innerHTML   = stars;  /* CHANGED: innerHTML not textContent so &#9733; renders as star not literal text */
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
                    /* CHANGED: use unicode directly so innerHTML renders them as stars */
                    stars += i <= review.stars ? "★" : "☆";
                }
                item.innerHTML = `
                    <div class="review-stars"><span class="tag">${stars}</span></div>
                    <div class="review-text">${review.text}</div>`;
                reviewsList.appendChild(item);
            });
        }

        /* hover highlights stars up to cursor, resets on mouse leave */
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
Guard: only runs on pages where #recipe-container exists
       (index.html and recipelist.html both have this element)
==============================================================
*/

if (recipeContainer) {
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', renderBatch);
    }

    /* CHANGED: text search now calls applyFiltersAndSort so search
       and the filter dropdowns always work together                  */
    if (searchInput) {
        searchInput.addEventListener('input', applyFiltersAndSort);
    }

    /* CHANGED: wire up the three filter/sort dropdowns on recipelist.html
       Each fires applyFiltersAndSort on change so results update instantly */
    if (filterSeason) {
        filterSeason.addEventListener('change', applyFiltersAndSort);
    }
    if (filterCuisine) {
        filterCuisine.addEventListener('change', applyFiltersAndSort);
    }
    if (sortSelect) {
        sortSelect.addEventListener('change', applyFiltersAndSort);
    }

    /* CHANGED: reset button clears all four controls and re-renders everything */
    if (resetFilters) {
        resetFilters.addEventListener('click', function() {
            if (searchInput)   searchInput.value   = "";
            if (filterSeason)  filterSeason.value  = "";
            if (filterCuisine) filterCuisine.value = "";
            if (sortSelect)    sortSelect.value     = "";
            if (resultsCount)  resultsCount.textContent = "";
            filteredRecipes = [...allRecipes];
            recipeContainer.innerHTML = "";
            currentIndex = 0;
            renderBatch();
        });
    }

    loadAndMergeRecipes();
}


/*
============================================================
RECIPE DETAIL PAGE
Guard: only runs on recipedetails.html where #recipe-details exists
============================================================
*/

function renderDetails() {
    /* read the ?id= value from the URL
       e.g. recipedetails.html?id=3 gives recipeId = 3 */
    const params   = new URLSearchParams(window.location.search);
    const recipeId = parseInt(params.get("id"));

    /* find the matching recipe and story by id */
    const recipe = allRecipes.find(r => r.id === recipeId);
    const story  = allStories.find(s => s.id === recipeId);

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
        <!-- recipe name + heart button side by side at the top -->
        <div style="display:flex; align-items:center; gap:12px; margin:10px;">
            <h1 style="margin:0;">${recipe.name}</h1>
            <button class="heart-btn" data-card="${recipe.id}"
                    onclick="event.preventDefault();"
                    style="font-size:28px; position:static;"
                    aria-label="Favorite this recipe">&#9825;</button>
            <p>Like this recipe!</p>
        </div>

        <div>
            <!-- RECIPE OVERVIEW -->
            <div class="recipelayout">
                <img src="images/images/${recipe.images[img1]}" class="recipephoto" alt="completed">
                <blockquote></blockquote>
            </div>
            <hr>
            <h1>Ingredients</h1>
            <!-- RECIPE INGREDIENTS -->
            <div class="input-group">
            <button id="check-switch">Display Checklist</button>
            <div class="size-controls">
                <button id="set-size">Set Size</button>
                <input id="ingred-input" placeholder="1"></input>
                <button id="Add-To-List">Add to groceries list</button>

            </div>
        </div>
            <div class="recipelayout">
                <ul id="checklist">${recipe.ingredients.map(ing => `<li><input type="checkbox" class="ingCheck"> ${ing}</li>`).join('')}</ul>
                <ul id="ingredlist">${recipe.ingredients.map(ing => `<li class="ingredient-name">${ing}</li>`).join('')}</ul>               
                 <img src="images/images/${recipe.images[img2]}" class="recipephoto" id="ingredphoto" alt="ingredients">
            </div>
            <hr>
            <!-- RECIPE PREP STEPS -->
            <h1>Instructions</h1>
            <div class="recipelayout">
                <img src="images/images/${recipe.images[img3]}" class="recipephoto" alt="prep">
                <blockquote>${recipe.steps.map(stp => `<li>${stp}</li>`).join('')}</blockquote>
            </div>
        </div>

        <!-- RECIPE COMPLETE -->
        <div id="recipe-complete">
            <h1>Share with your fellow sigmas!</h1>
            <img src="images/images/${recipe.images[img4]}" class="recipephoto" alt="completeAlt">

            <!-- ratings section — data-recipe is the localStorage key -->
            <div class="ratings-section" data-recipe="recipe-${recipe.id}">
                <div class="star-display">
                    <span class="avg-rating">&#9734;&#9734;&#9734;&#9734;&#9734;</span>
                    <span class="rating-count">(0 ratings)</span>
                </div>
                <div class="star-input">
                    <button class="star" data-value="1" onclick="event.preventDefault();">&#9733;</button>
                    <button class="star" data-value="2" onclick="event.preventDefault();">&#9733;</button>
                    <button class="star" data-value="3" onclick="event.preventDefault();">&#9733;</button>
                    <button class="star" data-value="4" onclick="event.preventDefault();">&#9733;</button>
                    <button class="star" data-value="5" onclick="event.preventDefault();">&#9733;</button>
                </div>
                <div class="review-form">
                    <textarea class="review-input" placeholder="Leave a review..." rows="2"
                              onclick="event.preventDefault();"></textarea>
                    <button class="submit-review" onclick="event.preventDefault();">Post Review</button>
                </div>
                <div class="reviews-list"></div>
            </div>

            <button class="navbutton">
                <a href="recipelist.html" title="Go to All Recipes">All Recipes</a>
            </button>
        </div>`;

    detailContainer.innerHTML = detailHTML;

    /* init the heart button and ratings now that they've been injected into the DOM */
    initNewHeartButtons();
    initNewRatings();
    const checkSwitch = document.getElementById('check-switch');
    const setSize = document.getElementById('set-size');
    const inputSize = document.getElementById('ingred-input');
    const clist = document.getElementById("checklist");
    const ilist = document.getElementById("ingredlist");
        if(checkSwitch) {
        clist.style.display = "none";
        checkSwitch.addEventListener("click", function() {
        if (clist.style.display === "none") {
            clist.style.display = "block";
            ilist.style.display = "none";
            checkSwitch.textContent = "Hide Checklist";
        } else {
            clist.style.display = "none";
            ilist.style.display = "block";
            checkSwitch.textContent = "Display Checklist";
        }
        });
        if(setSize) {
            setSize.addEventListener("click", function() {
                
        }); }
    }

   // SCALING LOGIC
function scaleIngredient(ing, factor) {
    const match = ing.match(/^(\d+\.?\d*)\s+(.+)$/);
    if (!match) return ing;
    const num = parseFloat(match[1]) * factor;
    const rest = match[2];
    const formatted = Number.isInteger(num) ? num : parseFloat(num.toFixed(2));
    return `${formatted} ${rest}`;
}

function applyScale(factor) {
    const ingredItems = document.querySelectorAll('#ingredlist .ingredient-name');
    const checkItems  = document.querySelectorAll('#checklist li');

    recipe.ingredients.forEach((ing, i) => {
        const scaled = scaleIngredient(ing, factor);
        if (ingredItems[i]) ingredItems[i].textContent = scaled;
        if (checkItems[i])  checkItems[i].innerHTML = `<input type="checkbox" class="ingCheck"> ${scaled}`;
    });
}
function handleScale() {
    const factor = parseFloat(inputSize.value) || 1;
    applyScale(factor);
}

if (setSize) {
    setSize.addEventListener('click', handleScale);
}

if (inputSize) {
    inputSize.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') handleScale();
    });
}

// SHOPPING LIST LOGIC
const addToListBtn = document.getElementById('Add-To-List');
if (addToListBtn) {
    addToListBtn.addEventListener('click', () => {
        // read whatever is currently displayed (scaled or original)
        const ingredientElements = document.querySelectorAll('#ingredlist .ingredient-name');
        const currentIngredients = Array.from(ingredientElements).map(el => el.textContent.trim());

        currentIngredients.forEach(ing => addToGroceryList(ing));

        addToListBtn.textContent = "Added to List!";
        addToListBtn.style.backgroundColor = "green";

        setTimeout(() => {
            addToListBtn.textContent = "Add to groceries list";
            addToListBtn.style.backgroundColor = "";
        }, 2000);
    });
}

}


/*
============================================================================
FAVORITES PAGE
Guard: only runs on favorites.html where #favorites-container exists

How it works:
   - Reads every key in localStorage
   - Filters for keys that start with "fav-" and have value "true"
   - Extracts the card ID from each key (e.g. "fav-3" -> "3")
   - Loads all recipe JSON then finds matching recipes by id
   - Renders them using the same card HTML as renderBatch()
   - If no favorites exist, shows the #no-favorites message instead
=============================================================================
*/

async function loadFavorites() {
    /* step 1: load all recipe JSON */
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
        const responses  = await Promise.all(files.map(file => fetch(file)));
        responses.forEach(res => {
            if (!res.ok) throw new Error(`Could not find ${res.url}`);
        });
        const dataArrays = await Promise.all(responses.map(res => res.json()));
        allRecipes = dataArrays.flat();
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
       so we use String() to convert both sides for comparison       */
    const favRecipes = allRecipes.filter(recipe => favIds.includes(String(recipe.id)));

    /* step 5: render each favorited recipe using the same card HTML as renderBatch() */
    favRecipes.forEach(recipe => {
        const cardHTML = `
            <a href="recipedetails.html?id=${recipe.id}" class="card-link">
                <div class="recipe-card fade-in">
                    <div class="card-inner">
                        <div class="card-front">
                            <div class="card-header">
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
                                <button class="heart-btn filled" data-card="${recipe.id}"
                                        onclick="event.preventDefault();"
                                        aria-label="Unfavorite">&#9829;</button>
                                <h3 class="card-title">${recipe.name}</h3>
                            </div>
                            <div class="card-body">
                                <p class="ingredient-text">Ingredients List:</p>
                                <span class="tag line-tag"></span>
                                <ul class="card-ingredients">
                                    ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
                                </ul>
                            </div>
                            <div class="ratings-section" data-recipe="recipe-${recipe.id}">
                                <div class="star-display">
                                    <span class="avg-rating">&#9734;&#9734;&#9734;&#9734;&#9734;</span>
                                    <span class="rating-count">(0 ratings)</span>
                                </div>
                                <div class="star-input">
                                    <button class="star" data-value="1" onclick="event.preventDefault();">&#9733;</button>
                                    <button class="star" data-value="2" onclick="event.preventDefault();">&#9733;</button>
                                    <button class="star" data-value="3" onclick="event.preventDefault();">&#9733;</button>
                                    <button class="star" data-value="4" onclick="event.preventDefault();">&#9733;</button>
                                    <button class="star" data-value="5" onclick="event.preventDefault();">&#9733;</button>
                                </div>
                                <div class="review-form">
                                    <textarea class="review-input" placeholder="Leave a review..." rows="2"
                                              onclick="event.preventDefault();"></textarea>
                                    <button class="submit-review" onclick="event.preventDefault();">Post Review</button>
                                </div>
                                <div class="reviews-list"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </a>`;
        favoritesContainer.insertAdjacentHTML('beforeend', cardHTML);
    });

    /* step 6: attach heart listeners so unfavoriting works here too */
    initNewHeartButtons();
    initNewRatings();
}

/* Guard: only runs on favorites.html where #favorites-container exists */
if (favoritesContainer) {
    loadFavorites();
}


/*
============================================================
RECIPE DETAIL DATA LOADING
Guard: only runs on recipedetails.html where #recipe-details exists
============================================================
*/

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
        const responses  = await Promise.all(files.map(file => fetch(file)));
        responses.forEach(res => {
            if (!res.ok) throw new Error(`Could not find ${res.url}`);
        });
        const dataArrays = await Promise.all(responses.map(res => res.json()));
        allRecipes = dataArrays.flat();
    } catch (error) {
        console.error("Data Load Error:", error);
        detailContainer.innerHTML = "<p>Error: Run this on a local server (Live Server) to load recipes.</p>";
    }

    const flax = ['json/recipes/All_recipe_stories.json'];

    try {
        const responses  = await Promise.all(flax.map(file => fetch(file)));
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

/*
============================================================
FEATURED RECIPE
Renders a single daily featured recipe on index.html
Uses date math to pick a different recipe each day
============================================================
*/

function renderFeatured() {
    const d     = new Date();
    let index   = ((d.getDate() + d.getMonth()) * d.getFullYear()) % allRecipes.length;
    const recipe = allRecipes[index];

    const cardHTML = `
        <figure>
            <a href="recipedetails.html?id=${recipe.id}" class="card-link">
                <div class="recipe-card fade-in">
                    <div class="card-inner">
                        <div class="card-front">
                            <div class="card-header">
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
                                <button class="heart-btn" data-card="${recipe.id}"
                                        onclick="event.preventDefault();"
                                        aria-label="Favorite">&#9829;</button>
                                        <span class="card-like">Like</span>
                                <h3 class="card-title">${recipe.name}</h3>
                            </div>
                            <div class="card-body">
                                <p class="ingredient-text">Ingredients List:</p>
                                <span class="tag line-tag"></span>
                                <ul class="card-ingredients">
                                    ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
                                </ul>
                                <!--<p class="card-arrow">↓</p>-->
                            </div>
                            <div class="ratings-section" data-recipe="recipe-${recipe.id}">
                                <div class="star-display">
                                    <span class="avg-rating">&#9734;&#9734;&#9734;&#9734;&#9734;</span>
                                    <span class="rating-count">(0 ratings)</span>
                                    <span class="rating-count">↓</span>
                                </div>
                                <h3>Leave a review below!</h3>
                                <div class="star-input">
                                    <button class="star" data-value="1" onclick="event.preventDefault();">&#9733;</button>
                                    <button class="star" data-value="2" onclick="event.preventDefault();">&#9733;</button>
                                    <button class="star" data-value="3" onclick="event.preventDefault();">&#9733;</button>
                                    <button class="star" data-value="4" onclick="event.preventDefault();">&#9733;</button>
                                    <button class="star" data-value="5" onclick="event.preventDefault();">&#9733;</button>
                                </div>
                                <div class="review-form">
                                    <textarea class="review-input" placeholder="Leave a review..." rows="2"
                                              onclick="event.preventDefault();"></textarea>
                                    <button class="submit-review" onclick="event.preventDefault();">Post Review</button>
                                </div>
                                <div class="reviews-list"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
            <figcaption><i>Check out today's featured recipe!</i></figcaption>
        </figure>`;

    featuredContainer.innerHTML = cardHTML;

    // Re-initialize logic for the new elements
    initNewHeartButtons();
    initNewRatings();
}


/*
============================================================
DARK MODE
Persists across page loads using localStorage

CHANGED: added if (themeSwitch) guard so the script does not
crash on pages where the button hasn't loaded yet
Without this guard, themeSwitch.addEventListener on a null
element throws an error that kills ALL listeners below it,
which is why the seizure button was also broken
============================================================
*/

/* apply saved dark mode preference on every page load
   runs before button is found so it doesn't flash light then dark */
if (localStorage.getItem('darkmode') === "active") {
    document.body.classList.add('darkmode');
}

/* wait until DOM is fully ready before touching the button */
document.addEventListener("DOMContentLoaded", function() {

    const themeSwitch = document.getElementById('theme-switch');

    /* update button text to match current state on load */
    if (themeSwitch) {
        themeSwitch.textContent = localStorage.getItem('darkmode') === "active"
            ? "Turn on Light Mode"
            : "Turn on Knight Mode";

        /* click toggles dark mode on and off */
        themeSwitch.addEventListener("click", function() {
            if (localStorage.getItem('darkmode') === "active") {
                /* currently dark — switch to light */
                document.body.classList.remove('darkmode');
                localStorage.setItem('darkmode', null);
                themeSwitch.textContent = "Turn on Knight Mode";
            } else {
                /* currently light — switch to dark */
                document.body.classList.add('darkmode');
                localStorage.setItem('darkmode', 'active');
                themeSwitch.textContent = "Turn on Light Mode";
            }
        });
    }
});


/*
============================================================
SEIZURE MODE
Toggles flashing rainbow animations on everything
CHANGED: added if (seizureSwitch) guard for same reason
============================================================
*/

const seizureSwitch = document.getElementById('seizure-switch');

if (seizureSwitch) {
    // restore saved seizure mode on page load
    if (localStorage.getItem('seizuremode') === 'active') {
        document.body.classList.add('seizure-mode');
        seizureSwitch.textContent = "Stop the Seizure!";
    }

    seizureSwitch.addEventListener("click", function() {
        const isOn = document.body.classList.toggle('seizure-mode');
        localStorage.setItem('seizuremode', isOn ? 'active' : null);
        seizureSwitch.textContent = isOn ? "Stop the Seizure!" : "Seizure Mode";
    });
}


/*
==========================================================
SHOPPING LIST
==========================================================
*/
document.addEventListener('DOMContentLoaded', () => {
    const displayContainer = document.getElementById('display-list');
    const clearBtn = document.getElementById('clear-list');

    // Helper: read list from localStorage (normalizes old plain-string entries)
    function getList() {
        const raw = JSON.parse(localStorage.getItem('groceryList')) || [];
        return raw.map(item => typeof item === 'string' ? { name: item, qty: 1 } : item);
    }

    // Helper: write list to localStorage
    function saveList(list) {
        localStorage.setItem('groceryList', JSON.stringify(list));
    }

    // 1. Render function to update the UI
    function renderList() {
        const groceryList = getList();

        if (groceryList.length === 0) {
            displayContainer.innerHTML = '<li>Your list is currently empty.</li>';
            return;
        }

        displayContainer.innerHTML = groceryList
        .map((item, index) => `
        <li class="groceryItem">
            <input type="checkbox" class="grocery-check" id="check-${index}">
            <span class="item-text">${item.name}${item.qty > 1 ? ` <strong>x${item.qty}</strong>` : ''}</span>
            <button class="remove-item" data-index="${index}">×</button>
        </li>`)
    .join('');

        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = parseInt(e.target.getAttribute('data-index'));
                removeItem(index);
            });
        });

        document.querySelectorAll('.grocery-check').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                this.closest('li').classList.toggle('checked', this.checked);
            });
        });
    }

    // 2. Remove/decrement a single item
    function removeItem(index) {
        const groceryList = getList();
        if (groceryList[index].qty > 1) {
            groceryList[index].qty -= 1;
        } else {
            groceryList.splice(index, 1);
        }
        saveList(groceryList);
        renderList();
    }

    // 3. Clear the entire list
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if (confirm("Are you sure you want to clear the entire list?")) {
                localStorage.removeItem('groceryList');
                renderList();
            }
        });
    }

    // Initial render
    renderList();
});

// 4. Called from recipe cards (or anywhere) to add an ingredient
function addToGroceryList(ingredientName) {
    const raw = JSON.parse(localStorage.getItem('groceryList')) || [];
    const groceryList = raw.map(item => typeof item === 'string' ? { name: item, qty: 1 } : item);

    const match = ingredientName.match(/^(\d+\.?\d*)\s+(.+)$/);

    if (match) {
        // ingredient has a leading number — merge by adding amounts
        const incomingAmount = parseFloat(match[1]);
        const baseText = match[2].toLowerCase();

        const existing = groceryList.find(item => {
            const m = item.name.match(/^(\d+\.?\d*)\s+(.+)$/);
            return m && m[2].toLowerCase() === baseText;
        });

        if (existing) {
            const existingMatch = existing.name.match(/^(\d+\.?\d*)\s+(.+)$/);
            const total = parseFloat(existingMatch[1]) + incomingAmount;
            const formatted = Number.isInteger(total) ? total : parseFloat(total.toFixed(2));
            existing.name = `${formatted} ${existingMatch[2]}`;
        } else {
            groceryList.push({ name: ingredientName, qty: 1 });
        }
    } else {
        // no leading number — fall back to qty stacking
        const existing = groceryList.find(
            item => item.name.toLowerCase() === ingredientName.toLowerCase()
        );
        if (existing) {
            existing.qty += 1;
        } else {
            groceryList.push({ name: ingredientName, qty: 1 });
        }
    }

    localStorage.setItem('groceryList', JSON.stringify(groceryList));
}

/*
============================================================
INGREDIENTS CHECKLIST
Toggles whether the ingredients checklist shows up on recipe details
============================================================


document.addEventListener("DOMContentLoaded", function() {
    const checkSwitch = document.getElementById('check-switch');
    const clist = document.getElementById("checklist");
    const ilist = document.getElementById("ingredlist");
        if(checkSwitch) {
        console.log("Give me an animal crown");
        clist.style.display = "none";
        checkSwitch.addEventListener("click", function() {
        if (clist.style.display === "none") {
            clist.style.display = "block";
            ilist.style.display = "none";
        } else {
            clist.style.display = "none";
            ilist.style.display = "block";
        }
        });
    }
});*/