<template>
  <view class="capital pageUniapp">
    <view class="pageu">
    <view class="search">
      <input type="text" class="search-input" v-model="keyword" />
      <view class="btn" @tap="searchSubmit">
        <image src="../../static/img/search1.png" class="magnifier" mode=""></image>
      </view>
    </view>
    <view class="table_list">
      <t-table>
        <t-tr color="#000" fontSize="15">
          <t-th widthStyle="30%" textAlign="center">产品名称</t-th>
          <t-th widthStyle="29%">产品型号</t-th>
          <t-th widthStyle="15%" paddingLeft="0 0 0 20upx">市价</t-th>
          <t-th widthStyle="15%" paddingLeft="0 0 0 5upx">代理价</t-th>
          <t-th widthStyle="11%" textAlign="center" paddingLeft="0 0 0 2upx">操作</t-th>
        </t-tr>
        <t-tr v-for="(item, i) in list" :key="i">
          <t-td widthStyle="30%">{{ item.twoname }}</t-td>
          <t-td widthStyle="29%">{{ item.model }}</t-td>
          <t-td widthStyle="15%">{{ item.market_price }}</t-td>
          <t-td widthStyle="15%">{{ AgencyPrice(item) }}</t-td>
          <t-td widthStyle="11%">
            <view class="img-list" @tap="selectInfo(item)">
              <i class="iconfont icon-sangedian"></i>
            </view>
          </t-td>
        </t-tr>
      </t-table>
    </view>
    <m-loading :loading="loading" :finished="finished"></m-loading>
    <!-- <uni-nav :current="current" @clicks="clickNav"></uni-nav> -->
    </view>
    <u-tabbar :list="vuex_tabbar" height="60px" @change="tabbarChange"></u-tabbar>
  </view>
</template>

<script>
  import tTable from '@/components/t-table/t-table.vue';
  import tTh from '@/components/t-table/t-th.vue';
  import tTr from '@/components/t-table/t-tr.vue';
  import tTd from '@/components/t-table/t-td.vue';
  import mLoading from '@/components/m-icon/m-loading.vue';
  import listMixin from '@/common/mixins/list-mixin.js';
  import uniNav from "@/components/uni-bottom-nav/uni-nav.vue"
  import {mapState} from 'vuex'
  export default {
    computed: {
      ...mapState(['vuex_tabbar', 'customerJurisdictionTrues'])
    },
    data () {
      return {
        tableList: [],
        list: [],
        finished: false,
        keyword: '',
        current: 3
      }
    },
    mixins: [listMixin],
    components: {
      tTable,
      tTh,
      tTr,
      tTd,
      mLoading,
      uniNav
    },
    onNavigationBarButtonTap(options) {
      console.log(options)
      if (options.index === 0) {
        this.back();
      } else if (options.index === 1) {
        uni.navigateTo({
          url: "./quotation"
        })
      }
    },
    onShow() {
      const that = this
      // that.init()
    },
    // 原生导航栏返回按钮监听
    onBackPress (options) {
      if (options.from === 'navigateBack') {  
        return false;  
      }
      this.back();  
      return true;  
    },
    onTabItemTap(e) {
      console.log(e)
      this.clear()
    },
    methods: {
      tabbarChange (e) {
        const that = this
        console.log(e, this.customerJurisdictionTrues)
        if (that.customerJurisdictionTrues === false) {
          if (Number(e) === 1) {
            uni.showToast({
              title: '暂无权限',
              duration: 2000,
              icon: 'none'
            });
          }
        }
      },
      clear () {
        this.keyword = ''
        this.searchSubmit()
      },
      AgencyPrice (val) {
        let a = '75_price'
        return val[a]
      },
      // 查询详情
      selectInfo (item) {
        uni.setStorageSync('priceInfo', item);
        uni.navigateTo({
          url: "./priceInfo"
        })
      },
      // 返回首页
      back () {
        uni.navigateTo({
          url: "../index/index"
        })
      },
      // 搜索
      searchSubmit(){
        // 调用混合搜索
        this._searchData();
      },
      // 数据请求(没错就是这么少的代码)
      async _getList() {
        this.$api.priceListApi({
          "page": this.page,    //页码，整数大于0，必填
          "pageSize": 15, //每页显示条数，整数大于0必填
          keyword: this.keyword
        }).then(res => {
          if (res.data.status === 200) {
            let self = this;
            this.tableList = res.data.data.list
            this.total = res.data.data.count
            res.data.data.list.map(item => {
              self.list.push(item);
            });
            if (this.total === this.list.length) {
              this.finished = true
            } else {
              this.finished = false
            }
            console.log(self.list)
          }
        })
      },
      init () {
        const that = this
        that.$api.fundManagementApi({
          "page": 1,    //页码，整数大于0，必填
          "pageSize":10 //每页显示条数，整数大于0必填
        }).then(res => {
          if (res.data.status === 200) {
            that.tableList = res.data.data.list
            this.list = res.data.data.list
            this.total = res.data.data.count
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .capital {
    .search {
      height: auto;
      width: 100%;
      padding: 10upx;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      .search-input{
        flex: 1;
        height: 83upx;
        border-radius: 3upx;
        background-color: #ffffff;
        border: 2upx solid #ffffff;
        padding: 0 20upx;
        line-height: 83upx;
        box-sizing: border-box;
        position: relative;
        display: flex;
        align-items: center;
        .input {
          border: none;
          background: none;
        }
      }
      .icon-sousuo {
        position: absolute;
        left: 20upx;
        font-size: 32upx;
        color: #999;
      }
      .icon-cuohao {
        position: absolute;
        right: 15upx;
        font-size: 40upx;
        color: #999;
      }
      .btn {
        width: 110upx;
        height: 83upx;
        border-radius: 4upx;
        background-color: #d9233b;
        margin-left: 20upx;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        image.magnifier{
          width: 45upx;
          height: 45upx;
        }
      }
    }
    .table_list {
      box-sizing: border-box;
      margin-bottom: 130upx;
      .img-list {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        .iconfont {
          color: #b0b0b0;
          font-size: 38upx;
        }
      }
      image.select {
        width: 35upx;
        height: 35upx;
      }
      image.copy {
        width: 36upx;
        height: 40upx;
        margin-left: 40upx;
      }
    }
  }
</style>
