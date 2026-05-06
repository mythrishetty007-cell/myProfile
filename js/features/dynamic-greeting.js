function initDynamicGreeting() {
    const greetingEl = document.getElementById('dynamic-greeting');
    if (!greetingEl) return;

    const hour = new Date().getHours();
    let greeting = 'Good Evening';

    if (hour >= 5 && hour < 12) {
        greeting = 'Good Morning';
    } else if (hour >= 12 && hour < 17) {
        greeting = 'Good Afternoon';
    }

    greetingEl.textContent = `${greeting}, Welcome to my portfolio!`;
}
