let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnX = true;
let fordr = 0;
let count = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8]
];

const makeMove = (box) => {
    if (turnX) {
        box.innerText = "X";
        turnX = false;
    } else {
        box.innerText = "O";
        turnX = true;
    }

    box.disabled = true;
    count++;
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        makeMove(box);

        if (!checkWinner()) {
            checkDraw();
        }
    });
});

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    msg.innerText = `CONGRATULATIONS , PLAYER ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    fordr = 1;
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        const pos1Val = boxes[pattern[0]].innerText;
        const pos2Val = boxes[pattern[1]].innerText;
        const pos3Val = boxes[pattern[2]].innerText;

        if (
            pos1Val !== "" &&
            pos1Val === pos2Val &&
            pos2Val === pos3Val
        ) {
            showWinner(pos1Val);
            return true;
        }
    }

    return false;
};

const resetGame = () => {
    turnX = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    count = 0;
    fordr = 0;
    console.log(count);
};

const checkDraw = () => {
    if (count == 9 && fordr == 0) {
        console.log(count);
        showDraw();
    }
};

const showDraw = () => {
    msg.innerText = "It's a DRAW , Retry...";
    msgContainer.classList.remove("hide");
    disableBoxes();
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
