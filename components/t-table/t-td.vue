<template>
	<view class="t-td" :class="teshu ? 't-td-teshu' : ''" :style="{ 'width': widthStyle, 'border-width': thBorder + 'px','font-size':fontSizes ,'color':colors, 'padding': paddingStyle}">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		props: {
			align: String,
      widthStyle: String,
      teshu: Boolean,
      paddingStyle: String,
      fontSizes: String,
      colors: String
		},
		data() {
			return {
				thBorder: '1',
				borderColor: '#d0dee5',
				fontSize: '14',
				color: '#555c60',
				tdAlign: 'center'
			};
		},
		inject: ['table', 'tr'],

		created() {
			this.thBorder = this.table.border;
			this.borderColor = this.table.borderColor;
			this.fontSize = this.tr.fontSize;
			this.color = this.tr.color;
			if (this.align) {
				this.tdAlign = this.align;
			} else {
				this.tdAlign = this.tr.align
			}
		},
		computed: {
			tdAlignCpd() {
				let nameAlign = '';
				switch (this.tdAlign) {
					case 'left':
						nameAlign = 'flex-start'
						break;
					case 'center':
						nameAlign = 'center'
						break;
					case 'right':
						nameAlign = 'flex-end'
						break;
					default:
						nameAlign = 'center'
						break;
				}
				return nameAlign
			}
		}
	};
</script>

<style>
	.t-td {
		width: 100%;
		padding: 0 8upx;
    height: 90upx;
    line-height: 90upx;
    display: flex;
    overflow: hidden;
    /* align-items: center; */
		font-size: 30upx;
    letter-spacing: 2upx;
    color: #000000;
    font-family: "Ping Fang";
    word-break: break-all;
    box-sizing: border-box;
    text-overflow:ellipsis;
    display:-webkit-box; 
    -webkit-box-orient:horizontal;
    -webkit-line-clamp:2;
	}
  .t-td-teshu {
    height: auto;
    line-height: normal;
    display: flex;
    align-items: center;
    padding: 5upx 0;
    box-sizing: border-box;
    word-break: normal;
    text-decoration: inherit;
    display:-webkit-box; 
    -webkit-box-orient:inherit;
    -webkit-line-clamp:inherit;
  }
  .t-td:first-child{
    padding-left: 18upx;
  }
</style>
