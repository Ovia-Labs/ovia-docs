import { marked } from "marked";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import bash from "highlight.js/lib/languages/bash";
import plaintext from "highlight.js/lib/languages/plaintext";
import xml from "highlight.js/lib/languages/xml";
import "highlight.js/styles/github-dark.css";
import hljsDefineSolidity from "highlightjs-solidity";
import { renderDocsComponents } from "./components/diagrams.js";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("js", javascript);
hljs.registerLanguage("json", json);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("shell", bash);
hljs.registerLanguage("text", plaintext);
hljs.registerLanguage("plaintext", plaintext);
hljs.registerLanguage("html", xml);
hljs.registerLanguage("xml", xml);
hljsDefineSolidity(hljs);
marked.setOptions({ gfm: true, breaks: false });

const docs = [
  { title: "Start Here", pages: ["start-here"] },
  {
    title: "Ovia Labs",
    pages: [
      "what-is-ovia",
      "why-ovia-labs",
      "why-we-build",
      "vision",
      "trust-infrastructure",
      "ecosystem",
    ],
  },
  { title: "Products", pages: ["products", "protocol-overview", "chartlabs-pulse"] },
  {
    title: "Ovia Protocol",
    pages: [
      "problem",
      "solution",
      "how-it-works",
      "use-cases",
      "security",
      "architecture",
      "roadmap",
      "faq",
    ],
  },
  { title: "Community", pages: ["building-in-public", "contributors"] },
  { title: "Legal", pages: ["disclaimer"] },
];

const pageLabels = {
  "start-here": "Start Here",
  "what-is-ovia": "What Is Ovia Labs?",
  "why-ovia-labs": "Why Ovia Labs?",
  "why-we-build": "Why We Build",
  vision: "Vision",
  "trust-infrastructure": "Trust Infrastructure",
  ecosystem: "Ecosystem",
  products: "Products",
  "protocol-overview": "Ovia Protocol",
  "chartlabs-pulse": "ChartLabs Pulse",
  problem: "The Problem",
  solution: "The Solution",
  "how-it-works": "How It Works",
  "use-cases": "Use Cases",
  security: "Security",
  architecture: "Architecture",
  roadmap: "Roadmap",
  faq: "FAQ",
  "building-in-public": "Building In Public",
  contributors: "Contributors",
  disclaimer: "Disclaimer",
};

const nav = document.getElementById("nav");
const content = document.getElementById("content");
const search = document.getElementById("search");
const searchResults = document.getElementById("search-results");
const prevBtn = document.getElementById("prev-page");
const nextBtn = document.getElementById("next-page");
const breadcrumb = document.getElementById("breadcrumb");
const pageStatus = document.getElementById("page-status");
const menuToggle = document.getElementById("menu-toggle");
const sidebar = document.querySelector(".sidebar");
const overlay = document.getElementById("sidebar-overlay");

const flatPages = docs.flatMap((section) => section.pages);

// Per-section accent themes. Default (no attribute) = Ovia Labs blue.
const sectionThemes = {
  "Ovia Protocol": "protocol",
};
const pageThemes = {
  "protocol-overview": "protocol",
  "chartlabs-pulse": "pulse",
};

function themeFor(page) {
  if (pageThemes[page]) return pageThemes[page];
  const section = docs.find((s) => s.pages.includes(page));
  return sectionThemes[section?.title] || "labs";
}

function applyTheme(page) {
  const theme = themeFor(page);
  if (theme === "labs") delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = theme;
  const themeColors = { labs: "#06080a", protocol: "#06080a", pulse: "#06080a" };
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", themeColors[theme]);
}

const markdownCache = new Map();
// Markdown is bundled at build time. Fetching "/src/pages/*.md" only works in
// dev: `vite build` does not emit src/ files, and the Vercel rewrite would
// return index.html for every .md request in production.
const pageModules = import.meta.glob("./pages/*.md", { query: "?raw", import: "default" });
let currentPage = "start-here";

