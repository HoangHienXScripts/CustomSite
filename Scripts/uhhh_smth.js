import {funcs as f} from "./module.js";

function convert(str) {
    return str.split("\n").map(line => {
        const [day, content] = line.split("~");
        return `<h2><b>${day}:</b> <p>${content}</p></h2>`;
    }).join("\n");
}

function set_clipboard(id) {
    const board = f.id(id);
    const text = f.get_content(id, 0);
    navigator.clipboard.writeText(text).then(() => {
        f.set_content(id, `Copied: ${text}`);
    }).catch(err => {
        f.set_content(id, `Failed: ${err}`);
    });
}

function countdown(TIME_LEFT) {
    const html_cd_path = f.id("countdown");
    if (!html_cd_path) {
        console.error("The #countdown element was not found.");
        return;
    }
    let time_left = TIME_LEFT || 10;
    const update_cd = () => {
        const minutes = Math.floor(time_left / 60);
        const seconds = time_left % 60;
        f.set_content("countdown", `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`);
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
    const adder = f.id("add_uh_point");
    const suber = f.id("sub_uh_point");
    const reset = f.id("res_uh_point");
    const multi = f.id("mul_uh_point");
    const divis = f.id("div_uh_point");
    const updt_pt = (v) => {
        points = v;
        localStorage.setItem("Points", points);
        f.set_content("uh_point", points);
    }
    
    f.set_content("uh_point", points);
    
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
            f.set_content("uh_point", "invalid number for mul");
        }
    });
    divis.addEventListener("click", () => {
        if (points !== 0 && points !== 1 && points !== -1) {
            updt_pt(points / points);
        } else {
            f.set_content("uh_point", "invalid number for div");
        }
    });
    reset.addEventListener("click", () => {
        if (points === 24 || points === -24) { f.set_content("add_key", "ehto2026"); }
        points = 0;
        localStorage.clear();
        f.set_content("uh_point", points);
    });
}

function key_handle() { // for fun
    const is_k = "nil";
}

export const helper_func = {
  conv: convert, scb: set_clipboard, cd: countdown, ph: points_handle
};
