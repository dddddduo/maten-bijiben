<template>
  <view class="capital pageUniapp">
    <view class="pageu">
      <view class="search-select">
        <view class="search">
          <input type="text" class="search-input" v-model="keyword" />
          <view class="btn" @tap="searchSubmit">
            <image src="../../static/img/search1.png" class="magnifier" mode=""></image>
          </view>
        </view>
      </view>
      <view class="table_list">
        <t-table>
          <t-tr color="#000" fontSize="15">
            <t-th widthStyle="53%" textAlign="center">公司名称</t-th>
            <t-th widthStyle="27%" paddingLeft="0 0 0 20upx">审批日期</t-th>
            <t-th widthStyle="20%" textAlign="center">操作</t-th>
          </t-tr>
          <t-tr v-for="(item, i) in list" :key="i">
            <t-td widthStyle="53%">
              <view :class="item.vageClass === true ? 'vageClass' : ''"></view>
              <view :class="item.vageClass1 === true ? 'vageClass1' : ''">{{ item.name }}</view>
            </t-td>
            <t-td widthStyle="27%">
              <view :class="item.vageClass1 === true ? 'vageClass1' : ''">{{ item.ctime }}</view>
            </t-td>
            <t-td widthStyle="20%">
              <view class="img-list">
                <image @tap="edit(item)" v-if="Number(item.checkp) === 0" src="../../static/img/update.png" style="width: 38upx;height: 37upx;" mode=""></image>
                <!-- <image v-if="Number(item.checkp) === 1" src="../../static/img/no-update.png" style="width: 38upx;height: 37upx;" mode=""></image> -->
                <image @tap="examineTap(item)" v-if="Number(item.checkp) === 0" src="../../static/img/examine.png" style="margin:0 10upx;width: 36upx;height: 36upx;" mode=""></image>
                <i @tap="selectInfo(item, i)" class="iconfont icon-sangedian"></i>
              </view>
            </t-td>
          </t-tr>
        </t-table>
      </view>
      <m-loading :loading="loading" :finished="finished"></m-loading>
      <uni-popup ref="popup2" type="dialog">
          <uni-popup-dialog type="base" message="成功消息" content="当前网络非wifi网络,确定继续下载么？" :duration="2000" :before-close="true" @close="close" @confirm="okGo"></uni-popup-dialog>
      </uni-popup>
    </view>
    <u-tabbar :list="vuex_tabbar" height="60px" @change="tabbarChange"></u-tabbar>
  </view>
</template>

