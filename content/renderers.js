/* THE QUIET HUSTLE — native-resolution renderers (plain JS → HTML strings).
   Faithful to tqh-brand-kit.jsx, scaled to native export sizes.
   Formats: carousel 1080×1350 · reel 1080×1920 · quote 1080×1080 · pin 1000×1500 */
(function () {
  /* Pre-rasterized film-grain tile (140×140 PNG). Far cheaper to rasterize for
     PNG export than live feTurbulence, and visually identical. Path resolves
     from content/<week>/ host pages. */
  const GRAIN = "url('../../assets/textures/grain.png')";

  function layers(glow) {
    return `
      <div style="position:absolute;inset:0;background:var(--tqh-deep);"></div>
      <div style="position:absolute;inset:0;background:${GRAIN};opacity:0.5;pointer-events:none;"></div>
      ${glow ? `<div style="position:absolute;inset:0;background:${glow};pointer-events:none;"></div>` : ''}`;
  }

  /* QH monogram + handle corner lockup (scale 1 = native carousel size) */
  function logoMark(scale = 1) {
    const sz = 84 * scale;
    return `
      <div style="display:flex;align-items:center;gap:${24*scale}px;">
        <div style="width:${sz}px;height:${sz}px;border-radius:50%;background:var(--tqh-surface);display:flex;align-items:center;justify-content:center;border:1px solid var(--tqh-border);">
          <span style="font-size:${sz*0.38}px;font-weight:300;color:var(--tqh-cream);letter-spacing:0.08em;font-family:var(--tqh-font-display);">QH</span>
        </div>
        <span style="font-size:${33*scale}px;font-weight:500;color:var(--tqh-muted);letter-spacing:0.06em;">thequiethustle</span>
      </div>`;
  }

  function dots(n, active, scale = 1) {
    let out = '';
    for (let i = 0; i < n; i++) {
      out += `<div style="width:${(i===active?48:12)*scale}px;height:${12*scale}px;border-radius:6px;background:${i===active?'var(--tqh-gold)':'var(--tqh-dim)'};"></div>`;
    }
    return `<div style="display:flex;gap:${12*scale}px;justify-content:center;padding-top:${8*scale}px;">${out}</div>`;
  }

  /* ─── CAROUSEL SLIDE · 1080×1350 ─── */
  function carouselSlide(s, idx, total) {
    let content = '';
    if (s.type === 'cover') {
      content = `
        <div style="margin-top:auto;margin-bottom:auto;">
          <div style="width:96px;height:6px;background:var(--tqh-gold);margin-bottom:48px;border-radius:3px;"></div>
          <h2 style="font-size:84px;font-weight:400;line-height:1.18;color:var(--tqh-cream);white-space:pre-line;margin:0;letter-spacing:0.01em;font-family:var(--tqh-font-display);">${s.title}</h2>
          <p style="font-size:39px;color:var(--tqh-gold);margin-top:60px;letter-spacing:0.18em;text-transform:uppercase;">${s.subtitle}</p>
        </div>`;
    } else if (s.type === 'coverB') {
      /* COVER VARIANT B — centered editorial */
      content = `
        <div style="margin:auto 0;text-align:center;display:flex;flex-direction:column;align-items:center;">
          <span style="font-size:30px;letter-spacing:0.24em;text-transform:uppercase;color:var(--tqh-muted);margin-bottom:44px;">${s.kicker || ''}</span>
          <div style="width:120px;height:2px;background:var(--tqh-grad-gold);opacity:0.7;margin-bottom:52px;"></div>
          <h2 style="font-size:108px;font-weight:400;line-height:1.1;color:var(--tqh-cream);white-space:pre-line;margin:0;letter-spacing:0.02em;font-family:var(--tqh-font-display);">${s.title}</h2>
          <div style="width:120px;height:2px;background:var(--tqh-grad-gold);opacity:0.7;margin:52px 0 40px;"></div>
          <p style="font-size:40px;color:var(--tqh-gold);margin:0;letter-spacing:0.16em;font-family:var(--tqh-font-display);font-style:italic;">${s.subtitle}</p>
        </div>`;
    } else if (s.type === 'tip') {
      content = `
        <div style="margin-top:auto;margin-bottom:72px;">
          <div style="width:72px;height:5px;background:var(--tqh-gold);margin-bottom:40px;border-radius:3px;opacity:0.9;"></div>
          <h3 style="font-size:66px;font-weight:400;line-height:1.2;color:var(--tqh-cream);white-space:pre-line;margin:0 0 38px 0;font-family:var(--tqh-font-display);letter-spacing:0.01em;">${s.title}</h3>
          <p style="font-size:42px;line-height:1.6;color:var(--tqh-muted);margin:0;max-width:880px;">${s.body}</p>
        </div>`;
    } else if (s.type === 'compare') {
      /* DO THIS / NOT THAT pair */
      content = `
        <div style="margin:auto 0;display:flex;flex-direction:column;gap:36px;">
          <div style="background:var(--tqh-error-bg);border:1px solid var(--tqh-error-border);border-radius:16px;padding:48px 52px;">
            <span style="font-size:26px;letter-spacing:0.16em;text-transform:uppercase;color:var(--tqh-error-text);">&times; not this</span>
            <p style="font-size:52px;line-height:1.35;color:var(--tqh-muted);text-decoration:line-through;text-decoration-color:rgba(192,128,128,0.5);margin:24px 0 0;font-family:var(--tqh-font-display);">${s.not}</p>
          </div>
          <div style="background:var(--tqh-success-bg);border:1px solid var(--tqh-success-border);border-radius:16px;padding:48px 52px;">
            <span style="font-size:26px;letter-spacing:0.16em;text-transform:uppercase;color:var(--tqh-sage);">&#10003; do this</span>
            <p style="font-size:52px;line-height:1.35;color:var(--tqh-cream);margin:24px 0 0;font-family:var(--tqh-font-display);">${s.do}</p>
          </div>
        </div>`;
    } else { /* cta */
      content = `
        <div style="text-align:center;margin:auto 0;">
          <div style="width:144px;height:6px;background:var(--tqh-gold);margin:0 auto 60px;border-radius:3px;"></div>
          <h3 style="font-size:84px;font-weight:400;color:var(--tqh-cream);margin:0 0 40px 0;font-family:var(--tqh-font-display);letter-spacing:0.01em;white-space:pre-line;line-height:1.15;">${s.title}</h3>
          <p style="font-size:42px;color:var(--tqh-muted);line-height:1.55;margin:0 auto;max-width:760px;">${s.body}</p>
        </div>`;
    }
    const showNum = s.type === 'tip';
    return wrap(1080, 1350, `
      ${layers('radial-gradient(70% 55% at 50% 42%, rgba(196,162,101,0.05), transparent 70%)')}
      <div style="position:relative;height:100%;padding:96px 84px;display:flex;flex-direction:column;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:auto;">
          ${logoMark(1)}
          ${showNum ? `<span style="font-size:126px;font-weight:200;color:var(--tqh-gold);opacity:0.4;line-height:1;font-family:var(--tqh-font-display);">${s.num}</span>` : ''}
        </div>
        ${content}
        ${dots(total, idx, 1)}
      </div>`);
  }

  /* ─── REEL OVERLAY · 1080×1920 ─── */
  function reel(item) {
    const r = item.reel;
    return wrap(1080, 1920, `
      <div style="position:absolute;inset:0;background:linear-gradient(180deg,#0D0D12 0%,#1A1520 50%,#0D0D12 100%);"></div>
      <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 30% 40%, rgba(196,162,101,0.06) 0%, transparent 60%),radial-gradient(ellipse at 70% 60%, rgba(122,158,126,0.04) 0%, transparent 50%);"></div>
      <div style="position:absolute;inset:0;background:${GRAIN};opacity:0.4;pointer-events:none;"></div>
      <div style="position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;padding:96px 72px;">
        <div style="background:rgba(13,13,18,0.85);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-radius:36px;padding:84px 72px;border:1px solid rgba(196,162,101,0.15);">
          <div style="width:72px;height:6px;background:var(--tqh-gold);margin-bottom:48px;border-radius:3px;"></div>
          <p style="font-size:60px;font-weight:400;line-height:1.4;color:var(--tqh-cream);margin:0 0 48px 0;">${r.line1}</p>
          <p style="font-size:60px;font-weight:400;line-height:1.4;color:var(--tqh-gold);margin:0;">${r.line2}</p>
        </div>
        <div style="margin-top:60px;">${logoMark(0.85)}</div>
      </div>
      <div style="position:absolute;bottom:48px;left:72px;right:72px;display:flex;justify-content:space-between;align-items:center;">
        <span style="font-size:30px;color:var(--tqh-dim);letter-spacing:0.1em;">&#9834; ${r.audio}</span>
        <span style="font-size:30px;color:var(--tqh-dim);letter-spacing:0.2em;">REEL</span>
      </div>`);
  }

  /* ─── QUOTE GRAPHIC · 1080×1080 ─── */
  function quote(item) {
    const q = item.quote;
    return wrap(1080, 1080, `
      ${layers('radial-gradient(circle at 50% 45%, rgba(24,21,14,0.9) 0%, transparent 70%)')}
      <div style="position:absolute;top:72px;left:72px;width:60px;height:60px;border-top:1px solid rgba(196,162,101,0.3);border-left:1px solid rgba(196,162,101,0.3);"></div>
      <div style="position:absolute;bottom:72px;right:72px;width:60px;height:60px;border-bottom:1px solid rgba(196,162,101,0.3);border-right:1px solid rgba(196,162,101,0.3);"></div>
      <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;">
        <div style="padding:120px 96px;text-align:center;max-width:85%;">
          <div style="font-size:144px;color:var(--tqh-gold);opacity:0.3;line-height:0.6;font-family:var(--tqh-font-display);margin-bottom:24px;">&ldquo;</div>
          <p style="font-size:57px;font-weight:400;line-height:1.5;color:var(--tqh-cream);margin:0 0 56px 0;font-family:var(--tqh-font-display);font-style:italic;">${q.text}</p>
          <div style="width:96px;height:4px;background:var(--tqh-gold);margin:0 auto 28px;"></div>
          ${q.kicker ? `<p style="font-size:30px;color:var(--tqh-sand);margin:0 0 28px;font-family:var(--tqh-font-display);font-style:italic;">${q.kicker}</p>` : ''}
          <span style="font-size:30px;color:var(--tqh-muted);letter-spacing:0.2em;text-transform:uppercase;">@thequiethustle</span>
        </div>
      </div>`);
  }

  /* ─── PINTEREST PIN · 1000×1500 (2:3) ─── */
  function pin(item) {
    const p = item.pin;
    const teasers = p.teasers.map(t => `
      <div style="display:flex;align-items:flex-start;gap:24px;">
        <span style="flex:0 0 auto;width:16px;height:26px;margin-top:10px;background:var(--tqh-grad-gold);opacity:0.6;clip-path:polygon(50% 0,100% 50%,50% 100%,0 50%);"></span>
        <span style="font-size:38px;line-height:1.5;color:var(--tqh-muted);">${t}</span>
      </div>`).join('');
    return wrap(1000, 1500, `
      ${layers('radial-gradient(75% 50% at 50% 36%, rgba(196,162,101,0.06), transparent 72%)')}
      <div style="position:absolute;top:60px;left:60px;width:60px;height:60px;border-top:1px solid rgba(196,162,101,0.3);border-left:1px solid rgba(196,162,101,0.3);"></div>
      <div style="position:absolute;top:60px;right:60px;width:60px;height:60px;border-top:1px solid rgba(196,162,101,0.3);border-right:1px solid rgba(196,162,101,0.3);"></div>
      <div style="position:relative;height:100%;padding:96px 84px;display:flex;flex-direction:column;">
        <div style="display:flex;justify-content:center;">${logoMark(0.9)}</div>
        <div style="margin:auto 0;">
          <span style="display:block;text-align:center;font-size:30px;letter-spacing:0.24em;text-transform:uppercase;color:var(--tqh-gold);margin-bottom:40px;">${p.kicker}</span>
          <div style="width:110px;height:2px;background:var(--tqh-grad-gold);opacity:0.7;margin:0 auto 48px;"></div>
          <h2 style="font-size:104px;font-weight:400;line-height:1.08;color:var(--tqh-cream);white-space:pre-line;margin:0 0 64px;text-align:center;letter-spacing:0.01em;font-family:var(--tqh-font-display);">${p.title}</h2>
          <div style="display:flex;flex-direction:column;gap:30px;max-width:760px;margin:0 auto;">${teasers}</div>
        </div>
        <div style="text-align:center;">
          <div style="width:96px;height:2px;background:var(--tqh-gold);opacity:0.6;margin:0 auto 28px;"></div>
          <span style="font-size:32px;color:var(--tqh-sand);letter-spacing:0.06em;font-family:var(--tqh-font-display);font-style:italic;">read the full breakdown &rarr;</span>
        </div>
      </div>`);
  }

  /* sized native frame; .scale gets transform from page after layout */
  function wrap(w, h, inner) {
    return { w, h, html: `<div class="scale" data-w="${w}" style="width:${w}px;height:${h}px;">${inner}</div>` };
  }

  window.TQHRender = { carouselSlide, reel, quote, pin, logoMark, dots };
})();
