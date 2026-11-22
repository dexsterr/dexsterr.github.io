// P13: portfolio cybersecurity Oskara. Ciemna przestrzeń SOC, kamera leci przez 11 scen.
// WYDAJNOŚĆ (lekcja z P12): bez cieni, bez transmisji, bez postprocessingu z biblioteki.
// Jeden render do celu MSAA + jedno przejście (aberracja, winieta, ziarno, tone mapping).
// Poświata = sprite'y addytywne. Sceny poza kamerą wyłączone. Rozdzielczość dopasowuje się do FPS.
import * as THREE from 'three';
import gsap from 'gsap';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { LINKS, UI, EXP, PROJECTS, CERTS, SKILLS } from './data.js';

const Q = new URLSearchParams(location.search);
const AT = Q.has('at') ? parseFloat(Q.get('at')) : null;
const NO_INTRO = AT !== null || Q.has('nointro');
if (Q.has('clean')) document.documentElement.classList.add('clean');
const isMobile = () => innerWidth / innerHeight < 0.85;
const clamp01 = x => Math.min(1, Math.max(0, x));
const sstep = (a, b, x) => { const t = clamp01((x - a) / (b - a)); return t * t * (3 - 2 * t); };
function rng(s) { return () => { s |= 0; s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
let LANG = 'en';
try { const l = localStorage.getItem('oc_lang2'); if (l === 'en' || l === 'pl') LANG = l; } catch (e) { /* brak dostępu */ }
const tr = v => (typeof v === 'string' ? v : v[LANG]);

// ---------------------------------------------------------------- renderer + 1 przejście post
const canvas = document.getElementById('gl');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false, stencil: false, depth: true, powerPreference: 'high-performance', preserveDrawingBuffer: Q.has('shot') });
const DPR_CAP = Math.min(devicePixelRatio || 1, isMobile() ? 1.5 : 1.25);
let dpr = DPR_CAP;
renderer.setPixelRatio(1);
const BG = new THREE.Color('#06080b');
const scene = new THREE.Scene();
scene.background = BG;
scene.fog = new THREE.FogExp2(BG, 0.03);
const camera = new THREE.PerspectiveCamera(isMobile() ? 52 : 38, innerWidth / innerHeight, 0.1, 260);
const rt = new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, samples: 4 });
const post = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new THREE.ShaderMaterial({
  depthTest: false, depthWrite: false,
  uniforms: { tD: { value: rt.texture }, ca: { value: 0.002 }, t: { value: 0 }, flash: { value: 0 } },
  vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0., 1.); }',
  fragmentShader: `uniform sampler2D tD; uniform float ca, t, flash; varying vec2 vUv;
    float h(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233)) + t * 7.) * 43758.5453); }
    vec3 aces(vec3 x){ return clamp((x * (2.51 * x + .03)) / (x * (2.43 * x + .59) + .14), 0., 1.); }
    void main(){
      vec2 d = vUv - .5; float r = dot(d, d);
      vec2 o = d * ca * (.4 + r * 4.);
      vec3 c = vec3(texture2D(tD, vUv + o).r, texture2D(tD, vUv).g, texture2D(tD, vUv - o).b);
      c = aces(c * 1.05);
      c *= 1. - smoothstep(.18, .75, r) * .55;
      c += (h(vUv * 999.) - .5) * .035;
      c = mix(c, vec3(1.), flash);
      gl_FragColor = vec4(pow(max(c, 0.), vec3(1. / 2.2)), 1.);
    }`,
}));
const postScene = new THREE.Scene(); postScene.add(post);
const postCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
function setSize() {
  const w = innerWidth, h = innerHeight;
  renderer.setSize(w, h, false); canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
  renderer.setDrawingBufferSize(w, h, dpr);
  rt.setSize(Math.round(w * dpr), Math.round(h * dpr));
  camera.aspect = w / h; camera.fov = isMobile() ? 52 : 38; camera.updateProjectionMatrix();
}
setSize();

// ---------------------------------------------------------------- wspólne
const ACC = new THREE.Color('#ff4b2b'), ACC2 = new THREE.Color('#7fd6ff'), AMB = new THREE.Color('#ffb340'), WH = new THREE.Color('#e9edf1'), DIM = new THREE.Color('#2a323b');
scene.add(new THREE.HemisphereLight('#9fb3c8', '#06080b', 0.9));
const dir = new THREE.DirectionalLight('#ffffff', 1.6); dir.position.set(-4, 8, 6); scene.add(dir);
const glowTex = (() => { const c = document.createElement('canvas'); c.width = c.height = 128; const x = c.getContext('2d'); const g = x.createRadialGradient(64, 64, 0, 64, 64, 64); g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(0.18, 'rgba(255,255,255,.55)'); g.addColorStop(0.5, 'rgba(255,255,255,.1)'); g.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = g; x.fillRect(0, 0, 128, 128); return new THREE.CanvasTexture(c); })();
function glow(color, size, op = 1) { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: op, fog: false })); s.scale.setScalar(size); return s; }
const lineMat = (color, op = 1, add = true) => new THREE.LineBasicMaterial({ color, transparent: true, opacity: op, blending: add ? THREE.AdditiveBlending : THREE.NormalBlending, depthWrite: false });
const basic = (color, op = 1) => new THREE.MeshBasicMaterial({ color, transparent: op < 1, opacity: op });
function circle(r, n = 128) { const p = []; for (let i = 0; i <= n; i++) { const a = i / n * Math.PI * 2; p.push(new THREE.Vector3(Math.cos(a) * r, 0, Math.sin(a) * r)); } return new THREE.BufferGeometry().setFromPoints(p); }
function textTex(lines, w = 512, h = 256, bg = null) {
  const c = document.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d');
  if (bg) { x.fillStyle = bg; x.fillRect(0, 0, w, h); }
  lines.forEach(([txt, size, col, y, font = 'IBM Plex Mono, monospace', wt = 500, xx = 24]) => { x.font = `${wt} ${size}px ${font}`; x.fillStyle = col; x.fillText(txt, xx, y); });
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return t;
}

// ---------------------------------------------------------------- tło: siatka, pył, strumienie danych
function buildGrid() {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(260, 560), new THREE.ShaderMaterial({
    uniforms: { t: { value: 0 }, cam: { value: new THREE.Vector3() }, bg: { value: BG }, acc: { value: ACC } },
    vertexShader: 'varying vec3 vW; void main(){ vec4 w = modelMatrix * vec4(position,1.); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }',
    fragmentShader: `uniform float t; uniform vec3 cam, bg, acc; varying vec3 vW;
      float ln(float v, float s){ float g = abs(fract(v / s - .5) - .5) / fwidth(v / s); return 1. - min(g, 1.); }
      void main(){
        float a = max(ln(vW.x, 2.), ln(vW.z, 2.)) * .35 + max(ln(vW.x, 10.), ln(vW.z, 10.)) * .45;
        float d = distance(vW.xz, cam.xz);
        float fade = exp(-d * .035);
        float pulse = smoothstep(.0, .25, ln(vW.x, 10.)) * smoothstep(1.6, 0., abs(fract((vW.z + t * 9.) / 60.) * 60. - 30.)) * 1.6;
        vec3 c = bg + vec3(.16, .19, .23) * a * fade + acc * pulse * fade * .9;
        gl_FragColor = vec4(c, 1.);
      }`,
  }));
  m.rotation.x = -Math.PI / 2; m.position.set(0, -4.2, -200);
  return m;
}
function buildDust() {
  const n = 1600, g = new THREE.BufferGeometry(), a = new Float32Array(n * 3), s = new Float32Array(n), r = rng(3);
  for (let i = 0; i < n; i++) { a.set([r() * 60 - 30, r() * 24 - 6, r() * 60 - 30], i * 3); s[i] = r(); }
  g.setAttribute('position', new THREE.BufferAttribute(a, 3)); g.setAttribute('seed', new THREE.BufferAttribute(s, 1));
  const p = new THREE.Points(g, new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: { t: { value: 0 }, cam: { value: new THREE.Vector3() }, pr: { value: 1 } },
    vertexShader: `attribute float seed; uniform float t, pr; uniform vec3 cam; varying float vA, vS;
      void main(){ vec3 p = position; p.y += t * (.05 + seed * .12); p.x += sin(t * .3 + seed * 40.) * .4;
        p = mod(p - cam + vec3(30., 12., 30.), vec3(60., 24., 60.)) + cam - vec3(30., 12., 30.);
        vec4 mv = modelViewMatrix * vec4(p, 1.); gl_Position = projectionMatrix * mv;
        gl_PointSize = (1. + seed * 2.) * pr * (14. / -mv.z); vA = smoothstep(45., 3., -mv.z) * (.25 + seed * .5); vS = seed; }`,
    fragmentShader: 'uniform float t; varying float vA, vS; void main(){ float d = length(gl_PointCoord - .5); if (d > .5) discard; vec3 c = vS > .96 ? vec3(1., .3, .17) * 2. : vec3(.75, .85, .95); gl_FragColor = vec4(c * vA * (1. - d * 2.), 1.); }',
  }));
  p.frustumCulled = false; return p;
}
function buildStreams() { // pionowe strumienie danych po bokach trasy
  const n = 220, r = rng(8), g = new THREE.InstancedBufferGeometry().copy(new THREE.PlaneGeometry(0.05, 1, 1, 1));
  const off = new Float32Array(n * 4);
  for (let i = 0; i < n; i++) { const side = r() < 0.5 ? -1 : 1; off.set([side * (16 + r() * 40), -4 + r() * 2, 20 - r() * 440, 4 + r() * 18], i * 4); }
  g.setAttribute('off', new THREE.InstancedBufferAttribute(off, 4)); g.instanceCount = n;
  const m = new THREE.Mesh(g, new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: { t: { value: 0 } },
    vertexShader: 'attribute vec4 off; uniform float t; varying float vY, vS; void main(){ vec3 p = position; p.y = (p.y + .5) * off.w; p += off.xyz; vY = position.y + .5; vS = fract(off.x * 3.7 + off.z * .13); vec4 mv = modelViewMatrix * vec4(p,1.); gl_Position = projectionMatrix * mv; }',
    fragmentShader: 'uniform float t; varying float vY, vS; void main(){ float d = fract(vY * 6. - t * (.3 + vS * .6) + vS * 10.); float a = smoothstep(.0, .2, d) * smoothstep(.6, .2, d) * (1. - vY); vec3 c = vS > .9 ? vec3(1., .3, .17) : vec3(.35, .55, .7); gl_FragColor = vec4(c * a * .8, 1.); }',
  }));
  m.frustumCulled = false; return m;
}

