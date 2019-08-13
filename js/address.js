// const axios = require('axios')
new Vue({
    el:'.container',
    data:{
        limitNum:3,
        addressList:[],
        curIndex:0,
        shippingmethods:1
    },
    mounted(){
        this.getAddressList()
    },
    computed:{
        filterAddress(){
            return this.addressList.slice(0,this.limitNum);
        }
    },
    methods:{
        getAddressList(){
            var _this = this;
            this.$http.get('data/address.json').then(res=>{
                if(res.data.status == "0"){
                    _this.addressList = res.data.result;
                }
            })
        },
        setDefault(addressid){
            this.addressList.forEach((item,index) => {
                if(item.addressId == addressid){
                    item.isDefault = true;

                }else{
                    item.isDefault = false;
                }
            });
        }
    }
})