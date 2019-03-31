/*var PIXI = require('./node_modules/pixi.js/dist/pixi.js');*/
import * as PIXI from 'pixi.js';

var width = window.innerWidth; //получаем ширину экрана
var height = window.innerHeight; // получаем высоту экрана
var app; //создаем глобальную переменную нашей игры
var colors = [0xFFFF0B, 0xFF700B, 0x4286f4, 0x4286f4, 0xf441e8, 0x8dff6d, 0x41ccc9, 0xe03375, 0x95e032, 0x77c687, 0x43ba5b, 0x0ea3ba]; //массив цветов, 0x вместо #
var gravity = 4;
var figuresAmount = -1; //количество созданных фигур(не ноль, потому как с нуля мы начинаем считать фигуры)
var figure = []; //массив хранящий нашу фигуру

var model = {
    createCanvas: function () {
        app = new PIXI.Application(width, height); //создаем холст
        document.body.appendChild(app.view); //выводим его в тело страницы
    },
    drawCircle: function () {
        var rand = Math.floor(Math.random() * colors.length); //генерим рандомное число(в промежутке от 0 до количества цветов в массиве цветов)
        var radius = 50; //радиус круга
        var inAreaX = width - 100; //возможные координаты по оси X, которые может занимать круг, ширина страницы минус его диаметр
        var circleY = -50; //круг должен создаваться за пределами холста(чтобы глянуть, отрисовался ли круг, измените отрицательное значение на положительное)
        var circleX = Math.floor(Math.random() * inAreaX); //создаем круг в рандомном месте по оси X
        var circle = new PIXI.Graphics(); //создаем новый графический элемент
        circle.lineStyle(0); //начинаем рисовать
        circle.beginFill(colors[rand], 1); //задаем рандомный цвет
        circle.drawCircle(circleX, circleY, radius); //рисуем кружок, ведь он наш дружок
        circle.endFill(); //закончили отрисовку
        circle.interactive = true; //делаем круг интерактивным
        circle.buttonMode = true; //меняем курсор при наведении
        app.stage.addChild(circle); //выводим круг на холсте
        circle.on('pointerdown', controller.clearFigure); //добавляем возможность при клике на фигуру удалить её
        circle.buttonMode = true; //меняем курсор при наведении
        figuresAmount++; //увеличиваем количество созданных шариков
        figure.push(circle); //обратиться на прямую к объекту circle мы не можем, поэтому отправляем его в массив
        app.stage.addChild(circle); //выводим круг на холсте
        circle.buttonMode = true; //меняем курсор при наведении
        circle.live = true; //указываем что наш шарик жив и не пал жертвой выстрела
        figuresAmount++;
        circle.num = figuresAmount; //даем нашему кругу порядковый номер
        figure.push(circle); //обратиться на прямую к объекту circle мы не можем, поэтому отправляем его в массив

    },
    gameOver: function() {
        var style = new PIXI.TextStyle({ //стили для текста
            fill: '0xffffff',
            fontSize: 36,
        });
        var gameOverText = new PIXI.Text('Game Over', style); //собственно выводимый текст
        gameOverText.x = width / 2; //центрируем относительно экрана
        gameOverText.y = height / 2; //центрируем относительно экрана
        gameOverText.pivot.x = 50; //выравниваем по оси х
        gameOverText.pivot.y = 50; // выравниваем по оси y
        app.stage.addChild(gameOverText); //выводим на холсте
    }
}

var view = {
    loadGame: function() {
        model.createCanvas();
        model.drawCircle();//отрисовываем кружок, пока один раз
        model.drawCircle(); //рисуем круг в первый раз
        setInterval(model.drawCircle, 500); //рисуем шарик каждые пол секунды

        app.ticker.add(function() { //постоянное обновление холста
            for (var i = 0; i < figuresAmount; i++) {
                figure[i].position.y += gravity; //заставляем гравитацию работать
                if (figure[i].position.y > height && figure[i].live == true) {//проверяет столкнулся ли шарик с низом страницы и если он жив, не пропускает его, а отменяет выводит на экран "игра окончена и завершает действие гравитации"
                    model.gameOver();
                    return false;
                }
            }
        });
    }
}


var controller = {
    clearFigure: function(){
        this.clear(); //удаляем фигуры по которой кликнули
        figure[this.num].live = false;
    }
}

view.loadGame();






