// Option 2: Import from a CDN
// Development
// Installing without build tools will require some changes to the project structure given above.

// We imported code from 'three' (an npm package) in main.js, and web browsers don't know what that means. In index.html we'll need to add an import map defining where to get the package. Put the code below inside the <head></head> tag, after the styles.
//   {
//     "imports": {
//       "three": "https://cdn.jsdelivr.net/npm/three@<version>/build/three.module.js",
//       "three/addons/": "https://cdn.jsdelivr.net/npm/three@<version>/examples/jsm/"
//     }
//   }

import * as THREE from 'three';
// import { THREE } from 'https://cdn.jsdelivr.net/npm/three@0.171.0/build/three.module.js'; 

// Creating the scene : https://threejs.org/docs/#manual/en/introduction/Creating-a-scene


// cameraを任意に動かせるようにする: https://qiita.com/dsudo/items/42da9c7f45ed6147395e

// 1. canvas
const canvas = document.querySelector("#threeObj");
const width = canvas.clientWidth;
const height = canvas.clientHeight;

// 2. scene
const scene = new THREE.Scene();

// 3. mesh (box)
const box = new THREE.Mesh(
  new THREE.BoxGeometry(64, 64, 64),
  new THREE.MeshNormalMaterial()
);
box.position.set(0, 0, 0);
scene.add(box);

// 4. camera
const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
camera.position.set(200, 100, 300);
camera.lookAt(scene.position);

// 4-2. camera controls
var controls = new THREE.OrbitControls(camera, canvas);
controls.enableDamping = true;

// 5. renderer
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(width, height);
renderer.setClearColor(0xf0d0d0);
renderer.setPixelRatio(window.devicePixelRatio);

// 6. animate
const animate = () => {
  // next frame
  requestAnimationFrame(animate);

  // required if controls.enableDamping or controls.autoRotate are set to true
  controls.update();

  // render
  renderer.render(scene, camera);
};

animate();



