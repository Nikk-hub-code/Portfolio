// ELEMENTS

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

input.disabled = true;

// TIME

function updateSystemTime(){

    const now =
        new Date();

    const time =
        now.toLocaleTimeString("en-IN",{
            hour12:false
        });

    systemTime.textContent =
        `SYSTEM TIME: ${time}`;
}

setInterval(updateSystemTime,1000);

updateSystemTime();

// HERO TYPE TEXT

const roles = [

    "AI / ML ENGINEER",

    "INTELLIGENT SYSTEM BUILDER",

    "JUNE AI ASSISTANT CREATOR",

    "FUTURISTIC INTERFACE DEVELOPER"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeHeroText(){

    const currentRole =
        roles[roleIndex];

    if(!deleting){

        typingText.textContent =
            currentRole.substring(0,charIndex + 1);

        charIndex++;

        if(charIndex === currentRole.length){

            deleting = true;

            setTimeout(typeHeroText,1500);

            return;
        }

    }else{

        typingText.textContent =
            currentRole.substring(0,charIndex - 1);

        charIndex--;

        if(charIndex === 0){

            deleting = false;

            roleIndex =
                (roleIndex + 1) % roles.length;
        }
    }

    setTimeout(
        typeHeroText,
        deleting ? 45 : 90
    );
}

typeHeroText();

// CURSOR GLOW

document.addEventListener("mousemove",e=>{

    cursorGlow.style.left =
        e.clientX + "px";

    cursorGlow.style.top =
        e.clientY + "px";
});

// UTILS

function sleep(ms){

    return new Promise(resolve =>
        setTimeout(resolve,ms)
    );
}

function scrollOutput(){

    output.scrollTop =
        output.scrollHeight;
}

function appendLine(text,className = "output-line"){

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

async function typeLine(text,className = "output-line",speed = 15){

    const div =
        document.createElement("div");

    div.className =
        className;

    output.appendChild(div);

    for(let i = 0; i < text.length; i++){

        div.innerHTML +=
            text[i];

        scrollOutput();

        await sleep(speed);
    }

    return div;
}

async function typeBlock(text,className = "output-line",speed = 8){

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

    terminal.classList.add("glitch");

    setTimeout(()=>{

        terminal.classList.remove("glitch");

    },700);
}

// TERMINAL BOOT

async function bootTerminal(){

    input.disabled = true;

    suggestionText.textContent =
        "none";

    output.innerHTML =
        "";

    const bootLines = [

        {
            text:"> Powering Kaushal OS terminal...",
            className:"info-text"
        },

        {
            text:"> Loading interface modules........ [ OK ]",
            className:"success-text"
        },

        {
            text:"> Connecting neural systems........ [ OK ]",
            className:"success-text"
        },

        {
            text:"> Initializing AI engine........... [ OK ]",
            className:"success-text"
        },

        {
            text:"> Loading command history.......... [ OK ]",
            className:"success-text"
        },

        {
            text:"> Security layer active............ [ ENABLED ]",
            className:"warning-text"
        },

        {
            text:"> Terminal online.",
            className:"success-text"
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
            <div class="success-text">WELCOME TO KAUSHAL AI TERMINAL</div>
            <br>
            Type <span class="info-text">'help'</span> to see available commands.<br>
            Use <span class="info-text">↑</span> and <span class="info-text">↓</span> for command history.<br>
            Try <span class="info-text">'matrix'</span>, <span class="info-text">'projects'</span>, <span class="info-text">'scan'</span>, or <span class="info-text">'status'</span>.
        </div>
        `
    );

    input.disabled =
        false;

    input.focus();
}

bootTerminal();

// COMMAND DATA

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

whoami        -> about me
skills        -> technical stack
projects      -> project modules
education     -> education details
experience    -> current work experience
achievements  -> achievements
resume        -> resume information
contact       -> contact details
socials       -> social links
june          -> JUNE AI Assistant details
status        -> system status
scan          -> scan portfolio modules
neural        -> neural system info
system        -> OS details
matrix        -> activate matrix mode
matrix off    -> deactivate matrix mode
boot          -> reboot terminal
clear         -> clear terminal
jarvis        -> hidden protocol
activate      -> activation sequence
`,

    whoami:`
IDENTITY PROFILE

Name    : Kaushal Kumar Jha
Role    : AI / ML Engineer
Focus   : Artificial Intelligence, Machine Learning, NLP
Mission : Build intelligent systems and futuristic AI products.

Currently developing JUNE AI Assistant and building strong AI/ML projects for placements.
`,

    skills:`
TECHNICAL SKILL STACK

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
- Scikit-learn

Backend:
- FastAPI
- Flask

Tools:
- Git
- GitHub
- VS Code
`,

    education:`
EDUCATION MODULE

Degree:
B.Tech Computer Science Engineering

Current Focus:
AI/ML Engineering, project building, placement preparation, and futuristic AI systems.
`,

    experience:`
EXPERIENCE MODULE

Current Experience:
- Building AI/ML projects
- Developing JUNE AI Assistant
- Creating intelligent web-based systems
- Designing futuristic portfolio interfaces
`,

    achievements:`
ACHIEVEMENT LOGS

- Built Crop Recommendation System
- Built Handwritten Digit Recognition project
- Developing JUNE AI Assistant
- Building AI-focused portfolio
- Learning advanced AI system architecture
`,

    resume:`
RESUME ACCESS

Resume is available from the hero section.

Recommended:
Keep your resume updated with:
- JUNE AI Assistant
- Crop Recommendation System
- Handwritten Digit Recognition
- AI Terminal Portfolio
`,

    contact:`
CONTACT MODULE

Email:
jhakaushal.1809@gmail.com
`,

    socials:`
SOCIAL LINKS

GitHub:
github.com/Nikk-hub-code

LinkedIn:
linkedin.com/in/nikk18
`,

    june:`
JUNE AI ASSISTANT

JUNE is a futuristic AI assistant inspired by J.A.R.V.I.S.

Core Idea:
- Understand user queries
- Process intent
- Search knowledge
- Generate intelligent answers
- Build toward personal AI assistant behavior

Focus Areas:
- NLP
- AI reasoning
- Backend architecture
- Memory system
- Futuristic user interface
`,

    neural:`
NEURAL BACKGROUND SYSTEM

Status:
- Particle nodes active
- Connection graph rendering
- Real-time animation enabled
- AI visual interface synchronized
`,

    system:`
KAUSHAL OS v3.0

Interface:
Advanced AI Portfolio System

Modules:
- Hero Interface
- AI Status HUD
- Interactive Terminal
- Neural Canvas
- Matrix Mode
- Project Database
`,

    status:`
SYSTEM STATUS

AI CORE        : ONLINE
ML MODULE      : ACTIVE
NLP ENGINE     : ACTIVE
NEURAL CANVAS  : RUNNING
TERMINAL       : INTERACTIVE
MATRIX MODE    : AVAILABLE
PORTFOLIO DB   : CONNECTED
SYSTEM LOAD    : 98%
`
};

// PROJECT MODULE OUTPUT

function renderProjects(){

    appendLine(`
        <div class="project-module">
            <h4>01 — JUNE AI Assistant</h4>
            <p>Futuristic AI assistant inspired by J.A.R.V.I.S. focused on intelligent responses, query understanding, and assistant-like behavior.</p>
            <div class="progress-bar">
                <div class="progress-fill" style="width:86%"></div>
            </div>
            <span class="info-text">Tech: Python • NLP • FastAPI • AI Architecture</span>
        </div>

        <div class="project-module">
            <h4>02 — Handwritten Digit Recognition</h4>
            <p>Machine learning project that predicts handwritten digits using trained image classification models.</p>
            <div class="progress-bar">
                <div class="progress-fill" style="width:94%"></div>
            </div>
            <span class="info-text">Tech: Python • ML • Neural Networks • Image Processing</span>
        </div>

        <div class="project-module">
            <h4>03 — Crop Recommendation System</h4>
            <p>AI/ML system that recommends suitable crops based on soil and environmental conditions.</p>
            <div class="progress-bar">
                <div class="progress-fill" style="width:92%"></div>
            </div>
            <span class="info-text">Tech: Python • Scikit-learn • Flask • ML</span>
        </div>

        <div class="project-module">
            <h4>04 — AI Terminal Portfolio</h4>
            <p>Futuristic interactive portfolio with terminal commands, neural background, HUD panels, and cyberpunk UI.</p>
            <div class="progress-bar">
                <div class="progress-fill" style="width:88%"></div>
            </div>
            <span class="info-text">Tech: HTML • CSS • JavaScript • UI Animation</span>
        </div>
    `);
}

// SCAN COMMAND

async function runScan(){

    const scanLines = [

        "> Scanning portfolio modules...",
        "> Hero interface detected........ [ ACTIVE ]",
        "> AI terminal engine detected.... [ ACTIVE ]",
        "> Project database detected...... [ CONNECTED ]",
        "> Neural canvas detected......... [ RUNNING ]",
        "> Recruiter impression level..... [ HIGH ]",
        "> Scan complete."
    ];

    for(const line of scanLines){

        await typeLine(
            line,
            "success-text",
            12
        );

        await sleep(180);
    }
}

// MATRIX MODE

const matrixCanvas =
    document.getElementById("matrix-canvas");

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

    document.body.classList.add("matrix-active");

    const letters =
        "01AIJUNEKAUSHALMACHINELEARNINGNEURALNETWORK";

    const fontSize =
        16;

    const columns =
        Math.floor(matrixCanvas.width / fontSize);

    const drops =
        Array(columns).fill(1);

    if(matrixInterval){
        clearInterval(matrixInterval);
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

            for(let i = 0; i < drops.length; i++){

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

    document.body.classList.remove("matrix-active");

    if(matrixInterval){

        clearInterval(matrixInterval);

        matrixInterval =
            null;
    }

    matrixCtx.clearRect(
        0,
        0,
        matrixCanvas.width,
        matrixCanvas.height
    );
}

// COMMAND HISTORY

let commandHistory = [];
let historyIndex = -1;

// INPUT SUGGESTION

input.addEventListener("input",()=>{

    const value =
        input.value.trim().toLowerCase();

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
});

// TERMINAL COMMAND EXECUTION

input.addEventListener("keydown",async e=>{

    if(e.key === "ArrowUp"){

        e.preventDefault();

        if(commandHistory.length > 0){

            historyIndex =
                Math.max(
                    0,
                    historyIndex - 1
                );

            input.value =
                commandHistory[historyIndex];
        }

        return;
    }

    if(e.key === "ArrowDown"){

        e.preventDefault();

        if(commandHistory.length > 0){

            historyIndex =
                Math.min(
                    commandHistory.length,
                    historyIndex + 1
                );

            input.value =
                commandHistory[historyIndex] || "";
        }

        return;
    }

    if(e.key === "Tab"){

        e.preventDefault();

        const suggestion =
            suggestionText.textContent;

        if(
            suggestion &&
            suggestion !== "none"
        ){
            input.value =
                suggestion;
        }

        return;
    }

    if(e.key === "Enter"){

        const cmd =
            input.value.trim().toLowerCase();

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

        input.value =
            "";

        suggestionText.textContent =
            "none";

        input.disabled =
            true;

        if(cmd === "clear"){

            output.innerHTML =
                "";

            input.disabled =
                false;

            input.focus();

            return;
        }

        if(cmd === "boot"){

            await bootTerminal();

            return;
        }

        if(cmd === "projects"){

            await aiThinking();

            renderProjects();

            input.disabled =
                false;

            input.focus();

            return;
        }

        if(cmd === "scan"){

            await runScan();

            input.disabled =
                false;

            input.focus();

            return;
        }

        if(cmd === "matrix"){

            startMatrix();

            await typeLine(
                "> Matrix mode activated.",
                "success-text",
                12
            );

            input.disabled =
                false;

            input.focus();

            return;
        }

        if(cmd === "matrix off"){

            stopMatrix();

            await typeLine(
                "> Matrix mode deactivated.",
                "warning-text",
                12
            );

            input.disabled =
                false;

            input.focus();

            return;
        }

        if(cmd === "jarvis"){

            await typeBlock(
                `
> Hidden protocol detected.
> J.A.R.V.I.S inspiration module unlocked.
> Sir, the interface is ready.
                `,
                "info-text",
                12
            );

            input.disabled =
                false;

            input.focus();

            return;
        }

        if(cmd === "activate"){

            await typeBlock(
                `
> Activation sequence started.
> Power routing stable.
> Neural interface synchronized.
> Kaushal OS is fully activated.
                `,
                "success-text",
                12
            );

            input.disabled =
                false;

            input.focus();

            return;
        }

        if(commands[cmd]){

            await aiThinking();

            await typeBlock(
                commands[cmd],
                "output-line",
                7
            );

            input.disabled =
                false;

            input.focus();

            return;
        }

        triggerGlitch();

        await typeLine(
            `ERROR: Command '${cmd}' not found.`,
            "error-text",
            12
        );

        await typeLine(
            "Type 'help' to view available commands.",
            "warning-text",
            12
        );

        input.disabled =
            false;

        input.focus();
    }
});

// ROBOT EYES

document.addEventListener("mousemove",e=>{

    eyes.forEach(eye=>{

        const rect =
            eye.getBoundingClientRect();

        const eyeX =
            rect.left + rect.width / 2;

        const eyeY =
            rect.top + rect.height / 2;

        const dx =
            e.clientX - eyeX;

        const dy =
            e.clientY - eyeY;

        const angle =
            Math.atan2(dy,dx);

        const radius =
            6;

        eye.style.transform =
            `
            translate(
                ${radius * Math.cos(angle)}px,
                ${radius * Math.sin(angle)}px
            )
            `;
    });
});

// NEURAL NETWORK CANVAS

const canvas =
    document.getElementById("neural-canvas");

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

    nodes =
        [];

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

        const nodeA =
            nodes[i];

        nodeA.x +=
            nodeA.vx;

        nodeA.y +=
            nodeA.vy;

        if(
            nodeA.x < 0 ||
            nodeA.x > canvas.width
        ){
            nodeA.vx *=
                -1;
        }

        if(
            nodeA.y < 0 ||
            nodeA.y > canvas.height
        ){
            nodeA.vy *=
                -1;
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

        for(let j = i + 1; j < nodes.length; j++){

            const nodeB =
                nodes[j];

            const dx =
                nodeA.x - nodeB.x;

            const dy =
                nodeA.y - nodeB.y;

            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
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

                ctx.lineWidth =
                    1;

                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(drawNodes);
}

window.addEventListener(
    "resize",
    resizeCanvas
);

resizeCanvas();

drawNodes();
