// src/components/WaterOverlay.tsx
import { useEffect, useRef } from 'react';

const WaterOverlay = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    // ... Vertex Shader (Aynı Kalıyor) ...
    const vsSource = `
      precision mediump float;
      attribute vec2 a_position;
      varying vec2 vUv;
      void main() {
        vUv = .5 * (a_position + 1.);
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // ... Fragment Shader (Aynı kalıyor ama parametreleri küçük alan için optimize edebiliriz) ...
    // Fragment Shader: Daha dokulu, çift katmanlı su efekti
    const fsSource = `
      precision mediump float;
      varying vec2 vUv;
      uniform float u_time;
      uniform float u_ratio;

      // --- GÜRÜLTÜ FONKSİYONLARI (Standart Simplex Noise) ---
      vec3 mod289(vec3 x) { return x - floor(x * (1. / 289.)) * 289.; }
      vec2 mod289(vec2 x) { return x - floor(x * (1. / 289.)) * 289.; }
      vec3 permute(vec3 x) { return mod289(((x*34.)+1.)*x); }
      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
        vec2 i = floor(v + dot(v, C.yy));
        vec2 x0 = v - i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1., 0.) : vec2(0., 1.);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute(permute(i.y + vec3(0., i1.y, 1.)) + i.x + vec3(0., i1.x, 1.));
        vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.);
        m = m*m;
        m = m*m;
        vec3 x = 2. * fract(p * C.www) - 1.;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
        vec3 g;
        g.x = a0.x * x0.x + h.x * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130. * dot(m, g);
      }

      void main() {
        vec2 uv = vUv;
        uv.x *= u_ratio; // En-boy oranını düzelt

        float t = u_time * 0.0005; // Zaman akışı (Hız)
        
        // --- KATMAN 1: Geniş dalgalar ---
        // Hafifçe yukarı doğru akan ana kütle
        vec2 movement1 = vec2(t * 0.1, t * 0.2); 
        float noise1 = snoise(uv * 3.0 + movement1); 

        // --- KATMAN 2: İnce detaylar (Parazit) ---
        // Ters yöne akan daha sık dalgalar (Interference pattern yaratır)
        vec2 movement2 = vec2(-t * 0.15, t * 0.05);
        float noise2 = snoise(uv * 6.0 + movement2);

        // İki katmanı karıştır (Mix)
        float combinedNoise = (noise1 + noise2) * 0.5;

        // --- CAUSTICS (Işık Kırılması) EFEKTİ ---
        // Gürültünün mutlak değerini alıp ters çevirerek keskin ışık çizgileri oluştururuz
        // Bu formül suyun dibindeki ışık ağlarını taklit eder
        float light = 0.02 / abs(combinedNoise * 0.8 + 0.05);

        // Parlaklığı biraz yumuşat (Clamp)
        light = smoothstep(0.1, 1.5, light);

        // --- RENK VE DOKU ---
        // Hafif mavi/turkuaz tonu ekleyerek "su" hissini güçlendiriyoruz
        vec3 waterColor = vec3(0.85, 0.92, 1.0); // Buz mavisi beyaz
        vec3 finalColor = waterColor * light;

        // --- VIGNETTE (Kenar Yumuşatma) ---
        // Suyun sadece saatin ortasında yoğun görünmesi, kenarlarda kaybolması için
        // vUv (0-1 arası) merkezden uzaklaştıkça alpha'yı düşürür
        float dist = distance(vUv, vec2(0.5));
        float vignette = smoothstep(0.6, 0.2, dist);

        // Final Alpha
        float alpha = light * 0.5 * vignette; // 0.5 genel şeffafklık çarpanı

        gl_FragColor = vec4(finalColor, alpha);
      }
    `;

    // ... (Shader oluşturma ve derleme kodları aynı, burayı atlıyorum) ...
    // Sadece createShader, program linkleme ve render loop kısmı aynen kalsın.

    // --- KISALTMA İÇİN KOD TEKRARINI BURAYA YAZMIYORUM, ÖNCEKİ KODUN AYNISI ---
    // (createShader, program, buffers, render loop vs...)
    const createShader = (gl: WebGLRenderingContext, source: string, type: number): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) { gl.deleteShader(shader); return null; }
      return shader;
    };
    const vertexShader = createShader(gl, vsSource, gl.VERTEX_SHADER);
    const fragmentShader = createShader(gl, fsSource, gl.FRAGMENT_SHADER);
    if (!vertexShader || !fragmentShader) return;
    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);
    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uRatio = gl.getUniformLocation(program, 'u_ratio');
    let animationFrameId: number;
    const render = (time: number) => {
      if (canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight) {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
      gl.uniform1f(uTime, time);
      gl.uniform1f(uRatio, canvas.width / canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrameId);

  }, []);

  return (
    <canvas
      ref={canvasRef}
      // DEĞİŞİKLİK BURADA: fixed yerine absolute, inset-0 parent'a göre, rounded-full saate göre
      className="absolute inset-0 w-full h-full pointer-events-none z-50 rounded-full mix-blend-soft-light opacity-80"
    />
  );
};

export default WaterOverlay;
