//// api from --> openweather api
const api_key = '2d529a5687ae8aa06132f0a0409bf666'

////Use either .then.catch or async-away
////Method --> async-away
// getData1()
async function getData1() {
    let city = document.querySelector('#city').value
    // let city = `pune`

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`
    console.log(url)

    let result1 = await fetch(url)
    // console.log(result1)

    let result2 = await result1.json()
    // console.log(result2)
    append1(result2)
}


function append1(obj) {
    // Appending the data
    let leftContainer = document.querySelector('#leftContainer')
    leftContainer.innerHTML = null

    let d1 = document.createElement('div')
    d1.innerHTML = ` <div>
                        <div class="line">
                            <h1 >Name: ${obj.name}</h1>
                        </div>
                    </div>`

    let d2 = document.createElement('div')
    d2.innerHTML = ` <div>
                        <div class="line">
                        <span class="icon font">
                            <i class="fa-solid fa-temperature-half"></i>
                        </span>
                        <p class="font">Main Temp: ${obj.main.temp}</p>
                        </div>
                    </div>`

    let d3 = document.createElement('div')
    d3.innerHTML = ` <div>
                        <div class="line">
                        <span class="icon font">
                            <i class="fa-solid fa-temperature-full"></i>
                        </span>
                        <p class="font">Max Temp: ${obj.main.temp_max}</p>
                        </div>
                    </div>`

    let d4 = document.createElement('div')
    d4.innerHTML = ` <div>
                        <div class="line">
                        <span class="icon font">
                            <i class="fa-solid fa-temperature-empty"></i>
                        </span>
                        <p class="font">Min Temp: ${obj.main.temp_min}</p>
                        </div>
                    </div>`

    let d5 = document.createElement('div')
    d5.innerHTML = ` <div>
                        <div class="line">
                        <span class="icon font">
                            <i class="fa-solid fa-wind"></i>
                        </span>
                        <p class="font">Wind-Deg: ${obj.wind.deg}</p>
                        </div>
                    </div>`

    let d6 = document.createElement('div')
    d6.innerHTML = ` <div>
                        <div class="line">
                        <span class="icon font">
                            <i class="fa-solid fa-wind"></i>
                        </span>
                        <p class="font">Wind-Gust: ${obj.wind.gust}</p>
                        </div>
                    </div>`

    let d7 = document.createElement('div')
    d7.innerHTML = ` <div>
                        <div class="line">
                        <span class="icon font">
                            <i class="fa-solid fa-wind"></i>
                        </span>
                        <p class="font">Wind-Speed: ${obj.wind.speed}</p>
                        </div>
                    </div>`

    let d8 = document.createElement('div')
    d8.innerHTML = ` <div>
                        <div class="line">
                        <span class="icon font">
                            <i class="fa-solid fa-sun"></i>
                        </span>
                        <p class="font">Sunrise: ${obj.sys.sunrise}</p>
                        </div>
                    </div>`

    let d9 = document.createElement('div')
    d9.innerHTML = ` <div>
                        <div class="line">
                        <span class="icon font">
                        <i class='bx bx-sun'></i>
                        </span>
                            <p class="font">Sunset: ${obj.sys.sunset}</p>
                        </div>
                    </div>`

    leftContainer.append(d1, d2, d3, d4, d5, d6, d7, d8, d9)

    // Adding src to iframe
    let iframe = document.querySelector('#gmap_canvas')
    iframe.src = `https://maps.google.com/maps?q=${obj.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`
}

// Refer the video for the below function
//// Based on current location
function getLocationWeather() {
    navigator.geolocation.getCurrentPosition(success);

    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // console.log(latitude)   ////--> 12.2912768
        // console.log(longitude)  ////--> 76.6476288

        getData2(latitude, longitude)
        getData3(latitude, longitude)
    }
}
getLocationWeather()

//// fetching the url with logitude and latitude for current day
async function getData2(latitude, longitude) {
    // url for single day
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}`

    // console.log(url)

    let result1 = await fetch(url)
    // console.log(result1)

    let result2 = await result1.json()
    // console.log(result2)

    append1(result2)
}

//// fetching the url with logitude and latitude for 7 days
function getData3(latitude, longitude) {
    // url for 7 days from --> https://openweathermap.org/api/one-call-api#current
    let exclude = 'hourly,minutely,current'
    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=${exclude}&units=metric&appid=${api_key}`

    fetch(url).then(function (result1) {
        // console.log(result1)
        return result1.json()
    }).then(function (result2) {
        let data = result2.daily
        // console.log('data', data)
        append2(data)
    }).catch(function (error) {
        console.log(error)
    })
}

let arrDays = ['Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']
let arrIcons = ['<i class="fa-solid fa-sun"></i>', '<i class="fa-solid fa-cloud-sun"></i>', '<i class="fa-solid fa-cloud-sun"></i>', '<i class="fa-solid fa-cloud-sun"></i>', '<i class="fa-solid fa-cloud"></i>', '<i class="fa-solid fa-cloud-showers-heavy"></i>', '<i class="fa-solid fa-cloud-showers-heavy"></i>', '<i class="fa-solid fa-cloud-showers-heavy"></i>']

let daysBox = document.querySelector('#daysBox')

function append2(data) {
    // console.log('append2')
    daysBox.innerHTML = null

    data.forEach(function (el, index) {
        // if (index === 0) {
        //     continue
        // }

        let day = document.createElement('div')
        day.innerHTML = `<div class="days">
                            <p id="day${index}">DAY</p>
                            <span id="icon${index}"></span>
                            <p>${el.temp.max}</p>
                            <p>${el.temp.min}</p>
                        </div>`

        daysBox.append(day)
    })

    for (let i = 0; i < data.length; i++) {
        let currDay = document.querySelector(`#day${i}`);
        currDay.innerText = arrDays[i]
        // console.log(currDay)

        let currIcon = document.querySelector(`#icon${i}`);
        currIcon.innerHTML = arrIcons[i]
        // console.log(currIcon)

    }

}
