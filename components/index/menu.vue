<template>
  <div class="m-menu">
    <dl class="nav"
        @mouseleave="mouseleave">
      <dt>全部分类</dt>
      <dd v-for="(item, inx) in $store.state.home.menu"
          :key="inx"
          @mouseenter="kind = inx">
        <i :class="item.type" />{{ item.name }}<span class="arrow" />
      </dd>
    </dl>
    <div class="detail"
         v-show="kind !== ''"
         @mouseenter="sover"
         @mouseleave="sleave">
      <template v-for="(item,idx) in curdetail.child">
        <h4 :key="idx">{{ item.title }}</h4>
        <span v-for="v in item.child"
              :key="v">{{ v }}</span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      kind: ''
    }
  },
  methods: {
    mouseleave () {
      this.timer = setTimeout(() => {
        this.kind = ''
      }, 150)
    },
    sover () {
      clearTimeout(this.timer)
    },
    sleave () {
      this.kind = ''
    }
  },
  computed: {
    curdetail () {
      return this.$store.state.home.menu[this.kind] || {}
    }
  }
}
</script>