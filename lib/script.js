const APIKey = "40c9d4a1f11de47af6e8bddf81304bce"
let curWeather = "";
forecast= ""
uvIndex=""

$(window).ready(start())
function start(){
    retrieveData();
    console.log("start");
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
                    localStorage.setItem("saveduv", JSON.stringify(uvIndex));
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
cityInfo.append('Temperature'+"  "+"  "+curWeather.main.temp + "&#x2109;"+"<br><br>");
cityInfo.append('Humidity'+"  "+ "  "+ curWeather.main.humidity+"<br><br>");
cityInfo.append('Wind Speed'+" "+" "+ curWeather.wind.speed +"M/H"+"<br>");
cityInfo.append("U.V. Index" + "   "+"  "+uvIndex.value)

}


                        