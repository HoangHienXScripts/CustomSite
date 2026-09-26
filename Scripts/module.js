// Shorten the funcs
function id(i) { return document.getElementById(i); }
function get_content(i, m) {
  let x = m || 0;
  if (x === 0) {
    x = id(i).innerText;
  } else if (x === 1) {
    x = id(i).textContent;
  } else {
    x = `Invalid method: ${m}`;
  }
  return x;
}
function set_content(i, c) { id(i).textContent = c; }
function load_html(i, c) { id(i).innerHTML = c; }

export const funcs = {
  id, get_content, set_content, load_html
};