function label(page) {
  return pageLabels[page] || page.replaceAll("-", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function getSection(page) {
  return docs.find((section) => section.pages.includes(page));
}

function pageFromLocation() {
  return decodeURIComponent(window.location.pathname.replace(/^\/+|\/+$/g, "")) || "start-here";
}

function setMeta(page) {
  const pageTitle = label(page);
  document.title = page === "start-here" ? "Ovia Labs Documentation" : `${pageTitle} | Ovia Labs Docs`;
  document.querySelector('meta[name="description"]')?.setAttribute(
    "content",
    page === "start-here"
      ? "Official documentation for Ovia Labs, Ovia Protocol and ChartLabs Pulse."
      : `Learn about ${pageTitle} in the official Ovia Labs documentation.`
  );
}

function setBreadcrumb(page) {
  const section = getSection(page);
  const parts = page === "start-here" ? ["Docs", label(page)] : ["Docs", section?.title || "Docs", label(page)];
  breadcrumb.innerHTML = parts
    .map((part, index) => `${index ? '<span aria-hidden="true">/</span>' : ""}<span class="${index === parts.length - 1 ? "current" : ""}">${part}</span>`)
    .join("");
}

async function fetchMarkdown(page) {
  if (markdownCache.has(page)) return markdownCache.get(page);
  const loadPageModule = pageModules[`./pages/${page}.md`];
  if (!loadPageModule) throw new Error("This page does not exist in the documentation.");
  const markdown = await loadPageModule();
  markdownCache.set(page, markdown);
  return markdown;
}

function enhanceRenderedContent() {
  content.querySelectorAll("pre code").forEach((block) => hljs.highlightElement(block));

  content.querySelectorAll("h2, h3").forEach((heading) => {
    const id = heading.textContent
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
    if (!id) return;
    heading.id = id;
    heading.classList.add("anchor-heading");
    heading.addEventListener("click", () => {
      history.replaceState({}, "", `${window.location.pathname}#${id}`);
      navigator.clipboard?.writeText(window.location.href).catch(() => {});
    });
  });

  content.querySelectorAll('a[href^="http"]').forEach((link) => {
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });
}

function updatePageNavigation(page) {
  const index = flatPages.indexOf(page);
  const prev = flatPages[index - 1];
  const next = flatPages[index + 1];

  prevBtn.hidden = !prev;
  nextBtn.hidden = !next;

  if (prev) {
    prevBtn.innerHTML = `<small>Previous</small><strong>← ${label(prev)}</strong>`;
    prevBtn.onclick = () => navigate(prev);
  }
  if (next) {
    nextBtn.innerHTML = `<small>Next</small><strong>${label(next)} →</strong>`;
    nextBtn.onclick = () => navigate(next);
  }
}

function updateActiveNav(page) {
  document.querySelectorAll(".nav-item").forEach((item) => {
    const active = item.dataset.page === page;
    item.classList.toggle("active", active);
    if (active) item.setAttribute("aria-current", "page");
    else item.removeAttribute("aria-current");
  });
}

async function loadPage(requestedPage, updateUrl = true) {
  const page = flatPages.includes(requestedPage) ? requestedPage : "start-here";
  currentPage = page;

  if (updateUrl) history.pushState({}, "", page === "start-here" ? "/" : `/${page}`);

  updateActiveNav(page);
  applyTheme(page);
  setBreadcrumb(page);
  setMeta(page);
  pageStatus.textContent = "Loading…";
  content.classList.add("is-loading");

  try {
    const markdown = await fetchMarkdown(page);
    const processed = renderDocsComponents(markdown);
    content.innerHTML = marked.parse(processed);
    enhanceRenderedContent();
    pageStatus.textContent = "Documentation";
  } catch (error) {
    content.innerHTML = `
      <div class="error-state">
        <span>404</span>
        <h1>Page unavailable</h1>
        <p>${error.message}</p>
        <button id="return-home">Return to Start Here</button>
      </div>`;
    document.getElementById("return-home")?.addEventListener("click", () => navigate("start-here"));
    pageStatus.textContent = "Page unavailable";
  } finally {
    content.classList.remove("is-loading");
  }

  updatePageNavigation(page);
  closeSidebar();
  window.scrollTo({ top: 0, behavior: updateUrl ? "smooth" : "auto" });

  requestAnimationFrame(() => {
    if (window.location.hash) document.querySelector(window.location.hash)?.scrollIntoView();
  });
}

function navigate(page) {
  if (page === currentPage) return;
  loadPage(page, true);
}

function buildNavigation() {
  const fragment = document.createDocumentFragment();
  docs.forEach((section) => {
    const group = document.createElement("div");
    group.className = "nav-group";
    group.dataset.section = section.title.toLowerCase();

    const heading = document.createElement("div");
    heading.className = "nav-section";
    heading.textContent = section.title;
    group.appendChild(heading);

    section.pages.forEach((page) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "nav-item";
      button.dataset.page = page;
      button.textContent = label(page);
      button.addEventListener("click", () => navigate(page));
      group.appendChild(button);
    });
    fragment.appendChild(group);
  });
  nav.appendChild(fragment);
}

async function buildSearchIndex() {
  await Promise.all(
    flatPages.map(async (page) => {
      try { await fetchMarkdown(page); } catch { /* surfaced when opened */ }
    })
  );
}

function renderSearchResults(term) {
  const query = term.trim().toLowerCase();
  if (!query) {
    searchResults.hidden = true;
    searchResults.innerHTML = "";
    document.querySelectorAll(".nav-group").forEach((group) => (group.hidden = false));
    document.querySelectorAll(".nav-item").forEach((item) => (item.hidden = false));
    return;
  }

  const results = flatPages
    .map((page) => {
      const raw = markdownCache.get(page) || "";
      const plain = raw.replace(/<[^>]*>|[#>*_`{}\[\]()-]/g, " ").replace(/\s+/g, " ");
      const haystack = `${label(page)} ${plain}`.toLowerCase();
      const score = (label(page).toLowerCase().includes(query) ? 10 : 0) + (haystack.includes(query) ? 1 : 0);
      if (!score) return null;
      const at = haystack.indexOf(query);
      const snippet = plain.slice(Math.max(0, at - 55), at + query.length + 95).trim();
      return { page, score, snippet };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);

  searchResults.hidden = false;
  searchResults.innerHTML = results.length
    ? results.map(({ page, snippet }) => `<button type="button" data-search-page="${page}"><strong>${label(page)}</strong><span>${snippet || "Open page"}</span></button>`).join("")
    : `<div class="search-empty">No pages found for “${term}”.</div>`;

  searchResults.querySelectorAll("[data-search-page]").forEach((button) => {
    button.addEventListener("click", () => {
      search.value = "";
      renderSearchResults("");
      navigate(button.dataset.searchPage);
    });
  });
}

function openSidebar() {
  sidebar.classList.add("open");
  overlay.hidden = false;
  menuToggle.setAttribute("aria-expanded", "true");
  document.body.classList.add("menu-open");
}

function closeSidebar() {
  sidebar.classList.remove("open");
  overlay.hidden = true;
  menuToggle.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
}

buildNavigation();
buildSearchIndex();
search.addEventListener("input", (event) => renderSearchResults(event.target.value));
search.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    search.value = "";
    renderSearchResults("");
    search.blur();
  }
});
menuToggle.addEventListener("click", () => (sidebar.classList.contains("open") ? closeSidebar() : openSidebar()));
overlay.addEventListener("click", closeSidebar);
window.addEventListener("keydown", (event) => event.key === "Escape" && closeSidebar());
window.addEventListener("popstate", () => loadPage(pageFromLocation(), false));

loadPage(pageFromLocation(), false);
