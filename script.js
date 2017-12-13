/* global $ */
const locationApi = 'https://ipinfo.io/json/';
const photoApi = 'https://api.unsplash.com/photos/random';
const regex = /(℃)/;

$(document).ready(function() {
  // get geo coordinates
  $.getJSON(locationApi, function(result){
      let countryCode = result.country.toLowerCase();
      let coordinates = result.loc.split(',');
      const weatherApi = 'https://api.openweathermap.org/data/2.5/weather?lat='+ coordinates[0].toString() +'&lon=' + coordinates[1].toString() + '&appid=60f3ac8fb5707821382a20440c2e42d1';

      // get weather
      $.getJSON(weatherApi, function(result){
          renderWeather(result);
      });
  });

  // render weather info
  function renderWeather(data) {
    const sunrise = new Date(data.sys.sunrise*1000);
    const sunset = new Date(data.sys.sunset*1000);
    const now = new Date();
    let timeOfDay = "Night";
    
    if (now > sunrise && now < sunset) {
      timeOfDay = "Day"
    } 
    
    const tempC = Math.round(data.main.temp - 273.15);
    const tempF = (tempC*1.8+32);
    const photoApiParam = {
            client_id: '476956470426f88af2c52f4cd382307ad3ba28bb1a87df02b260b045ffcf14fd',
            query: data.weather[0].main + " " + timeOfDay,
            w: $(window).width()
          };
        
    $(".temp1").html(tempC + "℃");
    $(".slash").html(" / ");
    $(".temp2").html(tempF + "℉");
    
    $(".temp2").on("click", function() {
      if (regex.test($(".temp1").text())) {
        $(".temp1").html(tempF + "℉");
        $(".temp2").html(tempC + "℃");
      } else {
        $(".temp1").html(tempC + "℃");
        $(".temp2").html(tempF + "℉");
      }
    });
    
    $(".city").html(data.name + ", " + data.sys.country);
    
    $(".description").html(data.weather[0].description);
    
    // get background photo from Unsplash
    $.getJSON(photoApi, photoApiParam, function(result, status) {
        console.log('photo api', status);
        const creditLink = "<a href="+result.user.links.html+" target='_blank'>"+result.user.name+"</a>";
        const creditText = "Photo by "+creditLink+" @ Unsplash";
        $(".credit-photo").html(creditText);
        setBackground(result);
    });
    
  }
  
  // render background photo
  function setBackground(data) {
    const imageUrl = data.urls.custom;
    $("body").css("background-image", "url(" + imageUrl + ")");
  }
});
