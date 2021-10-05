import getData from './getData.js';

const preloaderModuleSerach = () => {
    let searchInput = document.querySelector('.search-input');
    let searchSection = document.querySelector('.section-search-list');
    let ulListSearch = document.querySelector('.search-list');

    searchInput.addEventListener('input', (event) => {
        let value = event.target.value.toLowerCase();
        if (event.target.value.length == 0) {
            ulListSearch.innerHTML = ""
            searchSection.classList.remove("section-search-list-active");
        } else {
            getData.preloadSearch((data) => {
                let arr = data.filter(item => {
                    let surname = item['userFio'].split(" ")[0];
                    let sub = surname.toUpperCase()[0];
                    if (sub == value[0].toUpperCase() && surname.toLowerCase().includes(value)) {
                        return item;
                    }
                })
                searchSection.className = 'section-search-list-active'
                showDisplay(arr)
            })
        }
    })

    const showDisplay = (notes) => {
        ulListSearch.innerHTML = "";
        let li = "";
        if (notes.length != 0) {
            notes.forEach(elem => {
                li += `
        <li class="search-list__item"><a href="goods?search=${elem.userFio}">${elem.userFio} <span>${elem.category}</span></a></li>
        `
            });
            ulListSearch.innerHTML = li;
        } else {
            ulListSearch.innerHTML = "<p>Ничего не найдено</p>";
        }
    }
}

export default preloaderModuleSerach;
