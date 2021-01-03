/* Html element selectors */
let h1 = document.querySelectorAll('h1');
let img = document.querySelectorAll('img')
let h3 = document.querySelectorAll('h3');
/* Api:et */
const api = 'https://restcountries.eu/rest/v2/all/';
/* Fetch för Api:et */
fetch(api).then(
    function(r){
        if(r.status === 404){
            throw 'Not found';
        }
        else{
            return r.json();
        }
    }
).then(
    function(data){
        showCountries(data);
    }
).catch(
    function(error){
        if(error === 'Not found'){
            console.log(error)
        }
    }
)



    function showCountries(data){
        let countries = [];
            /* For loop som loopar igenom 3 gånger, varje gång genereras ett random nummer som sedan används för att komma åt ett random land i datan från apiet. Använder Country mallen för att fylla i informationen i de olika parametrarna och pushar sedan in objektet i countries arrayn */
            for(let i = 0; i<3;i++){
                let random = Math.floor(Math.random()* data.length);
                countries.push(
                    new Country(data[random].name, data[random].timezones[0], data[random].flag)
                )
            }
            /* For loop som loopar igenom objekten i countries arrayn och lägger sedan till informationen i html dokumentet för att presentera för användaren*/
            for(let i=0; countries.length; i++){
                h1[i].innerText = countries[i].name
                img[i].src = countries[i].flag
                h3[i].innerText = countries[i].countryTime();
            }
        }
        
        /* Constructor funktion för landet med 3 olika egenskaper och parametrar */
        function Country(name, timezone, flag){
            this.name = name;
            this.timezone = timezone;
            this.flag = flag;
        }
        /* Funktion för att lägga till en nolla framför om det behövs, dvs om numret är mindre än 10 */
        function addZero(i) { 
            if (i < 10) {
              i = "0" + i;
            }
            return i;
          }

            Country.prototype.countryTime = function(){
                let date = new Date(); //Variabel date som skapar nyvarande datum och tid.
                
                let h = date.getUTCHours() //Hämtar UTC timmarna från date
                let m = addZero(date.getUTCMinutes()); //Hämtar UTC minuterna från date och använder funktionen addZero för att lägga till en nolla om det behövs.

                let UTCHours = Number((this.timezone).substr(3, 3)); //Plockar ut +/- tecknet från UTC-landet och numret som är kokpplat till landet, görs även om till nummer så vi kan använda det returnerade värdet i en kalkylation.
                
                let calcHours = Number(h) + UTCHours; //Kalkylation som beräknar vad klockan är i landet.
                console.log(UTCHours)
                console.log(calcHours)
                
                    if(calcHours < 0){ //Kalkylation som beräknar klockan i landet om calcHours skulle returnera ett nummer som är mindre än 0.
                        calcHours =  24 + (h + UTCHours);
                    }
                    else if(calcHours >= 24){ //Kalkylation som beräknar klockan i landet om calcHours skulle returnera ett nummer som är större eller lika med 24.
                        calcHours =  (h + UTCHours) - 24 ;
                    }

                let time = `${addZero(calcHours)}:${m}` //Temperal literal för att skriva ut den kalkylerade timmen samt lägger till en nolla framför om det behövs och minuterna
                return time;
                
            } 
    
    
    