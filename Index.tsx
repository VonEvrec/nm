<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dana N'kassa</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    :root {
      --glass-bg: rgba(255, 255, 255, 0.08);
      --glass-border: rgba(255, 255, 255, 0.12);
      --text-primary: #f5f5f7;
      --text-secondary: #86868b;
      --accent: #007aff;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
      background: #000;
      color: var(--text-primary);
      line-height: 1.47059;
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
      opacity: 0;
      animation: fadeIn 1.4s cubic-bezier(0.28, 0, 0.21, 1) 0.2s forwards;
    }

    @keyframes fadeIn { to { opacity: 1; } }

    /* === Liquid Glass Visualizer === */
    .visualizer {
      position: fixed;
      inset: 0;
      z-index: 0;
      pointer-events: none;
    }

    #glCanvas {
      width: 100%;
      height: 100%;
      opacity: 0;
      filter: blur(120px) saturate(200%);
      mix-blend-mode: screen;
      animation: vizEntry 2.5s cubic-bezier(0.28, 0, 0.21, 1) 0.8s forwards;
    }

    @keyframes vizEntry { to { opacity: 0.45; } }

    .glass-ambient {
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at 50% 50%, 
        rgba(0, 122, 255, 0.12), 
        rgba(88, 86, 214, 0.08) 40%, 
        transparent 70%);
      filter: blur(100px);
      animation: pulse 8s ease-in-out infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 0.6; transform: scale(1); }
      50% { opacity: 0.85; transform: scale(1.05); }
    }

    /* === Header === */
    header {
      position: relative;
      z-index: 100;
      padding: 48px 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      backdrop-filter: blur(60px) saturate(180%);
      background: rgba(0, 0, 0, 0.72);
      border-bottom: 0.5px solid var(--glass-border);
      animation: slideDown 1.2s cubic-bezier(0.28, 0, 0.21, 1) 0.4s backwards;
    }

    @keyframes slideDown { from { transform: translateY(-100%); opacity: 0; } }

    .brand {
      font-size: 2.125rem;
      font-weight: 700;
      letter-spacing: -0.05em;
      background: linear-gradient(180deg, #f5f5f7, #86868b);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .contact {
      font-size: 0.9375rem;
      color: var(--accent);
      text-decoration: none;
      transition: opacity 0.3s;
    }

    .contact:hover { opacity: 0.7; }

    /* === Main === */
    main {
      position: relative;
      z-index: 10;
      max-width: 1000px;
      margin: 0 auto;
      padding: 80px 40px 120px;
    }

    /* === Liquid Glass Cards === */
    .track-grid {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .card {
      backdrop-filter: blur(60px) saturate(180%);
      background: var(--glass-bg);
      border: 0.5px solid var(--glass-border);
      border-radius: 20px;
      overflow: hidden;
      transition: all 0.5s cubic-bezier(0.28, 0, 0.21, 1);
      animation: cardEntry 1s cubic-bezier(0.28, 0, 0.21, 1) calc(0.6s + var(--delay) * 0.05s) backwards;
    }

    @keyframes cardEntry {
      from { opacity: 0; transform: translateY(30px) scale(0.98); }
    }

    .card:hover {
      background: rgba(255, 255, 255, 0.12);
      border-color: rgba(255, 255, 255, 0.18);
      transform: translateY(-4px) scale(1.01);
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    }

    .card.playing {
      background: rgba(0, 122, 255, 0.15);
      border-color: rgba(0, 122, 255, 0.4);
    }

    .header {
      padding: 28px 32px;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      user-select: none;
    }

    .title {
      font-size: 1.375rem;
      font-weight: 600;
      letter-spacing: -0.03em;
      transition: color 0.3s;
    }

    .header:hover .title { color: var(--accent); }

    .indicator {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--text-secondary);
      opacity: 0.5;
      transition: all 0.4s;
    }

    .card.playing .indicator {
      background: var(--accent);
      box-shadow: 0 0 20px rgba(0, 122, 255, 0.8);
      opacity: 1;
      animation: glow 2s ease-in-out infinite;
    }

    @keyframes glow {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.4); opacity: 0.7; }
    }

    /* === Player === */
    .player-wrap {
      max-height: 0;
      overflow: hidden;
      opacity: 0;
      transition: all 0.6s cubic-bezier(0.28, 0, 0.21, 1);
    }

    .card.active .player-wrap {
      max-height: 240px;
      opacity: 1;
      padding: 0 32px 32px;
    }

    .player {
      backdrop-filter: blur(80px) saturate(200%);
      background: rgba(0, 0, 0, 0.5);
      border: 0.5px solid rgba(255, 255, 255, 0.15);
      border-radius: 16px;
      padding: 28px;
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .play-btn {
      width: 52px;
      height: 52px;
      border: none;
      background: linear-gradient(135deg, #007aff, #0051d5);
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      box-shadow: 0 8px 24px rgba(0, 122, 255, 0.4);
      transition: all 0.25s cubic-bezier(0.28, 0, 0.21, 1);
      position: relative;
    }

    .play-btn:hover {
      transform: scale(1.08);
      box-shadow: 0 12px 32px rgba(0, 122, 255, 0.6);
    }

    .play-btn:active { transform: scale(0.95); }

    .play-icon, .pause-icon {
      position: absolute;
      color: white;
      font-size: 18px;
      transition: all 0.2s;
    }

    .play-icon { opacity: 1; transform: translateX(1px); }
    .pause-icon { opacity: 0; transform: scale(0.6); }
    .play-btn.playing .play-icon { opacity: 0; transform: scale(0.6); }
    .play-btn.playing .pause-icon { opacity: 1; transform: scale(1); }

    .controls {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .progress {
      width: 100%;
      height: 6px;
      background: rgba(255, 255, 255, 0.18);
      border-radius: 3px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: height 0.2s;
    }

    .progress:hover { height: 8px; }

    .fill {
      height: 100%;
      background: linear-gradient(90deg, #007aff, #5856d6);
      border-radius: 3px;
      width: 0%;
      transition: width 0.05s linear;
      position: relative;
    }

    .fill::after {
      content: '';
      position: absolute;
      right: -8px;
      top: 50%;
      transform: translateY(-50%);
      width: 16px;
      height: 16px;
      background: white;
      border-radius: 50%;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      opacity: 0;
      transition: opacity 0.2s;
    }

    .progress:hover .fill::after { opacity: 1; }

    .time {
      display: flex;
      justify-content: space-between;
      font-size: 0.8125rem;
      color: var(--text-secondary);
      font-variant-numeric: tabular-nums;
    }

    .loop-btn {
      width: 40px;
      height: 40px;
      border: 0.5px solid rgba(255, 255, 255, 0.15);
      background: transparent;
      border-radius: 50%;
      color: var(--text-secondary);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      font-size: 18px;
      transition: all 0.3s;
    }

    .loop-btn:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.3);
    }

    .loop-btn.active {
      background: rgba(0, 122, 255, 0.25);
      border-color: var(--accent);
      color: var(--accent);
      transform: rotate(360deg);
    }

    footer {
      position: relative;
      z-index: 10;
      text-align: center;
      padding: 60px 40px;
      font-size: 0.875rem;
      color: var(--text-secondary);
      border-top: 0.5px solid var(--glass-border);
      backdrop-filter: blur(40px);
    }

    @media (max-width: 768px) {
      header { padding: 32px 24px; flex-direction: column; gap: 16px; align-items: flex-start; }
      .brand { font-size: 1.75rem; }
      main { padding: 60px 24px 100px; }
      .header { padding: 24px; }
      .title { font-size: 1.125rem; }
      .card.active .player-wrap { padding: 0 24px 24px; }
      .player { padding: 20px; }
      .play-btn { width: 56px; height: 56px; }
    }
  </style>
</head>
<body>
  <div class="visualizer">
    <canvas id="glCanvas"></canvas>
    <div class="glass-ambient"></div>
  </div>

  <header>
    <h1 class="brand">DANA N'KASSA</h1>
    <a href="mailto:contact.danankassa@gmail.com" class="contact">contact.danankassa@gmail.com</a>
  </header>

  <main><div class="track-grid"></div></main>

  <footer>© 2025 Dana N'kassa. All rights reserved.</footer>

  <script>
    const tracks = ['NM-205','NM-209','NM-208','NM-197','NM-153','NM-155','NM-157','NM-156','NM-158','NM-120','NM-092','NM-087','NM-046','NM-027','NM-044','NM-042','NM-064','NM-084','NM-079','NM-073','NM-072','NM-020','NM-037'];

    // === WebGL Circular Visualizer ===
    const canvas = document.getElementById('glCanvas');
    const gl = canvas.getContext('webgl');
    
    if (gl) {
      const vs = `attribute vec2 a_pos; void main() { gl_Position = vec4(a_pos, 0.0, 1.0); gl_PointSize = 1.5; }`;
      const fs = `precision mediump float; uniform vec3 u_col; void main() { gl_FragColor = vec4(u_col, 0.8); }`;
      
      const createShader = (type, src) => {
        const s = gl.createShader(type);
        gl.shaderSource(s, src);
        gl.compileShader(s);
        return s;
      };

      const prog = gl.createProgram();
      gl.attachShader(prog, createShader(gl.VERTEX_SHADER, vs));
      gl.attachShader(prog, createShader(gl.FRAGMENT_SHADER, fs));
      gl.linkProgram(prog);
      gl.useProgram(prog);

      const posLoc = gl.getAttribLocation(prog, 'a_pos');
      const colLoc = gl.getUniformLocation(prog, 'u_col');
      const posBuf = gl.createBuffer();
      
      gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
      gl.enableVertexAttribArray(posLoc);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

      let ctx, analyser, dataArr, bufLen;

      const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
      };
      resize();
      window.addEventListener('resize', resize);

      const initAudio = (audio) => {
        if (!ctx) {
          ctx = new (window.AudioContext || window.webkitAudioContext)();
          analyser = ctx.createAnalyser();
          analyser.fftSize = 256;
          bufLen = analyser.frequencyBinCount;
          dataArr = new Uint8Array(bufLen);
        }
        const src = ctx.createMediaElementSource(audio);
        src.connect(analyser);
        analyser.connect(ctx.destination);
      };

      const draw = () => {
        if (analyser) analyser.getByteFrequencyData(dataArr);
        
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);

        if (!dataArr) {
          requestAnimationFrame(draw);
          return;
        }

        const pos = [];
        const numPts = bufLen;
        
        for (let i = 0; i < numPts; i++) {
          const amp = dataArr[i] / 255;
          const ang = (i / numPts) * Math.PI * 2;
          const rad = 0.3 + amp * 0.5;
          pos.push(Math.cos(ang) * rad, Math.sin(ang) * rad);
        }

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pos), gl.DYNAMIC_DRAW);

        const avgFreq = dataArr.reduce((a, b) => a + b, 0) / dataArr.length / 255;
        gl.uniform3f(colLoc, avgFreq * 0.5 + 0.55, 0.4 + avgFreq * 0.4, 1);

        gl.drawArrays(gl.LINE_LOOP, 0, numPts);
        requestAnimationFrame(draw);
      };
      draw();

      // === Player ===
      const grid = document.querySelector('.track-grid');
      let activeAudio = null;

      tracks.forEach((name, i) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.setProperty('--delay', i);
        card.innerHTML = `
          <div class="header">
            <h2 class="title">${name}</h2>
            <div class="indicator"></div>
          </div>
          <div class="player-wrap">
            <div class="player">
              <button class="play-btn"><span class="play-icon">▶</span><span class="pause-icon">❚❚</span></button>
              <div class="controls">
                <div class="progress"><div class="fill"></div></div>
                <div class="time"><span class="curr">0:00</span><span class="total">0:00</span></div>
              </div>
              <button class="loop-btn">⟲</button>
              <audio preload="metadata"></audio>
            </div>
          </div>
        `;
        grid.appendChild(card);

        const header = card.querySelector('.header');
        const audio = card.querySelector('audio');
        const playBtn = card.querySelector('.play-btn');
        const progress = card.querySelector('.progress');
        const fill = card.querySelector('.fill');
        const curr = card.querySelector('.curr');
        const total = card.querySelector('.total');
        const loopBtn = card.querySelector('.loop-btn');

        audio.src = `${name}.mp3`;

        header.onclick = () => {
          const isActive = card.classList.contains('active');
          document.querySelectorAll('.card').forEach(c => {
            if (c !== card) {
              c.classList.remove('active');
              const a = c.querySelector('audio');
              if (a && !a.paused) {
                a.pause();
                c.querySelector('.play-btn').classList.remove('playing');
                c.classList.remove('playing');
              }
            }
          });
          card.classList.toggle('active', !isActive);
        };

        playBtn.onclick = (e) => {
          e.stopPropagation();
          if (audio.paused) {
            document.querySelectorAll('audio').forEach(a => {
              if (a !== audio && !a.paused) {
                a.pause();
                a.closest('.card').querySelector('.play-btn').classList.remove('playing');
                a.closest('.card').classList.remove('playing');
              }
            });
            audio.play().then(() => {
              playBtn.classList.add('playing');
              card.classList.add('playing');
              if (!activeAudio) initAudio(audio);
              activeAudio = audio;
            });
          } else {
            audio.pause();
            playBtn.classList.remove('playing');
            card.classList.remove('playing');
          }
        };

        audio.ontimeupdate = () => {
          if (audio.duration) {
            fill.style.width = (audio.currentTime / audio.duration * 100) + '%';
            curr.textContent = fmt(audio.currentTime);
          }
        };

        audio.onloadedmetadata = () => total.textContent = fmt(audio.duration);

        progress.onclick = (e) => {
          const rect = progress.getBoundingClientRect();
          audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration;
        };

        loopBtn.onclick = (e) => {
          e.stopPropagation();
          audio.loop = !audio.loop;
          loopBtn.classList.toggle('active');
        };

        audio.onended = () => {
          if (!audio.loop) {
            playBtn.classList.remove('playing');
            card.classList.remove('playing');
            audio.currentTime = 0;
          }
        };
      });

      const fmt = (s) => {
        if (!isFinite(s)) return '0:00';
        const m = Math.floor(s / 60);
        const sec = Math.floor(s % 60);
        return `${m}:${sec < 10 ? '0' : ''}${sec}`;
      };
    }

    document.addEventListener('contextmenu', e => e.preventDefault());
    document.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'u' || (e.shiftKey && e.key === 'i')) || e.key === 'F12') e.preventDefault();
    });
  </script>
</body>
</html>
