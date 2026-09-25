import {helper_func as hf} from "./uhhh_smth.js";
async function render_content() {
    const box = document.getElementById("updated-content");
    if (!box) {
        console.error("The #updated-content element was not found.");
        return;
    }
    try {
        const rep = await fetch("Updates/body.html", {cache:"no-store"});
        const cdx = await fetch("Updates/script_updates", {cache:"no-store"});
        if (!rep.ok || !cdx.ok) {
            box.innerHTML = "<p>Failed to fetch smth...</p>";
        }
        const result_a = await rep.text();
        let result_b = await cdx.text();
        box.innerHTML = result_a;
        hf.cd();
        hf.ph();
    } catch (err) {
        console.error(err);
        box.innerHTML = "<p>Unable to load updates right now.</p>";
    }
}
render_content();
