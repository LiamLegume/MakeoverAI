"use client";

import { useEffect, useRef, useState } from "react";

export type Room3DViewerStatus =
  | "idle"
  | "demo"
  | "queued"
  | "processing"
  | "succeeded"
  | "failed"
  | "missing-api-key";

interface Room3DViewerProps {
  modelUrl?: string;
  progress?: number;
  status?: Room3DViewerStatus;
  sourceImage?: string;
  error?: string;
}

type ThreeModule = typeof import("three");
type ThreeObject = import("three").Object3D;
type ThreeGroup = import("three").Group;
type ThreeMaterial = import("three").Material | import("three").Material[];

const statusCopy: Record<Room3DViewerStatus, string> = {
  idle: "Ready",
  demo: "Demo model",
  queued: "Queued",
  processing: "Generating",
  succeeded: "GLB ready",
  failed: "Using demo",
  "missing-api-key": "API key needed"
};

function disposeMaterial(material: ThreeMaterial) {
  if (Array.isArray(material)) {
    material.forEach((item) => item.dispose());
    return;
  }

  material.dispose();
}

function disposeObject(object: ThreeObject) {
  object.traverse((child) => {
    const mesh = child as ThreeObject & {
      geometry?: { dispose: () => void };
      material?: ThreeMaterial;
    };

    mesh.geometry?.dispose();

    if (mesh.material) {
      disposeMaterial(mesh.material);
    }
  });
}

export function Room3DViewer({
  modelUrl,
  progress = 0,
  status = "demo",
  sourceImage,
  error
}: Room3DViewerProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [renderState, setRenderState] = useState<"loading" | "ready" | "fallback">("loading");

  useEffect(() => {
    let isMounted = true;
    let animationId = 0;
    let resizeObserver: ResizeObserver | null = null;
    let sceneObjects: ThreeObject[] = [];
    let rendererElement: HTMLCanvasElement | null = null;
    let activeRenderer: import("three").WebGLRenderer | null = null;
    let activeControls: { dispose: () => void } | null = null;

    async function createViewer() {
      const THREE = await import("three");
      const { OrbitControls } = await import("three/examples/jsm/controls/OrbitControls.js");
      const { GLTFLoader } = await import("three/examples/jsm/loaders/GLTFLoader.js");

      if (!isMounted || !mountRef.current) {
        return;
      }

      const mount = mountRef.current;
      mount.replaceChildren();

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xf6f0e8);
      scene.fog = new THREE.Fog(0xf6f0e8, 11, 20);

      const camera = new THREE.PerspectiveCamera(42, mount.clientWidth / mount.clientHeight, 0.1, 100);
      camera.position.set(5.6, 4, 6.4);

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false,
        preserveDrawingBuffer: true
      });
      activeRenderer = renderer;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.domElement.dataset.room3dCanvas = "true";
      renderer.domElement.style.display = "block";
      renderer.domElement.style.height = "100%";
      renderer.domElement.style.width = "100%";
      renderer.domElement.title = "3D room preview";
      rendererElement = renderer.domElement;
      mount.appendChild(renderer.domElement);

      const controls = new OrbitControls(camera, renderer.domElement);
      activeControls = controls;
      controls.enableDamping = true;
      controls.dampingFactor = 0.06;
      controls.minDistance = 3.5;
      controls.maxDistance = 12;
      controls.maxPolarAngle = Math.PI / 2.05;
      controls.target.set(0, 1.1, -0.25);

      addLighting(scene, THREE);

      const roomGroup = new THREE.Group();
      scene.add(roomGroup);
      sceneObjects.push(roomGroup);

      if (modelUrl) {
        setRenderState("loading");
        const loader = new GLTFLoader();
        loader.crossOrigin = "anonymous";

        loader.load(
          modelUrl,
          (gltf) => {
            if (!isMounted) {
              disposeObject(gltf.scene);
              return;
            }

            centerModel(gltf.scene, THREE);
            roomGroup.clear();
            roomGroup.add(gltf.scene);
            setRenderState("ready");
          },
          undefined,
          () => {
            if (!isMounted) {
              return;
            }

            roomGroup.clear();
            buildDemoRoom(roomGroup, THREE, sourceImage);
            setRenderState("fallback");
          }
        );
      } else {
        buildDemoRoom(roomGroup, THREE, sourceImage);
        setRenderState("ready");
      }

      resizeObserver = new ResizeObserver(() => {
        if (!mount.clientWidth || !mount.clientHeight) {
          return;
        }

        camera.aspect = mount.clientWidth / mount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mount.clientWidth, mount.clientHeight);
      });
      resizeObserver.observe(mount);

      const animate = () => {
        controls.update();
        renderer.render(scene, camera);
        animationId = window.requestAnimationFrame(animate);
      };

      animate();
    }

    createViewer();

    return () => {
      isMounted = false;
      window.cancelAnimationFrame(animationId);
      resizeObserver?.disconnect();
      sceneObjects.forEach(disposeObject);
      sceneObjects = [];
      activeControls?.dispose();

      if (rendererElement?.parentElement) {
        rendererElement.parentElement.removeChild(rendererElement);
      }

      activeRenderer?.dispose();
    };
  }, [modelUrl, sourceImage]);

  const effectiveStatus = renderState === "fallback" ? "failed" : status;

  return (
    <div
      className="relative min-h-[430px] overflow-hidden bg-[#f6f0e8] md:min-h-[540px]"
      data-room-3d-viewer="true"
    >
      <div ref={mountRef} className="absolute inset-0" />

      <div className="pointer-events-none absolute left-4 top-4 flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-white/70 bg-white/62 px-3 py-1 text-xs font-semibold text-plum shadow-sm backdrop-blur-xl">
          {statusCopy[effectiveStatus]}
        </span>
        {effectiveStatus === "queued" || effectiveStatus === "processing" ? (
          <span className="rounded-full border border-white/70 bg-white/62 px-3 py-1 text-xs font-semibold text-sage shadow-sm backdrop-blur-xl">
            {Math.min(Math.max(progress, 0), 100)}%
          </span>
        ) : null}
      </div>

      {error ? (
        <div className="pointer-events-none absolute bottom-4 left-4 right-4 rounded-soft border border-white/70 bg-white/72 p-3 text-xs font-medium leading-5 text-muted shadow-sm backdrop-blur-xl">
          {error}
        </div>
      ) : null}
    </div>
  );
}

