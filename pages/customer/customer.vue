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
          <t-tr color="#000" fontSize="14">
            <t-th widthStyle="13%">权重</t-th>
            <t-th widthStyle="76%" textAlign="center">客户名称</t-th>
            <t-th widthStyle="11%" textAlign="center" paddingLeft="0 0 0 2upx">操作</t-th>
          </t-tr>
          <t-tr v-for="(item, i) in list" :key="i" :id="`anchor${item.id}`" :ref="`anchor${item.id}`">
            <t-td widthStyle="13%">
              <view :class="item.vageClass === true ? 'vageClass' : ''"></view>
              <view class="text-style" v-if="Number(item.status) === 0 && item.status !== ''">审</view>
              <view :class="item.vageClass1 === true ? 'vageClass1' : ''">{{ item.weight }}</view>
            </t-td>
            <t-td widthStyle="76%">
              <view :class="item.vageClass1 === true ? 'vageClass1' : ''">{{ item.cusName }}</view>
            </t-td>
            <t-td widthStyle="11%">
              <view class="img-list" @tap="infoTap($event, item, i)">
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
      ...mapState(['vuex_tabbar', 'customerJurisdictionTrues', 'customerId', 'customerDelList', 'customerTopScroll']),
      changeIdKey() {
        return this.$store.state.changeId
      }
    },
    watch: {
      changeIdKey: {
        handler(newValue, oldValue) { //当词条改变时执行事件
          if (newValue) {
            this._searchData()
          }
        }
      },
      customerId: {
        handler(newValue, oldValue) { //当词条改变时执行事件
          const that = this
          that.list.filter((item, i) => {
            item.vageClass = false
            if (Number(item.id) === Number(newValue)) {
              item.vageClass = true
              item.vageClass1 = true
            }
          })
        }
      },
      customerDelList: {
        handler(newValue, oldValue) { //当词条改变时执行事件
          if (newValue) {
            console.log(newValue)
            const that = this
            let list = that.list
            newValue.filter((val, j) => {
              list.filter((item, i) => {
                if (Number(item.id) === Number(val)) {
                  console.log(item, i)
                  list.splice(i, 1)
                }
              })
            })
            console.log(list)
            that.list = list
          }
        }
      },
      customerTopScroll: {
        handler(newValue, oldValue) { //当词条改变时执行事件
          const that = this
          that.infoIdTo = uni.getStorageSync('customerIdKey');
          that.goToAnchor()
        }
      }
    },
    data() {
      return {
        infoIdTo: null,
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
            id: 13,
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
            id: 14,
            name: '意向'
          },
          {
            id: 15,
            name: '拜访'
          }
        ],
        btnIndex: 0,
        userArea: '',
        key: '',
        sts: 0,
        page: 0,
        vageClass: null,
        scrollTop: 0
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
      let tabList = uni.getStorageSync('tabList');
      console.log(tabList)
      if (tabList[1] === 0) {
        this.clear()
        tabList[1] = 1
        uni.setStorageSync('tabList', tabList)
      }
    },
    onLoad() {
      let tabList = uni.getStorageSync('tabList');
      console.log(tabList, 'onLoad')
      if (tabList[1] === 0) {
        tabList[1] = 1
        uni.setStorageSync('tabList', tabList)
      }
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
      console.log(e, 123456)
      // this.clear()
    },
    mounted() {
      // window.addEventListener('scroll', this.handleScroll)
    },
    onPageScroll (res) {
      console.log(res)
      // this.handleScroll()
      this.scrollTop = res.scrollTop
    },
    methods: {
      handleScroll () {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        this.scrollTop = scrollTop
        console.log(scrollTop)
      },
      //根据页面hash值，定位到指定列表项
      goToAnchor() {
        console.log(123)
        if (this.infoIdTo.id && this.list.length > 0) {
          this.$nextTick(() => {
            document.documentElement.scrollTop = this.infoIdTo.top
            this.scrollTop = this.infoIdTo.top
            this.$store.commit("customerTopScrollKey", 0);
          })
        }
      },
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
        const that = this
        this.key = ''
        that.btnIndex = 0
        that.userArea = 0
        that.index = 0
        that.sts = 0
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
      infoTap(e, val, i) {
        const that = this
        // location.href = `#${val.id}`;
        that.list[i].vageClass1 = true
        that.list.filter((item) => {
          item.vageClass = false
        })
        that.list[i].vageClass = true
        uni.navigateTo({
          url: "./customerInfo?id=" + val.id + '&page=' + val.pages + '&key=' + this.key
		   + '&userArea=' + this.userArea + '&sts=' + this.sts + '&top=' + this.scrollTop
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
      .vageClass1 {
        color: #999;
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
