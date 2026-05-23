// ================= TERMINAL ELEMENTS =================
const input = document.getElementById("command");
const output = document.getElementById("output");
const robot = document.querySelector(".robot");
const eyes = document.querySelectorAll(".eye");

// ================= SPEECH SETUP =================
const synth = window.speechSynthesis;

function speak(text) {
    if (!synth) return;

    synth.cancel(); // stop previous speech
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 1;
    utter.pitch = 1.1;
    utter.volume = 1;

    // Prefer a male / neutral English voice if available
    const voices = synth.getVoices();
    const preferred = voices.find(v =>
        v.lang.includes("en") && v.name.toLowerCase().includes("male")
    );
    if (preferred) utter.voice = preferred;

    synth.speak(utter);
}

// ================= INTRO =================
const intro = [
    "Welcome to Kaushal's Terminal Portfolio",
    "Type help to see available commands"
];

const staticIntroHTML = `
<div class="intro">
    <div>Welcome to Kaushal's Terminal Portfolio</div>
    <div>Type 'help' to see available commands</div>
</div>
`;

// ================= COMMANDS =================
const commands = {

    help: `
Available commands:

whoami      - About me
skills      - Technical skills
projects    - My projects
education   - Education details
experience  - Experience & learning
achievements- Certifications & achievements
resume      - Resume information
contact     - Contact details
clear       - Clear terminal
`,

    whoami: `
Hello, I'm Kaushal Kumar Jha.

A Computer Science Engineering student passionate about:
- Artificial Intelligence
- Machine Learning
- Web Development
- Autonomous Systems

Currently building:
- JUNE AI Assistant
- AI/ML projects

Goal:
To become an AI/ML Engineer and build intelligent systems from scratch.
`,

    skills: `
Frontend:
- HTML5
- CSS3
- JavaScript
- Responsive UI Design

Programming:
- Python
- C

AI / ML:
- Machine Learning Basics
- NLP Fundamentals
- Neural Networks
- Deep Learning Concepts

Tools & Technologies:
- Git & GitHub
- VS Code

Core CS:
- Data Structures & Algorithms
- OOPs
- DBMS
`,

    projects: `
1. JUNE AI Assistant (Working)
    - AI-powered assistant inspired by J.A.R.V.I.S
    - Custom frontend + backend architecture
    - Research engine + fallback response system\n

    Github:- github.com/Nikk-hub-code/june-ai-assistant\n

2. Crop Recommendation System
    - ML-based agriculture recommendation project
    - Suggests suitable crops using environmental data

    Github:- github.com/Nikk-hub-code/Crop-Recommendation-System

3. Handwritten Digit Recognition
    - Developed a Handwritten Digit Recognition system using Convolutional Neural Networks (CNN) with TensorFlow/Keras, achieving high accuracy on the MNIST dataset.
    - Built an end-to-end AI web application using Flask that preprocesses uploaded handwritten images and predicts digits in real time using a trained deep learning model.

    Github:- github.com/Nikk-hub-code/HandwrittenDigitRecognition

4. Terminal Portfolio
    - Interactive terminal-style portfolio website
    - Voice synthesis + animated robot assistant
    - Command-based navigation system

    Github:- github.com/Nikk-hub-code/Portfolio
`,

    education: `
Bachelor of Technology (B.Tech)
Computer Science Engineering

Current Focus:
- Artificial Intelligence
- Machine Learning
- Web Technologies
- System Design
`,

    experience: `
Learning Journey:

- Solving programming problems
- Building real-world AI projects
- Exploring LLM architectures

Currently learning:
- Deep Learning
- NLP
- AI System Architecture
`,

    achievements: `
Achievements & Highlights:

- Built multiple AI-based academic projects
- Developed a terminal-style interactive portfolio
- Working on custom AI assistant architecture
- Strong interest in research-oriented development
- Continuous learner in AI and emerging technologies
`,

    resume: `
Resume Highlights:

Role Target:
- AI/ML Engineer

Key Strengths:
- Fast learner
- Problem solving
- Project development
- Creative technical thinking

Type:
contact

to connect with me directly.
`,

    contact: `
Contact Information

Email:
jhakaushal.1809@gmail.com

GitHub:
https://github.com/Nikk-hub-code

LinkedIn:
https://www.linkedin.com/in/nikk18/
`
};

