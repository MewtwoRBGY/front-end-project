/*function makeCard() {
    const tbody = document.getElementByID('featuredlist');
    if (!tbody) return;



    let html = "";
    sortedItems.forEach(item => {

        html += `<a href="recipedetails.html" class="card-link">

        <div class = "recipe-card" >
            <
            div class = "card-inner" >

            <
            div class = "card-front" >
            <
            div class = "card-header" >
            <
            span class = "card-number" > No .1 < /span> <
        span class = "card-heart" > & #9825;</span>
                            <h3 class= "card-title" > Pancakes < /h3> < /
            div >

            <
            img src = "pancaketest.jpg"
        alt = "recipe"
        class = "recipefeat" >

            <
            div class = "card-tags" >
            <
            span class = "tag" > Season < /span> <
        span class = "tag" > Meal Type < /span> <
        span class = "tag" > Serves: 4 < /span> < /
            div >

            <
            /div>     <
        div class = "card-back" >

            <
            div class = "card-header" >
            <
            span class = "card-number" > No .1 < /span> <
        span class = "card-heart" > & #9825;</span>
                                            <h3 class= "card-title" > Pancakes < /h3> < /
            div >

            <
            div class = "card-body" >
            <
            div class = "card-info" >
            <
            ul >
            <
            li > Approximate time to complete: 10 minutes < /li> <
        li > Required ingredients: flour, eggs, milk, sugar, baking powder < /li> < /
            ul > <
            div class = "card-tags" >
            <
            span class = "tag" > Season < /span> <
        span class = "tag" > Meal Type < /span> <
        span class = "tag" > Serves: 4 < /span> < /
            div > <
            /div> < /
            div > <
            /div> < /
            div > <
            /div> < /
            a > `
    });
    tbody.innerHTML = html;
}*/

console.log("H3110 W0r1d");
/*TO-DO LOGIC*/

//test to see if linked with html file. it is
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

        // create the task elements
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

        // delete button removes the task
        DeleteBtn.addEventListener('click', function() {
            EachTask.remove();
            taskCount--;
            if (taskCount <= 0) {
                empty.style.display = "block"; // show "no tasks" message again
            }
        });

        // checkbox crosses out the task
        CheckBox.addEventListener('change', function() {
            EachTask.classList.toggle("completed");
        });
    }

    taskMake.addEventListener('click', addTask);

    // toggle show/hide the list
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
Guards against running on pages without these elements.
Only activates on recipedetails.html where #timer-window exists.
============================================================ 
*/

const timerWindow = document.getElementById("timer-window");

if (timerWindow) {

    // message that are coolio
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

    // timer state
    let totalSeconds = 0;
    let remainSeconds = 0;
    let timerInterval = null;
    let isRunning = false;

    // DOM references
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

    /* DRAGGING
       mousedown records offset between mouse and window corner.
       mousemove repositions window using that offset.
       mouseup stops tracking.
    */
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

    /* HELPERS */

    // reads the three inputs and converts to total seconds
    function getInputSeconds() {
        return (parseInt(inputH.value) || 0) * 3600 +
            (parseInt(inputM.value) || 0) * 60 +
            (parseInt(inputS.value) || 0);
    }

    // takes seconds and updates the HH MM SS inputs
    function setDisplayFromSeconds(secs) {
        inputH.value = String(Math.floor(secs / 3600)).padStart(2, "0");
        inputM.value = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
        inputS.value = String(secs % 60).padStart(2, "0");
    }

    // updates progress bar width based on remaining time
    function updateProgress() {
        progressBar.style.width = totalSeconds === 0 ? "100%" :
            (remainSeconds / totalSeconds * 100) + "%";
    }

    // fades out current message and fades in a new random one
    function setMessage(category) {
        msgEl.style.opacity = "0";
        setTimeout(function() {
            msgEl.textContent = getMessage(category);
            msgEl.style.opacity = "1";
        }, 200);
    }

    // adds/removes the gold glow on the time digits when running
    function setRunningStyle(on) {
        [inputH, inputM, inputS].forEach(function(el) {
            el.classList.toggle("running", on);
        });
    }

    /* ---- TIMER LOGIC ---- */

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

        // setInterval ticks every 1000ms (1 second)
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
        clearInterval(timerInterval); // stop ticking but keep remainSeconds
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

    /* ---- WINDOW CONTROLS ---- */

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