<template>
  <view class="fundApplication pageUniapp">
    <!-- <swiper :style="{height: windowHeight-60 + 'px'}" circular='true' :current='current'> -->
      <!-- <swiper-item> -->
        <view class="container" :style="{zIndex: 102, transform: `translate${prePage}`, transition: `transform ${showAnimation?turnPageTime:0}s`}">
          <view class="from">
            <view class="from-content">
              <view class="left">
                客户名<text class="text"></text>
              </view>
              <view class="right">
                <input type="text" class="input-style" v-model="formData.cus_name" />
              </view>
            </view>
            <view class="from-content">
              <view class="left">
                区域<text class="text"></text>
              </view>
              <view class="right">
                <view class="select-content">
                  <picker class="picker" mode="selector" @change="bindPickerChange" :value="regionIndex" :range="regionList"
                    range-key="areaname">
                    <view class="uni-input" v-if="regionIndex < 0" style="color: #adadad;">所在区域</view>
                    <view class="uni-input" v-if="regionList.length > 0">{{regionList[regionIndex] ? regionList[regionIndex].areaname : ''}}</view>
                    <i class="iconfont icon-leftArrows"></i>
                  </picker>
                </view>
              </view>
              <view class="left left2">
                权重<text class="text"></text>
              </view>
              <view class="right">
                <view class="select-content">
                  <picker class="picker" mode="selector" @change="bindPickerChange1" :value="weightIndex" :range="weightList"
                    range-key="name">
                    <view class="uni-input" v-if="weightIndex < 0" style="color: #adadad;">请选择</view>
                    <view class="uni-input" v-if="weightList.length > 0">{{weightList[weightIndex] ? weightList[weightIndex].name : ''}}</view>
                    <i class="iconfont icon-leftArrows"></i>
                  </picker>
                </view>
              </view>
            </view>
            <view class="from-content">
              <view class="left">
                联系人<text class="text"></text>
              </view>
              <view class="right">
                <input type="text" class="input-style" v-model="formData.cus_linkman" />
              </view>
              <!-- <view class="left left2">
                网址<text class="text"></text>
              </view>
              <view class="right">
                <input type="text" class="input-style" v-model="formData.cus_weburl" />
              </view> -->
            </view>
            <view class="from-content">
              <view class="left">
                业务资料<text class="text"></text>
              </view>
              <view class="right right-choice">
                <view class="one three-btn">
                  <view class="three-btn1" @tap="open(0)">通用</view>
                  <view class="three-btn1" @tap="open(2)">专用</view>
                  <view class="three-btn1" @tap="install(0)" :class="styleAdd === true ? 'styleAdd' : 'nostyleAdd'">提交</view>
                </view>
                <view class="two">
                  <view class="list" v-for="(val, j) in sendOutList" :key='j'>
                    <view class="del">
                      <image src="../../static/img/del.png" @tap="deleteTap(val, 0)" v-if="Number(val.status) === 0 || Number(val.status) === 1"
                        style="width: 37upx;height: 32upx;margin-right: 10upx;" mode=""></image>
                    </view>
                    <view class="content" @tap="openFile(val.file_path)">
                      {{val.file_name}}
                    </view>
                    <view class="del">
                      <image src="../../static/img/share.png" @tap="shareWeixin(val, 0)" v-if="Number(val.status) === 1"
                        style="width: 31upx;height: 31upx;" mode=""></image>
                      <image src="../../static/img/examine.png" v-if="Number(val.status) === 0" @tap="examineTap(val, 0)"
                        style="width: 36upx;height: 36upx;" mode=""></image>
                    </view>
                  </view>
                </view>
                <view class="two" style="padding-top: 6upx;">
                  <view class="list" v-for="(val, j) in sendOutList2" :key='j' v-if="sendOutList2.length > 0">
                    <view class="del">
                      <image src="../../static/img/del.png" @tap="deleteTap(val, 0)" v-if="Number(val.status) === 0 || Number(val.status) === 1"
                        style="width: 37upx;height: 32upx;margin-right: 10upx;" mode=""></image>
                    </view>
                    <view class="content" @tap="openFile(val.file_path)">
                      {{val.file_name}}
                    </view>
                    <view class="del">
                      <image src="../../static/img/share.png" @tap="shareWeixin(val, 0)" v-if="Number(val.status) === 1"
                        style="width: 31upx;height: 31upx;" mode=""></image>
                      <image src="../../static/img/examine.png" v-if="Number(val.status) === 0" @tap="examineTap(val, 2)"
                        style="width: 36upx;height: 36upx;" mode=""></image>
                    </view>
                  </view>
                </view>
              </view>
            </view>
            <view class="from-content">
              <view class="left">
                相关文书<text class="text"></text>
              </view>
              <view class="right right-choice">
                <view class="one three-btn">
                  <view class="three-btn1" @tap="open(1)">选择</view>
                  <view class="three-btn1 three-btn2"></view>
                  <view class="three-btn1" @tap="install(0)" :class="styleAdd1 === true ? 'styleAdd' : 'nostyleAdd'">提交</view>
                </view>
                <view class="two">
                  <view class="list" v-for="(val, j) in sendOutList1" :key='j'>
                    <view class="del">
                      <image src="../../static/img/del.png" @tap="deleteTap(val, 0)" v-if="Number(val.status) === 0 || Number(val.status) === 1"
                        style="width: 37upx;height: 32upx;margin-right: 10upx;" mode=""></image>
                    </view>
                    <view class="content" @tap="openFile(val.file_path)">
                      {{val.file_name}}
                    </view>
                    <view class="del">
                      <image src="../../static/img/share.png" @tap="shareWeixin(val, 1)" v-if="Number(val.status) === 1"
                        style="width: 31upx;height: 31upx;" mode=""></image>
                      <image src="../../static/img/examine.png" v-if="Number(val.status) === 0" @tap="examineTap(val, 1)"
                        style="width: 36upx;height: 36upx;" mode=""></image>
                    </view>
                  </view>
                </view>
              </view>
            </view>
            <view class="from-content">
              <view class="left">
                电话<text class="text"></text>
              </view>
              <view class="right right-choice">
                <view class="one">
                  <input type="text" class="input-style" v-model="formData.cus_tel" />
                  <view class="select-btn" @tap="CompleteTap" :class="colorComplete === 0 ? 'bg-color' : ''" style="box-sizing: border-box;padding: 0 10upx;">完整</view>
                </view>
              </view>
            </view>
            <view class="top-btn">
              <view class="btn" @tap="cusToDitchTap">转渠道</view>
              <view class="btn" @tap="remind">设置提醒</view>
              <view class="btn" @tap="confirm">删除</view>
              <view class="btn" @tap="nextTap">下一条</view>
            </view>
            <view class="from-content" v-if="contents.length > 0">
              <view class="left left1">
                往来记录<text class="text"></text>
              </view>
              <view class="right">
                <!-- <textarea  class="textarea-style" v-if="contents.length === 0" v-model="formData.content" /> -->
                <view class="textarea-style">
                  <checkbox-group @change="checkboxChange1">
                    <view class="contents" v-for="(item, i) in contents" :key='i' v-if="item.isShowData">
                      <view class="title-name">
                        <image class="img" src="../../static/img/me.png" style="width: 32upx;height: 34upx;margin-right: 10upx;"
                          mode=""></image>
                        <view class="name">{{item.username}}&nbsp;{{addTimeTsp(item.addtime)}}</view>
                        <image class="img" @tap="deleteTap(item, 1)" src="../../static/img/del.png" style="width: 35upx;height: 30upx;margin-left: 10upx;margin-top: 8upx;"
                          mode=""></image>
                      </view>
                      <view class="content" v-if="item.intupShow === true">
                        <text>{{item.content}}</text>
                        <textarea class="textarea-style" style="border: 1px solid #e3e3e3;" v-model="item.content1" />
                        <view class="btn-content" @tap="contentEdit(item)">
                          提交
                        </view>
                      </view>
                      <view class="content" v-if="item.intupShow === false">
                        <checkbox v-if="formData.btype === 7" color="#d9233b" :value="item.id" :checked="item.checked" style="transform:scale(0.7)" />
                        <text class="texct">{{item.content}}</text>
                        <image @tap="contentTap(item, i)" class="img" src="../../static/img/update.png" style="width: 35upx;height: 34upx;" mode=""></image>
                      </view>
                    </view>
                  </checkbox-group>
                </view>
              </view>
            </view>
            <view class="from-content">
              <view class="left">
                业务方式<text class="text"></text>
              </view>
              <view class="right">
                <view class="radio-list">
                  <view class="radios">
                    <view class="circle" @tap="btypeTap(1)">
                      <text class="i" v-if="formData.btype === 1"></text>
                    </view>
                    记录
                  </view>
                  <view class="radios">
                    <view class="circle" @tap="btypeTap(6)">
                      <text class="i" v-if="formData.btype === 6"></text>
                    </view>
                    意见
                  </view>
                  <view class="radios">
                    <view class="circle" @tap="btypeTap(7)">
                      <text class="i" v-if="formData.btype === 7"></text>
                    </view>
                    整理
                  </view>
                </view>
              </view>
            </view>
            <view class="from-content">
              <view class="left">
                业务记录<text class="text"></text>
              </view>
              <view class="right">
                <textarea class="textarea-style" v-model="formData.content" />
              </view>
            </view>
            <view class="add-cancel-style">
              <view class="cancel-btn-style" @tap="back">取消</view>
              <view class="add-btn-style" @tap="install(1)">提交</view>
            </view>
          </view>
        </view>
      <!-- </swiper-item>
      <swiper-item> -->
        <view class="container" :style="{zIndex: 101, transform: `translate${curPage}`,
              transition: `transform ${showAnimation?turnPageTime:0}s`}" @touchstart="touchStart" @touchend="touchEnd" @touchmove="touchMove" @touchcancel="touchcancel">
          <view class="from">
            <view class="from-content">
              <view class="left">
                客户名<text class="text"></text>
              </view>
              <view class="right">
                <input type="text" class="input-style" v-model="formData.cus_name" />
              </view>
            </view>
            <view class="from-content">
              <view class="left">
                区域<text class="text"></text>
              </view>
              <view class="right">
                <view class="select-content">
                  <picker class="picker" mode="selector" @change="bindPickerChange" :value="regionIndex" :range="regionList"
                    range-key="areaname">
                    <view class="uni-input" v-if="regionIndex < 0" style="color: #adadad;">所在区域</view>
                    <view class="uni-input" v-if="regionList.length > 0">{{regionList[regionIndex] ? regionList[regionIndex].areaname : ''}}</view>
                    <i class="iconfont icon-leftArrows"></i>
                  </picker>
                </view>
              </view>
              <view class="left left2">
                权重<text class="text"></text>
              </view>
              <view class="right">
                <view class="select-content">
                  <picker class="picker" mode="selector" @change="bindPickerChange1" :value="weightIndex" :range="weightList"
                    range-key="name">
                    <view class="uni-input" v-if="weightIndex < 0" style="color: #adadad;">请选择</view>
                    <view class="uni-input" v-if="weightList.length > 0">{{weightList[weightIndex] ? weightList[weightIndex].name : ''}}</view>
                    <i class="iconfont icon-leftArrows"></i>
                  </picker>
                </view>
              </view>
            </view>
            <view class="from-content">
              <view class="left">
                联系人<text class="text"></text>
              </view>
              <view class="right">
                <input type="text" class="input-style" v-model="formData.cus_linkman" />
              </view>
              <!-- <view class="left left2">
                网址<text class="text"></text>
              </view>
              <view class="right">
                <input type="text" class="input-style" v-model="formData.cus_weburl" />
              </view> -->
            </view>
            <view class="from-content">
              <view class="left">
                业务资料<text class="text"></text>
              </view>
              <view class="right right-choice">
                <view class="one three-btn">
                  <view class="three-btn1" @tap="open(0)">通用</view>
                  <view class="three-btn1" @tap="open(2)">专用</view>
                  <view class="three-btn1" @tap="install(0)" :class="styleAdd === true ? 'styleAdd' : 'nostyleAdd'">提交</view>
                </view>
                <view class="two">
                  <view class="list" v-for="(val, j) in sendOutList" :key='j'>
                    <view class="del">
                      <image src="../../static/img/del.png" @tap="deleteTap(val, 0)" v-if="Number(val.status) === 0 || Number(val.status) === 1"
                        style="width: 37upx;height: 32upx;margin-right: 10upx;" mode=""></image>
                    </view>
                    <view class="content" @tap="openFile(val.file_path)">
                      {{val.file_name}}
                    </view>
                    <view class="del">
                      <image src="../../static/img/share.png" @tap="shareWeixin(val, 0)" v-if="Number(val.status) === 1"
                        style="width: 31upx;height: 31upx;" mode=""></image>
                      <image src="../../static/img/examine.png" v-if="Number(val.status) === 0" @tap="examineTap(val, 0)"
                        style="width: 36upx;height: 36upx;" mode=""></image>
                    </view>
                  </view>
                </view>
                <view class="two" style="padding-top: 6upx;">
                  <view class="list" v-for="(val, j) in sendOutList2" :key='j' v-if="sendOutList2.length > 0">
                    <view class="del">
                      <image src="../../static/img/del.png" @tap="deleteTap(val, 0)" v-if="Number(val.status) === 0 || Number(val.status) === 1"
                        style="width: 37upx;height: 32upx;margin-right: 10upx;" mode=""></image>
                    </view>
                    <view class="content" @tap="openFile(val.file_path)">
                      {{val.file_name}}
                    </view>
                    <view class="del">
                      <image src="../../static/img/share.png" @tap="shareWeixin(val, 0)" v-if="Number(val.status) === 1"
                        style="width: 31upx;height: 31upx;" mode=""></image>
                      <image src="../../static/img/examine.png" v-if="Number(val.status) === 0" @tap="examineTap(val, 2)"
                        style="width: 36upx;height: 36upx;" mode=""></image>
                    </view>
                  </view>
                </view>
              </view>
            </view>
            <view class="from-content">
              <view class="left">
                相关文书<text class="text"></text>
              </view>
              <view class="right right-choice">
                <view class="one three-btn">
                  <view class="three-btn1" @tap="open(1)">选择</view>
                  <view class="three-btn1 three-btn2"></view>
                  <view class="three-btn1" @tap="install(0)" :class="styleAdd1 === true ? 'styleAdd' : 'nostyleAdd'">提交</view>
                </view>
                <view class="two">
                  <view class="list" v-for="(val, j) in sendOutList1" :key='j'>
                    <view class="del">
                      <image src="../../static/img/del.png" @tap="deleteTap(val, 0)" v-if="Number(val.status) === 0 || Number(val.status) === 1"
                        style="width: 37upx;height: 32upx;margin-right: 10upx;" mode=""></image>
                    </view>
                    <view class="content" @tap="openFile(val.file_path)">
                      {{val.file_name}}
                    </view>
                    <view class="del">
                      <image src="../../static/img/share.png" @tap="shareWeixin(val, 1)" v-if="Number(val.status) === 1"
                        style="width: 31upx;height: 31upx;" mode=""></image>
                      <image src="../../static/img/examine.png" v-if="Number(val.status) === 0" @tap="examineTap(val, 1)"
                        style="width: 36upx;height: 36upx;" mode=""></image>
                    </view>
                  </view>
                </view>
              </view>
            </view>
            <view class="from-content">
              <view class="left">
                电话<text class="text"></text>
              </view>
              <view class="right right-choice">
                <view class="one">
                  <input type="text" class="input-style" v-model="formData.cus_tel" />
                  <view class="select-btn" @tap="CompleteTap" :class="colorComplete === 0 ? 'bg-color' : ''" style="box-sizing: border-box;padding: 0 10upx;">完整</view>
                </view>
              </view>
            </view>
            <view class="top-btn">
              <view class="btn" @tap="cusToDitchTap">转渠道</view>
              <view class="btn" @tap="remind">设置提醒</view>
              <view class="btn" @tap="confirm">删除</view>
              <view class="btn" @tap="nextTap">下一条</view>
            </view>
            <view class="from-content" v-if="contents.length > 0">
              <view class="left left1">
                往来记录<text class="text"></text>
              </view>
              <view class="right">
                <!-- <textarea  class="textarea-style" v-if="contents.length === 0" v-model="formData.content" /> -->
                <view class="textarea-style">
                  <checkbox-group @change="checkboxChange1">
                    <view class="contents" v-for="(item, i) in contents" :key='i' v-if="item.isShowData">
                      <view class="title-name">
                        <image class="img" src="../../static/img/me.png" style="width: 32upx;height: 34upx;margin-right: 10upx;"
                          mode=""></image>
                        <view class="name">{{item.username}}&nbsp;{{addTimeTsp(item.addtime)}}</view>
                        <image class="img" @tap="deleteTap(item, 1)" src="../../static/img/del.png" style="width: 35upx;height: 30upx;margin-left: 10upx;margin-top: 8upx;"
                          mode=""></image>
                      </view>
                      <view class="content" v-if="item.intupShow === true">
                        <text>{{item.content}}</text>
                        <textarea class="textarea-style" style="border: 1px solid #e3e3e3;" v-model="item.content1" />
                        <view class="btn-content" @tap="contentEdit(item)">
                          提交
                        </view>
                      </view>
                      <view class="content" v-if="item.intupShow === false">
                        <checkbox v-if="formData.btype === 7" color="#d9233b" :value="item.id" :checked="item.checked" style="transform:scale(0.7)" />
                        <text class="texct">{{item.content}}</text>
                        <image @tap="contentTap(item, i)" class="img" src="../../static/img/update.png" style="width: 35upx;height: 34upx;" mode=""></image>
                      </view>
                    </view>
                  </checkbox-group>
                </view>
              </view>
            </view>
            <view class="from-content">
              <view class="left">
                业务方式<text class="text"></text>
              </view>
              <view class="right">
                <view class="radio-list">
                  <view class="radios">
                    <view class="circle" @tap="btypeTap(1)">
                      <text class="i" v-if="formData.btype === 1"></text>
                    </view>
                    记录
                  </view>
                  <view class="radios">
                    <view class="circle" @tap="btypeTap(6)">
                      <text class="i" v-if="formData.btype === 6"></text>
                    </view>
                    意见
                  </view>
                  <view class="radios">
                    <view class="circle" @tap="btypeTap(7)">
                      <text class="i" v-if="formData.btype === 7"></text>
                    </view>
                    整理
                  </view>
                </view>
              </view>
            </view>
            <view class="from-content">
              <view class="left">
                业务记录<text class="text"></text>
              </view>
              <view class="right">
                <textarea class="textarea-style" v-model="formData.content" />
              </view>
            </view>
            <view class="add-cancel-style">
              <view class="cancel-btn-style" @tap="back">取消</view>
              <view class="add-btn-style" @tap="install(1)">提交</view>
            </view>
          </view>
        </view>
      <!-- </swiper-item>
      <swiper-item> -->
        <view class="container" :style="{zIndex: 100, transform: `translate${nextPage}`,transition: `transform ${showAnimation?turnPageTime:0}s`}">
          <view class="from">
            <view class="from-content">
              <view class="left">
                客户名<text class="text"></text>
              </view>
              <view class="right">
                <input type="text" class="input-style" v-model="formData.cus_name" />
              </view>
            </view>
            <view class="from-content">
              <view class="left">
                区域<text class="text"></text>
              </view>
              <view class="right">
                <view class="select-content">
                  <picker class="picker" mode="selector" @change="bindPickerChange" :value="regionIndex" :range="regionList"
                    range-key="areaname">
                    <view class="uni-input" v-if="regionIndex < 0" style="color: #adadad;">所在区域</view>
                    <view class="uni-input" v-if="regionList.length > 0">{{regionList[regionIndex] ? regionList[regionIndex].areaname : ''}}</view>
                    <i class="iconfont icon-leftArrows"></i>
                  </picker>
                </view>
              </view>
              <view class="left left2">
                权重<text class="text"></text>
              </view>
              <view class="right">
                <view class="select-content">
                  <picker class="picker" mode="selector" @change="bindPickerChange1" :value="weightIndex" :range="weightList"
                    range-key="name">
                    <view class="uni-input" v-if="weightIndex < 0" style="color: #adadad;">请选择</view>
                    <view class="uni-input" v-if="weightList.length > 0">{{weightList[weightIndex] ? weightList[weightIndex].name : ''}}</view>
                    <i class="iconfont icon-leftArrows"></i>
                  </picker>
                </view>
              </view>
            </view>
            <view class="from-content">
              <view class="left">
                联系人<text class="text"></text>
              </view>
              <view class="right">
                <input type="text" class="input-style" v-model="formData.cus_linkman" />
              </view>
              <!-- <view class="left left2">
                网址<text class="text"></text>
              </view>
              <view class="right">
                <input type="text" class="input-style" v-model="formData.cus_weburl" />
              </view> -->
            </view>
            <view class="from-content">
              <view class="left">
                业务资料<text class="text"></text>
              </view>
              <view class="right right-choice">
                <view class="one three-btn">
                  <view class="three-btn1" @tap="open(0)">通用</view>
                  <view class="three-btn1" @tap="open(2)">专用</view>
                  <view class="three-btn1" @tap="install(0)" :class="styleAdd === true ? 'styleAdd' : 'nostyleAdd'">提交</view>
                </view>
                <view class="two">
                  <view class="list" v-for="(val, j) in sendOutList" :key='j'>
                    <view class="del">
                      <image src="../../static/img/del.png" @tap="deleteTap(val, 0)" v-if="Number(val.status) === 0 || Number(val.status) === 1"
                        style="width: 37upx;height: 32upx;margin-right: 10upx;" mode=""></image>
                    </view>
                    <view class="content" @tap="openFile(val.file_path)">
                      {{val.file_name}}
                    </view>
                    <view class="del">
                      <image src="../../static/img/share.png" @tap="shareWeixin(val, 0)" v-if="Number(val.status) === 1"
                        style="width: 31upx;height: 31upx;" mode=""></image>
                      <image src="../../static/img/examine.png" v-if="Number(val.status) === 0" @tap="examineTap(val, 0)"
                        style="width: 36upx;height: 36upx;" mode=""></image>
                    </view>
                  </view>
                </view>
                <view class="two" style="padding-top: 6upx;">
                  <view class="list" v-for="(val, j) in sendOutList2" :key='j' v-if="sendOutList2.length > 0">
                    <view class="del">
                      <image src="../../static/img/del.png" @tap="deleteTap(val, 0)" v-if="Number(val.status) === 0 || Number(val.status) === 1"
                        style="width: 37upx;height: 32upx;margin-right: 10upx;" mode=""></image>
                    </view>
                    <view class="content" @tap="openFile(val.file_path)">
                      {{val.file_name}}
                    </view>
                    <view class="del">
                      <image src="../../static/img/share.png" @tap="shareWeixin(val, 0)" v-if="Number(val.status) === 1"
                        style="width: 31upx;height: 31upx;" mode=""></image>
                      <image src="../../static/img/examine.png" v-if="Number(val.status) === 0" @tap="examineTap(val, 2)"
                        style="width: 36upx;height: 36upx;" mode=""></image>
                    </view>
                  </view>
                </view>
              </view>
            </view>
            <view class="from-content">
              <view class="left">
                相关文书<text class="text"></text>
              </view>
              <view class="right right-choice">
                <view class="one three-btn">
                  <view class="three-btn1" @tap="open(1)">选择</view>
                  <view class="three-btn1 three-btn2"></view>
                  <view class="three-btn1" @tap="install(0)" :class="styleAdd1 === true ? 'styleAdd' : 'nostyleAdd'">提交</view>
                </view>
                <view class="two">
                  <view class="list" v-for="(val, j) in sendOutList1" :key='j'>
                    <view class="del">
                      <image src="../../static/img/del.png" @tap="deleteTap(val, 0)" v-if="Number(val.status) === 0 || Number(val.status) === 1"
                        style="width: 37upx;height: 32upx;margin-right: 10upx;" mode=""></image>
                    </view>
                    <view class="content" @tap="openFile(val.file_path)">
                      {{val.file_name}}
                    </view>
                    <view class="del">
                      <image src="../../static/img/share.png" @tap="shareWeixin(val, 1)" v-if="Number(val.status) === 1"
                        style="width: 31upx;height: 31upx;" mode=""></image>
                      <image src="../../static/img/examine.png" v-if="Number(val.status) === 0" @tap="examineTap(val, 1)"
                        style="width: 36upx;height: 36upx;" mode=""></image>
                    </view>
                  </view>
                </view>
              </view>
            </view>
            <view class="from-content">
              <view class="left">
                电话<text class="text"></text>
              </view>
              <view class="right right-choice">
                <view class="one">
                  <input type="text" class="input-style" v-model="formData.cus_tel" />
                  <view class="select-btn" @tap="CompleteTap" :class="colorComplete === 0 ? 'bg-color' : ''" style="box-sizing: border-box;padding: 0 10upx;">完整</view>
                </view>
              </view>
            </view>
            <view class="top-btn">
              <view class="btn" @tap="cusToDitchTap">转渠道</view>
              <view class="btn" @tap="remind">设置提醒</view>
              <view class="btn" @tap="confirm">删除</view>
              <view class="btn" @tap="nextTap">下一条</view>
            </view>
            <view class="from-content" v-if="contents.length > 0">
              <view class="left left1">
                往来记录<text class="text"></text>
              </view>
              <view class="right">
                <!-- <textarea  class="textarea-style" v-if="contents.length === 0" v-model="formData.content" /> -->
                <view class="textarea-style">
                  <checkbox-group @change="checkboxChange1">
                    <view class="contents" v-for="(item, i) in contents" :key='i' v-if="item.isShowData">
                      <view class="title-name">
                        <image class="img" src="../../static/img/me.png" style="width: 32upx;height: 34upx;margin-right: 10upx;"
                          mode=""></image>
                        <view class="name">{{item.username}}&nbsp;{{addTimeTsp(item.addtime)}}</view>
                        <image class="img" @tap="deleteTap(item, 1)" src="../../static/img/del.png" style="width: 35upx;height: 30upx;margin-left: 10upx;margin-top: 8upx;"
                          mode=""></image>
                      </view>
                      <view class="content" v-if="item.intupShow === true">
                        <text>{{item.content}}</text>
                        <textarea class="textarea-style" style="border: 1px solid #e3e3e3;" v-model="item.content1" />
                        <view class="btn-content" @tap="contentEdit(item)">
                          提交
                        </view>
                      </view>
                      <view class="content" v-if="item.intupShow === false">
                        <checkbox v-if="formData.btype === 7" color="#d9233b" :value="item.id" :checked="item.checked" style="transform:scale(0.7)" />
                        <text class="texct">{{item.content}}</text>
                        <image @tap="contentTap(item, i)" class="img" src="../../static/img/update.png" style="width: 35upx;height: 34upx;" mode=""></image>
                      </view>
                    </view>
                  </checkbox-group>
                </view>
              </view>
            </view>
            <view class="from-content">
              <view class="left">
                业务方式<text class="text"></text>
              </view>
              <view class="right">
                <view class="radio-list">
                  <view class="radios">
                    <view class="circle" @tap="btypeTap(1)">
                      <text class="i" v-if="formData.btype === 1"></text>
                    </view>
                    记录
                  </view>
                  <view class="radios">
                    <view class="circle" @tap="btypeTap(6)">
                      <text class="i" v-if="formData.btype === 6"></text>
                    </view>
                    意见
                  </view>
                  <view class="radios">
                    <view class="circle" @tap="btypeTap(7)">
                      <text class="i" v-if="formData.btype === 7"></text>
                    </view>
                    整理
                  </view>
                </view>
              </view>
            </view>
            <view class="from-content">
              <view class="left">
                业务记录<text class="text"></text>
              </view>
              <view class="right">
                <textarea class="textarea-style" v-model="formData.content" />
              </view>
            </view>
            <view class="add-cancel-style">
              <view class="cancel-btn-style" @tap="back">取消</view>
              <view class="add-btn-style" @tap="install(1)">提交</view>
            </view>
          </view>
        </view>
      <!-- </swiper-item> -->
    <!-- </swiper> -->
    <uni-popup ref="popup" type="dialog">
        <uni-popup-dialog type="base" message="成功消息" content="确定要删除么？" :duration="2000" :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
    </uni-popup>
    <uni-popup ref="popup1" type="dialog">
        <uni-popup-dialog type="base" message="成功消息" content="确定要删除么？" :duration="2000" :before-close="true" @close="close" @confirm="TransactionDel"></uni-popup-dialog>
    </uni-popup>
    <uni-popup ref="popup2" type="dialog">
        <uni-popup-dialog type="base" message="成功消息" content="当前网络非wifi网络,确定继续下载么？" :duration="2000" :before-close="true" @close="close" @confirm="okGo"></uni-popup-dialog>
    </uni-popup>
    <uni-popup ref="popupMessage" type="center">
      <view class="Business-information">
        <view class="title">
          业务资料
        </view>
        <view class="one">
          <input type="text" class="input-style" v-model="keyFile" style="padding: 0 10upx;box-sizing: border-box;" />
          <view class="select-btn1" @tap="fileTap">
            <image class="sear" src="../../static/img/search1.png" mode=""></image>
          </view>
        </view>
        <scroll-view class="scroll-view" scroll-y="true" :scroll-top="0" v-if="wenshuIndex === 0">
          <view class="table_list" style="border: 1px solid #e3e3e3;">
            <t-table>
              <t-tr trBg="diagio-trBg" bgColor="#fff" color="#333333" fontSize="14">
                <t-th bgColor="#fff" widthStyle="15%">选择</t-th>
                <t-th bgColor="#fff" widthStyle="16%">分类</t-th>
                <t-th bgColor="#fff" widthStyle="69%">名称</t-th>
              </t-tr>
              <checkbox-group @change="checkboxChange">
                <t-tr v-for="(item, i) in Businesslist" :key="i" trBg="diagio-trBg">
                  <t-td widthStyle="15%" :teshu="true">
                    <view>
                      <checkbox color="#d9233b" :value="item.id" :checked="item.checked" style="transform:scale(0.7)" />
                    </view>
                  </t-td>
                  <t-td widthStyle="16%" :teshu="true">{{ item.dir_name }}</t-td>
                  <t-td widthStyle="69%" :teshu="true">{{ item.file_name }}</t-td>
                </t-tr>
              </checkbox-group>
            </t-table>
          </view>
        </scroll-view>
        <scroll-view class="scroll-view" scroll-y="true" :scroll-top="0" v-if="wenshuIndex === 1 || wenshuIndex === 2">
          <view class="table_list" style="border: 1px solid #e3e3e3;">
            <t-table>
              <t-tr trBg="diagio-trBg" bgColor="#fff" color="#333333" fontSize="14">
                <t-th bgColor="#fff" widthStyle="15%">选择</t-th>
                <t-th bgColor="#fff" widthStyle="85%">名称</t-th>
              </t-tr>
              <checkbox-group @change="checkboxChange">
                <t-tr trBg="diagio-trBg1" v-for="(item, i) in Businesslist" :key="i">
                  <t-td widthStyle="15%" :teshu="true">
                    <view>
                      <checkbox color="#d9233b" :value="item.id" :checked="item.checked" style="transform:scale(0.7)" />
                    </view>
                  </t-td>
                  <t-td widthStyle="85%" :teshu="true">{{ item.file_name }}</t-td>
                </t-tr>
              </checkbox-group>
            </t-table>
          </view>
        </scroll-view>
        <view class="page">
          <uni-pagination :total="count" :current="page" :pageSize="4" @change="paginationChange"></uni-pagination>
        </view>
        <view class="add-cancel-style">
          <view class="cancel-btn-style" @tap="close">取消</view>
          <view class="add-btn-style" @tap="choice">选择</view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>
