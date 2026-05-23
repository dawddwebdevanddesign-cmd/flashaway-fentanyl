const quizData = [
  {
    question: 'Fentanyl can often be found in counterfeit prescription pills. What is a key reality regarding these look-alike pills?',
    options: [
      'They always look different from real prescriptions.',
      'They have a distinct chemical odor.',
      'They are engineered to look identical to legitimate medication like Percocet or Xanax.',
      'They are only dangerous if taken in large quantities.'
    ],
    correct: 2
  },
  {
    question: 'How much illicit fentanyl is enough to potentially cause a fatal overdose?',
    options: [
      'An amount equivalent to a few grains of salt.',
      'At least one full teaspoon.',
      'More than 50 milligrams.',
      'A standard tablet size dose.'
    ],
    correct: 0
  },
  {
    question: 'If you suspect someone is experiencing an opioid overdose emergency, what is the very first step you should take?',
    options: [
      'Wait for them to wake up naturally.',
      'Call 911 immediately.',
      'Check their ID for emergency contacts.',
      'Give them water.'
    ],
    correct: 1
  },
  {
    question: 'What medication is designed to rapidly reverse an opioid emergency and restore normal breathing?',
    options: [
      'Aspirin',
      'Naloxone (Narcan)',
      'Ibuprofen',
      'Epinephrine'
    ],
    correct: 1
  },
  {
    question: 'What do Good Samaritan laws generally provide during an emergency call for help?',
    options: [
      'Financial compensation for the caller.',
      'Legal protections against certain charges to encourage reporting overdoses.',
      'Free medical supplies from local pharmacies.',
      'Guaranteed processing speed priority.'
    ],
    correct: 1
  }
];

const locationsData = [
  {
    name: "Central District Response Locker",
    type: "Automated Kiosk",
    desc: "Equipped with climate-controlled automated boxes distributing public emergency reversal kits. Scan on-site QR array to release immediate physical inventory.",
    hours: "Open 24/7"
  },
  {
    name: "Metro Outreach Center Hub",
    type: "Staffed Facility",
    desc: "Direct support facility offering community toolkits, physical descriptive matrix brochures, and clean verification material bundles without screening limits.",
    hours: "Monday - Saturday: 08:00 - 20:00"
  },
  {
    name: "East Perimeter Safe Station",
    type: "Rapid Dispatch Point",
    desc: "A structural drop-zone localized directly inside municipal perimeter corridors for critical response delivery drivers and localized emergency workers.",
    hours: "Open 24/7"
  }
];

let currentQuestion = 0;
let score = 0;

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  const contactContainer = document.getElementById('contact-container');
  
  if (contactForm && contactContainer) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      contactContainer.innerHTML = `
        <div class="text-center py-12 space-y-4">
          <div class="w-14 h-14 bg-emerald-500/10 text-emerald-400 flex items-center justify-center rounded-2xl mx-auto font-black text-2xl border border-emerald-500/20">✓</div>
          <h3 class="text-2xl font-black text-white tracking-tight">Message Dispatched Securely</h3>
          <p class="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">Your portal transmission has been authenticated and routed. Our regional support team will verify the community request parameters coordinates shortly.</p>
        </div>
      `;
    });
  }

  if (document.getElementById('quiz-container')) {
    initQuiz();
    const nextBtn = document.getElementById('next-btn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentQuestion++;
        if (currentQuestion < quizData.length) {
          initQuiz();
        } else {
          showResults();
        }
      });
    }
  }

  if (document.getElementById('locations-list')) {
    initMap();
  }
});

