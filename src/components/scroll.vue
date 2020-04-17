<template lang="html">
    <p class="yo-scroll" :class="{'down':(state===0),'up':(state==1),refresh:(state===2),touch:touching}"
        @touchstart="touchStart($event)"
        @touchmove="touchMove($event)"
        @touchend="touchEnd($event)"
        @scroll="(onInfinite || infiniteLoading) ? onScroll($event) : undefined">
        <section class="inner" :style="{ transform: 'translate3d(0, ' + top + 'px, 0)' }">
            <header class="pull-refresh">
                <slot name="pull-refresh">
                    <span class="down-tip">下拉更新</span>
                    <span class="up-tip">松开更新</span>
                    <span class="refresh-tip">更新中</span>
                </slot>
            </header>
            <slot></slot>
            <footer class="load-more">
                <slot name="load-more">
                <span>加载中……</span>
                </slot>
            </footer>
        </section>
    </p>
</template>
<script>
export default {
    props: {
        offset: {
        type: Number,
        default: 40
        },
        enableInfinite: {
            type: Boolean,
            default: true
        },
        enableRefresh: {
            type: Boolean,
            default: true
        },
        onRefresh: {
            type: Function,
            default: undefined,
            required: false
        },
        onInfinite: {
            type: Function,
            default: undefined,
            require: false
        }
    },
    data() {
        return {
            top: 0,
            state: 0,
            startY: 0,
            touching: false,
            infiniteLoading: false
        }
    },
    methods: {
        // 触摸开始
        touchStart(e) {
            this.startY = e.targetTouches[0].pageY
            this.startScroll = this.$el.scrollTop || 0
            this.touching = true
            //    console.log(this.startY)
            //    console.log(this.startScroll)
            //    console.log(this.touching)
        },
        // 触摸中
        touchMove(e) {
            // console.log(111)
            if (!this.enableRefresh || this.$el.scrollTop > 0 || !this.touching) {
                return
            }
            // console.log(222)

            //  下拉距离 pageTop px
            let pageTop = e.targetTouches[0].pageY - this.startY - this.startScroll
            // console.log(pageTop)
            if (pageTop > 0){
                e.preventDefault()
                // console.log(this.offset)
                // 下拉距离换算
                this.top = Math.pow(pageTop, 0.8) + (this.state === 2 ? this.offset : 0)
                // console.log(this.top)
                if (this.state === 2) { 
                    return
                }
                if (this.top >= this.offset) {
                    // 下拉完成 更新
                    this.state = 1
                } else {
                    // 下拉未完成
                    this.state = 0
                }
            } 
        },
        // 触摸结束
        touchEnd(e) {
            // 如果 this.enableRefresh 为false return
            if (!this.enableRefresh){
                return
            } 
            this.touching = false

            if (this.state === 2) {
                this.state = 2
                this.top = this.offset
                return
            }
            // 大于顶部距离执行刷新方法
            if (this.top >= this.offset) {
                this.refresh()
            } else { // cancel refresh
                this.state = 0
                this.top = 0
            }
        },
        // 执行刷新
        refresh() {
            this.state = 2
            this.top = this.offset
            // console.log(this.top)
            this.onRefresh(this.refreshDone)
        },
        // 回调状态改变
        refreshDone() {
            this.state = 0
            this.top = 0
        },
        // 执行下拉加载
        infinite() {
            this.infiniteLoading = true
            // 执行加载更多数据
            this.onInfinite(this.infiniteDone)
            // console.log(111)
        },
        infiniteDone() {
            // 加载完毕状态改变可以再次加载
            this.infiniteLoading = false
            // console.log(222)
        },
        onScroll(e) {
            if (!this.enableInfinite || this.infiniteLoading) {
                return
            }
            // console.log(!this.enableInfinite)
            // console.log(this.infiniteLoading)
            // console.log(e)
            // 屏幕高度
            let outerHeight = this.$el.clientHeight
            // console.log(outerHeight)
            
            // 容器高度
            let innerHeight = this.$el.querySelector('.inner').clientHeight
            // console.log(innerHeight)

            // 滚动条高度 滚动高度
            let scrollTop = this.$el.scrollTop
            // console.log(scrollTop)
            
            // 头部高度
            // let ptrHeight = this.onRefresh ? this.$el.querySelector('.pull-refresh').clientHeight : 0
            let ptrHeight = this.$el.querySelector('.pull-refresh').clientHeight
            // console.log(ptrHeight)
            // 加载中高度
            let infiniteHeight = this.$el.querySelector('.load-more').clientHeight
            // 滚动到列表底部距离
            let bottom = innerHeight - outerHeight - scrollTop - ptrHeight
            // console.log(bottom)
            // 触底加载更多
            if (bottom < infiniteHeight) this.infinite()
        }
    }
}
</script>
<style>
.yo-scroll {
    position: absolute;
    top: .8rem;
    right: 0;
    bottom: .98rem;
    left: 0;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    background-color: #fff
}
.yo-scroll .inner {
    position: absolute;
    top: -1rem;
    width: 100%;
    transition-duration: 300ms;
}
.yo-scroll .pull-refresh {
    position: relative;
    left: 0;
    top: 0;
    width: 100%;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: .22rem;
    color: #666;
}
.yo-scroll.touch .inner {
    transition-duration: 0ms;
}
.yo-scroll.down .down-tip {
    display: block;
}
.yo-scroll.up .up-tip {
    display: block;
}
.yo-scroll.refresh .refresh-tip {
    display: block;
}
.yo-scroll .down-tip,
.yo-scroll .refresh-tip,
.yo-scroll .up-tip {
    display: none;
}
.yo-scroll .load-more {
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: .22rem;
    color: #666;
} 
</style>