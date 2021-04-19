declare let car: Car, RegExPlate: RegExp, Mistakes: number, c: number, carArray: any;
declare const plateCar: HTMLInputElement, colorCar: HTMLInputElement, brandCar: HTMLInputElement, componentsCar: HTMLElement, wheelBrand1: HTMLInputElement, diameterWheel1: HTMLInputElement, wheelBrand2: HTMLInputElement, diameterWheel2: HTMLInputElement, wheelBrand3: HTMLInputElement, diameterWheel3: HTMLInputElement, wheelBrand4: HTMLInputElement, diameterWheel4: HTMLInputElement, carDetails: HTMLElement, carTitle: HTMLElement, registerCar: HTMLElement, wheelTitle: HTMLElement, registerWheels: HTMLElement, wheelsCar: HTMLElement, editButton: HTMLElement, addWheelButton: HTMLElement, saveCarButton: HTMLElement, carGarage: HTMLElement;
declare class CarSerial extends Car {
    id: number;
    constructor(id: number, plate: string, brand: string, color: string);
}
declare function checkPlate(): void;
declare function checkDiameter(e: any): void;
declare function createCar(id: number, plate: string, brand: string, color: string): void;
declare function wheels(): void;
declare function edit(): void;
declare function saveCar(): void;
declare function clone(): void;
declare function keepCar(): void;
declare function borrar(e: number): void;
