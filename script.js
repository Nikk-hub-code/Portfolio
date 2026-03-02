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
whoami
skills
projects
education
contact
clear
`,
    whoami: "Kaushal Kumar Jha, aspiring web developer.",
    skills: "HTML, CSS, JavaScript, Python, and problem solving.",
    projects: `
Terminal style portfolio.
Countdown timer.
Array and string problem solver.
`,
    education: "Bachelor of Technology in Computer Science.",
    contact: `
Email: kaushal@example.com
GitHub: github.com/kaushal
LinkedIn: linkedin.com/in/kaushal
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
