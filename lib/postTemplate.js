// Shared post-page renderer - used by both build.js (real publish) and
// api/preview.js (live preview in the editor), so a preview is guaranteed
// to look exactly like the published page.
export const SITE = "https://www.weflux.in";

export const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
export function fmtDate(d) {
  const dt = d ? new Date(d) : null;
  if (!dt || isNaN(dt)) return "";
  return `${dt.getDate()} ${MONTHS[dt.getMonth()]} ${dt.getFullYear()}`;
}
export function readTime(html) {
  const words = String(html || "").replace(/<[^>]+>/g, " ").trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

// Make a possibly-relative image URL absolute (required for og:image/twitter:image to work).
export function absUrl(s) {
  if (!s) return "";
  if (s.startsWith("/")) s = SITE + s;
  return /^https?:\/\//.test(s) ? s : "";
}
export const DEFAULT_OG = `${SITE}/assets/weflux-logo.png`;

// The person behind the posts. Shown as a bio under each article and used as
// the schema.org author, so search engines see a named, linked author.
export const AUTHOR = {
  name: "Prateek Prakash",
  role: "Founder & Lead Developer, Weflux",
  bio: "Prateek leads product engineering and architecture at Weflux, and builds the WhatsApp Business Cloud API tools these guides describe. He writes about what actually works when Indian businesses run customer conversations on WhatsApp.",
  url: `${SITE}/about`,
};
// First image in a post's rendered HTML, absolute-ised - used as a fallback og:image.
export function firstImg(html) {
  const m = /<img[^>]+src="([^"]+)"/i.exec(html || "");
  return m ? absUrl(m[1]) : "";
}

export const HEAD_LINKS = `
  <link rel="icon" href="/assets/weflux-logo.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/styles.css">`;

// col: {key, dir, title}  post: {slug,title,description,metaTitle,keywords,tags,faqs,
//   date,dateLabel,author,category,readTime,image,imageAlt,html}
// opts.preview: render a "not published yet" banner + <base> tag so it renders correctly
//   when opened standalone (document.write into a blank tab) instead of at its real URL.
export function renderPostPage(col, post, opts = {}) {
  const preview = !!opts.preview;
  const url = `${SITE}/${col.dir}/${post.slug}`;
  const ogImage = absUrl(post.image) || firstImg(post.html) || DEFAULT_OG;
  const metaLine = [post.author, post.dateLabel, post.readTime].filter(Boolean).join(" · ");
  const pageTitle = post.metaTitle || post.title;
  const jsonld = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description || "",
    image: ogImage,
    datePublished: post.date || undefined,
    dateModified: post.date || undefined,
    author: post.author === AUTHOR.name
      ? { "@type": "Person", name: AUTHOR.name, jobTitle: AUTHOR.role, url: AUTHOR.url }
      : { "@type": post.author ? "Person" : "Organization", name: post.author || "Weflux Team" },
    publisher: {
      "@type": "Organization",
      name: "Weflux",
      logo: { "@type": "ImageObject", url: `${SITE}/assets/weflux-logo.png` },
    },
    mainEntityOfPage: url,
    url,
  };
  const crumbJsonld = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: col.title, item: `${SITE}/${col.dir}` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  });
  const authorBio = post.author === AUTHOR.name ? `
      <aside class="post-author" style="max-width:760px;margin:48px auto 0;display:flex;gap:16px;align-items:flex-start;padding:20px 22px;background:#fff;border:1px solid var(--line);border-radius:16px">
        <span aria-hidden="true" style="flex:0 0 auto;width:48px;height:48px;border-radius:50%;display:grid;place-items:center;background:var(--green-tint);color:var(--green-deep);font-weight:700;font-size:16px">PP</span>
        <div>
          <p style="font-size:12px;font-family:var(--font-mono);color:var(--muted);text-transform:uppercase;letter-spacing:.05em;margin:0">Written by</p>
          <p style="font-size:16px;font-weight:600;margin:2px 0 0"><a href="/about" style="color:var(--ink)">${esc(AUTHOR.name)}</a></p>
          <p style="font-size:13px;color:#4B5563;margin:2px 0 8px">${esc(AUTHOR.role)}</p>
          <p style="font-size:14px;line-height:1.6;color:#374151;margin:0">${esc(AUTHOR.bio)}</p>
        </div>
      </aside>` : "";
  const faqJsonld = post.faqs && post.faqs.length ? JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": post.faqs.map((f) => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a },
    })),
  }) : "";
  const faqSection = post.faqs && post.faqs.length ? `
      <section class="post-faqs" style="max-width:760px;margin:56px auto 0">
        <h2 style="font-size:22px;font-weight:700;margin:0 0 20px;letter-spacing:-.02em">Frequently Asked Questions</h2>
        <div class="post-faq-list">
          ${post.faqs.map((f) => `<details class="post-faq-item">
            <summary class="post-faq-q">${esc(f.q)}</summary>
            <div class="post-faq-a">${esc(f.a)}</div>
          </details>`).join("\n          ")}
        </div>
      </section>` : "";
  // Cover image hero - only when a dedicated cover image was uploaded (not the
  // in-body firstImg fallback, which already appears once inside the article).
  const cover = post.cover_img || { src: post.image, w: 0, h: 0 };
  const coverHero = post.image ? `
      <div style="max-width:760px;margin:0 auto 32px">
        <img src="${esc(cover.src)}" alt="${esc(post.imageAlt || post.title)}"${cover.w ? ` width="${cover.w}" height="${cover.h}"` : ""} style="width:100%;height:auto;border-radius:16px;display:block" loading="eager" fetchpriority="high" decoding="async">
      </div>` : "";
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  ${preview ? `<base href="${SITE}/">\n  <meta name="robots" content="noindex">` : ""}
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(pageTitle)} | Weflux</title>
  <meta name="description" content="${esc(post.description)}">
  <link rel="canonical" href="${url}">
  <meta property="og:title" content="${esc(pageTitle)}">
  <meta property="og:description" content="${esc(post.description)}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="${url}">
  <meta property="og:site_name" content="Weflux">
  <meta property="og:image" content="${esc(ogImage)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:image" content="${esc(ogImage)}">
  ${post.date ? `<meta property="article:published_time" content="${post.date}">` : ""}
  ${post.author ? `<meta property="article:author" content="${esc(post.author)}">` : ""}${HEAD_LINKS}
  <script type="application/ld+json">${JSON.stringify(jsonld)}</script>
  ${faqJsonld ? `<script type="application/ld+json">${faqJsonld}</script>` : ""}
  <script type="application/ld+json">${crumbJsonld}</script>
