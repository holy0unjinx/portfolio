(() => {
  const style = document.createElement("style");
  style.textContent = `
    html *, html *::before, html *::after {
    -webkit-user-select: none !important;
    user-select: none !important;
    -webkit-user-drag: none !important;
  }
    
    #fake-drag {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 9999;
      pointer-events: none;
      backdrop-filter: invert(1);
    }
    #fake-drag .corner {
      position: absolute;
      width: 8px;
      height: 8px;
      box-sizing: border-box;
      background: white;
      border: 1px solid black;
      transform: translate(-50%, -50%);
    }
    #fake-drag .corner:nth-child(1) { left: 0; top: 0; }
    #fake-drag .corner:nth-child(2) { left: 100%; top: 0; }
    #fake-drag .corner:nth-child(3) { left: 0; top: 100%; }
    #fake-drag .corner:nth-child(4) { left: 100%; top: 100%; }
  `;
  document.head.append(style);

  const overlay = document.createElement("div");
  overlay.id = "fake-drag";
  overlay.hidden = true;
  overlay.setAttribute("aria-hidden", "true");
  for (let i = 0; i < 4; i++) {
    const corner = document.createElement("span");
    corner.className = "corner";
    overlay.append(corner);
  }
  document.body.append(overlay);

  let start = null;
  let dragged = false;
  const clear = () => {
    start = null;
    overlay.hidden = true;
  };

  document.addEventListener("selectstart", (event) => event.preventDefault());
  document.addEventListener("dragstart", (event) => event.preventDefault());

  // 마우스 내림
  window.addEventListener("pointerdown", (event) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    dragged = false;
    start = { x: event.clientX, y: event.clientY };
    window.getSelection()?.removeAllRanges();
  });

  // 포인터 움직임
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

  //마우스 떼기
  window.addEventListener("pointerup", clear);
  window.addEventListener("pointercancel", clear);
  window.addEventListener("blur", clear);
  document.addEventListener("visibilitychange", clear);

  window.addEventListener(
    "click",
    (event) => {
      if (!dragged || event.detail === 0) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      dragged = false;
    },
    true,
  );
})();
