uniform float u_time;
uniform float u_radius;

void main() {
  // vec3 pos = position;

// use sin to position coords b/t -1.0 to 1.0
  float delta = (sin(u_time) + 1.0) / 2.0;

// normalize(vector) calculates the unit vector in the same direction as the original vector.
// vector arg is the vector to normalize. 
  vec3 v = normalize(position) * 1.0; //u_radius;

// mix(x, y, a) linearly interpolate b/t 2 values
// x start of range to interpolate
// y end of range to interpolate
// a specify the value to use to interpolate b/t x and y

  vec3 pos = mix(position, v, delta);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}