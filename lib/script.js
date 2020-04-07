
let curWeather = "";
forecast= ""
uvIndex=""
city= ""
F = "&#x2109;"
$(window).ready(start())
function start(){
    retrieveData();
    
    
}
    function retrieveData() {
      var retrievedData = localStorage.getItem("savedweather");
      var retrievedforecast = localStorage.getItem("savedforcast");
      var retrievedUv = localStorage.getItem("saveduv");
      forecast = JSON.parse(retrievedforecast); 
      curWeather = JSON.parse(retrievedData);
      uvIndex = JSON.parse(retrievedUv)
     
      console.log(curWeather); console.log(forecast);console.log(uvIndex);
      setTimeout(function(){ displayData(); }, 100);
      }

$("#submit").click(submit)
function submit(){
    // reset();
    curSearch()
    }


function curSearch(){
    city = document.getElementById("searchText").value;
    var queryURL = `http://api.openweathermap.org/data/2.5/weather?q=`+city+`&units=imperial&APPID=40c9d4a1f11de47af6e8bddf81304bce`;
    $.ajax({url: queryURL, method: 'GET'})
    .done(function(response) {
           curWeather = response;
          console.log('search')
          console.log(curWeather)
           forecastSearch()
        })}


        function forecastSearch(){
            city = document.getElementById("searchText").value;
            var queryURL = `http://api.openweathermap.org/data/2.5/forecast?q=`+city+`&units=imperial&APPID=40c9d4a1f11de47af6e8bddf81304bce`;
            $.ajax({url: queryURL, method: 'GET'})
            .done(function(response) {
                   forecast = response;
                  
                
                   uvIndexSearch()
                })}

                function uvIndexSearch(){
                    city = document.getElementById("searchText").value;
                    lat= curWeather.coord.lat
                    lon = curWeather.coord.lon
                    var queryURL = `http://api.openweathermap.org/data/2.5/uvi?appid=40c9d4a1f11de47af6e8bddf81304bce&lat=`+lat+`&lon=`+lon
                    $.ajax({url: queryURL, method: 'GET'})
                    .done(function(response) {
                           uvIndex = response;
                        //   saveSearchLocal()
                           saveSearchLocal() 
                           
                        })}
                         // saves data to localStorage
                    function saveSearchLocal() {
                    localStorage.setItem("savedweather", JSON.stringify(curWeather));
                    localStorage.setItem("savedforcast", JSON.stringify(forecast));
                    localStorage.setItem("saveduv", JSON.stringify(uvIndex.value));
                    retrieveData()
                    console.log("saved")
                         }
//   display Current weather info 


function   displayData(){
 let cityInfo = $(".currentWeather")
    city = curWeather.name
      var today = new Date();
      
        console.log ('here');console.log(cityInfo)   

        
      var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); 
  var yyyy = today.getFullYear();
  today = mm + '/' + dd + '/' + yyyy;   
$("h2").append(city);
$("h3").append (today)

iconId=curWeather.weather[0].icon.slice(0,2);
curIcon = "url('./lib/"+iconId+"d.png')"
$(".temp").append(curWeather.main.temp + F);
$('#humidity').append( curWeather.main.humidity+"%");
$('#wind').append(curWeather.wind.speed +"M/H");
$("#uv").append(uvIndex.value)
document.getElementById('today').style.backgroundImage="url(./lib/"+iconId+"d.png)";
createForecast();

}

function createForecast(){
    var br = document.createElement('br')
    let forecastData = forecast.list 
    // forecastData.push(forecast.list[8])
    for (i = 8;i <= 32; i+=8){
        x=forecast.list[i]
        forecastData.push(forecast.list[i])}
    console.log(forecastData)
    for (i = 0;i <= 32; i+=8){
    
        forecastContainer = document.createElement('div');
        forecastContainer.className = "forecastContainer"
        $(".flex-container").append(forecastContainer)

     let rawDate = forecast.list[i].dt_txt;
    var dateDiv= document.createElement('div');
    dateDiv.className = 'date';
    forecastContainer.append(dateDiv);
    dateDiv.append(rawDate.slice(5,7)+"/"+rawDate.slice(8,10)+'/'+ rawDate.slice(0,4))
   
    
     iconId = forecast.list[i].weather[0].icon
    icon ="http://openweathermap.org/img/wn/"+iconId+"@2x.png"
    forecastContainer.style.backgroundImage = "url("+icon+")"  
    
    
    let tempDiv = document.createElement('div')
    tempDiv.className = 'forecastTemp'   
    forecastContainer.append(tempDiv);
   ForeCastTemp = forecast.list[i].main.temp;
    tempDiv.append(ForeCastTemp+" F");
    
    
    let humDiv = document.createElement('div')
    humDiv.className = 'hum'   

   humidity = forecast.list[i].main.humidity;
    forecastContainer.append(humDiv)
    humDiv.append("Humidity:"+humidity+ '%');
        
}}


                        