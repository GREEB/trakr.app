export const defaultFragment = `varying vec3 vColor;
varying vec3 vPos;
void main() {
    gl_FragColor = vec4((vPos.z / 50.0) * 3.0,0.51,0.51, 1.0);
}
`
export const defaultVertex = `attribute float size;
varying vec3 vColor;
varying vec3 vPos;
varying float vSize;
void main() {
    vSize = size;
    vColor = color;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    vPos = position;
    if (size == 1.0){
        gl_PointSize = 2.69420;
    }else if(size == 10.0){
        gl_PointSize = 10.0 * 2.69420;
    }else{
        gl_PointSize = 2.0 * 0.69420;
    }
}
`
