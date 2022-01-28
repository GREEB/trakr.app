export const defaultVertex = `attribute float size;
varying vec3 vColor;
varying vec3 vPos;
void main() {
    vColor = color;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    vPos = position;
    gl_PointSize = color.r * 5.0;
}
`
export const defaultFragment = `varying vec3 vColor;
varying vec3 vPos;
void main() {
    gl_FragColor = vec4((vPos.z / 50.0) * 3.0,0.51,0.51, 1.0);
}
`
