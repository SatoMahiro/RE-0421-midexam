let circles = [];

function setup() {
  // 產生一個全視窗的畫布
  createCanvas(windowWidth, windowHeight);
  // 設定畫布顏色為米色
  background("#fdf0d5");

  // 生成75個圓
  for (let i = 0; i < 75; i++) {
    let circle = {
      x: random(width),
      y: random(height),
      size: random(10, 35), // 隨機大小
      color: color(random(255), random(255), random(255)) // 隨機顏色
    };
    circles.push(circle);
  }
}

function draw() {
  // 清除背景
  background("#fdf0d5");

  // 根據滑鼠位置調整圓的大小
  let sizeOffset = map(mouseX, 0, width, 20, 80);

  // 繪製圓
  for (let i = 0; i < circles.length; i++) {
    let circle = circles[i];

    // 根據滑鼠位置和圓的索引來改變顏色，限制顏色範圍在 100 到 255
    let r = map(sin((mouseX * 0.01) + i), -1, 1, 100, 255);
    let g = map(sin((mouseY * 0.01) + i + PI / 3), -1, 1, 100, 255);
    let b = map(sin((mouseX + mouseY) * 0.01 + i + (2 * PI) / 3), -1, 1, 100, 255);
    circle.color = color(r, g, b);

    fill(circle.color);
    noStroke();
    ellipse(circle.x, circle.y, circle.size + sizeOffset);
  }

  // 繪製文字方塊
  drawTextBox();
}

function drawTextBox() {
  // 設定文字樣式
  textAlign(CENTER, CENTER);
  textSize(32);
  fill(50);
  noStroke();

  // 設定方塊背景
  let boxWidth = 500; // 增加寬度
  let boxHeight = 150; // 增加高度以容納兩行文字
  let boxX = width / 2 - boxWidth / 2;
  let boxY = height / 2 - boxHeight / 2;

  fill(255, 200); // 半透明白色背景
  rect(boxX, boxY, boxWidth, boxHeight, 10); // 圓角矩形

  // 繪製文字
  fill(0); // 黑色文字
  text("程式設計與實習（二）期中報告", width / 2, height / 2 - 25); // 第一行文字
  text("將滑鼠移動到左上角顯示選單", width / 2, height / 2 + 25); // 第二行文字
}