// ---------------------------------------------------------------- SCENY
// 0. HERO: JEDEN mocny obiekt 3D (lekcja z wzoru codevibes: hero = obraz + jeden obiekt 3D + dokładny opis).
// Stos 7 lakierowanych płyt-serwerów (MeshPhysicalMaterial + clearcoat, odbicia z RoomEnvironment, bez cieni):
// wpadają przy starcie, obracają się falą o ćwierć obrotu, cały stos przechyla się do myszy.
let ENV = null;
const HERO = { rot: 0, slabs: [] };
function sHero() {
  const g = new THREE.Group(), stack = new THREE.Group(), N = 7, SH = 0.4, GAP = 0.47;
  if (!ENV) { const pm = new THREE.PMREMGenerator(renderer); ENV = pm.fromScene(new RoomEnvironment(), 0.04).texture; pm.dispose(); }
  const geo = new RoundedBoxGeometry(3.0, SH, 2.1, 5, 0.19);
  const dark = new THREE.MeshPhysicalMaterial({ color: '#14181d', metalness: 0.15, roughness: 0.28, clearcoat: 1, clearcoatRoughness: 0.06, envMap: ENV, envMapIntensity: 1.25 });
  const red = new THREE.MeshPhysicalMaterial({ color: '#ff3a1c', metalness: 0.05, roughness: 0.3, clearcoat: 1, clearcoatRoughness: 0.05, envMap: ENV, envMapIntensity: 1.1, emissive: '#5a0a00', emissiveIntensity: 0.6 });
  const ledG = new THREE.BoxGeometry(1.7, 0.035, 0.02);
  const ventG = new THREE.BoxGeometry(0.05, 0.16, 0.02);
  for (let i = 0; i < N; i++) {
    const top = i === N - 1, s = new THREE.Group(), m = new THREE.Mesh(geo, top ? red : dark);
    s.add(m);
    if (!top) { // front: pasek LED + szczeliny wentylacji
      const led = new THREE.Mesh(ledG, new THREE.MeshBasicMaterial({ color: i === 2 ? ACC : ACC2, transparent: true, opacity: 0.9 }));
      led.position.set(-0.35, 0, 1.06); s.add(led);
      for (let k = 0; k < 5; k++) { const v = new THREE.Mesh(ventG, basic('#05070a')); v.position.set(0.85 + k * 0.11, 0, 1.06); s.add(v); }
      s.userData.led = led;
    }
    s.userData.y = (i - (N - 1) / 2) * GAP;
    stack.add(s); HERO.slabs.push(s);
  }
  const halo = glow(ACC, 7.5, 0.16); halo.position.set(0, 1.4, -1.2);
  const floorRing = new THREE.Line(circle(2.6), lineMat(ACC, 0.55)); floorRing.position.y = -1.9;
  const floorRing2 = new THREE.Line(circle(3.3), lineMat('#4a5866', 0.5)); floorRing2.position.y = -1.9;
  const rings = [4.1, 4.8].map((rr, i) => { const l = new THREE.Line(circle(rr), lineMat(i === 0 ? ACC : '#4a5866', i === 0 ? 0.55 : 0.4)); l.rotation.set(0.42 + i * 0.5, 0, i * 0.45); return l; });
  const nodes = rings.map((l, i) => { const s = glow(i === 0 ? ACC : ACC2, 0.7); l.add(s); return s; });
  const key = new THREE.PointLight('#ff5a36', 30, 12, 2); key.position.set(2.5, 2.5, 3);
  const rim = new THREE.PointLight('#7fd6ff', 18, 12, 2); rim.position.set(-3, -0.5, -2.5);
  g.add(halo, stack, floorRing, floorRing2, ...rings, key, rim);
  const u = { value: NO_INTRO ? 1 : 0 };
  // kotwice na stosie (nie na płycie), po lewej stronie: opisy idą w wolne miejsce między nazwiskiem a obiektem
  const a1 = new THREE.Object3D(); a1.position.set(-1.35, HERO.slabs[N - 1].userData.y + 0.18, 0.95); stack.add(a1);
  const a2 = new THREE.Object3D(); a2.position.set(-1.45, HERO.slabs[0].userData.y - 0.42, 0.95); stack.add(a2);
  g.userData = { u, stack, labels: [
    { o: a1, side: 'l', t: () => `slab[6].rotation.y <em>${HERO.rot.toFixed(3)} rad</em>` },
    { o: a2, side: 'l', t: () => `MeshPhysicalMaterial <em>clearcoat 1.0 · roughness 0.28</em>` },
  ], tick(t) {
    HERO.slabs.forEach((s, i) => {
      const k = clamp01(u.value * 1.7 - i * 0.09), drop = Math.pow(1 - k, 3) * 9;
      s.position.y = s.userData.y + drop;
      const cyc = t * 0.32 - i * 0.075, step = Math.floor(cyc) + sstep(0, 0.32, cyc - Math.floor(cyc));
      s.rotation.y = step * Math.PI / 2 + Math.sin(t * 0.8 + i) * 0.015;
      if (s.userData.led) s.userData.led.material.opacity = 0.55 + 0.45 * (Math.sin(t * (2 + i * 0.7) + i * 2) > -0.2 ? 1 : 0.2);
    });
    HERO.rot = ((HERO.slabs[N - 1].rotation.y % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
    stack.rotation.x += ((0.18 + mouse.sy * 0.16) - stack.rotation.x) * 0.06;
    stack.rotation.z += ((-mouse.sx * 0.14) - stack.rotation.z) * 0.06;
    stack.rotation.y = -0.55 + mouse.sx * 0.25;
    rings.forEach((l, i) => { l.rotation.y = t * (0.18 + i * 0.1) * (i % 2 ? -1 : 1); });
    nodes.forEach((s, i) => { const a = t * (0.6 + i * 0.3), rr = [4.1, 4.8][i]; s.position.set(Math.cos(a) * rr, 0, Math.sin(a) * rr); });
    floorRing.scale.setScalar(1 + Math.sin(t * 1.5) * 0.03); halo.material.opacity = 0.13 + Math.sin(t * 1.3) * 0.03;
  } };
  return g;
}
// 1. Profil: strumień SIEM (histogram 3D zdarzeń)
function sSiem() {
  // Taśma zdarzeń SIEM: nowe kubełki czasu wjeżdżają z prawej i płyną w lewo (stała prędkość, każda klatka).
  // Anomalia wjeżdża jako jasny, wysoki słupek; gdy przejdzie przez czerwoną linię korelacji, robi się czerwona i błyska alert.
  const g = new THREE.Group(), C = 30, R = 12, n = C * R, S = 0.3, SPD = 1.1, LINE = 9;
  const im = new THREE.InstancedMesh(new THREE.BoxGeometry(0.22, 1, 0.22), new THREE.MeshBasicMaterial({ color: '#ffffff' }), n);
  const col = new THREE.Color(), o = new THREE.Object3D();
  im.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  const hash = (d, z) => { const v = Math.sin(d * 127.1 + z * 311.7) * 43758.5453; return v - Math.floor(v); };
  const XR = (C / 2) * S, lineX = XR - LINE * S;
  // bramka korelacji: półprzezroczysta czerwona ściana w poprzek taśmy + jasna krawędź u góry
  const scan = new THREE.Mesh(new THREE.PlaneGeometry(R * S + 0.3, 3.2), new THREE.MeshBasicMaterial({ color: ACC, transparent: true, opacity: 0.1, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }));
  scan.position.set(lineX, 0.1, 0); scan.rotation.y = Math.PI / 2;
  const edge = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.PlaneGeometry(R * S + 0.3, 3.2)), lineMat(ACC, 0.9)); edge.position.copy(scan.position); edge.rotation.y = Math.PI / 2; g.add(edge);
  const scanTop = new THREE.Object3D(); scanTop.position.set(lineX, 1.7, (R * S + 0.3) / 2);
  const base = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(C * S, 0.02, R * S)), lineMat('#3d4a57', 0.8));
  base.position.y = -1.5;
  g.add(im, scan, scanTop, base);
  const alerts = [0, 1, 2].map(() => { const s = glow(ACC, 0.9, 0); g.add(s); return s; });
  g.rotation.set(0.12, -0.55, 0);
  let nAl = 0;
  g.userData.labels = [{ o: alerts[0], v: () => alerts[0].material.opacity > 0.35, t: () => `alert.severity <em>HIGH</em> · ${LANG === 'pl' ? 'wykryte' : 'detected'} <em>${nAl}</em>` }, { o: scanTop, t: () => `siem.correlate <em>live</em>` }];
  g.userData.tick = (t) => {
    const off = t * SPD, fl = Math.floor(off), frac = off - fl;
    let a = 0; nAl = 0;
    for (let s = 0; s < C; s++) {
      const d = fl - s, age = s + frac, x = XR - age * S;
      const grow = clamp01(age) * clamp01(C - age); // wjazd z prawej, zjazd z lewej
      for (let z = 0; z < R; z++) {
        const i = s * R + z;
        const isA = hash(d, z) < 0.014 && z > 1 && z < R - 2;
        let h = 0.22 + 0.55 * (0.5 + 0.5 * Math.sin(d * 0.42 + z * 0.55)) * (0.65 + 0.35 * Math.sin(d * 0.11 - z * 0.2));
        if (isA) h = 2.2;
        h *= grow;
        o.position.set(x, -1.5 + h / 2, (z - (R - 1) / 2) * S); o.scale.set(1, Math.max(h, 0.001), 1); o.updateMatrix(); im.setMatrixAt(i, o.matrix);
        if (isA && age >= LINE) {
          nAl++;
          const k = clamp01(1 - (age - LINE) / 6); // świeży alert jaśniejszy
          col.copy(ACC).multiplyScalar(1 + k * 0.8);
          if (a < 3) { alerts[a].position.set(x, -1.5 + h + 0.25, o.position.z); alerts[a].material.opacity = k; a++; }
        } else if (isA) col.copy(WH).multiplyScalar(0.85);
        else col.copy(DIM).lerp(ACC2, clamp01(h / 1.0) * 0.6);
        im.setColorAt(i, col);
      }
    }
    for (; a < 3; a++) alerts[a].material.opacity = 0;
    im.instanceMatrix.needsUpdate = true; im.instanceColor.needsUpdate = true;
    scan.material.opacity = 0.08 + (a > 0 ? alerts[0].material.opacity * 0.12 : 0);
  };
  return g;
}
// 2. Doświadczenie: serwerownia (Capgemini → PGE → Trecom → L2)
function sExp() {
  const g = new THREE.Group(), towers = [], H = [2.8, 3.3, 4, 4.8];
  H.forEach((h, i) => {
    const t = new THREE.Group(); t.position.x = (i - 1.5) * 3.1;
    const target = i === 3;
    const frame = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(1.5, h, 1.1)), target ? new THREE.LineDashedMaterial({ color: AMB, dashSize: 0.15, gapSize: 0.1, transparent: true, opacity: 0.9 }) : lineMat('#55636f', 0.9));
    if (target) frame.computeLineDistances();
    frame.position.y = h / 2 - 2;
    const body = new THREE.Mesh(new THREE.BoxGeometry(1.46, h - 0.04, 1.06), basic('#0b0f14', target ? 0.25 : 0.92));
    body.position.copy(frame.position);
    const units = Math.floor((h - 0.3) / 0.22), leds = new THREE.InstancedMesh(new THREE.BoxGeometry(1.1, 0.05, 0.02), new THREE.MeshBasicMaterial({ color: '#fff' }), units);
    const o = new THREE.Object3D();
    for (let k = 0; k < units; k++) { o.position.set(0, -2 + 0.25 + k * 0.22, 0.56); o.updateMatrix(); leds.setMatrixAt(k, o.matrix); leds.setColorAt(k, DIM); }
    const top = glow(target ? AMB : ACC, 1.6, 0); top.position.y = h - 2 + 0.3;
    t.add(body, frame, leds, top); g.add(t);
    towers.push({ t, leds, units, top, target });
  });
  const cable = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-5.5, -2, 0.9), new THREE.Vector3(5.5, -2, 0.9)]), lineMat('#3d4a57', 1));
  const pulse = glow(ACC, 0.9); g.add(cable, pulse);
  const col = new THREE.Color();
  g.userData = { step: 0, tick(t) {
    towers.forEach((T, i) => {
      const on = i === g.userData.step, past = i < g.userData.step;
      for (let k = 0; k < T.units; k++) {
        const b = Math.sin(t * (3 + k * 0.7) + k * 2.1 + i) > 0.2;
        col.copy(DIM); if (on) col.copy(T.target ? AMB : (b ? ACC2 : DIM)).multiplyScalar(b ? 1.5 : 1); else if (past) col.copy(b ? ACC2 : DIM).multiplyScalar(0.55);
        T.leds.setColorAt(k, col);
      }
      T.leds.instanceColor.needsUpdate = true;
      T.top.material.opacity += ((on ? 0.9 : 0) - T.top.material.opacity) * 0.08;
      T.t.position.y += ((on ? 0.25 : 0) - T.t.position.y) * 0.08;
    });
    const tx = (g.userData.step - 1.5) * 3.1; pulse.position.set(-5.5 + ((t * 0.5) % 1) * (tx + 5.5), -2, 0.9);
  } };
  g.rotation.y = -0.18;
  return g;
}
// 3. C2: węzeł dowodzenia i agenci
function sC2() {
  const g = new THREE.Group(), n = 26, r = rng(31), ag = [];
  const hub = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.OctahedronGeometry(0.8)), lineMat(ACC, 1));
  g.add(hub, glow(ACC, 2.4, 0.7));
  const lp = new Float32Array(n * 6), lg = new THREE.BufferGeometry(); lg.setAttribute('position', new THREE.BufferAttribute(lp, 3));
  const lines = new THREE.LineSegments(lg, lineMat('#4f6b80', 0.55)); g.add(lines);
  const nodes = new THREE.InstancedMesh(new THREE.BoxGeometry(0.16, 0.16, 0.16), new THREE.MeshBasicMaterial({ color: ACC2 }), n);
  const pk = new THREE.InstancedMesh(new THREE.SphereGeometry(0.05, 6, 4), new THREE.MeshBasicMaterial({ color: '#ffd2c8' }), n);
  g.add(nodes, pk);
  g.userData.labels = [{ o: hub, t: () => `c2.hub <em>socket.io · SOCKS5</em>` }];
  for (let i = 0; i < n; i++) { const y = 1 - (i + 0.5) / n * 2, rr = Math.sqrt(1 - y * y), th = i * 2.4; ag.push({ v: new THREE.Vector3(Math.cos(th) * rr, y * 0.8, Math.sin(th) * rr).multiplyScalar(2.6 + r() * 0.8), sp: 0.4 + r() * 0.8, ph: r() }); }
  const o = new THREE.Object3D(), v = new THREE.Vector3();
  g.userData.tick = (t) => {
    g.rotation.y = t * 0.12; hub.rotation.set(t * 0.5, t * 0.7, 0);
    ag.forEach((a, i) => {
      v.copy(a.v).applyAxisAngle(THREE.Object3D.DEFAULT_UP, Math.sin(t * 0.2 + i) * 0.08);
      o.position.copy(v); o.rotation.set(t, t * 0.7, 0); o.scale.setScalar(1); o.updateMatrix(); nodes.setMatrixAt(i, o.matrix);
      lp.set([0, 0, 0, v.x, v.y, v.z], i * 6);
      const k = ((t * 0.45 - i / n) % 1 + 1) % 1; o.position.copy(v).multiplyScalar(k); o.updateMatrix(); pk.setMatrixAt(i, o.matrix);
    });
    nodes.instanceMatrix.needsUpdate = pk.instanceMatrix.needsUpdate = true; lg.attributes.position.needsUpdate = true;
  };
  return g;
}
// 4. Arbitraż: świece rynkowe
function sArb() {
  const g = new THREE.Group(), n = 34, r = rng(41), W = 0.26;
  const bodies = new THREE.InstancedMesh(new THREE.BoxGeometry(W * 0.7, 1, W * 0.7), new THREE.MeshBasicMaterial({ color: '#fff' }), n);
  const wp = new Float32Array(n * 6), wg = new THREE.BufferGeometry(); wg.setAttribute('position', new THREE.BufferAttribute(wp, 3));
  const wicks = new THREE.LineSegments(wg, lineMat('#7b8894', 0.8));
  const lp = new Float32Array(n * 3), lg = new THREE.BufferGeometry(); lg.setAttribute('position', new THREE.BufferAttribute(lp, 3));
  const line = new THREE.Line(lg, lineMat(ACC2, 0.9));
  const gridL = []; for (let i = 0; i < 6; i++) gridL.push(new THREE.Vector3(-n * W / 2, -1.6 + i * 0.7, -0.4), new THREE.Vector3(n * W / 2, -1.6 + i * 0.7, -0.4));
  const grid = new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(gridL), lineMat('#26303a', 1, false));
  const tip = glow(ACC2, 1.1);
  g.add(grid, bodies, wicks, line, tip);
  g.userData.labels = [{ o: tip, t: () => `feed.last <em>${(100 + price * 3.7).toFixed(2)}</em>` }];
  let price = 0; const C = [];
  const next = () => { const o = price, c = o + (r() - 0.48) * 0.55; price = THREE.MathUtils.clamp(c, -1.2, 1.4); return { o, c: price, hi: Math.max(o, price) + r() * 0.25, lo: Math.min(o, price) - r() * 0.25 }; };
  for (let i = 0; i < n; i++) C.push(next());
  const o3 = new THREE.Object3D(), col = new THREE.Color(); let shift = 0;
  g.userData.tick = (t, k, dt) => {
    shift += dt * 1.4; if (shift >= 1) { shift -= 1; C.shift(); C.push(next()); }
    C.forEach((c, i) => {
      const x = (i - shift - n / 2) * W, up = c.c >= c.o, h = Math.max(0.04, Math.abs(c.c - c.o));
      o3.position.set(x, (c.c + c.o) / 2, 0); o3.scale.set(1, h, 1); o3.updateMatrix(); bodies.setMatrixAt(i, o3.matrix);
      bodies.setColorAt(i, col.copy(up ? WH : ACC).multiplyScalar(up ? 0.9 : 1.4));
      wp.set([x, c.lo, 0, x, c.hi, 0], i * 6); lp.set([x, c.c + 0.9, 0.1], i * 3);
    });
    tip.position.set(lp[(n - 1) * 3], lp[(n - 1) * 3 + 1], 0.1);
    bodies.instanceMatrix.needsUpdate = bodies.instanceColor.needsUpdate = true; wg.attributes.position.needsUpdate = lg.attributes.position.needsUpdate = true;
  };
  g.rotation.y = -0.35;
  return g;
}
// 5. Pentest web: okna przeglądarki i skan
function sWeb() {
  const g = new THREE.Group(), N = 5, vulns = ['SQL INJECTION', 'XSS', 'CSRF', 'LFI / RFI', '../ TRAVERSAL'], wins = [];
  for (let i = 0; i < N; i++) {
    const w = new THREE.Group(), W = 3.6, H = 2.3;
    const fr = []; const P = (x, y) => new THREE.Vector3(x, y, 0);
    fr.push(P(-W / 2, -H / 2), P(W / 2, -H / 2), P(W / 2, -H / 2), P(W / 2, H / 2), P(W / 2, H / 2), P(-W / 2, H / 2), P(-W / 2, H / 2), P(-W / 2, -H / 2), P(-W / 2, H / 2 - 0.3), P(W / 2, H / 2 - 0.3));
    const frame = new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(fr), lineMat('#5b6976', 0.9));
    const tex = textTex([['https://target.local/' + ['login', 'search', 'profile', 'files', 'api'][i], 22, '#6d7a86', 34], ['GET /?q=' + ["' OR 1=1--", '<script>', 'token=∅', 'page=../../', 'id=7'][i], 26, '#9fb0bf', 120], ['[!] ' + vulns[i], 34, '#ff4b2b', 200, 'IBM Plex Mono, monospace', 600]]);
    const fill = new THREE.Mesh(new THREE.PlaneGeometry(W, H - 0.3), new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }));
    fill.position.y = -0.15;
    const bg = new THREE.Mesh(new THREE.PlaneGeometry(W, H), basic('#0a0e13', 0.7)); bg.position.z = -0.01;
    const dots = [0, 1, 2].map(k => { const d = glow(k === 0 ? ACC : '#5b6976', 0.25); d.position.set(-W / 2 + 0.2 + k * 0.18, H / 2 - 0.15, 0.01); return d; });
    w.add(bg, frame, fill, ...dots);
    w.position.set(i * 0.35 - 0.7, i * 0.12 - 0.25, -i * 1.1); w.rotation.y = 0.12;
    g.add(w); wins.push({ w, fill });
  }
  const laser = new THREE.Mesh(new THREE.PlaneGeometry(4.6, 0.03), new THREE.MeshBasicMaterial({ color: ACC, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }));
  const lg = glow(ACC, 1.2); laser.add(lg);
  g.add(laser);
  // cykl: każde okno skanowane z góry na dół (1,8 s), na końcu skanu pokazuje znalezioną podatność; po 5 oknach pauza
  const D = 1.8, CYC = N * D + 1.6; let cur = 0;
  g.userData.labels = [{ o: lg, v: () => cur < N, t: () => `scan → <em>${vulns[Math.min(N - 1, cur)]}</em>` }];
  g.userData.tick = (t) => {
    const ph = t % CYC; cur = Math.floor(ph / D); const loc = (ph % D) / D;
    laser.visible = cur < N;
    if (cur < N) { laser.position.set(cur * 0.35 - 0.7, cur * 0.12 - 0.25 + 0.85 - loc * 1.95, -cur * 1.1 + 0.02); lg.position.x = -1.7 + 3.4 * ((loc * 3) % 1); }
    wins.forEach(({ fill }, i) => { const on = i < cur || (i === cur && loc > 0.8); fill.material.opacity += ((on ? 1 : 0.1) - fill.material.opacity) * 0.12; });
    g.rotation.y = -0.3 + Math.sin(t * 0.3) * 0.06;
  };
  return g;
}
// 6. Skaner sieci: radar
function sNet() {
  const g = new THREE.Group(), R = 3.4;
  const disc = new THREE.Mesh(new THREE.CircleGeometry(R, 96), new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, uniforms: { t: { value: 0 } },
    vertexShader: 'varying vec2 vP; void main(){ vP = position.xy; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }',
    fragmentShader: `uniform float t; varying vec2 vP;
      void main(){ float r = length(vP) / 3.4, a = atan(vP.y, vP.x);
        float rings = smoothstep(.02, 0., abs(fract(r * 5.) - .5) - .47) * .25;
        float sw = mod(a - t * 1.6, 6.2831853); float trail = exp(-sw * 2.2) * smoothstep(1., .9, r);
        float cross = (smoothstep(.012, 0., abs(vP.x) / 3.4) + smoothstep(.012, 0., abs(vP.y) / 3.4)) * .2;
        vec3 c = vec3(.3, .55, .7) * (rings + cross) + vec3(1., .3, .17) * trail * .9;
        gl_FragColor = vec4(c * smoothstep(1., .96, r), 1.); }`,
  }));
  disc.rotation.x = -Math.PI / 2;
  const rim = new THREE.Line(circle(R), lineMat('#5b6976', 1));
  const r = rng(61), n = 22, devs = [];
  const dm = new THREE.InstancedMesh(new THREE.BoxGeometry(0.12, 1, 0.12), new THREE.MeshBasicMaterial({ color: '#fff' }), n);
  for (let i = 0; i < n; i++) { const a = r() * Math.PI * 2, d = 0.6 + r() * (R - 0.9); devs.push({ a, d, h: 0.2 + r() * 1.3, hot: i === 5, lit: 0 }); }
  const spoof = glow(ACC, 1.4); g.add(disc, rim, dm, spoof);
  let spoofLit = 0;
  g.userData.labels = [{ o: spoof, v: () => spoofLit > 0.3, t: () => `ARP spoofing <em>${LANG === 'pl' ? 'wykryto' : 'detected'}</em>` }];
  const o = new THREE.Object3D(), col = new THREE.Color();
  g.userData.tick = (t, k, dt) => {
    const sweep = (t * 1.6) % (Math.PI * 2);
    devs.forEach((dv, i) => {
      let da = (sweep - ((dv.a % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)); da = ((da % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
      if (da < 0.15) dv.lit = 1; dv.lit = Math.max(0, dv.lit - dt * 0.5);
      const h = dv.h * (0.25 + dv.lit * 0.75);
      o.position.set(Math.cos(dv.a) * dv.d, h / 2, -Math.sin(dv.a) * dv.d); o.scale.set(1, h, 1); o.updateMatrix(); dm.setMatrixAt(i, o.matrix);
      dm.setColorAt(i, col.copy(dv.hot ? ACC : ACC2).multiplyScalar(0.3 + dv.lit * 1.4));
      if (dv.hot) { spoof.position.set(o.position.x, h + 0.2, o.position.z); spoof.material.opacity = dv.lit; spoofLit = dv.lit; }
    });
    dm.instanceMatrix.needsUpdate = dm.instanceColor.needsUpdate = true; disc.material.uniforms.t.value = t;
  };
  g.rotation.x = 0.42; g.position.y = -0.6;
  return g;
}
// 7. Menedżer haseł: sejf z pierścieniami
function sVault() {
  const g = new THREE.Group(), rings = [];
  const metal = new THREE.MeshStandardMaterial({ color: '#4d5864', metalness: 0.85, roughness: 0.32 });
  [2.6, 2.0, 1.45].forEach((rr, i) => {
    const t = new THREE.Mesh(new THREE.TorusGeometry(rr, 0.13, 12, 72), metal); g.add(t);
    const notch = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.34, 0.34), new THREE.MeshBasicMaterial({ color: i === 1 ? ACC : ACC2 })); notch.position.x = rr; t.add(notch);
    const ticks = []; for (let k = 0; k < 36; k++) { const a = k / 36 * Math.PI * 2, r1 = rr + 0.2, r2 = rr + (k % 3 ? 0.28 : 0.38); ticks.push(new THREE.Vector3(Math.cos(a) * r1, Math.sin(a) * r1, 0), new THREE.Vector3(Math.cos(a) * r2, Math.sin(a) * r2, 0)); }
    t.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(ticks), lineMat('#5b6976', 0.7)));
    rings.push(t);
  });
  const core = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.85, 0.3, 48), metal); core.rotation.x = Math.PI / 2;
  const kh = new THREE.Mesh(new THREE.CircleGeometry(0.16, 24), new THREE.MeshBasicMaterial({ color: ACC })); kh.position.set(0, 0.08, 0.16);
  const kh2 = new THREE.Mesh(new THREE.PlaneGeometry(0.12, 0.34), new THREE.MeshBasicMaterial({ color: ACC })); kh2.position.set(0, -0.14, 0.16);
  const label = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 0.55), new THREE.MeshBasicMaterial({ map: textTex([['AES-256 · MASTER KEY', 30, '#7fd6ff', 46]], 512, 70), transparent: true, depthWrite: false }));
  label.position.set(0, -3.45, 0);
  g.add(core, kh, kh2, glow(ACC, 1.6, 0.8), label);
  let open = false;
  g.userData.labels = [{ o: rings[0].children[0], t: () => `vault <em>${open ? 'UNLOCKED' : 'LOCKED'}</em> · AES` }];
  const n = 500, r = rng(71), bp = new Float32Array(n * 3), bs = new Float32Array(n); for (let i = 0; i < n; i++) bs[i] = r();
  const bg = new THREE.BufferGeometry(); bg.setAttribute('position', new THREE.BufferAttribute(bp, 3));
  const bits = new THREE.Points(bg, new THREE.PointsMaterial({ color: ACC2, size: 0.05, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false }));
  g.add(bits);
  g.userData.tick = (t) => {
    const p = t % 7.5; open = p > 3.7 && p < 6.4;
    rings.forEach((rg, i) => { const k = sstep(i * 1.2, i * 1.2 + 0.9, p) * (1 - sstep(6.4, 7.3, p)); rg.rotation.z = (i % 2 ? -1 : 1) * 2.2 * (1 - k) + Math.PI / 2 * k; });
    kh.material.color.copy(open ? WH : ACC); kh2.material.color.copy(open ? WH : ACC);
    for (let i = 0; i < n; i++) { const k = (bs[i] + t * 0.12) % 1, a = bs[i] * 60 + k * 6; const rr = 4 * (1 - k) + 0.3; bp.set([Math.cos(a) * rr, Math.sin(a) * rr, (bs[i] - 0.5) * 2 * (1 - k)], i * 3); }
    bg.attributes.position.needsUpdate = true;
    g.rotation.y = Math.sin(t * 0.4) * 0.35;
  };
  return g;
}
// 8. Analiza zdarzeń: lejek alertów → IOC
function sIoc() {
  const g = new THREE.Group();
  const cone = []; for (let k = 0; k < 16; k++) { const a = k / 16 * Math.PI * 2; cone.push(new THREE.Vector3(Math.cos(a) * 2.8, 2.2, Math.sin(a) * 2.8), new THREE.Vector3(Math.cos(a) * 0.35, -1.6, Math.sin(a) * 0.35)); }
  g.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(cone), lineMat('#3d4a57', 0.8)));
  [2.2, 0.3, -1.6].forEach((y, i) => { const l = new THREE.Line(circle([2.8, 1.6, 0.35][i]), lineMat(i === 2 ? ACC : '#5b6976', 0.9)); l.position.y = y; g.add(l); });
  const n = 1400, r = rng(81), seed = new Float32Array(n); for (let i = 0; i < n; i++) seed[i] = r();
  const pg = new THREE.BufferGeometry(); pg.setAttribute('position', new THREE.BufferAttribute(new Float32Array(n * 3), 3)); pg.setAttribute('seed', new THREE.BufferAttribute(seed, 1));
  const pm = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, uniforms: { t: { value: 0 }, pr: { value: 1 } },
    vertexShader: `attribute float seed; uniform float t, pr; varying float vH, vA;
      void main(){ float k = fract(seed * 7.3 + t * (.08 + seed * .06)); float y = mix(3.4, -1.7, k);
        float rad = y > 2.2 ? 2.8 + (y - 2.2) * .4 : mix(.35, 2.8, (y + 1.6) / 3.8);
        float a = seed * 80. + k * (6. + seed * 4.);
        float ioc = step(.965, seed);
        vec3 p = vec3(cos(a) * rad * (.6 + .4 * fract(seed * 13.)), y, sin(a) * rad * (.6 + .4 * fract(seed * 13.)));
        if (k > .97 && ioc > .5) p = vec3(cos(seed * 50.) * .3, -2.1 - fract(seed * 31.) * .5, sin(seed * 50.) * .3);
        vec4 mv = modelViewMatrix * vec4(p, 1.); gl_Position = projectionMatrix * mv;
        gl_PointSize = (1.5 + ioc * 3.) * pr * (10. / -mv.z); vH = ioc; vA = (1. - k * (1. - ioc)) ; }`,
    fragmentShader: 'varying float vH, vA; void main(){ float d = length(gl_PointCoord - .5); if (d > .5) discard; vec3 c = mix(vec3(.45, .6, .72), vec3(1.8, .45, .25), vH); gl_FragColor = vec4(c * vA * (1. - d * 2.), 1.); }',
  });
  const pts = new THREE.Points(pg, pm); pts.frustumCulled = false;
  const ioc = glow(ACC, 2, 0.9); ioc.position.y = -2.2;
  const label = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 0.4), new THREE.MeshBasicMaterial({ map: textTex([['IOC CONFIRMED', 34, '#ff4b2b', 48, 'IBM Plex Mono, monospace', 600]], 512, 70), transparent: true, depthWrite: false }));
  label.position.set(1.4, -2.3, 0);
  g.add(pts, ioc, label);
  g.userData.labels = [{ o: ioc, t: () => `alerts → <em>IOC</em>` }];
  g.userData.tick = (t) => { pm.uniforms.t.value = t; g.rotation.y = t * 0.1; label.rotation.y = -t * 0.1; ioc.material.opacity = 0.7 + Math.sin(t * 4) * 0.2; };
  return g;
}
// 9. Certyfikaty: pierścień kart
function sCerts() {
  const g = new THREE.Group(), R = 5.2, cards = [];
  CERTS.forEach((c, i) => {
    const words = c.name.split(' '), lines = []; let cur = '';
    words.forEach(w => { if ((cur + ' ' + w).length > 26) { lines.push(cur.trim()); cur = w; } else cur += ' ' + w; }); lines.push(cur.trim());
    const tex = textTex([[c.y, 30, '#ff4b2b', 58, 'IBM Plex Mono, monospace', 600], ...lines.slice(0, 3).map((l, k) => [l, 40, '#e9edf1', 150 + k * 50, 'Unbounded, Arial Black, sans-serif', 600]), [c.by.toUpperCase(), 24, '#8a949e', 330]], 768, 380, '#0c1117');
    const m = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 1.29), new THREE.MeshBasicMaterial({ map: tex, transparent: true }));
    const fr = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.PlaneGeometry(2.6, 1.29)), lineMat('#3d4a57', 1));
    const card = new THREE.Group(); card.add(m, fr);
    const a = i / CERTS.length * Math.PI * 2; card.position.set(Math.sin(a) * R, 0, Math.cos(a) * R); card.rotation.y = a;
    g.add(card); cards.push({ card, fr, m });
  });
  const ring = new THREE.Line(circle(R + 0.1), lineMat('#2a333c', 1)); ring.position.y = -0.85; g.add(ring);
  g.userData = { rot: 0, idx: 0, fade: 1, tick(t) {
    g.rotation.y += (-g.userData.rot - g.rotation.y) * 0.08;
    const fa = g.userData.fade ?? 1; g.visible = fa > 0.01;
    cards.forEach(({ card, fr, m }, i) => { m.material.opacity = fa; fr.material.opacity = fa; const on = i === g.userData.idx; fr.material.color.lerp(on ? ACC : DIM, 0.1); card.position.y += ((on ? 0.25 : 0) + Math.sin(t + i) * 0.04 - card.position.y) * 0.1; });
  } };
  return g;
}
// 10. Kontakt: cząsteczki zmieniające kształt
const PN = 9000;
function shapePts(kind) {
  const r = rng(200 + kind), a = new Float32Array(PN * 3), v = new THREE.Vector3();
  const fromCanvas = (draw, sc) => { const c = document.createElement('canvas'); c.width = 360; c.height = 360; const x = c.getContext('2d'); x.fillStyle = '#fff'; x.strokeStyle = '#fff'; draw(x); const d = x.getImageData(0, 0, 360, 360).data, pts = []; for (let yy = 0; yy < 360; yy += 2) for (let xx = 0; xx < 360; xx += 2) if (d[(yy * 360 + xx) * 4] > 128) pts.push([xx, yy]); for (let i = 0; i < PN; i++) { const p = pts[Math.floor(r() * pts.length)] || [180, 180]; a.set([(p[0] - 180) / sc, -(p[1] - 180) / sc, (r() - 0.5) * 0.5], i * 3); } };
  if (kind === 0) { for (let i = 0; i < PN; i++) { const y = 1 - (i / (PN - 1)) * 2, rr = Math.sqrt(1 - y * y), th = i * 2.399963; v.set(Math.cos(th) * rr, y, Math.sin(th) * rr).multiplyScalar(2.6); a.set([v.x, v.y, v.z], i * 3); } }
  else if (kind === 1) fromCanvas(x => { x.lineWidth = 20; x.beginPath(); x.moveTo(180, 30); x.lineTo(300, 80); x.lineTo(300, 180); x.quadraticCurveTo(290, 290, 180, 335); x.quadraticCurveTo(70, 290, 60, 180); x.lineTo(60, 80); x.closePath(); x.stroke(); x.fillRect(150, 130, 60, 110); }, 55);
  else if (kind === 2) fromCanvas(x => { x.lineWidth = 26; x.beginPath(); x.arc(180, 140, 70, Math.PI, 0); x.stroke(); x.fillRect(90, 150, 180, 160); x.clearRect(168, 200, 24, 70); }, 55);
  else fromCanvas(x => { x.font = '800 170px Unbounded, Arial Black, sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('OC', 180, 190); }, 50);
  return a;
}
function sContact() {
  const shapes = [0, 1, 2, 3].map(shapePts), seed = new Float32Array(PN), r = rng(5);
  for (let i = 0; i < PN; i++) seed[i] = r();
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(shapes[1].slice(), 3));
  g.setAttribute('a', new THREE.BufferAttribute(shapes[1].slice(), 3)); g.setAttribute('b', new THREE.BufferAttribute(shapes[1].slice(), 3));
  g.setAttribute('seed', new THREE.BufferAttribute(seed, 1));
  const m = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: { u: { value: 1 }, t: { value: 0 }, pr: { value: 1 }, mouse: { value: new THREE.Vector3(99, 99, 99) } },
    vertexShader: `attribute vec3 a, b; attribute float seed; uniform float u, t, pr; uniform vec3 mouse; varying float vS;
      void main(){ float e = u < .5 ? 4.*u*u*u : 1. - pow(-2.*u + 2., 3.) / 2.; float k = clamp(e * 1.3 - seed * .3, 0., 1.);
        vec3 p = mix(a, b, k) + vec3(sin(seed * 91. + t), cos(seed * 47. + t * .8), sin(seed * 13. + t * .6)) * (.02 + sin(k * 3.14159) * (.7 + seed));
        vec4 w = modelMatrix * vec4(p, 1.); vec3 dv = w.xyz - mouse; w.xyz += normalize(dv + 1e-4) * smoothstep(1.4, 0., length(dv)) * .9;
        vec4 mv = viewMatrix * w; gl_Position = projectionMatrix * mv; gl_PointSize = (1.3 + seed * 1.8) * pr * (12. / -mv.z); vS = seed; }`,
    fragmentShader: 'varying float vS; void main(){ float d = length(gl_PointCoord - .5); if (d > .5) discard; vec3 c = vS > .9 ? vec3(1.8, .45, .25) : vec3(.6, .72, .85); gl_FragColor = vec4(c * (1. - d * 2.) * .9, 1.); }',
  });
  const p = new THREE.Points(g, m); p.frustumCulled = false;
  const grp = new THREE.Group(); grp.add(p, glow(ACC, 4, 0.18));
  let cur = 1;
  grp.userData = { mat: m, morph(k) {
    if (k === cur) return; cur = k;
    const A = g.attributes.a.array, B = g.attributes.b.array, u = m.uniforms.u.value, e = u < .5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2;
    for (let i = 0; i < PN; i++) { const kk = clamp01(e * 1.3 - seed[i] * .3); for (let j = 0; j < 3; j++) A[i * 3 + j] += (B[i * 3 + j] - A[i * 3 + j]) * kk; }
    B.set(shapes[k]); g.attributes.a.needsUpdate = g.attributes.b.needsUpdate = true;
    gsap.fromTo(m.uniforms.u, { value: 0 }, { value: 1, duration: 1.6, ease: 'none', overwrite: true });
  }, tick(t) { grp.scale.setScalar(0.55 + 0.45 * (grp.userData.arrive ?? 1)); m.uniforms.t.value = t; p.rotation.y = Math.sin(t * 0.3) * 0.5 + mouse.sx * 0.4; } };
  return grp;
}

