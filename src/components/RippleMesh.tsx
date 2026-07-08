import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  precision highp float;
  
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  uniform float uGridScale;
  uniform float uLineWidth;
  uniform vec3 uBaseColor;
  uniform vec3 uAccentColor;
  
  varying vec2 vUv;
  
  void main() {
    vec2 uv = vUv;
    
    vec2 gridPos = uv * uGridScale;
    vec2 gridFract = fract(gridPos) - 0.5;
    
    vec2 mouseUV = uMouse;
    float mouseDist = length(uv - mouseUV);
    float rippleRadius = 0.3;
    float rippleStrength = 0.15;
    float rippleEnvelope = smoothstep(rippleRadius, 0.0, mouseDist);
    
    float wave = sin(mouseDist * 30.0 - uTime * 4.0) * rippleEnvelope * rippleStrength;
    gridFract += wave;
    
    vec2 lineMask = smoothstep(uLineWidth, 0.0, abs(gridFract));
    float gridLines = max(lineMask.x, lineMask.y);
    
    float radialGlow = exp(-mouseDist * 6.0) * 0.5 + 0.1;
    float ambientPulse = sin(uTime * 0.8) * 0.05 + 0.95;
    
    vec3 finalColor = mix(uBaseColor, uAccentColor, gridLines * radialGlow * ambientPulse);
    
    float vignette = 1.0 - smoothstep(0.4, 1.2, length(uv - 0.5) * 1.5);
    finalColor *= vignette * 0.8 + 0.2;
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`

interface RipplePlaneProps {
  isDark: boolean;
}

function RipplePlane({ isDark }: RipplePlaneProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const { viewport } = useThree()

  const colors = useMemo(() => ({
    base: isDark ? new THREE.Color('#111827') : new THREE.Color('#F1F5F9'),
    accent: isDark ? new THREE.Color('#22D3EE') : new THREE.Color('#0891B2'),
  }), [isDark])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uGridScale: { value: 30.0 },
      uLineWidth: { value: 0.03 },
      uBaseColor: { value: colors.base },
      uAccentColor: { value: colors.accent },
    }),
    [colors]
  )

  useEffect(() => {
    uniforms.uBaseColor.value = colors.base
    uniforms.uAccentColor.value = colors.accent
  }, [colors, uniforms])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: 1.0 - e.clientY / window.innerHeight,
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      uniforms.uResolution.value.set(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [uniforms])

  useFrame((state) => {
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.ShaderMaterial
      mat.uniforms.uTime.value = state.clock.elapsedTime
      const currentMouse = mat.uniforms.uMouse.value
      const targetX = mouseRef.current.x
      const targetY = mouseRef.current.y
      currentMouse.x += (targetX - currentMouse.x) * 0.08
      currentMouse.y += (targetY - currentMouse.y) * 0.08
    }
  })

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  )
}

interface RippleMeshProps {
  isDark: boolean;
}

export default function RippleMesh({ isDark }: RippleMeshProps) {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        gl={{ antialias: true, alpha: false }}
        style={{ background: isDark ? '#030712' : '#F8FAFC' }}
      >
        <RipplePlane isDark={isDark} />
      </Canvas>
    </div>
  )
}
