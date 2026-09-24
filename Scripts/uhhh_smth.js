export function countdown() {
    const html_cd_path = document.getElementById("countdown");
    if (!html_cd_path) { // ok, đã hiểu... cơ bản cái này giống if not html_cd_path then print err return end
        console.error("The #countdown element was not found.");
        return;
    }
    let time_left = 300;
    const update_cd = () => {
        const minutes = Math.floor(time_left / 60);
        const seconds = time_left % 60;
        html_cd_path.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    };
    update_cd();
    const timer = setInterval(() => { // setInterval() có vẻ như là 1 hàm built-in js tạo loop chạy mã code or script or watever...
        time_left -= 1;
        update_cd();
        if (time_left <= 0) { // nếu time_left nhỏ hơn hoặc bằng 0 thì
            clearInterval(timer); // disconnect vòng lặp, break
            window.location.reload(); // cái này chịu
        }
    }, 1000); // argument số 2 có vẻ là số lần, như for i = 1, 1000 do trong lua
}

export function points_handle() {
    const displayer = document.getElementById("uh_point");
    const adder = document.getElementById("add_uh_point");
    
    let points = Number(localStorage.getItem("Points")) || 0;
    displayer.textContent = points;
    adder.addEventListener("click", () => {
        points += 1;
        localStorage.setItem("Points", points);
        displayer.textContent = points;
    });
}
