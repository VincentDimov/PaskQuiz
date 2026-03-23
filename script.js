// ===== ELEMENT =====
const btnStart = document.getElementById("btnStart");
const btnToPassword = document.getElementById("btnToPassword");
const btnBackToSpel = document.getElementById("btnBackToSpel");
const linkTerms = document.getElementById("linkTerms");
const btnCheckPassword = document.getElementById("btnCheckPassword");
const btnEnd = document.getElementById("btnEnd");

const passwordInput = document.getElementById("passwordInput");
const passwordError = document.getElementById("passwordError");

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const timerEl = document.getElementById("timer");
const progressEl = document.getElementById("progress");
const scoreText = document.getElementById("scoreText");
const resultImage = document.getElementById("resultImage");
const reviewEl = document.getElementById("review");

const pages = [
  "page-start",
  "page-spel",
  "page-terms",
  "page-password",
  "page-category",
  "page-quiz",
  "page-result",
];

// ===== STATE =====
let state = {
  page: 0,
  score: 0,
  answers: [],
  qIndex: 0,
};

function showPage(index) {
  pages.forEach((id, i) => {
    document.getElementById(id).classList.toggle("hidden", i !== index);
  });
  state.page = index;
}

// ===== NAV =====
btnStart.onclick = () => showPage(1);
btnToPassword.onclick = () => showPage(3);

linkTerms.onclick = (e) => {
  e.preventDefault();
  showPage(2); // spel → terms
};

btnBackToSpel.onclick = () => showPage(1);

// ===== LÖSENORD LOGIK =====
// ===== AUTOMATISK LÖSENORDSKONTROLL =====
const correctPassword = "416389";

passwordInput.addEventListener("input", () => {
  if (passwordInput.value === correctPassword) {
    passwordError.classList.add("hidden"); // döljer felmeddelande
    showPage(4); // går direkt till nästa sida
  } else {
    passwordError.classList.remove("hidden"); // visar felmeddelande
  }
});

