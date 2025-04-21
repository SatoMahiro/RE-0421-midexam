let radio;
let submitButton;
let resultP;
let questionP;
let correctAnswer;
let questions;
let currentQuestionIndex = 0;
let totalQuestions;
let optionsDiv;
let correctCount = 0;
let incorrectCount = 0;
let inputBox;
let nameInput, idInput, startButton;
let userName, userId;
let userInfoP, statsP;
let nameLabel, idLabel;

const fillInQuestions = [
  { question: '5+6等於?', answer: '11' },
  { question: '7+8等於?', answer: '15' },
  { question: '9+11等於?', answer: '20' }
];

function preload() {
  questions = loadTable('question.csv', 'csv', 'header');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("#ffc8dd"); // 設定背景顏色為粉紅色

  // 建立姓名輸入框
  nameLabel = createP('姓名');
  nameLabel.style('font-size', '50px');
  nameLabel.position(width / 2 - 200, height / 2 - 150);
  nameInput = createInput();
  nameInput.position(width / 2 - 50, height / 2 - 100);
  nameInput.style('font-size', '50px');

  // 建立學號輸入框
  idLabel = createP('學號');
  idLabel.style('font-size', '50px');
  idLabel.position(width / 2 - 200, height / 2);
  idInput = createInput();
  idInput.position(width / 2 - 50, height / 2 + 50);
  idInput.style('font-size', '50px');

  // 建立開始按鈕
  startButton = createButton('開始');
  startButton.position(width / 2 - 50, height / 2 + 150);
  startButton.style('font-size', '50px');
  startButton.mousePressed(startQuiz);
}

function startQuiz() {
  userName = nameInput.value();
  userId = idInput.value();

  // 移除輸入框和按鈕
  nameLabel.remove();
  nameInput.remove();
  idLabel.remove();
  idInput.remove();
  startButton.remove();

  // 顯示使用者資料
  userInfoP = createP(`姓名: ${userName} 學號: ${userId}`);
  userInfoP.position(10, 10);
  userInfoP.style('font-size', '35px');

  // 顯示統計結果
  statsP = createP(`答對: ${correctCount} 題, 答錯: ${incorrectCount} 題`);
  statsP.position(10, 50);
  statsP.style('font-size', '35px');

  totalQuestions = questions.getRowCount();
  loadQuestion();
}

function loadQuestion() {
  if (currentQuestionIndex < totalQuestions) {
    const questionData = questions.getRow(currentQuestionIndex);
    const question = questionData.getString('題目');
    const type = questionData.getString('類型');
    correctAnswer = questionData.getString('正確答案');

    // 顯示題目
    if (questionP) questionP.remove();
    questionP = createP(question);
    questionP.position(width / 2 - 90, height / 2 - 120);
    questionP.style('font-size', '30px');

    // 移除之前的選項或輸入框
    if (optionsDiv) optionsDiv.remove();
    if (inputBox) inputBox.remove();

    if (type === 'choice') {
      // 建立選擇題
      optionsDiv = createDiv();
      optionsDiv.position(width / 2 - 100, height / 2 - 50);
      optionsDiv.style('font-size', '30px');

      radio = createRadio(); //建立選擇題
      radio.option(questionData.getString('選項1'));
      radio.option(questionData.getString('選項2'));
      radio.option(questionData.getString('選項3'));
      radio.option(questionData.getString('選項4'));
      radio.parent(optionsDiv);  
      radio.style('width', 'auto'); 
      radio.style('display', 'inline-block');
    } else if (type === 'fill') {
      // 建立填充題
      inputBox = createInput();
      inputBox.position(width / 2 - 50, height / 2 - 50);
      inputBox.style('font-size', '30px');
    }

    // 建立送出按鈕
    if (submitButton) submitButton.remove();
    submitButton = createButton('送出');
    submitButton.position(width / 2 - 20, height / 2);
    submitButton.style('font-size', '30px');
    submitButton.mousePressed(type === 'choice' ? checkAnswer : () => checkFillInAnswer(correctAnswer));

    // 建立結果顯示區域
    if (resultP) resultP.remove();
    resultP = createP('');
    resultP.position(width / 2 - 50, height / 2 + 30);
    resultP.style('font-size', '30px');
  } else {
    // 顯示測驗結束
    if (questionP) questionP.remove();
    if (radio) radio.remove();
    if (submitButton) submitButton.remove();
    if (resultP) resultP.remove();
    if (optionsDiv) optionsDiv.remove();
    if (inputBox) inputBox.remove();
    questionP = createP('測驗結束');
    questionP.position(width / 2 - 200, height / 2 - 200);
    questionP.style('font-size', '75px');

    // 顯示統計結果
    const finalStats = `答對: ${correctCount} 題, 答錯: ${incorrectCount} 題`;
    const finalStatsP = createP(finalStats);
    finalStatsP.position(width / 2 + 100, height / 2 + 30);
    finalStatsP.style('font-size', '30px');
  }
}

function draw() {
  background("#ffc8dd"); // 設定背景顏色為粉紅色
}

function checkAnswer() {
  const answer = radio.value();
  if (answer === correctAnswer) {
    resultP.html('答對了！');
    resultP.style('color', 'blue');
    correctCount++;
  } else {
    resultP.html('答錯了！');
    resultP.style('color', 'red');
    incorrectCount++;
  }
  statsP.html(`答對: ${correctCount} 題, 答錯: ${incorrectCount} 題`);
  submitButton.html('下一題');
  submitButton.mousePressed(nextQuestion);
}

function checkFillInAnswer(correctAnswer) {
  const answer = inputBox.value();
  if (answer === correctAnswer) {
    resultP.html('答對了！');
    resultP.style('color', 'blue');
    correctCount++;
  } else {
    resultP.html('答錯了！');
    resultP.style('color', 'red');
    incorrectCount++;
  }
  statsP.html(`答對: ${correctCount} 題, 答錯: ${incorrectCount} 題`);
  submitButton.html('下一題');
  submitButton.mousePressed(nextQuestion);
}

function nextQuestion() {
  currentQuestionIndex++;
  loadQuestion();
}