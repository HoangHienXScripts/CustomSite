import * as uhhh from "./uhhh_smth.js";

async function loadContent() {
    const response = await fetch("../Updates/body.html");
    const content = await response.text();
    document.getElementById("content").innerHTML = content;
    uhhh.countdown();
}
loadContent();
