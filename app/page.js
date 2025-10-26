'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import AtomVisualizer from '../components/AtomVisualizer';
import TrendChart from '../components/TrendChart';
import EducationalPanel from '../components/EducationalPanel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

// Dynamic import for 3D visualizer to avoid SSR issues with Three.js
const OrbitalVisualizer = dynamic(
  () => import('../components/OrbitalVisualizer'),
  { ssr: false }
);

export default function Home() {
  const [protons, setProtons] = useState(6);
  const [electrons, setElectrons] = useState(6);
  const [configuration, setConfiguration] = useState({});

  // This will be called from AtomVisualizer to sync state
  const handleStateUpdate = (p, e, config) => {
    setProtons(p);
    setElectrons(e);
    setConfiguration(config);
  };

  return (
    <main className="min-h-screen bg-transparent relative z-10">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
            Quantum Atom Explorer
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover how all 118 elements work through interactive visualizations. Add or remove protons and 
            electrons to see real-time changes in electron configuration, ionization energy, 
            electron affinity, and reactivity. From hydrogen to oganesson!
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full shadow-lg shadow-blue-500/50"></div>
              <span>s orbitals</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-400 rounded-full shadow-lg shadow-red-500/50"></div>
              <span>p orbitals</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full shadow-lg shadow-green-500/50"></div>
              <span>d orbitals</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-400 rounded-full shadow-lg shadow-purple-500/50"></div>
              <span>f orbitals</span>
            </div>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="visualizer" className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 lg:grid-cols-3 mb-8">
            <TabsTrigger value="visualizer" className="text-lg">
              Interactive Visualizer
            </TabsTrigger>
            <TabsTrigger value="trends" className="text-lg">
              Periodic Trends
            </TabsTrigger>
            <TabsTrigger value="learn" className="text-lg">
              Learn the Concepts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="visualizer" className="space-y-8">
            {/* Atom Visualizer with Controls */}
            <AtomVisualizer onStateUpdate={handleStateUpdate} />
            
            {/* 3D Orbital Visualization */}
            {Object.keys(configuration).length > 0 && (
              <div className="mt-8">
                <div className="text-center mb-4">
                  <h2 className="text-3xl font-bold text-gray-100">3D Orbital Model</h2>
                  <p className="text-gray-400">Drag to rotate â€¢ Scroll to zoom â€¢ See electron shells in 3D</p>
                </div>
                <OrbitalVisualizer 
                  configuration={configuration} 
                  protons={protons} 
                />
                <div className="mt-4 text-center text-sm text-gray-400">
                  <p>Ã°Å¸â€™Â¡ <strong>Tip:</strong> Larger shells represent higher principal quantum numbers (n)</p>
                  <p>Electrons shown as glowing particles in probability clouds</p>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="trends">
            <TrendChart currentProtons={protons} />
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-lg shadow-xl border border-gray-700">
                <h3 className="text-xl font-bold text-gray-100 mb-4">Explore Elements</h3>
                <p className="text-gray-300 mb-4">
                  Click on the chart above or use the Interactive Visualizer tab to explore 
                  different elements and see how their properties change across the periodic table.
                </p>
                <div className="space-y-2 text-sm text-gray-400">
                  <p><strong>Periods (rows):</strong> As you go right, Z<sub>eff</sub> increases Ã¢â€ â€™ IE increases, EA increases</p>
                  <p><strong>Groups (columns):</strong> As you go down, n increases Ã¢â€ â€™ IE decreases</p>
                  <p><strong>Anomalies:</strong> Small dips due to subshell differences (s vs p vs d)</p>
                </div>
              </div>

              <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-lg shadow-xl border border-gray-700">
                <h3 className="text-xl font-bold text-gray-100 mb-4">Pattern Recognition</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-red-500/50">1</div>
                    <div>
                      <p className="font-semibold text-gray-200">Start of Periods</p>
                      <p className="text-sm text-gray-400">Alkali metals have low IE (easy to ionize)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-orange-500/50">2</div>
                    <div>
                      <p className="font-semibold text-gray-200">End of Periods</p>
                      <p className="text-sm text-gray-400">Halogens have high EA (want to gain electrons)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-purple-500/50">3</div>
                    <div>
                      <p className="font-semibold text-gray-200">Noble Gases</p>
                      <p className="text-sm text-gray-400">High IE and zero EA (stable, unreactive)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="learn">
            <EducationalPanel />
          </TabsContent>
        </Tabs>

        {/* Footer with Additional Resources */}
        <div className="mt-16 border-t border-gray-700 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-gray-100 mb-3">About This Tool</h3>
              <p className="text-sm text-gray-400">
                This interactive educational website helps you understand atomic structure using 
                quantum mechanical principles. Experiment with different atoms to see how 
                electron configurations affect their chemical properties.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-100 mb-3">Key Features</h3>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>â€¢ Interactive atom builder (add/remove particles)</li>
                <li>â€¢ 3D orbital visualizations</li>
                <li>â€¢ Real-time IE and EA calculations</li>
                <li>â€¢ Periodic trend analysis</li>
                <li>â€¢ Comprehensive concept explanations</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-100 mb-3">Learning Objectives</h3>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>â€¢ Understand quantum atomic model</li>
                <li>â€¢ Learn about orbital penetration</li>
                <li>â€¢ Grasp effective nuclear charge</li>
                <li>â€¢ Explore ionization energy trends</li>
                <li>â€¢ Discover the origins of the octet rule</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>Built with Next.js, React, Three.js, and Chart.js</p>
            <p className="mt-1">Ã‚Â© 2025 Quantum Atom Explorer - Educational Use</p>
          </div>
        </div>
      </div>
    </main>
  );
}