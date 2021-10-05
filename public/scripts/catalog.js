import generateSubCatalog from "./generateSubCatalog.js";
import getData from "./getData.js";

export const catalogList = ()=>{
    const updateSubCategory = generateSubCatalog();
    const btnBurger = document.querySelector('.btn-burger');
    const catalog = document.querySelector('.catalog');
    const btnCloseMenu = document.querySelector('.btn-close');
    const subCatalogOpen = document.querySelector('.subcatalog');
    let subCatalogReturn;
    const subcatalogHeader = document.querySelector('.subcatalog-header');
    // generateSubCatalog()
    const overlay = document.createElement('div');
    overlay.className = "overlay";
    document.body.append(overlay)

    const  openMenu = () =>{
        overlay.className = "overlay active";
        catalog.classList.add('open');
        overlay.addEventListener('click', closeMenu)
    }

    const closeMenu = () =>{
        catalog.classList.remove('open')
        overlay.classList.remove('active')
        closeSubCatalog();
    }

    const openSubCategory = (event) =>{
        event.preventDefault();
        const target = event.target;
        const itemList = target.closest('.catalog-list__item');    
        
        if(itemList){
            getData.subcategory(target.textContent, data=>{
                updateSubCategory(target.textContent, data);
                subCatalogOpen.classList.add('subopen');
                subCatalogReturn = document.querySelector('.btn-return');
                subCatalogReturn.addEventListener('click', closeSubCatalog)
                overlay.addEventListener('click', closeMenu)
            })
        }
    }

    const closeSubCatalog = () =>{
        subCatalogOpen.classList.remove('subopen');
    }


    btnBurger.addEventListener('click', openMenu);
    btnCloseMenu.addEventListener('click', closeMenu);
    catalog.addEventListener('click', openSubCategory);
 

}
   