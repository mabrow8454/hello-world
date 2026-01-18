# Asset Attribution and Sources

This document details all textures, models, and assets used in the Solar System Explorer, including their sources, licenses, and attribution requirements.

## Texture Sources

All planetary textures should be sourced from reputable, legally usable sources. The following are recommended and approved sources:

### Primary Source: NASA 3D Resources

**Repository**: [https://github.com/nasa/NASA-3D-Resources](https://github.com/nasa/NASA-3D-Resources)

**License**: Public Domain (NASA imagery policy)

**Attribution**: Not required, but recommended: "Courtesy NASA/JPL-Caltech"

**Available Assets**:
- Earth: Blue Marble Next Generation
- Moon: Lunar Reconnaissance Orbiter Camera (LROC)
- Mars: Mars Global Surveyor
- Mercury: MESSENGER spacecraft data
- Venus: Magellan spacecraft radar data

### Secondary Source: Solar System Scope

**Website**: [https://www.solarsystemscope.com/textures/](https://www.solarsystemscope.com/textures/)

**License**: Creative Commons Attribution 4.0 International (CC BY 4.0)

**Attribution Required**: Yes - "Textures courtesy of Solar System Scope"

**Available Assets**:
- All 8 planets (albedo maps)
- Normal maps for rocky planets
- Ring textures for Saturn
- Sun texture

### Tertiary Source: Planetary Visions

**Website**: [http://planetpixelemporium.com/](http://planetpixelemporium.com/)

**License**: Free for non-commercial use

**Attribution Required**: "Maps from planetpixelemporium.com created by James Hastings-Trew"

## Asset Inventory

### Sun

| Asset Type | Filename | Resolution | Source | Attribution |
|------------|----------|------------|--------|-------------|
| Albedo Map | `sun_albedo.jpg` | 4096×2048 | Solar System Scope | Required |

**Attribution**: Solar System Scope

---

### Mercury

| Asset Type | Filename | Resolution | Source | Attribution |
|------------|----------|------------|--------|-------------|
| Albedo Map | `mercury_albedo.jpg` | 4096×2048 | NASA/MESSENGER | Recommended |
| Normal Map | `mercury_normal.jpg` | 4096×2048 | Solar System Scope | Required |

**Attribution**:
- Albedo: "Courtesy NASA/JPL-Caltech/MESSENGER"
- Normal: Solar System Scope

---

### Venus

| Asset Type | Filename | Resolution | Source | Attribution |
|------------|----------|------------|--------|-------------|
| Albedo Map | `venus_albedo.jpg` | 4096×2048 | NASA/Magellan | Recommended |

**Attribution**: "Courtesy NASA/JPL-Caltech/Magellan Mission"

---

### Earth

| Asset Type | Filename | Resolution | Source | Attribution |
|------------|----------|------------|--------|-------------|
| Albedo Map | `earth_albedo.jpg` | 8192×4096 | NASA Blue Marble | Recommended |
| Normal Map | `earth_normal.jpg` | 4096×2048 | Solar System Scope | Required |
| Specular Map | `earth_specular.jpg` | 4096×2048 | Solar System Scope | Required |
| Cloud Map | `earth_clouds.jpg` | 4096×2048 | NASA/MODIS | Recommended |
| Night Lights | `earth_night.jpg` | 4096×2048 | NASA Earth Observatory | Recommended |

**Attribution**:
- Day/Night/Clouds: "NASA's Earth Observatory"
- Normal/Specular: Solar System Scope

**Special Notes**: Earth textures are the most detailed. Consider using 8K albedo for desktop, 4K for mobile.

---

### Moon (Earth's)

| Asset Type | Filename | Resolution | Source | Attribution |
|------------|----------|------------|--------|-------------|
| Albedo Map | `moon_albedo.jpg` | 4096×2048 | NASA/LRO/LROC | Recommended |
| Normal Map | `moon_normal.jpg` | 4096×2048 | Solar System Scope | Required |

**Attribution**:
- Albedo: "Courtesy NASA/Goddard/LRO"
- Normal: Solar System Scope

---

### Mars

| Asset Type | Filename | Resolution | Source | Attribution |
|------------|----------|------------|--------|-------------|
| Albedo Map | `mars_albedo.jpg` | 4096×2048 | NASA/USGS | Recommended |
| Normal Map | `mars_normal.jpg` | 4096×2048 | Solar System Scope | Required |

**Attribution**:
- Albedo: "NASA/USGS/Viking Orbiter"
- Normal: Solar System Scope

---

### Jupiter

| Asset Type | Filename | Resolution | Source | Attribution |
|------------|----------|------------|--------|-------------|
| Albedo Map | `jupiter_albedo.jpg` | 4096×2048 | NASA/JPL/Cassini | Recommended |

**Attribution**: "NASA/JPL-Caltech/SwRI/MSSS"

**Special Notes**: Jupiter's cloud bands are highly dynamic. Textures may not match current appearance.

---

### Saturn

| Asset Type | Filename | Resolution | Source | Attribution |
|------------|----------|------------|--------|-------------|
| Albedo Map | `saturn_albedo.jpg` | 4096×2048 | NASA/JPL/Cassini | Recommended |
| Ring Texture | `saturn_rings.png` | 2048×2048 | Solar System Scope | Required |

**Attribution**:
- Planet: "NASA/JPL-Caltech/Space Science Institute/Cassini"
- Rings: Solar System Scope

**Ring Texture Notes**:
- Rings texture should be a radial gradient from inner to outer edge
- Includes Cassini Division (dark gap)
- Transparency/alpha channel for ring variations

---

### Uranus

| Asset Type | Filename | Resolution | Source | Attribution |
|------------|----------|------------|--------|-------------|
| Albedo Map | `uranus_albedo.jpg` | 2048×1024 | NASA/JPL/Voyager | Recommended |

**Attribution**: "NASA/JPL-Caltech/Voyager 2"

**Special Notes**: Limited high-resolution imagery available (only Voyager 2 flyby). Lower resolution acceptable.

---

### Neptune

| Asset Type | Filename | Resolution | Source | Attribution |
|------------|----------|------------|--------|-------------|
| Albedo Map | `neptune_albedo.jpg` | 2048×1024 | NASA/JPL/Voyager | Recommended |

**Attribution**: "NASA/JPL-Caltech/Voyager 2"

**Special Notes**: Similar to Uranus, limited imagery available. Lower resolution acceptable.

---

## Texture Specifications

### Resolution Guidelines

**Desktop (High Quality)**:
- Sun: 4096×2048
- Earth: 8192×4096 (albedo), 4096×2048 (others)
- Gas Giants: 4096×2048
- Ice Giants: 2048×1024
- Rocky Planets: 4096×2048

**Mobile (Optimized)**:
- All planets: 2048×1024
- Consider KTX2 compression

### Format Recommendations

1. **Development**: JPG (85-90% quality) or PNG
2. **Production**: KTX2 (Basis Universal compression)
   - Smaller file size (50-80% reduction)
   - GPU-friendly format
   - Faster loading

### Map Types

1. **Albedo (Color)**: RGB surface color
2. **Normal**: RGB normal map for surface detail
3. **Specular**: Grayscale reflectivity map
4. **Roughness**: Grayscale surface roughness
5. **Emissive**: RGB for self-illumination (Earth night lights)

## Usage License Summary

### NASA Assets (Public Domain)
✅ Commercial use allowed
✅ Modification allowed
✅ No attribution required (recommended)
✅ No warranty

### Solar System Scope (CC BY 4.0)
✅ Commercial use allowed
✅ Modification allowed
✅ Attribution REQUIRED
✅ Share-alike NOT required
✅ Indicate changes

### Planetary Visions
❌ Commercial use NOT allowed (non-commercial only)
✅ Modification allowed
✅ Attribution required
✅ Personal/educational use only

## Implementing Attribution

### In-App Attribution

Add attribution to the UI:

```typescript
// In PlanetInfo component or About page
<div className="attribution">
  <p>Textures courtesy of:</p>
  <ul>
    <li>NASA/JPL-Caltech</li>
    <li>Solar System Scope (CC BY 4.0)</li>
  </ul>
</div>
```

### In Documentation

Include this section in your README:

```markdown
## Attributions

This project uses planetary textures from:
- NASA 3D Resources (Public Domain)
- Solar System Scope (CC BY 4.0)

See ASSETS.md for detailed attribution.
```

## Download Links

### NASA Resources
- [NASA 3D Resources GitHub](https://github.com/nasa/NASA-3D-Resources)
- [NASA Visible Earth](https://visibleearth.nasa.gov/)
- [NASA Earth Observatory](https://earthobservatory.nasa.gov/)
- [Planetary Data System](https://pds.nasa.gov/)

### Solar System Scope
- [Texture Library](https://www.solarsystemscope.com/textures/)
- Download includes: 2K, 4K, 8K versions

### Additional Resources
- [CGTrader](https://www.cgtrader.com/free-3d-models/space) - Free space models
- [Poly Haven](https://polyhaven.com/) - HDRI space backgrounds
- [Textures.com](https://www.textures.com/) - Additional terrain textures

## Compression Tools

### Recommended Tools

1. **BasisU Encoder**: Convert to KTX2
   ```bash
   npm install -g basisu
   basisu -ktx2 input.jpg -output_file output.ktx2
   ```

2. **ImageMagick**: Resize and optimize
   ```bash
   convert input.jpg -resize 4096x2048 -quality 85 output.jpg
   ```

3. **Squoosh**: Web-based optimizer
   - [https://squoosh.app/](https://squoosh.app/)

## Legal Compliance Checklist

Before deployment:

- [ ] All textures documented in this file
- [ ] Attribution added to app UI (About/Info page)
- [ ] Attribution in README.md
- [ ] Only using assets with compatible licenses
- [ ] Commercial use rights verified (if applicable)
- [ ] Attribution text matches requirements
- [ ] Source URLs documented

## Updating Assets

When adding new assets:

1. Add entry to relevant section above
2. Document source and attribution
3. Add file to `/public/assets/planets/`
4. Update `src/data/planets.ts` configuration
5. Test loading in development
6. Commit with clear message

## Questions?

For licensing questions:
- NASA: Contact [public-inquiries@hq.nasa.gov](mailto:public-inquiries@hq.nasa.gov)
- Solar System Scope: See [License FAQ](https://www.solarsystemscope.com/textures/)

---

**Last Updated**: 2024
**Maintainer**: [Your Name]
