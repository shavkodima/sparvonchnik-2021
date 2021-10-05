const addToFavorit = (data) => {
    let arrFavorite = [];
    const btnFavorite = document.querySelectorAll('.btn-favorite');
    if (localStorage.getItem('favorite')) {
        arrFavorite = JSON.parse(localStorage.getItem('favorite'));
    }
    btnFavorite.forEach(elem => {
        elem.addEventListener('click', (event) => {
            let flag = false;
            const target = event.target;
            const idFavofite = Number(target.getAttribute('data-set'));
            let res = data.find(elem => {
                if (elem.id == idFavofite) {
                    return elem.id;
                }
            });
            for (let i = 0; i < arrFavorite.length; i++) {
                if (arrFavorite[i] == res.id) {
                    flag = true
                }
            }
            if (flag) {
                showMessage("Такая запись уже существует", "warning")
            } else {
                arrFavorite.push(res.id)
                localStorage.setItem("favorite", JSON.stringify(arrFavorite))
                showMessage("Добавлено в список избранных", "success")
            }
        })
    })
    const showMessage = (message, messageStyle) => {
        const div = document.createElement('div');
        div.className = "show-message" + " " + messageStyle;
        div.innerHTML = `<p>${message}</p>`;
        document.body.append(div);
        setTimeout(function () {
            div.remove();
        }, 2000)
    }
};

export default addToFavorit;