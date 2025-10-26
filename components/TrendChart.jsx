'use client';

import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Extended orbital filling order
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

const ELEMENT_NAMES = [
  'H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne',
  'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar', 'K', 'Ca',
  'Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn',
  'Ga', 'Ge', 'As', 'Se', 'Br', 'Kr', 'Rb', 'Sr', 'Y', 'Zr',
  'Nb', 'Mo', 'Tc', 'Ru', 'Rh', 'Pd', 'Ag', 'Cd', 'In', 'Sn',
  'Sb', 'Te', 'I', 'Xe', 'Cs', 'Ba', 'La', 'Ce', 'Pr', 'Nd',
  'Pm', 'Sm', 'Eu', 'Gd', 'Tb', 'Dy', 'Ho', 'Er', 'Tm', 'Yb',
  'Lu', 'Hf', 'Ta', 'W', 'Re', 'Os', 'Ir', 'Pt', 'Au', 'Hg',
  'Tl', 'Pb', 'Bi', 'Po', 'At', 'Rn', 'Fr', 'Ra', 'Ac', 'Th',
  'Pa', 'U', 'Np', 'Pu', 'Am', 'Cm', 'Bk', 'Cf', 'Es', 'Fm',
  'Md', 'No', 'Lr', 'Rf', 'Db', 'Sg', 'Bh', 'Hs', 'Mt', 'Ds',
  'Rg', 'Cn', 'Nh', 'Fl', 'Mc', 'Lv', 'Ts', 'Og'
];

// Calculate IE and EA for all elements
const calculateTrends = () => {
  const elements = [];
  
  for (let z = 1; z <= 118; z++) {
    // Calculate electron configuration
    const config = {};
    let remaining = z;
    
    for (const orbital of ORBITAL_ORDER) {
      if (remaining <= 0) break;
      const maxElectrons = orbital.orbitals * 2;
      const electronsInOrbital = Math.min(remaining, maxElectrons);
      config[orbital.label] = electronsInOrbital;
      remaining -= electronsInOrbital;
    }
    
    // Get outermost shell
    const outerShell = Math.max(...Object.keys(config).map(k => parseInt(k[0])));
    
    // Calculate shielding
    let shielding = 0;
    for (const [orbital, count] of Object.entries(config)) {
      const shell = parseInt(orbital[0]);
      if (shell < outerShell) {
        shielding += count;
      }
    }
    
    const Zeff = Math.max(1, z - shielding);
    
    // Get outermost orbital info
    const outerOrbital = Object.keys(config).pop();
    const n = parseInt(outerOrbital[0]);
    const subshell = outerOrbital[1];
    
    // Calculate IE with penetration effect
    const penetrationFactor = subshell === 's' ? 1.0 : 
                             subshell === 'p' ? 0.85 : 
                             subshell === 'd' ? 0.65 : 0.50;
    const ie = 13.6 * Math.pow(Zeff * penetrationFactor, 2) / Math.pow(n, 2);
    
    // Calculate EA
    let ea = 0;
    const valenceElectrons = Object.entries(config)
      .filter(([orbital]) => parseInt(orbital[0]) === outerShell)
      .reduce((sum, [orbital, count]) => {
        if (orbital[1] === 's' || orbital[1] === 'p') return sum + count;
        return sum;
      }, 0);
    
    // Zero EA for noble gases (full octet) or if next electron goes to new shell
    const isNobleGas = (valenceElectrons === 2 && outerShell === 1) || 
                       (valenceElectrons === 8 && outerShell >= 2);
    
    if (!isNobleGas) {
      ea = (2.5 * Zeff) / n;
    }
    
    elements.push({
      z,
      symbol: ELEMENT_NAMES[z - 1],
      ie: ie.toFixed(2),
      ea: Math.max(0, ea).toFixed(2),
      config,
    });
  }
  
  return elements;
};

