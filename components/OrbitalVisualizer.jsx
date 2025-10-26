'use client';

import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';

// Orbital colors
const ORBITAL_COLORS = {
  s: '#3b82f6', // blue
  p: '#ef4444', // red
  d: '#10b981', // green
  f: '#a855f7', // purple
};

// Electron component
function Electron({ position, color = '#ffff00' }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.1;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.15, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
    </mesh>
  );
}

// Nucleus component
function Nucleus({ protons, neutrons }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  const nucleusSize = Math.pow(protons + neutrons, 1/3) * 0.3;

  return (
    <group ref={meshRef}>
      <mesh>
        <sphereGeometry args={[nucleusSize, 32, 32]} />
        <meshStandardMaterial color="#4ade80" emissive="#22c55e" emissiveIntensity={0.3} />
      </mesh>
      <Text
        position={[0, 0, nucleusSize + 0.3]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {protons}p {neutrons}n
      </Text>
    </group>
  );
}

// Orbital shell visualization
function OrbitalShell({ shell, subshell, electrons, maxElectrons }) {
  const meshRef = useRef();
  const radius = Math.pow(shell, 2) * 0.8;
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * (0.2 / shell);
    }
  });

  const electronPositions = useMemo(() => {
    const positions = [];
    const angleStep = (2 * Math.PI) / maxElectrons;
    
    for (let i = 0; i < electrons; i++) {
      const angle = i * angleStep;
      
      if (subshell === 's') {
        positions.push([
          radius * Math.cos(angle),
          radius * Math.sin(angle) * 0.3,
          radius * Math.sin(angle) * 0.7,
        ]);
      } else if (subshell === 'p') {
        const axis = Math.floor(i / 2) % 3;
        const side = i % 2 === 0 ? 1 : -1;
        
        if (axis === 0) {
          positions.push([radius * side, radius * Math.cos(angle) * 0.3, radius * Math.sin(angle) * 0.3]);
        } else if (axis === 1) {
          positions.push([radius * Math.cos(angle) * 0.3, radius * side, radius * Math.sin(angle) * 0.3]);
        } else {
          positions.push([radius * Math.cos(angle) * 0.3, radius * Math.sin(angle) * 0.3, radius * side]);
        }
      } else if (subshell === 'd') {
        // d orbitals have complex shapes
        const axis = Math.floor(i / 2) % 5;
        const side = i % 2 === 0 ? 1 : -1;
        
        positions.push([
          radius * Math.cos(angle + axis * 0.4) * side,
          radius * Math.sin(angle + axis * 0.4),
          radius * Math.cos(angle * 2 + axis * 0.3) * 0.5,
        ]);
      } else if (subshell === 'f') {
        // f orbitals have very complex shapes
        const phase = Math.floor(i / 2) % 7;
        const side = i % 2 === 0 ? 1 : -1;
        
        positions.push([
          radius * Math.cos(angle + phase * 0.3) * side * 0.8,
          radius * Math.sin(angle + phase * 0.5) * 0.8,
          radius * Math.cos(angle * 1.5 + phase * 0.4) * side * 0.8,
        ]);
      } else {
        // Fallback for any other subshell
        positions.push([
          radius * Math.cos(angle),
          radius * Math.sin(angle),
          radius * Math.cos(angle * 2) * 0.5,
        ]);
      }
    }
    
    return positions;
  }, [shell, subshell, electrons, maxElectrons, radius]);

  const color = ORBITAL_COLORS[subshell] || '#888888';

  return (
    <group ref={meshRef}>
      <mesh>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.05}
          wireframe
        />
      </mesh>
      
      {electronPositions.map((pos, i) => (
        <Electron key={i} position={pos} color={color} />
      ))}
      
      <Text
        position={[0, radius + 0.5, 0]}
        fontSize={0.25}
        color={color}
        anchorX="center"
        anchorY="middle"
      >
        {shell}{subshell} ({electrons}/{maxElectrons})
      </Text>
    </group>
  );
}

// Main 3D Atom component
function Atom3D({ configuration, protons }) {
  const neutrons = Math.round(protons * 1.2);

  const shells = useMemo(() => {
    const shellData = [];
    
    for (const [orbital, electronCount] of Object.entries(configuration)) {
      const shell = parseInt(orbital[0]);
      const subshell = orbital[1];
      
      let orbitals = 1;
      if (subshell === 'p') orbitals = 3;
      else if (subshell === 'd') orbitals = 5;
      else if (subshell === 'f') orbitals = 7;
      
      const maxElectrons = orbitals * 2;
      
      shellData.push({
        shell,
        subshell,
        electrons: electronCount,
        maxElectrons,
        key: orbital,
      });
    }
    
    return shellData;
  }, [configuration]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      <Nucleus protons={protons} neutrons={neutrons} />
      
      {shells.map((shell) => (
        <OrbitalShell
          key={shell.key}
          shell={shell.shell}
          subshell={shell.subshell}
          electrons={shell.electrons}
          maxElectrons={shell.maxElectrons}
        />
      ))}
      
      <OrbitControls enableZoom={true} enablePan={true} />
    </>
  );
}

// Main wrapper component
export default function OrbitalVisualizer({ configuration, protons }) {
  if (!configuration || Object.keys(configuration).length === 0) {
    return (
      <div className="w-full h-[600px] bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center">
        <p className="text-white">No electron configuration available</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[600px] bg-gray-900 rounded-lg overflow-hidden">
      <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
        <Suspense fallback={null}>
          <Atom3D configuration={configuration} protons={protons} />
        </Suspense>
      </Canvas>
    </div>
  );
}