import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ContactShadows, Environment, Float, MeshTransmissionMaterial } from '@react-three/drei'
import { Physics, RigidBody, BallCollider } from '@react-three/rapier'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

const palette = ['#ff654f', '#c7ed4a', '#a78bfa', '#ffbd59', '#69c9e8', '#f58ac5']

function CursorCollider() {
  const body = useRef()
  const { camera, pointer, viewport } = useThree()
  const target = useMemo(() => new THREE.Vector3(), [])
  useFrame(() => {
    if (!body.current) return
    target.set(pointer.x * viewport.width / 2, pointer.y * viewport.height / 2, 0.7)
    body.current.setNextKinematicTranslation(target)
  })
  return <RigidBody ref={body} type="kinematicPosition" colliders={false}>
    <BallCollider args={[0.48]} />
    <mesh visible={false}><sphereGeometry args={[0.48, 16, 16]} /><meshBasicMaterial /></mesh>
  </RigidBody>
}

function Toy({ position, color, shape, index }) {
  const body = useRef()
  const mesh = useRef()
  const geometry = shape === 'box' ? <boxGeometry args={[0.78, 0.78, 0.78]} /> : shape === 'torus' ? <torusKnotGeometry args={[0.34, 0.13, 96, 14]} /> : shape === 'icosa' ? <icosahedronGeometry args={[0.52, 1]} /> : <sphereGeometry args={[0.48, 48, 48]} />
  return <RigidBody ref={body} colliders="hull" position={position} restitution={0.82} friction={0.35} linearDamping={0.35} angularDamping={0.25}>
    <mesh ref={mesh} castShadow receiveShadow geometry={undefined}>
      {geometry}
      <meshPhysicalMaterial color={color} roughness={0.16} metalness={0.08} clearcoat={1} clearcoatRoughness={0.08} />
    </mesh>
  </RigidBody>
}

function Scene({ resetKey }) {
  const toys = useMemo(() => Array.from({ length: 15 }, (_, i) => ({
    position: [((i % 5) - 2) * 1.05 + (Math.random() - .5) * .25, Math.floor(i / 5) * 1.05 - 0.5, (Math.random() - .5) * 1.2],
    color: palette[i % palette.length], shape: ['sphere', 'box', 'icosa', 'torus'][i % 4]
  })), [resetKey])
  return <>
    <ambientLight intensity={1.15} />
    <directionalLight position={[4, 7, 5]} intensity={2.5} castShadow shadow-mapSize={[1024, 1024]} />
    <Environment preset="studio" />
    <Physics gravity={[0, -4.5, 0]}>
      <RigidBody type="fixed" restitution={0.7}><mesh position={[0, -2.05, 0]} receiveShadow><boxGeometry args={[13, .3, 4]} /><meshStandardMaterial color="#e5e2d9" roughness={.85} /></mesh></RigidBody>
      <RigidBody type="fixed" colliders={false}><BallCollider args={[.01]} position={[0, 0, -2]} /></RigidBody>
      {toys.map((toy, i) => <Toy key={`${resetKey}-${i}`} {...toy} index={i} />)}
      <CursorCollider />
    </Physics>
    <ContactShadows position={[0, -1.88, 0]} opacity={.24} scale={13} blur={2.5} far={4} />
  </>
}

export default function Toybox({ resetKey }) {
  return <Canvas shadows camera={{ position: [0, 0.4, 9], fov: 43 }} dpr={[1, 1.6]} gl={{ antialias: true, alpha: true }}>
    <Scene resetKey={resetKey} />
  </Canvas>
}
