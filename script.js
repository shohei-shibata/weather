/* global $ */
const locationApi = 'https://ipinfo.io/json/';
const photoApi = 'https://api.unsplash.com/photos/random';
const regex1 = /(℃)/;
const regex2 = /(Arrow)/;

$(document).ready(function() {
  // get geo coordinates
  $.getJSON(locationApi, function(result){
      const countryCode = result.country.toLowerCase();
      const coordinates = result.loc.split(',');
      const apiQuery = 'lat=' + coordinates[0].toString() 
                      +'&lon=' + coordinates[1].toString()
                      + '&appid=60f3ac8fb5707821382a20440c2e42d1'
      
      const weatherNowApi = 'https://api.openweathermap.org/data/2.5/weather?' + apiQuery;
      const weatherHourlyApi = 'https://api.openweathermap.org/data/2.5/forecast?' + apiQuery;

      // get current weather
      $.getJSON(weatherNowApi, function(result){
          weatherNow(result);
      });
      // get forecast
      $.getJSON(weatherHourlyApi, function(result){
          weatherHourly(result);
      });
  });
  
  $("body").keydown(function(e) {
    // run function only if an arrow key is pressed
    if (regex2.test(e.key)) { handleKeydown(e.key); }
  });
});

// render weather info
function weatherNow(data) {
  const sunrise = new Date(data.sys.sunrise*1000);
  const sunset = new Date(data.sys.sunset*1000);
  const now = new Date();
  let timeOfDay = 'Night';
  if (now > sunrise && now < sunset) { timeOfDay = 'Day'; } 
  
  let query = '';
  
  switch (data.weather[0].main) {
    case 'Clear':
      query = timeOfDay + " clear sky";
      break;
    case 'Clouds':
    case 'Atmosphere':
    case 'Extreme':
    case 'Additional':
      query = data.weather[0].description;
      break;
    default:
      query = data.weather[0].main;
  }
  
  console.log(query);
  
  const tempC = Math.round(data.main.temp - 273.15);
  const tempF = Math.round(tempC*1.8+32);
  const photoApiParam = {
          client_id: '476956470426f88af2c52f4cd382307ad3ba28bb1a87df02b260b045ffcf14fd',
          query: query,
          w: $(window).width()
        };
      
  $(".temp1").html(tempC + "℃");
  $(".slash").html(" / ");
  $(".temp2").html(tempF + "℉");
  
  $(".temp2").on("click", function() {
    if (regex1.test($(".temp1").text())) {
      $(".temp1").html(tempF + "℉");
      $(".temp2").html(tempC + "℃");
    } else {
      $(".temp1").html(tempC + "℃");
      $(".temp2").html(tempF + "℉");
    }
  });
  
  $(".city").html(data.name + ", " + data.sys.country);
  
  $(".description").html(data.weather[0].description);
  
/*    // get background photo from Unsplash
  $.getJSON(photoApi, photoApiParam, function(result, status) {
      console.log('photo api', status);
      const creditLink = "<a href="+result.user.links.html+" target='_blank'>"+result.user.name+"</a>";
      const creditText = "Photo by "+creditLink+" @ Unsplash";
      $(".credit-photo").html(creditText);
      setBackground(result);
  });
*/    
}

function weatherHourly(data) {
  data.list.splice(5, 100);
  
  data.list.forEach(function(item) {
    console.log(item);
    let time = new Date(item.dt*1000);
    let weather = item.weather[0].main;
    let content = "<div class='table-col'><p>"
        + time.getHours() + ":00</p><p>" + weather + "</p></div>";
    $(".table-wrapper").append(content);
  });
}

// render background photo
function setBackground(data) {
  const imageUrl = data.urls.custom;
  $("body").css("background-image", "url(" + imageUrl + ")");
}

// handle arrow key press
function handleKeydown(key) {
  switch(key) {
    case "ArrowLeft":
      if ($("#now").hasClass("right")) {
        $("#now").removeClass("right").addClass("center");
      } else if ($("#now").hasClass("center")) {
        $("#now").removeClass("center").addClass("left");
        $("#hourly").removeClass("right").addClass("center");
      } 
      break;
    case "ArrowRight":
      if ($("#now").hasClass("left")) {
        $("#now").removeClass("left").addClass("center");
        $("#hourly").removeClass("center").addClass("right");
      } else if ($("#now").hasClass("center")) {
        //nothing for now, because there is only two pages
      }
      
      break;
    default:
  }
}
