<template>
  <view class="fundApplication pageUniapp">
    <view class="from">
      <view class="from-content">
        <view class="left">
          区域<text class="text"></text>
        </view>
        <view class="right">
          <view class="right-style-1">
            <view class="select-content">
              <picker class="picker" mode="selector" @change="bindPickerChange" :value="index" :range="regionList" range-key="areaname">
                <view class="uni-input" v-if="index < 0" style="color: #adadad;">所在区域</view>
                <view class="uni-input" v-if="regionList.length > 0">{{regionList[index] ? regionList[index].areaname : ''}}</view>
                <i class="iconfont icon-leftArrows"></i>
              </picker>
            </view>
            <view class="right-one-style">
              <view class="right-title">
                来源
              </view>
              <view class="radio-list">
                <view class="radios">
                  <view class="circle" @tap="radioCheck">
                    <text class="i" v-if="formData.ditch_source === 1"></text>
                  </view>
                  意向咨询
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="from-content">
        <view class="left">
          商家名称<text class="text"></text>
        </view>
        <view class="right">
          <input type="text" class="input-style" v-model="formData.com_name" />
        </view>
      </view>
      <view class="from-content">
        <view class="left">
          联系人<text class="text"></text>
        </view>
        <view class="right">
          <input type="text" class="input-style" v-model="formData.com_linkman" />
        </view>
      </view>
      <view class="from-content">
        <view class="left">
          联系电话<text class="text"></text>
        </view>
        <view class="right">
          <input type="text" class="input-style" v-model="formData.com_linktel" />
        </view>
      </view>
      <view class="from-content">
        <view class="left">
          公司网址<text class="text"></text>
        </view>
        <view class="right">
          <input type="text" class="input-style" v-model="formData.com_weburl" />
        </view>
      </view>
      <view class="from-content">
        <view class="left">
          网店地址<text class="text"></text>
        </view>
        <view class="right">
          <input type="text" class="input-style" v-model="formData.store_address" />
        </view>
      </view>
      <!-- <view class="from-content">
        <view class="left">
          QQ/邮箱<text class="text"></text>
        </view>
        <view class="right">
          <input type="text" class="input-style" v-model="formData.com_linkqq" />
        </view>
      </view>
      <view class="from-content">
        <view class="left">
          微信<text class="text"></text>
        </view>
        <view class="right">
          <input type="text" class="input-style" v-model="formData.wechat" />
        </view>
      </view> -->
      <view class="from-content">
        <view class="left">
          权重<text class="text"></text>
        </view>
        <view class="right">
          <view class="select-content">
            <picker class="picker" mode="selector" @change="bindPickerChange1" :value="weightIndex" :range="weightList" range-key="name">
              <view class="uni-input" v-if="weightIndex < 0" style="color: #adadad;">请选择</view>
              <view class="uni-input" v-if="weightList.length > 0">{{weightList[weightIndex] ? weightList[weightIndex].name : ''}}</view>
              <i class="iconfont icon-leftArrows"></i>
            </picker>
          </view>
        </view>
      </view>
      <view class="from-content">
        <view class="left">
          相关文书<text class="text"></text>
        </view>
        <view class="right right-choice">
          <view class="one">
            <input type="text" class="input-style" v-model="wenshu" />
            <view class="select-btn" @tap="addSendOut">添加</view>
            <view class="select-btn" @tap="open">选择</view>
          </view>
          <view class="two">
            <view class="list" v-for="(val, j) in sendOutList" :key='j'>
              <view class="content">
                {{val.file_name}}
              </view>
              <!-- <view class="del" @tap="delSendOut(val, j)">
                <image src="../../static/img/del.png" style="width: 24upx;height: 26upx;" mode=""></image>
              </view> -->
              <view class="del" @tap="shareWeixin(val)">
                <image src="../../static/img/share.png" style="width: 31upx;height: 31upx;" mode=""></image>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="from-content">
        <view class="left left1">
          业务记录<text class="text"></text>
        </view>
        <view class="right">
          <textarea  class="textarea-style" maxlength="5000" v-model="formData.content" />
        </view>
      </view>
    </view>
    <view class="add-cancel-style">
      <view class="cancel-btn-style" @tap="back">取消</view>
      <view class="add-btn-style" @tap="add">提交</view>
    </view>
    <uni-popup ref="popupMessage" type="center">
      <view class="Business-information">
        <view class="title">
          业务资料
        </view>
        <view class="one">
          <input type="text" class="input-style" v-model="keyFile" />
          <view class="select-btn1" @tap="fileTap">
            <image class="sear" src="../../static/img/search1.png" mode=""></image>
          </view>
        </view>
        <scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" style="border: 1px solid #e3e3e3;height: 600upx;margin-top: 30upx;">
          <view class="table_list">
            <t-table>
              <t-tr bgColor="#fff" color="#333" fontSize="14">
                <t-th bgColor="#fff" widthStyle="18%">选择</t-th>
                <t-th bgColor="#fff" widthStyle="82%">名称</t-th>
              </t-tr>
                <checkbox-group @change="checkboxChange">
                  <t-tr v-for="(item, i) in Businesslist" :key="i">
                    <t-td widthStyle="18%" :teshu="true">
                      <view>
                        <checkbox color="#d9233b" :value="item.id" :checked="item.checked" style="transform:scale(0.7)" />
                      </view>
                    </t-td>
                    <t-td widthStyle="82%" :teshu="true">{{ item.file_name }}</t-td>
                  </t-tr>
                </checkbox-group>
            </t-table>
          </view>
        </scroll-view>
        <view class="page">
          <uni-pagination :total="count" :current="page" :pageSize="15" @change="paginationChange"></uni-pagination>
        </view>
        <view class="add-cancel-style">
          <view class="cancel-btn-style" @tap="close">取消</view>
          <view class="add-btn-style" @tap="choice">选择</view>
        </view>
      </view>
    </uni-popup>
    <uni-popup ref="popup2" type="dialog">
        <uni-popup-dialog type="base" message="成功消息" content="当前网络非wifi网络,确定继续下载么？" :duration="2000" :before-close="true" @close="close" @confirm="okGo"></uni-popup-dialog>
    </uni-popup>
  </view>
