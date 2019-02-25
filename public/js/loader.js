"use strict";
var scene, camera, renderer, mesh, controls;
var meshFloor, ambientLight, light;

var crate, crateTexture, crateNormalMap, crateBumpMap;

var keyboard = {};
var player = { height:8, speed:0.2, turnSpeed:Math.PI*0.02 };

function start(){
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 0.1, 1000);
	ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
	scene.add(ambientLight);

	light = new THREE.PointLight(0xffffff, 0.8, 18);
	light.position.set(-3,6,-3);
	light.castShadow = true;
	light.shadow.camera.near = 0.1;
	light.shadow.camera.far = 25;
	scene.add(light);


	// Model/material loading!
	var mtlLoader = new THREE.MTLLoader();
	mtlLoader.load("models/3.mtl", function(materials){

		materials.preload();
		var objLoader = new THREE.OBJLoader();
		objLoader.setMaterials(materials);

		objLoader.load("models/3.obj", function(mesh){

			mesh.traverse(function(node){
				if( node instanceof THREE.Mesh ){
					node.castShadow = true;
					node.receiveShadow = true;
				}
			});

			scene.add(mesh);
			mesh.position.set(1, -12, -5);
			// mesh.rotation.y = -Math.PI/16;
		});

	});

	camera.position.set(1, 30, -15);
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	// controls
	controls = new THREE.OrbitControls( camera, renderer.domElement );
	animate();
}

function animate(){
	requestAnimationFrame(animate);

	if(keyboard[87]){ // W key
		camera.position.x -= Math.sin(camera.rotation.y) * player.speed;
		camera.position.z -= -Math.cos(camera.rotation.y) * player.speed;
	}
	if(keyboard[83]){ // S key
		camera.position.x += Math.sin(camera.rotation.y) * player.speed;
		camera.position.z += -Math.cos(camera.rotation.y) * player.speed;
	}
	if(keyboard[65]){ // A key
		camera.position.x += Math.sin(camera.rotation.y + Math.PI/2) * player.speed;
		camera.position.z += -Math.cos(camera.rotation.y + Math.PI/2) * player.speed;
	}
	if(keyboard[68]){ // D key
		camera.position.x += Math.sin(camera.rotation.y - Math.PI/2) * player.speed;
		camera.position.z += -Math.cos(camera.rotation.y - Math.PI/2) * player.speed;
	}

	if(keyboard[37]){ // left arrow key
		camera.rotation.y -= player.turnSpeed;
	}
	if(keyboard[39]){ // right arrow key
		camera.rotation.y += player.turnSpeed;
	}

	renderer.render(scene, camera);
}

function keyDown(event){
	keyboard[event.keyCode] = true;
}

function keyUp(event){
	keyboard[event.keyCode] = false;
}

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);

window.onload = start;






