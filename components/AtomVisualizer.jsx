import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Plus, Minus, RotateCcw } from 'lucide-react';

// Extended orbital filling order based on Aufbau principle (up to element 118)
const ORBITAL_ORDER = [
  { shell: 1, subshell: 's', orbitals: 1, label: '1s' },
  { shell: 2, subshell: 's', orbitals: 1, label: '2s' },
  { shell: 2, subshell: 'p', orbitals: 3, label: '2p' },
  { shell: 3, subshell: 's', orbitals: 1, label: '3s' },
  { shell: 3, subshell: 'p', orbitals: 3, label: '3p' },
  { shell: 4, subshell: 's', orbitals: 1, label: '4s' },
  { shell: 3, subshell: 'd', orbitals: 5, label: '3d' },
  { shell: 4, subshell: 'p', orbitals: 3, label: '4p' },
  { shell: 5, subshell: 's', orbitals: 1, label: '5s' },
  { shell: 4, subshell: 'd', orbitals: 5, label: '4d' },
  { shell: 5, subshell: 'p', orbitals: 3, label: '5p' },
  { shell: 6, subshell: 's', orbitals: 1, label: '6s' },
  { shell: 4, subshell: 'f', orbitals: 7, label: '4f' },
  { shell: 5, subshell: 'd', orbitals: 5, label: '5d' },
  { shell: 6, subshell: 'p', orbitals: 3, label: '6p' },
  { shell: 7, subshell: 's', orbitals: 1, label: '7s' },
  { shell: 5, subshell: 'f', orbitals: 7, label: '5f' },
  { shell: 6, subshell: 'd', orbitals: 5, label: '6d' },
  { shell: 7, subshell: 'p', orbitals: 3, label: '7p' },
];