// ---------------------------------------------------------------- stacje i kamera
const ST = [
  { p: [0, 0, 0], D: 13, b: sHero },
  { p: [7, 0, -40], D: 13, b: sSiem },
  { p: [-6, 0, -80], D: 15, b: sExp },
  { p: [0, 0, -124], D: 8.5, b: sCerts, f: [0, 0, 5.2] }, // certyfikaty PRZED projektami (użytkownik 22.11)
  { p: [6, 0, -170], D: 11, b: sC2 },
  { p: [-6, 0, -206], D: 11, b: sArb },
  { p: [6, 0, -242], D: 11.5, b: sWeb, f: [1.2, 0, -1.6] },
  { p: [-6, 0, -278], D: 11, b: sNet },
  { p: [6, 0, -314], D: 11, b: sVault },
  { p: [-6, 0, -350], D: 11.5, b: sIoc },
  { p: [0, 0, -392], D: 11, b: sContact },
];
const W = [];
const K = ST.map(s => {
  const P = new THREE.Vector3(...s.p), F = P.clone().add(new THREE.Vector3(...(s.f || [0, 0, 0])));
  return { P, F, D: s.D };
});
function camFor(i, out, tgt) {
  const k = K[i];
  if (isMobile()) { tgt.copy(k.F); tgt.y -= 3.4; out.copy(k.F); out.y += 0.4; out.z += k.D * 1.6; }
  else { tgt.copy(k.F); tgt.x -= 3.6; out.copy(k.F); out.x -= 3.6; out.y += 0.9; out.z += k.D; }
}

