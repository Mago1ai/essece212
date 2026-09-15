import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Exact authentic vector representation of Logo 2 (Máximo Eau de Parfum)
export const AUTHENTIC_LOGO_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 580" width="100%" height="100%">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Alex+Brush&amp;family=Cormorant+Garamond:ital,wght@1,400;1,600&amp;family=DM+Sans:wght@400;500&amp;display=swap');
      .brand-script {
        font-family: 'Alex Brush', 'Parisienne', 'Cormorant Garamond', cursive;
        font-size: 230px;
        font-style: italic;
        fill: currentColor;
      }
      .brand-sub {
        font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 28px;
        font-weight: 400;
        letter-spacing: 0.38em;
        text-transform: uppercase;
        fill: currentColor;
      }
    </style>
  </defs>

  <g class="logo-group">
    <!-- Capital M Entry Loop & Flourish (Faithful to Image 2) -->
    <!-- Outer loop starting from lower left, looping up to top left, down around, and rising to main peak -->
    <path d="
      M 95 365
      C 80 340, 75 295, 95 240
      C 120 170, 185 130, 245 145
      C 290 156, 315 195, 305 245
      C 290 310, 230 395, 180 435
      C 150 458, 125 452, 125 425
      C 125 390, 160 330, 215 270
      C 265 215, 310 160, 355 130
      C 375 116, 395 122, 395 145
      C 395 175, 370 240, 345 320
      C 320 400, 305 455, 310 475
      C 314 490, 328 495, 345 490
      C 385 478, 475 440, 580 405
      C 690 370, 800 340, 895 330
      C 920 327, 930 335, 905 342
      C 790 375, 660 425, 545 470
      C 440 512, 355 540, 295 530
      C 260 524, 252 498, 265 460
      C 285 405, 335 290, 360 205
      C 370 170, 365 155, 355 160
      C 320 180, 275 235, 230 295
      C 175 365, 145 420, 145 435
      C 145 442, 155 440, 175 420
      C 220 375, 270 300, 285 245
      C 295 205, 275 175, 240 168
      C 195 158, 145 190, 120 245
      C 102 285, 105 325, 115 350
      C 120 362, 110 372, 95 365
      Z
    " fill="currentColor"/>

    <!-- Lettering "áximo" in elegant fluid connected script -->
    <!-- "á" -->
    <path d="
      M 370 330
      C 385 300, 415 285, 440 295
      C 458 302, 465 318, 460 340
      C 445 400, 435 435, 438 445
      C 440 450, 448 448, 460 435
      C 475 418, 490 395, 495 385
      C 500 390, 485 415, 468 438
      C 450 460, 432 468, 422 460
      C 415 455, 418 440, 425 415
      C 410 440, 388 458, 368 455
      C 348 452, 340 432, 345 405
      C 352 368, 375 338, 410 325
      C 425 320, 435 322, 432 338
      C 425 375, 418 415, 420 430
      C 422 435, 426 435, 430 428
      C 438 412, 445 380, 452 342
      C 455 328, 450 318, 438 312
      C 420 305, 395 318, 380 342
      C 362 370, 358 402, 365 422
      C 370 435, 385 440, 400 430
      C 410 422, 418 410, 422 400
      C 425 405, 415 422, 402 432
      C 388 442, 372 440, 365 428
      C 355 410, 355 375, 370 330
      Z
    " fill="currentColor"/>

    <!-- Accent (´) on á -->
    <path d="
      M 425 240
      C 435 225, 450 210, 460 205
      C 466 202, 470 206, 466 214
      C 456 230, 442 248, 432 255
      C 426 258, 422 252, 425 240
      Z
    " fill="currentColor"/>

    <!-- "x" -->
    <path d="
      M 470 370
      C 485 345, 510 320, 530 320
      C 540 320, 545 328, 540 340
      C 530 365, 515 390, 498 420
      C 488 438, 482 452, 486 458
      C 490 462, 500 458, 515 442
      C 530 425, 545 400, 552 388
      C 556 392, 540 420, 522 442
      C 505 462, 488 470, 478 462
      C 470 455, 472 438, 482 418
      C 495 392, 515 358, 525 338
      C 528 332, 525 328, 518 328
      C 502 328, 480 352, 465 378
      Z
    " fill="currentColor"/>
    <!-- "x" cross stroke -->
    <path d="
      M 535 325
      C 542 325, 545 330, 540 338
      C 520 375, 490 420, 465 452
      C 460 458, 452 458, 452 450
      C 452 445, 458 438, 472 418
      C 495 385, 522 342, 535 325
      Z
    " fill="currentColor"/>

    <!-- "i" -->
    <path d="
      M 525 435
      C 538 415, 555 385, 565 350
      C 570 335, 578 330, 582 335
      C 586 340, 582 355, 575 375
      C 565 405, 558 432, 560 442
      C 562 448, 570 445, 582 432
      C 595 418, 608 395, 615 385
      C 618 390, 605 415, 588 438
      C 572 458, 555 465, 548 458
      C 542 450, 545 435, 552 415
      C 558 395, 568 365, 570 350
      C 570 342, 565 342, 558 355
      C 548 372, 535 405, 522 428
      Z
    " fill="currentColor"/>
    <!-- "i" dot -->
    <circle cx="585" cy="305" r="7.5" fill="currentColor"/>

    <!-- "m" -->
    <path d="
      M 590 435
      C 605 412, 625 375, 638 340
      C 642 330, 648 328, 652 332
      C 656 338, 652 350, 645 372
      C 638 398, 632 425, 632 440
      C 645 415, 662 380, 678 345
      C 684 332, 690 330, 695 335
      C 698 340, 695 352, 688 375
      C 680 400, 675 428, 675 440
      C 688 415, 705 380, 722 345
      C 728 332, 735 330, 738 335
      C 742 340, 738 355, 730 378
      C 720 408, 715 435, 718 442
      C 720 448, 728 445, 740 432
      C 755 415, 770 392, 775 385
      C 778 390, 765 415, 748 438
      C 732 458, 715 465, 708 455
      C 702 448, 705 432, 712 410
      C 718 390, 728 360, 728 350
      C 715 378, 698 415, 685 445
      C 678 458, 668 455, 665 445
      C 665 432, 670 410, 678 385
      C 685 362, 690 348, 685 348
      C 672 375, 655 412, 642 445
      C 635 458, 625 455, 622 445
      C 622 432, 628 410, 635 385
      C 642 362, 645 348, 640 348
      C 628 375, 610 410, 595 432
      Z
    " fill="currentColor"/>

    <!-- "o" with right exit flourish -->
    <path d="
      M 745 425
      C 758 402, 780 375, 802 360
      C 820 348, 835 352, 838 368
      C 842 388, 830 420, 810 442
      C 790 465, 768 470, 755 458
      C 745 448, 745 435, 745 425
      M 822 368
      C 820 358, 810 358, 798 368
      C 780 382, 762 410, 760 430
      C 758 442, 765 448, 775 445
      C 792 438, 812 410, 820 385
      C 822 378, 822 372, 822 368
      Z
    " fill="currentColor"/>
    <!-- "o" top flourish flick -->
    <path d="
      M 825 365
      C 845 355, 875 350, 905 352
      C 915 353, 918 358, 912 362
      C 885 368, 855 372, 832 378
      Z
    " fill="currentColor"/>

    <!-- EAU DE PARFUM Subtitle (Geometric Sans-Serif, Spaced) -->
    <text x="720" y="525" class="brand-sub" text-anchor="middle">EAU DE PARFUM</text>
  </g>
