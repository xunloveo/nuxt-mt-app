<template>
  <div class="m-geo">
    <i class="el-icon-location"></i>{{$store.state.geo.position.city}}
    <nuxt-link class="changeCity"
               to="/changeCity">切换城市</nuxt-link>
    [南昌 上饶 九江]
  </div>
</template>