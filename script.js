// ============================
// Health Tracker Script
// ============================

let water = Number(localStorage.getItem("water")) || 0;
let sleep = Number(localStorage.getItem("sleep")) || 0;
let exercise = Number(localStorage.getItem("exercise")) || 0;

// Update Dashboard
function updateDashboard() {

    // Water
    const waterCard = document.querySelector(".card:nth-child(2) h1");
    if (waterCard) {
        waterCard.innerHTML = water + " / 8";
    }

    // Sleep
    const sleepCard = document.querySelector(".card:nth-child(3) h1");
    if (sleepCard) {
        sleepCard.innerHTML = sleep + " hrs";
    }

    // Exercise
    const exerciseCard = document.querySelector(".card:nth-child(4) h1");
    if (exerciseCard) {
        exerciseCard.innerHTML = exercise + " min";
    }

    updateHealthScore();
}

// ============================
// Water Tracker
// ============================

const waterBtn = document.querySelector("#water button");

if (waterBtn) {

    waterBtn.addEventListener("click", () => {

        if (water < 8) {
            water++;
        }

        localStorage.setItem("water", water);

        const fill = document.querySelector(".progress-fill");

        if (fill) {
            fill.style.width = (water / 8) * 100 + "%";
        }

        updateDashboard();

        alert("Water Added 💧");

    });

}

// ============================
// Sleep Tracker
// ============================

const sleepBtn = document.querySelector("#sleep button");

if (sleepBtn) {

    sleepBtn.addEventListener("click", () => {

        const inputs = document.querySelectorAll("#sleep input");

        if (inputs.length < 2) return;

        const bed = inputs[0].value;
        const wake = inputs[1].value;

        if (!bed || !wake) {

            alert("Please enter sleep timings.");

            return;
        }

        const bedHour = Number(bed.split(":")[0]);
        const wakeHour = Number(wake.split(":")[0]);

        let hours = wakeHour - bedHour;

        if (hours <= 0) {
            hours += 24;
        }

        sleep = hours;

        localStorage.setItem("sleep", sleep);

        updateDashboard();

        alert("Sleep Saved 😴");

    });

}

// ============================
// Exercise Tracker
// ============================

const exerciseBtn = document.querySelector("#exercise button");

if (exerciseBtn) {

    exerciseBtn.addEventListener("click", () => {

        const minutes = Number(document.querySelector("#exercise input").value);

        if (minutes <= 0) {

            alert("Enter exercise minutes");

            return;

        }

        exercise = minutes;

        localStorage.setItem("exercise", exercise);

        updateDashboard();

        alert("Exercise Saved 🏃");

    });
const saveHealth = document.getElementById("saveHealth");

if(saveHealth){

saveHealth.addEventListener("click",function(){

let heart=document.getElementById("heartRate").value;
let bp=document.getElementById("bloodPressure").value;
let sugar=document.getElementById("bloodSugar").value;

localStorage.setItem("heart",heart);
localStorage.setItem("bp",bp);
localStorage.setItem("sugar",sugar);

document.getElementById("heartRateValue").innerHTML=heart+" BPM";
document.getElementById("bpValue").innerHTML=bp;
document.getElementById("sugarValue").innerHTML=sugar+" mg/dL";

alert("Health Data Saved Successfully");

});

}

window.addEventListener("load",function(){

let heart=localStorage.getItem("heart");
let bp=localStorage.getItem("bp");
let sugar=localStorage.getItem("sugar");

if(heart)
document.getElementById("heartRateValue").innerHTML=heart+" BPM";

if(bp)
document.getElementById("bpValue").innerHTML=bp;

if(sugar)
document.getElementById("sugarValue").innerHTML=sugar+" mg/dL";

});
}

// ============================
// Health Score
// ============================

function updateHealthScore() {

    let score = 0;

    score += Math.min((water / 8) * 30, 30);

    score += Math.min((sleep / 8) * 35, 35);

    score += Math.min((exercise / 30) * 35, 35);

    score = Math.round(score);

    const scoreCard = document.querySelector(".card:first-child h1");

    if (scoreCard) {

        scoreCard.innerHTML = score + "%";

    }

    const circle = document.querySelector(".circle h1");

    if (circle) {

        circle.innerHTML = score + "%";

    }

}

// ============================
// Weekly Chart
// ============================

const chartCanvas = document.getElementById("myChart");

if (chartCanvas) {

    new Chart(chartCanvas, {

        type: "bar",

        data: {

            labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],

            datasets: [{

                label: "Water Intake",

                data: [5,6,8,7,8,6,water],

                borderWidth: 1

            }]

        },

        options: {

            responsive: true,

            scales: {

                y: {

                    beginAtZero: true,

                    max: 8

                }

            }

        }

    });

}

// ============================
// Smooth Scroll
// ============================

document.querySelectorAll("nav a").forEach(link=>{

    link.addEventListener("click",function(e){

        e.preventDefault();

        document.querySelector(this.getAttribute("href")).scrollIntoView({

            behavior:"smooth"

        });

    });

});

// ============================
// Button Animation
// ============================

document.querySelectorAll("button").forEach(btn=>{

    btn.addEventListener("click",()=>{

        btn.style.transform="scale(.95)";

        setTimeout(()=>{

            btn.style.transform="scale(1)";

        },150);

    });

});

// ============================
// Load Saved Data
// ============================

window.onload = function(){

    const fill = document.querySelector(".progress-fill");

    if(fill){

        fill.style.width=(water/8)*100+"%";

    }

    updateDashboard();

};