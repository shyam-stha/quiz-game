document.addEventListener("DOMContentLoaded", async function () {
    let difficulty = document.getElementById("difficulty");
    let saveBtn = document.getElementById("save");
    // Get difficulty level from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const level = urlParams.get("level");
    const score = urlParams.get("score");
    difficulty.innerHTML = level;

    switch (level) {
        case "easy":
            difficulty.style.backgroundColor = "#28a745";
            break;
        case "medium":
            difficulty.style.backgroundColor = "#6c757d";
            break;
        case "hard":
            difficulty.style.backgroundColor = "#dc3545";
            break;
    }

    saveBtn.addEventListener("click", () => {
        const data = localStorage.getItem("data");
        const username = prompt("Enter Your Name?");

        if (!data) {
            const userData = [
                {
                    timestamp: new Date(),
                    name: username,
                    score: score,
                    difficulty: level,
                },
            ];

            localStorage.setItem("data", JSON.stringify(userData));
        } else {
            const parsedData = JSON.parse(data);
            const userData = [
                {
                    timestamp: new Date(),
                    name: username,
                    score: score,
                    difficulty: level,
                },
            ];
            const newData = [...parsedData, ...userData];
            localStorage.setItem("data", JSON.stringify(newData));
        }
        router.push("/index.html");
    });

    showScoreStats(score);
    overAllStats(score);
    showIncorrectStats(score);
});

const showScoreStats = (score) => {
    let scoreProgress = document.querySelector(".score-bar");
    let scoreValue = document.getElementById("score");

    let initialScorePercent = 0;
    let totalScorePercent = (score / 20) * 100;

    let scoreTimerId = setInterval(() => {
        initialScorePercent++;

        scoreValue.textContent = `${initialScorePercent}%`;
        scoreProgress.style.backgroundImage = `conic-gradient(#28a745 ${
            initialScorePercent * 3.6
        }deg, #fff 0deg)`;

        if (initialScorePercent === totalScorePercent) {
            clearInterval(scoreTimerId);
        }
    }, 100);
};

const overAllStats = (score) => {
    let overallProgresBar = document.querySelector(".overall-bar");
    let overallValue = document.getElementById("overall");

    let initaial = 0;
    let end = 100;
    let color = "#28a745";
    let totalScorePercent = (score / 20) * 100;

    let scoreTimerId = setInterval(() => {
        initaial++;

        if (totalScorePercent >= 90) {
            overallValue.textContent = "Excellent";
            end = 95;
            color = "#28a745";
            overallValue.style.color = color;
        } else if (totalScorePercent >= 70) {
            overallValue.textContent = "Good";
            end = 75;
            color = "#ffc107";
            overallValue.style.color = color;
        } else if (totalScorePercent >= 50) {
            overallValue.textContent = "Fair";
            end = 55;
            color = "#6c757d";
            overallValue.style.color = color;
        } else if (totalScorePercent >= 30) {
            overallValue.textContent = "Poor";
            end = 35;
            color = "#007bff";
            overallValue.style.color = color;
        } else {
            overallValue.textContent = "Worst";
            end = 15;
            color = "#dc3545";
            overallValue.style.color = color;
        }

        overallProgresBar.style.backgroundImage = `conic-gradient(${color} ${
            initaial * 3.6
        }deg, #fff 0deg)`;

        if (initaial === end) {
            clearInterval(scoreTimerId);
        }
    }, 100);
};

const showIncorrectStats = (score) => {
    let incorrectBar = document.querySelector(".incorrect-bar");
    let incorrectValue = document.getElementById("incorrect");

    let incorrect = 20 - score;
    let initialScorePercent = 0;
    let totalIncorrectPercent = (incorrect / 20) * 100;

    let incorrectTimeId = setInterval(() => {
        initialScorePercent++;

        incorrectValue.textContent = `${initialScorePercent}%`;
        incorrectBar.style.backgroundImage = `conic-gradient(#dc3545 ${
            initialScorePercent * 3.6
        }deg, #fff 0deg)`;

        if (initialScorePercent === totalIncorrectPercent) {
            clearInterval(incorrectTimeId);
        }
    }, 100);
};
