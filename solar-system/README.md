# Solar System Explorer

A production-quality, interactive 3D visualization of our Solar System, inspired by NASA's "Eyes on the Solar System". Built with React, TypeScript, and Three.js.

![Solar System Explorer](https://via.placeholder.com/1200x600?text=Solar+System+Explorer)

## Features

### 🌍 Realistic Planet Rendering
- High-resolution textures for all 8 planets
- Physically-based rendering (PBR) materials
- Earth features:
  - Day/night texture blending
  - Cloud layer with independent rotation
  - Night city lights (emissive)
  - Atmospheric scattering
- Saturn's iconic ring system
- Atmospheric glow effects for Venus, Earth, Mars, Uranus, and Neptune

### 🎮 Interactive Controls
- **Orbit Controls**: Drag to rotate, scroll/pinch to zoom
- **Planet Focus**: Click any planet to smoothly transition camera
- **Time Controls**:
  - Play/Pause simulation
  - Speed multipliers: 1×, 10×, 100×, 1000×
  - Reset to initial state

### 🔗 Deep Linking
- URL-based navigation (`/#/planet/earth`)
- Direct links to any planet
- Shareable views

### 🎨 Visual Polish
- Bloom post-processing for the Sun
- 5000-star background with parallax
- ACES Filmic tone mapping
- Smooth camera transitions
- Responsive UI for desktop and mobile

## Tech Stack

- **React 18** + **TypeScript** - Modern UI framework
- **Three.js** - 3D graphics engine
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers and abstractions
- **@react-three/postprocessing** - Effects composer
- **Zustand** - Lightweight state management
- **React Router** - URL routing
- **Vite** - Fast build tool and dev server

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd solar-system

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

The dev server includes hot module replacement (HMR) for instant updates.

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

The build output will be in the `dist/` directory, optimized and minified.

## Project Structure

```
solar-system/
├── public/
│   └── assets/
│       ├── planets/          # Planet textures (albedo, normal, specular, etc.)
│       ├── sun/              # Sun texture
│       └── moon/             # Moon textures
├── src/
│   ├── components/
│   │   ├── 3d/              # Three.js components
│   │   │   ├── Scene.tsx    # Main 3D scene orchestrator
│   │   │   ├── Planet.tsx   # Planet mesh with materials
│   │   │   ├── Sun.tsx      # Sun with glow and lighting
│   │   │   ├── Atmosphere.tsx
│   │   │   ├── Clouds.tsx
│   │   │   └── Rings.tsx
│   │   └── ui/              # UI components
│   │       ├── PlanetList.tsx
│   │       ├── PlanetInfo.tsx
│   │       └── TimeControls.tsx
│   ├── data/
│   │   └── planets.ts       # Planet configuration & asset manifest
│   ├── store/
│   │   └── appStore.ts      # Zustand state management
│   ├── shaders/
│   │   └── atmosphere.ts    # Custom GLSL shaders
│   ├── App.tsx              # Main app component with routing
│   ├── main.tsx             # Entry point
│   └── App.css              # Global styles
├── package.json
├── vite.config.ts
├── tsconfig.json
├── README.md
└── ASSETS.md               # Asset attribution and sources
```

## Configuration

### Planet Data

All planet configurations are in `src/data/planets.ts`. Each planet includes:

```typescript
{
  id: string;
  name: string;
  radius: number;           // Visual scale
  distance: number;         // AU from Sun (visual scale)
  orbitalPeriod: number;    // Earth days
  rotationPeriod: number;   // Earth days
  textures: {...};          // Asset paths
  material: {...};          // PBR properties
  features?: {...};         // Atmosphere, clouds, rings
}
```

### Performance Optimization

The app includes several performance optimizations:

1. **Code Splitting**: Vendor chunks separated for better caching
2. **Lazy Loading**: Textures load on demand via Suspense
3. **LOD System**: Ready for multiple texture resolutions
4. **Texture Compression**: KTX2 support (add `.ktx2` files to `/public/assets`)
5. **Mobile Detection**: Reduced effects on mobile devices

### Adding Custom Textures

1. Place texture files in `/public/assets/planets/`
2. Update the planet config in `src/data/planets.ts`
3. Supported formats: JPG, PNG, KTX2 (recommended for compression)

Example:
```typescript
textures: {
  albedo: '/assets/planets/earth_albedo.jpg',
  normal: '/assets/planets/earth_normal.jpg',
  // Add your custom texture
  custom: '/assets/planets/earth_custom.jpg',
}
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 15+
- Mobile browsers with WebGL 2.0 support

## Performance Tips

### For Best Performance:

1. **Use compressed textures** (KTX2 format) for faster loading
2. **Limit texture resolution**:
   - Desktop: 4K (4096×2048)
   - Mobile: 2K (2048×1024)
3. **Enable GPU acceleration** in browser settings
4. **Close other tabs** running heavy applications

### Troubleshooting

**Low FPS on mobile?**
- The app automatically reduces effects on mobile
- Try closing other apps
- Ensure browser is up to date

**Textures not loading?**
- Check browser console for errors
- Verify file paths in `src/data/planets.ts`
- Ensure files exist in `/public/assets/`

**Black screen?**
- Your browser may not support WebGL 2.0
- Try a different browser
- Check GPU driver updates

## Contributing

Contributions are welcome! Areas for improvement:

- [ ] Add more detailed textures (8K+ resolution)
- [ ] Implement texture streaming/LOD system
- [ ] Add planetary moons beyond Earth's Moon
- [ ] Include asteroid belt visualization
- [ ] Add VR/AR support
- [ ] Implement more accurate orbital mechanics (elliptical orbits, axial tilt)
- [ ] Add planet size comparison view
- [ ] Implement search functionality in planet list
- [ ] Add educational tooltips and facts

## License

This project is provided for educational and non-commercial use. See ASSETS.md for texture attribution and licensing.

## Credits

**Developed by**: [Your Name]

**Textures**: See [ASSETS.md](./ASSETS.md) for detailed attribution

**Inspired by**: NASA's "Eyes on the Solar System"

**Libraries**:
- Three.js by Mr.doob and contributors
- React by Meta and contributors
- @react-three/fiber by Poimandres

## Links

- [NASA 3D Resources](https://github.com/nasa/NASA-3D-Resources)
- [Solar System Scope Textures](https://www.solarsystemscope.com/textures/)
- [Three.js Documentation](https://threejs.org/docs/)
- [@react-three/fiber Documentation](https://docs.pmnd.rs/react-three-fiber/)

---

**Note**: This is a visualization tool and uses simplified orbital mechanics. For scientifically accurate data, refer to NASA's official resources.
