/**
 * Atmospheric scattering shader
 * Simplified Rayleigh scattering approximation using Fresnel effect
 */

export const atmosphereVertexShader = `
varying vec3 vNormal;
varying vec3 vWorldPosition;

void main() {
  vNormal = normalize(normalMatrix * normal);
  vec4 worldPosition = modelMatrix * vec4(position, 1.0);
  vWorldPosition = worldPosition.xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const atmosphereFragmentShader = `
uniform vec3 atmosphereColor;
uniform float atmosphereIntensity;
uniform float atmospherePow;
uniform vec3 cameraPosition;

varying vec3 vNormal;
varying vec3 vWorldPosition;

void main() {
  vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
  float fresnel = dot(viewDirection, vNormal);
  fresnel = pow(1.0 - abs(fresnel), atmospherePow);

  vec3 color = atmosphereColor * fresnel * atmosphereIntensity;
  float alpha = fresnel * atmosphereIntensity;

  gl_FragColor = vec4(color, alpha);
}
`;

/**
 * Enhanced planet shader with night lights and cloud support
 */
export const planetVertexShader = `
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorldPosition;
varying vec3 vViewPosition;

void main() {
  vUv = uv;
  vNormal = normalize(normalMatrix * normal);
  vec4 worldPosition = modelMatrix * vec4(position, 1.0);
  vWorldPosition = worldPosition.xyz;
  vViewPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const planetFragmentShader = `
uniform sampler2D albedoMap;
uniform sampler2D nightMap;
uniform bool hasNightMap;
uniform vec3 sunPosition;
uniform float nightIntensity;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorldPosition;

void main() {
  vec3 sunDirection = normalize(sunPosition - vWorldPosition);
  float sunDot = dot(vNormal, sunDirection);

  // Day texture
  vec4 dayColor = texture2D(albedoMap, vUv);

  // Night texture (emissive on dark side)
  vec4 nightColor = vec4(0.0);
  if (hasNightMap) {
    nightColor = texture2D(nightMap, vUv);
    float nightMix = smoothstep(0.1, -0.1, sunDot);
    nightColor.rgb *= nightMix * nightIntensity;
  }

  // Combine day and night
  vec3 finalColor = dayColor.rgb + nightColor.rgb;

  gl_FragColor = vec4(finalColor, 1.0);
}
`;
