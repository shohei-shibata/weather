$(document).ready(function() {
  //get location
  const locationAPI = 'https://ipinfo.io/json/';
  let isCelcius = true;
  let tempC, tempF;

  //get API data then run render function
  $.ajax({
    url: locationAPI,
    type: 'GET',
    async: false,
    dataType: 'json',
    success: function(result){
      let countryCode = result.country.toLowerCase();
      let coordinates = result.loc.split(',');
      const weatherAPI = 'http://api.openweathermap.org/data/2.5/weather?lat='+ coordinates[0].toString() +'&lon=' + coordinates[1].toString() + '&appid=60f3ac8fb5707821382a20440c2e42d1';

      //get weather
      $.ajax({
        url: weatherAPI,
        type: 'GET',
        async: true,
        dataType: 'json',
        success: function(result){
          render(result);
        }
      });
    }
  });

  //render everything
  function render(data) {
    let city = JSON.stringify(data.name).replace(/\"/gi, "");
    $("#city").html(city);

    let weather = JSON.stringify(data.weather[0].description).replace(/\"/gi, "");
    $("#weather").html(weather);

    let countryCode = data.sys.country.toLowerCase();
    $("#flag").html('<img src="http://flags.fmcdn.net/data/flags/w580/' + countryCode + '.png" alt="Flag" height="42" width=auto>');

    tempC = Math.round(data.main.temp - 273.15);
    tempF = tempC*1.8+32;
    $("#temp").html(tempC.toString() + '°C');

    let icon = JSON.stringify(data.weather[0].icon).replace(/\"/gi, "");
    let iconImg = '<img src="http://openweathermap.org/img/w/' + icon + '.png" alt="Weather Icon" width="60" height=auto>';
    $("#icon").html(iconImg);
  }

  //toggle temperature unit
  $("#toggle").on("click", function(){
    if (isCelcius) {
      $("#switch").html('Switch to Celcius');
      $("#temp").html(tempF.toString() + '°F');
    } else {
      $("#switch").html('Switch to Fahrenheit');
      $("#temp").html(tempC.toString() + '°C');
    }
    isCelcius = !isCelcius;
  });

});
