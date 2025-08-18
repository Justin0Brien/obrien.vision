/* === Minimal cookie/consent + conditional Metricool loader === */
(function () {
  var KEY = "analytics_consent";           // 'granted' | 'denied'
  var BANNER_ID = "cookie-banner";
  // Metricool settings (from your snippet)
  var METRICOOL_TRACKER_URL = "https://tracker.metricool.com/resources/be.js";
  var METRICOOL_HASH = "7f781ef91c234e357494daa5f24fc8e8";

  // Helpers
  function getConsent() { try { return localStorage.getItem(KEY); } catch(_) { return null; } }
  function setConsent(v) { try { localStorage.setItem(KEY, v); } catch(_) {} }
  function removeConsent() { try { localStorage.removeItem(KEY); } catch(_) {} }

  // Public API to let you add a “Revisit cookies” link in footer
  window.revisitConsent = function () {
    removeConsent();
    renderBanner();
  };

  // Load Metricool if consent already granted
  function loadMetricool() {
    // If script already in DOM, try to init and bail
    var existing = document.getElementById("metricool-script");
    if (existing) {
      if (window.beTracker && typeof window.beTracker.t === "function") {
        try { window.beTracker.t({ hash: METRICOOL_HASH }); } catch (_) {}
      }
      return;
    }
    var s = document.createElement("script");
    s.id = "metricool-script";
    s.src = METRICOOL_TRACKER_URL;
    s.async = true;
    s.onload = function () {
      if (window.beTracker && typeof window.beTracker.t === "function") {
        try { window.beTracker.t({ hash: METRICOOL_HASH }); } catch (_) {}
      }
    };
    s.onreadystatechange = s.onload; // older browsers
    document.head.appendChild(s);
  }

  // Banner UI
  function renderBanner() {
    if (document.getElementById(BANNER_ID)) return;

    // If a decision exists, act and don’t show banner
    var c = getConsent();
    if (c === "granted") { loadMetricool(); return; }
    if (c === "denied") { return; }

    var banner = document.createElement("div");
    banner.id = BANNER_ID;
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-live", "polite");
    banner.setAttribute("aria-label", "Cookie consent");
    banner.style.cssText = [
      "position:fixed;left:0;right:0;bottom:0;z-index:9999",
      "box-shadow:0 -2px 20px rgba(0,0,0,.15)",
      "padding:12px 16px;display:flex;gap:12px;align-items:center;flex-wrap:wrap",
      "font:14px/1.4 system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,'Helvetica Neue',Arial,sans-serif",
      "border-top:1px solid rgba(0,0,0,.08)",
      "background:var(--cbg,#fff);color:var(--ctxt,#111)"
    ].join(";");

    // Light/dark
    var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (prefersDark) {
      banner.style.setProperty("--cbg", "#111");
      banner.style.setProperty("--ctxt", "#f5f5f5");
      banner.style.boxShadow = "0 -2px 20px rgba(0,0,0,.6)";
      banner.style.borderTop = "1px solid rgba(255,255,255,.12)";
    }

    var msg = document.createElement("div");
    msg.style.flex = "1";
    msg.innerHTML = "We use a single analytics cookie (Metricool) to understand site traffic. No ads, no tracking across other sites. " +
                    "<a href=\"/privacy/\" style=\"text-decoration:underline\">More info</a>.";
    banner.appendChild(msg);

    function mkBtn(text) {
      var b = document.createElement("button");
      b.type = "button";
      b.textContent = text;
      b.style.cssText = [
        "cursor:pointer;border:1px solid currentColor;border-radius:6px",
        "padding:8px 12px;background:transparent;color:inherit"
      ].join(";");
      return b;
    }

    var accept = mkBtn("Accept");
    accept.style.fontWeight = "600";
    accept.onclick = function () {
      setConsent("granted");
      loadMetricool();
      banner.remove();
    };

    var reject = mkBtn("Reject");
    reject.onclick = function () {
      setConsent("denied");
      banner.remove();
    };

    banner.appendChild(accept);
    banner.appendChild(reject);
    document.body.appendChild(banner);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderBanner);
  } else {
    renderBanner();
  }
})();
