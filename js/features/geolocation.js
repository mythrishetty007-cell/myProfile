function initGeolocation() {
    const geoEl = document.getElementById('geo-message');
    if (!geoEl) return;

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    // Use a free reverse geocoding API
                    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                    const data = await response.json();
                    
                    if (data && data.address) {
                        const city = data.address.city || data.address.town || data.address.county || data.address.state || "your location";
                        geoEl.textContent = `📍 Browsing from ${city}`;
                    }
                } catch (error) {
                    console.log("Could not fetch location name:", error);
                }
            },
            (error) => {
                console.log("Geolocation error:", error.message);
                // Fail silently as this is just a nice-to-have feature
            }
        );
    }
}
