/**
 * wake-alarm.js — 쉽알라미 기상 알람 & 미션 엔진
 * Web Audio API 기반 사운드 합성 (외부 오디오 파일 없음)
 */

// ──────────────────────────────────────────────
// 오디오 컨텍스트
// ──────────────────────────────────────────────
let _audioCtx = null;
function getAudioCtx() {
  if (!_audioCtx) _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (_audioCtx.state === 'suspended') _audioCtx.resume();
  return _audioCtx;
}

// ──────────────────────────────────────────────
// 4종 괴악한 알람 사운드 프리셋
// ──────────────────────────────────────────────

/** 1) 🚨 비상 공습 사이렌 — 주파수 스윕 + 고출력 펄스 */
export function playSirenAlarm(duration = 5) {
  const ctx = getAudioCtx();
  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(0.6, ctx.currentTime);
  masterGain.connect(ctx.destination);

  const osc = ctx.createOscillator();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(300, ctx.currentTime);

  // 스윕: 300Hz → 900Hz → 300Hz 반복
  const sweepLen = 1.0;
  for (let i = 0; i < duration; i += sweepLen) {
    osc.frequency.linearRampToValueAtTime(900, ctx.currentTime + i + sweepLen / 2);
    osc.frequency.linearRampToValueAtTime(300, ctx.currentTime + i + sweepLen);
  }

  // 펄스 효과용 AM
  const lfo = ctx.createOscillator();
  lfo.type = 'square';
  lfo.frequency.setValueAtTime(8, ctx.currentTime);

  const lfoGain = ctx.createGain();
  lfoGain.gain.setValueAtTime(0.3, ctx.currentTime);

  lfo.connect(lfoGain);
  lfoGain.connect(masterGain.gain);
  osc.connect(masterGain);

  osc.start(ctx.currentTime);
  lfo.start(ctx.currentTime);
  osc.stop(ctx.currentTime + duration);
  lfo.stop(ctx.currentTime + duration);

  return { osc, lfo, masterGain };
}

/** 2) 🪚 칠판 긁는 소리 — 극고주파 삼각파 + 쇳소리 노이즈 */
export function playChalkboardAlarm(duration = 5) {
  const ctx = getAudioCtx();
  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(0.4, ctx.currentTime);
  masterGain.connect(ctx.destination);

  // 쇳소리 기반: 고주파 삼각파
  const osc = ctx.createOscillator();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(3000, ctx.currentTime);

  // 불규칙 흔들림
  for (let i = 0; i < duration * 10; i++) {
    const t = ctx.currentTime + i * 0.1;
    const freq = 2800 + Math.random() * 800;
    osc.frequency.setValueAtTime(freq, t);
  }

  // 화이트 노이즈
  const bufferSize = ctx.sampleRate * duration;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

  const noiseSource = ctx.createBufferSource();
  noiseSource.buffer = buffer;

  const bpf = ctx.createBiquadFilter();
  bpf.type = 'bandpass';
  bpf.frequency.setValueAtTime(3200, ctx.currentTime);
  bpf.Q.setValueAtTime(0.5, ctx.currentTime);

  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.35, ctx.currentTime);

  noiseSource.connect(bpf);
  bpf.connect(noiseGain);
  noiseGain.connect(masterGain);
  osc.connect(masterGain);

  osc.start(ctx.currentTime);
  noiseSource.start(ctx.currentTime);
  osc.stop(ctx.currentTime + duration);
  noiseSource.stop(ctx.currentTime + duration);

  return { osc, noiseSource, masterGain };
}

/** 3) 🐔 분노한 전자 닭 울음소리 — 변조 피치 아르페지오 */
export function playChickenAlarm(duration = 5) {
  const ctx = getAudioCtx();
  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(0.5, ctx.currentTime);
  masterGain.connect(ctx.destination);

  // 닭 울음 아르페지오 패턴 (Hz)
  const pattern = [600, 800, 1000, 800, 600, 1200, 900, 700, 1100, 850];
  const noteLen = 0.12;

  pattern.forEach((freq, idx) => {
    for (let rep = 0; rep * noteLen * pattern.length < duration; rep++) {
      const t = ctx.currentTime + idx * noteLen + rep * noteLen * pattern.length;
      if (t >= ctx.currentTime + duration) return;

      const osc = ctx.createOscillator();
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, t);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, t + noteLen * 0.7);

      const env = ctx.createGain();
      env.gain.setValueAtTime(0.4, t);
      env.gain.exponentialRampToValueAtTime(0.001, t + noteLen * 0.9);

      osc.connect(env);
      env.connect(masterGain);
      osc.start(t);
      osc.stop(t + noteLen);
    }
  });

  return { masterGain };
}

