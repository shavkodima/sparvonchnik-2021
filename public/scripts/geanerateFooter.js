import getData from "./getData.js";

 const generateFooter = () =>{

    getData.category(data=>{
        let listCategory='';
        data.forEach(elem => {
            listCategory +=`<li class="footer-list"><a href="goods.html?cat=${elem}">${elem}</a></li>`;
        });

        const footer = `
        <footer>
        <div class="container">
            <div class="footer">
                <div class="footer-catalog">
                    <h2 class="footer-header">Каталог</h2>
                    <ul>
                        ${listCategory}
                    </ul>
                </div>
            </div>
        </div>
    
    </footer>
        `;
    
        document.body.insertAdjacentHTML('beforeend', footer);
    })
};

export default generateFooter;