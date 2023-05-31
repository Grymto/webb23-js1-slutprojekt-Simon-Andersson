const apiKey = "ce638be6315b9b9064494a15e4d823f3";
const textInput = document.querySelector("#input");
const searchBtn = document.querySelector("#button");
const displayText = document.querySelector("#text");
const displayError = document.querySelector("#errorText");
const selectHours = document.querySelector("#forecastDropdown");
displayError.style.color = "red";

searchBtn.addEventListener("click", searchCity);

for( let i = 0; i<9; i++){
  var option = document.createElement("option");
  option.value = i;
  option.text = `${i * 3} Hours`;
  selectHours.appendChild(option);
}

forecastDropdown.addEventListener("change", forecast);

function searchCity() {
  const inputText = textInput.value;
  const url = "https://api.openweathermap.org/geo/1.0/direct?q=" +
    inputText + ",,se&limit=1&appid=" +
    apiKey;

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // geoData located
      const url2 = "https://api.openweathermap.org/data/2.5/weather?units=metric&lat=" +
        data[0].lat + "&lon=" +
        data[0].lon +"&appid=" +
        apiKey;

      fetch(url2)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          displayText.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png"> Description: ${data.weather[0].description} Temp: ${data.main.temp}  C Wind: ${data.wind.speed} m/s`;
          document.body.style.backgroundImage = `url(https://openweathermap.org/img/wn/${data.weather[0].icon}.png)`;
          document.body.style.backgroundSize = "50%";
          document.body.style.backgroundRepeat = "no-repeat";
        })
        .catch(function (error) {
          console.log("Error:", error);
          displayError.innerText = `Weather-error: ${error}`;
        });
    })
    .catch(function (error) {
      console.log("Error:", error);
      displayError.innerText = `Geo-error: ${error}`;
    });
}

function forecast() {
  const inputText = textInput.value;
  const optionValue = forecastDropdown.value;
  console.log(optionValue);
  const url ="https://api.openweathermap.org/geo/1.0/direct?q=" +
    inputText + ",,se&limit=1&appid=" +
    apiKey;

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // geoData located
      const url2 = "https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=" +
        data[0].lat + "&lon=" +
        data[0].lon +"&appid=" +
        apiKey;

      fetch(url2)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          displayText.innerHTML = "";
          for( let i = 0; i<optionValue; i++){
            displayText.innerHTML += `<p><img src="https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png">${data.list[i].dt_txt} Temp: ${data.list[i].main.temp} C</p>`;
          }
        })
        .catch(function (error) {
          console.log("Error:", error);
          displayError.innerText = `Weather-error: ${error}`;
        });
    })
    .catch(function (error) {
      console.log("Error:", error);
      displayError.innerText = `Geo-error: ${error}`;
    });
}
