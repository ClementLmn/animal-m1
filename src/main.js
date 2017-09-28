import * as THREE from 'three';
import threeOrbitControls from './utils/OrbitControls';
import Stats from 'stats.js';
import './style.css';

const OrbitControls = threeOrbitControls(THREE);

const stats = new Stats();
document.body.appendChild(stats.domElement);

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.shadowMap.enabled = true;
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0x333333 );
const fov = 60;
const aspectRatio = window.innerWidth / window.innerHeight;
const nearPlane = 1;
const farPlane = 9000;
const camera = new THREE.PerspectiveCamera( fov, aspectRatio, nearPlane, farPlane );
camera.position.z = 100;

const controls = new OrbitControls (camera, renderer.domElement);

const axisHelper = new THREE.AxisHelper( 100 );
scene.add( axisHelper );


// LES LIGHTS

const ambientLight = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( ambientLight );

const spotLight = new THREE.SpotLight(0xffffff);
spotLight.angle = Math.PI/4;
spotLight.castShadow = true;
spotLight.penumbra = 0.4;
spotLight.decay = 2;
spotLight.distance = 450; 
spotLight.position.set( 20, 250, 20);
scene.add( spotLight );

var spotLightHelper = new THREE.SpotLightHelper( spotLight );
scene.add( spotLightHelper );


var geoFloor = new THREE.PlaneGeometry( 1050, 1050, 32 );
var matFloor = new THREE.MeshPhongMaterial( {specular: 0x111111, emissive : 0x111111, side: THREE.DoubleSide} );
var floor = new THREE.Mesh( geoFloor, matFloor );
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add( floor );



const wasp = new THREE.Group();


// LE CORPS
const bodyGroup = new THREE.Group();
const matOrange = new THREE.MeshPhongMaterial( {color: 0xf7be35, specular: 0xffcc52} );
const matBlack = new THREE.MeshPhongMaterial( {color: "black", specular: 0x282828} );

const geoBodyRight = new THREE.CylinderGeometry( 9, 1, 10, 8 );
const meshBodyRight = new THREE.Mesh( geoBodyRight, matOrange );
meshBodyRight.rotation.z = Math.PI / 2;
meshBodyRight.position.x = -5;
bodyGroup.add(meshBodyRight);

const geoBodyCenter = new THREE.CylinderGeometry( 9, 9, 9, 8 );
const meshBodyCenter = new THREE.Mesh( geoBodyCenter, matBlack );
meshBodyCenter.rotation.z = Math.PI / 2;
meshBodyCenter.position.x = -14.5;
bodyGroup.add(meshBodyCenter);

const geoBodyLeft = new THREE.CylinderGeometry( 1, 9, 10, 8 );
const meshBodyLeft = new THREE.Mesh( geoBodyLeft, matOrange );
meshBodyLeft.rotation.z = Math.PI / 2;
meshBodyLeft.position.x = -24;
bodyGroup.add(meshBodyLeft);


bodyGroup.rotation.z = 0.1;

wasp.add(bodyGroup);




// LE DARD
const dardGroup = new THREE.Group();

const geoDardStart = new THREE.CylinderGeometry( 1, 9, 10, 8 );
const meshDardStart = new THREE.Mesh( geoDardStart, matBlack );
meshDardStart.rotation.z = Math.PI / 2;
meshDardStart.position.x = 5;
dardGroup.add(meshDardStart);

const geoDardCenter = new THREE.CylinderGeometry( 9, 12, 12, 8 );
const meshDardCenter = new THREE.Mesh( geoDardCenter, matOrange );
meshDardCenter.rotation.z = Math.PI / 2;
meshDardCenter.position.x = 16;
dardGroup.add(meshDardCenter);

const geoDardCenter2 = new THREE.CylinderGeometry( 12, 11, 10, 8 );
const meshDardCenter2 = new THREE.Mesh( geoDardCenter2, matBlack );
meshDardCenter2.rotation.z = Math.PI / 2;
meshDardCenter2.position.x = 27;
dardGroup.add(meshDardCenter2);

const geoDardCenter3 = new THREE.CylinderGeometry( 11, 9, 10, 8 );
const meshDardCenter3 = new THREE.Mesh( geoDardCenter3, matOrange );
meshDardCenter3.rotation.z = Math.PI / 2;
meshDardCenter3.position.x = 37;
dardGroup.add(meshDardCenter3);

const geoDardEnd = new THREE.CylinderGeometry( 9, 0, 14, 8 );
const meshDardEnd = new THREE.Mesh( geoDardEnd, matBlack );
meshDardEnd.rotation.z = Math.PI / 2;
meshDardEnd.position.x = 49;
dardGroup.add(meshDardEnd);

dardGroup.rotation.z = -0.2;
dardGroup.position.x = -6;
wasp.add(dardGroup);



// LA TETE DE LA BETE
const headGroup = new THREE.Group();

const geoHeadStartUp = new THREE.ConeGeometry( 5, 7, 8, 1);
const meshHeadStartUp = new THREE.Mesh( geoHeadStartUp, matBlack );
geoHeadStartUp.vertices[0].x += 4;
geoHeadStartUp.computeVertexNormals();
geoHeadStartUp.computeFaceNormals();
geoHeadStartUp.__dirtyVertices = true;
geoHeadStartUp.__dirtyNormals = true;
meshHeadStartUp.rotation.z = -Math.PI / 2;
meshHeadStartUp.rotation.x = Math.PI;
meshHeadStartUp.position.x = -35;

headGroup.add(meshHeadStartUp);

wasp.add(headGroup);


wasp.traverse(m => {
   m.castShadow = true;
});
wasp.position.y = 100;
scene.add(wasp);

const animate = timestamp => {
    stats.begin();
    renderer.render(scene, camera);
    stats.end();
    requestAnimationFrame(animate);
}

animate();
