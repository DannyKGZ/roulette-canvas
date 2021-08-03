var colors = ["#fee8eb", "#ffffff", "#fee8eb", "#ffffff", "#fee8eb", "#ffffff", "#fee8eb", "#ffffff", "#fee8eb", "#ffffff"];
var quienes = ["ничего", "скидка на все 300руб.", "скидка на все 10%", "увы, в другой раз", "скидка на все 5%",
    "секретная акция", "подарок сюрприз", "скидка на все 1000 руб.", "увы, в другой раз", "бесплатная", "доставка"
];


var startAngle = 0;
var arc = Math.PI / 5;
var spinTimeout = null;
var spinArcStart = 10;
var spinTime = 10;
var spinTimeTotal = 10;
var ctx;

let wheelLogoImg = document.querySelectorAll('.wheelcanvas-logo img')[0];

function spinLogo(spinAngle){
    wheelLogoImg.style.transform = `rotate(${spinAngle * 360}deg)`
}

function drawRouletteWheel() {
    let canvas = document.getElementById("wheelcanvas");
    if (canvas.getContext) {
        let outsideRadius = 190;
        let textRadius = 110;
        let insideRadius = 40;
        ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, 500, 500);
        ctx.strokeStyle = "#ffd9de"; // Цвет границ

        ctx.save();

        //Обводка 1 круга
        ctx.fillStyle = "#fff";//Цвет 1 круга обводки
        ctx.beginPath();
        ctx.arc(250, 250, outsideRadius + 23, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();

        //Обводка 2 круга
        ctx.fillStyle = '#ffd9de'; //цвет 2 внутреннего круга обводки
        ctx.beginPath();
        ctx.arc(250, 250, outsideRadius + 7, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        

        for (let i = 0; i < 10; i++) {

            let angle = startAngle + i * arc;
            ctx.fillStyle = colors[i];
            ctx.beginPath(); //контур
            ctx.arc(250, 250, outsideRadius, angle, angle + arc, false); //дуга
            ctx.arc(250, 250, insideRadius, angle + arc, angle, true); //дуга
            ctx.stroke(); //фигура
            ctx.fill();
            ctx.save();
            /*ctx.shadowOffsetX = 1; Тени
            ctx.shadowOffsetY = 1;
            ctx.shadowBlur = 1;
            ctx.shadowColor = "black";*/
            ctx.fillStyle = "#000";//ЦВЕТ ТЕКСТА 
            ctx.font = "12px Arial";
            ctx.translate(250 + Math.cos(angle + arc / 2) * textRadius, 250 + Math.sin(angle + arc / 2) * textRadius);
            ctx.rotate(angle + arc / 3 + Math.PI / 150); //Поворачиваем текст
            let text = quienes[i];
            ctx.fillText(text, -ctx.measureText(text).width / 2.3, 0)

            ctx.beginPath();
            ctx.arc(250 - outsideRadius + 34, 0, 3, 0, 2 * Math.PI);
            ctx.fillStyle = "#f47a91";
            ctx.fill();
            //ctx.stroke();
            ctx.restore(); //Возвращает ранее сохраненное состояние и атрибуты
        }

        //Arrow  на канвасе
        /*ctx.strokeStyle = 'navy'; // Set line colour.
        ctx.fillStyle = 'aqua'; // Set fill colour.
        ctx.lineWidth = 2;
        ctx.beginPath(); // Begin path.
        ctx.moveTo(250 - 6, 250 - (outsideRadius + 15));
        ctx.lineTo(250 + 6, 250 - (outsideRadius + 15));
        ctx.lineTo(250 + 6, 250 - (outsideRadius - 15));
        ctx.lineTo(250 + 15, 250 - (outsideRadius - 15));
        ctx.lineTo(250 + 0, 250 - (outsideRadius - 33));
        ctx.lineTo(250 - 15, 250 - (outsideRadius - 15));
        ctx.lineTo(250 - 6, 250 - (outsideRadius - 15));
        ctx.lineTo(250 - 6, 250 - (outsideRadius + 15));
        ctx.stroke();
        ctx.fill();*/
    }
}

function rotateWheel() {
    clearTimeout(spinTimeout);
    spinTime += 5; //Как долго будет крутиться

    if (spinTime >= spinTimeTotal) {
        stopRotateWheel();
        return;
    }
    let spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal); //метод easeout - анимация в обратном порядке
    startAngle += (spinAngle * Math.PI / 180);
    spinLogo(spinAngle);
    drawRouletteWheel();
    spinTimeout = setInterval('rotateWheel()'); // вызываем круг один раз, через определенный интервал времени


}

// При остановке прокрутки, будет показывать число по середине круга.
function stopRotateWheel() {
    let degrees = startAngle * 180 / Math.PI + 5;
    console.log(degrees);
    let arcd = arc * 180 / Math.PI;
    let index = Math.floor((360 - degrees % 360) / arcd);
    console.log(index);
    ctx.save();

    /*ctx.font = 'bold 32px sans-serif';
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.shadowBlur    = 2;
    ctx.shadowColor   = "black";*/
    let text = quienes[index]
    //ctx.fillText(text, 250 - ctx.measureText(text).width / 2, 250 + 10);
    ctx.restore();
    //alert(text);

    //убираем 1 часть
    document.querySelector('.right-side__first-part').classList.add("no-active");
    document.querySelector('.right-side__second-part').classList.remove("no-active");

    document.querySelector('.win-text').innerHTML = text;
    
}
//switch 2 часть
function regtxt(){
    document.querySelector('.right-side__second-part').classList.add("no-active");

    document.querySelector('.right-side__third-part').classList.remove('no-active');
    //console.log(text);

}
function easeOut(t, b, c, d) {
    let ts = (t /= d) * t;
    let tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
}

function spin() {
    spinAngleStart = Math.floor(Math.random() * 16 + 16); //random - Возвращает случайное число между 0 и 1 * 100
    spinTime = 0;
    spinTimeTotal = Math.random() * 3 + 4 * 1500;
    rotateWheel();
}
drawRouletteWheel();

//Крутится ракушка
btn_rodar.onclick = function (e) {
    spinAngleStart = Math.floor(Math.random() * 16 + 16); //random - Возвращает случайное число между 0 и 1 * 100
    spinTime = 0;
    spinTimeTotal = Math.random() / 2 * 3 + 4 * 1500;
    spin();
}