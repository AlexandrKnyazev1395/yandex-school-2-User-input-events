// ===================== Пример кода первой двери =======================
/**
 * @class Door0
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Door0(number, onUnlock) {
    DoorBase.apply(this, arguments);

    var buttons = [
        this.popup.querySelector('.door-riddle__button_0'),
        this.popup.querySelector('.door-riddle__button_1'),
        this.popup.querySelector('.door-riddle__button_2')
    ];

    buttons.forEach(function (b) {
        b.addEventListener('pointerdown', _onButtonPointerDown.bind(this));
        b.addEventListener('pointerup', _onButtonPointerUp.bind(this));
        b.addEventListener('pointercancel', _onButtonPointerUp.bind(this));
        b.addEventListener('pointerleave', _onButtonPointerUp.bind(this));
    }.bind(this));

    function _onButtonPointerDown(e) {
        e.target.classList.add('door-riddle__button_pressed');
        checkCondition.apply(this);
    }

    function _onButtonPointerUp(e) {
        e.target.classList.remove('door-riddle__button_pressed');
    }

    /**
     * Проверяем, можно ли теперь открыть дверь
     */
    function checkCondition() {
        var isOpened = true;
        buttons.forEach(function (b) {
            if (!b.classList.contains('door-riddle__button_pressed')) {
                isOpened = false;
            }
        });
        // Если все три кнопки зажаты одновременно, то откроем эту дверь
        if (isOpened) {
            this.unlock();
        }
    }
}

// Наследуемся от класса DoorBase
Door0.prototype = Object.create(DoorBase.prototype);
Door0.prototype.constructor = DoorBase;
// END ===================== Пример кода первой двери =======================

