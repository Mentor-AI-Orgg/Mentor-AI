import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { acquire, release } from './geo/webglBudget.js';

const SOLIDS = {
  cube: { label: 'Cub, desen 3D', hint: 'Trage orizontal. Șase fețe pătrate, a × a × a.' },
  box3d: { label: 'Paralelipiped, desen 3D', hint: 'Trage orizontal. Vezi cele 6 fețe, apoi L × l × h.' },
  prism: { label: 'Prismă dreaptă, desen 3D', hint: 'Trage orizontal. Două baze identice, muchii drepte.' },
  'prism-tri': { label: 'Prismă triunghiulară, desen 3D', hint: 'Trage orizontal. Baza e un triunghi.' },
  'prism-hex': { label: 'Prismă hexagonală, desen 3D', hint: 'Trage orizontal. Baza e un hexagon.' },
  pyramid: { label: 'Piramidă patrulateră regulată, desen 3D', hint: 'Trage orizontal. Baza e jos; vârful stă deasupra.' },
  'pyramid-tri': { label: 'Piramidă triunghiulară, desen 3D', hint: 'Trage orizontal. Baza e un triunghi.' },
  tetrahedron: { label: 'Tetraedru, desen 3D', hint: 'Trage orizontal. Patru fețe triunghiuri.' },
  cylinder: { label: 'Cilindru, desen 3D', hint: 'Trage orizontal. Două cercuri, o înălțime.' },
  cone: { label: 'Con, desen 3D', hint: 'Trage orizontal. Un cerc jos, un vârf sus.' },
  frustum: { label: 'Trunchi de con, desen 3D', hint: 'Trage orizontal. Două cercuri, de raze diferite.' },
  'frustum-pyramid': { label: 'Trunchi de piramidă, desen 3D', hint: 'Trage orizontal. Două baze asemenea.' },
  sphere: { label: 'Sferă, desen 3D', hint: 'Trage orizontal. Toate punctele sunt la aceeași distanță de centru.' },
  planes: { label: 'Plan și dreaptă, desen 3D', hint: 'Trage orizontal. Masa e planul; creionul e dreapta.' }
};

function cssHex(name, fallback) {
  if (typeof document === 'undefined' || typeof getComputedStyle !== 'function') return fallback;
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return /^#[0-9a-fA-F]{6}$/.test(value) ? value : fallback;
}

function motionStopped() {
  if (typeof document !== 'undefined' && document.documentElement.dataset.motion === 'off') return true;
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function displayQuality() {
  const memory = typeof navigator === 'undefined' ? 0 : Number(navigator.deviceMemory) || 0;
  const cores = typeof navigator === 'undefined' ? 0 : Number(navigator.hardwareConcurrency) || 0;
  const weak = (memory && memory <= 2) || (cores && cores <= 4);
  const ratio = Math.min((typeof window !== 'undefined' && window.devicePixelRatio) || 1, weak ? 1.5 : 2);
  return { ratio, antialias: !weak };
}

function makeMesh(kind, fillHex, edgeHex) {
  const paint = new THREE.MeshLambertMaterial({
    color: new THREE.Color(fillHex),
    transparent: true,
    opacity: 0.88
  });
  const edgePaint = new THREE.LineBasicMaterial({ color: new THREE.Color(edgeHex) });
  let geometry;
  if (kind === 'pyramid') geometry = new THREE.ConeGeometry(1.05, 1.55, 4);
  else if (kind === 'pyramid-tri') geometry = new THREE.ConeGeometry(1.05, 1.55, 3);
  else if (kind === 'tetrahedron') geometry = new THREE.TetrahedronGeometry(1.15);
  else if (kind === 'cylinder') geometry = new THREE.CylinderGeometry(0.72, 0.72, 1.55, 28);
  else if (kind === 'cone') geometry = new THREE.ConeGeometry(0.88, 1.65, 28);
  else if (kind === 'frustum') geometry = new THREE.CylinderGeometry(0.42, 0.88, 1.45, 28);
  else if (kind === 'frustum-pyramid') geometry = new THREE.CylinderGeometry(0.45, 0.95, 1.4, 4);
  else if (kind === 'sphere') geometry = new THREE.SphereGeometry(0.95, 32, 22);
  else if (kind === 'planes') geometry = new THREE.BoxGeometry(2.1, 0.06, 1.4);
  else if (kind === 'prism-tri') geometry = new THREE.CylinderGeometry(0.95, 0.95, 1.45, 3);
  else if (kind === 'prism-hex') geometry = new THREE.CylinderGeometry(0.88, 0.88, 1.4, 6);
  else if (kind === 'box3d' || kind === 'prism') geometry = new THREE.BoxGeometry(1.7, 1.05, 1.2);
  else geometry = new THREE.BoxGeometry(1.35, 1.35, 1.35);

  const mesh = new THREE.Mesh(geometry, paint);
  if (kind === 'pyramid' || kind === 'frustum-pyramid') mesh.rotation.y = Math.PI / 4;
  if (kind === 'pyramid-tri' || kind === 'prism-tri') mesh.rotation.y = Math.PI / 6;
  const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geometry), edgePaint);
  mesh.add(edges);
  return mesh;
}

