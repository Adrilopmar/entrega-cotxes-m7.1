let car:Car,
    RegExPlate:RegExp =/([0-9]{4})([a-z]{3})/i,
    Mistakes:number = 0,
    c:number=0,
    carArray:any =[];
const   plateCar= <HTMLInputElement>document.getElementById('plate'),
        colorCar= <HTMLInputElement>document.getElementById('color'),
        brandCar= <HTMLInputElement>document.getElementById('brand'),
        componentsCar = <HTMLElement>document.getElementById('components'),
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
    Mistakes = 0;
for(let i=1;i<4;i++){
    let wheelBrand =<HTMLInputElement>document.getElementById('wheel-brand-'+i);
    let diameterWheel =<HTMLInputElement>document.getElementById('wheel-diameter-'+i);
    checkDiameter(diameterWheel);
    checkWheelBrand(wheelBrand);
}
    if(Mistakes == 0){
        wheelTitle.style.display="block"
        for(let j=1;j<5;j++){
            let wheelBrand =<HTMLInputElement>document.getElementById('wheel-brand-'+j),
                diameterWheel =<HTMLInputElement>document.getElementById('wheel-diameter-'+j),
                brandNewWheel= (document.createElement('div'));
            brandNewWheel.classList.add('row','justify-content-around');
            brandNewWheel.id='brandNewWheel'+[j];
            wheelsCar.appendChild(brandNewWheel);
            brandNewWheel.innerHTML="<p class='col-3'> <strong>Wheel "+ [j] +":</strong> <p class='col-3'> <strong>Brand:</strong> " + 
            wheelBrand.value + "</p> <p class='col-3'> <strong> Diameter: </strong>"  + diameterWheel.value + "</p> <br>"
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
    for(let i=1;i<4;i++){
        let wheelBrand =<HTMLInputElement>document.getElementById('wheel-brand-'+i);
        let diameterWheel =<HTMLInputElement>document.getElementById('wheel-diameter-'+i);
    car.addWheel(new Wheel(parseFloat(diameterWheel.value),wheelBrand.value));
    } 
    
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