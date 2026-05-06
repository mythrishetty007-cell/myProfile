// ── Typing Animation ────────────────────────────────────────────────────────
// Cycles through `roles`, typing each word character-by-character, pausing,
// then deleting before moving to the next role.

const typingEl = document.getElementById("typing-text");

// Store roles for different languages
const localizedRoles = {
    en: [
        "Full-Stack Developer",
        "MERN Enthusiast",
        "Competitive Programmer"
    ],
    kn: [
        "ಫುಲ್-ಸ್ಟ್ಯಾಕ್ ಡೆವಲಪರ್",
        "ಮರ್ನ್ (MERN) ಉತ್ಸಾಹಿ",
        "ಕಾಂಪಿಟಿಟಿವ್ ಪ್ರೋಗ್ರಾಮರ್"
    ],
    hi: [
        "फुल-स्टैक डेवलपर",
        "एमईआरएन उत्साही",
        "कॉम्पिटिटिव प्रोग्रामर"
    ]
};

if (typingEl) {
    const TYPING_SPEED   = 120;   // ms per character while typing
    const DELETING_SPEED =  60;   // ms per character while deleting
    const PAUSE_AFTER    = 1800;  // ms to pause once word is fully typed
    const PAUSE_BEFORE   =  400;  // ms to pause before typing the next word

    let roleIdx     = 0;
    let charIdx     = 0;
    let isDeleting  = false;
    let currentLang = 'en';

    // Helper to safely get current language from localStorage
    function getCurrentLang() {
        try {
            return localStorage.getItem('preferredLanguage') || 'en';
        } catch (e) {
            return 'en';
        }
    }

    function tick() {
        // Read language dynamically so it updates immediately when user switches
        const newLang = getCurrentLang();
        
        // If language changed while typing/deleting, reset nicely
        if (newLang !== currentLang) {
            currentLang = newLang;
            isDeleting = true; // Force deletion of current word to type new language
        }

        // Fallback to 'en' if invalid language somehow
        const activeRoles = localizedRoles[currentLang] || localizedRoles['en'];
        
        // Ensure roleIdx doesn't go out of bounds if arrays have different lengths
        if (roleIdx >= activeRoles.length) {
            roleIdx = 0;
        }

        const currentRole = activeRoles[roleIdx];

        if (isDeleting) {
            // Remove one character
            charIdx--;
            typingEl.textContent = currentRole.slice(0, charIdx);

            if (charIdx <= 0) {
                // Finished deleting — move to next role
                charIdx = 0;
                isDeleting = false;
                roleIdx    = (roleIdx + 1) % activeRoles.length;
                setTimeout(tick, PAUSE_BEFORE);
                return;
            }

            setTimeout(tick, DELETING_SPEED);

        } else {
            // Add one character
            typingEl.textContent = currentRole.slice(0, charIdx + 1);
            charIdx++;

            if (charIdx === currentRole.length) {
                // Finished typing — pause, then start deleting
                isDeleting = true;
                setTimeout(tick, PAUSE_AFTER);
                return;
            }

            setTimeout(tick, TYPING_SPEED);
        }
    }

    // Kick off
    currentLang = getCurrentLang();
    setTimeout(tick, PAUSE_BEFORE);
}
