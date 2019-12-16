import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import ThreeView from "@/components/ThreeView.vue";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      name: "Hello",
      component: HelloWorld
    },
    {
      path: "/3D",
      name: "threejs",
      component: ThreeView
    }
  ]
})