/**
 * @class Door1
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Door1(number, onUnlock) {
    DoorBase.apply(this, arguments);
    var isChecked = false;

    var buttons = {
        0: {
            button: this.popup.querySelector('.door-riddle-1__button_0'),
            newPlace: this.popup.querySelector('.door-riddle-1__button-place_0'),
        },
        1: {
            button: this.popup.querySelector('.door-riddle-1__button_1'),
            newPlace: this.popup.querySelector('.door-riddle-1__button-place_1'),
        },
        2: {
            button: this.popup.querySelector('.door-riddle-1__button_2'),
            newPlace: this.popup.querySelector('.door-riddle-1__button-place_2'),
        }
    }
    var movedButtons = {};

    for (var buttonKey in buttons) {
        var b = buttons[buttonKey].button;
        b.addEventListener('pointerdown', _onButtonPointerDown.bind(this));
        b.addEventListener('pointerup', _onButtonPointerUp.bind(this));
        b.addEventListener('pointercancel', _onButtonPointerUp.bind(this));
        b.addEventListener('pointerleave', _onButtonPointerUp.bind(this));
        b.addEventListener('pointermove', _onButtonPointerMove.bind(this));
    }

    function _onButtonPointerDown(e) {
        var buttonNumber = findButtonNumber(e.target.classList);
        //записываем начальные координаты
        if (!buttons[buttonNumber].defaultCoordinates) {
            buttons[buttonNumber].defaultCoordinates = [e.pageX, e.pageY];
        }
        //меняем стили нажатой кнопки
        e.target.classList.add('door-riddle-1__button_pressed');
        //меняем стили места для переноса
        var buttonPlace = buttons[buttonNumber].newPlace;
        buttonPlace.classList.add('door-riddle-1__button-place_ready');
    }

    function _onButtonPointerUp(e) {
        var buttonNumber = findButtonNumber(e.target.classList);
        //меняем стили неактивной кнопки 
        e.target.classList.remove('door-riddle-1__button_pressed');
        //меняем стили неактивного места для переноса
        var buttonPlace = buttons[buttonNumber].newPlace;
        buttonPlace.classList.remove('door-riddle-1__button-place_ready');
        //проверка на окончание игры
        checkCondition.apply(this);
        //перенос кнопки в дефолтные координаты
        moveButton(
            e.target,
            buttons[buttonNumber].defaultCoordinates[0],
            buttons[buttonNumber].defaultCoordinates[1],
        );
    }

    function _onButtonPointerMove(e) {
        var buttonNumber = findButtonNumber(e.target.classList);
        //находим элемент, над которым находится палец
        var elementOnPoint = document.elementFromPoint(e.pageX, e.pageY);
        //определяем, находится ли палец над нужным местом для кнопки
        var isRightTarget = elementOnPoint == buttons[buttonNumber].newPlace;
        if (isRightTarget) {
            movedButtons[buttonNumber] = true
        }
        //перенос кнопки в новые координаты
        moveButton(e.target, e.pageX, e.pageY);
    }

    function moveButton(target, x, y) {
        var buttonNumber = findButtonNumber(target.classList);
        var newX = x - buttons[buttonNumber].defaultCoordinates[0];
        var newY = y - buttons[buttonNumber].defaultCoordinates[1];
        target.style.transform = `translate(${newX}px, ${newY}px)`;
    }

    function findButtonNumber(classList) {
        var classOfButton = classList[1];
        //номер кнопки - последний символ класса
        var buttonNumber = parseInt(classOfButton[classOfButton.length - 1]);
        return buttonNumber;
    }

    function checkCondition() {
        isMoved = true;
        for (let i = 0; i < Object.keys(buttons).length; i++) {
            //если не все кнопки перенесены - дверь не открыта
            if (!movedButtons[i]) {
                isMoved = false;
            }
        }
        // Если все три кнопки перемещены, то открываем дверь
        if (isMoved && !isChecked) {
            this.unlock();
            //чтобы события других кнопок уже не открывали дверь
            isChecked = true;
        }
    }
    // ==== END Напишите свой код для открытия второй двери здесь ====
}
Door1.prototype = Object.create(DoorBase.prototype);
Door1.prototype.constructor = DoorBase;

/**
 * @class Door2
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Door2(number, onUnlock) {
    DoorBase.apply(this, arguments);

    // ==== Напишите свой код для открытия третей двери здесь ====
    var button = this.popup.querySelector('.door-riddle-2__button'); //копка для нажатий
    var scale = this.popup.querySelector('.door-riddle-2__scale'); //шкала с уровнем прохождения
    var scaleLevel = 0;
    var scaleLevelReducing;
    var pushTemp = 5;

    button.addEventListener('pointerdown', _onButtonPointerDown.bind(this));
    button.addEventListener('pointerup', _onButtonPointerUp.bind(this));
    /*button.addEventListener('pointercancel', _onButtonPointerUp.bind(this));
    button.addEventListener('pointerleave', _onButtonPointerUp.bind(this));*/

    function _onButtonPointerDown(e) {
        //при нажатии на кнопку увеличиваем уровень на шкале
        scaleLevel += pushTemp;
        //обновляем шкалу уровня прохождения
        updateScale();
        //отключаем уменьшение уровня
        clearInterval(scaleLevelReducing);
        //отражаем кнопку по горизонтали
        if(button.classList.contains('door-riddle-2__button_reflect')) {
            button.classList.remove('door-riddle-2__button_reflect')
        }
        else {
            button.classList.add('door-riddle-2__button_reflect')
        }
        
    }

    function _onButtonPointerUp(e) {
        checkCondition.apply(this);
        //включаем уменьшение уровня каждые 80мс
        scaleLevelReducing = setInterval(function () {
            if (scaleLevel > 0) {
                scaleLevel -= pushTemp;
                updateScale(scaleLevel);
            }
        }, 80)
    }

    function updateScale() {
        scale.style.background = `linear-gradient(to right, green ${scaleLevel}% , red 3%)`;
    }

    function checkCondition() {
        // открываем дверь если достигли 100 очков
        if (scaleLevel >= 100) {
            this.unlock();
        }
    }
    // ==== END Напишите свой код для открытия третей двери здесь ====
}
Door2.prototype = Object.create(DoorBase.prototype);
Door2.prototype.constructor = DoorBase;

