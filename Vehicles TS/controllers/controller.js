"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var car, RegExPlate = /([0-9]{4})([a-z]{3})/i, Mistakes = 0, c = 0, carArray = [];
var plateCar = document.getElementById('plate'), colorCar = document.getElementById('color'), brandCar = document.getElementById('brand'), componentsCar = document.getElementById('components'), carDetails = document.getElementById("car-details"), carTitle = document.getElementById("titolCar"), registerCar = document.getElementById('registerCar'), wheelTitle = document.getElementById("titolWheel"), registerWheels = document.getElementById('registerWheels'), wheelsCar = document.getElementById('wheelsCar'), editButton = document.getElementById("edit-button"), addWheelButton = document.getElementById("add-wheels-button"), saveCarButton = document.getElementById("save-car-button"), carGarage = document.getElementById('carGarage');
var CarSerial = /** @class */ (function (_super) {
    __extends(CarSerial, _super);
    function CarSerial(id, plate, brand, color) {
        var _this = _super.call(this, plate, brand, color) || this;
        _this.id = id;
        return _this;
    }
    return CarSerial;
}(Car));
function checkPlate() {
    if (RegExPlate.test(plateCar.value)) {
        if (plateCar.value.length == 7) {
            plateCar.classList.remove('is-invalid');
        }
        else {
            plateCar.classList.add('is-invalid');
            Mistakes++;
        }
    }
    else {
        plateCar.classList.add('is-invalid');
        Mistakes++;
    }
}
function checkColor() {
    if (colorCar.value == '') {
        colorCar.classList.add('is-invalid');
        Mistakes++;
    }
    else {
        colorCar.classList.remove('is-invalid');
    }
}
function checkBrand() {
    if (brandCar.value == '') {
        brandCar.classList.add('is-invalid');
        Mistakes++;
    }
    else {
        brandCar.classList.remove('is-invalid');
    }
}
function checkWheelBrand(e) {
    if (e.value === '') {
        e.classList.add('is-invalid');
    }
    else {
        e.classList.remove('is-invalid');
    }
}
function checkDiameter(e) {
    if (e.value < 0.4 || e.value > 2) {
        e.classList.add('is-invalid');
        Mistakes++;
    }
    else {
        e.classList.remove('is-invalid');
    }
}
function createCar(id, plate, brand, color) {
    Mistakes = 0;
    checkPlate();
    checkColor();
    checkBrand();
    if (Mistakes == 0) {
        id = c;
        plate = plateCar.value;
        brand = brandCar.value;
        color = colorCar.value;
        car = new CarSerial(id, plate, color, brand);
        if (RegExPlate.test(plate) && color !== '' && brand !== '') {
            carTitle.style.display = "block";
            registerCar.style.display = "none";
            registerWheels.style.display = "block";
            addWheelButton.style.display = "block";
            carDetails.innerHTML = " <p class='col-3'> <strong>PLATE:</strong>  " + car.plate + " </p>"
                + "<p class='col-3'> <strong>COLOR:</strong>  " + car.color + "</p>  <p class='col-3'> <strong>BRAND:</strong>  " + car.brand + "</p>";
            carArray.push(car);
        }
    }
}
function wheels() {
    Mistakes = 0;
    for (var i = 1; i < 4; i++) {
        var wheelBrand = document.getElementById('wheel-brand-' + i);
        var diameterWheel = document.getElementById('wheel-diameter-' + i);
        checkDiameter(diameterWheel);
        checkWheelBrand(wheelBrand);
    }
    if (Mistakes == 0) {
        wheelTitle.style.display = "block";
        for (var j = 1; j < 5; j++) {
            var wheelBrand = document.getElementById('wheel-brand-' + j), diameterWheel = document.getElementById('wheel-diameter-' + j), brandNewWheel = (document.createElement('div'));
            brandNewWheel.classList.add('row', 'justify-content-around');
            brandNewWheel.id = 'brandNewWheel' + [j];
            wheelsCar.appendChild(brandNewWheel);
            brandNewWheel.innerHTML = "<p class='col-3'> <strong>Wheel " + [j] + ":</strong> <p class='col-3'> <strong>Brand:</strong> " +
                wheelBrand.value + "</p> <p class='col-3'> <strong> Diameter: </strong>" + diameterWheel.value + "</p> <br>";
        }
        editButton.style.display = "block";
        addWheelButton.style.display = "none";
        saveCarButton.style.display = "block";
    }
}
function edit() {
    while (wheelsCar.firstChild) {
        wheelsCar.removeChild(wheelsCar.lastChild);
    }
    wheels();
}
function saveCar() {
    for (var i = 1; i < 4; i++) {
        var wheelBrand = document.getElementById('wheel-brand-' + i);
        var diameterWheel = document.getElementById('wheel-diameter-' + i);
        car.addWheel(new Wheel(parseFloat(diameterWheel.value), wheelBrand.value));
    }
    carTitle.style.display = "none";
    registerCar.style.display = "block";
    registerWheels.style.display = "none";
    wheelTitle.style.display = "none";
    editButton.style.display = "none";
    addWheelButton.style.display = "none";
    saveCarButton.style.display = "none";
    keepCar();
}
function clone() {
    var savedCar = document.getElementById('plantilla'), clonedCard = savedCar.cloneNode(true);
    carGarage.appendChild(clonedCard);
    clonedCard.id = 'place' + [c];
    clonedCard.style.display = 'block';
    clonedCard.classList.add('new-card');
    clonedCard.classList.remove("d-none");
    var CarTitle = document.createElement('h6'), close = document.createElement('i');
    close.classList.add('fas', 'fa-times', 'eliminar', 'col-1');
    close.setAttribute('onclick', "borrar(" + [c] + ")");
    CarTitle.textContent = 'Car ' + [c + 1];
    CarTitle.classList.add('col-7');
    clonedCard.firstElementChild.append(CarTitle);
    clonedCard.firstElementChild.append(close);
}
function keepCar() {
    var counter = carGarage.childElementCount;
    while (wheelsCar.firstChild) {
        wheelsCar.removeChild(wheelsCar.lastChild);
    }
    while (carDetails.firstChild) {
        carDetails.removeChild(carDetails.lastChild);
    }
    carGarage.style.display = "block";
    clone();
    var placeInfo = document.getElementById('place' + [c]), detaiiledPlaceInfo = document.createElement('div');
    detaiiledPlaceInfo.innerHTML =
        "<p class='col-5'><strong>Plate :</strong> " + carArray[counter - 2].plate + "</p>" +
            "<p class='col-5'><strong>Color :</strong> " + carArray[counter - 2].color + "</p>" +
            "<p><strong>Wheels :</strong> " + carArray[counter - 2].wheels.length + "</p>";
    detaiiledPlaceInfo.classList.add('row', 'parkingInfo', 'justify-content-between');
    placeInfo.appendChild(detaiiledPlaceInfo);
    scroll();
    c++;
}
function borrar(e) {
    for (var i = 0; i < carArray.length; i++) {
        if (e == carArray[i].id) {
            carArray.splice(i, 1);
        }
    }
    document.getElementById('place' + e).remove();
    if (carGarage.childElementCount == 2) {
        carGarage.style.display = 'none';
    }
    scroll();
}
function scroll() {
    if (carGarage.clientHeight > 480) {
        carGarage.classList.add('scroll');
    }
    else {
        carGarage.classList.remove('scroll');
    }
}
