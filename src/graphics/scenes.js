import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

const PALETTES = {
  system: ["#d8a16e", "#a0ba83"],
  core: ["#aa91ff", "#65e5f6"],
  nexus: ["#a293ff", "#676bff"],
  vendor: ["#7ce9cf", "#27aab5"],
  finance: ["#f2c58c", "#d881be"],
  aqua: ["#71cfff", "#486aff"],
};

function metal(color = "#a4a9c4") {
  return new THREE.MeshPhysicalMaterial({ color, metalness: 0.94, roughness: 0.2,
    clearcoat: 1, clearcoatRoughness: 0.15, iridescence: 0.65,
    iridescenceIOR: 1.4, iridescenceThicknessMinimum: 100, iridescenceThicknessMaximum: 420 });
}

function glow(color, opacity = 1) {
  return new THREE.MeshBasicMaterial({ color, transparent: opacity < 1, opacity });
}

function mesh(parent, geometry, material, position = [0, 0, 0]) {
  const item = new THREE.Mesh(geometry, material);
  item.position.set(...position);
  parent.add(item);
  return item;
}

function ring(parent, radius, width, material, rotation = [0, 0, 0]) {
  const item = mesh(parent, new THREE.TorusGeometry(radius, width, 12, 144), material);
  item.rotation.set(...rotation);
  return item;
}

