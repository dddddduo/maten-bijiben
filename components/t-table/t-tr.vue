<template>
	<view class="t-tr" :class="trBg">
		<view v-if="isCheck" class="t-check-box" :style="{ 'border-width': thBorder + 'px' ,'border-color':borderColor, 'background': bgColor}">
			<checkbox-group @change="checkboxChange">
				<checkbox :value="checkboxData.value + ''" :checked="checkboxData.checked" />
			</checkbox-group>
		</view>
		<slot></slot>
    <i class="line" v-if="lineShow === false" style="position: absolute;bottom: 0;left: 18upx;right: 18upx;"></i>
	</view>
</template>

<script>
	export default {
		props: {
			fontSize: String,
			color: String,
			align: String,
      bgColor: String,
      trBg: String,
      teshu: Boolean,
      lineShow: Boolean
		},
		inject: ['table'],
		provide() {
			return {
				tr: this
			};
		},
		data() {
			return {
				isCheck: false,
				checkboxData: {
					value: 0,
					checked: false
				},
				checked: false,
				thBorder: '1',
				borderColor: '#d0dee5'
			};
		},
		created() {
			this.thBorder = this.table.border;
			this.borderColor = this.table.borderColor;
			this.table.childrens.push(this);
			this.checkboxData.value = this.table.index++;
			this.isCheck = this.table.isCheck;

		},
		methods: {
			checkboxChange(e) {
				this.checkboxData.checked = !this.checkboxData.checked;
				this.table.childrens[this.checkboxData.value] = this;
				this.table.fire(e.detail.value[0] ? true : false, this.checkboxData.value, this.table.index);
			}
		}
	};
</script>

<style>
	.t-tr {
		width: 100%;
		display: flex;
    background: #fff;
    height: 90upx;
    overflow: hidden;
    position: relative;
    box-sizing: border-box;
	}
  .diagio-trBg {
    height: auto;
    box-sizing: border-box;
    display: flex;
    align-items: center;
  }
  /* .t-tr .line {
    width: 100%;
    height: 1px;
    border-bottom: 1upx solid #e5e5e5;
    background: #fff;
    position: absolute;bottom: 0;left: 18upx;right: 18upx;
    bottom: 0;
    left: 18upx;
    right: 18upx;
  } */
  .t-tr .line {
    position: relative;
    height: 1upx;
    width: 100%;
  }
  .t-tr .line:after{
    content:'';
    border-top:1px solid #e5e5e5;
    height:315%;
    width:315%;
    -webkit-transform: scale(0.3);
    transform:0.3;
    transform-origin: 0 0;
    -webkit-transform: 0 0;
    position: absolute;
    top:0;
    left:0;
  }
  .t-tr:first-child .line {
    display: none;
  }
  .t-tr:last-child .line {
    display: none;
  }
  .diagio-trBg:first-child .line {
    display: inline-block;
  }
  .diagio-trBg1:first-child .line {
    display: inline-block;
  }
  .t-td-teshu .line {
    /* width: 100%; */
    height: 1px;
    background: #e5e5e5;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .trBg {
    /* padding: 0 52upx; */
    box-sizing: border-box;
  }

	.t-tr t-th,
	.t-tr t-td {
		display: flex;
		flex: 1;
	}

	.t-tr .t-check-box {
		flex-shrink: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 80upx;
		color: #3b4246;
		/* border-left: 1px #d0dee5 solid; */
		/* border-top: 1px #d0dee5 solid; */
	}

	.t-tr .t-check-box checkbox {
		transform: scale(0.8);
	}
</style>
