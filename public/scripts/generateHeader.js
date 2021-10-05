

const generateHeader = () => {

    document.head.innerHTML += '<link rel="shortcut icon" href="../image/logo-minsktrans.png" type="image/x-icon">';
    const header = `
    
    <header>
    <div class="container">
    <div class="container-header-top">
    <div class="weather"></div>
    <div class="date-update"></div>
    </div>
        <div class="header">
            <button class="btn btn-burger" aria-label="открыть меню">
                <svg focusable="false" class="svg-icon" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M20 8H4V6H20V8ZM20 13H4V11H20V13ZM20 18H4V16H20V18Z"></path>
                </svg>
            </button>
            <div class="section-logo">
            <a href="/">            
                <img src="./image/logo-minsktrans.png">
                <p class="logo-title">Телефонный справочник</p>
            </a>
            </div>
            <div class="section-search">
                <form class="search" method="get" action="goods">
                    <input type="search" name="search" maxlength="150" class="search-input" spellcheck="false"
                        placeholder="Поиск"
                        autocapitalize="off" autocomplete="off" autocorrect="off">
                    <button type="submit" class="btn search-btn" aria-label="найти"></button>
                </form>
                <div class='section-search-list'>
                    <ul class="search-list"></ul>
                </div>
            </div> 
        </div>
    </div>
</header>
    `;

    document.body.insertAdjacentHTML('afterbegin', header);

    const getDateUpdate = async () => {
        const date = document.querySelector('.date-update');

        const response = await fetch('/getDateUpdate')
            .then(data => {
                return data.json()
            }).then(data => {
                date.textContent += "Дата обновления: " + data[0].dates;
            })
    }
    const getWeather = () => {
        const weatherElem = document.querySelector('.weather');
        let getWeather = setTimeout(async function pogoda(){
            const response = await fetch('/getWeather')
            .then(data => {
                return data.text();
            }).then(data => {
                const property = data.split(' ');
                const weatherDescription = property.slice(2, property.length);
                const strWeather = weatherDescription.join(" ");
                let tmp = property[0].split('.')[0] + " " +  property[1]
                const imgLink = getImgWeather(strWeather);
                weatherElem.innerHTML = `<img src="${imgLink}"/><p>${tmp} ${strWeather}</p>`;
                getWeather = setTimeout(pogoda, 60*1000)
            })
            .catch(err=>{
                console.log(err);
            })
        },0)

        const getImgWeather = (val) => {

            let img = "";
            switch (val) {
                case "дождь":
                    img = '/image/PNG/rain.png';
                    break;
                case "ясно":
                    img = '/image/PNG/day_clear.png';
                    break;
                case "пасмурно":
                    img = '/image/PNG/cloudy.png';
                    break;
                case "небольшой дождь":
                    img = '/image/PNG/rain.png';
                    break;
                case "туман":
                    img = '/image/PNG/fog.png';
                    break;
                case "плотный туман":
                    img = '/image/PNG/fog.png';
                    break;
                case "морось":
                    img = '/image/PNG/rain.png';
                    break;
                case "снег":
                    img = '/image/PNG/snow.png';
                    break;
                case "облачно с прояснениями":
                    img = '/image/PNG/day_partial_cloud.png';
                    break;
                    case "переменная облачность":
                    img = '/image/PNG/day_partial_cloud.png';
                    break;
                case "небольшая облачность":
                    img = '/image/PNG/day_partial_cloud.png';
                    break;
                case "небольшой снегопад":
                    img = '/image/PNG/snow.png';
                    break;
                case "небольшой снег":
                    img = '/image/PNG/snow.png';
                    break;
                default:
                    img = '';
            }
            return img;
        }
    }
    getDateUpdate()
    getWeather();
}

export default generateHeader;
