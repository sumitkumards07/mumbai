// ==========================================
// GLOBAL SETTING: CHANGE PHONE NUMBER HERE
// ==========================================
// Change the number below, and it will automatically update everywhere on the site!
const GLOBAL_PHONE_NUMBER = "8930689739";

document.addEventListener("DOMContentLoaded", function () {
    const num = GLOBAL_PHONE_NUMBER;

    // 1. Update Page Title
    if (document.title.includes("+91")) {
        document.title = `Shree Kshetrapal Bhavan – Jain Stay Mumbai | +91 ${num}`;
    }

    // 2. Update all Call Links
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.href = `tel:+91${num}`;
        if (link.innerText.includes("+91") || link.innerText.includes("8930689739")) {
            link.innerText = link.innerText.replace(/(\+91\s*)?\d{10}/, `+91 ${num}`);
        }
    });

    // 3. Update all WhatsApp Links (Preserving their specific pre-filled messages)
    document.querySelectorAll('a[href^="https://wa.me/"]').forEach(link => {
        try {
            const url = new URL(link.href);
            const textParam = url.searchParams.get('text') || "";
            link.href = `https://wa.me/91${num}?text=${encodeURIComponent(textParam)}`;
        } catch (e) {
            // fallback
        }
    });
});
