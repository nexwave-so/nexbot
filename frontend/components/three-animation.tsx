"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function ThreeAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<{
    scene: THREE.Scene
    camera: THREE.PerspectiveCamera
    renderer: THREE.WebGLRenderer
    wave: THREE.Mesh
    particles: THREE.Mesh[]
    mouseX: number
    mouseY: number
    windowHalfX: number
    windowHalfY: number
  } | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    // Initialize Three.js scene
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0, 0, 5)

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x1d155a, 1)

    // Create the digital liquidity wave
    const geometry = new THREE.PlaneGeometry(20, 10, 100, 50)

    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color(0x00cbf9) }, // Nexwave cyan
        color2: { value: new THREE.Color(0x3df4ce) }, // Nexwave light blue
        opacity: { value: 0.8 },
      },
      vertexShader: `
        uniform float time;
        varying vec2 vUv;
        varying float vElevation;
        
        void main() {
          vUv = uv;
          
          vec4 modelPosition = modelMatrix * vec4(position, 1.0);
          float elevation = sin(modelPosition.x * 2.0 + time) * 0.5;
          elevation += sin(modelPosition.x * 4.0 + time * 2.0) * 0.25;
          elevation += sin(modelPosition.y * 3.0 + time * 1.5) * 0.3;
          
          modelPosition.z += elevation;
          vElevation = elevation;
          
          vec4 viewPosition = viewMatrix * modelPosition;
          vec4 projectedPosition = projectionMatrix * viewPosition;
          
          gl_Position = projectedPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 color1;
        uniform vec3 color2;
        uniform float opacity;
        varying vec2 vUv;
        varying float vElevation;
        
        void main() {
          vec3 color = mix(color1, color2, vElevation + 0.5);
          gl_FragColor = vec4(color, opacity);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    })

    const wave = new THREE.Mesh(geometry, material)
    wave.rotation.x = -Math.PI * 0.3
    wave.position.y = -2
    scene.add(wave)

    // Create floating orbs
    const orbGeometry = new THREE.SphereGeometry(0.05, 16, 16)
    const orbMaterial = new THREE.MeshBasicMaterial({
      color: 0x00cbf9,
      transparent: true,
      opacity: 0.8,
    })

    const particles: THREE.Mesh[] = []

    for (let i = 0; i < 50; i++) {
      const orb = new THREE.Mesh(orbGeometry, orbMaterial.clone())

      orb.position.set((Math.random() - 0.5) * 20, -3 + Math.random() * 2, (Math.random() - 0.5) * 10)

      orb.userData = {
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.008, // Reduced from 0.02 to 0.008
          Math.random() * 0.02 + 0.005, // Reduced from 0.05 + 0.01 to 0.02 + 0.005
          (Math.random() - 0.5) * 0.008, // Reduced from 0.02 to 0.008
        ),
        life: Math.random() * 100,
        maxLife: 100 + Math.random() * 100,
      }

      particles.push(orb)
      scene.add(orb)
    }

    // Store scene data
    sceneRef.current = {
      scene,
      camera,
      renderer,
      wave,
      particles,
      mouseX: 0,
      mouseY: 0,
      windowHalfX: window.innerWidth / 2,
      windowHalfY: window.innerHeight / 2,
    }

    // Mouse movement handler
    const handleMouseMove = (event: MouseEvent) => {
      if (!sceneRef.current) return
      sceneRef.current.mouseX = (event.clientX - sceneRef.current.windowHalfX) / sceneRef.current.windowHalfX
      sceneRef.current.mouseY = (event.clientY - sceneRef.current.windowHalfY) / sceneRef.current.windowHalfY
    }

    // Window resize handler
    const handleResize = () => {
      if (!sceneRef.current) return

      sceneRef.current.windowHalfX = window.innerWidth / 2
      sceneRef.current.windowHalfY = window.innerHeight / 2

      sceneRef.current.camera.aspect = window.innerWidth / window.innerHeight
      sceneRef.current.camera.updateProjectionMatrix()

      sceneRef.current.renderer.setSize(window.innerWidth, window.innerHeight)
    }

    // Animation loop
    const animate = () => {
      if (!sceneRef.current) return

      requestAnimationFrame(animate)

      const time = Date.now() * 0.001
      const { scene, camera, renderer, wave, particles, mouseX, mouseY } = sceneRef.current

      // Update wave animation
      if (wave.material instanceof THREE.ShaderMaterial) {
        wave.material.uniforms.time.value = time
      }

      // Update camera position based on mouse movement
      camera.position.x += (mouseX * 2 - camera.position.x) * 0.05
      camera.position.y += (-mouseY * 2 - camera.position.y) * 0.05
      camera.lookAt(scene.position)

      // Animate floating orbs
      particles.forEach((orb) => {
        orb.position.add(orb.userData.velocity)
        orb.userData.life++

        const lifeRatio = orb.userData.life / orb.userData.maxLife
        if (orb.material instanceof THREE.MeshBasicMaterial) {
          orb.material.opacity = Math.max(0, 0.8 * (1 - lifeRatio))
        }

        if (orb.userData.life > orb.userData.maxLife) {
          orb.position.set((Math.random() - 0.5) * 20, -3 + Math.random() * 2, (Math.random() - 0.5) * 10)
          orb.userData.life = 0
          if (orb.material instanceof THREE.MeshBasicMaterial) {
            orb.material.opacity = 0.8
          }
        }
      })

      renderer.render(scene, camera)
    }

    // Add event listeners
    document.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", handleResize)

    // Start animation
    animate()

    // Cleanup
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)

      if (sceneRef.current) {
        sceneRef.current.renderer.dispose()
      }
    }
  }, [])

  return <canvas ref={canvasRef} id="three-canvas" />
}
