"use strict"

// Matrix Rain Selectors and constants
const canvas = document.querySelector("#Matrix");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const katakana = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン";
const latin = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const nums = "0123456789";

const aplhabet = katakana + latin + nums;

const fontSize = 14;
const columns = canvas.width/fontSize;
const rainDrops = [];

// DOM Selctors
const startPage = document.querySelector("#startPageButtons");
const getIntoBtn = startPage.querySelector("#getIn");
const signBtn = startPage.querySelector("#signUp");
const login = document.querySelector("#login");
const signup = document.querySelector("#bePart");
const backBtns = document.querySelectorAll(".back");



for (let x = 0; x < columns; x++){
    rainDrops[x] = 1;
}

const draw = () => {
    context.fillStyle = 'rgba(0,0,0,0.05)';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = "rgba(23, 201, 106, 0.78)";
    context.font = fontSize + "px monospace";
    
    for (let i = 0; i < rainDrops.length; i++) {
        const text = aplhabet.charAt(Math.floor(Math.random() * aplhabet.length));
        context.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975){
            rainDrops[i] = 0;
        }
        rainDrops[i]++;
    }
};

setInterval(draw, 30);


setTimeout(() => {
    startPage.classList.add("active");
},1000);

function removeActive(){
    const screens = document.querySelectorAll(".screen");
    for (const screen of screens){
        screen.classList.remove("active");
    }
}

getIntoBtn.addEventListener("click", () => {
    removeActive();
    login.classList.add("active");
    console.log("signup classes:", login.classList);
});

signBtn.addEventListener("click", () => {
    removeActive();
    signup.classList.add("active");
    console.log("signup classes:", signup.classList);
});

for (const btn of backBtns){
    btn.addEventListener("click", () => {
        removeActive();
        startPage.classList.add("active");
    });
}
