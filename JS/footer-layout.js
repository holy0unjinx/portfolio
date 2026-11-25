const section = document.querySelector("#second");
const footer = section.querySelector("footer");

function alignFooter() {
  footer.style.marginTop = "0px";
  const padding = parseFloat(getComputedStyle(section).paddingBottom);
  const bottom = section.getBoundingClientRect().bottom - padding;
  let low = 0;
  let high = Math.max(0, bottom - footer.getBoundingClientRect().top);
  // Find the largest gap that fits, including changes to float wrapping.
  for (let i = 0; i < 24; i++) {
    const gap = (low + high) / 2;
    footer.style.marginTop = `${gap}px`;
    if (footer.getBoundingClientRect().bottom <= bottom) low = gap;
    else high = gap;
  }
  footer.style.marginTop = `${low}px`;
}

new ResizeObserver(alignFooter).observe(section.querySelector(".infobox"));
window.addEventListener("resize", alignFooter);
window.addEventListener("load", alignFooter);
document.fonts.ready.then(alignFooter);
