declare class Car {
    plate: string;
    brand: string;
    color: string;
    wheels: Wheel[];
    constructor(plate: string, color: string, brand: string);
    addWheel(wheel: Wheel): void;
}
