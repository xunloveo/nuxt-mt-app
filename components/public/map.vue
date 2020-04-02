<template>
  <div :id="id"
       :style="{width:width+'px',height:height+'px',margin:'34px auto'}"
       class="m-map"
       :class="{'fixed': mapFixed}" />
</template>

<script>
import _ from 'loadsh'
export default {
  props: {
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 300
    },
    point: {
      type: Array,
      default () {
        return [116.46, 39.92]
      }
    }
  },
  data () {
    return {
      id: `map`,
      key: '0dbc0dfd7c775f2a927174493eab8220',
      mapFixed: false
    }
  },
  watch: {
    point: function (val, old) {
      this.map && this.map.setCenter(val)
      this.marker && this.marker.setPosition(val)
    }
  },
  methods: {
    scroll () {
      let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
      if (scrollTop >= 220) {
        this.mapFixed = true
      } else {
        this.mapFixed = false
      }
    },
  },
  mounted () {
    let self = this
    self.id = `map${Math.random().toString().slice(4, 6)}`

    window.onmaploaded = () => {
      let map = new window.AMap.Map(self.id, {
        resizeEnable: true,
        zoom: 11,
        center: self.point
      })
      self.map = map
      window.AMap.plugin('AMap.ToolBar', () => {
        let toolbar = new window.AMap.ToolBar()
        map.addControl(toolbar)
        let marker = new window.AMap.Marker({
          icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
          position: self.point
        })
        self.marker = marker
        marker.setMap(map)
      })
    }
    const url = `https://webapi.amap.com/maps?v=1.4.10&key=${self.key}&callback=onmaploaded`
    let jsapi = document.createElement('script')
    jsapi.charset = 'utf-8'
    jsapi.src = url
    document.head.appendChild(jsapi)

    window.addEventListener('scroll', _.debounce(this.scroll, 50))
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.scroll)
  }
}

</script>

<style lang="scss" scoped>
.m-map {
  &.fixed {
    position: fixed !important;
    top: 0;
  }
}
</style>
