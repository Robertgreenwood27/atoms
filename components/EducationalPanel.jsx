'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ChevronDown, ChevronUp, Atom, Zap, Shield, Orbit } from 'lucide-react';

const ConceptCard = ({ title, icon: Icon, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Card className="mb-4">
      <CardHeader 
        className="cursor-pointer hover:bg-gray-800 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon className="h-6 w-6 text-blue-400" />
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </div>
      </CardHeader>
      {isOpen && <CardContent className="pt-4">{children}</CardContent>}
    </Card>
  );
};

const EducationalPanel = () => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-100">Understanding Atomic Structure</h2>
        <p className="text-gray-400">Learn the quantum principles behind atomic behavior</p>
      </div>

      <ConceptCard title="The Quantum Atom Model" icon={Atom} defaultOpen={true}>
        <div className="space-y-4">
          <p className="text-gray-300">
            The atom is best understood as a nucleus surrounded by electrons in quantum orbitals, 
            not orbits. Think of it as an upgraded planetary model with quantum rules:
          </p>
          
          <div className="bg-blue-900/30 p-4 rounded-lg space-y-2">
            <h4 className="font-semibold text-blue-300">Key Principles:</h4>
            <ul className="space-y-2 text-sm text-blue-200">
              <li>
                <strong>Shells (n = 1, 2, 3, ...):</strong> Principal quantum number determines 
                the shell. Higher n means larger radius and higher energy.
              </li>
              <li>
                <strong>Orbitals per shell:</strong> Each shell has n² orbitals. Shell 1 has 1 orbital, 
                shell 2 has 4 orbitals, shell 3 has 9 orbitals, shell 4 has 16 orbitals.
              </li>
              <li>
                <strong>Pauli Exclusion Principle:</strong> Each orbital holds maximum 2 electrons 
                with opposite spins. This gives 2n² electrons per shell.
              </li>
              <li>
                <strong>Subshells:</strong> s (1 orbital), p (3 orbitals), d (5 orbitals), f (7 orbitals). 
                These differ in shape and energy.
              </li>
            </ul>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-200 mb-2">Shell Capacities:</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <div className="font-bold text-gray-300">n = 1</div>
                <div className="text-gray-400">1s: 2 electrons</div>
              </div>
              <div>
                <div className="font-bold text-gray-300">n = 2</div>
                <div className="text-gray-400">2s, 2p: 8 electrons</div>
              </div>
              <div>
                <div className="font-bold text-gray-300">n = 3</div>
                <div className="text-gray-400">3s, 3p, 3d: 18 electrons</div>
              </div>
              <div>
                <div className="font-bold text-gray-300">n = 4</div>
                <div className="text-gray-400">4s, 4p, 4d, 4f: 32 electrons</div>
              </div>
            </div>
          </div>
        </div>
      </ConceptCard>

      <ConceptCard title="Orbital Penetration & Energy" icon={Orbit}>
        <div className="space-y-4">
          <p className="text-gray-300">
            Not all orbitals in the same shell have the same energy. This is due to <strong>orbital penetration</strong>:
          </p>
          
          <div className="bg-purple-900/30 p-4 rounded-lg space-y-3">
            <div>
              <h4 className="font-semibold text-purple-300">s Orbitals (Best Penetration)</h4>
              <p className="text-sm text-purple-200">
                Spherical shape allows electrons to get close to nucleus. They "feel" more of the 
                nuclear charge, have lower energy, and are more tightly bound.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-purple-300">p Orbitals (Moderate Penetration)</h4>
              <p className="text-sm text-purple-200">
                Dumbbell shape keeps electrons farther from nucleus on average. Less penetration 
                means higher energy than s orbitals in the same shell.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-purple-300">d Orbitals (Poor Penetration)</h4>
              <p className="text-sm text-purple-200">
                Complex cloverleaf shapes with even less penetration. Much higher energy than s and p. 
                This is why 4s fills before 3d!
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-purple-300">f Orbitals (Poorest Penetration)</h4>
              <p className="text-sm text-purple-200">
                Very complex shapes with minimal penetration. Highest energy among orbitals. 
                Important for lanthanides and actinides (rare earth elements).
              </p>
            </div>
          </div>

          <div className="bg-yellow-900/30 p-4 rounded-lg">
            <h4 className="font-semibold text-yellow-300 mb-2">Energy Order:</h4>
            <p className="text-sm text-yellow-200 font-mono">
              1s &lt; 2s &lt; 2p &lt; 3s &lt; 3p &lt; 4s &lt; 3d &lt; 4p &lt; 5s &lt; 4d &lt; 5p &lt; 6s &lt; 4f &lt; 5d &lt; 6p &lt; 7s &lt; 5f &lt; 6d &lt; 7p
            </p>
            <p className="text-sm text-yellow-200 mt-2">
              Notice the overlaps: 4s before 3d, 6s before 4f, etc. This explains the periodic table structure!
            </p>
          </div>
        </div>
      </ConceptCard>

      <ConceptCard title="Effective Nuclear Charge (Z_eff)" icon={Shield}>
        <div className="space-y-4">
          <p className="text-gray-300">
            Electrons don't feel the full nuclear charge because other electrons "shield" them:
          </p>
          
          <div className="bg-green-900/30 p-4 rounded-lg space-y-3">
            <div className="text-center py-2">
              <div className="text-2xl font-bold text-green-300">
                Z<sub>eff</sub> = Z - S
              </div>
              <p className="text-sm text-green-200 mt-1">
                Z = protons (nuclear charge), S = shielding from inner electrons
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-green-300">Example: Lithium (Li, Z=3)</h4>
              <ul className="text-sm text-green-200 space-y-1">
                <li>• Configuration: 1s² 2s¹</li>
                <li>• For the 2s electron: 2 inner electrons (1s²) provide shielding</li>
                <li>• Z<sub>eff</sub> ≈ 3 - 2 = 1</li>
                <li>• The 2s electron feels only ~1 proton's worth of attraction</li>
                <li>• Result: Easily removed (low ionization energy)</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-green-300">Example: Gold (Au, Z=79)</h4>
              <ul className="text-sm text-green-200 space-y-1">
                <li>• Configuration: [Xe] 4f¹⁴ 5d¹⁰ 6s¹</li>
                <li>• For 6s electron: 78 inner electrons provide shielding</li>
                <li>• Z<sub>eff</sub> ≈ 79 - 78 = 1 (but with relativistic effects!)</li>
                <li>• Despite high Z, outer electron feels low effective charge</li>
                <li>• Result: Relatively unreactive for a metal</li>
              </ul>
            </div>
          </div>
        </div>
      </ConceptCard>

      <ConceptCard title="Ionization Energy (IE)" icon={Zap}>
        <div className="space-y-4">
          <p className="text-gray-300">
            Energy required to remove an electron from an atom. Higher IE = harder to remove.
          </p>
          
          <div className="bg-blue-900/30 p-4 rounded-lg space-y-3">
            <div className="text-center py-2">
              <div className="text-xl font-bold text-blue-300">
                IE ≈ 13.6 × (Z<sub>eff</sub>)² / n²  (in eV)
              </div>
              <p className="text-sm text-blue-200 mt-1">
                Simplified Rydberg formula
              </p>
            </div>

            <h4 className="font-semibold text-blue-300">Factors Affecting IE:</h4>
            <ul className="text-sm text-blue-200 space-y-2">
              <li>
                <strong>Higher Z<sub>eff</sub> → Higher IE:</strong> More nuclear attraction 
                holds electrons tighter.
              </li>
              <li>
                <strong>Smaller n → Higher IE:</strong> Electrons closer to nucleus are harder to remove.
              </li>
              <li>
                <strong>Better penetration → Higher IE:</strong> s orbitals have higher IE than p 
                in same shell.
              </li>
              <li>
                <strong>Filled/half-filled subshells:</strong> Extra stability leads to higher IE 
                (e.g., N with half-filled 2p³).
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-red-900/30 p-3 rounded-lg">
              <h5 className="font-semibold text-red-300 mb-1">Low IE (Reactive)</h5>
              <ul className="text-sm text-red-200 space-y-1">
                <li>• Alkali metals (Li, Na, K, Cs)</li>
                <li>• New shell, low Z<sub>eff</sub></li>
                <li>• Easily form +1 ions</li>
              </ul>
            </div>
            
            <div className="bg-purple-900/30 p-3 rounded-lg">
              <h5 className="font-semibold text-purple-300 mb-1">High IE (Stable)</h5>
              <ul className="text-sm text-purple-200 space-y-1">
                <li>• Noble gases (He, Ne, Ar, Xe)</li>
                <li>• Full shells, high Z<sub>eff</sub></li>
                <li>• Don't form ions easily</li>
              </ul>
            </div>
          </div>
        </div>
      </ConceptCard>

      <ConceptCard title="Electron Affinity (EA)" icon={Zap}>
        <div className="space-y-4">
          <p className="text-gray-300">
            Energy released when an atom gains an electron. Higher EA = more energy released 
            (more favorable to gain electron).
          </p>
          
          <div className="bg-orange-900/30 p-4 rounded-lg space-y-3">
            <h4 className="font-semibold text-orange-300">When is EA High?</h4>
            <ul className="text-sm text-orange-200 space-y-2">
              <li>
                <strong>Almost full subshell:</strong> Halogens (1 electron away from full p⁶) 
                have very high EA. Adding one more electron completes the stable octet.
              </li>
              <li>
                <strong>High Z<sub>eff</sub>:</strong> More nuclear charge attracts the incoming 
                electron more strongly.
              </li>
              <li>
                <strong>Same shell:</strong> If the electron goes into the same shell (not a new one), 
                it feels strong nuclear attraction.
              </li>
            </ul>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg space-y-3">
            <h4 className="font-semibold text-gray-200">When is EA Zero or Low?</h4>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>
                <strong>Noble gases:</strong> Full s and p subshells. Next electron must go to 
                new shell with much higher energy and full shielding from inner electrons.
              </li>
              <li>
                <strong>Full subshells:</strong> Adding an electron to start a new subshell is 
                unfavorable due to electron repulsion.
              </li>
              <li>
                <strong>Alkaline earth metals:</strong> Full s² subshell resists adding electrons.
              </li>
            </ul>
          </div>
        </div>
      </ConceptCard>

      <ConceptCard title="The Octet Rule Explained" icon={Atom}>
        <div className="space-y-4">
          <p className="text-gray-300">
            The "magic number 8" for valence electrons isn't arbitrary—it emerges from quantum mechanics:
          </p>
          
          <div className="bg-indigo-900/30 p-4 rounded-lg space-y-3">
            <h4 className="font-semibold text-indigo-300">Why 8 electrons = stability?</h4>
            
            <div className="space-y-3">
              <div>
                <h5 className="font-semibold text-indigo-200">1. Orbital Math</h5>
                <p className="text-sm text-indigo-100">
                  s subshell: 1 orbital × 2 electrons = 2<br/>
                  p subshell: 3 orbitals × 2 electrons = 6<br/>
                  <strong>Total: 2 + 6 = 8 electrons</strong>
                </p>
              </div>

              <div>
                <h5 className="font-semibold text-indigo-200">2. 3D Space</h5>
                <p className="text-sm text-indigo-100">
                  1 s orbital (spherical) + 3 p orbitals (x, y, z directions) naturally arise 
                  from the geometry of 3D space and quantum mechanics.
                </p>
              </div>

              <div>
                <h5 className="font-semibold text-indigo-200">3. d Orbitals Inaccessible (for light elements)</h5>
                <p className="text-sm text-indigo-100">
                  In periods 2-3, d orbitals have very high energy due to poor penetration. 
                  Electron repulsion and shielding make them energetically unfavorable, so atoms 
                  "stop" at 8 valence electrons (s² p⁶).
                </p>
              </div>

              <div>
                <h5 className="font-semibold text-indigo-200">4. Energy Minimization</h5>
                <p className="text-sm text-indigo-100">
                  Atoms don't "want" 8 electrons. Rather:<br/>
                  • Alkalis: Low IE → lose 1 electron → 8 remain<br/>
                  • Halogens: High EA → gain 1 electron → reach 8<br/>
                  • Result: 8 valence electrons represent the lowest energy state accessible.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-900/30 p-4 rounded-lg">
            <h4 className="font-semibold text-yellow-300 mb-2">Exceptions to the Octet Rule:</h4>
            <ul className="text-sm text-yellow-200 space-y-1">
              <li>• <strong>Helium (He):</strong> Only 2 electrons, but stable (full 1s shell)</li>
              <li>• <strong>Transition metals:</strong> Can use d orbitals for bonding</li>
              <li>• <strong>Elements beyond period 3:</strong> Can exceed octet using d orbitals 
                (e.g., SF₆ has 12 valence electrons, PCl₅ has 10)</li>
              <li>• <strong>f-block elements:</strong> Complex bonding involving f orbitals</li>
            </ul>
          </div>
        </div>
      </ConceptCard>

      <ConceptCard title="Transition Metals & f-Block Elements" icon={Atom}>
        <div className="space-y-4">
          <p className="text-gray-300">
            Elements in the d-block and f-block have unique properties due to their electron configurations:
          </p>
          
          <div className="bg-cyan-900/30 p-4 rounded-lg space-y-3">
            <div>
              <h4 className="font-semibold text-cyan-300">Transition Metals (d-block)</h4>
              <p className="text-sm text-cyan-200">
                Elements where d orbitals are being filled (Sc through Zn, Y through Cd, etc.)
              </p>
              <ul className="text-sm text-cyan-200 mt-2 space-y-1">
                <li>• <strong>Variable oxidation states:</strong> Can lose varying numbers of electrons</li>
                <li>• <strong>Colored compounds:</strong> d-d electron transitions absorb visible light</li>
                <li>• <strong>Catalytic properties:</strong> Partially filled d orbitals enable bonding</li>
                <li>• <strong>Magnetic properties:</strong> Unpaired d electrons create magnetism</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-cyan-300">Lanthanides (4f-block, Z=57-71)</h4>
              <p className="text-sm text-cyan-200">
                Rare earth elements with 4f orbitals being filled
              </p>
              <ul className="text-sm text-cyan-200 mt-2 space-y-1">
                <li>• <strong>Similar chemical properties:</strong> f orbitals buried inside atom</li>
                <li>• <strong>Lanthanide contraction:</strong> Gradual decrease in size across series</li>
                <li>• <strong>Strong magnetism:</strong> Many unpaired f electrons</li>
                <li>• <strong>Applications:</strong> Magnets, lasers, phosphors, catalysts</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-cyan-300">Actinides (5f-block, Z=89-103)</h4>
              <p className="text-sm text-cyan-200">
                Radioactive elements with 5f orbitals being filled
              </p>
              <ul className="text-sm text-cyan-200 mt-2 space-y-1">
                <li>• <strong>All radioactive:</strong> Unstable nuclei undergo decay</li>
                <li>• <strong>Complex chemistry:</strong> 5f orbitals more accessible than 4f</li>
                <li>• <strong>Transuranics:</strong> Elements beyond uranium (Z=92) are synthetic</li>
                <li>• <strong>Applications:</strong> Nuclear energy, medicine, research</li>
              </ul>
            </div>
          </div>
        </div>
      </ConceptCard>

      <ConceptCard title="Reactivity Patterns" icon={Zap}>
        <div className="space-y-4">
          <p className="text-gray-300">
            Chemical reactivity is all about energy: atoms react when it lowers their total energy.
          </p>
          
          <div className="space-y-3">
            <div className="bg-red-900/30 p-4 rounded-lg">
              <h4 className="font-semibold text-red-300 mb-2">Very Reactive: Alkali Metals</h4>
              <p className="text-sm text-red-200">
                <strong>Why:</strong> Very low IE (5-6 eV). Single valence electron in new shell, 
                weakly bound.<br/>
                <strong>Behavior:</strong> Easily lose 1 electron to form +1 ions (Li⁺, Na⁺, K⁺, Cs⁺).<br/>
                <strong>Example:</strong> 2Na + Cl₂ → 2NaCl (Na loses electron, Cl gains it)
              </p>
            </div>

            <div className="bg-orange-900/30 p-4 rounded-lg">
              <h4 className="font-semibold text-orange-300 mb-2">Very Reactive: Halogens</h4>
              <p className="text-sm text-orange-200">
                <strong>Why:</strong> High EA (3-4 eV) and high IE. One electron away from full octet.<br/>
                <strong>Behavior:</strong> Easily gain 1 electron to form -1 ions (F⁻, Cl⁻, Br⁻, I⁻).<br/>
                <strong>Example:</strong> Cl₂ + 2e⁻ → 2Cl⁻ (completes p⁶ configuration)
              </p>
            </div>

            <div className="bg-purple-900/30 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-300 mb-2">Non-Reactive: Noble Gases</h4>
              <p className="text-sm text-purple-200">
                <strong>Why:</strong> High IE (12-24 eV) and zero EA. Full s and p subshells.<br/>
                <strong>Behavior:</strong> Don't gain or lose electrons easily. Extremely stable.<br/>
                <strong>Example:</strong> Neon (1s² 2s² 2p⁶) doesn't form compounds under normal conditions.
              </p>
            </div>

            <div className="bg-blue-900/30 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-300 mb-2">Variable Reactivity: Transition Metals</h4>
              <p className="text-sm text-blue-200">
                <strong>Why:</strong> Moderate IE, can use d orbitals. Complex electron configurations.<br/>
                <strong>Behavior:</strong> Form multiple oxidation states, colored compounds, act as catalysts.<br/>
                <strong>Example:</strong> Iron can form Fe²⁺ (loses 4s²) or Fe³⁺ (loses 4s² and one 3d)
              </p>
            </div>
          </div>
        </div>
      </ConceptCard>

      <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-6 rounded-lg border border-blue-700/50">
        <h3 className="text-xl font-bold text-gray-100 mb-3">Key Takeaways</h3>
        <ul className="space-y-2 text-gray-200">
          <li className="flex items-start gap-2">
            <span className="text-blue-400 font-bold">•</span>
            <span>Atoms follow quantum rules, not classical orbits</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 font-bold">•</span>
            <span>Orbital penetration explains energy ordering and exceptions (4s before 3d, etc.)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 font-bold">•</span>
            <span>Z<sub>eff</sub> (effective nuclear charge) drives IE and EA trends</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 font-bold">•</span>
            <span>The octet rule emerges from s and p orbital filling (2 + 6 = 8)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 font-bold">•</span>
            <span>Reactivity is about energy: low IE or high EA → reactive</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 font-bold">•</span>
            <span>d and f orbitals enable transition metals and rare earths to have unique properties</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 font-bold">•</span>
            <span>All 118 elements follow these same quantum principles</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EducationalPanel;