const hexToVec3 = hex => {
  const h = hex.replace('#', '');
  return [
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255
  ];
};

const LINEWAVES_VERTEX = `attribute vec2 position; void main(){ gl_Position = vec4(position, 0.0, 1.0); }`;

const LINEWAVES_FRAGMENT = `precision highp float;

uniform float uTime;
uniform vec3 uResolution;
uniform float uSpeed;
uniform float uInnerLines;
uniform float uOuterLines;
uniform float uWarpIntensity;
uniform float uRotation;
uniform float uEdgeFadeWidth;
uniform float uColorCycleSpeed;
uniform float uBrightness;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec2 uMouse;
uniform float uMouseInfluence;
uniform bool uEnableMouse;

#define HALF_PI 1.5707963

float hashF(float n) { return fract(sin(n * 127.1) * 43758.5453123); }

float smoothNoise(float x) {
  float i = floor(x);
  float f = fract(x);
  float u = f * f * (3.0 - 2.0 * f);
  return mix(hashF(i), hashF(i + 1.0), u);
}

float displaceA(float coord, float t) {
  float result = sin(coord * 2.123) * 0.2;
  result += sin(coord * 3.234 + t * 4.345) * 0.1;
  result += sin(coord * 0.589 + t * 0.934) * 0.5;
  return result;
}

float displaceB(float coord, float t) {
  float result = sin(coord * 1.345) * 0.3;
  result += sin(coord * 2.734 + t * 3.345) * 0.2;
  result += sin(coord * 0.189 + t * 0.934) * 0.3;
  return result;
}

vec2 rotate2D(vec2 p, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  return vec2(p.x * c - p.y * s, p.x * s + p.y * c);
}

void main() {
  vec2 coords = gl_FragCoord.xy / uResolution.xy;
  coords = coords * 2.0 - 1.0;
  coords = rotate2D(coords, uRotation);

  float halfT = uTime * uSpeed * 0.5;
  float fullT = uTime * uSpeed;

  float mouseWarp = 0.0;
  if (uEnableMouse) {
    vec2 mPos = rotate2D(uMouse * 2.0 - 1.0, uRotation);
    float mDist = length(coords - mPos);
    mouseWarp = uMouseInfluence * exp(-mDist * mDist * 4.0);
  }

  float warpAx = coords.x + displaceA(coords.y, halfT) * uWarpIntensity + mouseWarp;
  float warpAy = coords.y - displaceA(coords.x * cos(fullT) * 1.235, halfT) * uWarpIntensity;
  float warpBx = coords.x + displaceB(coords.y, halfT) * uWarpIntensity + mouseWarp;
  float warpBy = coords.y - displaceB(coords.x * sin(fullT) * 1.235, halfT) * uWarpIntensity;

  vec2 fieldA = vec2(warpAx, warpAy);
  vec2 fieldB = vec2(warpBx, warpBy);
  vec2 blended = mix(fieldA, fieldB, mix(fieldA, fieldB, 0.5));

  float fadeTop = smoothstep(uEdgeFadeWidth, uEdgeFadeWidth + 0.4, blended.y);
  float fadeBottom = smoothstep(-uEdgeFadeWidth, -(uEdgeFadeWidth + 0.4), blended.y);
  float vMask = 1.0 - max(fadeTop, fadeBottom);

  float tileCount = mix(uOuterLines, uInnerLines, vMask);
  float scaledY = blended.y * tileCount;
  float nY = smoothNoise(abs(scaledY));

  float streamY = blended.y + fullT * 0.14;
  float streamX = blended.x + sin(streamY * 2.4 + fullT * 0.34) * 0.05;
  float bandCount = 8.0;
  float stripePosition = fract((streamY + streamX * 0.16) * bandCount);
  float stripeCore = smoothstep(0.08, 0.18, stripePosition) * (1.0 - smoothstep(0.82, 0.92, stripePosition));
  float trace = smoothstep(0.4, 0.9, stripeCore);
  float ridge = smoothstep(0.85, 1.0, stripeCore);

  float pattern = vMask * (trace * 0.7 + ridge * 0.15);

  float cycleT = fullT * uColorCycleSpeed;
  float rChannel = (pattern + ridge * 0.1) * (cos(blended.y + cycleT * 0.18) * 0.5 + 1.0);
  float gChannel = (pattern + trace * 0.04) * (sin(streamX + cycleT * 1.08) * 0.5 + 1.0);
  float bChannel = (pattern + ridge * 0.08) * (cos(streamY + cycleT * 0.26) * 0.5 + 1.0);

  vec3 col = (rChannel * uColor1 + gChannel * uColor2 + bChannel * uColor3) * uBrightness;
  float alpha = clamp(length(col), 0.0, 1.0);

  gl_FragColor = vec4(col, alpha);
}`;