/**
 * Сундук
 * @class Box
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Box(number, onUnlock) {
    DoorBase.apply(this, arguments);

    var button = this.popup.querySelector('.door-riddle-3__rock'); //камень, который кидаем
    var aim = this.popup.querySelector('.door-riddle-3__aim'); //цель, куда кидаем камень
    var arrow = this.popup.querySelector('.door-riddle-3__arrow') //стрелка, тображающая силу броска

    //информация о броске
    var throwStoneInfo = {
        startCoordinates: undefined,
        currentCoordinates: undefined,
        endCoordinates: undefined,
        power: undefined
    }

    button.addEventListener('pointerdown', _onButtonPointerDown.bind(this));
    button.addEventListener('pointerup', _onButtonPointerUp.bind(this));
    button.addEventListener('pointermove', _onButtonPointerMove.bind(this));

    function _onButtonPointerDown(e) {
        //записываем начальные координаты
        var coordinates = [e.pageX, e.pageY];
        throwStoneInfo.startCoordinates = coordinates;
    }

    function _onButtonPointerUp(e) {
        //записываем конечные координаты
        var coordinates = [e.pageX, e.pageY];
        throwStoneInfo.endCoordinates = coordinates;
        throwRock.apply(this);
    }

    function _onButtonPointerMove(e) {
        //записываем текцщие координаты
        var coordinates = [e.pageX, e.pageY];
        throwStoneInfo.currentCoordinates = coordinates;
        calculateThrow();
    }

    function calculateThrow() {
        var maxArrowSize = 300;
        //высчитываем расстояние между точками
        var startCoordinates = throwStoneInfo.startCoordinates;
        var x1 = startCoordinates[0];
        var y1 = startCoordinates[1]
        var currentCoordinates = throwStoneInfo.currentCoordinates;
        var x2 = currentCoordinates[0];
        var y2 = currentCoordinates[1]
        var distationBetween = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        if (distationBetween >= maxArrowSize) {
            distationBetween = maxArrowSize
        }
        //сила броска - это выбранная дистанция умножить на 2 
        throwStoneInfo.power = distationBetween * 2;
        //находим угол между серединой и нажатием
        var contiguousСathetLength = maxArrowSize;
        var hypotenuseLength = Math.sqrt((x2 - x1) ** 2 + (contiguousСathetLength - 0) ** 2)
        var angleInRadians = Math.acos(contiguousСathetLength / hypotenuseLength);
        var angleInDegrees = angleInRadians * 180 / Math.PI;
        if (x1 < x2) {
            angleInDegrees = -angleInDegrees
        }
        //меняем угол наклона стрелки
        arrow.style.transform = `skew(${angleInDegrees}deg) translateX(${-angleInDegrees * Math.PI}px) `;
        //меняем высоту стрелки
        arrow.style.backgroundSize = `auto ${distationBetween}px`
    }

    function throwRock() {
        var power = throwStoneInfo.power;
        var startCoordinates = throwStoneInfo.startCoordinates;
        var endCoordinates = throwStoneInfo.endCoordinates;
        var t = 0.1;
        //с шагом 0.1 передвигаем камень по вектору, пока сила не станет равна 0
        while (power >= 0) {
            var Vx = endCoordinates[0] - startCoordinates[0];
            var Vy = endCoordinates[1] - startCoordinates[1];
            var newX = startCoordinates[0] + (Vx * t);
            var newY = startCoordinates[1] + (Vy * t);
            moveRock(newX, newY);
            power -= 20;
            t += 0.1;
        }
        setTimeout(function () {
            checkCondition.apply(this);
        }.bind(this), 400);

    }

    function moveRock(x, y) {
        x = x - throwStoneInfo.startCoordinates[0];
        y = y - throwStoneInfo.startCoordinates[1];
        button.style.transform = `translateX(${x}px) translatey(${y}px)`
    }

    function checkCondition() {
        //координаты центра цели
        var aimCoordinates = aim.getBoundingClientRect();
        var circleCenter = [
            aimCoordinates.left + aimCoordinates.width / 2,
            aimCoordinates.top + aimCoordinates.height / 2
        ];
        var radius = aimCoordinates.width / 2;
        //координаты центра камня
        var stoneCoordinates = button.getBoundingClientRect();
        var stoneCenter = [
            stoneCoordinates.left + stoneCoordinates.width / 2,
            stoneCoordinates.top + stoneCoordinates.height / 2
        ];

        var x = stoneCenter[0];
        var y = stoneCenter[1];
        var easyMod = 30;
        //находится ли камень в круге?
        var isInCircle = ((x - circleCenter[0]) ** 2 + (y - circleCenter[1]) ** 2) <= radius ** 2 + easyMod;
        if (isInCircle) {
            setTimeout(function () {
                this.unlock();
                resetGame();
            }.bind(this), 500)    
        }
        else{
            resetGame()
        }
        
        function resetGame() {
            arrow.style.backgroundSize = `auto 0px`;
            button.style.transform = `none`;
            var throwStoneInfo = {}
        }
    }

    this.showCongratulations = function () {
        alert('Дисквалификация! Вы принимали допинг!');
    };
}
Box.prototype = Object.create(DoorBase.prototype);
Box.prototype.constructor = DoorBase;