function initQuiz() {
  const qBox = document.getElementById('question-box');
  const nextBtn = document.getElementById('next-btn');
  const progressText = document.getElementById('progress');
  
  if (!qBox || !nextBtn || !progressText) return;

  nextBtn.classList.add('hidden');
  progressText.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;

  const activeQuestion = quizData[currentQuestion];
  
  let optionsHTML = '';
  activeQuestion.options.forEach((opt, idx) => {
    optionsHTML += `
      <button class="quiz-option w-full bg-slate-950 hover:bg-slate-850 border border-slate-800 text-left p-4 rounded-xl text-sm transition font-medium flex justify-between items-center group" data-idx="${idx}">
        <span>${opt}</span>
        <span class="w-5 h-5 rounded-full border border-slate-700 flex items-center justify-center text-[10px] text-transparent group-hover:border-slate-500 transition">✓</span>
      </button>
    `;
  });

  qBox.innerHTML = `
    <h2 id="question-text" class="text-lg md:text-xl font-bold leading-snug mb-6">${activeQuestion.question}</h2>
    <div id="options-list" class="space-y-3">${optionsHTML}</div>
  `;

  const optionButtons = qBox.querySelectorAll('.quiz-option');
  optionButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const selectedIdx = parseInt(btn.getAttribute('data-idx'));
      optionButtons.forEach(b => b.disabled = true);
      
      if (selectedIdx === activeQuestion.correct) {
        score++;
        btn.classList.remove('bg-slate-950', 'border-slate-800');
        btn.classList.add('bg-emerald-500/10', 'border-emerald-500', 'text-emerald-400');
        btn.querySelector('span:last-child').classList.remove('text-transparent', 'border-slate-700');
        btn.querySelector('span:last-child').classList.add('bg-emerald-500', 'border-emerald-500', 'text-slate-950');
      } else {
        btn.classList.remove('bg-slate-950', 'border-slate-800');
        btn.classList.add('bg-red-500/10', 'border-red-500', 'text-red-400');
        
        const correctBtn = qBox.querySelector(`.quiz-option[data-idx="${activeQuestion.correct}"]`);
        if (correctBtn) {
          correctBtn.classList.remove('bg-slate-950', 'border-slate-800');
          correctBtn.classList.add('bg-emerald-500/10', 'border-emerald-500', 'text-emerald-400');
        }
      }
      nextBtn.classList.remove('hidden');
    });
  });
}

function showResults() {
  const qBox = document.getElementById('question-box');
  const nextBtn = document.getElementById('next-btn');
  const progressText = document.getElementById('progress');
  const scoreBadge = document.getElementById('score-badge');

  if (qBox) {
    qBox.innerHTML = `
      <div class="text-center py-6">
        <h3 class="text-2xl font-black text-emerald-400 mb-2">Training Vector Complete!</h3>
        <p class="text-slate-300 text-sm">You answered ${score} out of ${quizData.length} modules correctly.</p>
      </div>
    `;
  }
  if (nextBtn) nextBtn.classList.add('hidden');
  if (progressText) progressText.classList.add('hidden');
  if (scoreBadge) {
    scoreBadge.textContent = `Score: ${score}/${quizData.length}`;
    scoreBadge.classList.remove('hidden');
  }
}

function initMap() {
  const count = document.getElementById('location-count');
  const lList = document.getElementById('locations-list');
  const fallback = document.getElementById('map-fallback');
  const detailView = document.getElementById('active-detail-view');

  if (!count || !lList || !fallback || !detailView) return;

  count.textContent = `${locationsData.length} Areas`;
  lList.innerHTML = '';

  locationsData.forEach((loc) => {
    const div = document.createElement('div');
    div.className = 'bg-slate-950 hover:bg-slate-850 border border-slate-800 p-4 rounded-xl cursor-pointer transition';
    div.innerHTML = `<h3 class="font-bold text-sm text-red-400">${loc.name}</h3><p class="text-xs text-slate-400 mt-1">${loc.type}</p>`;
    
    div.onclick = () => {
      fallback.classList.add('hidden');
      detailView.classList.remove('hidden');
      detailView.innerHTML = `
        <div class="space-y-4 flex-grow">
          <div>
            <span class="inline-block bg-red-500/10 border border-red-500/30 text-red-400 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider mb-4">${loc.type}</span>
            <h2 class="text-2xl font-black text-white mb-2">${loc.name}</h2>
            <p class="text-slate-300 text-sm leading-relaxed">${loc.desc}</p>
          </div>
          <div class="border-t border-slate-800 pt-4 text-xs text-slate-400 mt-auto">
            <strong>Operational Hours / Access:</strong> ${loc.hours}
          </div>
        </div>
      `;
    };
    lList.appendChild(div);
  });
}
