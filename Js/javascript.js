const apiKey = "ce638be6315b9b9064494a15e4d823f3";
const cityInput = document.querySelector("#cityInput");
const displayText = document.querySelector("#displayText");
const displayError = document.querySelector("#errorText");
const selectHours = document.querySelector("#forecastDropdown");
const submitBtn = document.querySelector("#submitBtn");
displayError.style.color = "red";

submitBtn.addEventListener("click", searchCity);

// Genererar val i dropdown
for (let i = 0; i < 9; i++) {
  var option = document.createElement("option");
  option.value = i;
  option.text = `${i * 3} timmar`;
  selectHours.appendChild(option);
}

forecastDropdown.addEventListener("change", forecast);

// Information om det nuvarande vädret för den inmatade staden hämtas och visas. Bakgrundsfärg ändras beroende på temperatur.
function searchCity() {
  displayError.innerText = "";
  const inputText = cityInput.value;
  const url =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    inputText +
    ",,&limit=1&appid=" +
    apiKey;

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const url2 =
        "https://api.openweathermap.org/data/2.5/weather?lang=se&units=metric&lat=" +
        data[0].lat +
        "&lon=" +
        data[0].lon +
        "&appid=" +
        apiKey;

      fetch(url2)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          displayText.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png"><br>${data.weather[0].description}<br>Temperatur: ${data.main.temp} C<br>Vindstyrka: ${data.wind.speed} m/s`;
          let c = "";
          if (data.main.temp > 20) c = "darkred";
          else if (data.main.temp > 15) c = "darkorange";
          else if (data.main.temp > 10) c = "gold";
          else if (data.main.temp > 5) c = "darkgreen";
          else if (data.main.temp > 0) c = "darkcyan";
          else c = "lightblue";

          document.body.style.background = c;
        })
        .catch(function (error) {
          console.log("Error:", error);
          if (error === "TypeError: Failed to fetch")
            displayError.innerText = "Nätverksfel: Kan inte hämta väderinformation";
          else
            displayError.innerText = "Okänt fel: Kunde inte hämta väderinformation";
        });
    })
    .catch(function (error) {
      console.log("Error:", error);
      if (error === "TypeError: Failed to fetch")
        displayError.innerText = "Nätverksfel: Kan inte hämta geo data";
      else
        displayError.innerText = "Platsen kan inte hittas";
    });
}

// Väderprognos för vald stad och antalet timmar hämtas och visas med tre timmars intervall. 
function forecast() {
  displayError.innerText = "";
  const inputText = cityInput.value;
  const optionValue = forecastDropdown.value;
  console.log(optionValue);
  const url =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    inputText +
    ",,&limit=1&appid=" +
    apiKey;

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const url2 =
        "https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=" +
        data[0].lat +
        "&lon=" +
        data[0].lon +
        "&appid=" +
        apiKey;

      fetch(url2)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          displayText.innerHTML = "";
          for (let i = 0; i < optionValue; i++) {
            let dt = new Date(data.list[i].dt_txt);
            let h = dt.getHours();
            displayText.innerHTML += `<p><img src="https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png">${h} : ${data.list[i].main.temp.toFixed(1)} C</p>`;
          }
        })
        .catch(function (error) {
          console.log("Error:", error);
          if (error === "TypeError: Failed to fetch")
            displayError.innerText = "Nätverksfel: Kan inte hämta väderinformation";
          else
            displayError.innerText = "Okänt fel: Kunde inte hämta väderinformation";
        });
    })
    .catch(function (error) {
      console.log("Error:", error);
      if (error === "TypeError: Failed to fetch")
        displayError.innerText = "Nätverksfel: Kan inte hämta geo data";
      else
        displayError.innerText = "Platsen kan inte hittas";
    });
}
