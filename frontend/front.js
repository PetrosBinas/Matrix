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

const fontSize = 12;
const columns = canvas.width/fontSize;
const rainDrops = [];

// DOM Selctors
const startPage = document.querySelector("#startPageButtons");
const getIntoBtn = startPage.querySelector("#getIn");
const signBtn = startPage.querySelector("#signUp");
const login = document.querySelector("#login");
const signup = document.querySelector("#bePart");
const backBtns = document.querySelectorAll(".back");
const logInBtn = document.querySelector("#loginBtn");
const createBtn = document.querySelector("#createBtn");



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

// for slight smooth start
setTimeout(() => {
    startPage.classList.add("active");
},1000);
// removes all active classes
function removeActive(){
    const screens = document.querySelectorAll(".screen");
    for (const screen of screens){
        screen.classList.remove("active");
    }
}
// moves front to login form
getIntoBtn.addEventListener("click", (e) => {
    e.preventDefault();
    removeActive();
    login.classList.add("active");
    console.log("signup classes:", login.classList);
});
//moves front to signup form
signBtn.addEventListener("click", (e) => {
    e.preventDefault();
    removeActive();
    signup.classList.add("active");
    console.log("signup classes:", signup.classList);
});
// returns to startpage
for (const btn of backBtns){
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        removeActive();
        startPage.classList.add("active");
    });
}


// Login getting the inputs and send them to backend!
logInBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const mailElement = document.querySelector("#logemail");
    const email = mailElement.value;
    const passElement = document.querySelector("#logpass");
    const pass = passElement.value;

    if (!email || !email.includes("@") || !email.includes(".") || pass.length < 8){
        mailElement.value = "";
        passElement.value = "";
        const panel = logInBtn.parentNode;
        mailElement.classList.add("error");
        passElement.classList.add("error");
        logInBtn.classList.add("error");
        panel.classList.add("error");
        panel.querySelector(".back").classList.add("error");
        setTimeout(() => {
            mailElement.classList.remove("error");
            passElement.classList.remove("error");
            logInBtn.classList.remove("error");
            panel.classList.remove("error");
            panel.querySelector(".back").classList.remove("error");            
        }, 1000);
        return;
    }
    // send to backend the login info for auth
    mailElement.value = "";
    passElement.value = ""; 
    const res = await logInPost(email,pass);
    const data = await res.json();
    console.log(data);
});

// login POST request
function logInPost(email,pass){
    try {
        const res = fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email: email,
                password: pass
            })
        });
        return res;
    }
    catch(err){
        console.log(err.message);
        return;
    }
}


// Signu getting inputs and sends them to backend
createBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const mailElement = document.querySelector("#createmail");
    const email = mailElement.value;
    const passElement = document.querySelector("#createpass");
    const pass = passElement.value;   
    function wrongInp() {
        mailElement.value = "";
        passElement.value = "";
        const panel = createBtn.parentNode;
        mailElement.classList.add("error");
        passElement.classList.add("error");
        createBtn.classList.add("error");
        panel.classList.add("error");
        panel.querySelector(".back").classList.add("error");
        setTimeout(() => {
            mailElement.classList.remove("error");
            passElement.classList.remove("error");
            createBtn.classList.remove("error");
            panel.classList.remove("error");
            panel.querySelector(".back").classList.remove("error");            
        }, 1000);        
    }
    if (!email || !email.includes("@") || !email.includes(".") || pass.length < 8){
        wrongInp();
        return;
    }
    // send create info to backend
    mailElement.value = "";
    passElement.value = "";
    const res = await createPost(email,pass);
    const data = await res.json();
    console.log(data);
});

// signup post request
function createPost(email,pass){

    try {
        const res = fetch("http://localhost:3000/signup", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email:email,
                password: pass
            })
        });
        return res;
    }
    catch(err){
        console.log(err.message);
        return;
    }
}
