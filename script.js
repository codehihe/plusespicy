document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.getElementById('cursor');
    const rotatingWords = document.getElementById('rotating-words');
    const sectionNav = document.getElementById('section-nav');
    const getStartedBtn = document.getElementById('get-started');
    const scrollTopBtn = document.getElementById('scroll-top');
    const consoleForm = document.getElementById('console-form');
    const consoleInput = document.getElementById('console-input');
    const consoleOutput = document.getElementById('console-output');
    const pricingGrid = document.getElementById('pricing-grid');
    const tabBtns = document.querySelectorAll('.tab-btn');

    const words = ["Game Hosting", "Minecraft", "Bots", "Webhost", "ARK"];
    let currentWordIndex = 0;

    const plans = [
        { name: "Starter", ram: "4GB", cpu: "2 vCPU", storage: "50GB NVMe", price: 10 },
        { name: "Pro", ram: "8GB", cpu: "4 vCPU", storage: "100GB NVMe", price: 20 },
        { name: "Elite", ram: "16GB", cpu: "8 vCPU", storage: "200GB NVMe", price: 40 },
    ];

    // Custom cursor
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });

    // Rotating words
    setInterval(() => {
        currentWordIndex = (currentWordIndex + 1) % words.length;
        rotatingWords.textContent = words[currentWordIndex];
    }, 2000);

    // Section navigation
    const sections = ['home', 'features', 'pricing', 'console'];
    sectionNav.addEventListener('click', (e) => {
        if (e.target.classList.contains('nav-dot')) {
            const sectionIndex = Array.from(sectionNav.children).indexOf(e.target);
            document.getElementById(sections[sectionIndex]).scrollIntoView({ behavior: 'smooth' });
        }
    });

    // Update active section on scroll
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        sections.forEach((section, index) => {
            const element = document.getElementById(section);
            if (element.offsetTop <= scrollPosition + 100) {
                document.querySelectorAll('.nav-dot').forEach((dot) => dot.classList.remove('active'));
                sectionNav.children[index].classList.add('active');
            }
        });
    });

    // Get Started button
    getStartedBtn.addEventListener('click', () => {
        alert("Welcome to PulseNode! You're on your way to high-performance game hosting.");
        window.open('https://client.plusenode.xyz/', '_blank');
    });
    
    // Join Discord button
    joinDiscordBtn.addEventListener('click', () => {
        window.open('https://discord.gg/25KQBBwT2D', '_blank');
    });

    // Scroll to top button
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Console functionality
    const STARTUP_MESSAGES = [
        "PulseNode v1.0.1 - High-Performance Game Server Hosting",
        "[System]: Welcome to PulseNode! Initializing game servers...",
        "[System]: Optimizing network connections...",
        "[System]: Loading user interface...",
        "[System]: Verifying server configurations...",
        "[System]: Applying performance tweaks...",
        "[System]: Finalizing setup: 75% complete",
        "[System]: Finalizing setup: 98% complete",
        "[System]: Ready! Type 'help' for available commands."
    ];

    const AVAILABLE_COMMANDS = [
        "/help", "/status", "/plans", "/games", "/performance",
        "/mods", "/backup", "/support", "/restart"
    ];

    STARTUP_MESSAGES.forEach((message, index) => {
        setTimeout(() => {
            appendToConsole(message);
        }, index * 500);
    });

    consoleForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const command = consoleInput.value.trim().toLowerCase();
        appendToConsole(`> ${command}`);

        switch(command) {
            case "help":
            case "?":
                appendToConsole("Available commands:");
                AVAILABLE_COMMANDS.forEach(cmd => appendToConsole(cmd));
                break;
            case "/status":
                appendToConsole("All game servers operational. Current server load: 42%");
                break;
            case "/plans":
                appendToConsole("Available plans:");
                plans.forEach(plan => appendToConsole(`${plan.name}: ${plan.ram} RAM, ${plan.cpu}, ${plan.storage} - $${plan.price}/mo`));
                break;
            case "/games":
                appendToConsole("Supported games: Minecraft, Valheim, ARK, Rust, Terraria, and many more!");
                break;
            case "/performance":
                appendToConsole("Our servers use the latest AMD EPYC processors and NVMe SSDs for optimal gaming performance.");
                break;
            case "/mods":
                appendToConsole("We support easy mod installation for most games. Check our knowledge base for game-specific instructions.");
                break;
            case "/backup":
                appendToConsole("Automatic daily backups are included with all plans. You can also create manual backups at any time.");
                break;
            case "/support":
                appendToConsole("For support, please email support@pulsenode.com or use our 24/7 live chat on the website.");
                break;
            case "/restart":
                appendToConsole("To restart your server, use the control panel on our website. Ensure to save your game data before restarting!");
                break;
            default:
                appendToConsole("Unknown command. Type 'help' or '?' to see available commands.");
        }

        consoleInput.value = "";
    });

    function appendToConsole(message) {
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        consoleOutput.appendChild(messageElement);
        consoleOutput.scrollTop = consoleOutput.scrollHeight;
    }

    // Pricing tabs and grid
    function updatePricingGrid(cycle) {
        pricingGrid.innerHTML = '';
        plans.forEach(plan => {
            const price = cycle === 'yearly' ? plan.price * 12 * 0.8 : plan.price;
            const card = document.createElement('div');
            card.className = 'pricing-card';
            card.innerHTML = `
                <h3 class="plan-name">${plan.name}</h3>
                <p class="plan-price">$${price.toFixed(2)}/${cycle === 'yearly' ? 'year' : 'mo'}</p>
                <ul class="plan-features">
                    <li>${plan.ram} RAM</li>
                    <li>${plan.cpu}</li>
                    <li>${plan.storage}</li>
                </ul>
                <button class="btn btn-primary">Select Plan</button>
            `;
            pricingGrid.appendChild(card);
        });
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            updatePricingGrid(btn.dataset.tab);
        });
    });

    // Initialize pricing grid
    updatePricingGrid('monthly');

    // Space animation (simplified version)
    const spaceAnimation = document.getElementById('space-animation');
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDuration = `${Math.random() * 3 + 2}s`;
        spaceAnimation.appendChild(star);
    }
});

// Custom cursor SVG
const cursorSVG = `
<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 2L2 30L12 20L22 30L16 2Z" fill="#FFD700" />
    <path d="M16 12L12 20H20L16 12Z" fill="#FF4500" />
</svg>
`;

document.getElementById('cursor').innerHTML = cursorSVG;

// Add styles for space animation
const style = document.createElement('style');
style.textContent = `
    .star {
        position: absolute;
        width: 2px;
        height: 2px;
        background-color: #fff;
        border-radius: 50%;
        animation: twinkle linear infinite;
    }
    @keyframes twinkle {
        0% { opacity: 0; }
        50% { opacity: 1; }
        100% { opacity: 0; }
    }
`;
document.head.appendChild(style);
