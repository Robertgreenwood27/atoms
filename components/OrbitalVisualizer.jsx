'use client';

import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';

const ORBITAL_COLORS = {
  s: '#3b82f6',
  p: '#ef4444',
  d: '#10b981',
  f: '#a855f7',
};

const factorialCache = new Array(20).fill(0);
factorialCache[0] = 1;
function factorial(n) {
  if (n < 0) return 0;
  if (factorialCache[n]) return factorialCache[n];
  return (factorialCache[n] = n * factorial(n - 1));
}

function binomial(n, k) {
  if (k < 0 || k > n) return 0;
  return factorial(n) / (factorial(k) * factorial(n - k));
}

function generalizedLaguerre(n, alpha, x) {
  let result = 0;
  for (let k = 0; k <= n; k++) {
    const sign = k % 2 === 0 ? 1 : -1;
    const term = sign * binomial(n + alpha, n - k) * Math.pow(x, k) / factorial(k);
    result += term;
  }
  return result;
}

function legendre(l, x) {
  if (l === 0) return 1;
  if (l === 1) return x;
  if (l === 2) return (3 * x * x - 1) / 2;
  if (l === 3) return (5 * x * x * x - 3 * x) / 2;
  return 0;
}

function radial(n, l, r, Z = 1) {
  const rho = (2 * Z * r) / n;
  const norm = Math.sqrt(Math.pow(2 * Z / n, 3) * factorial(n - l - 1) / (2 * n * factorial(n + l)));
  const L = generalizedLaguerre(n - l - 1, 2 * l + 1, rho);
  return norm * Math.exp(-rho / 2) * Math.pow(rho, l) * L;
}

// -------------------- nucleus --------------------
function Nucleus({ protons, neutrons }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
  });

  const nucleusSize = Math.pow(protons + neutrons, 1 / 3) * 0.3;

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

// -------------------- orbital shell --------------------
function OrbitalShell({ shell, subshell, electrons, maxElectrons }) {
  const groupRef = useRef();
  const lMap = { s: 0, p: 1, d: 2, f: 3 };
  const l = lMap[subshell] || 0;
  const n = shell;
  const color = ORBITAL_COLORS[subshell] || '#888888';

  useFrame((state) => {
    if (groupRef.current) groupRef.current.rotation.y = state.clock.elapsedTime * (0.2 / shell);
  });

  // Generate points
  const positions = useMemo(() => {
    const numPoints = Math.floor(60000 * (electrons / maxElectrons)); // Increased from 30000 to 60000
    if (numPoints === 0) return new Float32Array(0);

    const Z = 1;
    const rMax = n * n * 1.5;

    const mValues =
      l === 1 ? [-1, 0, 1] : // 3 p orbitals
      l === 2 ? [0] :         // single d example (dz2)
      [0];

    const posArray = [];

    for (const m of mValues) {
      let maxVal = 0;

      // Precompute max value for normalization
      for (let i = 0; i < 1000; i++) {
        const r = (i / 999) * rMax;
        const R = radial(n, l, r, Z);
        const cosTheta = -1 + 2 * Math.random();
        const theta = Math.acos(cosTheta);
        const phi = Math.random() * 2 * Math.PI;

        let Y = 0;
        if (l === 0) {
          Y = 1 / Math.sqrt(4 * Math.PI);
        } else if (l === 1) {
          if (m === 0) Y = Math.sqrt(3 / (4 * Math.PI)) * Math.cos(theta); // pz
          if (m === 1) Y = -Math.sqrt(3 / (8 * Math.PI)) * Math.sin(theta) * Math.cos(phi); // px
          if (m === -1) Y = -Math.sqrt(3 / (8 * Math.PI)) * Math.sin(theta) * Math.sin(phi); // py
        } else if (l === 2) {
          // d_z^2
          Y = Math.sqrt(5 / (16 * Math.PI)) * (3 * Math.cos(theta) * Math.cos(theta) - 1);
        }
        const ψ2 = R * R * Y * Y;
        if (ψ2 > maxVal) maxVal = ψ2;
      }

      let attempts = 0;
      while (posArray.length / 3 < numPoints && attempts < numPoints * 200) {
        attempts++;
        const r = Math.random() * rMax;
        const R = radial(n, l, r, Z);
        const cosTheta = 2 * Math.random() - 1;
        const theta = Math.acos(cosTheta);
        const phi = Math.random() * 2 * Math.PI;

        let Y = 0;
        if (l === 0) {
          Y = 1 / Math.sqrt(4 * Math.PI);
        } else if (l === 1) {
          if (m === 0) Y = Math.sqrt(3 / (4 * Math.PI)) * Math.cos(theta);
          if (m === 1) Y = -Math.sqrt(3 / (8 * Math.PI)) * Math.sin(theta) * Math.cos(phi);
          if (m === -1) Y = -Math.sqrt(3 / (8 * Math.PI)) * Math.sin(theta) * Math.sin(phi);
        } else if (l === 2) {
          Y = Math.sqrt(5 / (16 * Math.PI)) * (3 * Math.cos(theta) * Math.cos(theta) - 1);
        }

        const ψ2 = R * R * Y * Y;
        if (Math.random() > ψ2 / maxVal) continue;

        const x = r * Math.sin(theta) * Math.cos(phi);
        const y = r * Math.sin(theta) * Math.sin(phi);
        const z = r * Math.cos(theta);
        posArray.push(x, y, z);
      }
    }

    return new Float32Array(posArray);
  }, [n, l, electrons, maxElectrons]);

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={positions}
            itemSize={3}
            count={positions.length / 3}
          />
        </bufferGeometry>
        <pointsMaterial
          color={color}
          size={0.05} // Increased from 0.03 to 0.05 for better visibility
          sizeAttenuation={true}
          transparent={true}
          opacity={0.9} // Increased from 0.8 to 0.9 for more solid appearance
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      <Text
        position={[0, n * n * 0.5 + 0.5, 0]}
        fontSize={0.25}
        color={color}
        anchorX="center"
        anchorY="middle"
      >
        {shell}
        {subshell} ({electrons}/{maxElectrons})
      </Text>
    </group>
  );
}

// -------------------- atom 3D --------------------
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
      <ambientLight intensity={0.7} /> {/* Increased from 0.5 to 0.7 for better lighting */}
      <pointLight position={[10, 10, 10]} intensity={1.5} /> {/* Increased from 1 to 1.5 */}
      <pointLight position={[-10, -10, -10]} intensity={0.7} /> {/* Increased from 0.5 to 0.7 */}
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
      <OrbitControls enableZoom enablePan />
    </>
  );
}

// -------------------- main visualizer --------------------
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
      <Canvas camera={{ position: [0, 0, 20], fov: 45 }}> {/* Adjusted position from 15 to 20, fov from 50 to 45 */}
        <Suspense fallback={null}>
          <Atom3D configuration={configuration} protons={protons} />
        </Suspense>
      </Canvas>
    </div>
  );
}