import { useState } from "react";

const BRAND = {
  bg: "#0D0D12",
  card: "#12121A",
  surface: "#1A1A2E",
  gold: "#C4A265",
  goldLight: "#E8D5B7",
  sage: "#7A9E7E",
  text: "#F5F0EB",
  muted: "#8A8A9A",
  dim: "#4A4A5A",
  border: "#1E1E2E",
};

function LogoMark({ size = 32 }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 8,
    }}>
      <div style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: BRAND.surface,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: `1px solid ${BRAND.border}`,
      }}>
        <span style={{
          fontSize: size * 0.38,
          fontWeight: 300,
          color: BRAND.text,
          letterSpacing: "0.08em",
          fontFamily: "'Georgia', serif",
        }}>QH</span>
      </div>
      <span style={{
        fontSize: 11,
        fontWeight: 500,
        color: BRAND.muted,
        letterSpacing: "0.06em",
      }}>thequiethustle</span>
    </div>
  );
}

// ─── TEMPLATE 1: CAROUSEL SLIDE ───
function CarouselTemplate() {
  const [slide, setSlide] = useState(0);
  const slides = [
    { type: "cover", title: "5 signs a partnership\noffer isn't\nworth your time", subtitle: "Swipe →" },
    { type: "tip", num: "01", title: "They won't share\ntheir conversion data", body: "If a program can't tell you their average CR before you sign, they're either hiding bad numbers or don't track them. Both are red flags." },
    { type: "tip", num: "02", title: "The payout terms\nare vague", body: "\"Competitive rates\" means nothing. Get the exact percentage, the payment schedule, and the minimum payout threshold in writing." },
    { type: "tip", num: "03", title: "They want exclusivity\nbut offer nothing extra", body: "Exclusivity should come with a premium — higher rates, priority support, or guaranteed minimums. Otherwise you're just limiting yourself for free." },
    { type: "tip", num: "04", title: "No dedicated\npartner manager", body: "If you can't reach a real person when something breaks, you're not a partner — you're just another link in their system." },
    { type: "tip", num: "05", title: "The product has\nno retention", body: "High commission on a product nobody keeps using means you'll churn through your audience. Check their user retention before promoting." },
    { type: "cta", title: "Save this for later.", body: "Follow @thequiethustle for more insider knowledge on building real income streams." },
  ];

  const s = slides[slide];
  return (
    <div style={{
      width: "100%",
      aspectRatio: "4/5",
      background: BRAND.bg,
      borderRadius: 12,
      overflow: "hidden",
      position: "relative",
      cursor: "pointer",
      border: `1px solid ${BRAND.border}`,
    }}
    onClick={() => setSlide((slide + 1) % slides.length)}
    >
      {/* Grain overlay */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
        opacity: 0.5,
        pointerEvents: "none",
      }}/>

      <div style={{ padding: "32px 28px", height: "100%", display: "flex", flexDirection: "column" }}>
        {/* Top bar */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "auto",
        }}>
          <LogoMark size={28} />
          {s.type === "tip" && (
            <span style={{
              fontSize: 42,
              fontWeight: 200,
              color: BRAND.gold,
              opacity: 0.4,
              lineHeight: 1,
              fontFamily: "'Georgia', serif",
            }}>{s.num}</span>
          )}
        </div>

        {/* Content */}
        <div style={{ marginTop: "auto", marginBottom: s.type === "cover" ? "auto" : 24 }}>
          {s.type === "cover" && (
            <>
              <div style={{
                width: 32,
                height: 2,
                background: BRAND.gold,
                marginBottom: 16,
              }}/>
              <h2 style={{
                fontSize: 28,
                fontWeight: 400,
                lineHeight: 1.2,
                color: BRAND.text,
                whiteSpace: "pre-line",
                margin: 0,
                letterSpacing: "-0.01em",
              }}>{s.title}</h2>
              <p style={{
                fontSize: 13,
                color: BRAND.gold,
                marginTop: 20,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}>{s.subtitle}</p>
            </>
          )}

          {s.type === "tip" && (
            <>
              <h3 style={{
                fontSize: 22,
                fontWeight: 400,
                lineHeight: 1.25,
                color: BRAND.text,
                whiteSpace: "pre-line",
                margin: "0 0 14px 0",
              }}>{s.title}</h3>
              <p style={{
                fontSize: 14,
                lineHeight: 1.6,
                color: BRAND.muted,
                margin: 0,
              }}>{s.body}</p>
            </>
          )}

          {s.type === "cta" && (
            <div style={{ textAlign: "center", margin: "auto 0" }}>
              <div style={{
                width: 48,
                height: 2,
                background: BRAND.gold,
                margin: "0 auto 20px",
              }}/>
              <h3 style={{
                fontSize: 24,
                fontWeight: 400,
                color: BRAND.text,
                margin: "0 0 12px 0",
              }}>{s.title}</h3>
              <p style={{
                fontSize: 13,
                color: BRAND.muted,
                lineHeight: 1.5,
                margin: 0,
              }}>{s.body}</p>
            </div>
          )}
        </div>

        {/* Slide dots */}
        <div style={{
          display: "flex",
          gap: 4,
          justifyContent: "center",
          paddingTop: 12,
        }}>
          {slides.map((_, i) => (
            <div key={i} style={{
              width: i === slide ? 16 : 4,
              height: 4,
              borderRadius: 2,
              background: i === slide ? BRAND.gold : BRAND.dim,
              transition: "all 0.3s ease",
            }}/>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── TEMPLATE 2: REEL TEXT OVERLAY ───
function ReelTemplate() {
  return (
    <div style={{
      width: "100%",
      aspectRatio: "9/16",
      background: `linear-gradient(180deg, ${BRAND.bg} 0%, #1A1520 50%, #0D0D12 100%)`,
      borderRadius: 12,
      overflow: "hidden",
      position: "relative",
      border: `1px solid ${BRAND.border}`,
    }}>
      {/* Simulated stock footage overlay */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: `
          radial-gradient(ellipse at 30% 40%, rgba(196, 162, 101, 0.06) 0%, transparent 60%),
          radial-gradient(ellipse at 70% 60%, rgba(122, 158, 126, 0.04) 0%, transparent 50%)
        `,
      }}/>

      <div style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "32px 24px",
      }}>
        <div style={{
          background: "rgba(13, 13, 18, 0.85)",
          backdropFilter: "blur(20px)",
          borderRadius: 12,
          padding: "28px 24px",
          border: `1px solid rgba(196, 162, 101, 0.15)`,
        }}>
          <div style={{
            width: 24,
            height: 2,
            background: BRAND.gold,
            marginBottom: 16,
          }}/>
          <p style={{
            fontSize: 20,
            fontWeight: 400,
            lineHeight: 1.4,
            color: BRAND.text,
            margin: "0 0 16px 0",
          }}>
            I manage affiliate programs for a living.
          </p>
          <p style={{
            fontSize: 20,
            fontWeight: 400,
            lineHeight: 1.4,
            color: BRAND.gold,
            margin: 0,
          }}>
            Here's what nobody tells you about earning commissions.
          </p>
        </div>

        <div style={{
          marginTop: 20,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}>
          <LogoMark size={24} />
        </div>
      </div>

      {/* Reel UI indicators */}
      <div style={{
        position: "absolute",
        bottom: 16,
        left: 24,
        right: 24,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <span style={{ fontSize: 10, color: BRAND.dim, letterSpacing: "0.1em" }}>♫ ambient · lo-fi</span>
        <span style={{ fontSize: 10, color: BRAND.dim }}>REEL</span>
      </div>
    </div>
  );
}

// ─── TEMPLATE 3: QUOTE GRAPHIC ───
function QuoteTemplate() {
  return (
    <div style={{
      width: "100%",
      aspectRatio: "1/1",
      background: BRAND.bg,
      borderRadius: 12,
      overflow: "hidden",
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: `1px solid ${BRAND.border}`,
    }}>
      {/* Corner accents */}
      <div style={{ position: "absolute", top: 24, left: 24, width: 20, height: 20, borderTop: `1px solid ${BRAND.gold}33`, borderLeft: `1px solid ${BRAND.gold}33` }}/>
      <div style={{ position: "absolute", bottom: 24, right: 24, width: 20, height: 20, borderBottom: `1px solid ${BRAND.gold}33`, borderRight: `1px solid ${BRAND.gold}33` }}/>

      <div style={{ padding: "40px 32px", textAlign: "center", maxWidth: "85%" }}>
        <div style={{
          fontSize: 48,
          color: BRAND.gold,
          opacity: 0.3,
          lineHeight: 1,
          fontFamily: "'Georgia', serif",
          marginBottom: 8,
        }}>"</div>
        <p style={{
          fontSize: 19,
          fontWeight: 400,
          lineHeight: 1.55,
          color: BRAND.text,
          margin: "0 0 24px 0",
          fontFamily: "'Georgia', serif",
          fontStyle: "italic",
        }}>
          Your first $100 online teaches you more than any course ever will. Stop studying. Start building.
        </p>
        <div style={{
          width: 32,
          height: 1.5,
          background: BRAND.gold,
          margin: "0 auto 12px",
        }}/>
        <span style={{
          fontSize: 10,
          color: BRAND.muted,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
        }}>@thequiethustle</span>
      </div>
    </div>
  );
}

// ─── TEMPLATE 4: DO THIS NOT THAT ───
function ComparisonTemplate() {
  const items = [
    { bad: "\"Sign up for my course to learn affiliate marketing\"", good: "Track one program's dashboard for 30 days first" },
    { bad: "Apply to 20 affiliate programs at once", good: "Master one program, then expand" },
    { bad: "Chase the highest commission rate", good: "Check the product's retention rate first" },
  ];

  return (
    <div style={{
      width: "100%",
      aspectRatio: "4/5",
      background: BRAND.bg,
      borderRadius: 12,
      overflow: "hidden",
      border: `1px solid ${BRAND.border}`,
    }}>
      <div style={{ padding: "28px 24px", height: "100%", display: "flex", flexDirection: "column" }}>
        <LogoMark size={26} />

        <div style={{ marginTop: 20, marginBottom: 8 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16 }}>
            <span style={{
              fontSize: 12,
              color: "#E05555",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontWeight: 500,
              opacity: 0.8,
            }}>✕ Not this</span>
            <div style={{ flex: 1, height: 1, background: BRAND.border }}/>
            <span style={{
              fontSize: 12,
              color: BRAND.sage,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontWeight: 500,
            }}>✓ Do this</span>
          </div>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
          {items.map((item, i) => (
            <div key={i} style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}>
              <div style={{
                background: "rgba(224, 85, 85, 0.06)",
                border: "1px solid rgba(224, 85, 85, 0.12)",
                borderRadius: 8,
                padding: "10px 14px",
                flex: 1,
                display: "flex",
                alignItems: "center",
              }}>
                <p style={{
                  fontSize: 12,
                  color: "#C08080",
                  margin: 0,
                  lineHeight: 1.4,
                  textDecoration: "line-through",
                  textDecorationColor: "rgba(224,85,85,0.3)",
                }}>{item.bad}</p>
              </div>
              <div style={{
                background: "rgba(122, 158, 126, 0.08)",
                border: `1px solid rgba(122, 158, 126, 0.15)`,
                borderRadius: 8,
                padding: "10px 14px",
                flex: 1,
                display: "flex",
                alignItems: "center",
              }}>
                <p style={{
                  fontSize: 12,
                  color: BRAND.sage,
                  margin: 0,
                  lineHeight: 1.4,
                  fontWeight: 500,
                }}>{item.good}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{
          textAlign: "center",
          paddingTop: 12,
          fontSize: 11,
          color: BRAND.dim,
          letterSpacing: "0.1em",
        }}>
          Save this → share it → come back to it
        </div>
      </div>
    </div>
  );
}

// ─── TEMPLATE 5: SCREEN RECORDING FRAME ───
function ScreenRecordingTemplate() {
  return (
    <div style={{
      width: "100%",
      aspectRatio: "4/5",
      background: BRAND.bg,
      borderRadius: 12,
      overflow: "hidden",
      border: `1px solid ${BRAND.border}`,
    }}>
      <div style={{ padding: "24px 20px", height: "100%", display: "flex", flexDirection: "column" }}>
        <LogoMark size={26} />

        <div style={{
          marginTop: 16,
          marginBottom: 12,
        }}>
          <div style={{ width: 24, height: 2, background: BRAND.gold, marginBottom: 10 }}/>
          <h3 style={{
            fontSize: 18,
            fontWeight: 400,
            color: BRAND.text,
            margin: 0,
            lineHeight: 1.3,
          }}>What my affiliate<br/>dashboard actually<br/>looks like</h3>
        </div>

        {/* Fake screen recording area */}
        <div style={{
          flex: 1,
          background: "#0A0A0F",
          borderRadius: 10,
          border: `1px solid ${BRAND.border}`,
          overflow: "hidden",
          position: "relative",
        }}>
          {/* Fake browser chrome */}
          <div style={{
            padding: "8px 12px",
            background: "#111118",
            borderBottom: `1px solid ${BRAND.border}`,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#E0555544" }}/>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#C4A26544" }}/>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#7A9E7E44" }}/>
            <div style={{
              flex: 1,
              height: 18,
              background: "#0D0D12",
              borderRadius: 4,
              marginLeft: 8,
              display: "flex",
              alignItems: "center",
              paddingLeft: 8,
            }}>
              <span style={{ fontSize: 8, color: BRAND.dim }}>██████.com/dashboard</span>
            </div>
          </div>

          {/* Fake dashboard content */}
          <div style={{ padding: 16 }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
              {[
                { label: "This month", value: "███", color: BRAND.gold },
                { label: "Clicks", value: "██", color: BRAND.sage },
                { label: "Conv.", value: "█%", color: BRAND.text },
              ].map((m, i) => (
                <div key={i} style={{
                  flex: 1,
                  background: BRAND.surface,
                  borderRadius: 6,
                  padding: "8px 10px",
                }}>
                  <div style={{ fontSize: 7, color: BRAND.dim, marginBottom: 3 }}>{m.label}</div>
                  <div style={{ fontSize: 14, color: m.color, fontWeight: 500 }}>{m.value}</div>
                </div>
              ))}
            </div>
            {/* Fake chart bars */}
            <div style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 4,
              height: 60,
              padding: "0 4px",
            }}>
              {[35, 45, 30, 55, 70, 50, 65, 80, 60, 75, 90, 45].map((h, i) => (
                <div key={i} style={{
                  flex: 1,
                  height: `${h}%`,
                  background: i === 10 ? BRAND.gold : `${BRAND.gold}33`,
                  borderRadius: 2,
                }}/>
              ))}
            </div>
          </div>

          {/* Redacted overlay */}
          <div style={{
            position: "absolute",
            bottom: 8,
            right: 8,
            fontSize: 8,
            color: BRAND.dim,
            background: "rgba(13,13,18,0.8)",
            padding: "3px 6px",
            borderRadius: 3,
          }}>
            ● REC — details redacted
          </div>
        </div>

        <div style={{
          textAlign: "center",
          paddingTop: 10,
          fontSize: 11,
          color: BRAND.dim,
          letterSpacing: "0.08em",
        }}>
          Real data. Real dashboard. No hype.
        </div>
      </div>
    </div>
  );
}

// ─── MAIN BRAND KIT ───
const TEMPLATES = [
  { id: "carousel", label: "Carousel", component: CarouselTemplate, desc: "Swipeable tips — your bread & butter" },
  { id: "reel", label: "Reel Overlay", component: ReelTemplate, desc: "Text over stock footage" },
  { id: "quote", label: "Quote", component: QuoteTemplate, desc: "Static insight graphic" },
  { id: "compare", label: "Do This Not That", component: ComparisonTemplate, desc: "High-engagement comparison" },
  { id: "screen", label: "Screen Recording", component: ScreenRecordingTemplate, desc: "Dashboard / tool walkthrough" },
];

export default function BrandKit() {
  const [active, setActive] = useState("carousel");
  const ActiveTemplate = TEMPLATES.find(t => t.id === active)?.component;
  const activeData = TEMPLATES.find(t => t.id === active);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#08080C",
      color: BRAND.text,
      fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif",
    }}>
      {/* Header */}
      <div style={{
        padding: "20px 16px 16px",
        borderBottom: `1px solid ${BRAND.border}`,
      }}>
        <div style={{
          fontSize: 10,
          letterSpacing: "0.2em",
          color: BRAND.gold,
          textTransform: "uppercase",
          marginBottom: 4,
          fontWeight: 500,
        }}>Brand Kit</div>
        <div style={{
          fontSize: 20,
          fontWeight: 600,
          letterSpacing: "-0.02em",
        }}>The Quiet Hustle</div>
        <div style={{ fontSize: 12, color: BRAND.muted, marginTop: 2 }}>
          5 core content templates — tap to preview
        </div>
      </div>

      {/* Color Palette */}
      <div style={{ padding: "16px 16px 4px" }}>
        <div style={{ fontSize: 10, color: BRAND.dim, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>
          Palette
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {[
            { color: "#0D0D12", name: "Deep" },
            { color: "#1A1A2E", name: "Surface" },
            { color: "#C4A265", name: "Gold" },
            { color: "#E8D5B7", name: "Sand" },
            { color: "#7A9E7E", name: "Sage" },
            { color: "#F5F0EB", name: "Cream" },
          ].map(c => (
            <div key={c.name} style={{ flex: 1, textAlign: "center" }}>
              <div style={{
                width: "100%",
                aspectRatio: "1/1",
                background: c.color,
                borderRadius: 6,
                border: `1px solid ${BRAND.border}`,
              }}/>
              <div style={{ fontSize: 8, color: BRAND.dim, marginTop: 4 }}>{c.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Template Selector */}
      <div style={{
        padding: "12px 16px",
        display: "flex",
        gap: 4,
        overflowX: "auto",
      }}>
        {TEMPLATES.map(t => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            style={{
              flex: "0 0 auto",
              padding: "7px 14px",
              borderRadius: 20,
              border: `1px solid ${active === t.id ? BRAND.gold : BRAND.border}`,
              background: active === t.id ? `${BRAND.gold}15` : "transparent",
              color: active === t.id ? BRAND.gold : BRAND.muted,
              fontSize: 12,
              cursor: "pointer",
              fontWeight: active === t.id ? 500 : 400,
              transition: "all 0.2s",
              whiteSpace: "nowrap",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Active Template Preview */}
      <div style={{ padding: "8px 16px 12px" }}>
        <div style={{
          fontSize: 11,
          color: BRAND.muted,
          marginBottom: 10,
        }}>
          {activeData?.desc}
          {active === "carousel" && <span style={{ color: BRAND.dim }}> — tap to swipe</span>}
        </div>
        <div style={{ maxWidth: 360, margin: "0 auto" }}>
          {ActiveTemplate && <ActiveTemplate />}
        </div>
      </div>

      {/* Voice Guide */}
      <div style={{
        margin: "8px 16px 20px",
        padding: 16,
        background: BRAND.card,
        borderRadius: 10,
        border: `1px solid ${BRAND.border}`,
      }}>
        <div style={{
          fontSize: 10,
          color: BRAND.gold,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          marginBottom: 10,
        }}>Brand Voice</div>
        <p style={{
          fontSize: 13,
          color: BRAND.text,
          margin: "0 0 10px 0",
          lineHeight: 1.5,
          fontStyle: "italic",
          fontFamily: "'Georgia', serif",
        }}>
          "A smart colleague who just quietly explained how things actually work over coffee."
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {["No exclamation marks", "Say 'income systems' not 'passive income'", "Never promise dollar amounts", "Calm authority", "Slight insider humor"].map(rule => (
            <span key={rule} style={{
              fontSize: 10,
              padding: "4px 8px",
              borderRadius: 4,
              background: BRAND.surface,
              color: BRAND.muted,
            }}>{rule}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
