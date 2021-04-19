let car:Car,
    RegExPlate:RegExp =/([0-9]{4})([a-z]{3})/i,
    Mistakes:number = 0,
    c:number=0,
    carArray:any =[];
const   plateCar= <HTMLInputElement>document.getElementById('plate'),
        colorCar= <HTMLInputElement>document.getElementById('color'),
        brandCar= <HTMLInputElement>document.getElementById('brand'),
        componentsCar = <HTMLElement>document.getElementById('components'),
        wheelBrand1 = <HTMLInputElement>document.getElementById('wheel-brand-1'),
        diameterWheel1 = <HTMLInputElement>document.getElementById('wheel-diameter-1'),
        wheelBrand2 = <HTMLInputElement>document.getElementById('wheel-brand-2'),
        diameterWheel2 = <HTMLInputElement>document.getElementById('wheel-diameter-2'),
        wheelBrand3 = <HTMLInputElement>document.getElementById('wheel-brand-3'),
        diameterWheel3 = <HTMLInputElement>document.getElementById('wheel-diameter-3'),
        wheelBrand4 = <HTMLInputElement>document.getElementById('wheel-brand-4'),
        diameterWheel4 = <HTMLInputElement>document.getElementById('wheel-diameter-4'),
        carDetails= <HTMLElement>document.getElementById("car-details"),
        carTitle= <HTMLElement>document.getElementById("titolCar"),
        registerCar=<HTMLElement>document.getElementById('registerCar'),
        wheelTitle=<HTMLElement>document.getElementById("titolWheel"),
        registerWheels =<HTMLElement>document.getElementById('registerWheels'),
        wheelsCar = <HTMLElement>document.getElementById('wheelsCar'),
        editButton=<HTMLElement>document.getElementById("edit-button"),
        addWheelButton=<HTMLElement>document.getElementById("add-wheels-button"),
        saveCarButton=<HTMLElement>document.getElementById("save-car-button"),
        carGarage=<HTMLElement>document.getElementById('carGarage');   
