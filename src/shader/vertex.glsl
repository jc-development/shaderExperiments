uniform float u_time;
uniform float u_radius;

void main() {
  // vec3 pos = position;

  // use sin to position coords b/t 0.0 to 1.0
  // to amplify the position of the vertex; can be neg float too
  float delta = ((sin(u_time * 1.25) + 1.0) / 2.0); // * 0.5;

  // normalize(vector) calculates the unit vector in the same direction as the original vector.
  // set it to length of 1
  // vector arg is the vector to normalize. 
  vec3 v = normalize(position) * u_radius;

  // vec3 step = smoothstep(0.0, 1.0, v);

  // mix(x, y, a) linearly interpolate b/t 2 values
  // x start of range to interpolate
  // y end of range to interpolate
  // a specify the value to use to interpolate b/t x and y
  vec3 pos = mix(position, v, delta);

  // gl_Position is a special variable a vertex shader is responsible for setting
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 0.75);
}

// https://webgl-shaders.com/