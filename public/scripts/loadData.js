import getData from './getData.js';
import filter from './filterGoods.js';
import addToFavorit from './favorite.js';
import getDataLocalStorage from './getDataLocalStorage.js';
import render from './render.js';

export const loadData = async () => {
    // const getDataIndex = fetch('/api')
    //     .then(data => {
    //         return data.json()
    //     });

    {/* <span data-set=${elem.id} class="btn-favorite-remove" title="Удалить из избранных"></span> */ }
    if(location.pathname == "/edit/pageEdit"){
        fetch('/api')
        .then(data => {
            return data.json()
        }).then(data=>{
            render(data);
        });

    }
    if (location.search) {
        const prop = decodeURI(location.search.split('=')[0].slice(1));
        const value = decodeURI(location.search.split('=')[1]);
        if (prop === "search") {
            getData.search(value, (data) => {
                let counter = 0;
                let navFilterHeader = "";
                navFilterHeader = `<div class="header-goods-title"><p>Результат поиска: Найдено ${counter}</p></div>`;
               render(data, 'btn-favorite', navFilterHeader);
                addToFavorit(data)
            })
        } else {
            const filial = decodeURI(location.search).split('&')[0].split('=')[1];
            const otdel = decodeURI(location.search).split('&')[1].split('=')[1];

            getData.goodsList(filial, otdel, (data) => {
                let headerGoodsListSetting = '';
                headerGoodsListSetting += `<div class="header-goods-title"><p>Вы выбрали: ${filial} ><a href="goods?filial=${filial}&subcat=${otdel}">${otdel}</a></p></div>`;
               
                // filter(data, input => {
                //     headerGoodsListSetting += `<div class="nav-filter-goods"><div class="nav-filter-goods___form"><form>${input}</form></div></div>`;
                // });

                function filterGoodsPage() {
                    const filterSelect = document.querySelector('.nav-filter-goods');
                    const goodsListItem = document.querySelectorAll('.goods-list__item');
                    if (filterSelect != null) {
                        filterSelect.addEventListener('click', (event) => {
                            const target = event.target;
                            let targetText = target.value;
                            if (target.className == 'filter-value-checkbox') {
                                for (let i = 0; i < goodsListItem.length; i++) {
                                    if (goodsListItem[i].getAttribute("data-set") == targetText) {
                                        goodsListItem[i].style.display = "block";
                                    } else {
                                        goodsListItem[i].style.display = "none";
                                    }
                                }
                            }
                        })
                    }else{
                        return false;
                    }
                }
                render(data, 'btn-favorite', headerGoodsListSetting);
                // filterGoodsPage()
                addToFavorit(data)
            })
        }
    }
    if (location.pathname == '/') {
        getDataLocalStorage()
    }
}