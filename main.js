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
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
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
// https://threejs.org/docs/#examples/en/controls/OrbitControls からコピペ
var controls = new OrbitControls(camera, canvas);
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


// ここからMMD Loaderを用いて原神3Dモデルを読み込む

import { MMDLoader } from 'three/addons/loaders/MMDLoader.js';


window.onload = async () => {

	const genshin3DCanvas = document.querySelector("#genshin3D");
	const genshin3DWidth = genshin3DCanvas.clientWidth;
	const genshin3DHeight = genshin3DCanvas.clientHeight;

	const scene2 = new THREE.Scene();
	const camera2 = new THREE.PerspectiveCamera(45, genshin3DWidth / genshin3DHeight, 1, 1000);
	camera2.position.set(200, 100, 300);
	camera2.lookAt(scene2.position);

	// Instantiate a loader
	const loader = new MMDLoader();

	// Load a MMD model
	let mmd = await loader.load(
		// path to PMD/PMX file
		'xTWxQElkf0/万叶.pmx',
		// called when the resource is loaded
		function (mesh) {

			scene.add(mesh);


		},
		// called when loading is in progress
		function (xhr) {

			console.log((xhr.loaded / xhr.total * 100) + '% loaded');

		},
		// called when loading has errors
		function (error) {

			console.log('An error happened');

		}
	);
	const renderer2 = new THREE.WebGLRenderer({ canvas: genshin3DCanvas, antialias: true });
	renderer2.setSize(genshin3DWidth, genshin3DHeight);
	renderer2.setClearColor(0xf0d0d0);
	renderer2.setPixelRatio(window.devicePixelRatio);
	renderer2.render(scene2, camera2);
}

// https://blog.one-cut.xyz/%E3%80%90javascript%E3%80%91mmd%E3%83%A2%E3%83%87%E3%83%AB%E3%82%92%E3%83%96%E3%83%A9%E3%82%A6%E3%82%B6%E3%81%A7%E5%8B%95%E3%81%8B%E3%81%99-three-js%E3%81%A73d%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9/ を参考に、MMDモデルを読み込んでからレンダリングするように変更した。




