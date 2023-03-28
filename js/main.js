const apiKey = '3cca6331a0e04fa48ef194710232703'




/* Элементы на странице */
const header = document.querySelector('.header')
const form = document.querySelector('#form');
const input = document.querySelector('#inputcity');



// Слушаем отправку формы

form.onsubmit = function(e) {

    // Отменяем отправку формы 
    e.preventDefault()

    // Берем значение из инпута обрезаем пробелы
    let city = input.value.trim();

    // Делаем запрос на сервер для получения погоды

    // Адрес запроса
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`

    // Выполняем запрос
    fetch(url).then((response) => {
        return response.json()
    }).then((data) => {
        

        // Проверка на ошибку 
        if (data.error) {
            // Если есть ошибка выводим ее
            // Удаляем предыдущую карточку 

            const prevCard = document.querySelector('.card');
            if (prevCard) prevCard.remove();

            // Отобразить карточку с ошибкой 
            const html = `<div class="card">${data.error.message}</div>`


            // Отображаем карточку на странице
            header.insertAdjacentHTML('afterend', html);
        } else {
            // Если ошибки нету выводим карточку
            console.log(data);
            console.log(data.location.name);
            console.log(data.location.country);
            console.log(data.current.temp_c);
            console.log(data.current.condition.text);

            // Отображаем полученные данные в карточку
            // Разметка для карточки
            const html = `<div class="card">

                        <h2 class="card__city">
                            ${data.location.name} <span>${data.location.country}</span>
                        </h2>
                        
                        <div class="card__weather">
                            <div class="card__value">${data.current.temp_c}<sup>°c</sup></div>
                            <img class="card__img" src="images/cloud.png" alt="weather">
                        </div>
                        

                        <div class="card__description">${data.current.condition.text}</div>
                        
                    </div>`
                    header.insertAdjacentHTML('afterend', html);
        }

        
    });

}
