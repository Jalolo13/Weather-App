const inputval = document.querySelector("#cityinput"),
    display = document.querySelector(".display"),
    btn = document.querySelector("#add"),
    city = document.querySelector("#cityoutput"),
    descrip = document.querySelector("#description"),
    temp = document.querySelector("#temp"),
    wind = document.querySelector("#wind"),
    time = document.querySelector("#time"),
    apik = "3045dd712ffe6e702e3245525ac7fa38";

// Переменные даты
const currentYear = new Date().getFullYear();
let intervalId;

// Функция перевода в цельсии
function convertion(val) {
    return (val - 273).toFixed(2);
}

// Функция Даты
function currentTime() {
    let current = new Date();
    time.innerHTML = current.toLocaleTimeString("en-GB");
}

// Обработчик на нажатие лупы
btn.addEventListener("click", () => {
    display.classList.add("active");
    // Fetch
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${inputval.value}&appid=${apik}`
    )
        .then((res) => res.json())
        .then((data) => {
            // Получение данных из массива
            let nameval = data["name"];
            let descrip = data["weather"]["0"]["description"];
            let tempature = data["main"]["temp"];
            let wndspd = data["wind"]["speed"];
            let icon = data["weather"]["0"]["icon"];

            // Заполнение данных массива
            city.innerHTML = `Weather of <span>${nameval}<span>`;

            temp.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="weather-icon" class="icon">Temperature: <span>${convertion(
                tempature
            )} C</span>`;

            description.innerHTML = `Sky Conditions: <span>${descrip}<span>`;

            wind.innerHTML = `Wind Speed: <span>${wndspd} km/h<span>`;
        })
        // Ошибка
        .catch((err) => {
            city.innerHTML = "Something went wrong";
            temp.innerHTML = "";
            description.innerHTML = "";
            wind.innerHTML = "";
        });
});

// Обработчик на Enter
inputval.addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
        display.classList.add("active");
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${inputval.value}&appid=${apik}`
        )
            .then((res) => res.json())
            .then((data) => {
                // Объявление переменных массива
                let nameval = data["name"];
                let descrip = data["weather"]["0"]["description"];
                let tempature = data["main"]["temp"];
                let wndspd = data["wind"]["speed"];

                let icon = data["weather"]["0"]["icon"];

                // Заполнение их
                city.innerHTML = `Weather of <span>${nameval}<span>`;

                temp.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="weather-icon" class="icon">Temperature: <span>${convertion(
                    tempature
                )} C</span>`;

                description.innerHTML = `Sky Conditions: <span>${descrip}<span>`;

                wind.innerHTML = `Wind Speed: <span>${wndspd} km/h<span>`;
            })
            // Ошибка
            .catch((err) => {
                city.innerHTML = "Something went wrong";
                temp.innerHTML = "";
                description.innerHTML = "";
                wind.innerHTML = "";
            });
    }
});
intervalId = setInterval(currentTime, 1000);
