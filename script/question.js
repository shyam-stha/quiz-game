let index = 0;
let score = 0;
let questions = [];
let isOptionSelected = false;
let difficulty;
const baseUrl = "https://opentdb.com/api.php";

document.addEventListener("DOMContentLoaded", async function () {
    // Get difficulty level from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const level = urlParams.get("level");
    difficulty = level;

    if (level) {
        try {
            const reponse = await fetchQuestion(level);
            questions = reponse;
            showQuestion();
        } catch (error) {
            console.log(error);
        }
    } else {
        console.error("Difficulty level not provided in URL parameters.");
    }
});

const fetchQuestion = async (level) => {
    try {
        const response = await fetch(`${baseUrl}?amount=20&difficulty=${level}&type=multiple`);
        const { results } = await response.json();
        return results;
    } catch (error) {
        console.log(error);
    }
};

const showQuestion = () => {
    if (index > 19) {
        router.push(`score.html?level=${difficulty}&score=${score}`);
        return;
    } else {
        if (questions.length > 0 && index < 20) {
            document.getElementById("question-no").innerText = `${index + 1}.`;
            document.getElementById("question").innerHTML = questions[index].question;
            const options = [
                ...questions[index].incorrect_answers,
                questions[index].correct_answer,
            ];

            const randomizedOptions = suffleArrayItems(options);

            randomizedOptions.forEach((answer, index) => {
                document.getElementById(`option-${index + 1}`).innerHTML = answer;
                document.getElementById(`option-${index + 1}`).value = answer;
            });
        }
    }
};

const optionClick = (option) => {
    const options = document.querySelectorAll(".options span");
    options.forEach((option) => (option.onclick = null));
    isOptionSelected = true;

    if (questions[index].correct_answer === option.value) {
        option.classList.add("correct");
        score++;
    } else {
        option.classList.add("wrong");
        showCorrectAns();
    }
};

const showCorrectAns = () => {
    const option1 = document.getElementById("option-1");
    const option2 = document.getElementById("option-2");
    const option3 = document.getElementById("option-3");
    const option4 = document.getElementById("option-4");

    switch (questions[index].correct_answer) {
        case option1.value:
            option1.classList.add("correct");
            break;
        case option2.value:
            option2.classList.add("correct");
            break;
        case option3.value:
            option3.classList.add("correct");
            break;
        case option4.value:
            option4.classList.add("correct");
            break;
    }
};

const nextBtnClick = () => {
    if (isOptionSelected) {
        index++;
        const options = document.querySelectorAll(".options span");
        options.forEach((option) => {
            option.classList.remove("correct", "wrong");
            option.onclick = function () {
                optionClick(this);
            };
        });
        isOptionSelected = false;
        showQuestion();
    } else {
        alert("You can't continue without selecting one option.");
    }
};
