import * as THREE from 'three';
import threeOrbitControls from './utils/OrbitControls';
import Stats from 'stats.js';
import {TweenMax} from 'gsap';
import Wasp from './wasp';
import './style.css';

const NUMBER_WASP = 10;
const wasps = [];

const OrbitControls = threeOrbitControls(THREE);

const stats = new Stats();
document.body.appendChild(stats.domElement);

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.shadowMap.enabled = true;
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xe07a57 );

let aspectRatio = window.innerWidth / window.innerHeight;
const nearPlane = 1;
const farPlane = 10000;
const D = 200;
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
const matFloor = new THREE.MeshPhongMaterial({
    color: 0xe07a57, 
    flatShading : true, 
    side: THREE.DoubleSide
});

const floor = new THREE.Mesh( new THREE.PlaneGeometry( 2050, 2050, 32 ), matFloor );
floor.rotation.x = -Math.PI / 2;
floor.position.y = -50;
floor.receiveShadow = true;
scene.add( floor );

// ON VERRA TOUT CA PLUS TARD
// for(let i = 0; i <= NUMBER_WASP; i++){
//     wasps.push(Wasp());
// }

// wasps.forEach(w => {
//     const wasp = Wasp();
//     wasp.scale.set(0.5,0.5,0.5);
//     wasp.position.set(Math.random() * (250 + 250) - 250, 0, Math.random() * (250 + 250) - 250);
//     scene.add(wasp);
// });

const wasp = Wasp();
wasp.wasp.scale.set(0.5,0.5,0.5);
scene.add(wasp.wasp);


const animate = timestamp => {
    stats.begin();
    renderer.render(scene, camera);

    // ON FAIT BOUGER LA QUEPE ET ELLE REBONDIE PAS ENCORE TRES PARFAIT
    // wasp.translateX(-1);
    // camera.updateMatrix();
    // camera.updateMatrixWorld();

    // const frustum = new THREE.Frustum();
    // frustum.setFromMatrix(new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse));  
    
    // if (!frustum.containsPoint(wasp.position)) {
    //     const newDir = new THREE.Vector3(Math.random() * (250 + 250) - 250, 0, Math.random() * (250 + 250) - 250);
    //     const pos = new THREE.Vector3();
    //     pos.addVectors(newDir, wasp.position);
    //     wasp.lookAt(pos);
    // }


    stats.end();
    requestAnimationFrame(animate);
}


const resizeHandler = () => {
    aspectRatio = window.innerWidth / window.innerHeight;
    camera.left = -D*aspectRatio;
    camera.right = D*aspectRatio
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
};

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const clickHandler = e => {
    mouse.x = e.clientX / window.innerWidth * 2 - 1;
	mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
	raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(wasp.wasp, true);
	if (intersects.length > 0) {
        wasp.kill();
	}
};


addEventListener('click', clickHandler);
addEventListener('resize', resizeHandler);
animate();
