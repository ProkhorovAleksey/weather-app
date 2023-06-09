import conditions from "../conditions.js"; 

console.log(conditions);

const apiKey = '3cca6331a0e04fa48ef194710232703'

/* Элементы на странице */
const header = document.querySelector('.header')
const form = document.querySelector('#form');
const input = document.querySelector('#inputcity');

function removeCard() {
    const prevCard = document.querySelector('.card');
    if (prevCard) prevCard.remove();
}

function showError(errorMessage) {
    const html = `<div class="card">${errorMessage}</div>`
    header.insertAdjacentHTML('afterend', html);
}
function showCard ({ name, country, temp, condition, imgPath }) {
    const html = `<div class="card">

                <h2 class="card__city">
                    ${name} <span>${country}</span>
                </h2>
                
                <div class="card__weather">
                    <div class="card__value">${temp}<sup>°c</sup></div>
                    <img class="card__img" src="${imgPath}" alt="weather">
                </div>
                

                <div class="card__description">${condition}</div>
                
            </div>`
            header.insertAdjacentHTML('afterend', html);

}

// Слушаем отправку формы


async function getWeather (city) {
    // Адрес запроса
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
    
}


form.onsubmit = async function(e) {

    // Отменяем отправку формы 
    e.preventDefault()

    // Берем значение из инпута обрезаем пробелы
    let city = input.value.trim();

    // Делаем запрос на сервер для получения погоды

    // Получаем данные с сервера
    const data = await getWeather(city);


    if (data.error) {
        // Если есть ошибка выводим ее
        removeCard();
        showError(data.error.message);
    } else {
        // Если ошибки нету выводим карточку
        removeCard();

        console.log(data.current.condition.code);

        const info = conditions.find((obj) => obj.code === data.current.condition.code)
        console.log(info);
        console.log(info.languages[23]['day_text']);

        const filePath = './images/' + (data.current.is_day ? 'day' : 'night') + '/';
        const fileName = (data.current.is_day ? info.day : info.night) + '.png';
        const imgPath = filePath + fileName;
        console.log('filePath', filePath + fileName);


        const weatherData = {

            name: data.location.name,
            country: data.location.country,
            temp: data.current.temp_c,
            condition: data.current.is_day
                ? info.languages[23]['day_text']
                : info.languages[23]['night_text'],
            imgPath, 
        };
        showCard(weatherData);
    } 

}