function addLighting(scene: import("three").Scene, THREE: ThreeModule) {
  const hemisphere = new THREE.HemisphereLight(0xfff7ee, 0xb6c7b0, 2.2);
  scene.add(hemisphere);

  const keyLight = new THREE.DirectionalLight(0xffffff, 2.7);
  keyLight.position.set(4, 7, 5);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(1024, 1024);
  scene.add(keyLight);

  const fillLight = new THREE.PointLight(0xffc87a, 0.8, 10);
  fillLight.position.set(-3, 2.4, 2.5);
  scene.add(fillLight);
}

function centerModel(model: ThreeObject, THREE: ThreeModule) {
  const box = new THREE.Box3().setFromObject(model);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  const maxAxis = Math.max(size.x, size.y, size.z) || 1;
  const scale = 4.4 / maxAxis;

  model.position.sub(center);
  model.scale.setScalar(scale);
  model.position.y += (size.y * scale) / 2;
}

function buildDemoRoom(group: ThreeGroup, THREE: ThreeModule, sourceImage?: string) {
  const makeStandard = (color: number, roughness = 0.72, metalness = 0.04) =>
    new THREE.MeshStandardMaterial({ color, roughness, metalness });

  const addBox = (
    size: [number, number, number],
    position: [number, number, number],
    color: number,
    roughness?: number
  ) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), makeStandard(color, roughness));
    mesh.position.set(...position);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
    return mesh;
  };

  const addMaterialBox = (
    size: [number, number, number],
    position: [number, number, number],
    material: import("three").Material
  ) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), material.clone());
    mesh.position.set(...position);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
    return mesh;
  };

  const frostedWall = new THREE.MeshPhysicalMaterial({
    color: 0xf4eadf,
    transparent: true,
    opacity: 0.72,
    roughness: 0.22,
    metalness: 0,
    transmission: 0.08,
    thickness: 0.18,
    side: THREE.DoubleSide
  });

  addBox([8, 0.09, 6.2], [0, -0.05, 0], 0xd4b889, 0.86);
  addMaterialBox([8.1, 3.2, 0.1], [0, 1.55, -3.05], frostedWall);
  addMaterialBox([0.1, 3.2, 6.2], [-4.05, 1.55, 0], frostedWall);

  const glass = new THREE.MeshPhysicalMaterial({
    color: 0xd8eef2,
    transparent: true,
    opacity: 0.44,
    roughness: 0.18,
    metalness: 0,
    transmission: 0.28,
    thickness: 0.35
  });
  const windowPanel = new THREE.Mesh(new THREE.BoxGeometry(2.35, 1.25, 0.045), glass);
  windowPanel.position.set(2.1, 1.95, -2.98);
  group.add(windowPanel);
  addBox([0.05, 1.35, 0.06], [2.1, 1.95, -2.94], 0xffffff, 0.4);
  addBox([2.45, 0.05, 0.06], [2.1, 1.95, -2.94], 0xffffff, 0.4);

  addBox([3.1, 0.1, 1.85], [-0.55, 0.03, 0.85], 0xbd766a, 0.78);
  addBox([2.45, 0.52, 0.86], [-0.65, 0.48, -0.35], 0x54736a, 0.76);
  addBox([2.6, 0.82, 0.28], [-0.65, 0.77, -0.78], 0x49685f, 0.74);
  addBox([0.32, 0.7, 0.9], [-2.05, 0.65, -0.35], 0x49685f, 0.74);
  addBox([0.32, 0.7, 0.9], [0.75, 0.65, -0.35], 0x49685f, 0.74);
  addBox([0.72, 0.26, 0.24], [-1.25, 1.02, -0.12], 0xf0d2a7, 0.8);
  addBox([0.64, 0.26, 0.24], [0.1, 1.02, -0.1], 0xceb8d7, 0.82);

  addBox([1.35, 0.18, 0.72], [-0.3, 0.43, 1.55], 0x9a724b, 0.58);
  addBox([0.16, 0.42, 0.16], [-0.86, 0.18, 1.25], 0x6b5139, 0.55);
  addBox([0.16, 0.42, 0.16], [0.26, 0.18, 1.25], 0x6b5139, 0.55);
  addBox([0.16, 0.42, 0.16], [-0.86, 0.18, 1.86], 0x6b5139, 0.55);
  addBox([0.16, 0.42, 0.16], [0.26, 0.18, 1.86], 0x6b5139, 0.55);

  addBox([0.55, 1.55, 0.25], [-3.25, 0.75, -1.9], 0xb7a675, 0.82);
  addBox([0.55, 1.55, 0.25], [-3.25, 0.75, -1.25], 0xb7a675, 0.82);
  addBox([0.72, 0.1, 1.05], [-3.25, 1.48, -1.58], 0x795e3f, 0.58);
  addBox([0.72, 0.1, 1.05], [-3.25, 0.82, -1.58], 0x795e3f, 0.58);

  const lampPole = addBox([0.08, 1.28, 0.08], [2.95, 0.68, 1.2], 0x2f3331, 0.44);
  lampPole.castShadow = false;
  const lampShade = new THREE.Mesh(
    new THREE.ConeGeometry(0.42, 0.56, 28),
    new THREE.MeshStandardMaterial({
      color: 0xf7ca82,
      emissive: 0xffb86a,
      emissiveIntensity: 0.38,
      roughness: 0.54
    })
  );
  lampShade.position.set(2.95, 1.48, 1.2);
  lampShade.castShadow = true;
  group.add(lampShade);

  const plantPot = addBox([0.36, 0.34, 0.36], [3.2, 0.18, -1.75], 0xa75f47, 0.76);
  plantPot.castShadow = true;
  const leafMaterial = makeStandard(0x5f8d60, 0.82);
  for (let index = 0; index < 7; index += 1) {
    const leaf = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16), leafMaterial);
    leaf.scale.set(0.58, 1.4, 0.32);
    leaf.position.set(
      3.2 + Math.cos(index) * 0.2,
      0.56 + Math.sin(index * 1.7) * 0.08,
      -1.75 + Math.sin(index) * 0.2
    );
    leaf.rotation.set(index * 0.4, index * 0.25, index * 0.32);
    leaf.castShadow = true;
    group.add(leaf);
  }

  if (sourceImage) {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      sourceImage,
      (texture) => {
        if (!group.parent) {
          texture.dispose();
          return;
        }

        texture.colorSpace = THREE.SRGBColorSpace;
        const board = new THREE.Mesh(
          new THREE.PlaneGeometry(1.45, 1.05),
          new THREE.MeshStandardMaterial({ map: texture, roughness: 0.88 })
        );
        board.position.set(-1.9, 1.9, -2.96);
        board.rotation.set(0, 0, 0);
        group.add(board);
      },
      undefined,
      () => undefined
    );
  }
}