</svg>
`;

async function generateAssets() {
  const assetsDir = path.join(process.cwd(), 'public', 'assets');
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }

  // Save the SVG
  const svgPath = path.join(assetsDir, 'maximo-official-logo.svg');
  fs.writeFileSync(svgPath, AUTHENTIC_LOGO_SVG);
  console.log('Saved SVG:', svgPath);

  // Render dark version PNG (black text on transparent background, high-res)
  const darkSvg = AUTHENTIC_LOGO_SVG.replace(/class="logo-group"/g, 'class="logo-group" style="color: #141210;"');
  await sharp(Buffer.from(darkSvg))
    .resize(1600, 928, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ quality: 100 })
    .toFile(path.join(assetsDir, 'logo.png'));
  console.log('Generated public/assets/logo.png');

  // Render light/white version PNG (cream/white on transparent background, high-res)
  const whiteSvg = AUTHENTIC_LOGO_SVG.replace(/class="logo-group"/g, 'class="logo-group" style="color: #FAF5EE;"');
  await sharp(Buffer.from(whiteSvg))
    .resize(1600, 928, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ quality: 100 })
    .toFile(path.join(assetsDir, 'logo-white.png'));
  console.log('Generated public/assets/logo-white.png');

  // Also create a gold luxury version
  const goldSvg = AUTHENTIC_LOGO_SVG.replace(/class="logo-group"/g, 'class="logo-group" style="color: #D4AF37;"');
  await sharp(Buffer.from(goldSvg))
    .resize(1600, 928, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ quality: 100 })
    .toFile(path.join(assetsDir, 'logo-gold.png'));
  console.log('Generated public/assets/logo-gold.png');
}

generateAssets().catch(console.error);