<script>
  import uniPopup from '@/components/uni-popup/uni-popup.vue'
  import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
  import tTable from '@/components/t-table/t-table.vue';
  import tTh from '@/components/t-table/t-th.vue';
  import tTr from '@/components/t-table/t-tr.vue';
  import tTd from '@/components/t-table/t-td.vue';
  import mLoading from '@/components/m-icon/m-loading.vue';
  import listMixin from '@/common/mixins/list-mixin.js';
  import {mapState} from 'vuex'
  export default {
    computed: {
      ...mapState(['vuex_tabbar', 'customerJurisdictionTrues', 'orderTopScroll', 'orderId'])
    },
    watch: {
      orderId: {
        handler(newValue, oldValue) { //当词条改变时执行事件
          const that = this
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
      orderTopScroll: {
        handler(newValue, oldValue) { //当词条改变时执行事件
          const that = this
          that.infoIdTo = uni.getStorageSync('orderIdKey');
          if (newValue === 1) {
            that.goToAnchor()
          }
        }
      }
    },
    data () {
      return {
        tableList: [],
        list: [],
        finished: false,
        keyword: '',
        current: 4,
        fileName: '',
        currencyExamine: false,
        fileUrl: '',
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
      uniPopup,
      uniPopupDialog
    },
    onPageScroll (res) {
      console.log(res)
      // this.handleScroll()
      this.scrollTop = res.scrollTop
    },
    onNavigationBarButtonTap(options) {
      console.log(options)
      if (options.index === 0) {
        uni.switchTab({
          url: "./price"
        })
      } else if (options.index === 1) {
        uni.navigateTo({
          url: "./price"
        })
      }
    },
    onShow() {
      const that = this
      that.limitMethods()
    },
    // 原生导航栏返回按钮监听
    onBackPress (options) {
      if (options.from === 'navigateBack') {  
        return false;  
      }
      uni.navigateTo({
        url: "./quotationData"
      }) 
      return true;  
    },
    methods: {
      //根据页面hash值，定位到指定列表项
      goToAnchor() {
        console.log(123)
        if (this.infoIdTo.id && this.list.length > 0) {
          this.$nextTick(() => {
            document.documentElement.scrollTop = this.infoIdTo.top
            this.scrollTop = this.infoIdTo.top
            this.$store.commit("orderTopScrollKey", 0);
          })
        }
      },
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
      limitMethods () {
        const that = this
        let dpLimit = uni.getStorageSync('dpLimit');
        let uid = uni.getStorageSync('uid');
        console.log(dpLimit)
        if (dpLimit.length > 0) {
          // 关联文书审核: 256
          dpLimit.filter(item => {
            if (Number(item) === 256) {
              that.currencyExamine = true
            }
          })
        }
        if (Number(uid) === 1) {
          that.currencyExamine = true
        }
      },
      // 待审核
      examineTap (val) {
        const that = this
        if (that.currencyExamine === true) {
          that.examineTrial(val.id)
        } else {
          uni.showToast({
            title: '您暂无审核权限',
            duration: 2000,
            icon: 'none'
          });
        }
      },
      examineTrial (id) {
        const that = this
        that.$api.pdfCheckApi({id: id}).then(res => {
          if (res.data.status === 200) {
            uni.showToast({
              title: '审核通过',
              duration: 2000,
              icon: 'none'
            });
            that._searchData()
          } else {
            uni.showToast({
              title: '审核失败',
              duration: 2000,
              icon: 'none'
            });
          }
        })
      },
      edit (val) {
        uni.navigateTo({
          url: "./quotationInfo?id=" + val.id + '&intype=' + val.intype
        })
      },
      // 查询详情
      selectInfo (val, i) {
        const that = this
        let config = "https://mkmngsys.mitech-ndt.com/"
        uni.showLoading({
          title: '加载中'
        });
        uni.downloadFile({
          // 下面一行时拼接预览PDF的地址！！！
          url: config + val.url,
          success: function(res) {
            var filePath = res.tempFilePath;
            if (!filePath) return
            uni.openDocument({
              filePath: filePath,
              success: function(res) {
                console.log(res);
                console.log('打开文档成功');
                uni.hideLoading();
                that.list[i].vageClass1 = true
                  that.list.filter((item) => {
                    item.vageClass = false
                  })
                that.list[i].vageClass = true
                this.$store.commit("orderIdKey", val.id);
                let value = {}
                value.id = val.id
                value.top = this.scrollTop
                uni.setStorageSync('orderIdKey', value);
                this.$store.commit("orderTopScrollKey", 1);
              }
            });
          }
        });
      },
      // 分享到微信
      shareWeixin (val, i) {
        console.log(val)
        const that = this
        uni.showLoading({
          title: '加载中'
        });
        let fileName = val.url.substring(val.url.lastIndexOf(".")+1);
        that.fileName = val.name + '.' + fileName;
        that.fileUrl = "https://mkmngsys.mitech-ndt.com" + val.url;
        const FileShare= uni.requireNativePlugin('life-FileShare');
        if (that.fileName) {
          plus.io.resolveLocalFileSystemURL(("_doc/pdf/"+ that.fileName), function(entry) {
            console.log(entry)
            FileShare.render({
              type:"SYSTEM",//QQ为QQ，微信为WX，系统默认是SYSTEM，不填写默认SYSTEM
              filePath: plus.io.convertLocalFileSystemURL("_doc/pdf/"+ that.fileName)
            }, result => {
              uni.hideLoading();
            });
          }, function(e) {
            uni.getNetworkType({
              success: function (res) {
                console.log(res.networkType);
                if (res.networkType !== 'wifi') {
                  uni.hideLoading();
                  that.$refs.popup2.open()
                } else {
                  that.okGo()
                }
              }
            });
          })
        } else {
          setTimeout(function () {
            uni.hideLoading();
          }, 300);
          uni.showToast({
            title: '无可转发文件',
            duration: 2000,
            icon: 'none'
          });
        }
      },
      okGo () {
        const that = this
        uni.showLoading({
          title: '加载中'
        });
        const FileShare= uni.requireNativePlugin('life-FileShare');
        var dtask = plus.downloader.createDownload(that.fileUrl, {filename:"_doc/pdf/"+ that.fileName}, function(d, status){
           // 下载完成
          if(status == 200){
            FileShare.render({
              type:"SYSTEM",//QQ为QQ，微信为WX，系统默认是SYSTEM，不填写默认SYSTEM
              filePath :plus.io.convertLocalFileSystemURL(d.filename)
            }, result => {
              uni.hideLoading();
              that.close()
            });
          } else {
            console.log("Download failed: " + status); 
          }  
        });
        dtask.start();
      },
      close () {
        this.$refs.popup2.close()
      },
      // 详情
      infoSelect (val) {
        uni.navigateTo({
          url: "./orderInfo?id=" + val.id
        })
      },
      clickNav (data) {
        const that = this
        that.current = data.select
      },
      // 时间戳转换为日期
      addTimeTsp (num) {
        let intDate = null;
        if (num.length === 10) {
          intDate = parseInt(num)*1000
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
        return YY + MM + DD;
      },
      // 批复
      replySet (id) {
        const that = this
        that.$api.replySetApi({id: id}).then(res => {
          if (res.data.status === 200) {
            uni.showToast({
                title: '批复成功',
                duration: 2000,
                icon: 'none'
            });
            that.searchSubmit()
          }
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
        this.$api.pdfListApi({
          "page": this.page,    //页码，整数大于0，必填
          "pageSize": 15, //每页显示条数，整数大于0必填
          key: this.keyword
        }).then(res => {
          if (res.data.status === 200) {
            let self = this;
            this.tableList = res.data.data.list
            this.total = res.data.data.count
            res.data.data.list.map(item => {
              self.list.push(item);
            });
            if (this.list.length > 0) {
              if (this.total === this.list.length) {
                this.finished = true
              } else {
                this.finished = false
              }
            }
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .capital {
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
          font-size: 36upx;
        }
      }
      image.select {
        width: 35upx;
        height: 35upx;
      }
      image.copy {
        width: 36upx;
        height: 40upx;
        margin:0 20upx;
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
      .search-input{
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
        image.magnifier{
          width: 43upx;
          height: 43upx;
        }
      }
    }
  }
</style>
