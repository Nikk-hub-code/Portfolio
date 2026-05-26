// =========================
// ELEMENTS
// =========================

const input =
    document.getElementById("command");

const output =
    document.getElementById("output");

const typingText =
    document.getElementById("typing-text");

const systemTime =
    document.getElementById("system-time");

const eyes =
    document.querySelectorAll(".eye");

const cursorGlow =
    document.querySelector(".cursor-glow");

const terminal =
    document.querySelector(".terminal");

const suggestionText =
    document.getElementById("suggestion-text");

const projectCards =
    document.querySelectorAll(".project-card");

const navbar =
    document.getElementById("navbar");

const scrollProgressBar =
    document.getElementById("scroll-progress-bar");

input.disabled = true;

// =========================
// SYSTEM TIME
// =========================

function updateSystemTime(){

    const now =
        new Date();

    const time =
        now.toLocaleTimeString(
            "en-IN",
            {
                hour12:false
            }
        );

    systemTime.textContent =
        `SYSTEM TIME: ${time}`;
}

setInterval(updateSystemTime,1000);

updateSystemTime();

// =========================
// HERO TYPE EFFECT
// =========================

const roles = [

    "AI / ML ENGINEER"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeHeroText(){

    const currentRole =
        roles[roleIndex];

    if(!deleting){

        typingText.textContent =
            currentRole.substring(
                0,
                charIndex + 1
            );

        charIndex++;

        if(charIndex === currentRole.length){

            deleting = true;

            setTimeout(
                typeHeroText,
                1500
            );

            return;
        }

    }else{

        typingText.textContent =
            currentRole.substring(
                0,
                charIndex - 1
            );

        charIndex--;

        if(charIndex === 0){

            deleting = false;

            roleIndex =
                (roleIndex + 1) %
                roles.length;
        }
    }

    setTimeout(
        typeHeroText,
        deleting ? 45 : 90
    );
}

typeHeroText();

// =========================
// CURSOR GLOW
// =========================

document.addEventListener(
    "mousemove",
    e=>{

        cursorGlow.style.left =
            e.clientX + "px";

        cursorGlow.style.top =
            e.clientY + "px";
    }
);

// =========================
// SCROLL PROGRESS
// =========================

window.addEventListener(
    "scroll",
    ()=>{

        const scrollTop =
            document.documentElement.scrollTop;

        const scrollHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const progress =
            (scrollTop / scrollHeight) * 100;

        scrollProgressBar.style.width =
            `${progress}%`;

        // NAVBAR EFFECT

        if(scrollTop > 50){

            navbar.classList.add(
                "scrolled"
            );

        }else{

            navbar.classList.remove(
                "scrolled"
            );
        }

        // PARALLAX HERO

        const hero =
            document.querySelector(".hero-frame");

        hero.style.transform =
            `translateY(${scrollTop * 0.08}px)`;
    }
);

// =========================
// TERMINAL UTILS
// =========================

function sleep(ms){

    return new Promise(resolve =>
        setTimeout(resolve,ms)
    );
}

function scrollOutput(){

    output.scrollTop =
        output.scrollHeight;
}

function appendLine(
    text,
    className = "output-line"
){

    const div =
        document.createElement("div");

    div.className =
        className;

    div.innerHTML =
        text;

    output.appendChild(div);

    scrollOutput();

    return div;
}

async function typeLine(
    text,
    className = "output-line",
    speed = 15
){

    const div =
        document.createElement("div");

    div.className =
        className;

    output.appendChild(div);

    for(let i = 0; i < text.length; i++){

        div.innerHTML += text[i];

        scrollOutput();

        await sleep(speed);
    }

    return div;
}

async function typeBlock(
    text,
    className = "output-line",
    speed = 8
){

    const lines =
        text.trim().split("\n");

    for(const line of lines){

        await typeLine(
            line,
            className,
            speed
        );
    }
}

async function aiThinking(){

    const steps = [

        "> Analyzing command...",

        "> Accessing neural memory...",

        "> Building response..."
    ];

    for(const step of steps){

        await typeLine(
            step,
            "info-text",
            10
        );

        await sleep(250);
    }
}

function triggerGlitch(){

    terminal.classList.add(
        "glitch"
    );

    setTimeout(()=>{

        terminal.classList.remove(
            "glitch"
        );

    },700);
}

// =========================
// TERMINAL BOOT
// =========================

async function bootTerminal(){

    input.disabled = true;

    suggestionText.textContent =
        "none";

    output.innerHTML = "";

    const bootLines = [

        {
            text:
                "> Powering Kaushal OS terminal...",
            className:
                "info-text"
        },

        {
            text:
                "> Loading interface modules........ [ OK ]",
            className:
                "success-text"
        },

        {
            text:
                "> Connecting neural systems........ [ OK ]",
            className:
                "success-text"
        },

        {
            text:
                "> Initializing AI engine........... [ OK ]",
            className:
                "success-text"
        },

        {
            text:
                "> Security layer active............ [ ENABLED ]",
            className:
                "warning-text"
        },

        {
            text:
                "> Terminal online.",
            className:
                "success-text"
        }
    ];

    for(const line of bootLines){

        await typeLine(
            line.text,
            line.className,
            12
        );

        await sleep(180);
    }

    appendLine(

        `
        <div class="terminal-card">

            <div class="success-text">
                WELCOME TO KAUSHAL AI TERMINAL
            </div>

            <br>

            Type
            <span class="info-text">
                'help'
            </span>
            to see available commands.

            <br>

            Try:
            <span class="info-text">
                matrix
            </span>,
            <span class="info-text">
                projects
            </span>,
            <span class="info-text">
                status
            </span>

        </div>
        `
    );

    input.disabled = false;

    input.focus();
}

bootTerminal();

// =========================
// COMMANDS
// =========================

const commandList = [

    "help",
    "whoami",
    "skills",
    "projects",
    "education",
    "experience",
    "achievements",
    "resume",
    "contact",
    "socials",
    "june",
    "status",
    "scan",
    "neural",
    "system",
    "matrix",
    "matrix off",
    "clear",
    "boot",
    "jarvis",
    "activate"
];

const commands = {

help:`
AVAILABLE COMMANDS

whoami
skills
projects
education
experience
achievements
resume
contact
socials
june
status
scan
neural
system
matrix
matrix off
boot
clear
jarvis
activate
`,

whoami:`
IDENTITY PROFILE

Name:
Kaushal Kumar Jha

Role:
AI / ML Engineer

Focus:
Artificial Intelligence,
Machine Learning,
Deep Learning,
NLP,
Futuristic AI Systems
`,

skills:`
TECHNICAL STACK

Programming:
- Python
- JavaScript
- HTML
- CSS

AI / ML:
- Machine Learning
- Deep Learning
- NLP
- TensorFlow

Backend:
- FastAPI
- Flask
`,

projects:`
PROJECT DATABASE

- JUNE AI Assistant
- Handwritten Digit Recognition
- Crop Recommendation System
- AI Terminal Portfolio
`,

education:`
EDUCATION MODULE

B.Tech Computer Science Engineering
`,

experience:`
CURRENT EXPERIENCE

- AI/ML Systems
- JUNE AI Assistant
- Neural Interface Design
`,

achievements:`
ACHIEVEMENTS

- Built AI systems
- Built futuristic portfolio
- Developing JUNE AI
`,

resume:`
RESUME AVAILABLE

Download from hero section.
`,

contact:`
CONTACT PROTOCOL

Email:
jhakaushal.1809@gmail.com
`,

socials:`
SOCIAL CHANNELS

GitHub:
github.com/Nikk-hub-code

LinkedIn:
linkedin.com/in/nikk18
`,

june:`
JUNE AI ASSISTANT

Inspired by J.A.R.V.I.S
with AI reasoning and NLP systems.
`,

status:`
SYSTEM STATUS

AI CORE        : ONLINE
ML MODULE      : ACTIVE
NLP ENGINE     : ACTIVE
NEURAL SYSTEM  : RUNNING
`,

system:`
KAUSHAL OS v3.0

Modules:
- Hero Interface
- AI Terminal
- Neural Background
- Matrix System
- Project Database
`
};

// =========================
// MATRIX MODE
// =========================

const matrixCanvas =
    document.getElementById(
        "matrix-canvas"
    );

const matrixCtx =
    matrixCanvas.getContext("2d");

let matrixInterval = null;

function resizeMatrix(){

    matrixCanvas.width =
        window.innerWidth;

    matrixCanvas.height =
        window.innerHeight;
}

resizeMatrix();

window.addEventListener(
    "resize",
    resizeMatrix
);

function startMatrix(){

    document.body.classList.add(
        "matrix-active"
    );

    const letters =
        "01AIJUNEKAUSHAL";

    const fontSize = 16;

    const columns =
        Math.floor(
            matrixCanvas.width /
            fontSize
        );

    const drops =
        Array(columns).fill(1);

    if(matrixInterval){

        clearInterval(
            matrixInterval
        );
    }

    matrixInterval =
        setInterval(()=>{

            matrixCtx.fillStyle =
                "rgba(0,0,0,0.08)";

            matrixCtx.fillRect(
                0,
                0,
                matrixCanvas.width,
                matrixCanvas.height
            );

            matrixCtx.fillStyle =
                "#00ff9c";

            matrixCtx.font =
                `${fontSize}px Fira Code`;

            for(let i=0;i<drops.length;i++){

                const text =
                    letters[
                        Math.floor(
                            Math.random() *
                            letters.length
                        )
                    ];

                matrixCtx.fillText(
                    text,
                    i * fontSize,
                    drops[i] * fontSize
                );

                if(
                    drops[i] * fontSize >
                    matrixCanvas.height &&
                    Math.random() > .975
                ){
                    drops[i] = 0;
                }

                drops[i]++;
            }

        },45);
}

function stopMatrix(){

    document.body.classList.remove(
        "matrix-active"
    );

    clearInterval(matrixInterval);

    matrixCtx.clearRect(
        0,
        0,
        matrixCanvas.width,
        matrixCanvas.height
    );
}

// =========================
// COMMAND HISTORY
// =========================

let commandHistory = [];

let historyIndex = -1;

// =========================
// SUGGESTIONS
// =========================

input.addEventListener(
    "input",
    ()=>{

        const value =
            input.value
            .trim()
            .toLowerCase();

        if(value === ""){

            suggestionText.textContent =
                "none";

            return;
        }

        const match =
            commandList.find(cmd =>
                cmd.startsWith(value)
            );

        suggestionText.textContent =
            match || "none";
    }
);

// =========================
// TERMINAL INPUT
// =========================

input.addEventListener(
    "keydown",
    async e=>{

        if(e.key === "Enter"){

            const cmd =
                input.value
                .trim()
                .toLowerCase();

            if(cmd === ""){
                return;
            }

            commandHistory.push(cmd);

            historyIndex =
                commandHistory.length;

            appendLine(
                `kaushal@os:~$ ${cmd}`,
                "command-line"
            );

            input.value = "";

            suggestionText.textContent =
                "none";

            input.disabled = true;

            // CLEAR

            if(cmd === "clear"){

                output.innerHTML = "";

                input.disabled = false;

                input.focus();

                return;
            }

            // BOOT

            if(cmd === "boot"){

                await bootTerminal();

                return;
            }

            // MATRIX

            if(cmd === "matrix"){

                startMatrix();

                await typeLine(
                    "> Matrix mode activated.",
                    "success-text",
                    12
                );

                input.disabled = false;

                input.focus();

                return;
            }

            // MATRIX OFF

            if(cmd === "matrix off"){

                stopMatrix();

                await typeLine(
                    "> Matrix mode deactivated.",
                    "warning-text",
                    12
                );

                input.disabled = false;

                input.focus();

                return;
            }

            // NORMAL COMMANDS

            if(commands[cmd]){

                await aiThinking();

                await typeBlock(
                    commands[cmd],
                    "output-line",
                    8
                );

                input.disabled = false;

                input.focus();

                return;
            }

            // INVALID

            triggerGlitch();

            await typeLine(
                `ERROR: '${cmd}' not found.`,
                "error-text",
                12
            );

            input.disabled = false;

            input.focus();
        }
    }
);

// =========================
// ROBOT EYES
// =========================

document.addEventListener(
    "mousemove",
    e=>{

        eyes.forEach(eye=>{

            const rect =
                eye.getBoundingClientRect();

            const eyeX =
                rect.left +
                rect.width / 2;

            const eyeY =
                rect.top +
                rect.height / 2;

            const dx =
                e.clientX - eyeX;

            const dy =
                e.clientY - eyeY;

            const angle =
                Math.atan2(dy,dx);

            const radius = 6;

            eye.style.transform =
                `
                translate(
                    ${radius * Math.cos(angle)}px,
                    ${radius * Math.sin(angle)}px
                )
                `;
        });
    }
);

// =========================
// PROJECT HOVER
// =========================

projectCards.forEach(card=>{

    card.addEventListener(
        "mouseenter",
        ()=>{

            card.style.boxShadow =
                `
                0 0 60px rgba(0,255,156,.25),
                0 0 120px rgba(0,234,255,.12)
                `;
        }
    );

    card.addEventListener(
        "mouseleave",
        ()=>{

            card.style.boxShadow =
                `
                0 0 45px rgba(0,255,156,.18)
                `;
        }
    );
});

// =========================
// REVEAL
// =========================

const revealElements =
    document.querySelectorAll(
        ".project-card, .contact-card"
    );

function revealOnScroll(){

    const triggerBottom =
        window.innerHeight * 0.85;

    revealElements.forEach(element=>{

        const top =
            element.getBoundingClientRect().top;

        if(top < triggerBottom){

            element.style.opacity = "1";

            element.style.transform =
                "translateY(0)";
        }
    });
}

revealElements.forEach(element=>{

    element.style.opacity = "0";

    element.style.transform =
        "translateY(60px)";

    element.style.transition =
        "all .8s ease";
});

window.addEventListener(
    "scroll",
    revealOnScroll
);

revealOnScroll();

// =========================
// NEURAL NETWORK
// =========================

const canvas =
    document.getElementById(
        "neural-canvas"
    );

const ctx =
    canvas.getContext("2d");

let nodes = [];

function resizeCanvas(){

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

    createNodes();
}

function createNodes(){

    nodes = [];

    const nodeCount =
        Math.floor(
            (
                window.innerWidth *
                window.innerHeight
            ) / 18000
        );

    for(let i = 0; i < nodeCount; i++){

        nodes.push({

            x:
                Math.random() *
                canvas.width,

            y:
                Math.random() *
                canvas.height,

            vx:
                (Math.random() - .5) *
                .35,

            vy:
                (Math.random() - .5) *
                .35,

            radius:
                Math.random() * 2 + 1
        });
    }
}

function drawNodes(){

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    for(let i = 0; i < nodes.length; i++){

        const nodeA = nodes[i];

        nodeA.x += nodeA.vx;
        nodeA.y += nodeA.vy;

        if(
            nodeA.x < 0 ||
            nodeA.x > canvas.width
        ){
            nodeA.vx *= -1;
        }

        if(
            nodeA.y < 0 ||
            nodeA.y > canvas.height
        ){
            nodeA.vy *= -1;
        }

        ctx.beginPath();

        ctx.arc(
            nodeA.x,
            nodeA.y,
            nodeA.radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "rgba(0,255,156,.8)";

        ctx.fill();

        for(let j=i+1;j<nodes.length;j++){

            const nodeB = nodes[j];

            const dx =
                nodeA.x - nodeB.x;

            const dy =
                nodeA.y - nodeB.y;

            const distance =
                Math.sqrt(
                    dx*dx + dy*dy
                );

            if(distance < 130){

                const opacity =
                    1 - distance / 130;

                ctx.beginPath();

                ctx.moveTo(
                    nodeA.x,
                    nodeA.y
                );

                ctx.lineTo(
                    nodeB.x,
                    nodeB.y
                );

                ctx.strokeStyle =
                    `rgba(0,234,255,${opacity * .22})`;

                ctx.lineWidth = 1;

                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(
        drawNodes
    );
}

window.addEventListener(
    "resize",
    resizeCanvas
);

resizeCanvas();

drawNodes();