const LineWaves = ({
  speed = 0.25,
  innerLineCount = 32.0,
  outerLineCount = 36.0,
  warpIntensity = 1.0,
  rotation = -45,
  edgeFadeWidth = 0.05,
  colorCycleSpeed = 0.8,
  brightness = 0.22,
  color1 = '#b9a7ff',
  color2 = '#6fd7ff',
  color3 = '#5a4fcf',
  enableMouseInteraction = true,
  mouseInfluence = 1.1
}) => {
  const containerRef = React.useRef(null);
  const [supported, setSupported] = React.useState(true);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const canvas = document.createElement('canvas');
    canvas.className = 'line-waves-canvas';
    const gl =
      canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false, antialias: false }) ||
      canvas.getContext('experimental-webgl', { alpha: true, premultipliedAlpha: false, antialias: false });

    if (!gl) {
      setSupported(false);
      return undefined;
    }

    const compile = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.warn('LineWaves shader compile error:', gl.getShaderInfoLog(shader));
        return null;
      }
      return shader;
    };

    const vertexShader = compile(gl.VERTEX_SHADER, LINEWAVES_VERTEX);
    const fragmentShader = compile(gl.FRAGMENT_SHADER, LINEWAVES_FRAGMENT);
    if (!vertexShader || !fragmentShader) {
      setSupported(false);
      return undefined;
    }

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn('LineWaves program link error:', gl.getProgramInfoLog(program));
      setSupported(false);
      return undefined;
    }

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    const positionLoc = gl.getAttribLocation(program, 'position');

    const uniforms = {
      uTime: gl.getUniformLocation(program, 'uTime'),
      uResolution: gl.getUniformLocation(program, 'uResolution'),
      uSpeed: gl.getUniformLocation(program, 'uSpeed'),
      uInnerLines: gl.getUniformLocation(program, 'uInnerLines'),
      uOuterLines: gl.getUniformLocation(program, 'uOuterLines'),
      uWarpIntensity: gl.getUniformLocation(program, 'uWarpIntensity'),
      uRotation: gl.getUniformLocation(program, 'uRotation'),
      uEdgeFadeWidth: gl.getUniformLocation(program, 'uEdgeFadeWidth'),
      uColorCycleSpeed: gl.getUniformLocation(program, 'uColorCycleSpeed'),
      uBrightness: gl.getUniformLocation(program, 'uBrightness'),
      uColor1: gl.getUniformLocation(program, 'uColor1'),
      uColor2: gl.getUniformLocation(program, 'uColor2'),
      uColor3: gl.getUniformLocation(program, 'uColor3'),
      uMouse: gl.getUniformLocation(program, 'uMouse'),
      uMouseInfluence: gl.getUniformLocation(program, 'uMouseInfluence'),
      uEnableMouse: gl.getUniformLocation(program, 'uEnableMouse')
    };

    const rotationRad = (rotation * Math.PI) / 180;
    const col1 = hexToVec3(color1);
    const col2 = hexToVec3(color2);
    const col3 = hexToVec3(color3);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);

    let currentMouse = [0.5, 0.5];
    let targetMouse = [0.5, 0.5];

    const handleMouseMove = e => {
      const rect = canvas.getBoundingClientRect();
      targetMouse = [(e.clientX - rect.left) / rect.width, 1.0 - (e.clientY - rect.top) / rect.height];
    };
    const handleMouseLeave = () => {
      targetMouse = [0.5, 0.5];
    };

    if (enableMouseInteraction) {
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseleave', handleMouseLeave);
    }

    const resize = () => {
      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    let frame = 0;
    const render = now => {
      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.enableVertexAttribArray(positionLoc);
      gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

      gl.uniform1f(uniforms.uTime, now * 0.001);
      gl.uniform3f(uniforms.uResolution, canvas.width, canvas.height, canvas.width / canvas.height);
      gl.uniform1f(uniforms.uSpeed, speed);
      gl.uniform1f(uniforms.uInnerLines, innerLineCount);
      gl.uniform1f(uniforms.uOuterLines, outerLineCount);
      gl.uniform1f(uniforms.uWarpIntensity, warpIntensity);
      gl.uniform1f(uniforms.uRotation, rotationRad);
      gl.uniform1f(uniforms.uEdgeFadeWidth, edgeFadeWidth);
      gl.uniform1f(uniforms.uColorCycleSpeed, colorCycleSpeed);
      gl.uniform1f(uniforms.uBrightness, brightness);
      gl.uniform3f(uniforms.uColor1, col1[0], col1[1], col1[2]);
      gl.uniform3f(uniforms.uColor2, col2[0], col2[1], col2[2]);
      gl.uniform3f(uniforms.uColor3, col3[0], col3[1], col3[2]);
      gl.uniform1f(uniforms.uMouseInfluence, mouseInfluence);
      gl.uniform1i(uniforms.uEnableMouse, enableMouseInteraction ? 1 : 0);

      if (enableMouseInteraction) {
        currentMouse[0] += 0.05 * (targetMouse[0] - currentMouse[0]);
        currentMouse[1] += 0.05 * (targetMouse[1] - currentMouse[1]);
        gl.uniform2f(uniforms.uMouse, currentMouse[0], currentMouse[1]);
      } else {
        gl.uniform2f(uniforms.uMouse, 0.5, 0.5);
      }

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      frame = requestAnimationFrame(render);
    };

    const handleContextLost = event => {
      event.preventDefault();
      cancelAnimationFrame(frame);
      setSupported(false);
    };
    canvas.addEventListener('webglcontextlost', handleContextLost, false);

    container.appendChild(canvas);
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      if (enableMouseInteraction) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (canvas.parentElement === container) container.removeChild(canvas);
      gl.deleteProgram(program);
      gl.deleteBuffer(buffer);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [speed, innerLineCount, outerLineCount, warpIntensity, rotation, edgeFadeWidth, colorCycleSpeed, brightness, color1, color2, color3, enableMouseInteraction, mouseInfluence]);

  if (!supported) {
    return <div className="darkveil-fallback" aria-hidden="true" />;
  }

  return <div ref={containerRef} className="line-waves-container" />;
};

window.LineWaves = LineWaves;
