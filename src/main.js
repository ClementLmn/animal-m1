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
scene.background = new THREE.Color( 0xe07a57 );
const fov = 60;
const aspectRatio = window.innerWidth / window.innerHeight;
const nearPlane = 1;
const farPlane = 10000;
const D = 200;
//const camera = new THREE.PerspectiveCamera( fov, aspectRatio, nearPlane, farPlane );

const camera = new THREE.OrthographicCamera(-D*aspectRatio, D*aspectRatio, D, -D, nearPlane, farPlane)
camera.position.set(-800, 800, 800);

camera.lookAt(scene.position)

const controls = new OrbitControls (camera, renderer.domElement);


// LES LIGHTS

const ambientLight = new THREE.AmbientLight(0xffffff, 1); // soft white light
scene.add( ambientLight );

const bulb = new THREE.PointLight(0xffffff);
bulb.angle = Math.PI/4;
bulb.castShadow = true;
bulb.penumbra = 0.4;
bulb.decay = 2;
bulb.distance = 450; 
bulb.position.set(0,150,0);
bulb.shadow.camera.left = -40;
bulb.shadow.camera.right = 40;
bulb.shadow.camera.top = 40;
bulb.shadow.camera.bottom = -40;
bulb.shadow.camera.near = 1;
bulb.shadow.camera.far = 1000;
bulb.shadow.mapSize.width = bulb.shadow.mapSize.height = 2048;
scene.add( bulb );


// LE SOOOOL

var geoFloor = new THREE.PlaneGeometry( 2050, 2050, 32 );
var matFloor = new THREE.MeshPhongMaterial({
    color: 0xe07a57, 
    flatShading : true, 
    side: THREE.DoubleSide
});
var floor = new THREE.Mesh( geoFloor, matFloor );
floor.rotation.x = -Math.PI / 2;
floor.position.y = -50;
floor.receiveShadow = true;
scene.add( floor );

/////////  LA GUEEPE  ///////////

const wasp = new THREE.Group();

// LE CORPS
const bodyGroup = new THREE.Group();
const matOrange = new THREE.MeshPhongMaterial( {
    color: 0xf7be35, 
    shininess:0,
    flatShading : true, 
    side: THREE.DoubleSide
});
const matBlack = new THREE.MeshPhongMaterial({
    color: 0x202020, 
    shininess:0,
    flatShading : true, 
    side: THREE.DoubleSide
});

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

const geoHeadStart = new THREE.ConeGeometry( 8, 10, 8, 1);
const meshHeadStart = new THREE.Mesh( geoHeadStart, matBlack );
geoHeadStart.vertices[0].x += 4;
geoHeadStart.computeVertexNormals();
geoHeadStart.computeFaceNormals();
geoHeadStart.__dirtyVertices = true;
geoHeadStart.__dirtyNormals = true;
meshHeadStart.rotation.z = -Math.PI / 2;
meshHeadStart.rotation.x = Math.PI;
meshHeadStart.position.x = -35;

headGroup.add(meshHeadStart);

const geoHeadEnd = new THREE.SphereGeometry(8, 8, 4, 0, Math.PI * 2, 0, Math.PI / 2)
const meshHeadEnd = new THREE.Mesh( geoHeadEnd, matBlack );
meshHeadEnd.rotation.z = -Math.PI / 2;
meshHeadEnd.rotation.y = Math.PI;
meshHeadEnd.position.x = -40;

headGroup.add(meshHeadEnd);

headGroup.position.x = 8;
headGroup.position.y = -5;

wasp.add(headGroup);

// LES ANTENNNNNES
const antenne1 = new THREE.Group();

const geoA1Base = new THREE.CylinderGeometry( 0.5, 0.5, 10, 32);
const a1Base = new THREE.Mesh( geoA1Base, matBlack );
a1Base.rotation.z = Math.PI / -2 - 0.3;
antenne1.add(a1Base);
const geoA1End = new THREE.CylinderGeometry( 0.5, 0, 10, 32);
const a1End = new THREE.Mesh( geoA1End, matBlack );
a1End.rotation.z = Math.PI / -2 + 0.3;
a1End.position.x = -9.25;
a1End.position.y = 0;
antenne1.add(a1End);

antenne1.position.x = -37;
antenne1.position.y = -1;
antenne1.position.z = -4;
antenne1.rotation.x = -0.7;

const antenne2 = new THREE.Group();

const geoA2Base = new THREE.CylinderGeometry( 0.5, 0.5, 10, 32);
const a2Base = new THREE.Mesh( geoA2Base, matBlack );
a2Base.rotation.z = Math.PI / -2 - 0.3;
antenne2.add(a2Base);
const geoA2End = new THREE.CylinderGeometry( 0.5, 0, 10, 32);
const a2End = new THREE.Mesh( geoA2End, matBlack );
a2End.rotation.z = Math.PI / -2 + 0.3;
a2End.position.x = -9.25;
a2End.position.y = 0;
antenne2.add(a2End);

antenne2.position.x = -37;
antenne2.position.y = -1;
antenne2.position.z = 4;
antenne2.rotation.x = 0.7;



wasp.add(antenne1);
wasp.add(antenne2);

wasp.traverse(m => {
   m.castShadow = true;
   m.receiveShadow = true;
});
wasp.scale.set(0.5,0.5,0.5);
scene.add(wasp);

const animate = timestamp => {
    stats.begin();
    renderer.render(scene, camera);
    stats.end();
    requestAnimationFrame(animate);
}

animate();