</template>

<script>
  import uniPopup from '@/components/uni-popup/uni-popup.vue'
  import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
  import tTable from '@/components/t-table/t-table.vue';
  import tTh from '@/components/t-table/t-th.vue';
  import tTr from '@/components/t-table/t-tr.vue';
  import tTd from '@/components/t-table/t-td.vue';
  import uniPagination from '@/components/uni-pagination/uni-pagination.vue'
  export default {
    components: {
      tTable,
      tTh,
      tTr,
      tTd,
      uniPopup,
      uniPagination,
      uniPopupDialog
    },
    data () {
      return {
        scrollTop: 0,
        purposeList: [
          {id: 2, name: '推广'},
          {id: 3, name: '差旅'},
          {id: 7, name: '其他'}
        ],
        wenshu: '',
        formData: {
          area: '',
          com_name: '',
          com_linkman: '',
          com_linktel: '',
          com_weburl: '',
          store_address: '',
          com_linkqq: '',
          wechat: '',
          weight: '',
          wenshu: '',
          ditch_source: 0
        },
        index: -1,
        regionList: [],
        weightIndex: -1,
        weightList: [
          {id: 1, name: '高'},
          {id: 2, name: '中'},
          {id: 3, name: '低'},
          {id: 4, name: "无"}
        ],
        infoId: '',
        sendOutList: [],
        page:1,
        keyFile: '',
        Businesslist: [],
        count: 0,
        choiceList: [],
        fileName: '',
        fileUrl: ''
      }
    },
    onNavigationBarButtonTap(options) {
      console.log(options)
      if (options.index === 0) {
        this.back()
      } else if (options.index === 1) {
        uni.reLaunch({
          url: "./channel"
        })
      }
    },
    // 原生导航栏返回按钮监听
    onBackPress (options) {
      if (options.from === 'navigateBack') {  
        return false;  
      }
      this.back();  
      return true;  
    },
    onShow() {
      const that = this
      that.init()
    },
    methods: {
      radioCheck () {
        Number(this.formData.ditch_source) === 1 ? this.formData.ditch_source = 0 : this.formData.ditch_source = 1
        console.log(this.formData.ditch_source)
        this.$forceUpdate()
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
            uni.getSystemInfo({
              success: (res) => {
                //检测当前平台，如果是安卓则启动安卓更新
                console.log(res);
                if (res.platform === "ios") {
                  setTimeout(() => {
                    uni.hideLoading();
                  }, 100);
                }
              },
            });
          } else {
            console.log("Download failed: " + status); 
          }  
        });
        dtask.start();
      },
      // 分享到微信
      shareWeixin (val) {
        const that = this
        uni.showLoading({
          title: '加载中'
        });
        that.fileName = val.file_name;
        that.fileUrl = "https://mitechsys.mitech-ndt.com/" + val.file_path;
        if (val.file_name) {
          const FileShare= uni.requireNativePlugin('life-FileShare');
          plus.io.resolveLocalFileSystemURL(("_doc/pdf/"+ that.fileName), function(entry) {
            console.log(entry)
            uni.getSystemInfo({
              success: (res) => {
                //检测当前平台，如果是安卓则启动安卓更新
                console.log(res);
                if (res.platform === "ios") {
                  setTimeout(() => {
                    uni.hideLoading();
                  }, 100);
                }
              },
            });
            FileShare.render({
              type:"SYSTEM",//QQ为QQ，微信为WX，系统默认是SYSTEM，不填写默认SYSTEM
              filePath: plus.io.convertLocalFileSystemURL("_doc/pdf/"+ that.fileName)
            }, result => {
              uni.hideLoading();
            });
          }, function(e) {
            uni.getNetworkType({
              success: function (res) {
                console.log(res);
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
      fileTap () {
        const that = this
        // 文书列表
        // 文书列表
        that.$api.wenshuListApi({
          page: that.page,
          key: that.keyFile,
          pageSize: 5,
        })
        .then((res) => {
          if (res.data.status === 200) {
            let list = res.data.data.list;
            let Businesslist = [];
            if (list.length > 0) {
              list.filter((item, i) => {
                Businesslist.push({
                  id: item.id,
                  file_name: item.name,
                  file_path: item.file_path,
                  type: item.type,
                  username: item.username,
                });
              });
            }
            that.Businesslist = Businesslist;
            that.count = Number(res.data.data.count);
            that.$refs.popupMessage.open();
          }
        });
      },
      // 分页
      paginationChange (e) {
        console.log(e)
        const that = this
        that.page = e.current
        // 文书列表
        that.fileTap()
      },
      // 多选
      checkboxChange: function (e) {
        console.log(e.detail.value)
        const that = this
        that.choiceList = e.detail.value
      },
      // 选择
      choice () {
        const that = this
        var Businesslist = that.Businesslist, arr = [];
        for (var i = 0; i < Businesslist.length; i++) {
          for (var j = 0; j < that.choiceList.length; j++) {
            if (Businesslist[i].id === that.choiceList[j]) {
              that.sendOutList.push(Businesslist[i])
            }
          }
        }
        that.close()
      },
      // 添加发送项
      addSendOut () {
        const that = this
        that.keyFile = that.wenshu
        that.$refs.popupMessage.open();
        that.fileTap()
        // that.$api.gePublictFileByIdApi({
        //   id: that.wenshu
        // }).then(res => {
        //   if (res.data.status === 200) {
        //     that.sendOutList.push(res.data.data)
        //   } else {
        //     uni.showToast({
        //       title: '未搜索到',
        //       duration: 2000,
        //       icon: 'none'
        //     });
        //   }
        // })
      },
      // 打开弹出窗
      open(){
        const that = this
        that.keyFile = ''
        // 文书列表
        that.$api.wenshuListApi({
          page: that.page,
          key: that.keyFile,
          pageSize: 5,
        })
        .then((res) => {
          if (res.data.status === 200) {
            let list = res.data.data.list;
            let Businesslist = [];
            if (list.length > 0) {
              list.filter((item, i) => {
                Businesslist.push({
                  id: item.id,
                  file_name: item.name,
                  file_path: item.file_path,
                  type: item.type,
                  username: item.username,
                });
              });
            }
            that.Businesslist = Businesslist;
            that.count = Number(res.data.data.count);
            that.$refs.popupMessage.open();
          }
        });
      },
      close(){
        this.$refs.popupMessage.close()
        this.$refs.popup2.close()
      },
      // 报备
      Report (i) {
        const that = this
        if (i === 1) {
          uni.showToast({
            title: '报备成功',
            duration: 2000,
            icon: 'none'
          });
        } else if (i === 2) {
          uni.showToast({
            title: '操作成功',
            duration: 2000,
            icon: 'none'
          });
        } else if (i === 3) {
          uni.showToast({
            title: '操作成功',
            duration: 2000,
            icon: 'none'
          });
        }
        setTimeout(() => {
          that.formData.sta = i
        }, 500)
      },
      // 提醒
      remind () {
        this.formData.tixing = 1
        uni.showToast({
          title: '设置成功',
          duration: 2000,
          icon: 'none'
        });
      },
      del () {},
      // 初始化
      init () {
        const that = this
        // 区域列表
        that.$api.areaListApi().then(res => {
          if (res.data.status === 200) {
            that.regionList = res.data.data
          }
        })
      },
      // 下拉菜单发生改变时
      bindPickerChange ($event) {
        console.log($event)
        const that = this
        that.index = $event.detail.value
        that.formData.area = that.regionList[that.index].id
      },
      bindPickerChange1 ($event) {
        console.log($event)
        const that = this
        that.weightIndex = $event.detail.value
        that.formData.weight = that.weightList[that.weightIndex].id
      },
      back () {
        uni.reLaunch({
          url: "./channel"
        })
      },
      // 提交
      add () {
        const that = this
        var arr = []
        if (that.sendOutList.length > 0) {
          console.log(that.sendOutList)
          that.sendOutList.filter(item => {
            arr.push(item.id)
          })
          that.formData.wenshu = arr.join(',');
        }
        that.$api.ditchAddApi({
          ...that.formData
        }).then(res => {
          if (res.data.status === 200) {
            uni.showToast({
                title: '添加成功',
                duration: 2000,
                icon: 'none'
            });
            uni.removeStorageSync('channelData')
            setTimeout(() => {
              uni.reLaunch({
                url: "./channel"
              })
            }, 1000)
          }
        })
      },
      // 取消
      cancel () {
        const that = this
        that.formData = {
          cusStatus: 1,
          cusSource: 2,
          cusAdmin: '',
          cusName: '',
          cusArea: '',
          cusLinkman: '',
          cusTel: '',
          cusWeburl: '',
          wenshu: '',
          content: ''
        }
        that.index = -1
      }
    }
  }
</script>

<style lang="less" scoped>
  .fundApplication {
    width: 100%;
    .top-btn {
      padding: 20upx 26upx 0;
      width: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      .btn {
        width: 165upx;
        height: 83upx;
        border-radius: 4upx;
        background-color: #d9233b;
        font-size: 30upx;
        letter-spacing: 1upx;
        line-height: 83upx;
        color: #ffffff;
        font-family: "Ping Fang";
        text-align: center;
      }
    }
    .from {
      width: 100%;
      box-sizing: border-box;
      padding: 20upx 28upx 0 10upx;
      .from-content {
        width: 100%;
        display: flex;
        flex-direction: row;
        box-sizing: border-box;
        margin-top: 10upx;
        .left {
          height: 80upx;
          width: 130upx;
          // text-align: justify;
          font-size: 30upx;
          color: #000000;
          font-family: "Ping Fang";
          line-height: 80upx;
          box-sizing: border-box;
          text.text {
            display: inline-block;
            width: 100%;
          }
        }
        .left1 {
          height: 130upx;
          line-height: 130upx;
        }
        .right-choice {
          display: flex;
          flex-direction: column;
          .one {
            display: flex;
            flex-direction: row;
            .select-btn {
              width: 200upx;
            }
          }
          .two {
            .list {
              overflow: hidden;
              display: flex;
              flex-direction: row;
              align-items: center;
              box-sizing: border-box;
              padding-top: 10upx;
              .content {
                width: auto;
                font-size: 30upx;
                letter-spacing: 1upx;
                line-height: 35upx;
                color: #010101;
                font-family: "Ping Fang";
                padding-right: 20upx;
                box-sizing: border-box;
              }
              .del {
                box-sizing: border-box;
              }
            }
          }
        }
        .right {
          flex: 1;
          padding-left: 10upx;
          box-sizing: border-box;
          .input-style {
            width: 100%;
            height: 80upx;
            border-radius: 3upx;
            background-color: #ffffff;
            border: 2.7777777777777777upx solid #fff;
            padding: 0 20upx;
            box-sizing: border-box;
            font-size: 30upx;
            color: #000000;
            font-family: "Ping Fang";
          }
          .textarea-style {
            width: 100%;
            min-height: 300upx;
            border-radius: 3upx;
            background-color: #ffffff;
            border: 2.7777777777777777upx solid #fff;
            padding: 10upx;
            box-sizing: border-box;
            font-size: 30upx;
            color: #000000;
            font-family: "Ping Fang";
          }
          .radio-list {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            .radios {
              font-size: 30upx;
              letter-spacing: 1upx;
              line-height: 80upx;
              color: #333333;
              font-family: "Ping Fang";
              flex: 1;
              display: flex;
              flex-direction: row;
              align-items: center;
              .circle {
                width: 24upx;
                height: 24upx;
                border-radius: 50%;
                background-color: #fff;
                border: 2upx solid #363636;
                text-align: center;
                margin-left: 20upx;
                margin-right: 12upx;
                display: flex;
                justify-content: center;
                align-items: center;
                text.i {
                  width: 12upx;
                  height: 12upx;
                  border-radius: 50%;
                  background-color: #d9233b;
                  display: inline-block;
                }
              }
            }
          }
          .select-content {
            width: 220upx;
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
        .right-one-style {
          display: flex;
          flex-direction: row;
          .right-title {
            font-size: 30upx;
            color: #000000;
            font-family: "Ping Fang";
            padding-right: 20upx;
          }
        }
        .right-style-1 {
          width: 100%;
          display: flex;
          flex-direction: row;
          .radio-list {
            width: auto;
          }
          .right-one-style {
            flex: 1;
            line-height: 83upx;
            box-sizing: border-box;
            padding-left: 30upx;
          }
        }
        .select-btn {
          width: 165upx;
          height: 83upx;
          border-radius: 4upx;
          background-color: #d9233b;
          font-size: 30upx;
          letter-spacing: 1upx;
          line-height: 83upx;
          color: #ffffff;
          text-align: center;
          margin-left: 15upx;
          font-family: "Ping Fang";
        }
      }
    }
    .btn-list {
      width: 100%;
      padding: 42upx 0;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      .add {
        width: 296upx;
        height: 80upx;
        border-radius: 2upx;
        background-color: #d9233b;
        font-size: 32upx;
        letter-spacing: 1upx;
        line-height: 80upx;
        color: #ffffff;
        font-family: "Adobe Heiti Std";
        margin-right: 20upx;
        text-align: center;
      }
      .cancel {
        text-align: center;
        font-size: 32upx;
        letter-spacing: 1upx;
        line-height: 80upx;
        color: #000000;
        font-family: "Adobe Heiti Std";
        width: 296upx;
        height: 80upx;
        border-radius: 2upx;
        background-color: #fff;
        border: 2upx solid #aaaaaa;
      }
    }
  }
  .Business-information {
    background: #fff;
    width: 600upx;
    padding: 0 20upx;
    box-sizing: border-box;
    .title {
      font-size: 30upx;
      color: #000000;
      font-family: "Ping Fang";
      text-align: center;
      padding: 30upx 0;
    }
    .table_list {
      height: auto;
      overflow: hidden;
      overflow-y: auto;
    }
    .btn-list {
      width: 100%;
      padding: 10upx 0 30upx;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      .add {
        width: 220upx;
        height: 70upx;
        border-radius: 2upx;
        background-color: #d9233b;
        font-size: 28upx;
        letter-spacing: 1upx;
        line-height: 70upx;
        color: #ffffff;
        font-family: "Adobe Heiti Std";
        margin-right: 58upx;
        text-align: center;
      }
      .cancel {
        text-align: center;
        font-size: 28upx;
        letter-spacing: 1upx;
        line-height: 70upx;
        color: #000000;
        font-family: "Adobe Heiti Std";
        width: 220upx;
        height: 70upx;
        border-radius: 2upx;
        background-color: #fff;
        border: 0.6944444444444444upx solid #aaaaaa;
      }
    }
    .page {
      width: 100%;
      padding: 20upx;
      box-sizing: border-box;
      .uni-pagination {
        width: 100%;
      }
    }
    .one {
      display: flex;
      flex-direction: row;
      .select-btn1 {
        margin-left: 10upx;
        width: 189upx;
        height: 70upx;
        border-radius: 2upx;
        background-color: #d9233b;
        text-align: center;
        line-height: 70upx;
        image.sear {
          height: 45upx;
          width: 45upx;
          margin-top: 13upx;
        }
      }
      .input-style {
        height: 70upx;
        border-radius: 2upx;
        background-color: #ffffff;
        border: 1px solid #e3e3e3;
      }
    }
  }
</style>
