<template>
  <div id="app">
    <div class="page" v-if="showSpinner">
      <b-spinner class="spinner" variant="primary" key="primary"></b-spinner>
    </div>
    <div id="nav">
      <menu-header></menu-header>
    </div>
    <router-view />
  </div>
</template>

<script>
import MenuHeader from "@/components/Menu.vue";
import { mapGetters } from 'vuex';

export default {
  components: {
    'menu-header': MenuHeader
  },
  computed: {
      ...mapGetters(["showSpinner"])
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #fff;

    &.router-link-exact-active {
      color: #000;
    }
  }
}

.page {
  position: absolute;
  background-color: #fff;
  opacity: 0.5;
  z-index: 25;
  width: 100%;
  height: 100%;
}

.spinner {
  position: relative;
  top: 50%;
}
</style>