function addPlaneExtras(scene) {
  const line = new THREE.Mesh(
    new THREE.CylinderGeometry(0.035, 0.035, 2.1, 10),
    new THREE.MeshLambertMaterial({ color: new THREE.Color(cssHex('--danger', '#FF6B6B')) })
  );
  line.rotation.z = Math.PI / 2.6;
  line.position.set(0.15, 0.55, 0.1);
  scene.add(line);
}

function disposeScene(scene) {
  scene.traverse(object => {
    if (object.geometry) object.geometry.dispose();
    const materials = object.material ? [].concat(object.material) : [];
    materials.forEach(material => material.dispose && material.dispose());
  });
}

const GeoSolid = ({ id, kind, caption, fallback, onLost, onEvict }) => {
  const hostRef = useRef(null);
  const onLostRef = useRef(onLost);
  const onEvictRef = useRef(onEvict);
  onLostRef.current = onLost;
  onEvictRef.current = onEvict;
  const [failed, setFailed] = useState(false);
  const meta = SOLIDS[kind] || { label: caption || 'Corp, desen 3D', hint: 'Trage orizontal ca să învârți.' };

  useEffect(() => {
    acquire(id || kind, () => onEvictRef.current?.());
    return () => release(id || kind);
  }, [id, kind]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || failed) return undefined;
    let renderer;
    let frame = 0;
    let running = false;
    let onScreen = true;
    const disposables = [];
    try {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(42, Math.max(host.clientWidth, 1) / 220, 0.1, 20);
      camera.position.set(2.4, 1.5, 2.6);
      camera.lookAt(0, 0, 0);
      const quality = displayQuality();
      renderer = new THREE.WebGLRenderer({ antialias: quality.antialias, alpha: true });
      renderer.setPixelRatio(quality.ratio);
      renderer.setSize(host.clientWidth || 320, 220);
      host.innerHTML = '';
      host.appendChild(renderer.domElement);

      const fillHex = cssHex('--primary', '#44D6D7');
      const edgeHex = cssHex('--surface-2', '#0F2A52');
      scene.add(new THREE.AmbientLight(0xffffff, 0.55));
      const key = new THREE.DirectionalLight(0xffffff, 0.85);
      key.position.set(2, 3, 2);
      scene.add(key);
      const fill = new THREE.DirectionalLight(new THREE.Color(edgeHex), 0.35);
      fill.position.set(-2, -1, 1);
      scene.add(fill);

      const group = new THREE.Group();
      group.add(makeMesh(kind, fillHex, edgeHex));
      if (kind === 'planes') addPlaneExtras(group);
      scene.add(group);

      const spin = { x: 0.35, y: 0.7, dragging: false, armed: false, startX: 0, startY: 0, lastX: 0, lastY: 0 };
      const canvas = renderer.domElement;
      canvas.style.touchAction = 'pan-y';
      canvas.style.cursor = 'grab';
      canvas.tabIndex = 0;
      canvas.setAttribute('role', 'img');
      canvas.setAttribute('aria-label', caption || meta.label);
      const reduced = motionStopped();

      const draw = () => {
        group.rotation.x = spin.x;
        group.rotation.y = spin.y;
        renderer.render(scene, camera);
      };
      const stop = () => {
        running = false;
        cancelAnimationFrame(frame);
      };
      const start = () => {
        if (running || reduced || document.visibilityState === 'hidden' || !onScreen) return;
        running = true;
        const tick = () => {
          if (!running) return;
          if (!spin.dragging) spin.y += 0.004;
          draw();
          frame = requestAnimationFrame(tick);
        };
        tick();
      };

      const onDown = event => {
        if (!event.isPrimary) return;
        spin.armed = true;
        spin.startX = event.clientX;
        spin.startY = event.clientY;
        spin.lastX = event.clientX;
        spin.lastY = event.clientY;
      };
      const onMove = event => {
        if (!event.isPrimary || !spin.armed) return;
        const dx = event.clientX - spin.startX;
        const dy = event.clientY - spin.startY;
        if (!spin.dragging) {
          if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
          if (Math.abs(dx) <= Math.abs(dy)) return;
          spin.dragging = true;
          canvas.setPointerCapture?.(event.pointerId);
          canvas.style.cursor = 'grabbing';
          stop();
        }
        spin.y += (event.clientX - spin.lastX) * 0.012;
        spin.x += (event.clientY - spin.lastY) * 0.012;
        spin.x = Math.max(-1.2, Math.min(1.2, spin.x));
        spin.lastX = event.clientX;
        spin.lastY = event.clientY;
        draw();
      };
      const onUp = () => {
        spin.dragging = false;
        spin.armed = false;
        canvas.style.cursor = 'grab';
        if (!reduced) start();
        else draw();
      };
      const onKey = event => {
        if (event.key === 'ArrowLeft') spin.y -= 0.12;
        else if (event.key === 'ArrowRight') spin.y += 0.12;
        else return;
        event.preventDefault();
        draw();
      };
      const onLostContext = event => {
        event.preventDefault();
        onLostRef.current?.();
      };
      canvas.addEventListener('pointerdown', onDown);
      canvas.addEventListener('pointermove', onMove);
      canvas.addEventListener('pointerup', onUp);
      canvas.addEventListener('pointercancel', onUp);
      canvas.addEventListener('keydown', onKey);
      canvas.addEventListener('webglcontextlost', onLostContext);
      disposables.push(() => {
        canvas.removeEventListener('pointerdown', onDown);
        canvas.removeEventListener('pointermove', onMove);
        canvas.removeEventListener('pointerup', onUp);
        canvas.removeEventListener('pointercancel', onUp);
        canvas.removeEventListener('keydown', onKey);
        canvas.removeEventListener('webglcontextlost', onLostContext);
      });

      const onVisibility = () => {
        if (document.visibilityState === 'hidden') stop();
        else if (!reduced) start();
        else draw();
      };
      document.addEventListener('visibilitychange', onVisibility);
      disposables.push(() => document.removeEventListener('visibilitychange', onVisibility));

      const resize = () => {
        const width = host.clientWidth || 320;
        camera.aspect = width / 220;
        camera.updateProjectionMatrix();
        renderer.setSize(width, 220);
        draw();
      };
      const observer = new ResizeObserver(resize);
      observer.observe(host);
      disposables.push(() => observer.disconnect());

      const seen = new IntersectionObserver(([entry]) => {
        onScreen = Boolean(entry && entry.isIntersecting);
        if (!onScreen) stop();
        else if (!reduced && !spin.dragging) start();
        else draw();
      });
      seen.observe(host);
      disposables.push(() => seen.disconnect());

      draw();
      if (!reduced) start();

      return () => {
        stop();
        disposables.forEach(fn => fn());
        disposeScene(scene);
        renderer.dispose();
        renderer.forceContextLoss();
        if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
        host.innerHTML = '';
      };
    } catch {
      setFailed(true);
      return undefined;
    }
  }, [kind, failed, meta.label, caption]);

  if (failed && fallback) {
    return (
      <figure className="geo-figure">
        <div className="geo-figure-canvas">{fallback}</div>
        <figcaption>{caption || meta.label}</figcaption>
        <p className="geo-figure-info">Desenul 3D s-a oprit. Încearcă din nou.</p>
      </figure>
    );
  }

  return (
    <figure className="geo-figure geo-solid">
      <div className="geo-solid-stage" ref={hostRef} />
      <figcaption>
        <strong>{caption || meta.label}</strong>
        <small>{meta.hint}</small>
      </figcaption>
    </figure>
  );
};

export default GeoSolid;
export { SOLIDS };
