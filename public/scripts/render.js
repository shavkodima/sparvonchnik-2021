import filter from './filterGoods.js';
import addToFavorit from './favorite.js';
import removeFavorite from './removeFavorite.js';

let arr = new Array();
let pageCounter = 5;
let pagination = '';
let classBtn = "";
let settingHeader = null;
let btnPagination = "";


class GenerateHTML {
    generateMobile = (elem, value) => {
        if (elem === "") {
            return `<span style="color:red">${value}. нет</span>`
        } else {
            return `<span>${value}. ${elem}</span>`;
        }
    }
    generateEmail = (elem) => {
        if (elem === "") {
            return `<span style="color:red">нет</span>`
        } else {
            return `<a href="mailto:${elem}" placeholder="Отправить письмо">${elem}<span class="email-placeholder">Отправить письмо</span></a>`;
        }
    }

}

const render = (data, val, headerSetting) => {

    let listItem = '';
    classBtn = val
    settingHeader = headerSetting
    arr = data;
    pagination = ""
    if (data.length == 0) {
        listItem = "Ничего не найдено"
        return listItem
    }
    else if (data.length > pageCounter) {
        for (let i = 1; i <= Math.ceil(data.length / pageCounter); i++) {
            pagination += `
                <li class="pagination-btn" title="Страница ${i}">${i}</li>
            `
        }
    }
    const listPagitation = document.querySelector('.list-pagination');
    listPagitation.innerHTML = pagination
    btnPagination = document.querySelectorAll('.pagination-btn');
    const pos = ["Генеральный директор", "Директор", "Помощник генерального директора", "Приёмная", "Начальник управления", "Начальник отдела"];
    let data2 = data.map(elems=>{
        if(pos.includes(elems.position)){
            elems.priority = 1;
        }else{
            elems.priority = 0;
        }

        return elems;
    })

    console.log(data2);
    
    showDisplay(data, 1)

    if (btnPagination.length != 0) {
        btnPagination.forEach(item => {
            item.addEventListener('click', next)
        })

        btnPagination[0].classList.add('activ');
    }
}


let showDisplay = (data, page) => {
    let datas = new GenerateHTML();
    let start = (page - 1) * pageCounter;
    let end = start + pageCounter;
    let notes = data.slice(start, end)
    let listItem = '';
    const list = document.querySelector('.goods-list');
    const contentSection = document.querySelector('.content-section');

    if (settingHeader !== null) {
        contentSection.insertAdjacentHTML('beforebegin', settingHeader)
    }

    notes.forEach(elem => {
        listItem += `
                    <li class="goods-list__item" data-set="${elem.subOtdelItem}" data-set-id=${elem.id}>
                        <article class="goods-item">
                            <p class="goods-item__p goods-item-p__username" >${elem.userFio}</p>
                            <p class="goods-item__p">${!elem.subOtdelItem ? elem.subOtdel:elem.subOtdel+ " / " + elem.subOtdelItem}</p>
                            <p class="goods-item__p">${elem.position}</p>
                            <p class="goods-item__p">
                                <span style="font-weight: 600;">гор. ${elem.userPhone}</span>
                                ${datas.generateMobile(elem.userMobile, 'Моб')}
                                ${datas.generateMobile(elem.userFax, 'Факс')}
                            </p>
                            <p class="goods-item__p">${datas.generateEmail(elem.emailUsers)}</p>
                            <span data-set=${elem.id} class="${classBtn}" title=""></span>
                        </article>
                    </li>`;
    });


    list.innerHTML = listItem;
    addToFavorit(data)
    removeFavorite()
}



function next(event) {
    settingHeader = null
    btnPagination.forEach(item => {
        item.classList.remove('activ');
    })
    showDisplay(arr, event.target.innerHTML)
    this.classList.add('activ');
}

export default render;