import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

let scene,
  camera,
  fov,
  aspectRatio,
  nearPlane,
  farPlane,
  renderer,
  rocket,
  canvas,
  HEIGHT,
  WIDTH;

const clock = new THREE.Clock();
const cursor = {
  x: 0,
  y: 0,
};

const createScene = () => {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;

  //Canvas
  canvas = document.querySelector("#app");

  //Scene
  scene = new THREE.Scene();

  aspectRatio = WIDTH / HEIGHT;
  fov = 75;
  nearPlane = 1;
  farPlane = 1000;
  camera = new THREE.PerspectiveCamera(fov, aspectRatio, nearPlane, farPlane);

  // camera.position.x = 0;
  // camera.position.y = -10;
  camera.position.z = 3;

  renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: canvas,
  });
  renderer.setSize(WIDTH, HEIGHT);
  renderer.shadowMap.enabled = true;
};

const createCube = (elapsedTime) => {
  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial()
  );
  scene.add(cube);
  // cube.rotation.y = elapsedTime;

  window.addEventListener("mousemove", (event) => {
    cursor.x = event.clientX / WIDTH - 0.5;
    cursor.y = -1 * (event.clientY / HEIGHT - 0.5);

    // console.log("X Value: ", cursor.x);
    // console.log("Y Value: ", cursor.y);
  });

  return cube;
};

const main = () => {
  const elapsedTime = clock.getElapsedTime();
  createScene();

  const cube = createCube(elapsedTime);
  camera.position.x = Math.cos(cursor.x * 3) * 2;
  camera.position.z = Math.sin(cursor.x * 3) * 2;
  // camera.position.y = cursor.y * 3;
  camera.lookAt(cube.position);
  renderer.render(scene, camera);
  window.requestAnimationFrame(main);
};

main();
