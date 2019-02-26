//RENDERER
var renderer = new THREE.WebGLRenderer();
// renderer.setClearColor(0x00ff00);
renderer.setPixelRatio(window.decicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//SCENE
var scene = new THREE.Scene();

//CAMERA
var camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 0.1, 3000 );
// camera.position.z = 5;

//LIGHTS
var light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);

var light1 = new THREE.PointLight(0xffffff, 0.5);
scene.add(light1);

//MATERIAL
///FIRST TYPE:
var material = new THREE.MeshBasicMaterial( { color: 0xF3FFE2 } );

///SECONED TYPE:
// var material = new THREE.MeshNormalMaterial({
//     color: 0xff0000,
//     transparent: true,
//     opacity: 1,
//     wireframe: true,
//     wireframeLinewidth: 5,
//     wireframeLinejoin: 'round',
//     wireframeLinecap: 'round'
//   });

///THIRD TYPE:
// var material = new THREE.MeshLambertMaterial({
//    color: 0xF3FFE2,
//    map: new THREE.TextureLoader().load('wool.jpg')
//  });

///FORTH TYPE:
// var material = new THREE.MeshPhongMaterial({
//    color: 0xF3FFE2,
//    specular: 0xff00000,
//    shininess: 30,
//    map: new THREE.TextureLoader().load('wool.jpg')
//  });

///FIFTH TYPE:
// var material = new THREE.MeshStandardMaterial({
//   color: 0xF3FFE2,
//   roughness: 0.5,
//   metalness: 0.5
// });

//GEOMETRY
var geometry = new THREE.CubeGeometry( 100, 100, 100 );
var mesh = new THREE.Mesh( geometry, material );
mesh.position.set(0, 0, -1000);
scene.add( mesh );
// var geometry = new THREE.PlaneGeometry(100, 100);
// var geometry = new THREE.Geometry(100, 100);
// geometry.vertices.push(
//   new THREE.Vector3(-10, 10, 0),
//   new THREE.Vector3(-10,-10, 0),
//   new THREE.Vector3(10, -10, 0)
// );
// geometry.faces.push( new THREE.Face3(0,1,2))


requestAnimationFrame( render );
function render() {
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;
  renderer.render( scene, camera );
  requestAnimationFrame(render)
}




















// var scene = new THREE.Scene();
// var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
//
// var renderer = new THREE.WebGLRenderer();
// renderer.setSize( window.innerWidth, window.innerHeight );
// document.body.appendChild( renderer.domElement );
//
// var geometry = new THREE.BoxGeometry( 1, 1, 1 );
// var material = new THREE.MeshBasicMaterial( { color: 'blue' } );
// var cube = new THREE.Mesh( geometry, material );
// scene.add( cube );
//
// camera.position.z = 5;
//
// function animate() {
//   requestAnimationFrame( animate );
//   cube.rotation.x += 0.01;
//   cube.rotation.y += 0.01;
//   renderer.render( scene, camera );
// }
// animate();