// ===== HELPERS =====
const Q = (q, options, correct) => ({ q, options, correct });
const pick = (arr, n) => [...arr].sort(() => 0.5 - Math.random()).slice(0, n);

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// ===== FRÅGEBANK (utökad) =====
const questionBanks = {
  // ---------------------------------------------------
  // Påsk i Sverige
  pask: {
  easy: [
    Q(
      "Vilken högtid firas i Sverige till minne av Jesus uppståndelse?",
      ["Påsk", "Midsommar", "Pingst", "Advent"],
      "Påsk"
    ),
    Q(
      "Vilket djur är vanligast förknippat med påsken i Sverige?",
      ["Hare", "Älg", "Ren", "Kanin"],
      "Hare"
    ),
    Q(
      "Vilken färg är vanligast på påskägg i Sverige?",
      ["Gul", "Svart", "Blå", "Grå"],
      "Gul"
    ),
    Q(
      "Vad brukar svenska barn klä ut sig till på påskafton?",
      ["Påskkärringar", "Hare", "Spöken", "Påskägg"],
      "Påskkärringar"
    ),
    Q(
      "Vad delar barn ofta ut när de går som påskkärringar?",
      ["Påskbrev", "Godis", "Blommor", "Ljus"],
      "Påskbrev"
    ),
    Q(
      "Vad brukar man fylla påskägg med?",
      ["Godis", "Frukt", "Bröd", "Ost"],
      "Godis"
    ),
    Q(
      "Vilken dag i veckan firas långfredagen?",
      ["Fredag", "Torsdag", "Lördag", "Söndag"],
      "Fredag"
    ),
    Q(
      "Vilken färg är traditionellt kopplad till påsk i kyrkliga sammanhang?",
      ["Vit", "Svart", "Grön", "Gul"],
      "Vit"
    ),
    Q(
      "Vilken fågel är vanlig i påskdekorationer i Sverige?",
      ["Tupp", "Kråka", "Uggla", "Mås"],
      "Tupp"
    ),
    Q(
      "Vad kallas torsdagen före långfredagen?",
      ["Skärtorsdagen", "Dymmeldagen", "Påskafton", "Annandag påsk"],
      "Skärtorsdagen"
    ),
  ],

  medium: [
    Q(
      "Vad markerar långfredagen i den kristna påsken?",
      [
        "Jesus korsfästelse",
        "Jesus födelse",
        "Jesus dop",
        "Jesus himmelsfärd",
      ],
      "Jesus korsfästelse"
    ),
    Q(
      "Vad firas på påskdagen?",
      [
        "Jesus uppståndelse",
        "Jesus död",
        "Nattvarden",
        "Jesus födelse",
      ],
      "Jesus uppståndelse"
    ),
    Q(
      "Vilken dag äter man traditionellt påskmiddag i Sverige?",
      ["Påskafton", "Skärtorsdagen", "Långfredagen", "Annandag påsk"],
      "Påskafton"
    ),
    Q(
      "Vilken fisk är vanligast på svenska påskbord?",
      ["Sill", "Lax", "Torsk", "Makrill"],
      "Sill"
    ),
    Q(
      "Vad symboliserar ägget inom påsktraditionen?",
      ["Liv och uppståndelse", "Sorg", "Vår", "Fasta"],
      "Liv och uppståndelse"
    ),
    Q(
      "Vilket århundrade blev påsken en etablerad kristen högtid?",
      ["300-talet", "100-talet", "700-talet", "1200-talet"],
      "300-talet"
    ),
    Q(
      "Vad kallas veckan före påsk?",
      ["Stilla veckan", "Fastetiden", "Påskveckan", "Pingstveckan"],
      "Stilla veckan"
    ),
    Q(
      "Vilken blomma är särskilt förknippad med påsk i Sverige?",
      ["Påsklilja", "Ros", "Tulpan", "Liljekonvalj"],
      "Påsklilja"
    ),
    Q(
      "Vilken dag avslutar påsken i Sverige?",
      ["Annandag påsk", "Påskdagen", "Påskafton", "Avslutdagen"],
      "Annandag påsk"
    ),
    Q(
      "Vilken tradition har rötter i folktron om häxor?",
      [
        "Påskkärringar",
        "Äggjakt",
        "Påskharar",
        "Kyrkobesök",
      ],
      "Påskkärringar"
    ),
  ],

  hard: [
    Q(
      "Vilken högtid inom judendomen sammanfaller tidsmässigt med den kristna påsken?",
      ["Pesach", "Chanukka", "Purim", "Rosh Hashanah"],
      "Pesach"
    ),
    Q(
      "Vilken stad enligt Bibeln korsfästes Jesus i?",
      ["Jerusalem", "Betlehem", "Nazaret", "Damaskus"],
      "Jerusalem"
    ),
    Q(
      "Vilket kyrkomöte fastställde beräkningen av påskens datum?",
      ["Kyrkomötet i Nicaea", "Tridentinska mötet", "Laterankonciliet", "Konciliet i Efesos"],
      "Kyrkomötet i Nicaea"
    ),
    Q(
      "Hur beräknas påskdagen?",
      [
        "Första söndagen efter första fullmånen efter vårdagjämningen",
        "Alltid sista söndagen i mars",
        "40 dagar efter jul",
        "Första söndagen i april",
      ],
      "Första söndagen efter första fullmånen efter vårdagjämningen"
    ),
    Q(
      "Vad kallades enligt folktron platsen dit häxorna flög på skärtorsdagen?",
      ["Blåkulla", "Valhall", "Asgård", "Hel"],
      "Blåkulla"
    ),
    Q(
      "Vilket århundrade började seden med påskkärringar i Sverige?",
      ["1800-talet", "1500-talet", "1200-talet", "1900-talet"],
      "1800-talet"
    ),
    Q(
      "Vilken liturgisk färg används på långfredagen i Svenska kyrkan?",
      ["Svart", "Vit", "Röd", "Grön"],
      "Svart"
    ),
    Q(
      "Vilken evangelist beskriver uppståndelsen tidigast?",
      ["Markus", "Matteus", "Lukas", "Johannes"],
      "Markus"
    ),
  ],

  own: [
    Q("Vilka maträtter är vanliga på ett svenskt påskbord?", [
      "Sill",
      "Ägg",
      "Lax",
      "Påskkinka",
    ]),
    Q("Vilka färger är vanligast i svensk påskdekoration?", [
      "Gul",
      "Grön",
      "Vit",
      "Pastellfärger",
    ]),
    Q("Vilka symboler förknippas med påsk i Sverige?", [
      "Påskägg",
      "Påskhare",
      "Påskliljor",
      "Fjädrar",
    ]),
    Q("Vilken tradition har barn i Sverige under påsken?", [
      "Klä ut sig till påskkärringar",
      "Dela ut påskbrev",
      "Få godis",
      "Måla ägg",
    ]),
  ],
},

  // ---------------------------------------------------
  // Påsk i Världen
  world: {
    easy: [
    Q(
      "Vilket land kallas ofta 'hemmet för påskharen'?",
      ["Tyskland", "Sverige", "USA", "Frankrike"],
      "Tyskland"
    ),
    Q(
      "Vilken färg är traditionellt kopplad till påsk i många länder?",
      ["Gul", "Röd", "Blå", "Svart"],
      "Gul"
    ),
    Q(
      "I vilket land är det vanligt att rulla ägg nedför backar på påskdagen?",
      ["Storbritannien", "Sverige", "Frankrike", "Spanien"],
      "Storbritannien"
    ),
    Q(
      "Vilket land har traditionen att tända stora påskeldar?",
      ["Tyskland", "Sverige", "Polen", "Italien"],
      "Tyskland"
    ),
    Q(
      "Vilket land är känt för den stora 'Semana Santa'-processionen under påsken?",
      ["Spanien", "Italien", "Mexiko", "Portugal"],
      "Spanien"
    ),
    Q(
      "Vilken symbol är vanlig i USA på påsk?",
      ["Påskägg", "Kalkon", "Tomte", "Pumpa"],
      "Påskägg"
    ),
    Q(
      "Vilket djur delar påskens namn med i engelsktalande länder?",
      ["Hare", "Kanin", "Kyckling", "Lamm"],
      "Hare"
    ),
    Q(
      "Vilken påsktradition finns i Australien istället för påskharen?",
      ["Påskbilby", "Påskkanguru", "Påskkoala", "Påskemu"],
      "Påskbilby"
    ),
    Q(
      "Vilken mat är vanlig i Italien under påsken?",
      ["Lamm och Colomba", "Sill och potatis", "Tacos", "Pizza"],
      "Lamm och Colomba"
    ),
  ],

  medium: [
    Q(
      "I Filippinerna firas påsken ofta med?",
      ["Korsfästelse", "Äggmålning", "Påskeldar", "Påskparader"],
      "Korsfästelse"
    ),
    Q(
      "Vilket land har traditionen 'Ostara' som påminner om påskfesten?",
      ["Tyskland", "Norge", "Frankrike", "Grekland"],
      "Tyskland"
    ),
    Q(
      "Vad heter den traditionella tårtan som bakas i Grekland under påsken?",
      ["Tsoureki", "Panettone", "Kulich", "Paska"],
      "Tsoureki"
    ),
    Q(
      "I Mexiko firas påsken ofta med?",
      ["Processioner och levande påskspel", "Påskäggsjakt", "Påskeldar", "Äggmålning"],
      "Processioner och levande påskspel"
    ),
    Q(
      "Vilket land har påskliljor som en central symbol för påsken?",
      ["Sverige", "Irland", "Holland", "Frankrike"],
      "Sverige"
    ),
    Q(
      "Vilket land dekorerar ofta ägg med metallfolie och guld för påsken?",
      ["Ryssland", "Italien", "Spanien", "Tyskland"],
      "Ryssland"
    ),
    Q(
      "Vilken amerikansk stad har en stor påskparad med äggmålning och marschband?",
      ["New York", "Chicago", "Boston", "Los Angeles"],
      "New York"
    ),
    Q(
      "Vilken bok i Norsk tradition läser man under påsken?",
      ["Påskekrim", "Bibeln", "Norska sagor", "Diktsamling"],
      "Påskekrim"
    ),
    Q(
      "Med vilka tekniker dekoreras ägg i Polen?",
      ["Skrapning och vax", "Målning med vattenfärg", "Stämpling", "Klistermärken"],
      "Skrapning och vax"
    ),
    Q(
      "Vilken europeisk tradition inspirerade påskharen?",
      ["Tysk folklore", "Fransk jultradition", "Engelsk midsommar", "Italiensk karneval"],
      "Tysk folklore"
    ),
  ],

  hard: [
    Q(
      "Vilket land är känt för att ha påskprocessioner med levande korsfästelse-scener i flera städer?",
      ["Filippinerna", "Italien", "Spanien", "Mexiko"],
      "Filippinerna"
    ),
    Q(
      "Vilken ort i Spanien är särskilt känd för sin 'Semana Santa' med stora religiösa processioner?",
      ["Sevilla", "Madrid", "Barcelona", "Valencia"],
      "Sevilla"
    ),
    Q(
      "Vilket land har påskmat som ofta inkluderar Paska, en söt ostbrödskaka?",
      ["Ryssland", "Tyskland", "Frankrike", "Spanien"],
      "Ryssland"
    ),
    Q(
      "Vilken nordamerikansk stad har en påskparad som kallas 'Easter Parade'?",
      ["New York", "Chicago", "Philadelphia", "Washington D.C."],
      "New York"
    ),
    Q(
      "Vilket land har traditionen att måla hårda ägg med röda färg som symbol för Kristi blod?",
      ["Grekland", "Italien", "Ryssland", "Tyskland"],
      "Grekland"
    ),
    Q(
      "Vilken kultur har en påsktradition som kallas 'Egg Knocking', där man knackar ägg mot varandra?",
      ["Bulgaria", "Grekland", "Sverige", "Italien"],
      "Bulgaria"
    ),
    Q(
      "I vilket land används ofta påskelden som renande ritual för våren?",
      ["Tyskland", "Sverige", "Frankrike", "Österrike"],
      "Tyskland"
    ),
  ],

  own: [
    Q("Vilken djur är vanlig påsksymboler i olika länder?", [
      "Hare",
      "Kyckling",
      "Lamm",
      "Kanin",
    ]),
    Q("Vilken typ av påskäggstraditioner finns globalt?", [
      "Måla ägg",
      "Dekorera med ägg",
      "Fyllda chokladägg",
      "Äggrullning",
    ]),
    Q("Vilket land firar påsken med stora religiösa processioner?", [
      "Spanien",
      "Italien",
      "Filippinerna",
      "Mexiko",
    ]),
    Q("Vilken typ av påskmat är typisk gemensam i olika kulturer?", [
      "Lamm",
      "Ägg",
      "Söt bröd",
      "Chokladägg",
    ]),
  ],
},

};

