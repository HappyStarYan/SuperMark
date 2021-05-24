<template>
<div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners" class="home-swiper"></home-swiper>
    <home-recommend-view :recommends="recommends"/>
    <feature/>
    <tab-control  class="tab-control" :title="['流行','新款','精选']" @tabClick="tabClick" />
    <goods-list :goods="showGoods"></goods-list>
    <div id="test"></div>
</div>
</template>

<script>
    import NavBar from "@/components/common/navbar/NavBar";
    import HomeSwiper from "@/views/home/homeChildren/HomeSwiper";
    import HomeRecommendView from "@/views/home/homeChildren/HomeRecommendView";
    import Feature from "@/views/home/homeChildren/FeatureView";
    import TabControl from "@/components/content/tabControl/TabControl";
    import GoodsList from "@/components/content/goods/GoodsList";

    import {getHomeMultidata,getHomeGoods} from "@/networt/home";


    export default {
    name: "",
    components:{
        NavBar,
        HomeSwiper,
        HomeRecommendView,
        Feature,
        TabControl,
        GoodsList
    },
    data(){
        return {
            // result:null
            banners:[],
            recommends:[],
            goods:{
                'pop':{page:0,list:[]},
                'new':{page:0,list:[]},
                'sell':{page:0,list:[]}
            },
            currentType:'pop'
        }
    },
    created() {
        //1.请求多个数据
        this.GetHomeMultidata()
        //2.请求商品数据
        this.GetHomeGoods('pop')
        this.GetHomeGoods('new')
        this.GetHomeGoods('sell')
    },
        computed:{
            showGoods(){
                return this.goods[this.currentType].list
            }
        },
    methods:{
        /**
         * 事件监听相关的方法
         */
        tabClick(index){
            switch (index){
                case 0:
                    this.currentType= 'pop'
                    break
                case 1:
                    this.currentType = 'new'
                    break
                case 2:
                    this.currentType = 'sell'
                    break
            }
        },

        /**
         * 网络请求
         * @constructor
         */
        GetHomeMultidata(){
            getHomeMultidata().then(res => {
                // console.log(res)
                // this.result = res;
                this.banners = res.data.data.banner.list;
                this.recommends = res.data.data.recommend.list;
            })
        },
        GetHomeGoods(type){
            const page = this.goods[type].page + 1
            getHomeGoods(type,page).then(res => {
                // console.log(res)
                this.goods[type].list.push(...res.data.data.list)
                this.goods[type].page +=1;
            })
        }
    }
  }
</script>

<style scoped>
  #home {
      padding-top: 44px;
  }

  .home-nav {
      background-color: var(--color-tint);
      color: #fff;

      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      z-index: 9;
  }

  .tab-control {
      position: sticky;
      top:44px;
      z-index: 9;
  }
</style>