// Complete element data for all 118 elements
const ELEMENTS = [
  { z: 1, symbol: 'H', name: 'Hydrogen' },
  { z: 2, symbol: 'He', name: 'Helium' },
  { z: 3, symbol: 'Li', name: 'Lithium' },
  { z: 4, symbol: 'Be', name: 'Beryllium' },
  { z: 5, symbol: 'B', name: 'Boron' },
  { z: 6, symbol: 'C', name: 'Carbon' },
  { z: 7, symbol: 'N', name: 'Nitrogen' },
  { z: 8, symbol: 'O', name: 'Oxygen' },
  { z: 9, symbol: 'F', name: 'Fluorine' },
  { z: 10, symbol: 'Ne', name: 'Neon' },
  { z: 11, symbol: 'Na', name: 'Sodium' },
  { z: 12, symbol: 'Mg', name: 'Magnesium' },
  { z: 13, symbol: 'Al', name: 'Aluminum' },
  { z: 14, symbol: 'Si', name: 'Silicon' },
  { z: 15, symbol: 'P', name: 'Phosphorus' },
  { z: 16, symbol: 'S', name: 'Sulfur' },
  { z: 17, symbol: 'Cl', name: 'Chlorine' },
  { z: 18, symbol: 'Ar', name: 'Argon' },
  { z: 19, symbol: 'K', name: 'Potassium' },
  { z: 20, symbol: 'Ca', name: 'Calcium' },
  { z: 21, symbol: 'Sc', name: 'Scandium' },
  { z: 22, symbol: 'Ti', name: 'Titanium' },
  { z: 23, symbol: 'V', name: 'Vanadium' },
  { z: 24, symbol: 'Cr', name: 'Chromium' },
  { z: 25, symbol: 'Mn', name: 'Manganese' },
  { z: 26, symbol: 'Fe', name: 'Iron' },
  { z: 27, symbol: 'Co', name: 'Cobalt' },
  { z: 28, symbol: 'Ni', name: 'Nickel' },
  { z: 29, symbol: 'Cu', name: 'Copper' },
  { z: 30, symbol: 'Zn', name: 'Zinc' },
  { z: 31, symbol: 'Ga', name: 'Gallium' },
  { z: 32, symbol: 'Ge', name: 'Germanium' },
  { z: 33, symbol: 'As', name: 'Arsenic' },
  { z: 34, symbol: 'Se', name: 'Selenium' },
  { z: 35, symbol: 'Br', name: 'Bromine' },
  { z: 36, symbol: 'Kr', name: 'Krypton' },
  { z: 37, symbol: 'Rb', name: 'Rubidium' },
  { z: 38, symbol: 'Sr', name: 'Strontium' },
  { z: 39, symbol: 'Y', name: 'Yttrium' },
  { z: 40, symbol: 'Zr', name: 'Zirconium' },
  { z: 41, symbol: 'Nb', name: 'Niobium' },
  { z: 42, symbol: 'Mo', name: 'Molybdenum' },
  { z: 43, symbol: 'Tc', name: 'Technetium' },
  { z: 44, symbol: 'Ru', name: 'Ruthenium' },
  { z: 45, symbol: 'Rh', name: 'Rhodium' },
  { z: 46, symbol: 'Pd', name: 'Palladium' },
  { z: 47, symbol: 'Ag', name: 'Silver' },
  { z: 48, symbol: 'Cd', name: 'Cadmium' },
  { z: 49, symbol: 'In', name: 'Indium' },
  { z: 50, symbol: 'Sn', name: 'Tin' },
  { z: 51, symbol: 'Sb', name: 'Antimony' },
  { z: 52, symbol: 'Te', name: 'Tellurium' },
  { z: 53, symbol: 'I', name: 'Iodine' },
  { z: 54, symbol: 'Xe', name: 'Xenon' },
  { z: 55, symbol: 'Cs', name: 'Cesium' },
  { z: 56, symbol: 'Ba', name: 'Barium' },
  { z: 57, symbol: 'La', name: 'Lanthanum' },
  { z: 58, symbol: 'Ce', name: 'Cerium' },
  { z: 59, symbol: 'Pr', name: 'Praseodymium' },
  { z: 60, symbol: 'Nd', name: 'Neodymium' },
  { z: 61, symbol: 'Pm', name: 'Promethium' },
  { z: 62, symbol: 'Sm', name: 'Samarium' },
  { z: 63, symbol: 'Eu', name: 'Europium' },
  { z: 64, symbol: 'Gd', name: 'Gadolinium' },
  { z: 65, symbol: 'Tb', name: 'Terbium' },
  { z: 66, symbol: 'Dy', name: 'Dysprosium' },
  { z: 67, symbol: 'Ho', name: 'Holmium' },
  { z: 68, symbol: 'Er', name: 'Erbium' },
  { z: 69, symbol: 'Tm', name: 'Thulium' },
  { z: 70, symbol: 'Yb', name: 'Ytterbium' },
  { z: 71, symbol: 'Lu', name: 'Lutetium' },
  { z: 72, symbol: 'Hf', name: 'Hafnium' },
  { z: 73, symbol: 'Ta', name: 'Tantalum' },
  { z: 74, symbol: 'W', name: 'Tungsten' },
  { z: 75, symbol: 'Re', name: 'Rhenium' },
  { z: 76, symbol: 'Os', name: 'Osmium' },
  { z: 77, symbol: 'Ir', name: 'Iridium' },
  { z: 78, symbol: 'Pt', name: 'Platinum' },
  { z: 79, symbol: 'Au', name: 'Gold' },
  { z: 80, symbol: 'Hg', name: 'Mercury' },
  { z: 81, symbol: 'Tl', name: 'Thallium' },
  { z: 82, symbol: 'Pb', name: 'Lead' },
  { z: 83, symbol: 'Bi', name: 'Bismuth' },
  { z: 84, symbol: 'Po', name: 'Polonium' },
  { z: 85, symbol: 'At', name: 'Astatine' },
  { z: 86, symbol: 'Rn', name: 'Radon' },
  { z: 87, symbol: 'Fr', name: 'Francium' },
  { z: 88, symbol: 'Ra', name: 'Radium' },
  { z: 89, symbol: 'Ac', name: 'Actinium' },
  { z: 90, symbol: 'Th', name: 'Thorium' },
  { z: 91, symbol: 'Pa', name: 'Protactinium' },
  { z: 92, symbol: 'U', name: 'Uranium' },
  { z: 93, symbol: 'Np', name: 'Neptunium' },
  { z: 94, symbol: 'Pu', name: 'Plutonium' },
  { z: 95, symbol: 'Am', name: 'Americium' },
  { z: 96, symbol: 'Cm', name: 'Curium' },
  { z: 97, symbol: 'Bk', name: 'Berkelium' },
  { z: 98, symbol: 'Cf', name: 'Californium' },
  { z: 99, symbol: 'Es', name: 'Einsteinium' },
  { z: 100, symbol: 'Fm', name: 'Fermium' },
  { z: 101, symbol: 'Md', name: 'Mendelevium' },
  { z: 102, symbol: 'No', name: 'Nobelium' },
  { z: 103, symbol: 'Lr', name: 'Lawrencium' },
  { z: 104, symbol: 'Rf', name: 'Rutherfordium' },
  { z: 105, symbol: 'Db', name: 'Dubnium' },
  { z: 106, symbol: 'Sg', name: 'Seaborgium' },
  { z: 107, symbol: 'Bh', name: 'Bohrium' },
  { z: 108, symbol: 'Hs', name: 'Hassium' },
  { z: 109, symbol: 'Mt', name: 'Meitnerium' },
  { z: 110, symbol: 'Ds', name: 'Darmstadtium' },
  { z: 111, symbol: 'Rg', name: 'Roentgenium' },
  { z: 112, symbol: 'Cn', name: 'Copernicium' },
  { z: 113, symbol: 'Nh', name: 'Nihonium' },
  { z: 114, symbol: 'Fl', name: 'Flerovium' },
  { z: 115, symbol: 'Mc', name: 'Moscovium' },
  { z: 116, symbol: 'Lv', name: 'Livermorium' },
  { z: 117, symbol: 'Ts', name: 'Tennessine' },
  { z: 118, symbol: 'Og', name: 'Oganesson' },
];

