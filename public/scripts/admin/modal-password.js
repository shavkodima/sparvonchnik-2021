
export const modalEditPassword = () =>{
    const listUserAdmin = document.querySelector('.list-user-admin');
    listUserAdmin.addEventListener('click', openModalUser)
}

const route = {
    updatePassword: '/updateAdminPassword',
    updateRole:'/updateAdminRole'
}


const openModalUser = (event)=>{
    event.preventDefault()
    if(event.target.className == 'btn-edit__password'){
        let id = event.target.getAttribute('dataset-id')
        const createModal = document.createElement('div');
        let user = getDataAdmin(id, (data)=>{
            createModal.innerHTML = objectModalHtml(data);

            createModal.classList.add('modal-user-admin')
            document.body.appendChild(createModal)

            const submit = document.querySelector('.submit-new__pass');
            submit.addEventListener('click', submitNewPass)

            const closeModal = document.querySelector('.modal-close__admin');
            closeModal.addEventListener('click', modalDelete)

            const checkResetPassword = document.querySelector('.checkbox-reset-password');
            checkResetPassword.addEventListener('click', getCheckBox)
        });
    }
}

const getCheckBox = (event)=>{
    const password = document.querySelector('.input-new-pass__admin');

    if(event.target.checked){
        password.disabled = false;
    }else{
        password.disabled = true;
    }
}

const getDataAdmin = async (id, callback)=>{
    let arr = new Array();
    let response = await fetch('/getUserAdmin',{
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify({idUser:id})
    })
    .then((data)=>{
        return data.json();
    }).then(data=>{
        callback(data)
    })

}

const modalDelete = (event)=>{
    event.preventDefault()
    const modal = document.querySelector('.modal-user-admin');
    modal.remove()
}

const submitNewPass = (event)=>{
    event.preventDefault()
    const data = {};
    const password = document.querySelector('.input-new-pass__admin');
    const idUser = password.getAttribute('dataset-id');
    const role = document.querySelector('.input-admin-role');
    console.log(role.value);
    if(password.disabled == false && password.value == ""){
        status.textContent = "Введите новый пароль"
        return false;
    }else if(password.disabled == false && password.value != ""){
        data.id = idUser;
        data.password = password.value;
        data.role = role.value;
        password.value = ""
    }else{
        data.id = idUser;
        data.role = role.value;
    }

    postDataUser(data)
}

const postDataUser = async (obj) =>{
    const response = await fetch('/updateAdminProfile',{
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body: JSON.stringify(obj)
    }).then(data=>{
        return data.json()
    }).then(data=>{
        const status = document.querySelector('.modal-status');
        status.textContent = data.message;
    })
}


function objectModalHtml(data){
    return `
                <div class="top-header-modal__admin">
                    <div class="top-header-modal__item">
                        <p>Сменить пароль</p>
                    </div>
                    <div class="top-header-modal__item">
                        <a href="#" class="modal-close__admin">Закрыть</a>
                    </div>
                </div>
            <div class="modal-edit-inner">
                <div class="modal-edit-inner__row"><p>ID: ${data[0].id}<p></div>
                <div class="modal-edit-inner__row"><p>Логин: ${data[0].login}<p></div>
                <div class="modal-edit-inner__row"><p>Филиал: ${data[0].filial}<p></div>
                <div class="modal-edit-inner__row">
                <label>Права
                <select class="goods-item__p input-admin-role">
                <option value="ADMIN">Администратор</option>
                <option value="USER" >Пользователь</option>
                </select>
                </label>
                </div>
                <div class="modal-edit-inner__row">
                    <form action="/updatePassword/${data[0].id}" method="POST">
                    <label>Сменить пароль
                    <input type="checkbox" class="checkbox-reset-password">
                    </label>
                    <label>
                        <input type="text" dataset-id="${data[0].id}" class="input-new-pass__admin" placeholder="Введите новый пароль" disabled>
                    </label>
                        <input type="submit" class="submit-new__pass">
                    </form>
                </div>
                <p class="modal-status"></p>
            </div>
            `;
}