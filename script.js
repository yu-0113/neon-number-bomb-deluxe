let min = 1;
let max = 100;
let bomb;
let steps;
let score;

function initGame(range) {
    min = 1;
    max = range;
    bomb = Math.floor(Math.random() * range) + 1;
    steps = 0;
    score = 1000;

    document.getElementById("rangeText").innerText = `範圍：${min} ~ ${max}`;
    document.getElementById("steps").innerText = steps;
    document.getElementById("score").innerText = score;
    document.getElementById("message").innerText = "開始你的挑戰吧！";
    document.getElementById("dangerBar").style.width = "100%";
    document.body.classList.remove("explode");
}

function setDifficulty(level) {
    if (level === "easy") initGame(50);
    if (level === "normal") initGame(100);
    if (level === "hard") initGame(500);
}

function guessNumber() {
    let guess = parseInt(document.getElementById("guessInput").value);

    if (isNaN(guess) || guess <= min || guess >= max) {
        document.getElementById("message").innerText = "請輸入有效範圍內的數字！";
        return;
    }

    steps++;
    score -= 50;

    if (guess === bomb) {
        document.getElementById("message").innerText = "💥 BOOM！你踩到炸彈了！";
        document.body.classList.add("explode");
        return;
    }

    if (guess < bomb) {
        min = guess;
        document.getElementById("message").innerText = "太低了！";
    } else {
        max = guess;
        document.getElementById("message").innerText = "太高了！";
    }

    let dangerPercent = ((max - min) / 100) * 100;
    document.getElementById("dangerBar").style.width = `${dangerPercent}%`;

    document.getElementById("rangeText").innerText = `範圍：${min} ~ ${max}`;
    document.getElementById("steps").innerText = steps;
    document.getElementById("score").innerText = score;

    if ((max - min) === 2) {
        document.getElementById("message").innerText = `🎉 你成功避開炸彈！總分：${score}`;
    }

    document.getElementById("guessInput").value = "";
}

function restartGame() {
    initGame(100);
}

initGame(100);
