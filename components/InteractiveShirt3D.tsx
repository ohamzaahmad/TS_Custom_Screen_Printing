import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export const InteractiveShirt3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // References to Three.js instances
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const shirtGroupRef = useRef<THREE.Group | null>(null);
  const canvasTextureRef = useRef<THREE.CanvasTexture | null>(null);
  const shirtMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);

  // Mouse, Scroll & Drag State
  const mouseNdcRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const isDraggingRef = useRef<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const dragRotationRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const currentRotationRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const scrollRotationRef = useRef<number>(0);
  const animFrameIdRef = useRef<number | null>(null);

  // Setup Three.js Scene, Camera, Lighting & 3D Shirt Model
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Perspective Camera: Balanced perspective with generous headroom (top never cropped) and ample side clearance
    const camera = new THREE.PerspectiveCamera(
      30,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, -0.05, 1.48);
    cameraRef.current = camera;

    // 3. WebGL Renderer: Alpha transparent (NO container div/card box)
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    rendererRef.current = renderer;

    // 4. Studio Lighting Setup for Photorealistic Cloth Folds & Shading
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    // Primary key light from top-right casting soft fabric shadows
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(2.5, 3.5, 3.2);
    scene.add(keyLight);

    // Fill light from bottom-left for soft depth
    const fillLight = new THREE.DirectionalLight(0xdbeafe, 1.2);
    fillLight.position.set(-2.5, -0.5, 2.2);
    scene.add(fillLight);

    // Warm rim light highlighting fabric edge drape and silhouette
    const rimLight = new THREE.DirectionalLight(0xff8a00, 1.1);
    rimLight.position.set(0, -2.5, -2.0);
    scene.add(rimLight);

    // Cool secondary rim light
    const backRimLight = new THREE.DirectionalLight(0x818cf8, 0.9);
    backRimLight.position.set(0, 3.0, -2.5);
    scene.add(backRimLight);

    // 5. Build High-Impact Screen-Printed Texture Canvas (1024x1024)
    const texCanvas = document.createElement('canvas');
    texCanvas.width = 1024;
    texCanvas.height = 1024;
    const ctx = texCanvas.getContext('2d');

    const texture = new THREE.CanvasTexture(texCanvas);
    texture.flipY = false;
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    canvasTextureRef.current = texture;

    // Render base cotton fabric
    const drawBaseTexture = () => {
      if (!ctx) return;

      // Premium ringspun combed cotton in rich dark midnight navy
      ctx.fillStyle = '#0e1b38';
      ctx.fillRect(0, 0, 1024, 1024);

      // Subtle natural heather yarn micro-grain for dark fabric
      ctx.fillStyle = 'rgba(255, 255, 255, 0.025)';
      for (let i = 0; i < 3000; i++) {
        const rx = Math.random() * 1024;
        const ry = Math.random() * 1024;
        const rw = Math.random() * 2 + 1;
        ctx.fillRect(rx, ry, rw, 1);
      }
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      for (let i = 0; i < 2000; i++) {
        const rx = Math.random() * 1024;
        const ry = Math.random() * 1024;
        const rw = Math.random() * 2 + 1;
        ctx.fillRect(rx, ry, rw, 1);
      }

      // Back Screen Print: Oversized bold technical typography
      // Back UV center: pxX = 763, pxY = 264
      ctx.save();
      ctx.translate(763, 264);

      ctx.font = '900 24px Oswald, sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.fillText('ST CUSTOM SCREEN PRINTING', 0, -50);

      ctx.font = '800 12px Oswald, sans-serif';
      ctx.fillStyle = '#FF6B00';
      ctx.fillText('INDUSTRIAL SCALE • BOUTIQUE QUALITY', 0, -28);

      // Oversized ST monogram in watermark plastisol
      ctx.font = '900 88px Oswald, sans-serif';
      ctx.fillStyle = 'rgba(255, 107, 0, 0.22)';
      ctx.fillText('ST', 0, 24);

      ctx.font = '700 8px Poppins, sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.letterSpacing = '2px';
      ctx.fillText('MANAHAWKIN, NJ • HEAVYWEIGHT DIVISION', 0, 68);
      ctx.fillText('PREMIUM DISCHARGE & PLASTISOL INK LAB', 0, 84);

      ctx.restore();
    };

    drawBaseTexture();

    // 6. Load Master Great Wave Screen Print Graphic onto Chest
    // Chest UV center: pxX = 265, pxY = 278
    const graphicImg = new Image();
    graphicImg.crossOrigin = 'anonymous';
    graphicImg.onload = () => {
      if (!ctx) return;

      // Draw high-impact great wave streetwear graphic across the chest
      const printWidth = 180;
      const printHeight = Math.round(180 * (1200 / 896)); // Preserve exact aspect ratio
      const chestX = 265 - printWidth / 2;
      const chestY = 278 - printHeight / 2;

      ctx.save();
      // Subtle ink deposit shadow for authentic screen-printed raised plastisol feel
      ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
      ctx.shadowBlur = 6;
      ctx.shadowOffsetY = 3;
      ctx.drawImage(graphicImg, chestX, chestY, printWidth, printHeight);
      ctx.restore();

      texture.needsUpdate = true;
    };
    graphicImg.src = '/prints/st_wave_print_transparent.png';

    // 7. Shirt Group for dynamic rotation & positioning
    const shirtGroup = new THREE.Group();
    scene.add(shirtGroup);
    shirtGroupRef.current = shirtGroup;

    // 8. Load 3D Shirt Model and retain its pre-baked normal & AO maps for maximum cloth realism
    const loader = new GLTFLoader();
    loader.load(
      '/models/shirt_baked.glb',
      (gltf) => {
        const shirtMesh = gltf.scene.getObjectByName('T_Shirt_male') as THREE.Mesh;
        if (shirtMesh) {
          const origMat = shirtMesh.material as THREE.MeshStandardMaterial;

          // Preserve the model's baked cloth normal map and ambient occlusion map
          const realisticMat = new THREE.MeshStandardMaterial({
            map: texture,
            normalMap: origMat.normalMap || null,
            normalScale: origMat.normalScale ? new THREE.Vector2(origMat.normalScale.x * 1.25, origMat.normalScale.y * 1.25) : new THREE.Vector2(3.5, -3.5),
            aoMap: origMat.aoMap || null,
            aoMapIntensity: 1.5,
            roughness: 0.58,
            metalness: 0.04,
            side: THREE.DoubleSide,
          });

          shirtMesh.material = realisticMat;
          shirtMaterialRef.current = realisticMat;

          // Center geometry at chest pivot with vertical headroom
          // Center geometry at chest pivot with generous vertical headroom
          shirtMesh.geometry.computeBoundingBox();
          const bbox = shirtMesh.geometry.boundingBox;
          if (bbox) {
            const centerY = (bbox.max.y + bbox.min.y) / 2;
            const centerZ = (bbox.max.z + bbox.min.z) / 2;
            // Position mesh so the collar has guaranteed headroom at top and never crops
            shirtMesh.position.set(0, -centerY - 0.02, -centerZ);
          }

          shirtGroup.add(shirtMesh);
          // Refined scale: slightly smaller for clean balance and zero top/left/right edge cropping
          shirtGroup.scale.set(1.02, 1.02, 1.02);
          setIsLoaded(true);
        }
      },
      undefined,
      (err) => console.error('Failed to load 3D shirt model:', err)
    );

    // 9. Track Homepage Scroll Progress and drive 3D Shirt Rotation
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Smooth scroll rotation: spins the shirt as the user scrolls down the homepage
      scrollRotationRef.current = scrollY * 0.0035;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // 10. Main 60fps Animation Loop with smooth lerp damping
    const animate = (time: number) => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      // Target Y rotation combines: Scroll continuous spin + Manual drag + Subtle mouse perspective (unlimited 360)
      const targetY = scrollRotationRef.current + dragRotationRef.current.y + mouseNdcRef.current.x * 0.28;
      // Target X rotation: Clamped pitch tilt so the collar never cuts off at top
      const rawTargetX = dragRotationRef.current.x - mouseNdcRef.current.y * 0.12 + Math.sin(window.scrollY * 0.002) * 0.08;
      const targetX = Math.max(-0.24, Math.min(0.24, rawTargetX));

      // Smooth damping (lerp)
      currentRotationRef.current.x += (targetX - currentRotationRef.current.x) * 0.07;
      currentRotationRef.current.y += (targetY - currentRotationRef.current.y) * 0.07;

      // Subtle organic breathing float
      const breath = Math.sin(time * 0.0015) * 0.008;

      if (shirtGroupRef.current) {
        shirtGroupRef.current.rotation.x = currentRotationRef.current.x;
        shirtGroupRef.current.rotation.y = currentRotationRef.current.y;
        shirtGroupRef.current.position.y = 0.010 + breath + Math.cos(window.scrollY * 0.002) * 0.008;
      }

      renderer.render(scene, camera);
    };

    animFrameIdRef.current = requestAnimationFrame(animate);

    // 11. Responsive Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      renderer.dispose();
      texture.dispose();
    };
  }, []);

  // Pointer & Drag Interaction Handlers (allows free 360° orbital exploration)
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    // Normalised mouse coordinates for perspective tilt
    const ndcX = (clientX / rect.width) * 2 - 1;
    const ndcY = -(clientY / rect.height) * 2 + 1;
    mouseNdcRef.current = { x: ndcX, y: ndcY };

    // Orbital drag
    if (isDraggingRef.current) {
      const deltaX = e.clientX - dragStartRef.current.x;
      const deltaY = e.clientY - dragStartRef.current.y;
      dragRotationRef.current.y += deltaX * 0.008;
      // Smoothly clamp pitch tilt so dragging up/down never flips or clips the shirt
      dragRotationRef.current.x = Math.max(
        -0.35,
        Math.min(0.35, dragRotationRef.current.x + deltaY * 0.005)
      );
      dragStartRef.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore pointer capture release error if already released
    }
  };

  const handlePointerLeave = () => {
    mouseNdcRef.current = { x: 0, y: 0 };
    isDraggingRef.current = false;
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
      className="relative w-full lg:w-[460px] xl:w-[520px] 2xl:w-[580px] h-[640px] xl:h-[700px] 2xl:h-[760px] flex items-center justify-center select-none cursor-grab active:cursor-grabbing group"
      aria-label="Interactive 3D screen printed apparel model"
    >
      {/* Ambient soft ground shadow */}
      <div
        className="absolute bottom-6 w-72 h-8 bg-black/50 rounded-full blur-xl pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Three.js Canvas (Pure 3D Shirt, Transparent, NO div box, NO card borders, NO brush UI) */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain relative z-10"
      />

      {/* Discreet hint at bottom right (auto-fades, no button clutter) */}
      <div className="absolute bottom-2 right-4 flex items-center gap-2 pointer-events-none opacity-40 group-hover:opacity-75 transition-opacity duration-300">
        <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
        <span className="text-[10px] font-mono uppercase tracking-widest text-white/80">
          3D Live Preview • Scroll / Drag to Rotate
        </span>
      </div>

      {/* Loading state indicator */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <div className="w-10 h-10 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

export default InteractiveShirt3D;
