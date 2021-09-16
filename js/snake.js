const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

const box = 32;

// Добавляем изображения
let ground = new Image();
ground.src = "img/ground.png";
let foodImg = new Image();
foodImg.src = "img/food.png";

// Загружаем аудио
let eat = new Audio();
let up = new Audio();
let left = new Audio();
let right = new Audio();
let down = new Audio();

eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
left.src = "audio/left.mp3";
right.src = "audio/right.mp3";
down.src = "audio/down.mp3";

// Создаем змею
let snake = [];
snake[0] = {
    x: 9 * box, // Позиция по x
    y: 10 * box // y
}

// Создаем еду в случайном месте по координатам x и y
let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
}

// Переменная счета
let score = 0;

//Контролируем движение змеи
let d;

document.addEventListener("keydown", direction); // Создаем событие и вызываем функцию движения

function direction(event) {
    if (event.keyCode == 37 && d != "RIGHT") { //Добавляем доп условие, что бы змея не двигалась в противоположные стороны
        left.play();
        d = "LEFT";
    } else if (event.keyCode == 38 && d != "DOWN") {
        up.play();
        d = "UP";
    } else if (event.keyCode == 39 && d != "LEFT") {
        right.play();
        d = "RIGHT";
    } else if (event.keyCode == 40 && d != "UP") {
        down.play();
        d = "DOWN";
    }
}

// Контроль столкновения змеи с собой
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

// Рисовка всех изображений

function draw() {
    ctx.drawImage(ground, 0, 0);

    for (let i = 0; i < snake.length; i++) { // Отрисовка всех клеток змъеи
        ctx.fillStyle = (i == 0) ? "green" : "white"; // Цвет змеиной головы
        ctx.fillRect(snake[i].x, snake[i].y, box, box); // Положение змеиной головы

        ctx.strokeStyle = "red"; // Цвет обводки змеиной головы
        ctx.strokeRect(snake[i].x, snake[i].y, box, box); // Положение обводки змеиной головы
    }

    ctx.drawImage(foodImg, food.x, food.y); // Рисуем еду

    // Старое положение головы змеи
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Настраиваем направление движения
    if (d == "LEFT") snakeX -= box;
    if (d == "UP") snakeY -= box;
    if (d == "RIGHT") snakeX += box;
    if (d == "DOWN") snakeY += box;

    // Если змея ест еду
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        eat.play();
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box,
        }
    } else {
        // Удаление хвоста тела змеи
        snake.pop();
    }

    // Добавляем голову змее
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    //Контроль столкновений со стеной
    if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box ||
        snakeY > 17 * box || collision(newHead, snake)) {
        clearInterval(game);
        location.reload(); // Перезагрузка игры
    }


    snake.unshift(newHead);

    // Создаем надпись счета игрока
    ctx.fillStyle = "white"; //Цвет шрифта
    ctx.font = "45px Changa one"; // Размер и название шрифта
    ctx.fillText(score, 2 * box, 1.6 * box); // Расположение текста
}

// Вызов рисунка каждые 100 мс
let game = setInterval(draw, 100);