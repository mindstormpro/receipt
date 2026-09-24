// RECEIPT!
// This is the file to edit. p5.js reference: https://p5js.org/reference/
import JsBarcode from "jsbarcode";
import kai from "./kai.png";
import heart from "./heart.png"

export const receipt = {
  height: 800, // 240–2000 px. Width is fixed by the printer.
  seed: 67,
};

// happee birthday (heart pic too)
// --------------
// |----------|
// |          |
// |The Image |
// |          |
// |----------|
// -------------
// barcode here 
//
//
//

export function drawReceipt(p) {
  const { width: w, height: h } = p;
  const margin = 24;

  // Header
  p.noStroke();
  p.fill(0);
    p.textFont("monospace");
    p.textAlign(p.LEFT, p.TOP);
    p.textStyle(p.BOLD);
    p.textSize(28);
    p.text("Happy birthday Kai!", margin , 30);
  p.loadImage(heart, (img) => {
    const imgWidth = 40;
    const imgHeight = 39;
    p.image(img, margin * 13.5, margin, imgWidth, imgHeight);
    p.filter(p.THRESHOLD, 0.5);
  });

  dashedLine(p, margin, 94, w - margin, 94, 6, 5);


  p.loadImage(kai, (img) => {
    const imgWidth = w - (margin * 2);
    const imgHeight = (img.height / img.width) * imgWidth;
    p.image(img, margin, 100, imgWidth, imgHeight);
    p.filter(p.THRESHOLD, 0.5);
  });

  dashedLine(p, margin, margin * 2 + 520, w - margin, margin * 2 + 520, 6, 5);
  

  dashedLine(p, margin, margin * 2 + 600, w - margin, margin * 2 + 600, 10, 0)
  // the barcode stuffs
  const barcodeY = margin * 3 + 521;
  const barcodeValue = "designed by Elio with love <3";
  drawBarcode(p, barcodeValue, w / 2, barcodeY + 80);

  p.noStroke();
  p.fill(0);
  p.textFont("monospace");
  p.textAlign(p.CENTER, p.TOP);
  p.textStyle(p.NORMAL);
  p.textSize(15);
  p.text(barcodeValue, w / 2, 1024 - 960 + barcodeY + 80);

  p.noStroke();
  p.fill(0);
  p.textFont("monospace");
  p.textAlign(p.CENTER, p.TOP);
  p.textStyle(p.NORMAL);
  p.textSize(15);
  p.text("Printed by hackclub for the Printed YSWS!", w / 2, 1024 - 960 + barcodeY + margin + 80);
}

function drawBarcode(p, value, centerX, y) {
  const barcodeCanvas = document.createElement("canvas");
  JsBarcode(barcodeCanvas, value, {
    format: "CODE128",
    width: 1,
    height: 52,
    displayValue: false,
    margin: 0,
    background: "#ffffff",
    lineColor: "#000000",
  });
  // Draw directly on p5's canvas: p.image expects a p5 image wrapper, while
  // JsBarcode returns a regular browser canvas.
  p.drawingContext.drawImage(barcodeCanvas, Math.floor(centerX - barcodeCanvas.width / 2), y);
}

function dashedLine(p, x1, y1, x2, y2, dash, gap) {
  p.stroke(0);
  p.strokeWeight(2);
  for (let x = x1; x < x2; x += dash + gap) {
    p.line(x, y1, Math.min(x + dash, x2), y2);
  }
}
