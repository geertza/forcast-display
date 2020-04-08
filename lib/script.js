
let curWeather = "";
forecast= ""
uvIndex=""
city= ""
cityList = []


$(window).ready(start())
function start(){
    retrieveData();

    
    
}


// Execute a function when the user releases enter on the keyboard
let input=document.getElementById("searchText")
input.addEventListener("keyup", function(event) {
     if (event.keyCode === 13) {
    city = document.getElementById("searchText").value;
    curSearch();
    $("#searchText").val("")
    }});
   
    function btn(){
      city = $(this).text()
       curSearch();
       buildQuickSearch()
      };

function retrieveData() {
      var retrievedData = localStorage.getItem("savedweather");
      var retrievedforecast = localStorage.getItem("savedforcast");
      var retrievedUv = localStorage.getItem("saveduv");
      CL= localStorage.getItem("CL")

      if (retrievedData === null){
        
      }else{

      forecast = JSON.parse(retrievedforecast); 
      curWeather = JSON.parse(retrievedData);
      uvIndex = JSON.parse(retrievedUv)
      cityList = JSON.parse(CL)
     
     
      setTimeout(function(){ displayData(); }, 100);
       buildQuickSearch()
      }}




function curSearch(){
    
    var queryURL = `http://api.openweathermap.org/data/2.5/weather?q=`+city+`&units=imperial&APPID=40c9d4a1f11de47af6e8bddf81304bce`;
    $.ajax({url: queryURL, method: 'GET'})
    .done(function(response) {
           curWeather = response;
         buildQuickSearch();
           forecastSearch()
        })}


        function forecastSearch(){
            var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=`+city+`&units=imperial&APPID=40c9d4a1f11de47af6e8bddf81304bce`;
            $.ajax({dataType: "jsonp",url: queryURL, method: 'GET'})
            .done(function(response) {
                   forecast = response;
                  
                
                   uvIndexSearch()
                })}

                function uvIndexSearch(){
                    lat= curWeather.coord.lat
                    lon = curWeather.coord.lon
                    var queryURL = `http://api.openweathermap.org/data/2.5/uvi?appid=40c9d4a1f11de47af6e8bddf81304bce&lat=`+lat+`&lon=`+lon
                    $.ajax({url: queryURL, method: 'GET'})
                    .done(function(response) {
                           uvIndex = response.value;
                   
                           saveSearchLocal() 
                           
                        })}
                         // saves data to localStorage
                    function saveSearchLocal() {
                    localStorage.setItem("savedweather", JSON.stringify(curWeather));
                    localStorage.setItem("savedforcast", JSON.stringify(forecast));
                    localStorage.setItem("saveduv", JSON.stringify(uvIndex));
                    displayData()
                   
                        }
//   display Current weather info 


function   displayData(){
 
    city = curWeather.name
      var today = new Date();
      
           

        
      var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); 
  var yyyy = today.getFullYear();
  today = mm + '/' + dd + '/' + yyyy;   
$("h2").text(city);
$("h3").text (today)

iconId=curWeather.weather[0].icon.slice(0,2);

$(".temp").text(curWeather.main.temp +"°F");
$('#humidity').text( curWeather.main.humidity+"%");
$('#wind').text(curWeather.wind.speed +"M/H");
$("#uv").text(uvIndex )
document.getElementById('today').style.backgroundImage="url(./lib/"+iconId+"d.png)";
createForecast();

}

function createForecast(){
    $(".forecastContainer").remove()
    var br = document.createElement('br')
    let forecastData = forecast.list 
    // forecastData.push(forecast.list[8])
    for (i = 8;i <= 32; i+=8){
        x=forecast.list[i]
        forecastData.push(forecast.list[i])}
    
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
    tempDiv.append(ForeCastTemp+" °F");
    
    
    let humDiv = document.createElement('div')
    humDiv.className = 'hum'   

   humidity = forecast.list[i].main.humidity;
    forecastContainer.append(humDiv)
    humDiv.append("Humidity:"+humidity+ '%');
        
}}

function buildQuickSearch(){
if (cityList === null){
    if (city ===null){
        return}else{
    cityList=city}
}else{ if (city != false){
    cityList.unshift(city)}}
    if (cityList.length > 6){
    cityList.pop()
}
    
;
$(".savedSearch").remove()
for (i=0;i<cityList.length;i++){
    var dynamicButton = document.createElement('BUTTON');
    dynamicButton.className="savedSearch";
    dynamicButton.innerHTML = cityList[i];
    dynamicButton.onclick = btn;
    $("#btn-grid").append(dynamicButton)

} localStorage.setItem("CL", JSON.stringify(cityList)) }


                        