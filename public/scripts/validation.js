export const validation = ()=>{
    const form = document.querySelector('.form-login');
    const required = document.querySelectorAll('.required')
    if(form != null){
        form.addEventListener('submit', function(e){
            for(let i =0; i<form.length-1; i++){
                if(form[i].value ==""){
                    e.preventDefault()
                    required[i].textContent="Обязательное поле"
                }else{
                    required[i].textContent=""
                }
            }
        })
    }else{
        return false;
    }
}

