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

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

// camera.position.z = 5;

// function animate() {

// 	cube.rotation.x += 0.01;
// 	cube.rotation.y += 0.01;

// 	renderer.render( scene, camera );

// }

// https://threejs.org/docs/#examples/en/loaders/MMDLoader からMuscle3Dモデルを読み込む
import { MMDLoader } from 'three/addons/loaders/MMDLoader.js';

// Instantiate a loader
const loader = new MMDLoader();

// Load a MMD model
loader.load(
	// path to PMD/PMX file
	'muscle3D.pmx',
	// called when the resource is loaded
	function ( mesh ) {

		scene.add( mesh );

	},
	// called when loading is in progress
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);

camera.position.z = 5;
function animate () {
	mesh.rotation.x += 0.01;
	mesh.rotation.y += 0.01;
}
renderer.render( scene, camera );

