// var _mouse = { x: 0, y: 0 },
//     _projector = new THREE.Projector();
var objects = []
//SCENE
var scene = new THREE.Scene();

//RENDERER
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth-2, window.innerHeight-5 );
document.body.appendChild( renderer.domElement );
document.addEventListener( 'mousedown', onDocumentMouseDown, false );

//CAMERA
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 30;

// CONTROLS
var controls = new THREE.OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.campingFactor = 0.25
controls.enableZoom = false
// controls.maxDistance = 200;

//LIGHTS

// var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0)
// keyLight.position.set(-100, 0, 100)
//
// var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75)
// fillLight.position.set(100, 0, 100)
var frontLight = new THREE.DirectionalLight(0xffffff, 1.0)
frontLight.position.set(100, 0, 100).normalize()
var backLight = new THREE.DirectionalLight(0xffffff, 1.0)
backLight.position.set(100, 0, -100).normalize()
var ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);
// scene.add(keyLight)
// scene.add(fillLight)
scene.add(frontLight)
scene.add(backLight)

// MODEL/MATERIAL LOADING!
var mtlLoader = new THREE.MTLLoader();
mtlLoader.setTexturePath("models/");
mtlLoader.setPath("models/");
mtlLoader.load("3.mtl", function (materials) {

    materials.preload();
//     // OBJECT LOADER
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath("models/");
    objLoader.load("3.obj", function (object) {
        console.log(object, 'object');
        scene.add(object);
        object.position.y -= 20;
        scene.traverse(function(children){
          console.log(children, 'children');
          objects.push(children)
        });
//
    });
//
});
// renderer.domElement.addEventListener("click", onclick, true);
//  var selectedObject;
//  var raycaster = new THREE.Raycaster();
// function onclick(event) {
//  var mouse = new THREE.Vector2();
//  raycaster.setFromCamera(mouse, camera);
//  var intersects = raycast er.intersectObjects(planets, true); //array
// if (intersects.length > 0) {
// selectedObject = intersects[0];
// alert(selectedObject);
// }}
//// mouse picking
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

function onDocumentMouseDown( event ) {
    event.preventDefault();
     var mouseX = (event.clientX / window.innerWidth)*2-1;
     var mouseY = -(event.clientY /window.innerHeight)*2+1;
     raycaster.setFromCamera(mouse, camera)
     // var vector = new THREE.Vector3( mouseX, mouseY, 0.5 );
     // projector.unprojectVector( vector, camera );
     // var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );
     // var intersects = raycaster.intersectObjects( scene.children );
     var intersects = raycaster.intersectObjects( objects);
     var color = '0xffffff'
    // event.preventDefault();

    // find intersections
    // _mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    // _mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    //
    // var vector = new THREE.Vector3( _mouse.x, _mouse.y, 1 );
    //
    // var ray = _projector.pickingRay( vector, camera );
    //
    // var intersects = ray.intersectObjects( scene.children );
    //
    if ( intersects.length > 0 ) {
      console.log(intersects[0],'intersects[0]');
      console.log(scene,'scene');
      controls.enabled = false;
      scene.children[3].position.set(20,-20,0)
      // let camera2 = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
      // camera2.position.z = 30;
      // let controls2 = new THREE.OrbitControls(camera2, renderer.domElement)
      // controls2.enableDamping = true
      // controls2.campingFactor = 0.25
      let mtlLoader = new THREE.MTLLoader();
      mtlLoader.setTexturePath("models/");
      mtlLoader.setPath("models/");
      mtlLoader.load("part1.mtl", function (materials) {
          materials.preload();
          var objLoader = new THREE.OBJLoader();
          objLoader.setMaterials(materials);
          objLoader.setPath("models/");
          objLoader.load("part1.obj", function (object) {
              console.log(object, 'object');
              scene.add(object);
              object.position.y -= 5;
          });
      //
      });
      // if (intersects[0].faceIndex === 1818) {
      //   console.log(scene,'scene');
      // }

    }
}

/// OBJMTLLoader

// var oLoader = new THREE.OBJMTLLoader();
// oLoader.load('/models/3.obj', '/models/3.mtl', function(object) {
//
//   // object.position.x = -200;
//   // object.position.y = 0;
//   // object.position.z = 100;
//   // object.scale.set(0.1, 0.1, 0.1);
//   scene.add(object);
//   object.position.y -= 20;
//
// });


// Model/material loading!
// var mtlLoader = new THREE.MTLLoader();
// mtlLoader.load("models/3.mtl", function(materials){
//
//   materials.preload();
//   var objLoader = new THREE.OBJLoader();
//   objLoader.setMaterials(materials);
//
//   objLoader.load("models/3.obj", function(mesh){
//
    // mesh.traverse(function(node){
    //   if( node instanceof THREE.Mesh ){
    //     node.castShadow = true;
    //     node.receiveShadow = true;
    //   }
    // });
//
//     scene.add(mesh);
//     mesh.position.set(1, -12, -5);
//     // mesh.rotation.y = -Math.PI/16;
//   });
//
// });


var animate = function () {
	requestAnimationFrame( animate );

	controls.update()

	renderer.render(scene, camera);
};

animate();