/** 4) 💥 1교시 F학점 확정 경보음 — 불협화음 비프 반복 */
export function playFGradeAlarm(duration = 5) {
  const ctx = getAudioCtx();
  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(0.55, ctx.currentTime);
  masterGain.connect(ctx.destination);

  // 불협화음 조합 (반음 간격의 클러스터)
  const chords = [
    [220, 233, 247], // 불협화
    [440, 415, 466], // 반음차이 클러스터
    [330, 311, 370], // 증4도 계열
    [523, 494, 554], // 으스스한 클러스터
  ];

  const bLen = 0.4;
  let t = ctx.currentTime;

  while (t < ctx.currentTime + duration) {
    const chord = chords[Math.floor((t - ctx.currentTime) / bLen) % chords.length];
    chord.forEach(freq => {
      const osc = ctx.createOscillator();
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, t);

      const env = ctx.createGain();
      env.gain.setValueAtTime(0.0, t);
      env.gain.linearRampToValueAtTime(0.3, t + 0.02);
      env.gain.linearRampToValueAtTime(0.2, t + bLen * 0.6);
      env.gain.linearRampToValueAtTime(0.0, t + bLen * 0.9);

      osc.connect(env);
      env.connect(masterGain);
      osc.start(t);
      osc.stop(t + bLen);
    });
    t += bLen;
  }

  return { masterGain };
}

// ──────────────────────────────────────────────
// 알람 상태 관리
// ──────────────────────────────────────────────

let _alarmTimer = null;
let _alarmLoopInterval = null;
let _currentSoundNodes = null;
export let isAlarmRinging = false;
export let onAlarmDismissed = null; // callback

const ALARM_SOUNDS = {
  siren: playSirenAlarm,
  chalk: playChalkboardAlarm,
  chicken: playChickenAlarm,
  fgrade: playFGradeAlarm,
};

export function setAlarm(timeStr, soundKey = 'siren', missionType = 'quiz') {
  clearAlarm();

  const [h, m] = timeStr.split(':').map(Number);
  const now = new Date();
  const target = new Date(now);
  target.setHours(h, m, 0, 0);
  if (target <= now) target.setDate(target.getDate() + 1);

  const delay = target.getTime() - now.getTime();

  _alarmTimer = setTimeout(() => {
    triggerAlarm(soundKey, missionType);
  }, delay);

  // localStorage에 저장
  const alarms = getAlarms();
  const existing = alarms.findIndex(a => a.time === timeStr);
  const alarmObj = { id: Date.now(), time: timeStr, sound: soundKey, mission: missionType, active: true };
  if (existing >= 0) alarms[existing] = alarmObj;
  else alarms.push(alarmObj);
  saveAlarms(alarms);

  return alarmObj;
}

export function clearAlarm() {
  if (_alarmTimer) { clearTimeout(_alarmTimer); _alarmTimer = null; }
  stopAlarmSound();
}

export function triggerAlarm(soundKey = 'siren', missionType = 'quiz') {
  isAlarmRinging = true;
  startAlarmSound(soundKey);
  startScreenFlash();
  window.dispatchEvent(new CustomEvent('alarm-triggered', { detail: { soundKey, missionType } }));
}

function startAlarmSound(soundKey) {
  stopAlarmSound();
  const fn = ALARM_SOUNDS[soundKey] || ALARM_SOUNDS.siren;
  _currentSoundNodes = fn(6);

  // 6초마다 반복
  _alarmLoopInterval = setInterval(() => {
    stopAlarmSoundNodes();
    _currentSoundNodes = fn(6);
  }, 6500);
}

function stopAlarmSoundNodes() {
  if (!_currentSoundNodes) return;
  try {
    const { masterGain } = _currentSoundNodes;
    if (masterGain) masterGain.disconnect();
  } catch (e) {}
  _currentSoundNodes = null;
}

export function stopAlarmSound() {
  if (_alarmLoopInterval) { clearInterval(_alarmLoopInterval); _alarmLoopInterval = null; }
  stopAlarmSoundNodes();
}

let _flashInterval = null;
function startScreenFlash() {
  let visible = false;
  _flashInterval = setInterval(() => {
    document.body.style.backgroundColor = visible ? '' : 'rgba(255,0,0,0.15)';
    visible = !visible;
  }, 400);
}