// ---------------------------------------------------------------- panele (HTML z danych)
const panelsEl = document.getElementById('panels');
const NAVMAP = [0, 1, 2, 3, 4, 10]; // Home, Profile, Experience, Certs, Work, Contact
function card(i, inner) { return `<section class="pan card" data-i="${i}">${inner}</section>`; }
function renderPanels() {
  const u = UI[LANG];
  document.documentElement.lang = LANG;
  document.getElementById('lang').innerHTML = LANG === 'pl' ? '<b>PL</b> / EN' : 'PL / <b>EN</b>';
  document.getElementById('nav').innerHTML = u.nav.map((n, k) => `<a data-go="${NAVMAP[k]}">${n}</a>`).join('');
  document.getElementById('snd-t').innerHTML = `${u.sound}: <em>${snd.on ? u.on : u.off}</em>`;
  const chrono = [...EXP].reverse();
  let h = `<section class="pan p-hero" data-i="0">
    <p class="mono k">${u.kick}</p>
    <p class="hello">${u.hello}</p>
    <h1 class="h"><span class="ln"><span>OSKAR</span></span><span class="ln"><span>CHUDOBA</span></span></h1>
    <p class="role" id="role"></p>
    <p class="lead">${u.lead}</p>
    <div class="row"><a class="btn pri" data-go="4">${u.view} →</a><a class="btn" data-go="10">${u.contact}</a><a class="btn" href="${LINKS.github}" target="_blank" rel="noopener">GitHub ↗</a></div>
    <p class="mono hint">${u.scroll}<i></i></p></section>`;
  h += card(1, `<p class="mono k">01 <em>/ ${u.nav[1]}</em></p><h2 class="h scr" data-t="${u.story}">${u.story}</h2><p class="d">${u.storyT}</p>
    <div class="stats">${u.stats.map(([n, l]) => `<div><b data-n="${n}">${n}</b><span class="mono">${l}</span></div>`).join('')}</div>
    <div class="chips">${SKILLS[LANG].map(s => `<span>${s}</span>`).join('')}</div>`);
  h += card(2, `<p class="mono k">02 <em>/ ${u.exp}</em></p><h2 class="h scr" data-t="${u.exp}">${u.exp}</h2><ul class="exp">${chrono.map((e, k) => `<li data-k="${k}" class="${e.target ? 'tg' : ''}"><div class="t">${e.logo ? `<img src="./media/${e.logo}" alt="">` : ''}<div><b>${tr(e.role)}</b><small>${tr(e.org)}</small></div></div><ul><div>${e.pts[LANG].map(p => `<p>${p}</p>`).join('')}</div></ul></li>`).join('')}</ul>`);
  PROJECTS.forEach((p, k) => {
    h += card(4 + k, `<p class="mono k">${u.proj} 0${k + 1} <em>/ 06</em></p><h2 class="h scr" data-t="${tr(p.title)}">${tr(p.title)}</h2><p class="d">${tr(p.desc)}</p>
      <div class="tags">${p.tech.map(t => `<span>${t}</span>`).join('')}</div>
      <div class="row"><a class="btn pri" href="${p.code}" target="_blank" rel="noopener">${u.code} ↗</a>${k === 5 ? `<a class="btn" href="${LINKS.github}" target="_blank" rel="noopener">${u.more} ↗</a>` : ''}</div>`);
  });
  h += card(3, `<p class="mono k">03 <em>/ ${u.nav[3]}</em></p><h2 class="h scr" data-t="${u.certs}">${u.certs}</h2><ul class="certs">${CERTS.map((c, k) => `<li data-k="${k}"><span>${c.y}</span>${c.link ? `<a href="${c.link}" target="_blank" rel="noopener"><b>${c.name} ↗</b></a>` : `<b>${c.name}</b>`}<small>${c.by}</small></li>`).join('')}</ul>`);
  h += `<section class="pan p-contact" data-i="10"><div><p class="mono k">10 <em>/ ${u.nav[5]}</em></p><h2 class="h">${u.lets} <em>${u.talk}</em></h2><p>${u.contactT}</p>
    <div class="row shapes"><a class="btn" data-shape="0" href="${LINKS.github}" target="_blank" rel="noopener">GitHub ↗</a><a class="btn" data-shape="1" href="${LINKS.linkedin}" target="_blank" rel="noopener">LinkedIn ↗</a><a class="btn" data-shape="2" href="${LINKS.thm}" target="_blank" rel="noopener">TryHackMe ↗</a></div></div>
    <button class="mail" id="mail" data-shape="3"><span class="mono">E-MAIL</span>${LINKS.mail}<i class="mono">${u.copied}</i></button></section>`;
  panelsEl.innerHTML = h;
  panelsEl.querySelectorAll('[data-shape]').forEach(el => el.addEventListener('mouseenter', () => W[10]?.userData.morph(+el.dataset.shape)));
  panelsEl.querySelector('#mail').addEventListener('click', e => { navigator.clipboard?.writeText(LINKS.mail).catch(() => {}); const b = e.currentTarget; b.classList.add('ok'); clearTimeout(b._h); b._h = setTimeout(() => b.classList.remove('ok'), 1600); });
  bindGo();
  const was = active; active = -2; if (was > -2) showPanel(was, true);
  roleIdx = 0;
}
function bindGo() { document.querySelectorAll('[data-go]').forEach(a => { a.onclick = e => { e.preventDefault(); goTo(+a.dataset.go); }; }); }
function goTo(i) { const s = sections[i]; lenis.scrollTo(s.offsetTop + (i === 0 ? 0 : s.offsetHeight * 0.42), { duration: 2.2, easing: t => 1 - Math.pow(1 - t, 4) }); }

