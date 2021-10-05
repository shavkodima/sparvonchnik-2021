
const filter = (data, callback) =>{
    let navFilterGoods='';

    const filter = data.reduce((arr, item)=>{
        if(item.subOtdelItem != "" && !arr.includes(item.subOtdelItem)){
            arr.push(item.subOtdelItem)
        }
        return arr;
    },[]);

    if(filter.length>1){      
        filter.forEach((elem, i) => {
            navFilterGoods += `<p class="nav-goods-filter-p">
            <label for="${i}"><input type="radio" value="${elem}" id="${i}" class="filter-value-checkbox" name="field">${elem}</label>
            </p>`
        })
        callback(navFilterGoods);
    }
}

export default filter;