export function stopScreenFlash() {
  if (_flashInterval) { clearInterval(_flashInterval); _flashInterval = null; }
  document.body.style.backgroundColor = '';
}

export function dismissAlarm() {
  isAlarmRinging = false;
  stopAlarmSound();
  stopScreenFlash();
  if (typeof onAlarmDismissed === 'function') onAlarmDismissed();
  fireConfetti();
  window.dispatchEvent(new CustomEvent('alarm-dismissed'));
}

// ──────────────────────────────────────────────
// 폭죽 (Confetti) 효과
// ──────────────────────────────────────────────
export function fireConfetti(count = 80) {
  const colors = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#c77dff', '#ff9a3c'];
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.style.cssText = `
      position: fixed;
      left: ${Math.random() * 100}vw;
      top: -10px;
      width: ${6 + Math.random() * 8}px;
      height: ${6 + Math.random() * 8}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
      z-index: 99999;
      pointer-events: none;
      animation: confettiFall ${1.5 + Math.random() * 2}s ease-in forwards;
      animation-delay: ${Math.random() * 0.5}s;
    `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 3000);
  }

  // 스타일 주입 (한 번만)
  if (!document.getElementById('confetti-style')) {
    const style = document.createElement('style');
    style.id = 'confetti-style';
    style.textContent = `
      @keyframes confettiFall {
        0%   { transform: translateY(0) rotate(0deg); opacity: 1; }
        100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
}

// ──────────────────────────────────────────────
// 3대 기상 해제 미션
// ──────────────────────────────────────────────

/** 미션 1: 랜덤 2자리 연산 퀴즈 */
export function generateMathQuiz() {
  const ops = ['+', '-', '×'];
  const op = ops[Math.floor(Math.random() * ops.length)];
  let a, b, answer;

  if (op === '+') {
    a = 10 + Math.floor(Math.random() * 89);
    b = 10 + Math.floor(Math.random() * 89);
    answer = a + b;
  } else if (op === '-') {
    a = 30 + Math.floor(Math.random() * 70);
    b = 10 + Math.floor(Math.random() * (a - 10));
    answer = a - b;
  } else {
    a = 2 + Math.floor(Math.random() * 12);
    b = 2 + Math.floor(Math.random() * 12);
    answer = a * b;
  }

  return { question: `${a} ${op} ${b} = ?`, answer };
}

/** 미션 2: B급 타자 미션 문장 */
export const TYPING_SENTENCES = [
  '교수님 죄송합니다 셔틀이 눈앞에서 떠났습니다',
  '알람이 일어나서 껐는데 다시 누웠다가 일어났더니 9시였습니다',
  '오늘 수업 들어가면 출석으로 인정해주시나요 저 지각이에요',
  '1교시가 왜 이렇게 일찍 시작하는지 이해가 안됩니다 교수님',
  '기숙사에서 강의실까지 뛰어가면 7분 걸립니다 해보겠습니다',
  '오늘 대체출석 안되나요 사정이 있어서요 제발요',
];

export function getRandomTypingSentence() {
  return TYPING_SENTENCES[Math.floor(Math.random() * TYPING_SENTENCES.length)];
}

/** 미션 3: 연타 카운터 (터치/클릭) */
export function createTapMission(targetCount = 30, timeLimitSec = 5) {
  return {
    targetCount,
    timeLimitSec,
    current: 0,
  };
}

// ──────────────────────────────────────────────
// localStorage 알람 저장소
// ──────────────────────────────────────────────
export function getAlarms() {
  try { return JSON.parse(localStorage.getItem('shee8_alarms') || '[]'); } catch { return []; }
}

export function saveAlarms(alarms) {
  localStorage.setItem('shee8_alarms', JSON.stringify(alarms));
}

export function deleteAlarm(id) {
  const alarms = getAlarms().filter(a => a.id !== id);
  saveAlarms(alarms);
}

export function toggleAlarm(id) {
  const alarms = getAlarms();
  const alarm = alarms.find(a => a.id === id);
  if (alarm) {
    alarm.active = !alarm.active;
    saveAlarms(alarms);
  }
  return alarm;
}

// ──────────────────────────────────────────────
// 시험용: 알람 즉시 테스트
// ──────────────────────────────────────────────
export function testAlarm(soundKey = 'siren', missionType = 'quiz') {
  triggerAlarm(soundKey, missionType);
}
