const handleLevelClick = (level) => {
    router.push(`question.html?level=${level}`);
};

const startGame = () => {
    router.push("pages/game-difficulty.html");
};

const viewScore = () => {
    router.push("pages/high-score.html");
};
