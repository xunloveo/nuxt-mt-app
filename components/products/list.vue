<template>
  <div class="m-products-list">
    <dl>
      <dd v-for="(item, index) in nav"
          :key="item.name"
          :class="[item.name,item.active?'s-nav-active':'', index == 1 && isUprice ? 'is-uprice' : 'is-lprice']"
          @click="navSelect(index)">{{ item.txt }}</dd>
    </dl>
    <ul>
      <Item v-for="(item,idx) in selfList"
            :key="idx"
            :meta="item" />
    </ul>
  </div>
</template>

<script>
import _ from "lodash";
import Item from './product.vue'
export default {
  components: {
    Item
  },
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      nav: [
        {
          name: 's-default',
          txt: '智能排序',
          active: true
        }, {
          name: 's-price',
          txt: '价格最低',
          active: false
        }, {
          name: 's-visit',
          txt: '人气最高',
          active: false
        }, {
          name: 's-comment',
          txt: '评价最高',
          active: false
        }
      ],
      selfList: _.cloneDeep(this.list),
      isUprice: true, // 价格默认降序
      indexList: []
    }
  },
  async asyncData ({ app }) {
    let { data } = await app.$axios.get('searchList')
    return { items: data.list }
  },
  methods: {
    navSelect (index) {
      this.nav.map(item => item.active = false)
      this.nav[index].active = true
      this.sort(index)
    },
    sort (index) {
      switch (index) {
        case 0: // 智能排序
          this.selfList = _.cloneDeep(this.list)
          break;
        case 1: // 价格排序 第一次 默认是降序
          this.isUprice = !this.isUprice
          if (this.isUprice) { //升序
            this.selfList.sort((a, b) => {
              return parseFloat(a.price - b.price)
            })
          } else { // 降序
            this.selfList.sort((a, b) => {
              return parseFloat(b.price - a.price)
            })
          }
          break
        case 2: // 人气最高
          this.selfList.sort((a, b) => {
            return parseFloat(b.comment - a.comment)
          })
          break
        case 3: // 评价最高
          this.selfList.sort((a, b) => {
            return parseFloat(b.rate - a.rate)
          })
          break
      }
    },
    scroll (e) {
      let items = [...document.querySelectorAll('.s-item')]
      this.indexList = items.filter((item, index) => {
        return item.getBoundingClientRect().y <= 0
      })

      let point = this.indexList.length > 0 ? this.selfList[this.indexList.length - 1].location : this.selfList[0].location
      this.$emit('change-point', point.split(','))
      console.log(point)
    }
  },
  mounted () {
    window.addEventListener('scroll', _.debounce(this.scroll, 50))
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.scroll)
  },
}
</script>

<style lang="scss" scoped>
.s-price.s-nav-active {
  &.is-uprice {
    &::before {
      border-bottom-color: #31bcad;
    }
  }

  &.is-lprice {
    &::after {
      border-top-color: #31bcad;
    }
  }
}
</style>
