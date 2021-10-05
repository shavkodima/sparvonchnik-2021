
const mask = () => {
    const input = document.querySelector('.userPhone');
    input.setAttribute('maxlength', 9);
    input.addEventListener('keyup', (event) => {
        const target = event.target;

        if(event.keyCode == 8){
            target.value += "";
        }else if (target.value.length <= 9) {
            if (target.value.length === 3 ) {
                target.value += "-";
            }
            else if (target.value.length === 6) {
                target.value += "-";
            }
        }
    })
}
mask()