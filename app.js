const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const answerElement = document.getElementById("answer");
const stepIndicator = document.getElementById("step-indicator");
const backButton = document.getElementById("back-button");

// Mỗi nút dẫn tới một nút trong cây hội thoại.
const flow = {
  start: {
    question: "Cái ác tồn tại",
    choices: [{ label: "Có", next: "god_can_stop" }]
  },
  god_can_stop: {
    question: "God ngăn được cái ác?",
    choices: [
      { label: "Có", next: "god_knows" },
      { label: "Không", answer: "Vậy thì god không toàn năng." }
    ]
  },
  god_knows: {
    question: "God có biết về tất cả cái ác?",
    choices: [
      { label: "Có", next: "god_wants" },
      { label: "Không", answer: "Vậy thì god không toàn trí." }
    ]
  },
  god_wants: {
    question: "God có muốn ngăn cái ác?",
    choices: [
      { label: "Có", next: "why_evil" },
      { label: "Không", answer: "Vậy thì god không tốt/yêu thương." }
    ]
  },
  why_evil: {
    question: "Vậy tại sao lại có cái ác?",
    choices: [
      { label: "Cái ác cần thiết cho sự tồn tại của vũ trụ", next: "evil_universe" },
      { label: "Để thử thách ta", answer: "Nếu god toàn trí, ngài sẽ biết ta sẽ làm gì nếu được thử thách, bởi vậy không cần phải thử thách." },
      { label: "Satan", answer: "Một đấng toàn năng, toàn trí và đầy tình thương có thể và sẽ diệt Satan." }
    ]
  },
  evil_universe: {
    question: "Liệu god có thể tạo một vũ trụ không có cái ác?",
    choices: [
      { label: "Có", next: "why_not" },
      { label: "Không", answer: "Vậy thì god không toàn năng." }
    ]
  },
  why_not: {
    question: "Vậy tại sao ngài không làm?",
    choices: [
      { label: "Tự do ý chí", next: "free_will_universe" },
      { label: "Để thử thách ta", answer: "Nếu god toàn trí, ngài sẽ biết ta sẽ làm gì nếu được thử thách, bởi vậy không cần phải thử thách." }
    ]
  },
  free_will_universe: {
    question: "Liệu god có thể tạo một vũ trụ có tự do ý chí nhưng không có cái ác?",
    choices: [
      { label: "Có", next: "why_not" },
      { label: "Không", answer: "Vậy thì god không toàn năng." }
    ]
  }
};

let currentId = "start";
let history = [];

function render(id, answer = "") {
  const node = flow[id];
  if (!node) return;

  currentId = id;
  questionElement.textContent = node.question;
  stepIndicator.textContent = id === "start" ? "BẮT ĐẦU" : "CÂU HỎI TIẾP THEO";
  choicesElement.replaceChildren();
  answerElement.hidden = !answer;
  answerElement.textContent = answer;

  node.choices.forEach((choice) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-button";
    button.textContent = choice.label;
    button.addEventListener("click", () => {
      history.push({ id: currentId, answer: answerElement.textContent, wasAnswerVisible: !answerElement.hidden });
      if (choice.next) {
        render(choice.next);
      } else {
        showConclusion(choice.answer);
      }
    });
    choicesElement.appendChild(button);
  });

  backButton.textContent = id === "start" ? "↺ Bắt đầu lại" : "← Quay lại";
}

function showConclusion(message) {
  history.push({ id: currentId, answer: answerElement.textContent, wasAnswerVisible: !answerElement.hidden });
  answerElement.textContent = message;
  answerElement.hidden = false;
  choicesElement.replaceChildren();
  stepIndicator.textContent = "SUY NGẪM";
  backButton.textContent = "← Quay lại";
}

backButton.addEventListener("click", () => {
  // Theo yêu cầu, nút quay lại luôn đưa người dùng về câu mở đầu.
  history = [];
  render("start");
});

render("start");
