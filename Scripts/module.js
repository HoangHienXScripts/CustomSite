// Shorten the funcs
function id(i) { return document.getElementById(i); }
function get_content(i) { return id(i).innerText; }
function set_content(i, c) { id(i).textContent = c; }
function load_html(i, c) { id(i).innerHTML = c; }

export const funcs = {
  id, get_content, set_content, load_html
};
