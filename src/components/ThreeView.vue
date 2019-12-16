<template>
  <div ref="demo1" class="container"></div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import * as THREE from 'three'
import {State, Getter, Action, Mutation} from 'vuex-class';
import  OrbitControls from "three-orbitcontrols"
@Component
export default class ThreeView extends Vue {

  msg: string = 'Welcome to Your Vue-Typescript App'
  scene!: any;
  camera!: any;
  renderer!: any;
  cube!: any;
  controls!: any;
  mounted () {
    console.log('这是 _.assign({})', _.assign({}))
  }
  created () {
    this.$nextTick(() => {
      (this as any).init()
    })
  }
  
  init () {
    let {initMesh, controls} = this as any;
    initMesh()
  }
  initMesh () {
    this.scene = new THREE.Scene() // 场景
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000) // 相机.视场，长宽比，近面，远面
    this.camera.position.x = 0
    this.camera.position.y = 10
    this.camera.position.z = 20
    this.camera.lookAt(this.scene.position);

    this.renderer = new THREE.WebGLRenderer({ antialias: true })// 渲染器
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.shadowMapEnabled = true // 开启阴影

    let axes = new THREE.AxesHelper(40) // 坐标轴

    let planeGeometry = new THREE.PlaneGeometry(60, 20, 10, 10) // 生成平面
    let planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff, side: THREE.DoubleSide,}) // 材质
    let plane = new THREE.Mesh(planeGeometry, planeMaterial)
    plane.rotation.x = -0.5 * Math.PI
    plane.position.x = 0
    plane.position.y = 0
    plane.position.z = 0
    plane.receiveShadow = true
    

    let cubeGeometry = new THREE.BoxGeometry(10, 10, 10)
    let cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000})
    this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
    this.cube.position.x = 0
    this.cube.position.y = 0
    this.cube.position.z = 0
    this.cube.castShadow = true

    let spotLight = new THREE.SpotLight(0xffffff)
    spotLight.position.set(-40, 60, -10)
    spotLight.castShadow = true

    this.scene.add(axes) // 场景添加坐标轴
    this.scene.add(plane) // 向该场景中添加物体
    this.scene.add(this.cube)
    this.scene.add(spotLight);

    (this as any).$refs.demo1.append(this.renderer.domElement)
    let controls = new OrbitControls(this.camera, this.renderer.domElement);
    // 使用阻尼,指定是否有惯性
    controls.enableDamping = true;
    // 动态阻尼系数 就是鼠标拖拽旋转灵敏度，阻尼越小越灵敏
    controls.dampingFactor = 0.25;
    // 是否可以缩放
    controls.enableZoom = true;
    //是否自动旋转
    controls.autoRotate = false;
    //设置相机距离原点的最近距离
    controls.minDistance = 10;
    //设置相机距离原点的最远距离
    controls.maxDistance = 600;
    //是否开启右键拖拽
    controls.enablePan = true;
    controls.rotationSpeed = 0.01;
    this.controls = controls;
    this.renderScene()
  }
  renderScene () {
    let {controls, cube, scene, camera, renderer} = this as any
    controls.update();
    // cube.rotation.x += controls.rotationSpeed
    // cube.rotation.y += controls.rotationSpeed
    // cube.rotation.z += controls.rotationSpeed
    requestAnimationFrame(this.renderScene)
    this.renderer.render(scene, camera)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
canvas{
  width: 100vw!important;
  height: 100vh!important;
}
</style>
