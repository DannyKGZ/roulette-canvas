var modal = document.getElementById("my_modal");
var btn = document.getElementById("btn_modal_window");
var span = document.getElementsByClassName("close_modal_window")[0];

btn.onclick = function () {
    modal.style.display = "block";
}

span.onclick = function () { //кнопка Х
    modal.style.display = "none";
}

window.onclick = function (event) { //при клике за окно, закрывает модалку
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
function closeAll(){
    close();
}