const GLY = '!<>-_\\/[]{}=+*^?#01ABCDEFX';
function scramble(el) {
  const fin = el.dataset.t; let fr = 0; cancelAnimationFrame(el._r);
  const step = () => { const rev = Math.floor(fr / 1.2); el.textContent = [...fin].map((c, i) => (i < rev || c === ' ' ? c : GLY[(Math.random() * GLY.length) | 0])).join(''); if (rev < fin.length) { fr++; el._r = requestAnimationFrame(step); } };
  step();
}
let active = -2, roleIdx = 0;
function showPanel(i, instant) {
  if (i === active) return; const prev = active; active = i;
  document.querySelectorAll('.pan').forEach(p => {
    const k = +p.dataset.i, on = k === i;
    p.classList.toggle('on', on);
    const v = p.querySelector('video');
    if (!on) { if (v) v.pause(); if (k === prev) gsap.to(p, { autoAlpha: 0, y: -16, duration: instant ? 0 : 0.35, ease: 'power2.in', overwrite: true }); else gsap.set(p, { autoAlpha: 0 }); }
  });
  document.getElementById('sec-n').textContent = i >= 0 ? String(i).padStart(2, '0') : '··';
  document.querySelectorAll('#nav a').forEach(a => { const g = +a.dataset.go, nx = NAVMAP[NAVMAP.indexOf(g) + 1] ?? 99; a.classList.toggle('on', i >= g && i < nx); });
  const p = document.querySelector(`.pan[data-i="${i}"]`); if (!p) return;
  const isCard = p.classList.contains('card');
  gsap.fromTo(p, { autoAlpha: 0, y: isCard ? 24 : 0 }, { autoAlpha: 1, y: 0, duration: instant ? 0 : 0.8, delay: instant ? 0 : 0.1, ease: 'expo.out', overwrite: true, clearProps: isCard ? '' : 'transform' });
  const parts = p.querySelectorAll('.k, .hello, .role, .lead, .d, .stats > div, .chips span, .tags span, .vid, .row > *, .exp > li, .certs li, .mail, p:not(.k)');
  gsap.fromTo(parts, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: instant ? 0 : 0.7, stagger: instant ? 0 : 0.025, delay: instant ? 0 : 0.2, ease: 'power3.out', overwrite: true });
  p.querySelectorAll('.scr').forEach(scramble);
  p.querySelectorAll('[data-n]').forEach(b => { const o = { v: 0 }; gsap.to(o, { v: +b.dataset.n, duration: instant ? 0 : 1.4, delay: 0.3, ease: 'power3.out', onUpdate: () => (b.textContent = Math.round(o.v)) }); });
  if (i === 0) gsap.fromTo('.p-hero .ln > span', { yPercent: 110 }, { yPercent: 0, duration: instant ? 0 : 1.1, stagger: 0.08, ease: 'expo.out' });
  const v = p.querySelector('video'); if (v) { if (!v.src) v.src = v.dataset.src; v.play().catch(() => {}); }
  sfx.blip();
}
setInterval(() => { const el = document.getElementById('role'); if (!el) return; const rl = UI[LANG].roles[roleIdx++ % UI[LANG].roles.length]; el.dataset.t = rl; scramble(el); }, 2600);

