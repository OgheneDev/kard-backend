export type TemplateParams = {
  title: string;
  description?: string;
  site?: string;
  theme?: "editorial" | "dark" | "minimal";
};

export function renderTemplate(params: TemplateParams): string {
  const { title, description, site = "kard", theme = "editorial" } = params;

  const themes = {
    editorial: {
      bg: "#f5f0e8",
      leftBg: "#1a1a1a",
      leftText: "#3f3f3f",
      rule: "#d4cfc5",
      title: "#1a1a1a",
      desc: "#7a7060",
      dot: "#d4cfc5",
    },
    dark: {
      bg: "#111111",
      leftBg: "#0a0a0a",
      leftText: "#3f3f46",
      rule: "#1f1f1f",
      title: "#fafafa",
      desc: "#52525b",
      dot: "#6366f1",
    },
    minimal: {
      bg: "#ffffff",
      leftBg: "#f4f4f5",
      leftText: "#a1a1aa",
      rule: "#e4e4e7",
      title: "#09090b",
      desc: "#a1a1aa",
      dot: "#d4d4d8",
    },
  };

  const t = themes[theme];

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Lora:ital@1&display=swap" rel="stylesheet" />
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          width: 1200px;
          height: 630px;
          display: flex;
          overflow: hidden;
        }
        .left {
          background: ${t.leftBg};
          width: 200px;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 52px 40px;
        }
        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: ${t.dot};
        }
        .site {
          font-family: sans-serif;
          font-size: 13px;
          color: ${t.leftText};
          letter-spacing: 0.15em;
          text-transform: uppercase;
          writing-mode: vertical-rl;
          text-orientation: mixed;
          transform: rotate(180deg);
        }
        .right {
          background: ${t.bg};
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 72px 90px;
          gap: 28px;
        }
        .rule {
          height: 1px;
          background: ${t.rule};
        }
        .title {
          font-family: 'DM Serif Display', serif;
          font-size: 58px;
          color: ${t.title};
          line-height: 1.08;
          font-style: italic;
        }
        .desc {
          font-family: 'Lora', serif;
          font-size: 20px;
          color: ${t.desc};
          line-height: 1.6;
          font-style: italic;
        }
      </style>
    </head>
    <body>
      <div class="left">
        <div class="dot"></div>
        <div class="site">${escapeHtml(site)}</div>
      </div>
      <div class="right">
        <div class="rule"></div>
        <div class="title">${escapeHtml(title)}</div>
        ${description ? `<div class="desc">${escapeHtml(description)}</div>` : ""}
        <div class="rule"></div>
      </div>
    </body>
    </html>
  `;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
