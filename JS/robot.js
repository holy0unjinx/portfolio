(() => {
  const v = document.getElementById("v");
  const toSpans = (text) => {
    let r = "";
    for (let i = 0; i < text.length; i++) {
      r += `<span class=${Math.random() < 0.5 ? "serif" : ""}>${text[i]}</span>`;
    }
    return r;
  };

  if (v) {
    const chars =
      "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890Easteregg";
    let vs = "";
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      vs += chars[randomIndex];
    }
    v.innerHTML = toSpans(vs);
  }

  const h1 = document.querySelector("h1");
  h1.innerHTML = toSpans(h1.innerText);

  const getRandom = (min, max) => {
    return (Math.random() * (max - min) + min).toFixed(2);
  };
  const spans = document.querySelectorAll("span");
  spans.forEach((s) => {
    if (s.className == "corner") return;
    s.style.display = "inline-block";
    s.style.padding = "0 0.1rem";
    s.style.transform = `
            translateY(${getRandom(-5, 5)}px) 
            rotate(${getRandom(-12, 12)}deg) 
            skew(${getRandom(-12, 12)}deg, ${getRandom(-10, 10)}deg) 
            scale(${getRandom(0.9, 1.15)}, ${getRandom(0.9, 1.15)})
          `;
  });
})();
