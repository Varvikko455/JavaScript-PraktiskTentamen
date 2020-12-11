


const api = 'https://restcountries.eu/rest/v2/all/'

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
    let time = [];
    let flag = [];   
        for(let i = 0; i<3;i++){
            let random = Math.floor(Math.random()* data.length);
            

            countries.push(
                new CountryName(data[random].name)
            )
            time.push(
                new CountryTime(data[random].timezones[0])
            )
            flag.push(
                new CountryFlags(data[random].flag)
            )
            
        }
        console.log(countries)
        
        
        for(countryNames of countries){
            countryNames.countryName();
        }
            
        for(countryTime of time){
            countryTime.countryTime();
        }

        for(countryFlag of flag){
            countryFlag.countryFlag();
        }
            
    }
    
    
function CountryName(name){
    this.name = name;
}
function CountryTime(time){
    this.time = time
}
function CountryFlags(flag){
    this.flag = flag
}
    
    CountryName.prototype.countryName = function(){
        let h1 = document.querySelectorAll('h1');
        for(let i = 0; i<3;i++){
            h1[i].innerText = this.name
        }
        
    }
    
    
    CountryTime.prototype.countryTime = function(){
        let h3 = document.querySelectorAll('h3');
        
        for(let i = 0; i<3;i++){ 
            h3[i].innerText = this.time
        }
        
        
    } 
    CountryFlags.prototype.countryFlag = function(){
        let img = document.querySelectorAll('img')
        for(let i = 0; i<3;i++){
            img[i].src = this.flag
        }
    }
    
    