// ---------------------------------------------------------------- dźwięk (WebAudio, bez plików)
// Domyślnie WŁĄCZONY: tylko ciche „klik” co kawałek przewinięcia (bez muzyki i szumu). Wyłącznik w lewym dolnym rogu, wybór zapamiętany.
// Przeglądarka pozwala na dźwięk dopiero po pierwszym kliknięciu/klawiszu/dotyku, więc kontekst startuje przy pierwszej interakcji.
const snd = { on: true };
try { if (localStorage.getItem('oc_snd') === '0') snd.on = false; } catch (e) { /* brak */ }
const sfx = (() => {
  let ctx, out, buf, acc = 0, lastT = 0;
  function init() {
    if (ctx) return; ctx = new (window.AudioContext || window.webkitAudioContext)();
    out = ctx.createGain(); out.gain.value = 0.5; out.connect(ctx.destination);
    buf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.012), ctx.sampleRate);
    const d = buf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 6);
  }
  function click(vol = 0.22, f = 3200) {
    if (!snd.on || !ctx || ctx.state !== 'running') return;
    const s = ctx.createBufferSource(), bp = ctx.createBiquadFilter(), g = ctx.createGain();
    s.buffer = buf; bp.type = 'bandpass'; bp.frequency.value = f; bp.Q.value = 1.4; g.gain.value = vol;
    s.connect(bp).connect(g).connect(out); s.start();
  }
  const unlock = () => { init(); ctx.resume(); };
  ['pointerdown', 'keydown', 'touchstart'].forEach(ev => addEventListener(ev, unlock, { passive: true }));
  return {
    set(on) { snd.on = on; if (on) unlock(); try { localStorage.setItem('oc_snd', on ? '1' : '0'); } catch (e) { /* brak */ } },
    scroll(dy, now) { acc += Math.abs(dy); if (acc >= 110 && now - lastT > 55) { acc = 0; lastT = now; click(0.18 + Math.random() * 0.05, 2900 + Math.random() * 600); } },
    blip() { click(0.3, 1800); },
  };
})();
document.getElementById('snd').setAttribute('aria-pressed', snd.on);
document.getElementById('snd').addEventListener('click', e => { const on = !snd.on; sfx.set(on); e.currentTarget.setAttribute('aria-pressed', on); document.getElementById('snd-t').innerHTML = `${UI[LANG].sound}: <em>${on ? UI[LANG].on : UI[LANG].off}</em>`; });
document.getElementById('lang').addEventListener('click', () => { LANG = LANG === 'pl' ? 'en' : 'pl'; try { localStorage.setItem('oc_lang2', LANG); } catch (e) { /* brak */ } renderPanels(); });