// ===== QUIZ LOGIK =====
let currentSet = [];
let timerInterval;
let timeLeft = 10;

// ===============================
// ===== START KATEGORI =====
// ===============================
document.querySelectorAll(".category").forEach((btn) => {
  btn.onclick = () => {
    const bank = questionBanks[btn.dataset.cat];

    currentSet = [
      ...pick(bank.easy, 2),
      ...pick(bank.medium, 4),
      ...pick(bank.own, 1),
      ...pick(bank.hard, 3),
    ];

    state.score = 0;
    state.answers = [];
    state.qIndex = 0;

    showPage(5);
    nextQuestion();
  };
});

// ===============================
// ===== TIMER =====
// ===============================
function startTimer() {
  timeLeft = 10;
  timerEl.innerText = timeLeft;
  clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    timeLeft--;
    timerEl.innerText = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      handleAnswer(null, currentSet[state.qIndex]);
    }
  }, 1500);
}

// ===============================
// ===== NÄSTA FRÅGA =====
// ===============================
function nextQuestion() {
  if (state.qIndex >= currentSet.length) return showResult();

  const q = currentSet[state.qIndex];
  questionEl.innerText = q.q;
  answersEl.innerHTML = "";

  const shuffled = shuffle([...q.options]);

  shuffled.forEach((opt) => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = () => handleAnswer(opt, q);
    answersEl.appendChild(btn);
  });

  progressEl.innerText = `Fråga ${state.qIndex + 1} av ${currentSet.length}`;
  startTimer();
}

