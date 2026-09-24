import { countdown } from "./uhhh_smth.js";

async function loadContent() {
    const contentContainer = document.getElementById("updated-content");

    if (!contentContainer) {
        console.error("The #updated-content element was not found.");
        return;
    }

    try {
        const response = await fetch("Updates/body.html", { cache: "no-store" });

        if (!response.ok) {
            throw new Error(`Failed to load updates: ${response.status} ${response.statusText}`);
        }

        contentContainer.innerHTML = await response.text();
        countdown();
    } catch (error) {
        console.error(error);
        contentContainer.innerHTML = "<p>Unable to load updates right now.</p>";
    }
}

loadContent();
