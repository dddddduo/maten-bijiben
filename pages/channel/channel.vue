<template>
  <view class="customer pageUniapp">
    <view class="pageu">
      <view class="nav-btn-list">
        <view class="nav-list" @tap="buttonTap(i, item.id)" :class="btnIndex === i ? 'nav-active' : ''" v-for="(item, i) in btnList"
          :key="i">
          {{item.name}}
        </view>
        <!-- <view class="select-content" style="margin-left: 20upx;width: 220upx;margin-right: 0;">
        <picker class="picker" mode="selector" @change="bindPickerChange" :value="index" :range="regionList" range-key="areaname">
          <view class="uni-input" v-if="index < 0" style="color: #adadad;">所在区域</view>
          <view class="uni-input" v-if="regionList.length > 0">{{regionList[index] ? regionList[index].areaname : ''}}</view>
          <i class="iconfont icon-leftArrows"></i>
        </picker>
      </view> -->
      </view>
      <view class="search-select">
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
            <t-th widthStyle="50%" textAlign="center">客户名称</t-th>
            <t-th widthStyle="20%" paddingLeft="0 0 0 10upx">时间</t-th>
            <t-th widthStyle="19%" paddingLeft="0 0 0 5upx">业务人</t-th>
            <t-th widthStyle="11%" textAlign="center" paddingLeft="0 0 0 2upx">操作</t-th>
          </t-tr>
          <t-tr v-for="(item, i) in list" :key="i" :id="`anchor${item.id}`" :ref="`anchor${item.id}`">
            <t-td widthStyle="50%">
              <view :class="item.vageClass === true ? 'vageClass' : ''"></view><text class="text-style"></text>
              <view :class="item.vageClass1 === true ? 'vageClass1' : ''">{{ item.com_name }}</view>
            </t-td>
            <t-td widthStyle="20%">
            <view :class="item.vageClass1 === true ? 'vageClass1' : ''">{{ item.con_time ? addTimeTsp(item.con_time) : '' }}</view>
            </t-td>
            <t-td widthStyle="19%">
            <view :class="item.vageClass1 === true ? 'vageClass1' : ''">{{ item.con_username }}</view>
            </t-td>
            <t-td widthStyle="11%">
              <view class="img-list" @tap="infoTap($event, item, i)">
                <i class="iconfont icon-sangedian" :class="Number(item.tixing) === 1 ? 'color' : ''"></i>
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
    computed: {
      ...mapState(['vuex_tabbar', 'customerJurisdictionTrues', 'channelId', 'channelDelList', 'channelTopScroll'])
    },
    watch: {
      channelId: {
        handler(newValue, oldValue) { //当词条改变时执行事件
          const that = this
          console.log(newValue)
          that.list.filter((item, i) => {
            item.vageClass = false
            if (Number(item.id) === Number(newValue)) {
              item.vageClass = true
              item.vageClass1 = true
            }
          })
          that.$forceUpdate()
        }
      },
      channelDelList: {
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
      channelTopScroll: {
        handler(newValue, oldValue) { //当词条改变时执行事件
          const that = this
          that.infoIdTo = uni.getStorageSync('channelIdKey');
          that.goToAnchor()
        }
      }
    },
    data() {
      return {
        tableList: [],
        list: [],
        finished: false,
        regionList: [],
        index: -1,
        btnList: [{
            id: 0,
            name: '全部'
          },
          {
            id: 7,
            name: '高'
          },
          {
            id: 8,
            name: '中'
          },
          {
            id: 9,
            name: '低'
          },
          {
            id: 10,
            name: '无'
          }
        ],
        btnIndex: 0,
        regionId: '',
        key: '',
        sts: 0,
        current: 2,
        vageClass: null,
        scrollTop: 0,
        infoIdTo: null
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
          url: "./channelData"
        })
      }
    },
    onLoad(options) {
      console.log(options)
      // this._getList();
    },
    onShow() {
      const that = this
      // 区域列表
      that.$api.areaListApi().then(res => {
        if (res.data.status === 200) {
          that.regionList = res.data.data
        }
      })
      // this._searchData();
    },
    // 原生导航栏返回按钮监听
    onBackPress(options) {
      if (options.from === 'navigateBack') {
        return false;
      }
      this.back();
      return true;
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
      // 监听滚动条位置
      handleScroll () {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        this.scrollTop = scrollTop
        console.log(scrollTop)
      },
      //根据页面hash值，定位到指定列表项
      goToAnchor() {
        if (this.infoIdTo.id && this.list.length > 0) {
          this.$nextTick(() => {
            document.documentElement.scrollTop = this.infoIdTo.top
            this.scrollTop = this.infoIdTo.top
            this.$store.commit("channelTopScrollKey", 0);
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
      clickNav(data) {
        const that = this
        console.log(data)
        that.current = data.select
        console.log(that.current)
      },
      // 跳转详情
      infoTap(e, val, i) {
        console.log(val, i)
        const that = this
        // location.href = `#${val.id}`;
         that.list[i].vageClass1 = true
         that.list.filter((item) => {
           item.vageClass = false
         })
         that.list[i].vageClass = true
         uni.navigateTo({
           url: "./channelInfo?id=" + val.id + '&page=' + val.pages + '&key=' + this.key
        + '&userArea=' + this.userArea + '&sts=' + this.sts + '&top=' + this.scrollTop
         })
         that.$forceUpdate()
      },
      // 时间戳转换为日期
      addTimeTsp(num) {
        let intDate = null;
        if (num.length === 10) {
          intDate = parseInt(num) * 1000
        } else {
          intDate = parseInt(num)
        }
        var date = new Date(intDate);
        var YY = date.getFullYear() + '-';
        var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
        var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        return MM + DD;
      },
      back() {
        uni.navigateTo({
          url: "../index/index"
        })
      },
      qtixing() {},
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
        that.regionId = that.regionList[that.index].id
        that.searchSubmit()
      },
      // 搜索
      searchSubmit() {
        // 调用混合搜索
        this._searchData();
      },
      // 数据请求(没错就是这么少的代码)
      async _getList() {
        this.$api.ditchListApi({
          "page": this.page, //页码，整数大于0，必填
          "pageSize": 15, //每页显示条数，整数大于0必填
          'sta': this.sts,
          "cusArea": this.regionId,
          "key": this.key
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
              // item.vageClass = false
              // item.vageClass1 = false
            }))
            if (this.total === this.list.length) {
              this.finished = true
            } else {
              this.finished = false
            }
            console.log(self.list)
            uni.removeStorageSync('channelData')
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

      .nav-list:last-child {
        margin-right: 0;
      }

      .nav-active {
        background-color: #d9233b;
        color: #fff;
      }
    }

    .search-select {
      width: 100%;
      display: flex;
      flex-direction: row;
      padding: 10upx;
      box-sizing: border-box;
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
        border: 2upx solid #fff;
        padding: 0 20upx;
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
          width: 43upx;
          height: 43upx;
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

      text.text-style {
        font-size: 28upx;
        color: #d9233b;
        font-family: "Ping Fang";
        display: inline-block;
      }
    }

    .select-content {
      width: 193upx;
      height: 78upx;
      border-radius: 3upx;
      background-color: #ffffff;
      border: 2.7814814814814817upx solid #fff;
      margin-right: 14upx;
      font-size: 30upx;
      letter-spacing: 1upx;
      line-height: 76upx;
      color: #010101;
      font-family: "Ping Fang";
      display: flex;
      flex-direction: row;
      box-sizing: border-box;
      align-items: center;
      padding: 0 20upx 0 10upx;
      position: relative;

      .picker {
        flex: 1;
        height: 100%;
        text-align: center;
      }

      .icon-leftArrows {
        display: inline-block;
        transform: rotate(270deg);
        font-size: 24upx;
        color: #adadad;
        position: absolute;
        right: 10upx;
        top: 0;
      }
    }
  }
</style>
