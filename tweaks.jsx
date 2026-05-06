// Zeno — tweaks (subtle: just accent shade)

const ZENO_TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accentShade": "blue",
  "density": "regular"
}/*EDITMODE-END*/;

const ZENO_STORAGE_KEY = "zeno-tweaks-v1";

const SHADES = {
  blue:    { color: "#3b82f6", hover: "#60a5fa", strong: "#2563eb" },
  azure:   { color: "#0ea5e9", hover: "#38bdf8", strong: "#0284c7" },
  indigo:  { color: "#6366f1", hover: "#818cf8", strong: "#4f46e5" },
  steel:   { color: "#64748b", hover: "#94a3b8", strong: "#475569" },
  cobalt:  { color: "#1d4ed8", hover: "#3b82f6", strong: "#1e40af" },
};

function loadZenoTweaks() {
  try {
    const stored = JSON.parse(localStorage.getItem(ZENO_STORAGE_KEY) || "{}");
    return { ...ZENO_TWEAK_DEFAULTS, ...stored };
  } catch { return { ...ZENO_TWEAK_DEFAULTS }; }
}

function applyZenoTweaks(t) {
  const s = SHADES[t.accentShade] || SHADES.blue;
  const r = document.documentElement.style;
  r.setProperty("--accent", s.color);
  r.setProperty("--accent-hover", s.hover);
  r.setProperty("--accent-strong", s.strong);
  // rgba soft from hex
  const hex = s.color.replace("#", "");
  const rgb = [0,2,4].map(i => parseInt(hex.slice(i, i+2), 16)).join(",");
  r.setProperty("--accent-soft", `rgba(${rgb}, 0.1)`);
}

(function () { applyZenoTweaks(loadZenoTweaks()); })();

const ZenoTweaks = () => {
  const [tweaks, setTweak] = useTweaks(loadZenoTweaks());

  React.useEffect(() => {
    localStorage.setItem(ZENO_STORAGE_KEY, JSON.stringify(tweaks));
    applyZenoTweaks(tweaks);
  }, [tweaks]);

  return (
    <TweaksPanel title="Zeno · Tweaks">
      <TweakSection label="Accent">
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {Object.entries(SHADES).map(([key, s]) => (
            <button
              key={key}
              onClick={() => setTweak("accentShade", key)}
              style={{
                padding: "6px 10px",
                fontSize: 11,
                fontFamily: "ui-monospace, monospace",
                background: "transparent",
                border: "1px solid",
                borderColor: tweaks.accentShade === key ? s.color : "rgba(0,0,0,.15)",
                color: tweaks.accentShade === key ? s.strong : "inherit",
                cursor: "pointer",
                borderRadius: 5,
              }}
            >
              <span style={{
                display: "inline-block", width: 8, height: 8, borderRadius: "50%",
                background: s.color, marginRight: 6, verticalAlign: "middle",
              }} />
              {key}
            </button>
          ))}
        </div>
      </TweakSection>
    </TweaksPanel>
  );
};

Object.assign(window, { ZenoTweaks });
