// Temporary experiment: remove the script tags to disable all styles and behavior.
(() => {
  const style = document.createElement("style");
  style.textContent = `
    html *, html *::before, html *::after {
      -webkit-user-select: none !important;
      user-select: none !important;
      -webkit-user-drag: none !important;
    }
    #drag-invert-test {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 2147483647;
      pointer-events: none;
      backdrop-filter: invert(1);
      -webkit-backdrop-filter: invert(1);
    }
  `;
  document.head.append(style);

  const overlay = document.createElement("div");
  overlay.id = "drag-invert-test";
  overlay.hidden = true;
  overlay.setAttribute("aria-hidden", "true");
  document.body.append(overlay);

  let start = null;
  let dragged = false;
  const clear = () => {
    start = null;
    overlay.hidden = true;
  };

  document.addEventListener("selectstart", (event) => event.preventDefault());
  document.addEventListener("dragstart", (event) => event.preventDefault());

  window.addEventListener("pointerdown", (event) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    dragged = false;
    start = { x: event.clientX, y: event.clientY };
    window.getSelection()?.removeAllRanges();
  });

  window.addEventListener("pointermove", (event) => {
    if (!start || event.pointerType !== "mouse") return;
    if (!(event.buttons & 1)) {
      clear();
      return;
    }
    const width = Math.abs(event.clientX - start.x);
    const height = Math.abs(event.clientY - start.y);
    dragged ||= width > 3 || height > 3;
    Object.assign(overlay.style, {
      left: `${Math.min(start.x, event.clientX)}px`,
      top: `${Math.min(start.y, event.clientY)}px`,
      width: `${width}px`,
      height: `${height}px`,
    });
    overlay.hidden = false;
  });

  window.addEventListener("pointerup", clear);
  window.addEventListener("pointercancel", clear);
  window.addEventListener("blur", clear);
  document.addEventListener("visibilitychange", clear);

  // Preserve ordinary link clicks, but avoid navigation after dragging a link.
  window.addEventListener("click", (event) => {
    if (!dragged || event.detail === 0) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    dragged = false;
  }, true);
})();
