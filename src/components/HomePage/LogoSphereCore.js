// components/HomePage/LogoSphereCore.js (RENAMED and OPTIMIZED)
"use client";

import { useEffect, useRef, useMemo } from "react";
import * as THREE from "three";
// Removed OrbitControls as it's disabled anyway and adds to bundle size
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"; // REMOVE THIS
import styles from "@/styles/AnimatedLogo3.module.css"; // Keep styles if needed for parent divs

export default function LogoSphereCore({ isVisible = true }) {
  const containerRef = useRef(null);
  const animationFrameId = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const logoGroupRef = useRef(null);
  const particlesGroupRef = useRef(null);
  const logoDiscRef = useRef(null);

  // Memoize parameters to prevent re-creation and optimize performance
  const threeSetupParams = useMemo(() => {
    // Reduced particle counts for performance
    const n1 = 15; // From 35
    const n2 = 25; // From 60
    const n3 = 30; // From 100

    return {
      n1, n2, n3,
      particleSize: 0.08, // Base particle size
      logoDiscSegments: 32, // Reduced from 64
    };
  }, []);

  // Use a single useEffect for the core Three.js logic
  useEffect(() => {
    if (!containerRef.current) return;

    let isComponentMounted = true; // Flag to prevent updates on unmounted component

    // Clear any existing canvas elements from previous renders
    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }

    // --- Three.js scene setup ---
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      50,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: false, // 💥 SIGNIFICANT PERFORMANCE BOOST 💥
      alpha: true, // For transparent background
      powerPreference: "high-performance", // Hint for GPU
    });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // 💥 Limit pixel ratio to 2x for performance 💥
    renderer.setClearColor(0x000000, 0); // Transparent background
    renderer.shadowMap.enabled = false; // 💥 Disable shadows for performance 💥
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Make sure the renderer's DOM element doesn't block touch events
    renderer.domElement.style.pointerEvents = "none";

    // REMOVED OrbitControls code as it was disabled anyway

    // --- Lighting - Simplified ---
    scene.add(new THREE.AmbientLight(0xffffff, 0.7)); // Adjusted intensity
    const mainLight = new THREE.DirectionalLight(0x6682cc, 0.3); // Adjusted intensity
    mainLight.position.set(0, 0, 5);
    scene.add(mainLight);

    // Removed fillLight and bottomLight for simplicity/performance if not critical

    // --- Central logo group ---
    const logoGroup = new THREE.Group();
    logoGroupRef.current = logoGroup;
    scene.add(logoGroup);

    // Load Atorix logo texture
    const textureLoader = new THREE.TextureLoader();
    const logoTexture = textureLoader.load(
      "/Navbar/arrow.avif",
      // On load callback to process texture
      (texture) => {
        if (!isComponentMounted) return; // Don't process if component unmounted

        // Original canvas texture manipulation for color enhancement and padding
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        const img = texture.image;

        canvas.width = img.width;
        canvas.height = img.height;

        const paddingPercentage = 0.25;
        const drawWidth = img.width * (1 - paddingPercentage * 2);
        const drawHeight = img.height * (1 - paddingPercentage * 2);
        const offsetX = img.width * paddingPercentage;
        const offsetY = img.height * paddingPercentage;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
          if (data[i + 3] > 0) {
            data[i] = Math.max(Math.min(data[i] * 0.8, 255), 0);
            data[i + 1] = Math.max(Math.min(data[i + 1] * 0.8, 255), 0);
            if (data[i + 2] > 128) {
              data[i + 2] = Math.max(Math.min(data[i + 2] * 0.9, 255), 0);
            } else if (data[i + 2] > 50) {
              data[i + 2] = Math.max(Math.min(data[i + 2] * 0.95, 255), 0);
            }
            const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
            if (brightness < 100) {
              data[i] = Math.max(data[i] * 0.7, 0);
              data[i + 1] = Math.max(data[i + 1] * 0.7, 0);
              data[i + 2] = Math.max(data[i + 2] * 0.7, 0);
            }
            if (data[i + 3] < 200 && data[i + 3] > 30) {
              data[i + 3] = Math.min(data[i + 3] * 1.2, 255);
            }
          }
        }
        context.putImageData(imageData, 0, 0);

        texture.image = canvas;
        texture.needsUpdate = true;
      },
      undefined, // onProgress callback
      (err) => {
        console.error("Error loading logo texture:", err);
      }
    );

    // Create material for logo - 💥 CHANGED TO MeshBasicMaterial for less computation 💥
    const logoMaterial = new THREE.MeshBasicMaterial({ 
      map: logoTexture,
      transparent: true,
      side: THREE.FrontSide,
    });

    const logoDisc = new THREE.Mesh(
      new THREE.CircleGeometry(2.3, threeSetupParams.logoDiscSegments),
      logoMaterial
    );
    logoDisc.position.z = 0.1;
    logoGroup.add(logoDisc);
    logoDiscRef.current = logoDisc; // Store reference

    // Add a darker backplate - 💥 CHANGED TO MeshBasicMaterial 💥
    const backplateMaterial = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.12,
      side: THREE.BackSide,
    });
    const backplate = new THREE.Mesh(
      new THREE.CircleGeometry(2.35, threeSetupParams.logoDiscSegments),
      backplateMaterial
    );
    backplate.position.z = -0.01;
    logoGroup.add(backplate);

    // --- RINGS SECTION COMPLETELY REMOVED ---

    // --- Particles System (Reduced Complexity) ---
    const createCircleTexture = () => {
      const canvas = document.createElement("canvas");
      const size = 32; // 💥 Smaller texture size 💥
      canvas.width = size;
      canvas.height = size;
      const context = canvas.getContext("2d");
      const gradient = context.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      context.fillStyle = gradient;
      context.fillRect(0, 0, size, size);
      const texture = new THREE.Texture(canvas);
      texture.needsUpdate = true;
      return texture;
    };

    const particleTexture = createCircleTexture();

    const particlesGroup = new THREE.Group();
    particlesGroupRef.current = particlesGroup;
    scene.add(particlesGroup);

    // Simplified particle creation function
    const createParticles = (numParticles, radiusRange, color, size, opacity) => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(numParticles * 3);
      
      for (let i = 0; i < numParticles; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = (radiusRange[0] + Math.random() * (radiusRange[1] - radiusRange[0]));
        
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
      }
      
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      
      const material = new THREE.PointsMaterial({
        size: size,
        color: new THREE.Color(color),
        transparent: true,
        opacity: opacity,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
        map: particleTexture,
      });
      
      return new THREE.Points(geometry, material);
    };

    // Reduced particle counts based on threeSetupParams
    const mainSparkles = createParticles(threeSetupParams.n1, [2.0, 2.5], 0x6682cc, threeSetupParams.particleSize * 1.5, 0.8);
    const secondarySparkles = createParticles(threeSetupParams.n2, [2.5, 3.0], 0x8491c8, threeSetupParams.particleSize, 0.7);
    const dust = createParticles(threeSetupParams.n3, [3.0, 3.5], 0xAAAAAA, threeSetupParams.particleSize * 0.5, 0.5);

    particlesGroup.add(mainSparkles);
    particlesGroup.add(secondarySparkles);
    particlesGroup.add(dust);

    // --- ANIMATION LOOP ---
    let lastRenderTime = performance.now(); // Use performance.now() for better accuracy
    const animate = (currentTime) => {
      if (!isComponentMounted) return; // Stop if component unmounted

      animationFrameId.current = requestAnimationFrame(animate);

      // 💥 Only render and animate if the component is visible in the viewport 💥
      if (isVisible) {
        const delta = (currentTime - lastRenderTime) / 1000; // time in seconds
        lastRenderTime = currentTime;

        // RINGS ROTATION REMOVED

        // Rotate particle groups
        if (particlesGroupRef.current) {
          particlesGroupRef.current.rotation.y += 0.003 * delta * 60;
          mainSparkles.rotation.y += 0.001 * delta * 60;
          mainSparkles.rotation.x -= 0.0005 * delta * 60;
          secondarySparkles.rotation.y -= 0.002 * delta * 60;
          secondarySparkles.rotation.z += 0.001 * delta * 60;
          dust.rotation.y += 0.0004 * delta * 60;
          dust.rotation.x -= 0.0002 * delta * 60;
        }

        // Pulse the particles subtly
        const time = currentTime * 0.001;
        if (mainSparkles.material) mainSparkles.material.size = threeSetupParams.particleSize * 1.5 + Math.sin(time * 0.8) * 0.03;
        if (secondarySparkles.material) secondarySparkles.material.size = threeSetupParams.particleSize + Math.sin(time * 1.2) * 0.015;

        // Subtle floating animation for logo
        if (logoGroupRef.current) {
          logoGroupRef.current.position.y = Math.sin(time) * 0.05;
        }

        // Always make the logo face the camera (if it exists)
        if (logoDiscRef.current && cameraRef.current) {
          logoDiscRef.current.lookAt(cameraRef.current.position);
        }

        rendererRef.current.render(sceneRef.current, cameraRef.current);
      } else {
        // If not visible, ensure lastRenderTime is updated to prevent jump when it becomes visible again
        lastRenderTime = currentTime;
      }
    };

    animationFrameId.current = requestAnimationFrame(animate);

    // --- RESIZE HANDLING ---
    const handleResize = () => {
      if (!containerRef.current || !isComponentMounted) return;

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      if (cameraRef.current) {
        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();
      }
      if (rendererRef.current) {
        rendererRef.current.setSize(width, height);
      }

      // Re-apply scaling logic (rings scaling removed)
      if (logoGroupRef.current && particlesGroupRef.current) {
        const isMobile = width < 600;
        const isTablet = width >= 600 && width < 1024;
        
        let scale = 1;
        let cameraZ = 5;

        if (isMobile) {
          scale = 0.8;
          cameraZ = 6;
        } else if (isTablet) {
          scale = 0.9;
          cameraZ = 5.5;
        }
        
        logoGroupRef.current.scale.set(scale, scale, scale);
        particlesGroupRef.current.scale.set(scale, scale, scale);
        if (cameraRef.current) cameraRef.current.position.z = cameraZ;
      }
    };

    handleResize(); // Initial call
    window.addEventListener("resize", handleResize);

    // --- CLEANUP ---
    return () => {
      isComponentMounted = false; // Mark component as unmounted
      window.removeEventListener("resize", handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }

      if (containerRef.current && rendererRef.current && rendererRef.current.domElement) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }

      // Dispose of all Three.js resources to prevent memory leaks
      scene.traverse((object) => {
        if (object.isMesh || object.isPoints) {
          if (object.geometry) {
            object.geometry.dispose();
          }
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach((material) => {
                if (material.map) material.map.dispose();
                material.dispose();
              });
            } else {
              if (object.material.map) object.material.map.dispose();
              object.material.dispose();
            }
          }
        }
      });

      if (particleTexture) particleTexture.dispose();
      // Ensure the logoTexture is also disposed, careful with shared textures if any
      // If logoTexture is defined directly in this scope and not shared, dispose it:
      // if (logoTexture) logoTexture.dispose(); 
      if (rendererRef.current) rendererRef.current.dispose();
    };
  }, [isVisible, threeSetupParams]); // Re-run effect if isVisible changes or memoized params change

  return (
    <>
      <div className={styles.linesContainer}>
        <div className={`${styles.arcLine} ${styles.line1}`}></div>
        <div className={`${styles.arcLine} ${styles.line2}`}></div>
        <div className={`${styles.arcLine} ${styles.line3}`}></div>
      </div>
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "100%",
          minHeight: "100%", // Maintain height to prevent CLS
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          scale: "1", // This scale property might interfere with responsive adjustments. Consider moving this to CSS if it's causing issues.
        }}
      />
    </>
  );
}