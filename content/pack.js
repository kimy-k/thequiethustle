/* THE QUIET HUSTLE — content-pack page builder + one-click PNG export.
   Shared by every week. Depends on window.TQHRender (renderers.js) and,
   for export, html-to-image + JSZip (loaded by the host page). */
(function () {
  const R = window.TQHRender;
  const FMT_LABEL = { carousel: 'Carousel', reel: 'Reel overlay', quote: 'Static quote' };
  const DISP = { carousel: 250, reel: 200, quote: 320, pin: 230 };

  function frameHTML(media, dispW) {
    const h = dispW * (media.h / media.w);
    return `<div class="frame" style="width:${dispW}px;height:${h}px;">${media.html}</div>`;
  }

  /* Export filenames in DOM order for a day's frames */
  function exportNames(d) {
    const names = [];
    if (d.format === 'carousel') {
      d.slides.forEach((s, i) => names.push(`tqh-carousel-${d.slug}-${String(i + 1).padStart(2, '0')}`));
      if (d.pin) names.push(`tqh-pin-${d.slug}`);
    } else if (d.format === 'reel') {
      names.push(`tqh-reel-${d.slug}`);
    } else if (d.format === 'quote') {
      names.push(`tqh-quote-${d.slug}`);
    }
    return names;
  }

  function buildDay(d) {
    const block = document.createElement('div');
    block.className = 'day';
    block.setAttribute('data-screen-label', 'Day ' + d.day);

    const platformChips = d.platforms.map(p => `<span class="chip">${p}</span>`).join('');
    const head = `
      <div class="dayhead">
        <div class="daynum">${String(d.day).padStart(2, '0')}</div>
        <div class="info">
          <div class="date">${d.date}</div>
          <h2>${d.title}</h2>
          <div class="chips">
            <span class="chip fmt">${FMT_LABEL[d.format]}</span>
            <span class="chip gold">${d.pillar}</span>
            ${platformChips}
          </div>
        </div>
      </div>`;

    const pinCell = d.pin
      ? `<div class="cell"><div class="frame" style="width:${DISP.pin}px;height:${DISP.pin * 1.5}px;">${R.pin(d).html}</div><div class="clabel"><span class="n">2:3</span><span class="t">Pinterest pin</span></div></div>`
      : '';

    let media = '';
    if (d.format === 'carousel') {
      const cells = d.slides.map((s, i) => {
        const m = R.carouselSlide(s, i, d.slides.length);
        const labelType = s.type === 'cover' || s.type === 'coverB' ? 'Cover'
          : s.type === 'cta' ? 'CTA'
          : s.type === 'compare' ? 'Compare'
          : 'Slide ' + s.num;
        return `<div class="cell">${frameHTML(m, DISP.carousel)}<div class="clabel"><span class="n">${String(i + 1).padStart(2, '0')}</span><span class="t">${labelType}</span></div></div>`;
      }).join('');
      const label = `Carousel · ${d.slides.length} slides · swipe order${d.coverVariant === 'B' ? ' · cover variant B' : ''}${d.pin ? ' · + Pinterest pin' : ''}`;
      media = `<div class="stripwrap"><p class="striplabel">${label}</p><div class="strip">${cells}${pinCell}</div></div>`;
    } else if (d.format === 'reel') {
      const m = R.reel(d);
      media = `<div class="stripwrap"><p class="striplabel">Reel text overlay · 1080×1920</p><div class="strip"><div class="cell">${frameHTML(m, DISP.reel)}<div class="clabel"><span class="n">9:16</span><span class="t">overlay → footage</span></div></div>${pinCell}</div></div>`;
    } else if (d.format === 'quote') {
      const m = R.quote(d);
      media = `<div class="stripwrap"><p class="striplabel">Static quote · 1080×1080</p><div class="strip"><div class="cell">${frameHTML(m, DISP.quote)}<div class="clabel"><span class="n">1:1</span><span class="t">square</span></div></div>${pinCell}</div></div>`;
    }

    const capLines = d.caption.split('\n');
    const firstLine = capLines.shift();
    const captionHTML = `<span class="first">thequiethustle</span> ${firstLine}\n${capLines.join('\n')}`;
    const panel = `
      <div class="panel">
        <h3>Caption</h3>
        <p class="cap">${captionHTML}</p>
        <p class="ctaline">${d.cta}</p>
        <div class="divider"></div>
        <h3>Hashtags</h3>
        <div class="tags">${d.hashtags.map(h => `<span>${h}</span>`).join('')}</div>
      </div>`;

    block.innerHTML = head + `<div class="body">${media}${panel}</div>`;

    /* stamp export filenames onto each native .scale node, in DOM order */
    const names = exportNames(d);
    block.querySelectorAll('.scale').forEach((sc, i) => {
      if (names[i]) sc.dataset.exportName = names[i];
    });
    return block;
  }

  function fitScales() {
    document.querySelectorAll('.frame').forEach(f => {
      const sc = f.querySelector('.scale');
      if (!sc) return;
      sc.style.transform = `scale(${f.clientWidth / parseFloat(sc.dataset.w)})`;
    });
  }

  /* ---------- one-click PNG export — self-contained SVG rasterizer ----------
     html-to-image is unreliable here (stalls walking the cross-origin font
     stylesheet), so we render each frame via <foreignObject>: resolve CSS vars
     to literals, inline the grain as a data-URI, embed DM Sans, draw to canvas. */

  let _grainUri = null, _fontCss = null;
  const _rootCS = getComputedStyle(document.documentElement);
  const _varCache = {};
  function getVar(name) {
    if (!(name in _varCache)) _varCache[name] = _rootCS.getPropertyValue(name).trim();
    return _varCache[name];
  }

  function blobToDataUri(blob) {
    return new Promise((res, rej) => {
      const fr = new FileReader();
      fr.onload = () => res(fr.result); fr.onerror = rej;
      fr.readAsDataURL(blob);
    });
  }

  async function getGrainUri() {
    if (_grainUri) return _grainUri;
    try {
      const blob = await (await fetch('../../assets/textures/grain.png')).blob();
      _grainUri = await blobToDataUri(blob);
    } catch (e) { console.warn('grain inline failed', e); _grainUri = ''; }
    return _grainUri;
  }

  /* Fetch DM Sans (basic-latin subset, weights 400/500/600) and embed as @font-face */
  async function getFontCss() {
    if (_fontCss !== null) return _fontCss;
    try {
      const css = await (await fetch('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap')).text();
      const blocks = css.match(/@font-face\s*{[^}]*}/g) || [];
      const out = [];
      for (const b of blocks) {
        const range = (b.match(/unicode-range:\s*([^;]+);/) || [])[1] || '';
        if (range && !/U\+0000/.test(range)) continue; // basic-latin only (keeps size down)
        const url = (b.match(/url\((https:\/\/[^)]+\.woff2)\)/) || [])[1];
        if (!url) continue;
        const weight = (b.match(/font-weight:\s*(\d+)/) || [])[1] || '400';
        const fstyle = (b.match(/font-style:\s*(\w+)/) || [])[1] || 'normal';
        const data = await blobToDataUri(await (await fetch(url)).blob());
        out.push(`@font-face{font-family:'DM Sans';font-style:${fstyle};font-weight:${weight};src:url(${data}) format('woff2');}`);
      }
      _fontCss = out.join('');
    } catch (e) { console.warn('font embed failed', e); _fontCss = ''; }
    return _fontCss;
  }

  function resolveStyles(rootEl, grainUri) {
    const els = [rootEl, ...rootEl.querySelectorAll('*')];
    for (const el of els) {
      let s = el.getAttribute && el.getAttribute('style');
      if (!s) continue;
      s = s.replace(/url\(['"]?\.\.\/\.\.\/assets\/textures\/grain\.png['"]?\)/g, `url('${grainUri}')`);
      s = s.replace(/var\(\s*(--[\w-]+)\s*(?:,\s*([^()]*))?\)/g, (m, name, fb) => {
        const v = getVar(name);
        return v || (fb ? fb.trim() : 'inherit');
      });
      el.setAttribute('style', s);
    }
  }

  async function nodeToPngBlob(node, w, h, grainUri, fontCss) {
    const clone = node.cloneNode(true);
    clone.style.transform = 'none';
    clone.style.margin = '0';
    resolveStyles(clone, grainUri);
    const inner = new XMLSerializer().serializeToString(clone);
    const svg =
      `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">` +
      `<defs><style>${fontCss}</style></defs>` +
      `<foreignObject x="0" y="0" width="${w}" height="${h}">` +
      `<div xmlns="http://www.w3.org/1999/xhtml" style="width:${w}px;height:${h}px;">${inner}</div>` +
      `</foreignObject></svg>`;
    const img = new Image();
    await new Promise((res, rej) => {
      img.onload = res; img.onerror = () => rej(new Error('svg image load failed'));
      img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    });
    const canvas = document.createElement('canvas');
    canvas.width = w; canvas.height = h;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, w, h);
    return await new Promise(res => canvas.toBlob(res, 'image/png'));
  }

  async function exportAll(zipName, btn) {
    if (!window.JSZip) { alert('Export library still loading — try again in a moment.'); return; }
    const nodes = [...document.querySelectorAll('.scale[data-export-name]')];
    const zip = new JSZip();
    const orig = btn ? btn.innerHTML : '';
    try {
      if (btn) btn.textContent = 'Preparing fonts…';
      const [grainUri, fontCss] = await Promise.all([getGrainUri(), getFontCss()]);
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        if (btn) btn.textContent = `Rendering ${i + 1} / ${nodes.length}…`;
        const w = parseFloat(n.style.width), h = parseFloat(n.style.height);
        const blob = await nodeToPngBlob(n, w, h, grainUri, fontCss);
        const folder = n.dataset.exportWeek ? n.dataset.exportWeek + '/' : '';
        zip.file(folder + n.dataset.exportName + '.png', blob);
        await new Promise(r => setTimeout(r, 0));
      }
      if (btn) btn.textContent = 'Zipping…';
      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = zipName;
      document.body.appendChild(a); a.click(); a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('Export failed:', e);
      alert('Export hit an error — see console. ' + e.message);
    } finally {
      if (btn) btn.innerHTML = orig;
    }
  }

  /* ---------- entry point ---------- */
  function initPack(days, opts) {
    opts = opts || {};
    const container = document.getElementById('days');
    days.forEach(d => container.appendChild(buildDay(d)));
    fitScales();
    window.addEventListener('resize', fitScales);
    window.addEventListener('load', fitScales);

    const btn = document.getElementById('exportBtn');
    if (btn) {
      const count = [...document.querySelectorAll('.scale[data-export-name]')].length;
      const labelEl = btn.querySelector('.cnt');
      if (labelEl) labelEl.textContent = count;
      btn.addEventListener('click', () => exportAll(opts.zipName || 'tqh-content.zip', btn));
    }
  }

  /* ---------- master entry point: many weeks, one export ---------- */
  function initMaster(weeks, opts) {
    opts = opts || {};
    const container = document.getElementById('days');
    weeks.forEach(wk => {
      const section = document.createElement('section');
      section.className = 'weekblock';
      section.innerHTML = `
        <div class="weekhead" id="wk-${wk.folder}">
          <span class="wkfolder">${wk.folder}</span>
          <h2 class="wktitle">${wk.title}</h2>
          <span class="wkdates">${wk.dates}</span>
        </div>`;
      container.appendChild(section);
      wk.days.forEach(d => {
        const block = buildDay(d);
        block.querySelectorAll('.scale[data-export-name]').forEach(sc => {
          sc.dataset.exportWeek = wk.folder;
        });
        section.appendChild(block);
      });
    });
    fitScales();
    window.addEventListener('resize', fitScales);
    window.addEventListener('load', fitScales);

    const btn = document.getElementById('exportBtn');
    if (btn) {
      const count = [...document.querySelectorAll('.scale[data-export-name]')].length;
      const labelEl = btn.querySelector('.cnt');
      if (labelEl) labelEl.textContent = count;
      btn.addEventListener('click', () => exportAll(opts.zipName || 'tqh-content.zip', btn));
    }
    return [...document.querySelectorAll('.scale[data-export-name]')].length;
  }

  window.TQHPack = { initPack, initMaster, exportAll, buildDay };
})();
