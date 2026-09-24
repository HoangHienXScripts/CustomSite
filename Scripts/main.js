import {convert, countdown, points_handle} from "./uhhh_smth.js";
async function render_content() {
    const box = document.getElementById("updated-content");
    if (!box) {
        console.error("The #updated-content element was not found.");
        return;
    }
    try {
        const rep = await fetch("Updates/body.html", {cache:"no-store"});
        if (!rep.ok) {
            throw new Error(`Failed to load updates: ${rep.status} ${rep.statusText}`);
        }
        box.innerHTML = await rep.text();
        countdown();
        points_handle();
    } catch (err) {
        console.error(err);
        box.innerHTML = "<p>Unable to load updates right now.</p>";
    }
}
render_content();
