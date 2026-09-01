import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const SOLIDS = {
  cube: { label: 'Cub — învârte-l', hint: 'Trage. Șase fețe pătrate, a × a × a.' },
  box3d: { label: 'Paralelipiped — învârte-l', hint: 'Trage. Vezi cele 6 fețe, apoi L × l × h.' },
  prism: { label: 'Prismă dreaptă — învârte-o', hint: 'Trage. Două baze identice, muchii drepte.' },
  'prism-tri': { label: 'Prismă triunghiulară — învârte-o', hint: 'Trage. Baza e un triunghi.' },
  'prism-hex': { label: 'Prismă hexagonală — învârte-o', hint: 'Trage. Baza e un hexagon.' },
  pyramid: { label: 'Piramidă — învârte-o', hint: 'Trage. Baza e jos; vârful stă deasupra.' },
  'pyramid-tri': { label: 'Piramidă triunghiulară — învârte-o', hint: 'Trage. Baza e un triunghi.' },
  tetrahedron: { label: 'Tetraedru — învârte-l', hint: 'Trage. Patru fețe triunghiuri.' },
  cylinder: { label: 'Cilindru — învârte-l', hint: 'Trage. Două cercuri, o înălțime.' },
  cone: { label: 'Con — învârte-l', hint: 'Trage. Un cerc jos, un vârf sus.' },
  frustum: { label: 'Trunchi de con — învârte-l', hint: 'Trage. Două cercuri, de raze diferite.' },
  'frustum-pyramid': { label: 'Trunchi de piramidă — învârte-l', hint: 'Trage. Două baze asemenea.' },
  sphere: { label: 'Sferă — învârte-o', hint: 'Trage. Toate punctele sunt la aceeași distanță de centru.' },
  planes: { label: 'Plan și dreaptă — învârte', hint: 'Trage. Masa e planul; creionul e dreapta.' }
};

function makeMesh(kind) {
  const paint = new THREE.MeshLambertMaterial({
    color: 0x8fd6ff,
    transparent: true,
    opacity: 0.88
  });
  const edgePaint = new THREE.LineBasicMaterial({ color: 0xb9a7ff });
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
    new THREE.MeshLambertMaterial({ color: 0xff8fa3 })
  );
  line.rotation.z = Math.PI / 2.6;
  line.position.set(0.15, 0.55, 0.1);
  scene.add(line);
}

const GeoSolid = ({ kind, caption, fallback }) => {
  const hostRef = useRef(null);
  const [failed, setFailed] = useState(false);
  const meta = SOLIDS[kind] || { label: caption || 'Corp', hint: 'Trage ca să învârți.' };

  useEffect(() => {
    const host = hostRef.current;
    if (!host || failed) return undefined;
    let renderer;
    let frame = 0;
    try {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(42, host.clientWidth / 220, 0.1, 20);
      camera.position.set(2.4, 1.5, 2.6);
      camera.lookAt(0, 0, 0);
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(host.clientWidth, 220);
      host.innerHTML = '';
      host.appendChild(renderer.domElement);

      scene.add(new THREE.AmbientLight(0xffffff, 0.55));
      const key = new THREE.DirectionalLight(0xffffff, 0.85);
      key.position.set(2, 3, 2);
      scene.add(key);
      const fill = new THREE.DirectionalLight(0xb9a7ff, 0.35);
      fill.position.set(-2, -1, 1);
      scene.add(fill);

      const group = new THREE.Group();
      group.add(makeMesh(kind));
      if (kind === 'planes') addPlaneExtras(group);
      scene.add(group);

      const spin = { x: 0.35, y: 0.7, dragging: false, lastX: 0, lastY: 0 };
      const canvas = renderer.domElement;
      canvas.style.touchAction = 'none';
      canvas.style.cursor = 'grab';
      canvas.setAttribute('aria-label', meta.label);

      const onDown = event => {
        spin.dragging = true;
        spin.lastX = event.clientX;
        spin.lastY = event.clientY;
        canvas.style.cursor = 'grabbing';
        canvas.setPointerCapture?.(event.pointerId);
      };
      const onMove = event => {
        if (!spin.dragging) return;
        spin.y += (event.clientX - spin.lastX) * 0.012;
        spin.x += (event.clientY - spin.lastY) * 0.012;
        spin.x = Math.max(-1.2, Math.min(1.2, spin.x));
        spin.lastX = event.clientX;
        spin.lastY = event.clientY;
      };
      const onUp = () => {
        spin.dragging = false;
        canvas.style.cursor = 'grab';
      };
      canvas.addEventListener('pointerdown', onDown);
      canvas.addEventListener('pointermove', onMove);
      canvas.addEventListener('pointerup', onUp);
      canvas.addEventListener('pointerleave', onUp);

      const tick = () => {
        if (!spin.dragging) spin.y += 0.004;
        group.rotation.x = spin.x;
        group.rotation.y = spin.y;
        renderer.render(scene, camera);
        frame = requestAnimationFrame(tick);
      };
      tick();

      const onResize = () => {
        if (!host.clientWidth) return;
        camera.aspect = host.clientWidth / 220;
        camera.updateProjectionMatrix();
        renderer.setSize(host.clientWidth, 220);
      };
      window.addEventListener('resize', onResize);

      return () => {
        cancelAnimationFrame(frame);
        window.removeEventListener('resize', onResize);
        canvas.removeEventListener('pointerdown', onDown);
        canvas.removeEventListener('pointermove', onMove);
        canvas.removeEventListener('pointerup', onUp);
        canvas.removeEventListener('pointerleave', onUp);
        renderer.dispose();
        host.innerHTML = '';
      };
    } catch {
      setFailed(true);
      return undefined;
    }
  }, [kind, failed, meta.label]);

  if (failed && fallback) {
    return (
      <figure className="geo-figure">
        <div className="geo-figure-canvas">{fallback}</div>
        <figcaption>{caption || meta.label}</figcaption>
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