// ===============================
// ===== SVARSHANTERING =====
// ===============================
function handleAnswer(selected, q) {
  clearInterval(timerInterval);

  const isOwn = !q.correct; // own-frågor saknar correct

  // ===== TIMEOUT =====
  if (selected === null) {
    const fakeCorrect = isOwn ? shuffle([...q.options])[0] : q.correct;

    answersEl.querySelectorAll("button").forEach((btn) => {
      if (btn.innerText === fakeCorrect) {
        btn.style.backgroundColor = "green";
        btn.style.color = "white";
      }
      btn.disabled = true;
    });

    state.answers.push({
      selected: null,
      correct: fakeCorrect,
      isCorrect: false,
      category: isOwn ? "own" : "timeout",
    });

    state.qIndex++;
    setTimeout(nextQuestion, 1000);
    return;
  }

  // ===============================
  // 🔥 OWN-KATEGORI (ALLTID FEL)
  // ===============================
  if (isOwn) {
    const fakeCorrect = shuffle(q.options.filter((o) => o !== selected))[0];

    answersEl.querySelectorAll("button").forEach((btn) => {
      if (btn.innerText === selected) {
        btn.style.backgroundColor = "red";
        btn.style.color = "white";
      } else if (btn.innerText === fakeCorrect) {
        btn.style.backgroundColor = "green";
        btn.style.color = "white";
      }
      btn.disabled = true;
    });

    state.answers.push({
      selected,
      correct: fakeCorrect,
      isCorrect: false,
      category: "own",
    });

    // ❌ Ingen poäng
    state.qIndex++;
    setTimeout(nextQuestion, 1000);
    return;
  }

  // ===============================
  // ✅ NORMAL KATEGORI
  // ===============================
  const isCorrect = selected === q.correct;

  answersEl.querySelectorAll("button").forEach((btn) => {
    if (btn.innerText === q.correct) {
      btn.style.backgroundColor = "green";
      btn.style.color = "white";
    } else if (btn.innerText === selected) {
      btn.style.backgroundColor = "red";
      btn.style.color = "white";
    }
    btn.disabled = true;
  });

  state.answers.push({
    selected,
    correct: q.correct,
    isCorrect,
    category: "normal",
  });

  if (isCorrect) state.score++;

  state.qIndex++;
  setTimeout(nextQuestion, 1000);
}