// var container, stats;
// 		var camera, scene, renderer;
// 		var mouseX = 0, mouseY = 0;
// 		var windowHalfX = window.innerWidth / 2;
// 		var windowHalfY = window.innerHeight / 2;
// 		init();
// 		animate();
// 		function init() {
// 			container = document.createElement( 'div' );
// 			document.body.appendChild( container );
// 			camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
// 			camera.position.z = 250;
// 			// scene
// 			scene = new THREE.Scene();
// 			var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
// 			scene.add( ambientLight );
// 			var pointLight = new THREE.PointLight( 0xffffff, 0.8 );
// 			camera.add( pointLight );
// 			scene.add( camera );
// 			// model
// 			var onProgress = function ( xhr ) {
// 				if ( xhr.lengthComputable ) {
// 					var percentComplete = xhr.loaded / xhr.total * 100;
// 					console.log( Math.round( percentComplete, 2 ) + '% downloaded' );
// 				}
// 			};
// 			var onError = function () { };
// 			// THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );
// 			// new THREE.MTLLoader()
// 			// 	.load( 'models/3.mtl', function ( materials ) {
// 			// 		materials.preload();
// 			// 		new THREE.OBJLoader()
// 			// 			.setMaterials( materials )
// 			// 			.load( 'models/3.obj', function ( object ) {
// 			// 				object.position.y = - 95;
// 			// 				scene.add( object );
// 			// 			}, onProgress, onError );
// 			// 	} );
// 				var mtlLoader = new THREE.MTLLoader();
// 				mtlLoader.load("models/3.mtl", function(materials){
//
// 					materials.preload();
// 					var objLoader = new THREE.OBJLoader();
// 					objLoader.setMaterials(materials);
//
// 					objLoader.load( 'models/3.obj', function ( object ) {
// 						object.position.y = - 95;
// 						scene.add( object );
// 					}, onProgress, onError )
//
// 				});
// 			//
// 			renderer = new THREE.WebGLRenderer();
// 			renderer.setPixelRatio( window.devicePixelRatio );
// 			renderer.setSize( window.innerWidth, window.innerHeight );
// 			container.appendChild( renderer.domElement );
// 			document.addEventListener( 'mousemove', onDocumentMouseMove, false );
// 			//
// 			window.addEventListener( 'resize', onWindowResize, false );
// 		}
// 		function onWindowResize() {
// 			windowHalfX = window.innerWidth / 2;
// 			windowHalfY = window.innerHeight / 2;
// 			camera.aspect = window.innerWidth / window.innerHeight;
// 			camera.updateProjectionMatrix();
// 			renderer.setSize( window.innerWidth, window.innerHeight );
// 		}
// 		function onDocumentMouseMove( event ) {
// 			mouseX = ( event.clientX - windowHalfX ) / 2;
// 			mouseY = ( event.clientY - windowHalfY ) / 2;
// 		}
// 		//
// 		function animate() {
// 			requestAnimationFrame( animate );
// 			render();
// 		}
// 		function render() {
// 			camera.position.x += ( mouseX - camera.position.x ) * .05;
// 			camera.position.y += ( - mouseY - camera.position.y ) * .05;
// 			camera.lookAt( scene.position );
// 			renderer.render( scene, camera );
// 		}
//








// let THREE = require('three')
// let FBXLoader = require('three-fbxloader-offical')
//
// import * as THREE from 'three';
// import FBXLoader from 'three-fbxloader-offical'

// function main() {
//     //RENDERER
//     var renderer = new THREE.WebGLRenderer();
//     renderer.setClearColor(0xA9A9A9);
//     renderer.setPixelRatio(window.decicePixelRatio);
//     renderer.setSize( window.innerWidth, window.innerHeight );
//     document.body.appendChild( renderer.domElement );
//
//     //SCENE
//     var scene = new THREE.Scene();
//
//     // camera
//     const camera = new THREE.PerspectiveCamera(30, 800 / 600, 1, 10000);
//     camera.position.set(0, 10, 100);
//     camera.up.set(0, 1, 0);
//     camera.lookAt(new THREE.Vector3(0, 0, 0));
//
//     //LIGHTS
//     var light = new THREE.AmbientLight(0xffffff, 0.5);
//     scene.add(light);

    // load fbx model and texture
    // const objs = [];
    // const loader = new THREE.FBXLoader();
    // loader.load("./hi.fbx", model => {
    // // loader.load("./LamborghiniFBX/Lamborghini_Aventador.fbx", model => {
    //     // model is a THREE.Group (THREE.Object3D)
    //     const mixer = new THREE.AnimationMixer(model);
    //     // animations is a list of THREE.AnimationClip
    //     mixer.clipAction(model.animations[0]).play();
    //     scene.add(model);
    //     objs.push({model, mixer});
    // });

    // var objLoader = new THREE.OBJLoader();
    // objLoader.load('../test-obj.obj',(mesh)=>{
    //   scene.add(mesh)
    //   mesh.position.set(-3,0,4);
    //   mesh.rotation.y = Math.PI/4;
    // })

    // animation rendering
//     const clock = new THREE.Clock();
//     (function animate() {
//         // animation with THREE.AnimationMixer.update(timedelta)
//         objs.forEach(({mixer}) => {mixer.update(clock.getDelta());});
//         renderer.render(scene, camera);
//         requestAnimationFrame(animate);
//     })();
//     return objs;
// }
// const objs = main();

// main();