const TrendChart = ({ currentProtons }) => {
  const elements = useMemo(() => calculateTrends(), []);

  const chartData = {
    labels: elements.map(e => e.symbol),
    datasets: [
      {
        label: 'Ionization Energy (eV)',
        data: elements.map(e => parseFloat(e.ie)),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.3,
        pointRadius: elements.map(e => e.z === currentProtons ? 8 : 3),
        pointHoverRadius: 8,
      },
      {
        label: 'Electron Affinity (eV)',
        data: elements.map(e => parseFloat(e.ea)),
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        tension: 0.3,
        pointRadius: elements.map(e => e.z === currentProtons ? 8 : 3),
        pointHoverRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'rgb(200, 200, 220)',
        },
      },
      title: {
        display: true,
        text: 'Periodic Trends: Ionization Energy and Electron Affinity (All 118 Elements)',
        font: {
          size: 16,
        },
        color: 'rgb(200, 200, 220)',
      },
      tooltip: {
        callbacks: {
          afterLabel: function(context) {
            const element = elements[context.dataIndex];
            return `Z = ${element.z}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Energy (eV)',
          color: 'rgb(200, 200, 220)',
        },
        ticks: {
          color: 'rgb(150, 150, 170)',
        },
        grid: {
          color: 'rgba(100, 100, 120, 0.2)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Element',
          color: 'rgb(200, 200, 220)',
        },
        ticks: {
          color: 'rgb(150, 150, 170)',
          maxRotation: 90,
          minRotation: 45,
          font: {
            size: 9,
          },
        },
        grid: {
          color: 'rgba(100, 100, 120, 0.2)',
        },
      },
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Periodic Trends Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[500px]">
          <Line data={chartData} options={options} />
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-900/30 rounded-lg">
            <h4 className="font-semibold text-blue-300 mb-2">Ionization Energy Trends</h4>
            <ul className="text-sm text-blue-200 space-y-1">
              <li>• <strong>Increases</strong> left to right across periods (higher Z<sub>eff</sub>)</li>
              <li>• <strong>Decreases</strong> down groups (larger n, more shielding)</li>
              <li>• <strong>Peaks</strong> at noble gases (stable full shells)</li>
              <li>• <strong>Dips</strong> at alkali metals (new shell starts)</li>
              <li>• Small dips at p-block start (s vs p energy difference)</li>
              <li>• Notice f-block (lanthanides & actinides) patterns</li>
            </ul>
          </div>
          
          <div className="p-4 bg-red-900/30 rounded-lg">
            <h4 className="font-semibold text-red-300 mb-2">Electron Affinity Trends</h4>
            <ul className="text-sm text-red-200 space-y-1">
              <li>• <strong>Increases</strong> left to right (higher Z<sub>eff</sub>, more attraction)</li>
              <li>• <strong>Peaks</strong> at halogens (almost full p-shell)</li>
              <li>• <strong>Zero</strong> for noble gases (full shell, next e⁻ to new shell)</li>
              <li>• <strong>Lower</strong> for s-block (electron pairing in s orbital)</li>
              <li>• High EA + low IE = very reactive (gains electrons easily)</li>
              <li>• Transition metals show moderate EA values</li>
            </ul>
          </div>
        </div>

        <div className="mt-4 p-4 bg-purple-900/30 rounded-lg">
          <h4 className="font-semibold text-purple-300 mb-2">The Octet Rule Emerges From These Trends</h4>
          <p className="text-sm text-purple-200">
            Elements tend toward 8 valence electrons not because they "want" an octet, but because:
          </p>
          <ul className="text-sm text-purple-200 mt-2 space-y-1">
            <li>• <strong>Alkali metals</strong> (low IE) lose 1 electron → 8 in outer shell</li>
            <li>• <strong>Halogens</strong> (high EA) gain 1 electron → 8 total (s² p⁶)</li>
            <li>• <strong>8 electrons</strong> = full s and p subshells (1 s + 3 p orbitals × 2 e⁻/orbital)</li>
            <li>• <strong>d orbitals</strong> inaccessible in periods 2-3 due to poor penetration (high energy)</li>
            <li>• <strong>Transition metals</strong> can use d orbitals, leading to different behavior</li>
            <li>• <strong>Result:</strong> Stable configurations minimize energy through IE/EA balance</li>
          </ul>
        </div>

        <div className="mt-4 p-4 bg-green-900/30 rounded-lg">
          <h4 className="font-semibold text-green-300 mb-2">Observing All 118 Elements</h4>
          <p className="text-sm text-green-200">
            With the complete periodic table, you can observe:
          </p>
          <ul className="text-sm text-green-200 mt-2 space-y-1">
            <li>• <strong>Period 4-7:</strong> Transition metals (d-block) with gradually changing IE</li>
            <li>• <strong>Lanthanides (Z=57-71):</strong> f-block elements with similar properties</li>
            <li>• <strong>Actinides (Z=89-103):</strong> Radioactive f-block elements</li>
            <li>• <strong>Superheavy elements (Z=104-118):</strong> Synthetic elements with predicted trends</li>
            <li>• <strong>Periodic pattern:</strong> Repeating trends every period due to electron shells</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendChart;