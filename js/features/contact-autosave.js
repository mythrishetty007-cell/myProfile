// ── Safe localStorage helpers ────────────────────────────────────────────────
function storageGet(key) {
    try { return localStorage.getItem(key); }
    catch (e) { return null; }
}
function storageSet(key, value) {
    try { localStorage.setItem(key, value); }
    catch (e) { /* storage blocked by Tracking Prevention — silently ignore */ }
}
function storageRemove(key) {
    try { localStorage.removeItem(key); }
    catch (e) { }
}

function initContactAutosave() {
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');

    if (!nameInput || !emailInput) return;

    const savedData = storageGet('contact-form-data');
    if (savedData) {
        try {
            const parsed = JSON.parse(savedData);
            nameInput.value = parsed.name || '';
            emailInput.value = parsed.email || '';
        } catch (e) {
            console.error("Could not parse saved contact data");
        }
    }

    const saveFormData = () => {
        const data = {
            name: nameInput.value,
            email: emailInput.value
        };
        storageSet('contact-form-data', JSON.stringify(data));
    };

    nameInput.addEventListener('input', saveFormData);
    emailInput.addEventListener('input', saveFormData);
}
