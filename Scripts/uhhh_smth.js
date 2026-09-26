import {funcs as f} from "./module.js"

function convert(str) {
    return str.split("\n").map(line => {
        const [day, content] = line.split("~");
        return `<h2><b>${day}:</b> <p>${content}</p></h2>`;
    }).join("\n");
}

function set_clipboard(id) {
    const board = document.getElementById(id);
    const text = board.innerText;
    navigator.clipboard.writeText(text).then(() => {
        board.textContent = `Copied: ${text}`;
    }).catch(err => {
        board.textContent = `Failed: ${err}`;
    });
}

function countdown(TIME_LEFT) {
    const html_cd_path = document.getElementById("countdown");
    if (!html_cd_path) {
        console.error("The #countdown element was not found.");
        return;
    }
    let time_left = TIME_LEFT || 10;
    const update_cd = () => {
        const minutes = Math.floor(time_left / 60);
        const seconds = time_left % 60;
        html_cd_path.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    };
    update_cd();
    const timer = setInterval(() => { // setInterval(arg 1 : func, arg 2 : ms) return an object for clearInterval()
        time_left -= 1;
        update_cd();
        if (time_left <= 0) {
            clearInterval(timer); // clearInterval(arg 1 : object return from setInterval())
            window.location.reload();
        }
    }, 1000);
}

function points_handle() {
    let points = Number(localStorage.getItem("Points")) || 0;
    const displayer = document.getElementById("uh_point");
    const adder = document.getElementById("add_uh_point");
    const suber = document.getElementById("sub_uh_point");
    const reset = document.getElementById("res_uh_point");
    const multi = document.getElementById("mul_uh_point");
    const divis = document.getElementById("div_uh_point");
    const keyid = document.getElementById("add_key");
    const updt_pt = (v) => {
        points = v;
        localStorage.setItem("Points", points);
        displayer.textContent = points;
    }
    
    displayer.textContent = points;
    
    adder.addEventListener("click", () => {
        updt_pt(points + 1);
    });
    suber.addEventListener("click", () => {
        updt_pt(points - 1);
    });
    multi.addEventListener("click", () => {
        if (points !== 0 && points !== 1 && points !== -1) {
            updt_pt(points * points);
        } else {
            displayer.textContent = "invalid number for mul";
        }
    });
    divis.addEventListener("click", () => {
        if (points !== 0 && points !== 1 && points !== -1) {
            updt_pt(points / points);
        } else {
            displayer.textContent = "invalid number for div";
        }
    });
    reset.addEventListener("click", () => {
        if (points === 24 || points === -24) { keyid.textContent = "ehto2026"; }
        points = 0;
        localStorage.clear();
        displayer.textContent = points;
    });
}

function key_handle() { // for fun
    const is_k = "nil";
}

export const helper_func = {
  conv: convert, scb: set_clipboard, cd: countdown, ph: points_handle
};