// ===============================
// ===== RESULTAT =====
// ===============================
function showResult() {
  showPage(6);

  scoreText.innerText = `Du fick ${state.score} av ${currentSet.length} rätt`;

  let imgSrc = "";
  let message = ""; // för texten

  if (state.score === 10) {
    imgSrc =
      "https://www.riksbank.se/iv-images/publishedmedia/38oie489mi4qjbdp7ahc/500-kronorssedel-specimen-fram.png";
    message = "Fantastiskt! 💰";
  } else if (state.score >= 8) {
    imgSrc = "assets/lind.jpg";
    new Audio("assets/tomte.mp3").play();
    message = "🐇Vinsten är SuperHare🐇";
  } else if (state.score >= 5) {
    imgSrc = "assets/hare.jpg";
    new Audio("assets/polka.mp3").play();
    message = "🐰Vinsten är PåskHare🐰";
  } else {
    imgSrc = "assets/agg.jpg";
    new Audio("assets/forlust.mp3").play();
    message = "🐣Vinsten är PåskÄgg🐣";
  }

  // Bild
  resultImage.innerHTML = `
    <div style="display:flex;justify-content:center;margin-bottom:16px;">
      <img src="${imgSrc}" style="max-height:150px;border-radius:16px;" />
    </div>
  `;

  // Text
  resultText.textContent = message;
}