const AtomVisualizer = ({ onStateUpdate }) => {
  const [protons, setProtons] = useState(6); // Start with Carbon
  const [electrons, setElectrons] = useState(6);
  const [config, setConfig] = useState({});

  // Calculate electron configuration
  const calculateConfiguration = (electronCount) => {
    const configuration = {};
    let remaining = electronCount;
    
    for (const orbital of ORBITAL_ORDER) {
      if (remaining <= 0) break;
      const maxElectrons = orbital.orbitals * 2;
      const electronsInOrbital = Math.min(remaining, maxElectrons);
      configuration[orbital.label] = electronsInOrbital;
      remaining -= electronsInOrbital;
    }
    
    return configuration;
  };

  // Calculate effective nuclear charge (simplified)
  const calculateZeff = () => {
    const config = calculateConfiguration(electrons);
    const outerShell = Math.max(...Object.keys(config).map(k => parseInt(k[0])));
    
    // Count inner shell electrons for shielding
    let shielding = 0;
    for (const [orbital, count] of Object.entries(config)) {
      const shell = parseInt(orbital[0]);
      if (shell < outerShell) {
        shielding += count;
      }
    }
    
    return Math.max(1, protons - shielding);
  };

  // Calculate ionization energy (simplified, in eV)
  const calculateIE = () => {
    const Zeff = calculateZeff();
    const config = calculateConfiguration(electrons);
    const outerOrbital = Object.keys(config).pop();
    const n = parseInt(outerOrbital[0]);
    
    // Modified Rydberg formula with penetration adjustment
    const subshell = outerOrbital[1];
    const penetrationFactor = subshell === 's' ? 1.0 : 
                             subshell === 'p' ? 0.85 : 
                             subshell === 'd' ? 0.65 : 0.50; // f orbitals
    
    return (13.6 * Math.pow(Zeff * penetrationFactor, 2) / Math.pow(n, 2)).toFixed(2);
  };

  // Calculate electron affinity (simplified, in eV)
  const calculateEA = () => {
    const config = calculateConfiguration(electrons);
    const nextConfig = calculateConfiguration(electrons + 1);
    
    // Check if next electron goes to new shell
    const currentMaxShell = Math.max(...Object.keys(config).map(k => parseInt(k[0])));
    const nextMaxShell = Math.max(...Object.keys(nextConfig).map(k => parseInt(k[0])));
    
    if (nextMaxShell > currentMaxShell) {
      return 0; // Noble gas case or new shell
    }
    
    // Check if current valence shell is full
    const valenceElectrons = Object.entries(config)
      .filter(([orbital]) => parseInt(orbital[0]) === currentMaxShell)
      .reduce((sum, [orbital, count]) => {
        if (orbital[1] === 's' || orbital[1] === 'p') return sum + count;
        return sum;
      }, 0);
    
    // Check for full octet in s and p orbitals
    if (valenceElectrons === 8 && currentMaxShell >= 2) {
      return 0; // Full octet
    }
    
    if (valenceElectrons === 2 && currentMaxShell === 1) {
      return 0; // Helium case
    }
    
    const Zeff = calculateZeff();
    const n = currentMaxShell;
    return Math.max(0, (2.5 * Zeff) / n).toFixed(2);
  };

  // Determine reactivity category
  const getReactivityCategory = () => {
    const ie = parseFloat(calculateIE());
    const ea = parseFloat(calculateEA());
    
    if (ie > 20 && ea === 0) return { label: 'Noble Gas', color: 'bg-purple-500' };
    if (ie < 6) return { label: 'Very Reactive (Alkali)', color: 'bg-red-500' };
    if (ea > 3) return { label: 'Very Reactive (Halogen)', color: 'bg-orange-500' };
    if (ie < 10 || ea > 1.5) return { label: 'Reactive', color: 'bg-yellow-500' };
    return { label: 'Moderate', color: 'bg-blue-500' };
  };

  useEffect(() => {
    setConfig(calculateConfiguration(electrons));
  }, [electrons, protons]);

  useEffect(() => {
    if (onStateUpdate) {
      onStateUpdate(protons, electrons, config);
    }
  }, [protons, electrons, config, onStateUpdate]);

  const element = ELEMENTS.find(e => e.z === protons) || { symbol: '?', name: 'Unknown' };
  const charge = protons - electrons;
  const reactivity = getReactivityCategory();

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-gray-100">Interactive Atom Visualizer</h1>
        <p className="text-gray-400">Explore atomic structure, electron configuration, and reactivity</p>
      </div>

      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Atom Builder</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Proton Controls */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-200">Protons (Atomic Number)</label>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setProtons(Math.max(1, protons - 1))}
                  disabled={protons <= 1}
                  variant="outline"
                  size="icon"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="flex-1 text-center">
                  <span className="text-3xl font-bold text-blue-400">{protons}</span>
                </div>
                <Button
                  onClick={() => setProtons(Math.min(118, protons + 1))}
                  disabled={protons >= 118}
                  variant="outline"
                  size="icon"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Electron Controls */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-200">Electrons</label>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setElectrons(Math.max(1, electrons - 1))}
                  disabled={electrons <= 1}
                  variant="outline"
                  size="icon"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="flex-1 text-center">
                  <span className="text-3xl font-bold text-red-400">{electrons}</span>
                </div>
                <Button
                  onClick={() => setElectrons(electrons + 1)}
                  variant="outline"
                  size="icon"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Reset Button */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-200">Reset</label>
              <Button
                onClick={() => {
                  setProtons(6);
                  setElectrons(6);
                }}
                className="w-full"
                variant="outline"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset to Carbon
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Atom Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Element Info */}
        <Card>
          <CardHeader>
            <CardTitle>Element Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center py-6">
              <div className="text-8xl font-bold text-gray-100">{element.symbol}</div>
              <div className="text-2xl text-gray-300 mt-2">{element.name}</div>
              <div className="text-xl text-gray-400 mt-1">Z = {protons}</div>
              {charge !== 0 && (
                <div className="mt-3">
                  <span className={`inline-block px-4 py-2 rounded-full text-white text-lg font-semibold ${
                    charge > 0 ? 'bg-blue-500' : 'bg-red-500'
                  }`}>
                    {charge > 0 ? `+${charge}` : charge} ion
                  </span>
                </div>
              )}
            </div>
            
            <div className="space-y-2 pt-4 border-t border-gray-700">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Protons:</span>
                <span className="font-semibold text-blue-400">{protons}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Electrons:</span>
                <span className="font-semibold text-red-400">{electrons}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Neutrons (typical):</span>
                <span className="font-semibold text-gray-300">{Math.round(protons * 1.2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Electron Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>Electron Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-lg font-mono font-semibold text-center py-4 bg-gray-800/50 rounded max-h-32 overflow-y-auto">
              {Object.entries(config).map(([orbital, count]) => (
                <span key={orbital} className="mr-2 text-gray-200">
                  {orbital}
                  <sup>{count}</sup>
                </span>
              ))}
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {Object.entries(config).map(([orbital, count]) => {
                const maxElectrons = ORBITAL_ORDER.find(o => o.label === orbital)?.orbitals * 2 || 0;
                const percentage = (count / maxElectrons) * 100;
                
                return (
                  <div key={orbital}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-semibold text-gray-200">{orbital}</span>
                      <span className="text-gray-400">{count}/{maxElectrons}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all ${
                          orbital[1] === 's' ? 'bg-blue-500' :
                          orbital[1] === 'p' ? 'bg-red-500' :
                          orbital[1] === 'd' ? 'bg-green-500' :
                          'bg-purple-500'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Properties */}
      <Card>
        <CardHeader>
          <CardTitle>Atomic Properties & Reactivity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center space-y-2">
              <div className="text-sm text-gray-400">Effective Nuclear Charge</div>
              <div className="text-4xl font-bold text-purple-400">{calculateZeff().toFixed(2)}</div>
              <div className="text-xs text-gray-500">Z<sub>eff</sub></div>
            </div>

            <div className="text-center space-y-2">
              <div className="text-sm text-gray-400">Ionization Energy</div>
              <div className="text-4xl font-bold text-blue-400">{calculateIE()}</div>
              <div className="text-xs text-gray-500">eV</div>
            </div>

            <div className="text-center space-y-2">
              <div className="text-sm text-gray-400">Electron Affinity</div>
              <div className="text-4xl font-bold text-orange-400">{calculateEA()}</div>
              <div className="text-xs text-gray-500">eV</div>
            </div>

            <div className="text-center space-y-2">
              <div className="text-sm text-gray-400">Reactivity</div>
              <div className={`${reactivity.color} text-white px-4 py-2 rounded-full font-semibold text-sm`}>
                {reactivity.label}
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-900/30 rounded-lg space-y-2">
            <h4 className="font-semibold text-blue-300">Understanding the Values:</h4>
            <ul className="text-sm text-blue-200 space-y-1">
              <li><strong>Z<sub>eff</sub>:</strong> How strongly the nucleus attracts outer electrons (protons - shielding)</li>
              <li><strong>IE:</strong> Energy needed to remove an electron (higher = harder to remove)</li>
              <li><strong>EA:</strong> Energy released when adding an electron (higher = more energy released)</li>
              <li><strong>Reactivity:</strong> Low IE or high EA means reactive; high IE + zero EA means noble</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AtomVisualizer;