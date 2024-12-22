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
// renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

// 単純なcubeを表示
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

// https://threejs.org/docs/#api/en/objects/SkinnedMesh からコピペして3Dモデルを表示

const geometry = new THREE.CylinderGeometry( 5, 5, 5, 5, 15, 5, 30 );

// create the skin indices and skin weights manually
// (typically a loader would read this data from a 3D model for you)

const position = geometry.attributes.position;

const vertex = new THREE.Vector3();

const skinIndices = [];
const skinWeights = [];

for ( let i = 0; i < position.count; i ++ ) {

	vertex.fromBufferAttribute( position, i );

	// compute skinIndex and skinWeight based on some configuration data
	const y = ( vertex.y + sizing.halfHeight );
	const skinIndex = Math.floor( y / sizing.segmentHeight );
	const skinWeight = ( y % sizing.segmentHeight ) / sizing.segmentHeight;
	skinIndices.push( skinIndex, skinIndex + 1, 0, 0 );
	skinWeights.push( 1 - skinWeight, skinWeight, 0, 0 );
}

geometry.setAttribute( 'skinIndex', new THREE.Uint16BufferAttribute( skinIndices, 4 ) );
geometry.setAttribute( 'skinWeight', new THREE.Float32BufferAttribute( skinWeights, 4 ) );

// create skinned mesh and skeleton

const mesh = new THREE.SkinnedMesh( geometry, material );
const skeleton = new THREE.Skeleton( bones );

// see example from THREE.Skeleton
const rootBone = skeleton.bones[ 0 ];
mesh.add( rootBone );

// bind the skeleton to the mesh
mesh.bind( skeleton );

// move the bones and manipulate the model
skeleton.bones[ 0 ].rotation.x = -0.1;
skeleton.bones[ 1 ].rotation.x = 0.2;

scene.add(mesh);

camera.position.z = 15;
 renderer.render( scene, camera );