function plasma(colorA, colorB) {
  return new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uColorA: { value: new THREE.Color(colorA) }, uColorB: { value: new THREE.Color(colorB) } },
    vertexShader: `varying vec3 vNormal; varying vec3 vPosition; varying vec3 vView;
      void main() { vNormal = normalize(normalMatrix * normal); vPosition = position;
        vec4 p = modelViewMatrix * vec4(position, 1.); vView = -p.xyz;
        gl_Position = projectionMatrix * p; }`,
    fragmentShader: `uniform float uTime; uniform vec3 uColorA; uniform vec3 uColorB;
      varying vec3 vNormal; varying vec3 vPosition; varying vec3 vView;
      void main() {
        vec3 p = vPosition;
        float wave = sin(p.y * 8. + sin(p.x * 6. + uTime * .4) * 1.8 + p.z * 5. - uTime * .55);
        float finer = sin(p.y * 26. + sin(p.z * 12. + uTime * .2) * 3. + p.x * 17.);
        float fresnel = pow(1. - max(dot(normalize(vNormal), normalize(vView)), 0.), 2.7);
        vec3 color = mix(uColorA, uColorB, smoothstep(-.8, .9, wave));
        color *= .31 + .32 * max(dot(normalize(vNormal), normalize(vec3(-1., 1., 2.))), 0.);
        color += color * pow(max(finer, 0.), 18.) * .5;
        color += mix(uColorB, vec3(.9,.87,1.), .4) * fresnel * 1.5;
        float spec = pow(max(dot(reflect(-normalize(vec3(-2., 3., 4.)), normalize(vNormal)), normalize(vView)), 0.), 35.);
        color += vec3(.85,.93,1.) * spec * .9;
        gl_FragColor = vec4(color, 1.);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  });
}

function makeSystem(root, colors, updates) {
  const board = new THREE.Group();
  board.rotation.set(.58, -.35, -.12);
  root.add(board);
  const chassis = new THREE.MeshStandardMaterial({ color: "#37422e", metalness: .65, roughness: .48 });
  const ceramic = new THREE.MeshStandardMaterial({ color: "#b6bca2", metalness: .3, roughness: .4 });
  mesh(board, new THREE.BoxGeometry(4.8, .12, 2.7), chassis, [0, -.35, 0]);
  const points = [[-1.65,0,.65],[-1.65,0,-.65],[0,.12,0],[1.6,0,.65],[1.6,0,-.65]];
  points.forEach((pos,i) => {
    const size = i === 2 ? .95 : .55;
    const unit = mesh(board, new THREE.BoxGeometry(size,.32,size), ceramic, pos);
    mesh(unit,new THREE.BoxGeometry(size*.78,.025,size*.78), chassis,[0,.17,0]);
    for(let k=0;k<4;k++) mesh(unit,new THREE.BoxGeometry(.05,.04,.12),glow(colors[0]),[-size/2+.08+k*size/4,.05,size/2+.04]);
    mesh(unit,new THREE.BoxGeometry(.08,.025,.08),glow(colors[1]),[size/3,.19,-size/3]);
  });
  [[0,2],[1,2],[2,3],[2,4]].forEach(([a,b],i) => {
    const from=new THREE.Vector3(...points[a]); const to=new THREE.Vector3(...points[b]);
    from.y=-.12; to.y=-.12;
    const curve=new THREE.CatmullRomCurve3([from,new THREE.Vector3((from.x+to.x)/2,-.12,from.z),new THREE.Vector3((from.x+to.x)/2,-.12,to.z),to]);
    mesh(board,new THREE.TubeGeometry(curve,32,.018,6,false),glow(colors[1],.5));
    const packet=mesh(board,new THREE.BoxGeometry(.10,.07,.10),glow(colors[0]));
    updates.push(t=>packet.position.copy(curve.getPoint((t*.18+i*.2)%1)));
  });
  for(let i=0;i<8;i++) mesh(board,new THREE.BoxGeometry(.18,.07,.32),chassis,[-.9+i*.26,-.22,1.1]);
  const frame=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(4.8,.12,2.7)),new THREE.LineBasicMaterial({color:"#829568",transparent:true,opacity:.5}));
  frame.position.y=-.35;board.add(frame);
  updates.push(t=>{board.rotation.y=-.35+Math.sin(t*.17)*.1;});
}

function makeNexus(root, colors, updates) {
  const assembly = new THREE.Group();
  assembly.rotation.set(.35, -.55, -.08);
  root.add(assembly);
  const material = metal("#a7a1d7");
  for (let y = 0; y < 3; y++) for (let x = 0; x < 3; x++) {
    const geometry = new THREE.BoxGeometry(.66, .66, .66);
    const block = mesh(assembly, geometry, material, [(x - 1) * .9, (y - 1) * .9, ((x + y) % 2) * .35]);
    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geometry), new THREE.LineBasicMaterial({ color: colors[0], transparent: true, opacity: .7 }));
    block.add(edges);
    mesh(block, new THREE.BoxGeometry(.39, .025, .015), glow(colors[0]), [0, -.15, .34]);
    updates.push((t) => { block.position.z = Math.sin(t * .65 + x + y) * .22; });
  }
  ring(root, 2.15, .008, glow(colors[0], .4), [1.2, .2, 0]);
  updates.push((t) => { assembly.rotation.y = -.55 + Math.sin(t * .22) * .3; });
}

function makeVendor(root, colors, updates) {
  const assembly = new THREE.Group();
  assembly.rotation.set(.25, -.45, -.15);
  root.add(assembly);
  for (let i = 0; i < 4; i++) {
    const card = mesh(assembly, new THREE.BoxGeometry(1.8, 2.1, .055), metal(i === 0 ? "#b9d2cc" : "#334b55"), [i * .2 - .3, i * .12 - .2, -i * .4]);
    for (let j = 0; j < 5; j++) mesh(card, new THREE.BoxGeometry(j === 0 ? .6 : 1.15, .018, .012), glow(colors[0], j === 0 ? 1 : .4), [-.12, .55 - j * .25, .035]);
  }
  const lens = ring(root, .86, .13, metal("#6bbdb2"), [.08, -.2, -.3]);
  lens.position.set(.5, .1, 1);
  const scan = ring(lens, .7, .014, glow(colors[0]));
  mesh(lens, new THREE.CylinderGeometry(.08, .08, .85, 20), metal(), [.76, -.77, 0]).rotation.z = .75;
  updates.push((t) => { lens.position.y = .15 + Math.sin(t * .65) * .22; scan.rotation.y = Math.sin(t * .4) * .2; });
}

function makeFinance(root, colors, updates) {
  const assembly = new THREE.Group();
  root.add(assembly);
  assembly.rotation.set(.3, -.5, 0);
  for (let i = 0; i < 5; i++) {
    const height = .6 + i * .32;
    const bar = mesh(assembly, new THREE.BoxGeometry(.38, height, .55), metal(i === 4 ? "#e6bf90" : "#837c9e"), [(i - 2) * .62, height / 2 - 1, 0]);
    mesh(bar, new THREE.BoxGeometry(.39, .025, .56), glow(colors[0]), [0, height / 2, 0]);
  }
  const arc = ring(root, 1.8, .04, metal("#c7b7a2"), [.45, .2, -.15]);
  ring(root, 1.86, .01, glow(colors[0], .6), [.45, .2, -.15]);
  const coin = mesh(root, new THREE.CylinderGeometry(.48, .48, .12, 64), metal("#d9ad6a"), [1.4, 1, .6]);
  coin.rotation.x = Math.PI / 2;
  updates.push((t) => { coin.rotation.z = t * .24; coin.position.y = 1 + Math.sin(t) * .1; arc.rotation.y = .2 + Math.sin(t * .2) * .15; });
}

function makeAqua(root, colors, updates) {
  const assembly = new THREE.Group();
  root.add(assembly);
  assembly.rotation.set(.3, .2, 0);
  const shader = plasma(...colors);
  mesh(assembly, new THREE.IcosahedronGeometry(.6, 4), shader);
  for (let i = 0; i < 7; i++) {
    const angle = i / 7 * Math.PI * 2;
    const p = new THREE.Vector3(Math.cos(angle) * 1.65, Math.sin(angle) * 1.65, Math.sin(i * 2) * .4);
    mesh(assembly, new THREE.OctahedronGeometry(.19, 1), metal("#7bbedc"), p.toArray());
    const path = new THREE.LineCurve3(new THREE.Vector3(), p);
    mesh(assembly, new THREE.TubeGeometry(path, 1, .01, 5, false), glow(colors[0], .6));
    const pulse = mesh(assembly, new THREE.SphereGeometry(.04, 8, 8), glow("#c8f4ff"));
    updates.push((t) => { pulse.position.copy(p).multiplyScalar((t * .2 + i / 7) % 1); });
  }
  ring(assembly, 2.05, .045, metal(), [.6, .25, 0]);
  ring(assembly, 2.1, .008, glow(colors[0]), [.6, .25, 0]);
  updates.push((t) => { assembly.rotation.y = .2 + t * .07; shader.uniforms.uTime.value = t; });
}

export function createScene(host, variant, initiallyPaused) {
  const isHero = variant === "core" || variant === "system";
  const colors = PALETTES[variant] || PALETTES.core;
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 700 ? 1.25 : 1.75));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.3;
  host.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(isHero ? 38 : 36, 1, .1, 50);
  camera.position.set(0, .3, isHero ? 8.3 : 8.2);
  camera.lookAt(0, 0, 0);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const environment = pmrem.fromScene(room, .04);
  scene.environment = environment.texture;
  scene.environmentIntensity = 1.2;
  room.dispose();
  pmrem.dispose();
  scene.add(new THREE.AmbientLight("#99a0df", 1.3));
  const key = new THREE.DirectionalLight("#f0f4ff", 4);
  key.position.set(-3, 4, 5);
  scene.add(key);
  const rim = new THREE.PointLight(colors[0], 22, 12);
  rim.position.set(-3, 1, 1);
  scene.add(rim);
  const blue = new THREE.PointLight(colors[1], 25, 12);
  blue.position.set(3, -1, 2);
  scene.add(blue);
  const root = new THREE.Group();
  scene.add(root);
  const updates = [];
  const makers = { core: makeSystem, system: makeSystem, nexus: makeNexus, vendor: makeVendor, finance: makeFinance, aqua: makeAqua };
  (makers[variant] || makeSystem)(root, colors, updates);

  // Deterministic dust field, independent of frame rate and device size.
  const points = [];
  for (let i = 1; i < (variant === "system" ? 0 : isHero ? 170 : 50); i++) {
    const f = (n) => { const x = Math.sin(n * 127.1) * 43758.5453; return x - Math.floor(x); };
    points.push((f(i) - .5) * 12, (f(i + 300) - .5) * 9, -2 - f(i + 600) * 5);
  }
  const dustGeometry = new THREE.BufferGeometry();
  dustGeometry.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
  const dust = new THREE.Points(dustGeometry, new THREE.PointsMaterial({ color: "#a6a9e7", size: .018, transparent: true, opacity: .6 }));
  scene.add(dust);
  let paused = initiallyPaused;
  let visible = true;
  let disposed = false;
  let frame = 0;
  let last = 0;
  let time = 0;
  const pointer = new THREE.Vector2();
  const current = new THREE.Vector2();
  const resize = () => {
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.position.z = isHero && width / height < .85 ? 10 : isHero ? 8.3 : 8.2;
    camera.updateProjectionMatrix();
    draw();
  };
  const draw = () => {
    if (disposed) return;
    updates.forEach((update) => update(time));
    renderer.render(scene, camera);
  };
  const tick = (now) => {
    frame = 0;
    if (disposed || paused || !visible || document.hidden) return;
    const delta = Math.min((now - (last || now)) / 1000, .05);
    if (now - last < 30) { frame = requestAnimationFrame(tick); return; }
    last = now;
    time += delta;
    current.lerp(pointer, .04);
    const rect = host.getBoundingClientRect();
    const scrollShift = isHero ? THREE.MathUtils.clamp(-rect.top / window.innerHeight, -.5, 1) : 0;
    root.rotation.y = current.x * .18 + scrollShift * .5;
    root.rotation.x = -current.y * .12 + scrollShift * .16;
    dust.rotation.z = time * .008;
    draw();
    frame = requestAnimationFrame(tick);
  };
  const start = () => {
    if (!frame && !disposed && !paused && visible && !document.hidden) {
      last = 0;
      frame = requestAnimationFrame(tick);
    }
  };
  const onPointer = (event) => {
    const rect = host.getBoundingClientRect();
    pointer.set(THREE.MathUtils.clamp((event.clientX - rect.left) / rect.width * 2 - 1, -1, 1),
      THREE.MathUtils.clamp((event.clientY - rect.top) / rect.height * 2 - 1, -1, 1));
  };
  const onVisibility = () => { if (document.hidden) { cancelAnimationFrame(frame); frame = 0; } else start(); };
  const onLost = (event) => { event.preventDefault(); host.dataset.fallback = "true"; cancelAnimationFrame(frame); frame = 0; };
  const onRestored = () => { delete host.dataset.fallback; resize(); start(); };
  renderer.domElement.addEventListener("webglcontextlost", onLost);
  renderer.domElement.addEventListener("webglcontextrestored", onRestored);
  window.addEventListener("pointermove", onPointer, { passive: true });
  document.addEventListener("visibilitychange", onVisibility);
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);
  resize();
  start();
  return {
    setPaused(value) { paused = value; if (paused) { cancelAnimationFrame(frame); frame = 0; } else start(); },
    setVisible(value) { visible = value; if (!visible) { cancelAnimationFrame(frame); frame = 0; } else start(); },
    dispose() {
      disposed = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
      renderer.domElement.removeEventListener("webglcontextlost", onLost);
      renderer.domElement.removeEventListener("webglcontextrestored", onRestored);
      const geometries = new Set();
      const materials = new Set();
      scene.traverse((object) => {
        if (object.geometry) geometries.add(object.geometry);
        if (object.material) (Array.isArray(object.material) ? object.material : [object.material]).forEach((material) => materials.add(material));
      });
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      environment.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
