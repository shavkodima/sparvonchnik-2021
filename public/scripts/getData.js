import getDataLocalStorage from './getDataLocalStorage.js';


const PARAM = {
    cat: 'category',
    subOtdel: 'subOtdel',
    search: ['userFio', 'userPhone', 'userMobile', 'userFax']
}



const getData = {
    url: '/api',
    data: new Array,

    async get(procces) {
        const response = await fetch(this.url)
            .then(data => {
                return data.json();
            }).then(data => {
                this.data = data
                procces(data);
            }).catch(error => {
                console.log(error);
            })
    },
    preloadSearch(callback) {
        callback(this.data)
    },

    search(value, callback) {
        this.get(data => {
            const result = data.filter(item => {
                for (const prop in item) {
                    if (PARAM.search.includes(prop) && item[prop].toLowerCase().includes(value.toLowerCase())) {
                        return true;
                    }
                }
            })
            //    let arr = this.sortirovka(result, value)
            //    console.log(arr);
            callback(result);
        })
    },
    // sortirovka(arr, value){
    //     let newArr = arr.filter(item=>{
    //         let surname = item;
    //         let val  = surname.userFio.split(" ")[0]
    //         console.log(val[0].toLowerCase());
    //         if(surname === value[0].toLowerCase()){
    //             return true;
    //         }
    //     })

    //     return newArr;
    // },
    category(callback) {
        this.get(data => {
            const result = data.reduce((arr, item) => {
                if (!arr.includes(item.category)) {
                    arr.push(item.category)
                }
                return arr;
            }, [])
            callback(result)
        })
    },



    subcategory(value, callback) {
        const result = this.data.reduce((arr, item) => {
            if (!arr.includes(item.subOtdel) && item.category === value) {
                arr.push(item.subOtdel)
            }
            return arr;
        }, [])
        callback(result);
    },
    
    goodsList(f, o, callback) {

        this.get(data => {
            const result = data.reduce((arr, item) => {
                if (!arr.includes(item.category) && item.category == f && (item.subOtdel == o || item.subOtdelItem == o)) {
                    arr.push(item)
                }
                return arr;
            }, [])
            callback(result)
        })
    },

    render(data, headerGoodsConfig) {
        const list = document.querySelector('.goods-list');
        const headerGoods = document.querySelector('.goods.wrapper');
        list.innerHTML = data;
        headerGoods.insertAdjacentHTML('afterbegin', headerGoodsConfig)
        onLoading.loading("2")

    }
};

export default getData;