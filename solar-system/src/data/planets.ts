/**
 * Planet configuration and asset manifest
 * All distances and sizes use a visual scale for better UX
 * Textures sourced from NASA and Solar System Scope (see ASSETS.md)
 */

export interface PlanetConfig {
  id: string;
  name: string;
  radius: number; // Visual scale (not to actual scale)
  distance: number; // AU from Sun (visual scale)
  orbitalPeriod: number; // Earth days
  rotationPeriod: number; // Earth days
  color: string; // Fallback color
  description: string;

  // Texture assets
  textures: {
    albedo: string;
    normal?: string;
    specular?: string;
    roughness?: string;
    clouds?: string;
    night?: string;
    rings?: string;
  };

  // Material properties
  material: {
    metalness?: number;
    roughness?: number;
    emissive?: string;
    emissiveIntensity?: number;
  };

  // Special features
  features?: {
    atmosphere?: {
      color: string;
      intensity: number;
      pow: number;
    };
    rings?: {
      innerRadius: number;
      outerRadius: number;
      texture: string;
    };
    clouds?: {
      opacity: number;
      rotationSpeed: number;
    };
  };
}

export const PLANETS: Record<string, PlanetConfig> = {
  mercury: {
    id: 'mercury',
    name: 'Mercury',
    radius: 0.13,
    distance: 0.39,
    orbitalPeriod: 88,
    rotationPeriod: 58.6,
    color: '#8C7853',
    description: 'The smallest planet and closest to the Sun. Mercury has a heavily cratered surface and extreme temperature variations.',
    textures: {
      albedo: '/assets/planets/mercury_albedo.jpg',
      normal: '/assets/planets/mercury_normal.jpg',
    },
    material: {
      metalness: 0.1,
      roughness: 0.9,
    },
  },

  venus: {
    id: 'venus',
    name: 'Venus',
    radius: 0.32,
    distance: 0.72,
    orbitalPeriod: 225,
    rotationPeriod: 243,
    color: '#FFC649',
    description: 'Earth\'s "sister planet" with a thick toxic atmosphere. Venus has the hottest surface temperature of any planet.',
    textures: {
      albedo: '/assets/planets/venus_albedo.jpg',
    },
    material: {
      metalness: 0,
      roughness: 0.8,
    },
    features: {
      atmosphere: {
        color: '#FFC649',
        intensity: 0.3,
        pow: 3.0,
      },
    },
  },

  earth: {
    id: 'earth',
    name: 'Earth',
    radius: 0.33,
    distance: 1.0,
    orbitalPeriod: 365.25,
    rotationPeriod: 1.0,
    color: '#4169E1',
    description: 'Our home planet. The only known world with liquid water on its surface and life as we know it.',
    textures: {
      albedo: '/assets/planets/earth_albedo.jpg',
      normal: '/assets/planets/earth_normal.jpg',
      specular: '/assets/planets/earth_specular.jpg',
      clouds: '/assets/planets/earth_clouds.jpg',
      night: '/assets/planets/earth_night.jpg',
    },
    material: {
      metalness: 0.1,
      roughness: 0.7,
    },
    features: {
      atmosphere: {
        color: '#87CEEB',
        intensity: 0.5,
        pow: 4.0,
      },
      clouds: {
        opacity: 0.4,
        rotationSpeed: 1.05,
      },
    },
  },

  mars: {
    id: 'mars',
    name: 'Mars',
    radius: 0.18,
    distance: 1.52,
    orbitalPeriod: 687,
    rotationPeriod: 1.03,
    color: '#CD5C5C',
    description: 'The Red Planet. Mars has the largest volcano and canyon in the solar system and shows evidence of ancient water.',
    textures: {
      albedo: '/assets/planets/mars_albedo.jpg',
      normal: '/assets/planets/mars_normal.jpg',
    },
    material: {
      metalness: 0,
      roughness: 0.95,
    },
    features: {
      atmosphere: {
        color: '#CD853F',
        intensity: 0.2,
        pow: 2.5,
      },
    },
  },

  jupiter: {
    id: 'jupiter',
    name: 'Jupiter',
    radius: 3.73,
    distance: 5.2,
    orbitalPeriod: 4333,
    rotationPeriod: 0.41,
    color: '#DAA520',
    description: 'The largest planet in our solar system. Jupiter is a gas giant with a famous Great Red Spot storm.',
    textures: {
      albedo: '/assets/planets/jupiter_albedo.jpg',
    },
    material: {
      metalness: 0,
      roughness: 0.6,
      emissive: '#DAA520',
      emissiveIntensity: 0.05,
    },
  },

  saturn: {
    id: 'saturn',
    name: 'Saturn',
    radius: 3.15,
    distance: 9.54,
    orbitalPeriod: 10759,
    rotationPeriod: 0.45,
    color: '#F4E3B5',
    description: 'The ringed planet. Saturn\'s spectacular ring system is made of countless ice and rock particles.',
    textures: {
      albedo: '/assets/planets/saturn_albedo.jpg',
      rings: '/assets/planets/saturn_rings.png',
    },
    material: {
      metalness: 0,
      roughness: 0.5,
    },
    features: {
      rings: {
        innerRadius: 0.4,
        outerRadius: 0.77,
        texture: '/assets/planets/saturn_rings.png',
      },
    },
  },

  uranus: {
    id: 'uranus',
    name: 'Uranus',
    radius: 1.33,
    distance: 19.19,
    orbitalPeriod: 30687,
    rotationPeriod: 0.72,
    color: '#4FD0E7',
    description: 'The ice giant that rotates on its side. Uranus has a blue-green color due to methane in its atmosphere.',
    textures: {
      albedo: '/assets/planets/uranus_albedo.jpg',
    },
    material: {
      metalness: 0,
      roughness: 0.4,
    },
    features: {
      atmosphere: {
        color: '#4FD0E7',
        intensity: 0.3,
        pow: 3.5,
      },
    },
  },

  neptune: {
    id: 'neptune',
    name: 'Neptune',
    radius: 1.29,
    distance: 30.07,
    orbitalPeriod: 60190,
    rotationPeriod: 0.67,
    color: '#4169E1',
    description: 'The farthest planet from the Sun. Neptune has the fastest winds in the solar system and a deep blue color.',
    textures: {
      albedo: '/assets/planets/neptune_albedo.jpg',
    },
    material: {
      metalness: 0,
      roughness: 0.4,
    },
    features: {
      atmosphere: {
        color: '#4169E1',
        intensity: 0.35,
        pow: 3.8,
      },
    },
  },
};

export const SUN_CONFIG = {
  id: 'sun',
  name: 'Sun',
  radius: 4,
  color: '#FDB813',
  emissiveIntensity: 2.0,
  textures: {
    albedo: '/assets/sun/sun_albedo.jpg',
  },
};

export const MOON_CONFIG = {
  id: 'moon',
  name: 'Moon',
  radius: 0.09,
  distance: 0.00257, // From Earth in AU
  orbitalPeriod: 27.3,
  color: '#9C9C9C',
  description: 'Earth\'s only natural satellite.',
  textures: {
    albedo: '/assets/moon/moon_albedo.jpg',
    normal: '/assets/moon/moon_normal.jpg',
  },
};

// Planet order for UI
export const PLANET_ORDER = [
  'mercury',
  'venus',
  'earth',
  'mars',
  'jupiter',
  'saturn',
  'uranus',
  'neptune',
];
