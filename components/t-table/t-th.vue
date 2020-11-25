<template>
	<view class="t-th" :class="classStyle" :style="{ 'width': widthStyle, 'border-width': thBorder + 'px' ,'border-color':borderColor,'font-size':fontSize+'px' ,'color':color, 'background': bgColor, 'padding': paddingLeft, 'justify-content': textAlign}">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		props: {
			align: String,
      widthStyle: String,
      bgColor: String,
      paddingLeft: String,
      textAlign: String,
      classStyle: String
		},
		data() {
			return {
				thBorder: '1',
				borderColor: '#d0dee5',
				fontSize: '15',
				color: '#3b4246',
				thAlign: 'center'
			};
		},
		inject: ['table', 'tr'],

		created() {
			this.thBorder = this.table.border;
			this.borderColor = this.table.borderColor;
			this.fontSize = this.tr.fontSize;
			this.color = this.tr.color;
      // console.log(this.table, this.tr)
			if (this.align) {
				this.thAlign = this.align;
			} else {
				this.thAlign = this.tr.align
			}
		},

		computed: {
			thAlignCpd() {
				let nameAlign = '';
				switch (this.thAlign) {
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
	.t-th {
		/* flex: 1; */
		display: flex;
		padding: 0 8upx;
		align-items: center;
		text-align: left;
    height: 88upx;
		font-weight: 600;
    font-size: 30upx;
    letter-spacing: 2upx;
    color: #333333;
    font-family: "Adobe Heiti Std";
    background: #eeeeee;
	}
  .t-th:first-child{
    padding-left: 18upx;
  }
  .classStyle {
    font-size: 28upx;
    color: #333333;
    font-weight: bold;
    font-family: "Ping Fang";
  }
</style>