// ---------------------------------------------------------------- scroll
const HV = [100, 120, 200, 180, 120, 120, 120, 120, 120, 120, 200];
const scrollEl = document.getElementById('scroll');
scrollEl.innerHTML = HV.map((h, i) => `<div class="sec" id="s${i}" style="height:${h}vh"></div>`).join('');
const sections = [...scrollEl.children];
let SP = { sec: 0, f: 0 };
let SEC = [];
function secTop() { SEC = sections.map(s => [s.offsetTop, s.offsetHeight]); }
function scrollState(y) {
  for (let i = SEC.length - 1; i >= 0; i--) { const [top, hh] = SEC[i]; if (y >= top - 1) return { sec: i, f: clamp01((y - top) / Math.max(1, hh - (i === SEC.length - 1 ? innerHeight : 0))) }; }
  return { sec: 0, f: 0 };
}
function stationFloat() { const { sec, f } = SP; if (sec === 0) return 0; const k = clamp01(f / 0.4); return sec - 1 + k * k * (3 - 2 * k); }
function panelFor(sf) { const r = Math.round(sf); return Math.abs(sf - r) < 0.1 ? r : -1; }

// ---------------------------------------------------------------- etykiety techniczne na żywo (wzór: „Fig. 1 — rendered live”)
// Kropka na obiekcie 3D + linia + opis z wartością liczoną w tej klatce. Podpis „FIG. NN” z prawdziwym FPS.
const lblEls = [0, 1].map(() => { const d = document.createElement('div'); d.className = 'lbl mono'; d.innerHTML = '<i></i><b></b><span></span>'; document.body.appendChild(d); return d; });
const pv = new THREE.Vector3(); let lblFr = 0;
function updLabels(p, show) {
  lblFr++;
  const L = show && p >= 0 && W[p]?.userData.labels || [];
  lblEls.forEach((el, k) => {
    const l = L[k];
    if (!l || isMobile() || (l.v && !l.v())) { el.classList.remove('on'); return; }
    l.o.getWorldPosition(pv); pv.project(camera);
    const x = (pv.x * 0.5 + 0.5) * innerWidth, y = (-pv.y * 0.5 + 0.5) * innerHeight;
    const vis = pv.z < 1 && x > 40 && x < innerWidth - 60 && y > 60 && y < innerHeight - 60;
    el.classList.toggle('on', vis);
    if (!vis) return;
    const left = l.side === 'l' || x > innerWidth - 330; el.classList.toggle('l', left);
    el.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0)`;
    if ((lblFr + k) % 6 === 0 || el._p !== p) { el._p = p; const h = l.t(); if (h !== el._h) { el._h = h; el.lastChild.innerHTML = h; } }
  });
}

// ---------------------------------------------------------------- pętla
const mouse = { x: 0, y: 0, sx: 0, sy: 0 };
addEventListener('pointermove', e => { mouse.x = e.clientX / innerWidth * 2 - 1; mouse.y = e.clientY / innerHeight * 2 - 1; });
const cP = new THREE.Vector3(), cT = new THREE.Vector3(), bP = new THREE.Vector3(), bT = new THREE.Vector3(), ray = new THREE.Raycaster(), ndc = new THREE.Vector2(), hit = new THREE.Vector3();
const PL = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
const intro = { cam: NO_INTRO ? 1 : 0 };
let lastYs = 0, last = performance.now(), T = 0, vel = 0, lastY = 0, fpsAcc = 0, fpsN = 0, fpsShow = 60, sinceAdj = 0, running = true, maxScroll = 1;
const prog = document.getElementById('prog');
let grid, dust, streams;
function setPR() { [dust, ...W].forEach(o => o && o.traverse(c => { if (c.material?.uniforms?.pr) c.material.uniforms.pr.value = dpr; })); }

// Rozdzielczość tylko W DÓŁ, maks. 2 kroki, po 3 s słabego FPS. Zmiana rozmiaru = nowy bufor MSAA = przycięcie,
// a v1/v2 zmieniały ją w górę i w dół co 1,5 s, więc same robiły lagi mimo wysokiego FPS.
let lowFor = 0, dprSteps = 0;
function adaptDpr(dt) {
  fpsAcc += dt; fpsN++;
  if (fpsAcc >= 1) {
    fpsShow = Math.round(fpsN / fpsAcc); fpsAcc = 0; fpsN = 0;
    lowFor = fpsShow < 45 ? lowFor + 1 : 0;
    if (lowFor >= 3 && dprSteps < 2 && dpr > 0.8) { dpr = Math.max(0.8, dpr - 0.2); dprSteps++; lowFor = 0; setSize(); setPR(); }
  }
}

function frame(now) {
  if (!running) return;
  const dt = Math.min(0.05, (now - last) / 1000); last = now; T += dt;
  adaptDpr(dt);
  mouse.sx += (mouse.x - mouse.sx) * 0.06; mouse.sy += (mouse.y - mouse.sy) * 0.06;
  const y = lenis.scroll; vel += (Math.abs(y - lastY) / Math.max(dt, 1e-3) / 60 - vel) * 0.12; lastY = y;
  SP = scrollState(y);
  const sf = stationFloat();
  if (intro.cam > 0.7) showPanel(panelFor(sf));

  // kamera: przelot z odjazdem i przechyłem
  const i = Math.min(Math.floor(sf), K.length - 1), e = sf - i, j = Math.min(i + 1, K.length - 1);
  camFor(i, cP, cT); camFor(j, bP, bT);
  // przelot certs -> kontakt: wzrok od razu na tarczę (cel szybciej), bez cofania kamery, lekko nad kartami
  const toC = i === 9 || i === 3; // wylot z pierścienia certyfikatów i dolot do kontaktu
  cP.lerp(bP, e); cT.lerp(bT, toC ? sstep(0, 0.55, e) : e);
  const arc = Math.sin(e * Math.PI); cP.z += arc * (toC ? 0 : 7); cP.y += arc * (toC ? 2.6 : 2.2);
  cP.x += mouse.sx * 0.5 + Math.sin(T * 0.23) * 0.15; cP.y -= mouse.sy * 0.3 + Math.sin(T * 0.19) * 0.1;
  if (intro.cam < 1) { const k = gsap.parseEase('power3.inOut')(intro.cam); bP.set(cP.x + 2, cP.y + 1, cP.z + 26); cP.lerpVectors(bP, cP, k); }
  if (Q.has('cam')) { cP.fromArray(Q.get('cam').split(',').map(Number)); cT.fromArray((Q.get('tgt') || '0,0,0').split(',').map(Number)); }
  camera.position.copy(cP); camera.lookAt(cT); camera.rotateZ(-mouse.sx * 0.01 + arc * 0.05 * (i % 2 ? 1 : -1));

  // sceny: tylko w pobliżu kamery
  W.forEach((g, k) => {
    const d = cP.z - K[k].P.z, vis = d > -22 && d < 72; g.visible = vis; // przed kamerą widać daleko (bez wyskakiwania sceny w locie), za kamerą tylko blisko
    if (!vis) return;
    const pres = sstep(k - 0.8, k - 0.05, sf) * (1 - sstep(k + 0.6, k + 1.2, sf));
    g.userData.tick(T, pres, dt);
  });
  W[3].userData.fade = sstep(2.08, 2.6, sf) * (1 - sstep(3.02, 3.45, sf)); W[10].userData.arrive = sstep(9.15, 10, sf);
  // stany zależne od postępu w sekcji
  if (SP.sec === 2) { const st = Math.min(3, Math.max(0, Math.floor((SP.f - 0.4) / 0.6 * 4))); W[2].userData.step = st; document.querySelectorAll('.exp > li').forEach(li => li.classList.toggle('on', +li.dataset.k === st)); }
  else if (sf < 2) W[2].userData.step = 0;
  if (SP.sec === 3) { const c = clamp01((SP.f - 0.35) / 0.6) * (CERTS.length - 1); W[3].userData.rot = c / CERTS.length * Math.PI * 2; const idx = Math.round(c); W[3].userData.idx = idx; document.querySelectorAll('.certs li').forEach(li => li.classList.toggle('on', +li.dataset.k === idx)); }
  // mysz nad cząsteczkami kontaktu
  if (W[10].visible) { ndc.set(mouse.x, -mouse.y); ray.setFromCamera(ndc, camera); PL.constant = -K[10].P.z; const pl = PL; if (ray.ray.intersectPlane(pl, hit)) W[10].userData.mat.uniforms.mouse.value.copy(hit); }

  updLabels(panelFor(sf), intro.cam > 0.95 && !Q.has('clean'));
  grid.material.uniforms.t.value = T; grid.material.uniforms.cam.value.copy(cP);
  dust.material.uniforms.t.value = T; dust.material.uniforms.cam.value.copy(cP);
  streams.material.uniforms.t.value = T;

  post.material.uniforms.ca.value = 0.004 + Math.min(vel, 90) * 0.00045;
  post.material.uniforms.t.value = T;
  prog.style.transform = `scaleX(${clamp01(y / maxScroll)})`;
  sfx.scroll(y - lastYs, now); lastYs = y;

  renderer.setRenderTarget(rt); renderer.render(scene, camera);
  renderer.setRenderTarget(null); renderer.render(postScene, postCam);
  requestAnimationFrame(frame);
}
document.addEventListener('visibilitychange', () => { running = !document.hidden; if (running) { last = performance.now(); requestAnimationFrame(frame); } });
addEventListener('resize', () => { setSize(); secTop(); maxScroll = document.documentElement.scrollHeight - innerHeight; });

// ---------------------------------------------------------------- start
const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, wheelMultiplier: 1.15 });
gsap.ticker.add(t => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);
lenis.stop(); window.scrollTo(0, 0);
renderPanels();

const LOG = ['[ <em>OK</em> ] siem.collector … elastic / splunk / wazuh', '[ <em>OK</em> ] edr.sensor … windows defender', '[ <em>OK</em> ] rules.correlation … tuned', '[ <b>!!</b> ] alert.queue … triage', '[ <em>OK</em> ] analyst.profile … oskar.chudoba', '[ <em>OK</em> ] render.pipeline … webgl2'];
const logEl = document.getElementById('ld-log'), pct = document.getElementById('ld-pct'), bar = document.getElementById('ld-bar');
const ld = { v: 0 };
const ldUp = () => { pct.textContent = String(Math.round(ld.v)).padStart(3, '0'); bar.style.width = ld.v + '%'; logEl.innerHTML = LOG.slice(0, Math.ceil(ld.v / 100 * LOG.length)).join('\n'); };
gsap.to(ld, { v: 60, duration: NO_INTRO ? 0 : 0.7, ease: 'power2.out', onUpdate: ldUp });
setTimeout(() => {
  grid = buildGrid(); dust = buildDust(); streams = buildStreams(); scene.add(grid, dust, streams);
  ST.forEach((s, k) => { const g = s.b(); g.position.copy(K[k].P); scene.add(g); W.push(g); });
  setPR();
  renderer.compile(scene, camera);
  scene.traverse(o => { const m = o.material; if (m && m.map) renderer.initTexture(m.map); }); // tekstury wgrane od razu, nie przy pierwszym pokazaniu sceny
  secTop();
  maxScroll = document.documentElement.scrollHeight - innerHeight;
  const go = () => {
    requestAnimationFrame(frame);
    if (NO_INTRO) {
      document.getElementById('loader').remove(); document.body.classList.remove('loading');
      if (AT !== null) { const k = Math.floor(AT), s = sections[Math.min(k, sections.length - 1)]; lenis.scrollTo(s.offsetTop + (AT - k) * s.offsetHeight, { immediate: true, force: true }); }
      lenis.start(); setTimeout(() => { window.__ready = true; }, 500); return;
    }
    gsap.timeline({ onComplete: () => { lenis.start(); window.__ready = true; } })
      .to(ld, { v: 100, duration: 0.6, ease: 'power2.inOut', onUpdate: ldUp })
      .to('#loader', { clipPath: 'inset(0 0 100% 0)', duration: 1, ease: 'expo.inOut', onComplete: () => { document.getElementById('loader').remove(); document.body.classList.remove('loading'); } }, '+=0.15')
      .fromTo(post.material.uniforms.flash, { value: 0.6 }, { value: 0, duration: 0.9 }, '<0.4')
      .to(W[0].userData.u, { value: 1, duration: 2.8, ease: 'expo.out' }, '<')
      .to(intro, { cam: 1, duration: 2.6, ease: 'none' }, '<');
  };
  gsap.to(ld, { v: 85, duration: NO_INTRO ? 0 : 0.3, onUpdate: ldUp, onComplete: go });
}, 40);
