import removeFavorite from './removeFavorite.js';
import getData from './getData.js';
import render from './render.js';

const getDataLocalStorage = () => {
    let arrLocal = new Array();
    let result = [];
    const list = document.querySelector('.goods-list');
    if (localStorage.getItem('favorite')) {
        arrLocal = JSON.parse(localStorage.getItem('favorite'))
        if (arrLocal.length != 0) {
            getData.get(data => {
                for (let i = 0; i < arrLocal.length; i++) {
                    for (let j = 0; j < data.length; j++) {
                        if (arrLocal[i] == data[j].id) {
                            result.push(data[j])
                        }
                    }
                }
                render(result, 'btn-favorite-remove', null);
                removeFavorite(result);
            });
        } else {
            list.innerHTML = `<p class="favorite-no-text">Ваш список пуст</p>`;
        }
    } else {
        list.innerHTML = `<p class="favorite-no-text">Ваш список пуст</p>`;
    }
}

export default getDataLocalStorage;