class CarSerial extends Car{ //extenem i li posem una id
    id:number
    constructor(id:number,plate:string,brand:string,color:string){
        super(plate,brand,color);
        this.id=id;
    }
}
function checkPlate(){ // matricula correcte? onblur en input
    if(RegExPlate.test(plateCar.value)){
        if(plateCar.value.length==7){
        plateCar.classList.remove('is-invalid')
        }
        else{
            plateCar.classList.add('is-invalid')
            Mistakes ++
        }
    }
    else{
        plateCar.classList.add('is-invalid')
        Mistakes ++
    }
}
function checkColor(){
    if(colorCar.value ==''){
        colorCar.classList.add('is-invalid')
        Mistakes ++
    }
    else{
        colorCar.classList.remove('is-invalid')
    }
}
function checkBrand(){
    if(brandCar.value ==''){
        brandCar.classList.add('is-invalid')
        Mistakes ++
    }
    else{
        brandCar.classList.remove('is-invalid')
    }
}
function checkWheelBrand(e:any){
    if(e.value ===''){
       e.classList.add('is-invalid')
    }
    else{
        e.classList.remove('is-invalid')
    }
}
function checkDiameter(e:any){  //diametre correcte? onblur en input
    if(e.value < 0.4 || e.value >2){
        e.classList.add('is-invalid')
        Mistakes ++
    }
    else {
        e.classList.remove('is-invalid')
    }
}
function createCar(id:number,plate:string,brand:string,color:string){
    Mistakes=0
    checkPlate()
    checkColor()
    checkBrand()
    if(Mistakes==0){
        id=c;
        plate = plateCar.value;
        brand = brandCar.value;
        color = colorCar.value;
        car= new CarSerial(id,plate,color, brand);
        if(RegExPlate.test(plate) && color !== '' && brand !== ''){
            carTitle.style.display="block"
            registerCar.style.display="none"
            registerWheels.style.display="block"
            addWheelButton.style.display="block"
            carDetails.innerHTML=" <p class='col-3'> <strong>PLATE:</strong>  " + car.plate + " </p>"
            + "<p class='col-3'> <strong>COLOR:</strong>  " +car.color + "</p>  <p class='col-3'> <strong>BRAND:</strong>  " + car.brand +"</p>";
            carArray.push(car);    
        }
    }
}
function wheels(){ // totes les rodes són correctes? validem abans de fer push
    let WheelsBrands=[wheelBrand1.value,wheelBrand2.value,wheelBrand3.value,wheelBrand4.value,],
        WheelsDiameters =[parseFloat(diameterWheel1.value),parseFloat(diameterWheel2.value),parseFloat(diameterWheel3.value),parseFloat(diameterWheel4.value),]
Mistakes = 0;
    checkDiameter(diameterWheel1);
    checkDiameter(diameterWheel2);
    checkDiameter(diameterWheel3);
    checkDiameter(diameterWheel4);
    checkWheelBrand(wheelBrand1);
    checkWheelBrand(wheelBrand2);
    checkWheelBrand(wheelBrand3);
    checkWheelBrand(wheelBrand4);
    if(Mistakes == 0){
        wheelTitle.style.display="block"
        for(let j=0;j<4;j++){
            let brandNewWheel= (document.createElement('div'));
            brandNewWheel.classList.add('row','justify-content-around');
            brandNewWheel.id='brandNewWheel'+[j];
            wheelsCar.appendChild(brandNewWheel);
            brandNewWheel.innerHTML="<p class='col-3'> <strong>Wheel "+ [j+1] +":</strong> <p class='col-3'> <strong>Brand:</strong> " + 
            WheelsBrands[j] + "</p> <p class='col-3'> <strong> Diameter: </strong>"  + WheelsDiameters[j] + "</p> <br>"
        }
        editButton.style.display="block"
        addWheelButton.style.display="none"
        saveCarButton.style.display="block"
    }
}
function edit(){ //editem les rodes abans de fer push
    while(wheelsCar.firstChild){wheelsCar.removeChild(wheelsCar.lastChild)}
    wheels()
}
function saveCar(){ // push a les rodes i el guardem
    car.addWheel(new Wheel(parseFloat(diameterWheel1.value),wheelBrand1.value));
    car.addWheel(new Wheel(parseFloat(diameterWheel2.value),wheelBrand2.value));
    car.addWheel(new Wheel(parseFloat(diameterWheel3.value),wheelBrand3.value));
    car.addWheel(new Wheel(parseFloat(diameterWheel4.value),wheelBrand4.value));
    carTitle.style.display="none"
    registerCar.style.display="block"
    registerWheels.style.display="none"
    wheelTitle.style.display="none"
    editButton.style.display="none"
    addWheelButton.style.display="none"
    saveCarButton.style.display="none"
    keepCar();
}
function clone(){ // colnem la base del div, afegim titol i creu de sortida
    let savedCar= <HTMLElement>document.getElementById('plantilla'),
        clonedCard =<HTMLElement>savedCar.cloneNode(true);
    carGarage.appendChild(clonedCard);
    clonedCard.id='place'+[c];
    clonedCard.style.display='block'
    clonedCard.classList.add('new-card')
    clonedCard.classList.remove("d-none")
    let CarTitle = document.createElement('h6'),
        close= document.createElement('i');
    close.classList.add('fas', 'fa-times', 'eliminar', 'col-1')
    close.setAttribute('onclick',"borrar("+[c]+")")
    CarTitle.textContent='Car '+[c+1];
    CarTitle.classList.add('col-7');
    clonedCard.firstElementChild.append(CarTitle);  
    clonedCard.firstElementChild.append(close);
}
function keepCar(){ //guardem el cotxe i ensenyem la info bàsica al usuari
    let counter:number=carGarage.childElementCount;
    while(wheelsCar.firstChild){wheelsCar.removeChild(wheelsCar.lastChild)}
    while(carDetails.firstChild){carDetails.removeChild(carDetails.lastChild)}
    carGarage.style.display="block";
    clone();
    let placeInfo =<HTMLElement>document.getElementById('place'+[c]),
    detaiiledPlaceInfo:Element = document.createElement('div');
    detaiiledPlaceInfo.innerHTML=
        "<p class='col-5'><strong>Plate :</strong> " + carArray[counter-2].plate+"</p>"+
        "<p class='col-5'><strong>Color :</strong> " + carArray[counter-2].color+"</p>"+
        "<p><strong>Wheels :</strong> " + carArray[counter-2].wheels.length+"</p>";
    detaiiledPlaceInfo.classList.add('row','parkingInfo', 'justify-content-between');
    placeInfo.appendChild(detaiiledPlaceInfo);
    scroll()
    c++
}
function borrar(e:number){ //borrem la fitxa i les dades del cotxe sel·leccionat 
    for(let i=0;i<carArray.length;i++){
        if(e== carArray[i].id){
            carArray.splice(i,1)
        }
    }
    document.getElementById('place'+e).remove();
    if(carGarage.childElementCount == 2){
        carGarage.style.display='none'
    }
    scroll()
}
function scroll(){  //contingut scrollable si s'acumulen moltes fitxes
    if(carGarage.clientHeight>480){
        carGarage.classList.add('scroll')
    }
    else{
        carGarage.classList.remove('scroll')
    }
}