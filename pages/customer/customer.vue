<template>
  <view class="customer pageUniapp">
    <view class="pageu">
      <view class="nav-btn-list">
        <view class="nav-list" @tap="buttonTap(i, item.id)" :class="btnIndex === i ? 'nav-active' : ''" v-for="(item, i) in btnList"
          :key="i">
          {{item.name}}
        </view>
      </view>
      <view class="search-select">
        <view class="select-content">
          <picker class="picker" mode="selector" @change="bindPickerChange" :value="index" :range="personnelList"
            range-key="username">
            <view class="uni-input" v-if="index < 0" style="color: #adadad;">请选择</view>
            <view class="uni-input" v-if="personnelList.length > 0">{{personnelList[index] ? personnelList[index].username : ''}}</view>
            <i class="iconfont icon-leftArrows"></i>
          </picker>
        </view>
        <view class="search">
          <input type="text" class="search-input" v-model="key" />
          <view class="btn" @tap="searchSubmit">
            <image src="../../static/img/search1.png" class="magnifier" mode=""></image>
          </view>
        </view>
      </view>
      <view class="table_list">
        <t-table>
          <t-tr color="#000" fontSize="15">
            <t-th widthStyle="13%">权重</t-th>
            <t-th widthStyle="76%" textAlign="center">客户名称</t-th>
            <t-th widthStyle="11%" textAlign="center" paddingLeft="0 0 0 2upx">操作</t-th>
          </t-tr>
          <t-tr v-for="(item, i) in list" :key="i">
            <t-td widthStyle="13%">
              <view :class="item.vageClass === true ? 'vageClass' : ''"></view>
              <view class="text-style" v-if="Number(item.status) === 0 && item.status !== ''">审</view>{{ item.weight }}
            </t-td>
            <t-td widthStyle="76%">{{ item.cusName }}</t-td>
            <t-td widthStyle="11%">
              <view class="img-list" @tap="infoTap(item)">
                <i class="iconfont icon-sangedian" :class="item.ps.search('醒') != -1 ? 'color' : ''" :style="Number(item.status) === 0 && item.status !== '' ? 'color: #d9233b;' : ''"></i>
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
  import {
    mapState
  } from 'vuex'
  export default {
    computed: { //监听词条
      ...mapState(['vuex_tabbar', 'customerJurisdictionTrues']),
      changeIdKey() {
        return this.$store.state.changeId
      }
    },
    watch: {
      changeIdKey: {
        handler(newValue, oldValue) { //当词条改变时执行事件
          console.log('new', newValue)
          console.log('old', oldValue)
          if (newValue) {
            if (this.list.length > 0) {
              this._searchData()
            }
          }
        }
      }

    },
    data() {
      return {
        tableList: [],
        list: [],
        finished: false,
        personnelList: [],
        index: -1,
        current: 1,
        btnList: [{
            id: 0,
            name: '全部'
          },
          {
            id: 11,
            name: '当天'
          },
          {
            id: 1,
            name: '高'
          },
          {
            id: 2,
            name: '中'
          },
          {
            id: 3,
            name: '低'
          },
          {
            id: 5,
            name: '管理'
          },
          {
            id: 14,
            name: '意向'
          }
        ],
        btnIndex: 0,
        userArea: '',
        key: '',
        sts: 0,
        page: 0,
        vageClass: null
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
    // 自定义按钮跳转
    onNavigationBarButtonTap(options) {
      console.log(options)
      if (options.index === 0) {
        this.back();
      } else if (options.index === 1) {
        uni.navigateTo({
          url: "./customerData"
        })
      }
    },
    onShow() {
      const that = this
      that.init()
      // this._searchData();
    },
    onLoad(option) {
      console.log(option)
    },
    // 原生导航栏返回按钮监听
    onBackPress(options) {
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
      tabbarChange(e) {
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
      clear() {
        this.key = ''
        this.searchSubmit()
      },
      clickNav(data) {
        const that = this
        console.log(data)
        that.current = data.select
        console.log(that.current)
      },
      back() {
        uni.navigateTo({
          url: "../index/index"
        })
      },
      // 跳转详情
      infoTap(val) {
        uni.navigateTo({
          url: "./customerInfo?id=" + val.id + '&page=' + val.pages + '&key=' + this.key
		   + '&userArea=' + this.userArea + '&sts=' + this.sts
        })
      },
      // 初始化
      init() {
        const that = this
        that.$api.userCustomerApi().then(res => {
          if (res.data.status === 200) {
            let personnelList = res.data.data
            if (personnelList.length > 0) {
              personnelList.unshift({
                id: '0',
                username: '全部'
              })
            }
            that.personnelList = personnelList
          }
        })
      },
      // 点击头部按钮
      buttonTap(i, id) {
        const that = this
        that.btnIndex = i
        that.sts = id
        // 调用混合搜索
        this._searchData();
      },
      // 当下拉菜单为空 < 0 时,默认等于1,以便弹出下拉菜单
      pickerTap() {
        console.log(123)
        const that = this
        if (that.index === -1) {
          that.index = 0
        }
      },
      // 下拉菜单发生改变时
      bindPickerChange($event) {
        console.log($event)
        const that = this
        that.index = $event.detail.value
        that.userArea = that.personnelList[that.index].id
        console.log(that.userArea)
      },
      // 搜索
      searchSubmit() {
        // 调用混合搜索
        this._searchData();
      },
      // 数据请求(没错就是这么少的代码)
      async _getList() {
        // this.list = this.tableList
        // this.tableList.map(item => {
        //   this.list.push(item);
        // });
        let customerData = uni.getStorageSync('customerData')
        console.log(customerData)
        if (customerData) {
          if (customerData.page) {
            this.page = customerData.page
          }
          this.vageClass = customerData.infoId
        }
        this.$api.customerApi({
          "page": this.page, //页码，整数大于0，必填
          "pageSize": 10, //每页显示条数，整数大于0必填
          "key": this.key,
          'userArea': this.userArea,
          'sts': this.sts
        }).then(res => {
          if (res.data.status === 200) {
            let self = this;
            this.tableList = res.data.data.list
            this.total = res.data.data.count
            res.data.data.list.map(item => {
              self.list.push(item);
            });
            self.list.filter((item => {
              if (!item.pages) {
                item.pages = this.page
              }
              if (item.id === self.vageClass) {
                item.vageClass = true
              }
            }))
            if (this.total === this.list.length) {
              this.finished = true
            } else {
              this.finished = false
            }
            console.log(self.list)
            uni.removeStorageSync('customerData')
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .customer {
    .nav-btn-list {
      display: flex;
      flex-direction: row;
      box-sizing: border-box;
      padding: 10upx 10upx 0;

      .nav-list {
        flex: 1;
        height: 76upx;
        border-radius: 4upx;
        background-color: #f5f5f5;
        font-size: 30upx;
        letter-spacing: 1upx;
        line-height: 76upx;
        color: #adadad;
        font-family: "Ping Fang";
        margin-right: 8upx;
        text-align: center;
      }

      .nav-list:nth-child(7) {
        margin-right: 0;
      }

      .nav-active {
        background-color: #d9233b;
        color: #FFFDEF;
      }
    }

    .search-select {
      width: 100%;
      display: flex;
      flex-direction: row;
      padding: 10upx 10upx;
      box-sizing: border-box;

      .select-content {
        width: 193upx;
        height: 83upx;
        border-radius: 3upx;
        background-color: #ffffff;
        border: 2.7814814814814817upx solid #fff;
        margin-right: 14upx;
        font-size: 30upx;
        letter-spacing: 1upx;
        line-height: 83upx;
        color: #010101;
        font-family: "Ping Fang";
        display: flex;
        flex-direction: row;
        box-sizing: border-box;
        padding: 0 20upx 0 10upx;
        position: relative;

        .picker {
          flex: 1;
          height: 100%;
          text-align: center;
        }

        .icon-leftArrows {
          position: absolute;
          right: 10upx;
          top: 0;
          display: inline-block;
          color: #adadad;
          transform: rotate(270deg);
          font-size: 24upx;
        }
      }
    }

    .search {
      height: auto;
      flex: 1;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;

      .search-input {
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

        image.magnifier {
          width: 45upx;
          height: 45upx;
        }
      }
    }

    .table_list {
      box-sizing: border-box;
      margin-bottom: 130upx;

      .vageClass {
        width: 10upx;
        height: 10upx;
        background: rgb(217, 35, 59);
        border-radius: 50%;
        position: absolute;
        top: 43upx;
        left: 5upx;
      }

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

        .color {
          color: #d9233b;
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

      .text-style {
        color: #d9233b;
        font-family: "Ping Fang";
        display: inline-block;
        padding-right: 5upx;
        box-sizing: border-box;
      }
    }
  }
</style>
