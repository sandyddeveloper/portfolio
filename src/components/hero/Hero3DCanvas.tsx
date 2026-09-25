"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

interface Hero3DCanvasProps {
  onBlastStateChange?: (isBlasting: boolean) => void;
  soundEnabled?: boolean;
}

function Hero3DCanvas({
  onBlastStateChange,
  soundEnabled = true,
}: Hero3DCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineCanvasRef = useRef<HTMLCanvasElement>(null);

  const onBlastRef = useRef(onBlastStateChange);
  onBlastRef.current = onBlastStateChange;

  const soundRef = useRef(soundEnabled);
  soundRef.current = soundEnabled;

  useEffect(() => {
    const container = containerRef.current;
    const lineCanvas = lineCanvasRef.current;
    if (!container || !lineCanvas) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    function getDPR() {
      const isMobile = width < 768;
      return Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 1.5);
    }

    lineCanvas.width = width;
    lineCanvas.height = height;
    const lctx = lineCanvas.getContext("2d");

    // --- 1. Authentic Trionn Audio Engine ---
    let audioCtx: AudioContext | null = null;
    let hoverAudioCtx: AudioContext | null = null;
    let hoverBeepBuffer: AudioBuffer | null = null;
    let sparkBuffer: AudioBuffer | null = null;
    let glassShatterBuffer: AudioBuffer | null = null;
    let joinZoomBuffer: AudioBuffer | null = null;
    let wooshBuffer: AudioBuffer | null = null;
    let wooshSource: AudioBufferSourceNode | null = null;
    let wooshGain: GainNode | null = null;
    let sparkSource: AudioBufferSourceNode | null = null;
    let sparkGain: GainNode | null = null;
    let sparkCooldown = 0;
    let sparkSoundPlayed = false;

    function initAudio() {
      try {
        const AudioClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!audioCtx) audioCtx = new AudioClass();
        if (!hoverAudioCtx) hoverAudioCtx = new AudioClass();

        const load = (url: string, cb: (b: AudioBuffer) => void) => {
          fetch(url)
            .then((r) => r.arrayBuffer())
            .then((d) => audioCtx?.decodeAudioData(d))
            .then((b) => {
              if (b) cb(b);
            })
            .catch(() => { });
        };

        load("/assets/glass-shatter.mp3", (b) => { glassShatterBuffer = b; });
        load("/assets/join-zoom.mp3", (b) => { joinZoomBuffer = b; });
        load("/assets/woosh-loop.mp3", (b) => { wooshBuffer = b; });
        load("/assets/hero-spark.mp3", (b) => { sparkBuffer = b; });

        fetch("/assets/hover-beep.mp3")
          .then((r) => r.arrayBuffer())
          .then((d) => hoverAudioCtx?.decodeAudioData(d))
          .then((b) => { if (b) hoverBeepBuffer = b; })
          .catch(() => { });
      } catch { }
    }

    function playHoverBeep() {
      if (!soundRef.current || !hoverAudioCtx || !hoverBeepBuffer) return;
      try {
        if (hoverAudioCtx.state === "suspended") hoverAudioCtx.resume();
        const src = hoverAudioCtx.createBufferSource();
        const gain = hoverAudioCtx.createGain();
        src.buffer = hoverBeepBuffer;
        src.connect(gain);
        gain.connect(hoverAudioCtx.destination);
        gain.gain.setValueAtTime(0.4, hoverAudioCtx.currentTime);
        src.start();
      } catch { }
    }

    function playSparkSound() {
      if (!soundRef.current || !audioCtx || !sparkBuffer || sparkCooldown > 0) return;
      sparkCooldown = 0.08;
      try {
        if (audioCtx.state === "suspended") audioCtx.resume();
        if (sparkSource) {
          try { sparkSource.stop(); } catch { }
        }
        const src = audioCtx.createBufferSource();
        const gain = audioCtx.createGain();
        src.buffer = sparkBuffer;
        src.connect(gain);
        gain.connect(audioCtx.destination);
        gain.gain.setValueAtTime(0.35, audioCtx.currentTime);
        src.start();
        sparkSource = src;
        sparkGain = gain;
      } catch { }
    }

    function stopSparkSound() {
      if (sparkGain && audioCtx) {
        try {
          sparkGain.gain.linearRampToValueAtTime(0.0001, audioCtx.currentTime + 0.04);
          setTimeout(() => {
            try { sparkSource?.stop(); } catch { }
            sparkSource = null;
            sparkGain = null;
          }, 50);
        } catch { }
      }
    }

    function playShatterSound() {
      if (!soundRef.current || !audioCtx || !glassShatterBuffer) return;
      try {
        if (audioCtx.state === "suspended") audioCtx.resume();
        const src = audioCtx.createBufferSource();
        const gain = audioCtx.createGain();
        src.buffer = glassShatterBuffer;
        src.connect(gain);
        gain.connect(audioCtx.destination);
        gain.gain.setValueAtTime(0.85, audioCtx.currentTime);
        src.start();
      } catch { }
    }

    function playJoinSound() {
      if (!soundRef.current || !audioCtx || !joinZoomBuffer) return;
      try {
        if (audioCtx.state === "suspended") audioCtx.resume();
        const src = audioCtx.createBufferSource();
        const gain = audioCtx.createGain();
        src.buffer = joinZoomBuffer;
        src.connect(gain);
        gain.connect(audioCtx.destination);
        gain.gain.setValueAtTime(0.7, audioCtx.currentTime);
        src.start();
      } catch { }
    }

    function startWoosh() {
      if (!soundRef.current || !audioCtx || !wooshBuffer || wooshSource) return;
      try {
        if (audioCtx.state === "suspended") audioCtx.resume();
        const src = audioCtx.createBufferSource();
        const gain = audioCtx.createGain();
        src.buffer = wooshBuffer;
        src.loop = true;
        src.connect(gain);
        gain.connect(audioCtx.destination);
        gain.gain.setValueAtTime(0, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.6, audioCtx.currentTime + 0.4);
        src.start();
        wooshSource = src;
        wooshGain = gain;
      } catch { }
    }

    function stopWoosh() {
      if (wooshGain && audioCtx) {
        try {
          wooshGain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.25);
          setTimeout(() => {
            try { wooshSource?.stop(); } catch { }
            wooshSource = null;
            wooshGain = null;
          }, 260);
        } catch { }
      }
    }

    const unlockAudio = () => {
      initAudio();
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };
    window.addEventListener("pointerdown", unlockAudio, { once: true });
    window.addEventListener("keydown", unlockAudio, { once: true });

    // --- 2. Three.js Scene, Camera, WebGLRenderer ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x040508);

    function getCameraConfig() {
      const w = window.innerWidth;
      return w > 1440
        ? { fov: 42, z: 5.4, sx: 1.2, x: 0, y: 0 }
        : w >= 1024
          ? { fov: 40, z: 5.7, sx: 1.1, x: 0, y: -0.02 }
          : w >= 768
            ? { fov: 38, z: 6.8, sx: 1.0, x: 0, y: -0.035 }
            : { fov: 36, z: 8.2, sx: 0.9, x: 0, y: -0.055 };
    }

    const camConf = getCameraConfig();
    const camera = new THREE.PerspectiveCamera(camConf.fov, width / height, 0.1, 200);
    camera.position.set(0, 0, camConf.z);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(getDPR());
    renderer.setClearColor(0x040508, 1);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // Procedural PMREM Studio Environment Map
    const pmremGen = new THREE.PMREMGenerator(renderer);
    pmremGen.compileEquirectangularShader();
    const envScene = new THREE.Scene();
    envScene.background = new THREE.Color(0x0a0c10);

    const envLight1 = new THREE.DirectionalLight(0xff6600, 3.5);
    envLight1.position.set(5, 4, 4);
    envScene.add(envLight1);
    const envLight2 = new THREE.DirectionalLight(0x4488ff, 2.5);
    envLight2.position.set(-5, -2, -4);
    envScene.add(envLight2);
    const envLight3 = new THREE.DirectionalLight(0xffffff, 2.0);
    envLight3.position.set(0, 8, 2);
    envScene.add(envLight3);

    const envMap = pmremGen.fromScene(envScene).texture;
    pmremGen.dispose();

    // --- 3. Lighting (Enhanced High-Visibility Studio Lights) ---
    scene.add(new THREE.AmbientLight(0x404d66, 3.6));

    const frontLight = new THREE.DirectionalLight(0xe8f0ff, 2.0);
    frontLight.position.set(0, 0.5, 7);
    scene.add(frontLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xa0b8d8, 1.6);
    fillLight.position.set(-4, 1, 3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xddeeff, 2.4);
    rimLight.position.set(0, -3, -5);
    scene.add(rimLight);

    const topLight = new THREE.DirectionalLight(0xccddee, 1.6);
    topLight.position.set(0, 8, 3);
    scene.add(topLight);

    const backLight = new THREE.DirectionalLight(0x8899aa, 1.5);
    backLight.position.set(0, 0, -8);
    scene.add(backLight);

    // Orbiting fiery molten point lights (Trionn p1, p2, j)
    const p1 = new THREE.PointLight(0xff3300, 12, 22);
    p1.position.set(3, -1, 3);
    scene.add(p1);

    const p2 = new THREE.PointLight(0xff2200, 9, 20);
    p2.position.set(-3, 2, -2);
    scene.add(p2);

    const p3 = new THREE.PointLight(0xff5500, 6, 14);
    p3.position.set(0, 4, 3);
    scene.add(p3);

    // Dynamic interactive touch lights for incandescent molten gold hot-spot reflections (Screenshots 2 & 3)
    const touchLight = new THREE.PointLight(0xff5500, 6, 12);
    touchLight.position.set(0, 0, 1.8);
    scene.add(touchLight);

    const coreLight = new THREE.PointLight(0xffcc44, 4, 7);
    coreLight.position.set(0, 0, 1.8);
    scene.add(coreLight);

    // Floating firefly sparks
    const sparkCount = 100;
    const sparkGeo = new THREE.BufferGeometry();
    const sparkPos = new Float32Array(sparkCount * 3);
    for (let i = 0; i < sparkCount; i++) {
      sparkPos[i * 3] = (Math.random() - 0.5) * 12;
      sparkPos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      sparkPos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    sparkGeo.setAttribute("position", new THREE.BufferAttribute(sparkPos, 3));
    const sparks = new THREE.Points(
      sparkGeo,
      new THREE.PointsMaterial({
        color: 0xff3300,
        size: 0.022,
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending,
      })
    );
    scene.add(sparks);

    // --- 4. 3 Authentic Trionn Shapes & Normal Shard Partitioning ---
    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: 0.48,
      bevelEnabled: true,
      bevelThickness: 0.012,
      bevelSize: 0.008,
      bevelSegments: 1,
      curveSegments: 12,
    };

    const emblemGroup = new THREE.Group();
    scene.add(emblemGroup);

    function updateGroupTransform() {
      const c = getCameraConfig();
      emblemGroup.scale.set(c.sx, c.sx, c.sx);
      emblemGroup.position.set(c.x, c.y, -0.48 / 2);
    }
    updateGroupTransform();

    // --- 4. 3 Authentic 'RRR' Monogram Shapes & Normal Shard Partitioning ---
    const createRShape = (posAngle: number, rotAngle: number, scale = 1.85, radiusOffset = 0.88) => {
      const cosP = Math.cos(posAngle);
      const sinP = Math.sin(posAngle);
      const cosR = Math.cos(rotAngle);
      const sinR = Math.sin(rotAngle);

      const tr = (x: number, y: number): [number, number] => {
        const sx = x * scale;
        const sy = y * scale;
        const rx = sx * cosR - sy * sinR + radiusOffset * cosP;
        const ry = sx * sinR + sy * cosR + radiusOffset * sinP;
        return [Math.round(rx * 10000) / 10000, Math.round(ry * 10000) / 10000];
      };

      const s = new THREE.Shape();

      // Outer boundary of geometric 'R'
      const p0 = tr(-0.24, -0.42);
      s.moveTo(p0[0], p0[1]);

      const p1 = tr(-0.24, 0.34);
      const p2 = tr(-0.16, 0.42);
      s.lineTo(p1[0], p1[1]);
      s.lineTo(p2[0], p2[1]);

      const p3 = tr(0.12, 0.42);
      s.lineTo(p3[0], p3[1]);

      const cp1 = tr(0.36, 0.42);
      const p4 = tr(0.36, 0.18);
      s.quadraticCurveTo(cp1[0], cp1[1], p4[0], p4[1]);

      const cp2 = tr(0.36, -0.04);
      const p5 = tr(0.10, -0.04);
      s.quadraticCurveTo(cp2[0], cp2[1], p5[0], p5[1]);

      const p6 = tr(0.12, -0.04);
      const p7 = tr(0.34, -0.36);
      const p8 = tr(0.28, -0.42);
      s.lineTo(p6[0], p6[1]);
      s.lineTo(p7[0], p7[1]);
      s.lineTo(p8[0], p8[1]);

      const p9 = tr(0.12, -0.42);
      s.lineTo(p9[0], p9[1]);

      const p10 = tr(-0.06, -0.04);
      s.lineTo(p10[0], p10[1]);

      const p11 = tr(-0.10, -0.04);
      s.lineTo(p11[0], p11[1]);

      const p12 = tr(-0.10, -0.42);
      s.lineTo(p12[0], p12[1]);

      s.closePath();

      // Inner counter hole for 'R' loop
      const hole = new THREE.Path();
      const h0 = tr(-0.10, 0.10);
      hole.moveTo(h0[0], h0[1]);

      const h1 = tr(-0.10, 0.28);
      hole.lineTo(h1[0], h1[1]);

      const h2 = tr(0.08, 0.28);
      hole.lineTo(h2[0], h2[1]);

      const hcp1 = tr(0.20, 0.28);
      const h3 = tr(0.20, 0.19);
      hole.quadraticCurveTo(hcp1[0], hcp1[1], h3[0], h3[1]);

      const hcp2 = tr(0.20, 0.10);
      const h4 = tr(0.08, 0.10);
      hole.quadraticCurveTo(hcp2[0], hcp2[1], h4[0], h4[1]);

      hole.closePath();
      s.holes.push(hole);

      return s;
    };

    // 3 Authentic 'RRR' Limbs arranged in 120-degree rotational symmetry (scaled up for prominent centerpiece presence)
    const s0 = createRShape((5 * Math.PI) / 6, (5 * Math.PI) / 6, 1.85, 0.88); // Limb 0: Top-Left 'R'
    const s1 = createRShape(Math.PI / 6, Math.PI / 6, 1.85, 0.88);             // Limb 1: Top-Right 'R'
    const s2 = createRShape((3 * Math.PI) / 2, (3 * Math.PI) / 2, 1.85, 0.88); // Limb 2: Bottom 'R'

    const masterMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x96a2b5,
      emissive: new THREE.Color(0x222d3d),
      emissiveIntensity: 0.28,
      metalness: 0.88,
      roughness: 0.14,
      transmission: 0.04,
      ior: 1.8,
      transparent: false,
      opacity: 1.0,
      reflectivity: 1.0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      envMap,
      envMapIntensity: 4.2,
      side: THREE.DoubleSide,
    });

    const edgeMat1 = new THREE.LineBasicMaterial({
      color: 0x88b2ea,
      transparent: true,
      opacity: 0.85,
    });
    const edgeMat2 = new THREE.LineBasicMaterial({
      color: 0xc4e2ff,
      transparent: true,
      opacity: 0.75,
    });

    interface ShardItem {
      mesh: THREE.Mesh | THREE.LineSegments;
      material?: THREE.MeshPhysicalMaterial;
      explodeDir: THREE.Vector3;
      spinAxis: THREE.Vector3;
      spinSpeed: number;
      delay: number;
      shapeIdx: number;
      isEdge?: boolean;
      flash: number;
      flashActive: boolean;
    }

    const shardList: ShardItem[] = [];

    // Trionn exact coplanar face partitioning
    [s0, s1, s2].forEach((shape, shapeIdx) => {
      const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      geo.computeBoundingBox();
      const center = new THREE.Vector3();
      geo.boundingBox?.getCenter(center);

      const pos = geo.attributes.position.array as Float32Array;
      const norm = geo.attributes.normal.array as Float32Array;
      const triCount = pos.length / 9;

      const faceGroups: { [key: string]: { tris: number[]; nx: number; ny: number; nz: number } } = {};
      for (let i = 0; i < triCount; i++) {
        const off = 9 * i;
        const nx = Math.round(10 * norm[off]) / 10;
        const ny = Math.round(10 * norm[off + 1]) / 10;
        const nz = Math.round(10 * norm[off + 2]) / 10;
        const key = `${nx},${ny},${nz}`;
        if (!faceGroups[key]) faceGroups[key] = { tris: [], nx, ny, nz };
        faceGroups[key].tris.push(i);
      }

      Object.values(faceGroups).forEach((grp) => {
        if (!grp.tris.length) return;
        const pArr: number[] = [];
        const nArr: number[] = [];
        let cx = 0, cy = 0, cz = 0;

        grp.tris.forEach((t) => {
          const off = 9 * t;
          for (let k = 0; k < 9; k++) {
            pArr.push(pos[off + k]);
            nArr.push(norm[off + k]);
          }
          cx += pos[off] + pos[off + 3] + pos[off + 6];
          cy += pos[off + 1] + pos[off + 4] + pos[off + 7];
          cz += pos[off + 2] + pos[off + 5] + pos[off + 8];
        });

        const totalV = 3 * grp.tris.length;
        cx /= totalV;
        cy /= totalV;
        cz /= totalV;

        const bGeo = new THREE.BufferGeometry();
        bGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(pArr), 3));
        bGeo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(nArr), 3));

        const mat = masterMaterial.clone();
        const mesh = new THREE.Mesh(bGeo, mat);

        const dx = cx - center.x;
        const dy = cy - center.y;
        const dz = cz - center.z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1;
        const explodeDir = new THREE.Vector3(
          (dx / dist) * 0.6 + 0.4 * grp.nx,
          (dy / dist) * 0.6 + 0.4 * grp.ny,
          (dz / dist) * 0.6 + 0.4 * grp.nz
        ).normalize();

        const spinAxis = new THREE.Vector3(
          Math.random() - 0.5,
          Math.random() - 0.5,
          Math.random() - 0.5
        ).normalize();

        emblemGroup.add(mesh);
        shardList.push({
          mesh,
          material: mat,
          explodeDir,
          spinAxis,
          spinSpeed: (Math.random() - 0.5) * 0.8,
          delay: Math.random() * 0.25,
          shapeIdx,
          isEdge: false,
          flash: 0,
          flashActive: false,
        });
      });

      // Beveled edges
      const edges = new THREE.EdgesGeometry(geo, 8);
      const eLine1 = new THREE.LineSegments(edges, edgeMat1);
      emblemGroup.add(eLine1);
      shardList.push({
        mesh: eLine1,
        explodeDir: new THREE.Vector3(),
        spinAxis: new THREE.Vector3(0, 1, 0),
        spinSpeed: 0,
        delay: 0,
        shapeIdx,
        isEdge: true,
        flash: 0,
        flashActive: false,
      });

      const eLine2 = new THREE.LineSegments(edges, edgeMat2);
      eLine2.scale.set(1.004, 1.004, 1.004);
      emblemGroup.add(eLine2);
      shardList.push({
        mesh: eLine2,
        explodeDir: new THREE.Vector3(),
        spinAxis: new THREE.Vector3(0, 1, 0),
        spinSpeed: 0,
        delay: 0,
        shapeIdx,
        isEdge: true,
        flash: 0,
        flashActive: false,
      });
    });

    // --- 5. 3D Electric Lightning Bolts ---
    interface BoltItem {
      line: THREE.Line;
      pts: Float32Array;
      travelLight: THREE.PointLight;
      life: number;
      maxLife: number;
      active: boolean;
    }

    const bolts: BoltItem[] = [];
    const boltColors = [0x70b0ff, 0x99ccff, 0xffbb66, 0xff7722];

    for (let i = 0; i < 5; i++) {
      const pts = new Float32Array(30);
      const bGeo = new THREE.BufferGeometry();
      bGeo.setAttribute("position", new THREE.BufferAttribute(pts, 3));
      bGeo.setDrawRange(0, 10);
      const bMat = new THREE.LineBasicMaterial({
        color: 0x88ccff,
        transparent: true,
        opacity: 0,
        depthTest: false,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const bLine = new THREE.Line(bGeo, bMat);
      bLine.renderOrder = 999;
      scene.add(bLine);

      const bLight = new THREE.PointLight(0xaaccff, 0, 12);
      scene.add(bLight);

      bolts.push({
        line: bLine,
        pts,
        travelLight: bLight,
        life: 0,
        maxLife: 0,
        active: false,
      });
    }

    function triggerBolt(startPt: THREE.Vector3, endPt: THREE.Vector3) {
      const b = bolts.find((bolt) => !bolt.active) || bolts[0];
      const dx = endPt.x - startPt.x;
      const dy = endPt.y - startPt.y;
      const dz = endPt.z - startPt.z;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.001;

      b.pts[0] = startPt.x;
      b.pts[1] = startPt.y;
      b.pts[2] = startPt.z;

      const lx = -dy / dist;
      const ly = dx / dist;

      for (let r = 1; r <= 8; r++) {
        const u = r / 9;
        const arc = Math.min(0.35 * dist, 0.1) * Math.sin(u * Math.PI);
        const jitt = (Math.random() - 0.5) * 0.06;
        b.pts[3 * r] = startPt.x + dx * u + jitt + lx * arc;
        b.pts[3 * r + 1] = startPt.y + dy * u + jitt + ly * arc;
        b.pts[3 * r + 2] = startPt.z + dz * u + (Math.random() - 0.5) * 0.04;
      }

      b.pts[27] = endPt.x;
      b.pts[28] = endPt.y;
      b.pts[29] = endPt.z;

      b.line.geometry.attributes.position.needsUpdate = true;
      (b.line.material as THREE.LineBasicMaterial).color.setHex(
        boltColors[Math.floor(Math.random() * boltColors.length)]
      );

      b.maxLife = 0.06 + 0.08 * Math.random();
      b.life = b.maxLife;
      b.active = true;
    }

    // --- 6. Authentic Trionn Curve Math (eA, ev, ew, eg) ---
    const eh = new THREE.Vector3(-0.78, 0.50, 0.24); // Connected to Limb 0 (Top-Left R)
    const ep = new THREE.Vector3(0.00, -0.99, 0.24);  // Connected to Limb 2 (Bottom R)
    const em = new THREE.Vector3(0.85, 0.42, 0.24);  // Connected to Limb 1 (Top-Right R)
    const ef = new THREE.Vector3();

    function projectAnchor(v: THREE.Vector3) {
      ef.copy(v).applyMatrix4(emblemGroup.matrixWorld);
      const z = ef.z;
      ef.project(camera);
      return {
        x: ((ef.x + 1) / 2) * width,
        y: ((-ef.y + 1) / 2) * height,
        worldZ: z,
      };
    }

    function eA(
      sx: number, sy: number,
      mx: number, my: number,
      ex: number, ey: number,
      seed: number, time: number
    ) {
      const c1x = 2 * mx - 0.5 * sx - 0.5 * ex;
      const c1y = 2 * my - 0.5 * sy - 0.5 * ey;
      const pts: { x: number; y: number; t: number }[] = [];
      const dist = Math.sqrt((ex - sx) ** 2 + (ey - sy) ** 2) || 1;

      for (let n = 0; n <= 140; n++) {
        const a = n / 140;
        const h = 1 - a;
        const px = h * h * sx + 2 * h * a * c1x + a * a * ex;
        const py = h * h * sy + 2 * h * a * c1y + a * a * ey;
        const fx = 2 * (1 - a) * (c1x - sx) + 2 * a * (ex - c1x);
        const fy = 2 * (1 - a) * (c1y - sy) + 2 * a * (ey - c1y);
        const l = Math.sqrt(fx * fx + fy * fy) || 1;
        const vx = -fy / l;
        const vy = fx / l;
        const wave =
          (0.75 * Math.sin(0.38 * time + 2.1 * seed + a * Math.PI * 1.1) +
            0.25 * Math.sin(0.19 * time + 0.9 * seed + a * Math.PI * 1.9)) *
          Math.sin(a * Math.PI) *
          (0.01 * dist);
        pts.push({ x: px + vx * wave, y: py + vy * wave, t: a });
      }
      return pts;
    }

    function ev(
      ctx: CanvasRenderingContext2D,
      pts: { x: number; y: number; t: number }[],
      alpha: number
    ) {
      if (pts.length < 2) return;
      ctx.save();
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineWidth = 1.8;
      ctx.strokeStyle = "rgba(135, 165, 215, 0.85)";
      ctx.shadowColor = "rgba(100, 160, 255, 0.6)";
      ctx.shadowBlur = 6;
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) {
        ctx.lineTo(pts[i].x, pts[i].y);
      }
      ctx.stroke();
      ctx.restore();
    }

    function ew(
      ctx: CanvasRenderingContext2D,
      pts: { x: number; y: number; t: number }[],
      phase: number,
      len: number
    ) {
      if (pts.length < 2) return;
      const o = 1.4 * len;
      const segs: { p: { x: number; y: number }; tRatio: number }[] = [];
      for (let i = 0; i < pts.length; i++) {
        const diff = phase - pts[i].t;
        if (diff >= 0 && diff < o) {
          segs.push({ p: pts[i], tRatio: diff / o });
        }
      }
      if (segs.length < 2) return;

      ctx.save();
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.shadowColor = "rgba(255, 130, 20, 0.9)";
      ctx.shadowBlur = 8;
      for (let i = 0; i < segs.length - 1; i++) {
        const l = segs[i].tRatio;
        const s = Math.pow(1 - l, 0.5);
        let r, g, b;
        if (l < 0.45) {
          r = 255;
          g = Math.round(160 * (1 - (l / 0.45) * 0.7));
          b = 30;
        } else {
          const e = Math.min(1, (l - 0.45) / 0.55);
          r = Math.round(160 * (1 - e));
          g = Math.round(180 + 70 * (1 - e));
          b = 255;
        }
        ctx.beginPath();
        ctx.moveTo(segs[i].p.x, segs[i].p.y);
        ctx.lineTo(segs[i + 1].p.x, segs[i + 1].p.y);
        ctx.lineWidth = 3.2;
        ctx.strokeStyle = `rgb(${r},${g},${b})`;
        ctx.globalAlpha = 1.0 * s;
        ctx.stroke();
      }
      ctx.restore();
    }

    // --- 7. State & Fluid Mouse Interaction ---
    let lineTime = 0;
    let mouseX = 0;
    let mouseY = 0;
    let mouseScreenX = -9999;
    let mouseScreenY = -9999;
    let rotX = 0.3;
    let rotY = 0.4;
    let isDragging = false;
    let px = 0;
    let py = 0;
    let clickBurst = 0;
    let isHolding = false;
    let holdTime = 0;
    let vibrateAmt = 0;
    let weldCooldown = 0;
    let lastHoveredMesh: THREE.Mesh | null = null;

    // Scroll tracking & Trionn dismantling state
    let scrollY = typeof window !== "undefined" ? window.scrollY || 0 : 0;
    let scrollProgress = 0;
    let targetScrollProgress = 0;

    const onScroll = () => {
      scrollY = window.scrollY || 0;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const pulsesState = [
      { phase: 0, speed: 1.4, len: 0.04, active: true, dir: 1 },
      { phase: 0.3, speed: 1.3, len: 0.04, active: true, dir: -1 },
      { phase: 0.7, speed: 1.35, len: 0.04, active: true, dir: 1 },
    ];

    const raycaster = new THREE.Raycaster();
    const mouse2D = new THREE.Vector2();
    const mouseWorld = new THREE.Vector3();
    const planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

    const onMouseMove = (e: MouseEvent) => {
      mouseScreenX = e.clientX;
      mouseScreenY = e.clientY;
      mouseX = (e.clientX / width) * 2 - 1;
      mouseY = -(e.clientY / height) * 2 + 1;

      if (isDragging) {
        rotY += (e.clientX - px) * 0.025;
        rotX += (e.clientY - py) * 0.025;
        rotX = Math.max(-Math.PI / 2.5, Math.min(Math.PI / 2.5, rotX));
        px = e.clientX;
        py = e.clientY;
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      if (scrollY > height * 0.8) return; // Only allow hold/blast in hero section
      const target = e.target as HTMLElement;
      if (target.closest("button") || target.closest("a")) return;

      isDragging = true;
      px = e.clientX;
      py = e.clientY;

      isHolding = true;
      holdTime = 0;
      vibrateAmt = 1;
      if (onBlastRef.current) onBlastRef.current(true);
    };

    const onMouseUp = () => {
      isDragging = false;
      if (isHolding) {
        isHolding = false;
        vibrateAmt = 0;
        stopWoosh();
        if (clickBurst > 0.4) {
          playJoinSound();
        }
        if (onBlastRef.current) onBlastRef.current(false);
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const t = e.touches[0];
        mouseScreenX = t.clientX;
        mouseScreenY = t.clientY;
        mouseX = (t.clientX / width) * 2 - 1;
        mouseY = -(t.clientY / height) * 2 + 1;
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    // Global Blast trigger
    const triggerBlast = () => {
      playShatterSound();
      startWoosh();
      if (onBlastRef.current) onBlastRef.current(true);

      gsap.to({ b: 0 }, {
        b: 1,
        duration: 0.45,
        ease: "expo.out",
        onUpdate: function () {
          clickBurst = this.targets()[0].b;
        },
        onComplete: () => {
          gsap.to({ b: 1 }, {
            b: 0,
            duration: 1.15,
            ease: "elastic.out(1, 0.4)",
            onUpdate: function () {
              clickBurst = this.targets()[0].b;
            },
            onComplete: () => {
              stopWoosh();
              playJoinSound();
              if (onBlastRef.current) onBlastRef.current(false);
            },
          });
        },
      });
    };

    (window as unknown as { __trionnBlast?: () => void }).__trionnBlast = triggerBlast;

    // --- 8. Render Animation Loop ---
    let animId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();
      lineTime += 0.016;

      // 1. Rotation with fluid mouse inertia (Exact Trionn formula)
      if (isDragging) {
        emblemGroup.rotation.x = rotX;
        emblemGroup.rotation.y = rotY;
      } else {
        rotY += 0.0035;
        rotX = Math.max(-Math.PI / 2.5, Math.min(Math.PI / 2.5, rotX));
        emblemGroup.rotation.x += (rotX + 0.22 * mouseY - emblemGroup.rotation.x) * 0.06;
        emblemGroup.rotation.y += (rotY + 0.22 * mouseX - emblemGroup.rotation.y) * 0.06;
      }
      emblemGroup.position.y = Math.sin(elapsed * 1.2) * 0.04;

      // 2. Point Lights Orbit
      p1.position.x = 4 * Math.sin(0.6 * elapsed);
      p1.position.y = 2 * Math.cos(0.4 * elapsed);
      p1.position.z = 3 * Math.cos(0.5 * elapsed) + 2;

      p2.position.x = 4 * Math.cos(0.5 * elapsed);
      p2.position.y = 2 * Math.sin(0.7 * elapsed);
      p2.position.z = 3 * Math.sin(0.3 * elapsed) - 1;

      // 3. Touch Light Unprojection for Hot-Spot Reflection
      mouse2D.set(mouseX, mouseY);
      raycaster.setFromCamera(mouse2D, camera);
      raycaster.ray.intersectPlane(planeZ, mouseWorld);

      touchLight.position.lerp(
        new THREE.Vector3(mouseWorld.x, mouseWorld.y, 1.4),
        0.16
      );
      coreLight.position.copy(touchLight.position);

      // 4. Raycast Mesh Hover
      const testMeshes = shardList.filter((s) => !s.isEdge).map((s) => s.mesh) as THREE.Mesh[];
      const hitIntersects = raycaster.intersectObjects(testMeshes, false);
      const hitMesh = hitIntersects.length > 0 ? (hitIntersects[0].object as THREE.Mesh) : null;

      if (hitMesh && hitMesh !== lastHoveredMesh) {
        const item = shardList.find((s) => s.mesh === hitMesh);
        if (item) {
          item.flash = 1;
          item.flashActive = true;
          playHoverBeep();
        }
      }
      lastHoveredMesh = hitMesh;

      // Update flash on shards
      shardList.forEach((s) => {
        if (s.isEdge || !s.material) return;
        if (s.flashActive || s.flash > 0) {
          s.flash *= 0.92;
          if (s.flash < 0.002) {
            s.flash = 0;
            s.flashActive = false;
          }
          const f = s.flash;
          s.material.roughness = Math.max(0.04, 0.14 - 0.08 * f);
          s.material.clearcoatRoughness = Math.max(0.02, 0.08 - 0.05 * f);
          s.material.emissive.setHex(f > 0.05 ? 0xff5500 : 0x222d3d);
          s.material.emissiveIntensity = 0.28 + 0.85 * f;
        } else {
          s.material.roughness = 0.14;
          s.material.clearcoatRoughness = 0.08;
          s.material.emissive.setHex(0x222d3d);
          s.material.emissiveIntensity = 0.28;
        }
      });

      if (hitMesh) {
        touchLight.intensity = THREE.MathUtils.lerp(touchLight.intensity, 24, 0.18);
        coreLight.intensity = THREE.MathUtils.lerp(coreLight.intensity, 15, 0.18);
      } else {
        touchLight.intensity = THREE.MathUtils.lerp(touchLight.intensity, 5, 0.08);
        coreLight.intensity = THREE.MathUtils.lerp(coreLight.intensity, 2, 0.08);
      }

      // 5. Trionn Scroll-driven Dismantle & Re-assemble curve
      const o = scrollY / Math.max(1, height);
      if (o <= 0.1) {
        targetScrollProgress = 0; // In Hero: completely unified/assembled
      } else if (o <= 1.0) {
        targetScrollProgress = Math.max(0, (o - 0.1) / 0.9); // Scrolling Hero -> About: dismantle (0 -> 1)
      } else if (o <= 1.25) {
        targetScrollProgress = 1; // In About: fully dismantled
      } else if (o <= 1.85) {
        targetScrollProgress = Math.max(0, (1.85 - o) / 0.6); // Scrolling About -> Vision: re-assemble (1 -> 0)
      } else {
        targetScrollProgress = 0; // In Vision: completely re-assembled behind marquee
      }

      scrollProgress += (targetScrollProgress - scrollProgress) * 0.06;

      // Pointer events & performance management across sections
      if (container) {
        if (o < 0.75) {
          if (container.style.pointerEvents !== "auto") {
            container.style.pointerEvents = "auto";
          }
        } else {
          if (container.style.pointerEvents !== "none") {
            container.style.pointerEvents = "none";
          }
        }

        // Keep 3D canvas active and visible ONLY throughout Hero, About, and Vision (o <= 1.85)
        // Once user scrolls past Vision to KeyFacts, Works, and Services, hide completely
        if (o > 1.85) {
          if (container.style.display !== "none") {
            container.style.display = "none";
            container.style.visibility = "hidden";
            container.style.opacity = "0";
          }
          return;
        } else {
          if (container.style.display !== "block") {
            container.style.display = "block";
            container.style.visibility = "visible";
            container.style.opacity = "1";
          }
        }
      }

      // Explosion & Vibration Physics
      if (isHolding) {
        holdTime += 1 / 60;
        vibrateAmt = 1;
        if (holdTime >= 0.5) {
          if (clickBurst === 0) {
            playShatterSound();
            startWoosh();
          }
          clickBurst = Math.min(1, clickBurst + 0.02);
        }
      } else {
        vibrateAmt = Math.max(0, vibrateAmt - 0.08);
        clickBurst = Math.max(0, clickBurst - 0.03);
      }

      const h = scrollProgress < 0.15 ? clickBurst : 0;
      const p = Math.max(scrollProgress, h);
      const s4Amt = scrollProgress;

      // Trionn authentic corner dispersal destinations (Screenshots 2 & 3):
      // Limb 0: top-left [-5.8, 3.2, 0]
      // Limb 1: top-right [5.8, 3.2, 0]
      // Limb 2: bottom-center [0, -5.8, 0]
      const cornerDests = [
        [-5.8, 3.2, 0],
        [5.8, 3.2, 0],
        [0, -5.8, 0],
      ];

      shardList.forEach((s) => {
        if (s.isEdge) {
          // Wireframe contour stays centered as the ghost outline shown in Image 2 & 3!
          s.mesh.position.set(0, 0, 0);
          return;
        }

        const n = Math.max(0, p - s.delay);
        const a = 5.5 * n;
        const angle = s.shapeIdx * ((2 * Math.PI) / 3);

        const floatX = 0.012 * Math.sin(0.4 * elapsed + angle) * (1 - p);
        const floatY = 0.008 * Math.cos(0.35 * elapsed + angle) * (1 - p);
        const floatZ = 0.006 * Math.sin(0.3 * elapsed + 1.5 * angle) * (1 - p);

        const d = cornerDests[s.shapeIdx] || [0, 0, 0];
        const m = Math.sin(elapsed * 2 + 20 * s.delay) * (0.018 * vibrateAmt);
        const f = Math.cos(1.3 * elapsed * 2 + 2 * s.shapeIdx) * (0.018 * vibrateAmt);

        // Exact Trionn formula blending blast/float with corner destinations via s4Amt
        s.mesh.position.set(
          s.explodeDir.x * a * (1 - s4Amt) + floatX * (1 - s4Amt) + d[0] * s4Amt + m,
          s.explodeDir.y * a * (1 - s4Amt) + floatY * (1 - s4Amt) + d[1] * s4Amt + f,
          s.explodeDir.z * a * (1 - s4Amt) + floatZ * (1 - s4Amt) + d[2] * s4Amt
        );

        s.mesh.rotation.x = s.spinAxis.x * s.spinSpeed * n * Math.PI;
        s.mesh.rotation.y = s.spinAxis.y * s.spinSpeed * n * Math.PI;
        s.mesh.rotation.z = s.spinAxis.z * s.spinSpeed * n * Math.PI;
      });

      // Render 3D Scene
      renderer.render(scene, camera);

      // 6. Draw 2D Trajectory Curves on Overlay Canvas (fades out as you scroll down)
      const linesAlpha = Math.max(0, 1 - Math.max(0, (o - 0.08) / 0.35));
      if (lctx) {
        lctx.clearRect(0, 0, width, height);

        if (linesAlpha > 0.01) {
          const s = projectAnchor(eh);
          const c = projectAnchor(ep);
          const d = projectAnchor(em);

          const v0 = { x: 0, y: height };
          const curveW = eA(v0.x, v0.y - 0.15 * height, s.x, s.y, width, 0.2 * height, 1, lineTime);
          const curveY = eA(v0.x, v0.y + 0.13 * height, d.x, d.y, width, 0.1 * height, 3, lineTime);
          const curveB = eA(v0.x, v0.y - 0.07 * height, c.x, c.y, width, -0.065 * height, 2, lineTime);

          const allCurves = [curveW, curveY, curveB];

          // Draw curved lines with rich visibility and glow
          ev(lctx, curveW, 0.95 * linesAlpha);
          ev(lctx, curveY, 0.95 * linesAlpha);
          ev(lctx, curveB, 0.95 * linesAlpha);

          // Draw traveling incandescent pulses
          pulsesState.forEach((p, idx) => {
            p.phase = (p.phase + p.dir * p.speed * delta) % 1;
            if (p.phase < 0) p.phase += 1;
            ew(lctx, allCurves[idx], p.phase, p.len);
          });

          // Glowing anchor nodes at limbs
          const nowSec = performance.now() / 1000;
          [
            { p: curveW[Math.floor(curveW.length / 2)], seed: 1, ap: s },
            { p: curveY[Math.floor(curveY.length / 2)], seed: 2.3, ap: d },
            { p: curveB[Math.floor(curveB.length / 2)], seed: 3.7, ap: c },
          ].forEach(({ p, seed, ap }) => {
            const u = (Math.sin(1.8 * nowSec + 2.1 * seed) + 1) / 2;
            const depthAlpha = Math.max(0.35, Math.min(1, 1.5 * ap.worldZ + 0.6));

            lctx.save();
            lctx.globalAlpha = 0.95 * depthAlpha * linesAlpha;
            lctx.fillStyle = "rgba(220, 235, 255, 1)";
            lctx.beginPath();
            lctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2);
            lctx.fill();

            const rRadius = 9 + 6 * u;
            const grad = lctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, rRadius);
            grad.addColorStop(0, "rgba(255, 175, 70, 0.95)");
            grad.addColorStop(0.4, "rgba(255, 110, 20, 0.5)");
            grad.addColorStop(1, "rgba(255, 60, 0, 0)");
            lctx.fillStyle = grad;
            lctx.beginPath();
            lctx.arc(p.x, p.y, rRadius, 0, Math.PI * 2);
            lctx.fill();

            lctx.globalAlpha = 0.65 * (1 - u) * depthAlpha * linesAlpha;
            lctx.strokeStyle = "rgba(200, 225, 255, 1)";
            lctx.lineWidth = 1.8;
            lctx.beginPath();
            lctx.arc(p.x, p.y, rRadius, 0, Math.PI * 2);
            lctx.stroke();
            lctx.restore();
          });

          // Touch Line Proximity Check ("Dare to touch the lines")
          weldCooldown -= delta;
          sparkCooldown -= delta;
          let lineHit: { x: number; y: number } | null = null;
          let hitIdx = 0;

          for (let a = 0; a < allCurves.length; a++) {
            const pts = allCurves[a];
            for (let r = 0; r < pts.length - 1; r++) {
              const p1 = pts[r];
              const p2 = pts[r + 1];
              const sx = p2.x - p1.x;
              const sy = p2.y - p1.y;
              const lenSq = sx * sx + sy * sy;
              if (lenSq < 0.001) continue;

              const t = Math.max(0, Math.min(1, ((mouseScreenX - p1.x) * sx + (mouseScreenY - p1.y) * sy) / lenSq));
              const px = p1.x + t * sx;
              const py = p1.y + t * sy;
              const distSq = (mouseScreenX - px) ** 2 + (mouseScreenY - py) ** 2;

              if (distSq < 196) { // 14px threshold
                lineHit = { x: px, y: py };
                hitIdx = a;
                break;
              }
            }
            if (lineHit) break;
          }

          if (lineHit && weldCooldown <= 0) {
            if (!sparkSoundPlayed) {
              playSparkSound();
              sparkSoundPlayed = true;
            }

            // Unproject line hit to 3D point
            const normX = (lineHit.x / width) * 2 - 1;
            const normY = -(lineHit.y / height) * 2 + 1;
            const ray = new THREE.Raycaster();
            ray.setFromCamera(new THREE.Vector2(normX, normY), camera);
            const hit3D = new THREE.Vector3();
            ray.ray.intersectPlane(planeZ, hit3D);

            const targetPt = [eh, em, ep][hitIdx].clone().applyMatrix4(emblemGroup.matrixWorld);
            triggerBolt(hit3D, targetPt);
            weldCooldown = 0.05 + 0.04 * Math.random();
          } else if (!lineHit) {
            if (sparkSoundPlayed) {
              stopSparkSound();
              sparkSoundPlayed = false;
            }
          }
        }
      }

// 7. Update 3D Lightning Bolts
bolts.forEach((b) => {
  if (!b.active) {
    (b.line.material as THREE.LineBasicMaterial).opacity = 0;
    b.travelLight.intensity = 0;
    return;
  }
  b.life -= delta;
  if (b.life <= 0) {
    b.active = false;
    (b.line.material as THREE.LineBasicMaterial).opacity = 0;
    b.travelLight.intensity = 0;
    return;
  }
  const ratio = b.life / b.maxLife;
  (b.line.material as THREE.LineBasicMaterial).opacity = ratio * (0.8 + 0.2 * Math.random());
  b.travelLight.position.set(b.pts[12], b.pts[13], b.pts[14]);
  b.travelLight.intensity = 15 * ratio;
});
    };

animate();

// Resize handler
const onResize = () => {
  width = window.innerWidth;
  height = window.innerHeight;

  const conf = getCameraConfig();
  camera.aspect = width / height;
  camera.fov = conf.fov;
  camera.position.z = conf.z;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
  renderer.setPixelRatio(getDPR());

  lineCanvas.width = width;
  lineCanvas.height = height;
  updateGroupTransform();
};

window.addEventListener("resize", onResize);

return () => {
  cancelAnimationFrame(animId);
  window.removeEventListener("mousemove", onMouseMove);
  window.removeEventListener("mousedown", onMouseDown);
  window.removeEventListener("mouseup", onMouseUp);
  window.removeEventListener("touchmove", onTouchMove);
  window.removeEventListener("resize", onResize);

  if (container.contains(renderer.domElement)) {
    container.removeChild(renderer.domElement);
  }
  renderer.dispose();
  envMap.dispose();

  shardList.forEach((s) => {
    s.mesh.geometry.dispose();
    if (Array.isArray(s.mesh.material)) {
      s.mesh.material.forEach((m) => m.dispose());
    } else if (s.mesh.material) {
      s.mesh.material.dispose();
    }
  });

  bolts.forEach((b) => {
    scene.remove(b.line);
    b.line.geometry.dispose();
    (b.line.material as THREE.Material).dispose();
    scene.remove(b.travelLight);
  });

  window.removeEventListener("scroll", onScroll);
  delete (window as unknown as { __trionnBlast?: () => void }).__trionnBlast;
  try { audioCtx?.close(); } catch { }
  try { hoverAudioCtx?.close(); } catch { }
};
  }, []);

return (
  <div
    ref={containerRef}
    id="trionn-symbol-canvas-wrap"
    data-cursor-text="DRAG"
    className="fixed inset-0 w-full h-screen pointer-events-auto cursor-grab active:cursor-grabbing z-0 overflow-hidden"
    style={{ touchAction: "none" }}
  >
    <canvas
      ref={lineCanvasRef}
      id="trionn-line-canvas"
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
    />
  </div>
);
}

export default React.memo(Hero3DCanvas);

