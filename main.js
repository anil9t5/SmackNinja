import * as THREE from "three";
import * as dat from "dat.gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { InteractionManager } from "three.interactive";
import { DragControls } from "three/addons/controls/DragControls.js";

let scene,
  camera,
  fov,
  aspectRatio,
  nearPlane,
  farPlane,
  renderer,
  canvas,
  HEIGHT,
  WIDTH;

// GUI
const gui = new dat.GUI();

const clock = new THREE.Clock();
const cursor = {
  x: 0,
  y: 0,
};

const objects = [];

const createScene = () => {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;

  //Canvas
  canvas = document.querySelector("#app");

  //Scene
  scene = new THREE.Scene();

  //Renderer
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: canvas,
  });
  renderer.setSize(WIDTH, HEIGHT);
  renderer.shadowMap.enabled = true;

  //Camera
  aspectRatio = WIDTH / HEIGHT;
  fov = 75;
  nearPlane = 1;
  farPlane = 1000;
  camera = new THREE.PerspectiveCamera(fov, aspectRatio, nearPlane, farPlane);

  // camera.position.x = 0;
  // camera.position.y = -10;
  camera.position.z = 3;

  //Orbit Controls
  // const controls = new OrbitControls(camera, renderer.domElement);
  // controls.update();
};

const createStrikerCube = (elapsedTime) => {
  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial()
  );
  //Interaction Manager...
  // const interactionManager = new InteractionManager(
  //   renderer,
  //   camera,
  //   renderer.domElement
  // );

  // interactionManager.add(cube);
  // cube.name = "cube";
  // scene.add(cube);

  // objects.push(cube);

  // const exists = isMeshInScene(scene, "cube");
  // console.log(exists);
  // if (exists == false) {
  //   scene.add(cube);
  //   objects.push(cube);
  // }

  return cube;
};

const isMeshInScene = (scene, meshName) => {
  return scene.children.some((child) => child.name === meshName);
};

const dragCrontrols = (objects) => {
  const dragControls = new DragControls(objects, camera, renderer.domElement);
  // dragControls.addEventListener("dragstart", function () {
  //   orbitControls.enabled = false;
  // });
  dragControls.addEventListener("drag", null);
  // dragControls.addEventListener("dragend", function () {
  // orbitControls.enabled = true;
  // });

  // cube.addEventListener("click", (event) => {
  // console.log("Cube clicked");
  // cube.position.x += 5;
  // });
};

const checkCursor = () => {
  window.addEventListener("mousemove", (event) => {
    cursor.x = event.clientX / WIDTH - 0.5;
    cursor.y = -1 * (event.clientY / HEIGHT - 0.5);
    console.log("X Value: ", cursor.x);
    console.log("Y Value: ", cursor.y);
  });
};

const createRandom = () => {
  const box = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial()
  );
  // Random positioning
  box.position.x = Math.random() * 10 - 5; //Generates random position for x from -5 to 5
  box.position.y = Math.random() * 10 - 5;
  box.position.z = -5;

  // console.log(box.position.x, box.position.y);
  // checkCursor();

  // Random rotation
  // box.rotation.x = Math.random() * Math.PI;
  // box.rotation.y = Math.random() * Math.PI;
  // box.rotation.z = Math.random() * Math.PI;

  // Random scaling
  // box.scale.x = Math.random() * 2 + 1;
  // box.scale.y = Math.random() * 2 + 1;
  // box.scale.z = Math.random() * 2 + 1;

  scene.add(box);
};

const strikerSwipe = () => {
  let startX = 0,
    startY = 0,
    isDragging = false,
    isMouseDown = false;

  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial()
  );

  // Event listener for mousedown
  document.addEventListener("mousedown", (e) => {
    startX = e.clientX; // Capture the starting X position
    startY = e.clientY;
    isDragging = true;
    isMouseDown = true;
    console.log("Mouse down, dragging started");
  });

  // Event listener for mouseup
  document.addEventListener("mouseup", (e) => {
    isMouseDown = false;
    isDragging = false;
    if (isDragging == false && isMouseDown == false) {
      console.log("Mouse up, dragging stopped");
      // Assuming you have a reference to the mesh you want to remove
      var object = scene.getObjectByName("cube"); // Replace 'ObjectName' with your object's name
      console.log(scene.children);
      scene.remove(object);
    }
  });

  // Event listener for mousemove
  document.addEventListener("mousemove", (e) => {
    if (isMouseDown == true && isDragging) {
      // Additional logic for dragging can go here

      const currentX = e.clientX; // Current X position during drag
      const currentY = e.clientY;

      let deltaX = currentX - startX;
      let deltaY = currentY - startY;

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        deltaX > 0
          ? getSwipeFeedback(cube, "right", isDragging, deltaX, deltaY)
          : getSwipeFeedback(cube, "left", isDragging, deltaX, deltaY);
        console.log(deltaX > 0 ? "Swiped right" : "Swiped Left");
      }

      // Update start position for continuous movement
      deltaX = e.clientX;
      deltaY = e.clientY;
    }
  });
};

const getSwipeFeedback = (cube, direction, isDragging, xValue, yValue) => {
  // document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  // Move the object based on swipe distance

  if (direction == "right") {
    scene.add(cube);
    cube.name = "cube";
    cube.position.x += xValue * 0.0001;
  } else {
    cube.position.y -= yValue * 0.0001; // Adjust multiplier for speed
  }

  // });
};

const loop = () => {
  renderer.render(scene, camera);

  requestAnimationFrame(loop);
};

const main = () => {
  const elapsedTime = clock.getElapsedTime();
  createScene();
  // handleMouseDown();
  // createRandom();
  strikerSwipe();
  loop();
};

main();
