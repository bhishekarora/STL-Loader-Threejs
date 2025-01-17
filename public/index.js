import * as THREE from './threejs/three.module.js';
import {STLLoader} from './threejs/STLLoader.js';
import {OrbitControls} from './threejs/OrbitControls.js';

let scene, camera, renderer, object;

function init(){
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        10000
    );
    camera.position.z = 10;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    scene.add(object);

    let control = new OrbitControls(camera, renderer.domElement);

    let light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0,0,10);
    scene.add(light);

    let light2 = new THREE.DirectionalLight(0xffffff);
    light2.position.set(0,0,-10);
    scene.add(light2);

    animate();
}

function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

let loader = new STLLoader();
loader.load('/3dmodels/RC_Plane.STL', (model)=>{
    object = new THREE.Mesh(
        model,
        new THREE.MeshLambertMaterial({color: 0xff6700})
    );
    object.scale.set(0.03, 0.03, 0.05);
    object.position.set(0,-10,-10);
    object.rotation.x = -Math.PI/4;
   // object.rotation.y = Math.PI;
    init();
});


