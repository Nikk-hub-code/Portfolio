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

const robot =
    document.querySelector(".robot");

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
// ROBOT REACTIVE STATES
// =========================

let robotStateTimeout = null;

function setRobotState(state, duration = 0){
    if(!robot) return;

    if(robotStateTimeout){
        clearTimeout(robotStateTimeout);
        robotStateTimeout = null;
    }

    robot.classList.remove("thinking", "success", "error");

    if(state && state !== "idle"){
        robot.classList.add(state);

        if(duration > 0){
            robotStateTimeout = setTimeout(()=>{
                robot.classList.remove("thinking", "success", "error");
            }, duration);
        }
    }
}

// =========================
// WEB SPEECH API (VOICE)
// =========================

let voiceEnabled = false;
let availableVoices = [];

function loadVoices(){
    if(!("speechSynthesis" in window)) return;
    availableVoices = window.speechSynthesis.getVoices();
}

if("speechSynthesis" in window){
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
}

function speak(text){
    if(!voiceEnabled || !("speechSynthesis" in window)) return;

    try{
        window.speechSynthesis.cancel();
        const cleanText = text
            .replace(/<[^>]*>/g, " ")
            .replace(/[>\-_#*~|\[\]=+]/g, " ")
            .replace(/https?:\/\/\S+/g, "")
            .replace(/\s+/g, " ")
            .trim();

        if(!cleanText) return;

        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.rate = 1.05;
        utterance.pitch = 1.0;

        if(availableVoices.length === 0) loadVoices();
        const preferredVoice = availableVoices.find(v =>
            v.lang.startsWith("en") && (v.name.includes("Natural") || v.name.includes("Google") || v.name.includes("Neural"))
        ) || availableVoices.find(v => v.lang.startsWith("en"));

        if(preferredVoice) utterance.voice = preferredVoice;

        window.speechSynthesis.speak(utterance);
    }catch(err){
        console.warn("Speech synthesis error:", err);
    }
}

// =========================
// CYBERPUNK WEB AUDIO SFX
// =========================

let audioCtx = null;
let sfxEnabled = true;

const sfxToggleBtn = document.getElementById("sfx-toggle");

function getAudioContext(){
    if(!audioCtx && (window.AudioContext || window.webkitAudioContext)){
        const AudioClass = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioClass();
    }
    if(audioCtx && audioCtx.state === "suspended"){
        audioCtx.resume();
    }
    return audioCtx;
}

function updateSfxButtonUI(){
    if(!sfxToggleBtn) return;
    sfxToggleBtn.textContent = sfxEnabled ? "🔊 SFX: ON" : "🔇 SFX: OFF";
    sfxToggleBtn.style.color = sfxEnabled ? "var(--primary)" : "var(--accent-warn)";
}

if(sfxToggleBtn){
    sfxToggleBtn.addEventListener("click", ()=>{
        sfxEnabled = !sfxEnabled;
        updateSfxButtonUI();
        if(sfxEnabled){
            playCyberChime();
        }
    });
}

function playKeyClick(){
    if(!sfxEnabled) return;
    try{
        const ctx = getAudioContext();
        if(!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(750 + Math.random() * 250, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.03);
        gain.gain.setValueAtTime(0.03, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.03);
    }catch(e){}
}

function playCyberChime(){
    if(!sfxEnabled) return;
    try{
        const ctx = getAudioContext();
        if(!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.12); // G5
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.18);
    }catch(e){}
}

function playGlitchSound(){
    if(!sfxEnabled) return;
    try{
        const ctx = getAudioContext();
        if(!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(160, ctx.currentTime);
        osc.frequency.setValueAtTime(110, ctx.currentTime + 0.04);
        osc.frequency.setValueAtTime(70, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.07, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.14);
    }catch(e){}
}

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
    "AI / ML ENGINEER",
    "PYTHON DEVELOPER",
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
    speed = 10
){

    const div =
        document.createElement("div");

    div.className =
        className;

    output.appendChild(div);

    // If string contains HTML (links or styled spans), render directly to preserve tags
    if(text.includes("<") && text.includes(">")){
        div.innerHTML = text;
        scrollOutput();
        return div;
    }

    for(let i = 0; i < text.length; i++){

        div.textContent += text[i];

        scrollOutput();

        await sleep(speed);
    }

    return div;
}

async function typeBlock(
    text,
    className = "output-line",
    speed = 4
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

    setRobotState("thinking");

    const thinkingLine =
        appendLine(
            "> Accessing neural core...",
            "info-text"
        );

    await sleep(240);

    thinkingLine.remove();
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

    setRobotState("thinking");

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

        await sleep(150);
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
            to see all available commands. Press
            <span class="info-text">
                [Tab ↹]
            </span>
            to autocomplete.

            <br><br>

            Recommended queries:
            <span class="info-text">
                whoami
            </span>,
            <span class="info-text">
                projects
            </span>,
            <span class="info-text">
                skills
            </span>,
            <span class="info-text">
                jarvis
            </span>,
            <span class="info-text">
                scan
            </span>,
            <span class="info-text">
                matrix
            </span>,
            <span class="info-text">
                voice on
            </span>

        </div>
        `
    );

    setRobotState("success", 1200);

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
    "jarvis",
    "status",
    "scan",
    "neural",
    "activate",
    "system",
    "matrix",
    "matrix off",
    "voice on",
    "voice off",
    "sfx on",
    "sfx off",
    "boot",
    "clear"
];

const commandAliases = {
    "cls": "clear",
    "about": "whoami",
    "email": "contact",
    "github": "socials",
    "linkedin": "socials",
    "ls": "help",
    "dir": "help",
    "voice": "voice on",
    "sound": "sfx on",
    "audio": "sfx on",
    "sfx": "sfx on"
};

const commands = {

help:`
==========================================
AVAILABLE SYSTEM COMMANDS
==========================================
whoami       - Developer identity profile
skills       - Technical stack & capabilities
projects     - Featured AI/ML modules
education    - Academic background
experience   - Professional learning path
achievements - Highlights & milestones
resume       - View & download Resume (PDF)
contact      - Communication protocol & email
socials      - GitHub & LinkedIn channels
june         - JUNE AI assistant overview
jarvis       - Autonomous voice/AI protocol
status       - Real-time AI subsystem health
scan         - Run full system diagnostic scan
neural       - Neural network matrix info
activate     - Trigger system overdrive state
system       - Kaushal OS v3.0 telemetry
matrix       - Engage cyberpunk matrix rain
matrix off   - Disengage matrix rain
voice on     - Enable voice synthesis (Web Speech API)
voice off    - Disable voice synthesis
sfx on       - Enable sci-fi audio effects (Web Audio API)
sfx off      - Mute audio effects
boot         - Rerun terminal boot sequence
clear        - Clear the terminal screen
==========================================
Tip: Press [Tab ↹] or click suggestion to autocomplete!
`,

whoami:`
==========================================
IDENTITY PROFILE
==========================================
Name   : Kaushal Kumar Jha
Role   : AI / ML Engineer
Focus  : Artificial Intelligence, Deep Learning,
         Natural Language Processing (NLP),
         Autonomous Intelligent Systems
Status : Ready to build futuristic technologies.
==========================================
`,

skills:`
==========================================
TECHNICAL STACK & CAPABILITIES
==========================================
[ Languages ]
  • Python, JavaScript, HTML5, CSS3

[ AI / Machine Learning & Deep Learning ]
  • TensorFlow, PyTorch, Scikit-learn, CNN,
  • Natural Language Processing (NLP), Computer Vision

[ Backend & Frameworks ]
  • FastAPI, Flask, REST APIs

[ Architecture & Concepts ]
  • Intelligent Agents, Neural Networks,
  • DOM Manipulation, Web Speech API, UI/UX
==========================================
`,

projects:`
==========================================
FEATURED PROJECT MODULES
==========================================
1. JUNE AI ASSISTANT [AI-001]
   • Autonomous AI assistant inspired by J.A.R.V.I.S
   • Intelligent query processing, NLP reasoning & FastAPI
   • Tech: Python, NLP, FastAPI, AI Systems

2. HANDWRITTEN DIGIT RECOGNITION [ML-002]
   • Deep learning computer vision neural network
   • Tech: Python, TensorFlow, CNN, OpenCV

3. CROP RECOMMENDATION SYSTEM [ML-003]
   • Machine learning recommendation engine for agriculture
   • Tech: Python, Scikit-learn, Flask, ML Algorithms

4. KAUSHAL AI TERMINAL PORTFOLIO [UI-004]
   • Cyberpunk terminal OS with neural network visualizer
   • Tech: HTML5, CSS3, Vanilla JS, Web Speech API
==========================================
Tip: Scroll down to #projects for detailed view!
`,

education:`
==========================================
EDUCATION MODULE
==========================================
Degree : B.Tech in Computer Science & Engineering
Focus  : Artificial Intelligence & Machine Learning
Status : Undergraduate Scholar
==========================================
`,

experience:`
==========================================
LEARNING & DEVELOPMENT JOURNEY
==========================================
• AI/ML Systems Engineering & Prototyping
• JUNE AI Assistant: Architecture & NLP Core
• Neural Interface Design & Interactive Web Systems
• Deep Learning research in CNNs and Transformers
==========================================
`,

achievements:`
==========================================
ACHIEVEMENTS & MILESTONES
==========================================
★ Developed autonomous AI assistant JUNE
★ Built deep learning models with high predictive accuracy
★ Engineered futuristic cyberpunk terminal portfolio
★ Active open-source development on GitHub
==========================================
`,

resume:`
==========================================
RESUME ACCESS PROTOCOL
==========================================
Document: Kaushal Kumar Jha - Resume (PDF)
Link    : <a href="./Resume.pdf" target="_blank" download class="terminal-link">Download / Open Resume (PDF)</a>
==========================================
`,

contact:`
==========================================
COMMUNICATION PROTOCOL
==========================================
Email  : <a href="mailto:jhakaushal.1809@gmail.com" class="terminal-link">jhakaushal.1809@gmail.com</a>
Status : Open for AI/ML Opportunities & Research
==========================================
`,

socials:`
==========================================
EXTERNAL PROTOCOLS & SOCIALS
==========================================
GitHub   : <a href="https://github.com/Nikk-hub-code" target="_blank" rel="noopener noreferrer" class="terminal-link">github.com/Nikk-hub-code</a>
LinkedIn : <a href="https://linkedin.com/in/nikk18" target="_blank" rel="noopener noreferrer" class="terminal-link">linkedin.com/in/nikk18</a>
==========================================
`,

june:`
==========================================
JUNE AI ASSISTANT SPECIFICATIONS
==========================================
Designation : J.U.N.E (Just-in-time Universal Neural Engine)
Inspiration : J.A.R.V.I.S Architecture
Capabilities: Natural language understanding,
              real-time query resolution, system telemetry
Status      : Active Development
==========================================
`,

jarvis:`
==========================================
JUNE PROTOCOL [J.A.R.V.I.S ARCHITECTURE]
==========================================
"Good day. I am JUNE, Kaushal's autonomous
assistant interface. All systems are operating
at peak efficiency. How may I assist you?"

Try typing: 'projects', 'skills', or 'scan'
==========================================
`,

scan:`
==========================================
SYSTEM DIAGNOSTIC SCAN
==========================================
[✓] AI Core Subsystem     : ONLINE (v3.0 - OK)
[✓] Neural Engine         : CONNECTED (0.8ms)
[✓] Deep Learning Stack   : READY (TensorFlow)
[✓] Memory Banks          : 64% NOMINAL
[✓] Security Protocols    : ACTIVE (Quantum SSL)
[✓] Project Modules (4)   : ALL OPERATIONAL
------------------------------------------
DIAGNOSTIC STATUS: ALL SYSTEMS NOMINAL
==========================================
`,

neural:`
==========================================
NEURAL NETWORK CONFIGURATION
==========================================
Architecture : 2D Autonomous Synaptic Mesh
Visualizer   : HTML5 Canvas Particle Engine
Interactions : Cursor Proximity Force & Connectors
Status       : Real-time background thread active
Tip          : Type 'matrix' for Cyberpunk rain!
==========================================
`,

activate:`
==========================================
>>> SYSTEM OVERDRIVE ACTIVATED <<<
==========================================
[⚡] Core frequencies elevated to 100%
[⚡] Neural telemetry synchronized
[⚡] Robot assistant calibrated to peak state
==========================================
`,

status:`
==========================================
AI SYSTEM TELEMETRY
==========================================
AI CORE        : ONLINE ●
ML MODULE      : ACTIVE ●
NLP ENGINE     : ACTIVE ●
NEURAL SYSTEM  : RUNNING ●
VOICE API      : READY
SYSTEM LOAD    : OPTIMAL (18%)
==========================================
`,

system:`
==========================================
KAUSHAL OS v3.0 TELEMETRY
==========================================
Host       : kaushal-ai-station
Kernel     : Kaushal-OS-Kernel-v3.0.4-LTS
Shell      : kaushal-terminal-bash v2.1
Status     : Secure / Connected
Modules    : Hero Interface, AI Terminal, Neural Visualizer
==========================================
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
let tempInput = "";

// =========================
// SUGGESTIONS
// =========================

function updateSuggestion(){

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

input.addEventListener(
    "input",
    updateSuggestion
);

// Click suggestion to autocomplete
const suggestionElement =
    document.getElementById("suggestion-line");

if(suggestionElement){

    suggestionElement.addEventListener(
        "click",
        ()=>{

            const text =
                suggestionText.textContent;

            if(text && text !== "none" && !input.disabled){

                input.value = text;

                updateSuggestion();

                input.focus();
            }
        }
    );
}

// Click anywhere on terminal to refocus input (unless highlighting text)
if(terminal){

    terminal.addEventListener(
        "click",
        ()=>{

            const selection =
                window.getSelection
                    ? window.getSelection().toString()
                    : "";

            if(selection.length > 0){
                return;
            }

            if(!input.disabled){
                input.focus();
            }
        }
    );
}

// =========================
// TERMINAL INPUT
// =========================

input.addEventListener(
    "keydown",
    async e=>{

        // KEYSTROKE SOUND
        if(e.key !== "Enter" && e.key !== "Tab" && e.key !== "ArrowUp" && e.key !== "ArrowDown" && e.key !== "Shift" && e.key !== "Control" && e.key !== "Alt"){
            playKeyClick();
        }

        // TAB AUTOCOMPLETE
        if(e.key === "Tab"){
            const currentVal =
                input.value
                .trim()
                .toLowerCase();

            if(!currentVal){
                // Allow normal Tab navigation out of input!
                return;
            }

            const match =
                commandList.find(cmd =>
                    cmd.startsWith(currentVal)
                );

            if(match){
                e.preventDefault();
                input.value = match;
                updateSuggestion();
                playKeyClick();
            }

            return;
        }

        // HISTORY ARROW UP
        if(e.key === "ArrowUp"){

            e.preventDefault();

            if(commandHistory.length === 0){
                return;
            }

            if(historyIndex === commandHistory.length){
                tempInput = input.value;
            }

            if(historyIndex > 0){

                historyIndex--;

                input.value =
                    commandHistory[historyIndex];

                updateSuggestion();
            }

            return;
        }

        // HISTORY ARROW DOWN
        if(e.key === "ArrowDown"){

            e.preventDefault();

            if(commandHistory.length === 0){
                return;
            }

            if(historyIndex < commandHistory.length - 1){

                historyIndex++;

                input.value =
                    commandHistory[historyIndex];

                updateSuggestion();

            }else if(historyIndex === commandHistory.length - 1){

                historyIndex =
                    commandHistory.length;

                input.value =
                    tempInput || "";

                updateSuggestion();
            }

            return;
        }

        // ENTER EXECUTION
        if(e.key === "Enter"){

            const rawVal =
                input.value.trim();

            const cmd =
                rawVal.toLowerCase();

            if(cmd === ""){

                appendLine(
                    "kaushal@os:~$",
                    "command-line"
                );

                input.value = "";

                return;
            }

            commandHistory.push(rawVal);

            historyIndex =
                commandHistory.length;

            tempInput = "";

            appendLine(
                `kaushal@os:~$ ${rawVal}`,
                "command-line"
            );

            input.value = "";

            suggestionText.textContent =
                "none";

            input.disabled = true;

            // RESOLVE ALIASES
            const resolvedCmd =
                commandAliases[cmd] || cmd;

            // CLEAR
            if(resolvedCmd === "clear"){

                output.innerHTML = "";

                setRobotState("success", 800);

                input.disabled = false;

                input.focus();

                return;
            }

            // BOOT
            if(resolvedCmd === "boot"){

                setRobotState("thinking");

                await bootTerminal();

                setRobotState("success", 1200);

                return;
            }

            // MATRIX
            if(resolvedCmd === "matrix"){

                startMatrix();

                setRobotState("success", 1200);

                await typeLine(
                    "> Matrix mode activated.",
                    "success-text",
                    12
                );

                speak("Matrix mode activated.");

                input.disabled = false;

                input.focus();

                return;
            }

            // MATRIX OFF
            if(resolvedCmd === "matrix off"){

                stopMatrix();

                setRobotState("idle");

                await typeLine(
                    "> Matrix mode deactivated.",
                    "warning-text",
                    12
                );

                speak("Matrix mode deactivated.");

                input.disabled = false;

                input.focus();

                return;
            }

            // VOICE ON
            if(resolvedCmd === "voice on" || resolvedCmd === "voice"){

                voiceEnabled = true;

                setRobotState("success", 1200);

                await typeLine(
                    "> Voice interaction enabled via Web Speech API.",
                    "success-text",
                    12
                );

                speak("Voice interaction active. Systems online.");

                input.disabled = false;

                input.focus();

                return;
            }

            // VOICE OFF
            if(resolvedCmd === "voice off"){

                voiceEnabled = false;

                if("speechSynthesis" in window){
                    window.speechSynthesis.cancel();
                }

                setRobotState("idle");

                await typeLine(
                    "> Voice interaction disabled.",
                    "warning-text",
                    12
                );

                input.disabled = false;

                input.focus();

                return;
            }

            // SUDO
            if(resolvedCmd === "sudo"){

                triggerGlitch();

                setRobotState("error", 1500);

                await typeLine(
                    "ACCESS DENIED: 'kaushal' is the only root administrator.",
                    "error-text",
                    12
                );

                speak("Access denied. You are not root.");

                input.disabled = false;

                input.focus();

                return;
            }

            // EXIT / QUIT
            if(resolvedCmd === "exit" || resolvedCmd === "quit"){

                setRobotState("thinking", 1000);

                await typeLine(
                    "SESSION ACTIVE: Kaushal OS terminal session cannot be terminated.",
                    "warning-text",
                    12
                );

                input.disabled = false;

                input.focus();

                return;
            }

            // NORMAL COMMANDS
            if(commands[resolvedCmd]){

                await aiThinking();

                setRobotState("success", 1500);

                await typeBlock(
                    commands[resolvedCmd],
                    "output-line",
                    4
                );

                if(resolvedCmd === "jarvis"){
                    speak("Good day. I am JUNE, Kaushal's autonomous assistant interface.");
                }else if(resolvedCmd === "activate"){
                    triggerGlitch();
                    speak("System overdrive engaged.");
                }else if(resolvedCmd === "scan"){
                    speak("Diagnostic scan complete. All systems nominal.");
                }else if(resolvedCmd === "whoami"){
                    speak("Identity profile: Kaushal Kumar Jha, AI and Machine Learning Engineer.");
                }

                input.disabled = false;

                input.focus();

                return;
            }

            // INVALID COMMAND
            triggerGlitch();

            setRobotState("error", 1500);

            await typeLine(
                `ERROR: '${rawVal}' not found. Type 'help' to see all available commands.`,
                "error-text",
                12
            );

            speak("Command not recognized.");

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