// ================= COMMAND HISTORY =================
let history = [];
let historyIndex = -1;

// ================= TYPING EFFECT =================
function typeText(text, speed = 25) {
    return new Promise(resolve => {
        let i = 0;
        const div = document.createElement("div");
        output.appendChild(div);

        const interval = setInterval(() => {
            div.textContent += text.charAt(i);
            i++;
            if (i >= text.length) {
                clearInterval(interval);
                resolve();
            }
        }, speed);
    });
}

// ================= SHOW INTRO =================
(async function showIntro() {
    for (let line of intro) {
        await typeText(line);
        speak(line);
    }
})();

// ================= ROBOT REACTION =================
function robotReact(state, duration = 600) {
    robot.classList.remove("success", "error", "thinking");
    robot.classList.add(state);

    setTimeout(() => {
        robot.classList.remove(state);
    }, duration);
}

// ================= TERMINAL INPUT =================
input.addEventListener("keydown", e => {

    // ENTER
    if (e.key === "Enter") {
        const cmd = input.value.trim().toLowerCase();
        output.innerHTML += `<div class="command">&gt; ${cmd}</div>`;

        if (cmd === "clear") {
            robotReact("success");
            speak("Terminal cleared");
            output.innerHTML =
                document.querySelector(".logo").outerHTML + staticIntroHTML;
        }

        else if (commands[cmd]) {
            robotReact("success");

            const response = commands[cmd].trim();
            response.split("\n").forEach(line => {
                if (line.trim()) output.innerHTML += `<div>${line}</div>`;
            });

            speak(response.replace(/\n/g, " "));
        }

        else if (cmd !== "") {
            robotReact("error");
            const err = "Command not found. Type help.";
            output.innerHTML += `<div>${err}</div>`;
            speak(err);
        }

        if (cmd) {
            history.push(cmd);
            historyIndex = history.length;
        }

        input.value = "";
        output.scrollTop = output.scrollHeight;
    }

    // ARROW UP
    else if (e.key === "ArrowUp") {
        if (history.length && historyIndex > 0) {
            historyIndex--;
            input.value = history[historyIndex];
        }
        e.preventDefault();
    }

    // ARROW DOWN
    else if (e.key === "ArrowDown") {
        if (history.length && historyIndex < history.length - 1) {
            historyIndex++;
            input.value = history[historyIndex];
        } else {
            historyIndex = history.length;
            input.value = "";
        }
        e.preventDefault();
    }
});

// ================= ROBOT THINKING =================
input.addEventListener("input", () => {
    robot.classList.add("thinking");
    clearTimeout(robot._thinkTimeout);
    robot._thinkTimeout = setTimeout(() => {
        robot.classList.remove("thinking");
    }, 500);
});

// ================= EYE TRACKING =================
document.addEventListener("mousemove", e => {
    eyes.forEach(eye => {
        const rect = eye.getBoundingClientRect();
        const eyeX = rect.left + rect.width / 2;
        const eyeY = rect.top + rect.height / 2;

        const dx = e.clientX - eyeX;
        const dy = e.clientY - eyeY;
        const angle = Math.atan2(dy, dx);
        const radius = 6;

        eye.style.transform =
            `translate(${radius * Math.cos(angle)}px, ${radius * Math.sin(angle)}px)`;
    });
});

// ================= BLINK =================
setInterval(() => {
    eyes.forEach(eye => eye.style.transform = "scaleY(0.1)");
    setTimeout(() => {
        eyes.forEach(eye => eye.style.transform = "scaleY(1)");
    }, 120);
}, 4000);
