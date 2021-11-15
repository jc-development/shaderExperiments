import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import vertexShader from "./shader/vertex.glsl";
import fragmentShader from "./shader/fragment.glsl";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  1000
);

camera.position.z = 100;

const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const clock = new THREE.Clock();

const boxGeometry = new THREE.BoxGeometry(30, 30, 30, 10, 10, 10);

const uniforms = {
  u_time: { value: 0.0 },
  u_mouse: { value: { x: 0, y: 0 } },
  u_resolution: { value: { x: 0, y: 0 } },
  u_radius: { value: 20.0 },
};

const material = new THREE.ShaderMaterial({
  uniforms,
  vertexShader,
  fragmentShader,
  wireframe: true,
});

const ball = new THREE.Mesh(boxGeometry, material);

new OrbitControls(camera, renderer.domElement);

scene.add(ball);

onWindowResize();
animate();

if ("ontouchstart" in window) {
  document.addEventListener("touchmove", move);
} else {
  window.addEventListener("resize", onWindowResize, false);
  document.addEventListener("mousemove", move);
}


function move(event) {
  uniforms.u_mouse.value.x = event.touches
    ? event.touches[0].clientX
    : event.clientX;
  uniforms.u_mouse.value.y = event.touches
    ? event.touches[0].clientY
    : event.clientY;
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);

  uniforms.u_resolution.value.x = window.innerWidth;
  uniforms.u_resolution.value.y = window.innerHeight;
}

function animate() {
  requestAnimationFrame(animate);
  uniforms.u_time.value += clock.getDelta();
  renderer.render(scene, camera);
}
