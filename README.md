# Quantum Atom Explorer

An interactive educational website for exploring atomic structure, electron configurations, and chemical reactivity through real-time visualizations. Built with Next.js, React, Three.js, and Chart.js.

## Features

### Interactive Atom Builder
- Add or remove protons (change elements)
- Add or remove electrons (create ions)
- Real-time electron configuration updates
- Visual feedback for all changes

### 3D Orbital Visualization
- Three.js-powered 3D models of atoms
- Color-coded orbitals (s: blue, p: red, d: green)
- Rotating electron shells
- Interactive camera controls (drag to rotate, scroll to zoom)

### Atomic Property Calculations
- **Effective Nuclear Charge (Z_eff)**: Shows how strongly the nucleus attracts outer electrons
- **Ionization Energy (IE)**: Energy required to remove an electron
- **Electron Affinity (EA)**: Energy released when adding an electron
- **Reactivity Classification**: Categorizes elements based on their properties

### Periodic Trends Analysis
- Interactive charts showing IE and EA trends across elements
- Highlights current element on the chart
- Explains patterns and anomalies in periodic trends

### Comprehensive Educational Content
- Detailed explanations of quantum mechanical principles
- Orbital penetration and energy levels
- The physics behind the octet rule
- Reactivity patterns across the periodic table

## Scientific Principles

This tool models atoms using simplified quantum mechanics:

### Electron Configuration
- Follows Aufbau principle (filling order)
- Respects Pauli exclusion principle (2 electrons per orbital)
- Accounts for orbital penetration effects

### Ionization Energy Calculation
```
IE ≈ 13.6 × (Z_eff × penetration_factor)² / n²
```
Where:
- Z_eff = effective nuclear charge (protons - shielding electrons)
- n = principal quantum number
- penetration_factor: s (1.0), p (0.85), d (0.65)

### Electron Affinity Calculation
```
EA ≈ (2.5 × Z_eff) / n
```
With special cases:
- EA = 0 for noble gases (full shells)
- EA = 0 when next electron goes to new shell

## Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation Steps

1. **Navigate to the project directory:**
```bash
cd atom-model
```

2. **Install dependencies:**
```bash
npm install
```

3. **Run the development server:**
```bash
npm run dev
```

4. **Open your browser:**
Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
atom-model/
├── app/
│   ├── page.jsx           # Main page with tabs
│   ├── layout.jsx         # Root layout
│   └── globals.css        # Global styles
├── components/
│   ├── AtomVisualizer.jsx      # Main interactive atom builder
│   ├── OrbitalVisualizer.jsx   # 3D orbital visualization
│   ├── TrendChart.jsx          # Periodic trends chart
│   ├── EducationalPanel.jsx    # Concept explanations
│   └── ui/
│       ├── card.jsx       # Card component
│       ├── button.jsx     # Button component
│       └── tabs.jsx       # Tabs component
├── package.json
├── next.config.js
├── tailwind.config.js
└── README.md
```

## Component Overview

### AtomVisualizer
The main interactive component with:
- Proton/electron controls
- Live electron configuration display
- Property calculations (Z_eff, IE, EA)
- Reactivity classification

### OrbitalVisualizer
3D visualization using Three.js:
- Nucleus (green sphere)
- Electron shells (wireframe spheres)
- Electrons (glowing particles)
- Orbital labels

### TrendChart
Chart.js line graph showing:
- Ionization energy trends (blue)
- Electron affinity trends (red)
- Highlighted current element
- Trend explanations

### EducationalPanel
Expandable concept cards covering:
- Quantum atom model
- Orbital penetration
- Effective nuclear charge
- Ionization energy
- Electron affinity
- The octet rule
- Reactivity patterns

## Usage Tips

1. **Start Simple**: Begin with Carbon (Z=6) to see a typical configuration
2. **Explore Noble Gases**: Try Helium (2), Neon (10), Argon (18) to see stable configurations
3. **Create Ions**: Add/remove electrons to see how charge affects properties
4. **Compare Elements**: Switch between elements to see trends
5. **Use 3D View**: Rotate and zoom to understand orbital structure
6. **Check Trends**: Look at the chart to see periodic patterns

## Educational Goals

Students will learn:
- ✅ How electron configurations determine chemical properties
- ✅ Why elements react the way they do (through IE and EA)
- ✅ The quantum mechanical basis of the octet rule
- ✅ How to predict reactivity from atomic structure
- ✅ The relationship between orbital penetration and energy
- ✅ Why periodic trends exist and what causes anomalies

## Technical Details

### Technologies Used
- **Next.js 14**: React framework with app router
- **React 18**: Component library
- **Three.js**: 3D graphics
- **@react-three/fiber**: React renderer for Three.js
- **@react-three/drei**: Three.js helpers
- **Chart.js**: Data visualization
- **react-chartjs-2**: React wrapper for Chart.js
- **Tailwind CSS**: Utility-first styling
- **Lucide React**: Icon library

### Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Requires WebGL support for 3D visualizations.

## Customization

### Adding More Elements
Edit `ELEMENTS` array in `AtomVisualizer.jsx`:
```javascript
{ z: 19, symbol: 'K', name: 'Potassium' }
```

### Adjusting Calculations
Modify formulas in calculation functions:
- `calculateIE()` for ionization energy
- `calculateEA()` for electron affinity
- `calculateZeff()` for effective nuclear charge

### Styling Changes
Edit Tailwind classes or add custom CSS in `globals.css`

## Known Limitations

1. **Simplified Model**: Uses approximations for IE/EA calculations
2. **Element Range**: Currently supports Z=1 to Z=18
3. **d-orbital Filling**: Simplified 4s vs 3d ordering
4. **Electron Repulsion**: Not fully modeled
5. **Relativistic Effects**: Not included for heavy elements

These limitations are intentional to keep the model accessible for educational purposes.

## Future Enhancements

Potential additions:
- [ ] More elements (Z > 18)
- [ ] Excited states
- [ ] Multiple ionization energies
- [ ] Electronegativity calculations
- [ ] Molecular orbital theory
- [ ] Bond formation animations
- [ ] Quiz mode
- [ ] Save/share configurations

## Contributing

This is an educational project. Suggestions and improvements welcome!

## License

MIT License - Free for educational use

## Credits

Based on quantum mechanical principles and educational chemistry resources.

## Support

For questions or issues, please refer to:
- Next.js documentation: https://nextjs.org/docs
- Three.js documentation: https://threejs.org/docs
- Chart.js documentation: https://www.chartjs.org/docs

---

**Happy Exploring! 🔬⚛️**

Learn quantum mechanics through interactive visualization!