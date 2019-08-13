import axios from 'axios'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import Address from '../test.vue'
var router= new VueRouter({
    routes:[
        {path:'/address',component:Address}
    ]
})

var vm = new Vue({
    el:'#app',
    data:{
        totalPrice:0,
        productList:[],
        isCheckAll:false,
        delFlag:false,
        curProduct:null
    },
    router,
    filters:{
        moneyFormat(value){
            return "￥"+value.toFixed(2);
        }
    },
    mounted(){
        this.getCartView();
    },
    methods:{
        getCartView(){
            axios.get('data/cartData.json').then(res=>{
                console.log(res)
                this.productList = res.data.result.list;
            })
        },
        changeCount(product,type){
            if(type>0){
                product.productQuantity++;
            }else{
                if(product.productQuantity-1<1) return;
                product.productQuantity--;
            }
            this.calcTotalPrice();
        },
        select(item){
            if(typeof item.checked == 'undefined'){
                Vue.set(item,"checked",true);//给item添加一个属性
                // this.$set(item,"checked",true);//局部注册的方法
            }else{
                item.checked = !item.checked;
            }
            this.calcTotalPrice();
        },
        checkAll(){
            this.isCheckAll = ! this.isCheckAll;
            console.log(this.isCheckAll)
            if(this.isCheckAll){
                var _this = this;
                _this.productList.forEach(function(item,index){
                    if(typeof item.checked == 'undefined'){
                        Vue.set(item,"checked",true);//给item添加一个属性
                        // this.$set(item,"checked",true);//局部注册的方法
                        // console.log(_this.isCheckAll);
                        // console.log(item.checked);
                        
                    }else{
                        item.checked = _this.isCheckAll;
                    }
                })
            }else{
                var _this = this;
                _this.productList.forEach(function(item,index){
                    if(typeof item.checked == 'undefined'){
                        Vue.set(item,"checked",true);//给item添加一个属性
                        // this.$set(item,"checked",true);//局部注册的方法
                        // console.log(_this.isCheckAll);
                        // console.log(item.checked);
                        
                    }else{
                        item.checked = _this.isCheckAll;
                    }
                })
            }
            this.calcTotalPrice();
        },

        calcTotalPrice(){
            var _this = this;
            _this.totalPrice = 0;
            _this.productList.forEach(function(item,index){
                if(item.checked){
                    _this.totalPrice += item.productPrice * item.productQuantity;
                }
            })
        },

        delConfirm(item){
            this.delFlag=true;
            this.curProduct = item;
        },

        delProduct(){
            var index =this.productList.indexOf(this.curProduct);
            this.productList.splice(index,1);
            this.delFlag=false;
            this.calcTotalPrice();
        }
    }
})