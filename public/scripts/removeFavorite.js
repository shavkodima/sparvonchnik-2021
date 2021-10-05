import getDataLocalStorage from './getDataLocalStorage.js'
const removeFavorite = (result) => {
    const btn = document.querySelectorAll('.btn-favorite-remove');
    const li = document.querySelectorAll('.goods-list__item');
    const listElem = document.querySelector('.goods-list');

    btn.forEach(btnRemove => {

        btnRemove.addEventListener('click', () => {
            let localArray = JSON.parse(localStorage.getItem('favorite'));

            let res = localArray.filter(elems => {
                if (elems != btnRemove.getAttribute('data-set')) {
                    return elems;
                }
            });

            li.forEach(li => {
                if (li.getAttribute('data-set-id') == btnRemove.getAttribute('data-set')) {
                    li.classList.add("hiden");
                    setTimeout(function () {
                        li.remove()
                        getDataLocalStorage()
                        if(listElem.children.length == 0){
                            listElem.innerHTML = `<p class="favorite-no-text">Ваш список пуст</p>`;
                        }
                        
                    }, 400)
                }     
            });
                localStorage.setItem('favorite', JSON.stringify(res));
        })
    });
}

export default removeFavorite;