<script>
  import uniPopup from '@/components/uni-popup/uni-popup.vue'
  import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
  import uniPagination from '@/components/uni-pagination/uni-pagination.vue'
  import tTable from '@/components/t-table/t-table.vue';
  import tTh from '@/components/t-table/t-th.vue';
  import tTr from '@/components/t-table/t-tr.vue';
  import tTd from '@/components/t-table/t-td.vue';
  
  export default {
    components: {
      uniPopup,
      uniPopupDialog,
      tTable,
      tTh,
      tTr,
      tTd,
      uniPagination
    },
    data () {
      return {
        showAnimation: false, //是否开启动画
        turnPageTime: .5,  //翻页动画时间
        prePage: '',
        curPage: '',
        nextPage: '',
        formData: {
          cus_name: '',
          cus_area: '',
          cus_linkman: '',
          cus_tel: '',
          cus_weburl: '',
          weight: '',
          cus_status: '',
          tixing: '',
          content: '',
          btype: 1,
          wenshu: '',
          wenshu_public: ''
        },
        contents: [],
        businessContent: '',
        infoId: '',
        regionList: [],
        regionIndex: -1,
        weightList: [
          {name: '高', id: 1},
          {name: '中', id: 2},
          {name: '低', id: 3},
          {name: '无', id: 4}
        ],
        weightIndex: -1,
        wenshu_public: '',
        sendOutList: [],
        wenshu: '',
        wenshuPublicList: [],
        wenshuList: [],
        sendOutList1: [],
        choiceList: [],
        Businesslist: [],
        wenshuPrivateList: [],
        sendOutList2: [],
        page: 1,
        count: '',
        keyFile: '',
        checkedList: [],
        contentList: [],
        colorComplete: 0,
        fileName: '',
        fileUrl: '',
        wenshuIndex: -1,
        currencyExamine: false,
        relevantExamine: false,
        exclusiveExamine: false,
        styleAdd: false,
        styleAdd1: false,
        deleteIndex: -1,
        tableList: [],
        pages: 1,
        current: 0,
        windowHeight: 0,
        leftRight: -1,
        touchX: 0,
        next: false,  //用户是否正在翻下一页
        pre: false,  //用户是否正在翻上一页
        windowWidth: 0,
        nextPageReady: false,
        prePageReady: false,
        delList: [],
        key: '',
        userArea: '',
        sts: '',
        infoTop: ''
      }
    },
    onLoad(option) {
      console.log(option)
      const that = this
      if (option.id) {
        that.infoId = option.id
        that.key = option.key
        that.userArea = option.userArea
        that.sts = option.sts
        that.infoTop = option.top
        that.init()
        that.limitMethods()
        that.pages = Number(option.page)
        this.getSystemInfo()
        that.chanelTap2()
      }
    },
    onNavigationBarButtonTap(options) {
      console.log(options)
      if (options.index === 0) {
        this.back();
      } else if (options.index === 1) {
        // uni.reLaunch({
        //   url: "./customer"
        // })
        this.back();
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
    methods: {
      // 转渠道
      cusToDitchTap () {
        const that = this
        that.$api.cusToDitchApi({
          id: that.infoId
        }).then(res => {
          uni.showToast({
            title: '提交成功',
            duration: 2000,
            icon: 'none'
          });
        })
      },
      // * 获取设备信息
      getSystemInfo() {
        const { windowWidth, windowHeight, statusBarHeight, platform, pixelRatio } = uni.getSystemInfoSync()
        //获取一些必要的设备参数
        this.windowWidth = windowWidth
        this.windowHeight = windowHeight
      },
      // * 触摸开始
      touchStart(e) {
        this.showAnimation = false
        this.touchX = e.touches[0].clientX;
      },
      touchMove (e) {
        const that = this
        let delta = 0
        delta = e.touches[0].clientX - this.touchX;
        // 限制边界
        if (delta>this.windowWidth) {
          delta = this.windowWidth
        }
        if (delta<-this.windowWidth) {
          delta = -this.windowWidth
        }
        this.delta = e.touches[0].clientX;
        // if (that.leftRight)
        if (this.next && this.nextPageReady) {   //首次翻下一页之后
          console.log(698555, delta)
          // 限制边界
          if (delta>0) {
            delta = 0
          }
          if (that.infoId !== that.tableList[that.tableList.length - 1].id) {
            if(delta < -100) {
              this.prePage = `(${-this.windowWidth+delta}px,0)`
              this.curPage = `(${delta}px,0)`
              this.nextPage = `(${this.windowWidth+delta}px,0)`
            }
          }
        }
        // 首次翻下一页
        if (!this.pre && !this.next && delta < -100) {
          console.log(698555666,delta)
          this.next = true
          if (that.infoId !== that.tableList[that.tableList.length - 1].id) {
            if (this.nextPageReady) {  //页面准备好了
                this.prePage = `(${-this.windowWidth+delta}px,0)`
                this.curPage = `(${delta}px,0)`
                this.nextPage = `(${this.windowWidth+delta}px,0)`
            } else {  //下一章已经准备好了
              this.prePage = `(${-this.windowWidth+delta}px,0)`
              this.curPage = `(${delta}px,0)`
              this.nextPage = `(${this.windowWidth+delta}px,0)`
            }
          }
        }
        if (this.pre && this.nextPageReady) {   //首次翻上一页之后
          console.log(123999)
          // 限制边界
          if (delta<0) {
            delta = 0
          }
          if (that.infoId !== that.tableList[0].id) {
            if(delta > 100) {
              this.prePage = `(${-this.windowWidth+delta}px,0)`
              this.curPage = `(${delta}px,0)`
              this.nextPage = `(${this.windowWidth+delta}px,0)`
            }
          }
        }
        if (!this.pre && !this.next && delta > 100) {  //首次翻上一页
          console.log(delta, 6)
          this.pre = true
          if (that.infoId !== that.tableList[0].id) {
            if (this.prePageReady) {  //页面准备好了
              this.prePage = `(${-this.windowWidth+delta}px,0)`
              this.curPage = `(${delta}px,0)`
              this.nextPage = `(${this.windowWidth+delta}px,0)`
            }
            else {  //上一章已经准备好了
              this.prePage = `(${-this.windowWidth+delta}px,0)`
              this.curPage = `(${delta}px,0)`
              this.nextPage = `(${this.windowWidth+delta}px,0)`
            }
          }
        }
      },
      async touchEnd (e) {
        const that = this
        this.showAnimation = true
        let touchIndex = e.changedTouches[0].pageX;
        let tranX = touchIndex - this.touchX;
        // 在一定区域里面移动，这里限制在一定区域内移动，图标不超过规定的区域
        if (tranX > 100) {
          uni.showLoading({
            title: '加载中'
          })
          console.log(1)
          if (that.tableList[0].id === that.infoId) {
            if (that.pages === 1) {
              uni.showToast({
                title: '已是第一条',
                duration: 2000,
                icon: 'none'
              });
              uni.hideLoading()
            } else {
              that.pages--
              await that.chanelTap2(1)
              // uni.hideLoading()
              // this.chapterRotate('pre')
            }
          } else {
            this.nextPage = this.curPage
            this.curPage = this.prePage
            this.prePage = `(${-this.windowWidth}px,0)`
            that.leftRight = 1
            let infoId = 0
            this.showAnimation = false
            that.tableList.filter((item, i) => {
              if (item.id === that.infoId) {
                if (i !== 0) {
                  infoId = that.tableList[i-1].id
                }
              }
            })
            that.infoId = infoId
            console.log(that.infoId)
            uni.hideLoading()
            that.init()
            setTimeout(()=> {
              this.showAnimation = true
              this.prePage = `(${-this.windowWidth}px,0)`
              this.curPage = `(0,0)`
              this.nextPage = `(${this.windowWidth}px,0)`
            },50)
          }
        } else if (tranX < -100) {
          uni.showLoading({
            title: '加载中'
          })
          let showChapter = false
          if (that.infoId === that.tableList[that.tableList.length-1].id) {
            showChapter = true
            that.pages++
            await that.chanelTap2(0)
            // uni.hideLoading()
            console.log(435345345)
          } else {
            console.log(66666)
            that.leftRight = 2
            this.prePage = this.curPage
            this.curPage = this.nextPage
            this.nextPage = `(0,0)`
            let infoId = 0
            this.showAnimation = false
            that.tableList.filter((item, i) => {
              if (item.id === that.infoId) {
                if (i !== that.tableList.length - 1) {
                  infoId = that.tableList[i+1].id
                }
              }
            })
            that.infoId = infoId
            that.init()
            that.$forceUpdate()
            // that.current = 0
            // that.pages ++;
            // await that.chanelTap()
            // console.log(this.tableList)
            uni.hideLoading()
            setTimeout(()=> {
              // this.showAnimation = true
              this.prePage = `(${-this.windowWidth}px,0)`
              this.curPage = `(0,0)`
              this.nextPage = `(${this.windowWidth}px,0)`
            },50)
          }
        }
        this.next = false
        this.pre = false
      },
      // 取消触摸
      touchcancel() {
        //取消翻页,重置页面
        this.showAnimation = false
        this.prePage = `(${-this.windowWidth}px,0)`
        this.curPage = `(0,0)`
        this.nextPage = `(${this.windowWidth}px,0)`
        this.next = false
        this.pre = false
      },
      // 左右列表数据轮换
      async chapterRotate(type) {
        const that = this
        if (type === 'next') {
          that.pages++;
          await that.chanelTap(0)
        }
        if (type === 'pre') {
          that.pages--;
          await this.chanelTap(1)
        }
      },
      // 下一条
      nextTap (i) {
        console.log(i)
        const that = this
        uni.showLoading({
          title: '加载中'
        })
        that.current === 0 ? that.current = 1 : that.current === 1 ? that.current = 2 : that.current = 0;
        if (that.infoId === that.tableList[that.tableList.length-1].id) {
          that.pages++
          that.chanelTap2(0)
          uni.hideLoading()
        } else {
          console.log(66666)
          that.leftRight = 2
          let infoId = 0
          that.tableList.filter((item, i) => {
            if (item.id === that.infoId) {
              if (i !== that.tableList.length - 1) {
                infoId = that.tableList[i+1].id
              }
            }
          })
          that.infoId = infoId
          console.log(that.infoId)
          that.init()
          that.$forceUpdate()
          uni.hideLoading()
        }
        if (i === 2) {
          that.chanelTap2()
        }
      },
      chanelTap2(i) {
        const that = this
        uni.showLoading({
          title: '加载中'
        })
        this.$api.customerApi({
          "page": that.pages,    //页码，整数大于0，必填
          pageSize: 10,
		  "key": this.key,
		  'userArea': this.userArea,
		  'sts': this.sts
        }).then(res => {
          if (res.data.status === 200) {
            if (res.data.data.list.length > 0) {
              that.tableList = res.data.data.list
              if (i === 0) {
                that.infoId = that.tableList[0].id
                this.prePage = this.curPage
                this.curPage = this.nextPage
                this.nextPage = `(0,0)`
                this.showAnimation = false
                setTimeout(()=> {
                  // this.showAnimation = true
                  this.prePage = `(${-this.windowWidth}px,0)`
                  this.curPage = `(0,0)`
                  this.nextPage = `(${this.windowWidth}px,0)`
                },50)
                that.init()
              } else if (i === 1) {
                that.infoId = that.tableList[that.tableList.length-1].id
                this.nextPage = this.curPage
                this.curPage = this.prePage
                this.prePage = `(${-this.windowWidth}px,0)`
                setTimeout(()=> {
                  this.showAnimation = true
                  this.prePage = `(${-this.windowWidth}px,0)`
                  this.curPage = `(0,0)`
                  this.nextPage = `(${this.windowWidth}px,0)`
                },50)
                that.init()
              }
              if(that.infoId === that.tableList[0].id) {
                that.prePageReady = false
                that.prePage = `(${-this.windowWidth}px,0)`
              } else {
                that.prePageReady = true
                that.prePage = `(${-this.windowWidth}px,0)`
              }
              if(that.infoId === that.tableList[that.tableList.length-1].id) {
                that.nextPageReady = false
                this.nextPage = `(0,0)`
              } else {
                that.nextPageReady = true
                this.nextPage = `(0,0)`
              }
            } else {
              uni.showToast({
                title: '无更多数据',
                duration: 2000,
                icon: 'none'
              });
            }
            uni.hideLoading()
          }
        })
      },
      chanelTap (i) {
        const that = this
        uni.showLoading({
          title: '加载中'
        })
        this.$api.customerApi({
          page: that.pages,    //页码，整数大于0，必填
          pageSize: 10
        }).then(res => {
          if (res.data.status === 200) {
            uni.hideLoading()
            that.tableList = res.data.data.list
            if (that.tableList.length > 0) {
              if (i === 1) {
                that.curPage = {   //本页数据
                  index: 0,
                  formData:  that.tableList[0],
                  pageTranslate: [
                    `(0,0)`,
                    `(0,0)`,
                    `(0,0)`
                  ]
                }
              } else if (i === 2) {
                that.curPage = {   //本页数据
                  index: that.tableList.length - 1,
                  formData:  that.tableList[that.tableList.length - 1],
                  pageTranslate: [
                    `(0,0)`,
                    `(0,0)`,
                    `(0,0)`
                  ]
                }
              }
              that.tableList.filter((item, i) => {
                if (item.id === that.infoId) {
                  console.log(i)
                  that.curPage = {   //本页数据
                    index: i,
                    formData:  item,
                    pageTranslate: [
                      `(0,0)`,
                      `(0,0)`,
                      `(0,0)`
                    ]
                  }
                }
              })
              if (that.curPage.index === 0) {
                that.prePage = {
                  ready: false,
                  pageTranslate: [
                    `(${-this.windowWidth}px,0)`,
                    `(${-this.windowWidth}px,0)`,
                    `(0,${-this.windowHeight}px)`
                  ]
                }
              } else {
                that.prePage = {
                  ready: true,
                  index: that.curPage.index - 1,
                  formData:  that.tableList[that.curPage.index - 1],
                  pageTranslate: [
                    `(${-this.windowWidth}px,0)`,
                    `(${-this.windowWidth}px,0)`,
                    `(0,${-this.windowHeight}px)`
                  ]
                }
              }
              if (that.curPage.index === that.tableList.length - 1) {
                that.nextPage = {
                  ready: false,
                  pageTranslate: [
                    `(0,0)`,
                    `(0,0)`,
                    `(0,${this.windowHeight}px)`
                  ]
                }
              } else {
                that.nextPage = {
                  ready: true,
                  index: that.curPage.index + 1,
                  formData:  that.tableList[that.curPage.index + 1],
                  pageTranslate: [
                    `(0,0)`,
                    `(0,0)`,
                    `(0,${this.windowHeight}px)`
                  ]
                }
              }
            }
            // console.log(that.prePage, that.nextPage)
            if (i === 1 || i === 2) {
              that.infoId = that.curPage.formData.id
              that.init()
            }
            console.log(that.curPage)
          }
        })
      },
      limitMethods () {
        const that = this
        let dpLimit = uni.getStorageSync('dpLimit');
        let uid = uni.getStorageSync('uid');
        console.log(dpLimit)
        if (dpLimit.length > 0) {
          // 关联文书审核: 298
          // 通用资料审核: 299 
          // 专属资料审核 300
          dpLimit.filter(item => {
            if (Number(item) === 298) {
              that.relevantExamine = true
            }
            if (Number(item) === 299) {
              that.currencyExamine = true
            }
            if (Number(item) === 300) {
              that.exclusiveExamine = true
            }
          })
        }
        if (Number(uid) === 1) {
          that.currencyExamine = true
          that.relevantExamine = true
          that.exclusiveExamine = true
        }
      },
      // 完整记录
      CompleteTap () {
        this.contents.filter(item => {
          item.isShowData = true
        })
        this.colorComplete = 1
      },
      // 业务方式
      btypeTap (i) {
        this.formData.btype = i
        this.$forceUpdate()
      },
      // 管理时.
      checkboxChange1 (e) {
        console.log(e)
        const that = this
        let checked = e.detail.value
        let contents = that.contents
        let list = [];
        that.checkedList = e.detail.value
        that.contentList = [];
        let data = ''
        for (var i = 0; i < contents.length; i++) {
          for (var j = 0; j < checked.length; j++) {
            if (contents[i].id === checked[j]) {
              list.push(contents[i]);
            }
          }
        }
        that.contentList = list
        // data += that.formData.content ? that.formData.content : ''
        for (var i = 0; i < that.contentList.length; i++) {
          data += that.addTimeTsp(that.contentList[i].addtime) + "\n" + that.contentList[i].content + "\n"
        }
        that.formData.content = data
        console.log(that.formData.content)
        this.$forceUpdate()
      },
      // 多选
      checkboxChange: function (e) {
        console.log(e.detail.value)
        const that = this
        that.choiceList = e.detail.value
      },
      fileTap () {
        const that = this
        if (that.wenshuIndex === 0) {
          // 文书列表
          that.$api.fileListApi({
            page: that.page,
            key: that.keyFile,
            pageSize: 4
          }).then(res => {
            if (res.data.status === 200) {
              that.Businesslist = res.data.data.list
              that.count = Number(res.data.data.count)
              that.$refs.popupMessage.open()
            }
          })
        } else if (that.wenshuIndex === 1) {
          // 文书列表
          that.$api.wenshuListApi({
            page: that.page,
            key: that.keyFile,
            pageSize: 4
          }).then(res => {
            if (res.data.status === 200) {
              let list = res.data.data.list
              let Businesslist = []
              if (list.length > 0) {
                list.filter((item, i) => {
                  Businesslist.push({
                    id: item.id,
                    file_name: item.name,
                    file_path: item.file_path,
                    type: item.type,
                    username: item.username
                  })
                })
              }
              that.Businesslist = Businesslist
              that.count = Number(res.data.data.count)
              that.$refs.popupMessage.open()
            }
          })
        } else if (that.wenshuIndex === 2) {
          // 专属资料列表
          that.$api.businessPrivateApi({
            page: that.page,
            key: that.keyFile,
            pageSize: 4
          }).then(res => {
            if (res.data.status === 200) {
              let list = res.data.data.list
              let Businesslist = []
              if (list.length > 0) {
                list.filter((item, i) => {
                  Businesslist.push({
                    id: item.id,
                    file_name: item.file_name,
                    file_path: item.file_path
                  })
                })
              }
              that.Businesslist = Businesslist
              that.count = Number(res.data.data.count)
              that.$refs.popupMessage.open()
            }
          })
        }
      },
      // 分页
      paginationChange (e) {
        console.log(e)
        const that = this
        that.page = e.current
        // 文书列表
        that.fileTap()
      },
      // 待审核
      examineTap (val, i) {
        const that = this
        console.log(val, i)
        if (i === 0) {
          if (that.currencyExamine === true) {
            that.examineTrial(val.id)
          } else {
            uni.showToast({
              title: '您暂无审核权限',
              duration: 2000,
              icon: 'none'
            });
          }
        } else if (i === 1) {
          if (that.relevantExamine === true) {
            that.examineTrial(val.id)
          } else {
            uni.showToast({
              title: '您暂无审核权限',
              duration: 2000,
              icon: 'none'
            });
          }
        } else if (i === 2) {
          if (that.exclusiveExamine === true) {
            that.examineTrial(val.id)
          } else {
            uni.showToast({
              title: '您暂无审核权限',
              duration: 2000,
              icon: 'none'
            });
          }
        }
      },
      examineTrial (id) {
        const that = this
        that.$api.fileTrialApi({id: id}).then(res => {
          if (res.data.status === 200) {
            uni.showToast({
              title: '审核通过',
              duration: 2000,
              icon: 'none'
            });
            that.init()
          } else {
            uni.showToast({
              title: '审核失败',
              duration: 2000,
              icon: 'none'
            });
          }
        })
      },
      // 分享到微信
      shareWeixin (val, i) {
        console.log(val)
        const that = this
        uni.showLoading({
          title: '加载中'
        });
        if (i === 1) {
          let fileName = val.file_path.substring(val.file_path.lastIndexOf(".")+1);
          that.fileName = val.file_name + '.' + fileName;
        } else {
          that.fileName = val.file_name
        }
        const FileShare= uni.requireNativePlugin('life-FileShare');
        
        that.fileUrl = "http://mkmngsys.mitech-ndt.com/" + val.file_path
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
      // 打开文件
      openFile (val) {
        console.log(val)
        let config = "http://mkmngsys.mitech-ndt.com/"
        uni.downloadFile({
          // 下面一行时拼接预览PDF的地址！！！
          url: config + val,
          success: function(res) {
            var filePath = res.tempFilePath;
            if (!filePath) return
            uni.openDocument({
              filePath: filePath,
              success: function(res) {
                console.log(res);
                console.log('打开文档成功');
              }
            });
          }
        });
      },
      // 打开弹出窗
      open(i){
        const that = this
        console.log(123)
        that.wenshuIndex = i
        console.log(that.wenshuIndex)
        that.keyFile = ''
        that.page = 1
        that.fileTap()
      },
      // 选择
      choice () {
        const that = this
        var Businesslist = that.Businesslist, arr = [], arr1 = [];
        for (var i = 0; i < Businesslist.length; i++) {
          for (var j = 0; j < that.choiceList.length; j++) {
            if (Businesslist[i].id === that.choiceList[j]) {
              if (that.wenshuIndex === 0) {
                that.sendOutList.push(Businesslist[i])
              } else if (that.wenshuIndex === 1) {
                console.log(that.sendOutList1)
                that.sendOutList1.push(Businesslist[i])
              } else if (that.wenshuIndex === 2) {
                console.log(that.sendOutList2)
                that.sendOutList2.push(Businesslist[i])
              }
            }
          }
        }
        if (that.wenshuIndex === 0 || that.wenshuIndex === 2) {
          if (that.wenshuIndex === 0) {
            that.wenshuPublicList = that.choiceList
          } else if (that.wenshuIndex === 2) {
            that.wenshuPrivateList = that.choiceList
          }
          if (that.Businesslist.length > 0) {
            that.styleAdd = true
          }
          console.log(that.wenshuPublicList)
        } else if (that.wenshuIndex === 1) {
          that.wenshuList = that.choiceList
          if (that.Businesslist.length > 0) {
            that.styleAdd1 = true
          }
        }
        that.close()
      },
      // 添加发送项
      addSendOut () {
        const that = this
        that.$api.gePublictFileByIdApi({
          id: that.wenshu_public
        }).then(res => {
          if (res.data.status === 200) {
            that.sendOutList.push(res.data.data)
            that.wenshuPublicList.push(res.data.data.id)
          } else {
            uni.showToast({
              title: '未搜索到',
              duration: 2000,
              icon: 'none'
            });
          }
        })
      },
      // 提交
      contentEdit (val) {
        const that = this
        that.$api.upConApi({
          id: val.id,
          content: val.content1
        }).then(res => {
          if (res.data.status === 200) {
            uni.showToast({
                title: '修改成功',
                duration: 2000,
                icon: 'none'
            });
            that.close()
            that.init()
          }
        })
      },
      contentTap (val, i) {
        const that = this
        that.contents[i].intupShow = true
        that.$forceUpdate()
      },
      // 删除往来记录
      deleteTap (val, i) {
        const that = this
        that.$refs.popup1.open()
        that.delId = val.id
        that.deleteIndex = i
      },
      TransactionDel () {
        const that = this
        if (that.deleteIndex === 1) {
          that.$api.contentDelApi({id: that.delId}).then(res => {
            if (res.data.status === 200) {
              uni.showToast({
                  title: '删除成功',
                  duration: 2000,
                  icon: 'none'
              });
              that.close()
              that.init()
            }
          })
        } else if (that.deleteIndex === 0) {
          that.$api.cusdataFileDelApi({id: that.delId}).then(res => {
            if (res.data.status === 200) {
              uni.showToast({
                  title: '删除成功',
                  duration: 2000,
                  icon: 'none'
              });
              that.close()
              that.init()
            }
          })
        }
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
          that.formData.cus_status = i
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
      init () {
        const that = this
        // 区域列表
        that.$api.areaListApi().then(res => {
          if (res.data.status === 200) {
            that.regionList = res.data.data
          }
        })
        that.$api.CusDetailInfoApi({id: that.infoId}).then(res => {
          if (res.data.status === 200) {
            that.formData = res.data.data.info
            if (!that.formData.btype) {
              that.formData.btype = 1
            }
            if (res.data.data.info.wenshu_public) {
              that.sendOutList = res.data.data.info.wenshu_public
            } else {
				that.sendOutList = null
			}
            if (res.data.data.info.wenshu) {
              that.sendOutList1 = res.data.data.info.wenshu
            } else {
				that.sendOutList1 = null
			}
            if (res.data.data.info.wenshu_private) {
              that.sendOutList2 = res.data.data.info.wenshu_private
            } else {
				that.sendOutList2 = null
			}
            that.contents = res.data.data.contents
            that.contents.filter((wei, w) => {
              wei.intupShow = false
              wei.isShowData = false
              wei.content1 = wei.content
              if (Number(wei.isshow) === 0) {
                wei.isShowData = true
              }
            })
            // 权重
            that.weightList.filter((wei, w) => {
              if (Number(wei.id) === Number(that.formData.weight)) {
                that.weightIndex = w
              }
            })
            // 区域
            if (that.regionList.length > 0) {
              that.regionList.filter((item, i) => {
                if (Number(item.id) === Number(that.formData.cus_area)) {
                  that.regionIndex = i
                }
              })
            }
          }
        })
      },
      // 删除
      del () {
        const that = this
        that.$refs.popup.open()
        // that.$api.CusDelApi({id: that.infoId}).then(res => {
        //   if (res.data.status === 200) {
        //     uni.showToast({
        //         title: '删除成功',
        //         duration: 2000,
        //         icon: 'none'
        //     });
        //     setTimeout(() => {
        //       uni.switchTab({
        //         url: "./customer"
        //       })
        //     }, 1000)
        //   }
        // })
      },
      confirm () {
        const that = this
        that.$api.CusDelApi({id: that.infoId}).then(res => {
          if (res.data.status === 200) {
            uni.showToast({
                title: '删除成功',
                duration: 2000,
                icon: 'none'
            });
            that.delList.push(that.infoId)
            that.nextTap(2)
          }
        })
      },
      close () {
        this.$refs.popup.close()
        this.$refs.popup1.close()
        this.$refs.popupMessage.close()
        this.$refs.popup2.close()
      },
      // 下拉菜单发生改变时---权重
      bindPickerChange1 ($event) {
        console.log($event)
        const that = this
        that.weightIndex = $event.detail.value
        that.formData.weight = that.weightList[that.weightIndex].id
      },
      // 下拉菜单发生改变时---区域
      bindPickerChange ($event) {
        console.log($event)
        const that = this
        that.regionIndex = $event.detail.value
        that.formData.cus_area = that.regionList[that.regionIndex].id
      },
      back () {
        let data = {}
        data.page = this.pages
        data.infoId = this.infoId
        uni.setStorageSync('customerData', data);
        // uni.reLaunch({
        //   url: "./customer"
        // })
        this.$store.commit("customerIdKey", this.infoId);
        let value = {}
        value.id = this.infoId
        value.top = this.infoTop
        uni.setStorageSync('customerIdKey', value);
        this.$store.commit("customerDelListKey", this.delList);
        this.$store.commit("customerTopScrollKey", 1);
        uni.switchTab({
          url: "./customer"
        })
      },
      // 提交
      install (i) {
        const that = this
        let data = {}
        if (that.formData.btype === 7) {
          that.checkedList.filter((item, i) => {
            data["checkboxTidy[" + i + "]"] = item
          })
        }
        let wenshu_public = null
        if (that.wenshuPublicList.length > 0) {
          console.log(that.wenshuPublicList)
          wenshu_public = that.wenshuPublicList.join(',');
        }
        let wenshu = null
        if (that.wenshuList.length > 0) {
          wenshu = that.wenshuList.join(',');
        }
        let wenshu_private = null
        if (that.wenshuPrivateList.length > 0) {
          wenshu_private = that.wenshuPrivateList.join(',');
        }
        console.log(wenshu, wenshu_public)
        that.$api.cusEditApi({
          id: that.infoId,
          cusArea: that.formData.cus_area,
          cusName: that.formData.cus_name,
          cusLinkman: that.formData.cus_linkman,
          cusTel: that.formData.cus_tel,
          cusWeburl: that.formData.cus_weburl,
          cusStatus: that.formData.cus_status,
          tixing: that.formData.tixing,
          weight: that.formData.weight,
          btype: that.formData.btype,
          content: that.formData.content,
          wenshu_public: wenshu_public,
          wenshu: wenshu,
          wenshu_private: wenshu_private,
          ...data
        }).then(res => {
          if (res.data.status === 200) {
            uni.showToast({
                title: '修改成功',
                duration: 2000,
                icon: 'none'
            });
            if (i === 0) {
              that.init()
              that.limitMethods()
              that.styleAdd = false
              that.styleAdd1 = false
              console.log(that.wenshuPublicList, that.wenshuList)
            } else {
              setTimeout(() => {
                uni.switchTab({
                  url: "./customer"
                })
              }, 1000)
            }
          }
        })
      },
      run () {
        const that = this
        that.$api.indexStatusApi().then(res => {
          if (res.data.status === 200) {
            // 修改全局变量
            getApp().globalData.trial = Number(res.data.data.trial);
            let trial = uni.getStorageSync('trial');
            if (Number(trial) !== 1 || !trial) {
              uni.setStorageSync('trial', res.data.data.trial);
              console.log(123)
              if (Number(res.data.data.trial) === 1) {
                console.log(456)
                this.plusPush()
              } else {
                console.log(1010)
              }
            } else {
              console.log(789)
              uni.setStorageSync('trial', res.data.data.trial);
            }
            if (Number(res.data.data.trial) === 1) {
              uni.showTabBarRedDot({
                index: 1
              })
            } else {
              uni.hideTabBarRedDot({
                index: 1
              })
            }
          }
        })
      },
      // 单选框
      purposeTap (id) {
        const that = this
        that.formData.zc_type = id
      }
    }
  }
</script>

<style lang="less" scoped>
  .fundApplication {
    width: 100%;
    .container{
      height: 100%;
      width: 100%;
      position: fixed;
      // top: 180upx;
      // left: 0;
      overflow: overlay;
      height: calc(100% - 40px);
      background: #f9f9f9;
      // flex-flow: column nowrap;
      // justify-content: center;
      // align-items: center;
    }
    .top-btn {
      width: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      height: 80upx;
      line-height: 80upx;
      margin-top: 16upx;
      .btn {
        background-color: #ffffff;
        flex: 1;
        font-size: 30upx;
        color: #d9233b;
        font-family: "Source Han Sans CN";
        text-align: center;
        margin: 0 12upx;
        border-radius: 8upx;
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
          width: 120upx;
          font-size: 30upx;
          color: #000000;
          justify-content: left;
          align-items: center;
          display: flex;
          color: #333333;
          font-family: "Source Han Sans CN";
          box-sizing: border-box;
          text.text {
            display: inline-block;
            // width: 90upx;
          }
        }
        .left2 {
          width: 90upx;
          box-sizing: border-box;
          padding-left: 28upx;
        }
        .left1 {
          height: 130upx;
          line-height: 130upx;
        }
        .right1 {
          width: 180upx;
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
            min-height: 220upx;
            border-radius: 3upx;
            background-color: #ffffff;
            border: 2.7777777777777777upx solid #fff;
            padding: 20upx;
            box-sizing: border-box;
            font-size: 30upx;
            color: #000000;
            font-family: "Ping Fang";
            .contents {
              box-sizing: border-box;
              padding-bottom: 15upx;
              .title-name {
                display: flex;
                flex-direction: row;
                font-size: 30upx;
                letter-spacing: 1upx;
                color: #333333;
                font-family: "Source Han Sans CN";
                overflow: hidden;
                .name {
                  padding-top: 4upx;
                  box-sizing: border-box;
                  float: left;
                }
                image.img {
                  float: left;
                  margin-top: 8upx;
                }
              }
              .content {
                font-size: 30upx;
                letter-spacing: -1upx;
                line-height: 45upx;
                color: #666666;
                text-align: left;
                overflow: hidden;
                font-family: "Source Han Sans CN";
                padding-top: 6upx;
                text.texct {
                }
                image.img {
                  margin-top: 8upx;
                  margin-left: 10upx;
                }
              }
              .btn-content {
                width: 80upx;
                box-sizing: border-box;
                height: 50upx;
                border-radius: 4upx;
                background-color: #d9233b;
                font-size: 26upx;
                letter-spacing: 1upx;
                line-height: 50upx;
                color: #ffffff;
                font-family: "Ping Fang";
                text-align: center;
                margin-top: 10upx;
              }
            }
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
            width: 100%;
            height: 83upx;
            border-radius: 3upx;
            background-color: #ffffff;
            border: 2.7814814814814817upx solid #fff;
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
        .right-choice {
          display: flex;
          flex-direction: column;
          .one {
            display: flex;
            flex-direction: row;
            .select-btn {
              width: 200upx;
            }
            .bg-color {
              background: #CCCCCC;
            }
          }
          .two {
            box-sizing: border-box;
            .list {
              overflow: hidden;
              display: flex;
              flex-direction: row;
              align-items: center;
              box-sizing: border-box;
              padding-top: 15upx;
              .content {
                width: auto;
                font-size: 30upx;
                letter-spacing: 1upx;
                line-height: 40upx;
                color: #010101;
                font-family: "Ping Fang";
                padding-right: 20upx;
                box-sizing: border-box;
              }
              .del {
                box-sizing: border-box;
                display: flex;
                flex-direction: row;
              }
            }
          }
          .select-btn {
            width: 165upx;
            height: 83upx;
            border-radius: 8upx;
            background-color: #d9233b;
            font-size: 30upx;
            letter-spacing: 1upx;
            line-height: 83upx;
            color: #ffffff;
            text-align: center;
            margin-left: 15upx;
            font-family: "Ping Fang";
            box-sizing: border-box;
          }
          .three-btn {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            .three-btn1:first-child{
              margin-left: 0;
            }
            .three-btn1:last-child{
              margin-right: 0;
            }
            .three-btn1{
              flex: 1;
              height: 75upx;
              border-radius: 8upx;
              padding: 0 10upx;
              background-color: #d9233b;
              font-size: 30upx;
              letter-spacing: 1upx;
              line-height: 75upx;
              color: #ffffff;
              text-align: center;
              margin: 6upx 15upx 0;
              font-family: "Ping Fang";
              box-sizing: border-box;
            }
            .three-btn2 {
              background: none;
              color: none;
            }
            .nostyleAdd {
              background: #CCCCCC;
            }
            .styleAdd {
              background: #fdeef1;
              color: #d9233b;
            }
          }
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
        width: 136upx;
        height: 80upx;
        border-radius: 2upx;
        background-color: #d9233b;
        font-size: 32upx;
        letter-spacing: 1upx;
        line-height: 80upx;
        color: #ffffff;
        font-family: "Adobe Heiti Std";
        margin-right: 68upx;
        text-align: center;
      }
      .cancel {
        text-align: center;
        font-size: 32upx;
        letter-spacing: 1upx;
        line-height: 80upx;
        color: #000000;
        font-family: "Adobe Heiti Std";
        width: 136upx;
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
      height: 600upx;
      overflow: hidden;
      overflow-y: scroll;
      margin-top: 30upx;
      padding-bottom: 20upx;
      box-sizing: border-box;
      // border: 1px solid #e3e3e3;
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
