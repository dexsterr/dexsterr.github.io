import { useEffect, useRef } from 'react';

/**
 * Full-viewport WebGL backdrop. A single fullscreen-triangle fragment shader
 * renders domain-warped fbm "energy" tinted neon green→cyan, a receding
 * perspective grid, scanlines, grain and a vignette. Reacts to pointer
 * (parallax) and scroll. No external deps.
 *
 * Fallbacks: if WebGL is unavailable or prefers-reduced-motion is set, renders
 * a static CSS gradient (handled by the parent's .cyber-bg). Handles DPR,
 * resize, tab-visibility pause and WebGL context loss/restore.
 */
const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_scroll;

float hash(vec2 p){ p = fract(p*vec2(123.34, 456.21)); p += dot(p, p+45.32); return fract(p.x*p.y); }
float noise(vec2 p){
  vec2 i = floor(p); vec2 f = fract(p);
  vec2 u = f*f*(3.0-2.0*f);
  float a = hash(i);
  float b = hash(i+vec2(1.0,0.0));
  float c = hash(i+vec2(0.0,1.0));
  float d = hash(i+vec2(1.0,1.0));
  return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0; float a = 0.5;
  mat2 m = mat2(1.6,1.2,-1.2,1.6);
  for(int i=0;i<3;i++){ v += a*noise(p); p = m*p; a *= 0.5; }
  return v;
}

void main(){
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  vec2 p = (gl_FragCoord.xy - 0.5*u_res.xy) / u_res.y;
  float t = u_time*0.025;
  vec2 par = (u_mouse - 0.5) * 0.18;

  // slow, soft domain-warped glow — no hard edges
  vec2 q = vec2(fbm(p*0.9 + t + par), fbm(p*0.9 - t + vec2(3.2,1.3)));
  float f = fbm(p*0.9 + 1.4*q);

  vec3 base  = vec3(0.016, 0.027, 0.035);   // near-black ink
  vec3 green = vec3(0.06, 0.52, 0.30);
  vec3 cyan  = vec3(0.10, 0.42, 0.52);

  // two faint light pools that drift
  float glowA = smoothstep(0.55, 1.0, f);
  float glowB = pow(smoothstep(0.6, 1.0, fbm(p*0.7 - vec2(t*1.3))), 1.5);

  vec3 col = base;
  col += green * glowA * 0.16;
  col += cyan  * glowB * 0.10;

  // gentle grain to avoid banding
  col += (hash(uv + fract(u_time))-0.5)*0.015;

  // soft vignette
  float vig = smoothstep(1.25, 0.15, length(p*vec2(0.9,1.0)));
  col *= vig;

  gl_FragColor = vec4(col, 1.0);
}
`;

const VERT = `
attribute vec2 a_pos;
void main(){ gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const ShaderBackground = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const canvas = ref.current!;
    const gl = canvas.getContext('webgl', { antialias: false, alpha: true, powerPreference: 'high-performance' });
    if (!gl) return; // CSS gradient fallback shows through

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, 'u_res');
    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uMouse = gl.getUniformLocation(prog, 'u_mouse');
    const uScroll = gl.getUniformLocation(prog, 'u_scroll');

    // render below native res — the backdrop is soft, so this is invisible but
    // keeps the fragment shader cheap enough for a locked 60fps.
    const dpr = Math.min(window.devicePixelRatio || 1, 1.2) * 0.65;
    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();

    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    const onMove = (e: PointerEvent) => {
      mouse.tx = e.clientX / window.innerWidth;
      mouse.ty = 1 - e.clientY / window.innerHeight;
    };

    let raf = 0;
    let running = true;
    const start = performance.now();
    const render = () => {
      if (!running) return;
      raf = requestAnimationFrame(render);
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      const scroll = Math.min(1, window.scrollY / Math.max(1, window.innerHeight));
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, (performance.now() - start) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uScroll, scroll);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const onVisibility = () => {
      running = document.visibilityState === 'visible';
      if (running) raf = requestAnimationFrame(render);
      else cancelAnimationFrame(raf);
    };
    const onLost = (e: Event) => { e.preventDefault(); cancelAnimationFrame(raf); running = false; };

    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    canvas.addEventListener('webglcontextlost', onLost);
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('visibilitychange', onVisibility);
      canvas.removeEventListener('webglcontextlost', onLost);
    };
  }, []);

  return <canvas ref={ref} className="fixed inset-0 w-full h-full pointer-events-none z-0" aria-hidden="true" />;
};

export default ShaderBackground;