</head>
<body data-page="${col.key}">
  ${preview ? `<div style="position:sticky;top:0;z-index:999;background:#10211a;color:#fff;text-align:center;font-family:'Geist',sans-serif;font-size:13px;font-weight:600;padding:9px;letter-spacing:.02em">👁 PREVIEW - this is not published yet</div>` : ""}
  <div id="wc-nav"></div>
  <main id="main" class="page">
    <section class="container page-hero" style="max-width:820px">
      <div class="crumb"><a href="/">Home</a> <span class="sep">/</span> <a href="/${col.dir}">${esc(col.title)}</a> <span class="sep">/</span> <span>${esc(post.title)}</span></div>
      ${post.category ? `<span class="eyebrow"><span class="dot"></span> ${esc(post.category)}</span>` : ""}
      <h1>${esc(post.title)}</h1>
      ${post.description ? `<p class="lede">${esc(post.description)}</p>` : ""}
      ${metaLine ? `<p style="font-family:var(--font-mono);font-size:12.5px;color:var(--muted);margin-top:8px">${esc(metaLine)}</p>` : ""}
    </section>
    <section class="container" style="padding-bottom:96px">${coverHero}
      <article class="prose" style="max-width:760px;margin:0 auto">
${post.html}
      </article>${faqSection}${authorBio}
      <div style="max-width:760px;margin:48px auto 0">
        <a href="/${col.dir}" class="btn btn-ghost">← Back to ${esc(col.title)}</a>
      </div>
    </section>
  </main>
  <div id="wc-footer"></div>
  <script src="/shell.js"></script>
  ${preview ? "" : `<script>try{fetch('/api/view?slug=${col.dir}__${post.slug}',{method:'POST',keepalive:true}).catch(function(){});}catch(e){}</script>`}
</body>
</html>
`;
}
