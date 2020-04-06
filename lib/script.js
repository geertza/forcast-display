const APIKey = "40c9d4a1f11de47af6e8bddf81304bce"
let curWeather = "";
forecast= ""
uvIndex=""
city= "bozeman"
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
      setTimeout(function(){ displayData(); }, 500);
      }

$("#submit").click(submit)
function submit(){
    curSearch();
    }

function curSearch(){
    city = document.getElementById("searchText").value;
    var queryURL = `http://api.openweathermap.org/data/2.5/weather?q=`+city+`&units=imperial&APPID=40c9d4a1f11de47af6e8bddf81304bce`;
    $.ajax({url: queryURL, method: 'GET'})
    .done(function(response) {
           curWeather = response;
          
            console.log(curWeather)
           forecastSearch()
        })}


        function forecastSearch(){
            city = document.getElementById("searchText").value;
            var queryURL = `http://api.openweathermap.org/data/2.5/forecast?q=`+city+`&units=imperial&APPID=40c9d4a1f11de47af6e8bddf81304bce`;
            $.ajax({url: queryURL, method: 'GET'})
            .done(function(response) {
                   forecast = response;
                  
                    console.log(forecast)
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
                          saveSearchLocal()
                            console.log(uvIndex)
                           
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
let cityInfo = $("#currentWeather")
    city = curWeather.name
      var today = new Date();
      var currentWeather = $('#currentWeather')
       icon = $("img")
         icon.src='http://openweathermap.org/img/wn/10d@2x.png';      
//   curWeather.weather[0].icon
        
      var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = mm + '/' + dd + '/' + yyyy;

function   displayData(){
$("h2").append(city+"   "+today+"<br><br>");
cityInfo.append('Temperature'+"  "+"  "+curWeather.main.temp + F+"<br>");
cityInfo.append('Humidity'+"  "+ "  "+ curWeather.main.humidity+"<br>");
cityInfo.append('Wind Speed'+" "+" "+ curWeather.wind.speed +"M/H"+"<br>");
cityInfo.append("U.V. Index" + "   "+"  "+uvIndex.value)
createForecast()
}

function createForecast(){
    var br = document.createElement('br')
    let forecastData = forecast.list.splice(0,4);
    for (i = 3;i <= forecastData.length; i++){
    
        forecastContainer = document.createElement('div');
        forecastContainer.className = "forecastContainer"
        $(".flex-container").append(forecastContainer)

     let rawDate = forecast.list[i].dt_txt;
    var dateDiv= document.createElement('div');
    dateDiv.className = 'date';
    forecastContainer.append(dateDiv);
    dateDiv.append(rawDate.slice(8,10)+"/"+rawDate.slice(5,7)+'/'+ rawDate.slice(0,4))

  
    let tempDiv = document.createElement('div')
    tempDiv.className = 'temp'   
    forecastContainer.append(tempDiv);
   ForeCastTemp = forecast.list[i].main.temp;
    tempDiv.append("Temp="+ForeCastTemp+" F");
    
    
    let humDiv = document.createElement('div')
    humDiv.className = 'hum'   

   humidity = forecast.list[i].main.humidity;
    forecastContainer.append(humDiv)
    humDiv.append("Humidity:"+humidity+ '%');
        
}}


                        