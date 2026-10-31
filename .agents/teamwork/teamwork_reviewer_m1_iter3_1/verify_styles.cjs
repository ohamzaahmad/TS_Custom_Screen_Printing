const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({
    executablePath: `${process.env.HOME}/.cache/ms-playwright/chromium-1217/chrome-linux64/chrome`,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("http://localhost:5173/");
  await page.waitForTimeout(2000);

  const results = await page.evaluate(() => {
    function parseRgb(colorStr) {
      const match = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (!match) return [0, 0, 0];
      return [parseInt(match[1], 10), parseInt(match[2], 10), parseInt(match[3], 10)];
    }

    function getLuminance(r, g, b) {
      const srgb = [r / 255, g / 255, b / 255].map(v => 
        v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
      );
      return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
    }

    function getContrast(rgb1, rgb2) {
      const l1 = getLuminance(rgb1[0], rgb1[1], rgb1[2]);
      const l2 = getLuminance(rgb2[0], rgb2[1], rgb2[2]);
      const lighter = Math.max(l1, l2);
      const darker = Math.min(l1, l2);
      return (lighter + 0.05) / (darker + 0.05);
    }

    // 1. Hero H1 (Home.tsx:234)
    const heroH1 = document.querySelector("h1");
    const h1Style = window.getComputedStyle(heroH1);
    const h1Color = h1Style.color;
    const h1Contrast = getContrast(parseRgb(h1Color), [0, 0, 0]);

    // 2. Hero H2 (Home.tsx:348)
    const h2Elements = Array.from(document.querySelectorAll("h2"));
    const heroH2 = h2Elements.find(h => h.textContent && h.textContent.includes("Order custom"));
    const h2Style = heroH2 ? window.getComputedStyle(heroH2) : null;
    const h2Color = h2Style ? h2Style.color : null;
    let curr = heroH2;
    let h2Bg = [15, 23, 42]; // slate-900
    while (curr && curr !== document.documentElement) {
      const bg = window.getComputedStyle(curr).backgroundColor;
      const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
      if (match) {
        const alpha = match[4] !== undefined ? parseFloat(match[4]) : 1;
        if (alpha > 0.05) {
          h2Bg = [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
          break;
        }
      }
      curr = curr.parentElement;
    }
    const h2Contrast = h2Color ? getContrast(parseRgb(h2Color), h2Bg) : null;

    // 3. Dark card H3 (Home.tsx:639)
    const h3Elements = Array.from(document.querySelectorAll("h3"));
    const darkH3 = h3Elements.find(h => h.textContent && h.textContent.includes("build your next print run"));
    const h3Style = darkH3 ? window.getComputedStyle(darkH3) : null;
    const h3Color = h3Style ? h3Style.color : null;
    let currH3 = darkH3;
    let h3Bg = [10, 0, 21];
    while (currH3 && currH3 !== document.documentElement) {
      const bg = window.getComputedStyle(currH3).backgroundColor;
      const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
      if (match) {
        const alpha = match[4] !== undefined ? parseFloat(match[4]) : 1;
        if (alpha > 0.05) {
          h3Bg = [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
          break;
        }
      }
      currH3 = currH3.parentElement;
    }
    const h3Contrast = h3Color ? getContrast(parseRgb(h3Color), h3Bg) : null;

    // 4. Footer Legal H4 (Footer.tsx:172)
    const h4Elements = Array.from(document.querySelectorAll("h4"));
    const footerH4 = h4Elements.find(h => h.textContent && h.textContent.includes("Legal"));
    const h4Style = footerH4 ? window.getComputedStyle(footerH4) : null;
    const h4Color = h4Style ? h4Style.color : null;

    // 5. Desktop nav buttons
    const navButtons = Array.from(document.querySelectorAll("header button, nav button, nav a"));
    const aboutBtn = navButtons.find(b => b.textContent && b.textContent.includes("About"));
    const navStyle = aboutBtn ? window.getComputedStyle(aboutBtn) : null;

    return {
      heroH1: {
        text: heroH1.textContent.trim().replace(/\s+/g, " "),
        color: h1Color,
        fontFamily: h1Style.fontFamily,
        contrastOnBlack: h1Contrast.toFixed(2)
      },
      heroH2: heroH2 ? {
        text: heroH2.textContent.trim().replace(/\s+/g, " "),
        color: h2Color,
        bgFound: `rgb(${h2Bg.join(", ")})`,
        contrastOnDarkSlate: h2Contrast ? h2Contrast.toFixed(2) : null
      } : null,
      darkCardH3: darkH3 ? {
        text: darkH3.textContent.trim().replace(/\s+/g, " "),
        color: h3Color,
        bgFound: `rgb(${h3Bg.join(", ")})`,
        contrastOnBrandDark: h3Contrast ? h3Contrast.toFixed(2) : null
      } : null,
      footerLegalH4: footerH4 ? {
        text: footerH4.textContent.trim(),
        color: h4Color,
        fontFamily: h4Style.fontFamily
      } : null,
      navButton: navStyle ? {
        text: aboutBtn.textContent.trim(),
        letterSpacing: navStyle.letterSpacing,
        fontFamily: navStyle.fontFamily,
        textTransform: navStyle.textTransform
      } : null
    };
  });

  console.log("=== EMPIRICAL MEASUREMENT RESULTS ===");
  console.log(JSON.stringify(results, null, 2));
  await browser.close();
})();
