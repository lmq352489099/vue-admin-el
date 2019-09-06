<template>
  <div>
    <el-container
      style="position:absolute;left:0;bottom:0;top:0;right:0;overflow:hidden"
    >
      <el-header class="d-flex align-items-center" style="background:#545c64">
        <a class="h5 text-light mb-0 mr-auto"> {{ $conf.logo }} </a>
        <el-menu
          :default-active="navBar.active"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item
            :index="index | numToString"
            :key="index"
            v-for="(item, index) in navBar.list"
            >{{ item.name }}</el-menu-item
          >

          <el-submenu index="100">
            <template slot="title">
              <el-avatar
                size="small"
                src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
              ></el-avatar>
              summer
            </template>
            <el-menu-item index="100-1">修改</el-menu-item>
            <el-menu-item index="100-2">退出</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-header>

      <el-container style="height:100%;">
        <!-- 侧边 -->
        <el-aside width="200px">
          <el-menu
            style="height:100%"
            :default-active="slideMenusActive"
            @select="slideSelect"
          >
            <el-menu-item
              :index="index | numToString"
              v-for="(item, index) in slideMenus"
              :key="index"
            >
              <i :class="item.icon"></i>
              <span slot="title">{{ item.name }}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <!-- 主页 -->
        <el-main
          class="bg-light"
          style="padding-bottom:60px;position:relative;"
        >
          <!-- 面包屑导航 -->
          <div
            class="border-bottom mb-3 bg-white"
            v-if="bran.length > 0"
            style="padding:20px;margin:-20px"
          >
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item
                v-for="(item, index) in bran"
                :key="index"
                :to="{ path: item.path }"
                >{{ item.title }}</el-breadcrumb-item
              >
            </el-breadcrumb>
          </div>

          <!-- 主内容 -->
          <router-view></router-view>
          <!-- 滑动上面 -->

          <el-backtop target=".el-main" :bottom="100">
            <div
              style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      }"
            >
              UP
            </div>
          </el-backtop>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import common from '@/common/mixins/common.js'
export default {
  // 
  // 
  mixins: [common],
  data() {
    return {

      navBar: [],
      bran: []

    }
  },
  created() {
    console.log("onCreated");
    
    // 初始化菜单
    this.navBar = this.$conf.navBar;
    // 面包屑
    this.getRouterBran()
    // 初始化选中菜单
    this.__initNavBar()
  },
  computed: {
    slideMenusActive: {
      set(val) {
        this.navBar.list[this.navBar.active].subActive = val
      },
      get() {
        return this.navBar.list[this.navBar.active].subActive || '0'

      }


    },
    slideMenus() {
      return this.navBar.list[this.navBar.active].submenu || []
    }
  },
  watch: {
    '$route'(to, from) {
      console.log(to, from)
      // 本地存储
      localStorage.setItem('navActive', JSON.stringify({
        top: this.navBar.active || "0",
        left: this.slideMenusActive || "0"
      }))

      this.getRouterBran()
      // 
    }
  },
  methods: {
    __initNavBar() {

      let r = localStorage.getItem("navActive")
      if (r) {
        r = JSON.parse(r)
        this.navBar.active = r.top
        this.slideMenusActive = r.left
      }
    },
    // 获取面包屑导航
    getRouterBran() {
      console.log(this.$route.matched);
      let b = this.$route.matched.filter(v => v.name)
      console.log(b);

      let arr = []
      b.forEach((v, k) => {
        if (v.name === 'index' || v.name == 'layout') return
        arr.push({
          name: v.name,
          path: v.path,
          title: v.meta.title
        })
      })
      if (arr.length > 0) {
        arr.unshift({ name: "index", path: '/index', title: "后台首页" })
      }


      this.bran = arr
      console.log(this.bran);



    },
    // 点击顶部 获取计算属性的index,来显示不同的菜单
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      if (key === '100-1') {
        return console.log("修改资料");

      }
      if (key === '100-2') {
        return console.log("退出登录");

      }
      this.navBar.active = key
      console.log(this.slideMenus[this.slideMenusActive].pathname);



      //  默认选中跳转到当前激活
      this.slideMenusActive = "0"
 
      
      console.log(this.slideMenus.length );
      
      if (this.slideMenus.length > 0) {

        this.$router.push({ name: this.slideMenus[this.slideMenusActive].pathname }).catch((e) => {
          console.log(e);


        })

      }
      // 默认选择跳转到当前激活
    },

    // 点击侧边
    slideSelect(key, keyPath) {
      console.log(key, keyPath);
      this.slideMenusActive = key
      // this.navBar.list[this.navBar.active].subActive = key
      // 跳转到指定页面
      console.log(this.slideMenus[key].pathname);
      this.$router.push({ name: this.slideMenus[key].pathname })

    }
  }
}
</script>

<style lang="scss" scoped>
//
.el-header {
  background-color: #b3c0d1;
  color: #333;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}

body > .el-container {
  margin-bottom: 40px;
}
</style>