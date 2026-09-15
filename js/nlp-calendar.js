/**
 * nlp-calendar.js — 자연어 → 일정 파서 & 국립순천대 컴교과 2학기 학사/11월 행사 스케줄 데이터셋
 */

// ──────────────────────────────────────────────
// 국립순천대 컴퓨터교육과(컴교과) 목업 데이터
// ──────────────────────────────────────────────

export const TIMETABLE_COURSES = [
  { day: 1, start: '09:00', end: '11:00', name: '컴퓨터교육론', prof: '김교수', room: '사범관 2호관 105호', color: 'linear-gradient(135deg, rgba(167,139,250,0.8), rgba(139,92,246,0.8))' },
  { day: 1, start: '13:00', end: '15:00', name: '프로그래밍언어론', prof: '박교수', room: '공학관 3호관 301호', color: 'linear-gradient(135deg, rgba(107,203,119,0.8), rgba(52,211,153,0.8))' },
  { day: 2, start: '10:00', end: '12:00', name: '이산수학', prof: '이교수', room: '기초교육관 204호', color: 'linear-gradient(135deg, rgba(255,217,61,0.8), rgba(251,191,36,0.8))' },
  { day: 3, start: '09:00', end: '11:00', name: '컴퓨터교육론', prof: '김교수', room: '사범관 2호관 105호', color: 'linear-gradient(135deg, rgba(167,139,250,0.8), rgba(139,92,246,0.8))' },
  { day: 3, start: '14:00', end: '17:00', name: '자료구조 및 실습', prof: '정교수', room: '공학관 3호관 312호 실습실', color: 'linear-gradient(135deg, rgba(255,107,107,0.8), rgba(244,63,94,0.8))' },
  { day: 5, start: '11:00', end: '13:00', name: '운영체제', prof: '최교수', room: '공학관 3호관 202호', color: 'linear-gradient(135deg, rgba(77,150,255,0.8), rgba(59,130,246,0.8))' },
];

export const NOVEMBER_EVENTS = [
  {
    id: "evt-nov-03",
    date: "2026-11-03",
    time: "14:00 - 17:00",
    title: "소전(소프트웨어 전시회) 최종 평가",
    category: "🔴 시험",
    location: "공학관 3호관 전산실습실",
    memo: "졸업작품 및 학술제 출품작 최종 시연 심사 (지각 시 감점)",
    type: "red",
    dday: "D-49"
  },
  {
    id: "evt-nov-13",
    date: "2026-11-13",
    time: "13:00 - 18:00",
    title: "소전 부스 설치 및 리허설 준비",
    category: "🔵 행사",
    location: "70주년 기념관 우석홀",
    memo: "전시 판넬 부착, 모니터/기자재 세팅 및 네트워크 점검",
    type: "blue",
    dday: "D-59"
  },
  {
    id: "evt-nov-16",
    date: "2026-11-16",
    time: "09:00",
    title: "2027학년도 학생회 임원 입후보 등록 시작",
    category: "🟣 공지",
    location: "학과 사무실",
    memo: "선출직: 회장/부회장/총무 (각 부 팀장은 추후 임명직 진행)",
    type: "purple",
    dday: "D-62"
  },
  {
    id: "evt-nov-17",
    date: "2026-11-17",
    time: "10:00 - 17:00",
    title: "⭐ 2026 소프트웨어 전시회 (소전 본행사)",
    category: "🟡 행사",
    location: "70주년 기념관 우석홀",
    memo: "학과 전체 필수 참석 행사! 학과장님 축사 및 프로젝트 부스 운영 (우석홀 부스 지킴이 / 필수 출석 체크)",
    type: "yellow",
    isHighlight: true,
    dday: "⭐ D-Day"
  },
  {
    id: "evt-nov-19",
    date: "2026-11-19",
    time: "15:00 - 17:00",
    title: "응급처치 및 심폐소생술(CPR) 법정 의무 교육",
    category: "🟢 의무",
    location: "사범관 1호관 대강당",
    memo: "사범관 1호관 CPR 교육 (교원자격증/졸업 필수! 결석 시 1년 유예, 편한 바지 착용)",
    type: "green",
    isHighlight: true,
    dday: "⚠️ 필수"
  },
  {
    id: "evt-nov-30",
    date: "2026-11-30",
    time: "18:00 마감",
    title: "2027학년도 학생회 임원 등록 마감",
    category: "🔴 마감",
    location: "학과 사무실 서류 제출처",
    memo: "입후보자 추천서 및 공약서 제출 최종 마감",
    type: "red",
    dday: "D-76"
  }
];

export const MONTHLY_EVENTS = [
  { date: '2026-09-18', title: '2026 융합 아이디어 캠프', category: '🔵 행사', location: '공학관 3호관', type: 'blue', dday: 'D-3' },
  { date: '2026-09-22', title: '컴퓨터교육과 2학기 개강총회 & 회식', category: '🔵 행사', location: '학생회관 2층 / 대학로', type: 'blue', dday: 'D-7' },
  { date: '2026-09-27', title: '컴교론 교수학습지도안 1차 초안 LMS 제출', category: '🟡 과제', location: 'LMS 시스템 (23:59 마감)', type: 'yellow', dday: 'D-12' },
  { date: '2026-10-07', title: '현대문학의 이해 조별 1차 발표', category: '🟡 발표', location: '기초교육관 301호', type: 'yellow', dday: 'D-22' },
  { date: '2026-10-12', title: '캡스톤 프로젝트 주제 선정 회의', category: '🟢 조별모임', location: '중앙도서관 스터디룸 B', type: 'green', dday: 'D-27' },
  { date: '2026-10-20', title: '🚨 2학기 중간고사 주간 시작', category: '🔴 시험', location: '각 과목 지정 강의실', type: 'red', dday: 'D-35' },
  { date: '2026-10-21', title: '🚨 이산수학 중간고사', category: '🔴 시험', location: '기초교육관 204호', type: 'red', dday: 'D-36' },
  { date: '2026-10-22', title: '🚨 컴퓨터교육론 중간고사', category: '🔴 시험', location: '사범관 2호관 105호', type: 'red', dday: 'D-37' },
  { date: '2026-10-23', title: '🚨 운영체제 중간고사', category: '🔴 시험', location: '공학관 3호관 202호', type: 'red', dday: 'D-38' },
  { date: '2026-10-24', title: '🚨 2학기 중간고사 종료 & 뒤풀이', category: '🔵 행사', location: '동아리방', type: 'blue', dday: 'D-39' },
  ...NOVEMBER_EVENTS
];

// ──────────────────────────────────────────────
// 자연어 파서 정규식 엔진
// ──────────────────────────────────────────────

const WEEKDAY_MAP = {
  '월요일': 1, '월': 1,
  '화요일': 2, '화': 2,
  '수요일': 3, '수': 3,
  '목요일': 4, '목': 4,
  '금요일': 5, '금': 5,
  '토요일': 6, '토': 6,
  '일요일': 0, '일': 0,
};

export function parseDate(text) {
  const now = new Date();
  if (/오늘/.test(text)) return new Date(now);
  if (/내일/.test(text)) { const d = new Date(now); d.setDate(d.getDate() + 1); return d; }
  if (/모레/.test(text)) { const d = new Date(now); d.setDate(d.getDate() + 2); return d; }

  const mdMatch = text.match(/(\d{1,2})[월]\s*(\d{1,2})[일]?/);
  if (mdMatch) {
    const d = new Date(now);
    d.setFullYear(2026);
    d.setMonth(parseInt(mdMatch[1]) - 1, parseInt(mdMatch[2]));
    return d;
  }

  const thisWeekMatch = text.match(/이번\s*주?\s*(월|화|수|목|금|토|일)요일?/);
  if (thisWeekMatch) {
    const targetDay = WEEKDAY_MAP[thisWeekMatch[1] + '요일'] ?? WEEKDAY_MAP[thisWeekMatch[1]];
    const d = new Date(now);
    const diff = (targetDay - now.getDay() + 7) % 7;
    d.setDate(d.getDate() + diff);
    return d;
  }

  return new Date(2026, 10, 3); // 기본 11월 3일
}

export function parseTime(text) {
  const pmMatch = text.match(/오후\s*(\d{1,2})시\s*(\d{1,2})?분?/);
  if (pmMatch) {
    let h = parseInt(pmMatch[1]);
    const m = parseInt(pmMatch[2] || '0');
    if (h < 12) h += 12;
    return { h, m };
  }

  const amMatch = text.match(/오전\s*(\d{1,2})시\s*(\d{1,2})?분?/);
  if (amMatch) {
    let h = parseInt(amMatch[1]);
    const m = parseInt(amMatch[2] || '0');
    if (h === 12) h = 0;
    return { h, m };
  }

  const colonMatch = text.match(/(\d{1,2}):(\d{2})/);
  if (colonMatch) {
    return { h: parseInt(colonMatch[1]), m: parseInt(colonMatch[2]) };
  }

  const hMatch = text.match(/(\d{1,2})시/);
  if (hMatch) {
    let h = parseInt(hMatch[1]);
    if (h < 9) h += 12;
    return { h, m: 0 };
  }

  return { h: 14, m: 0 };
}

export function parseLocation(text) {
  const locationPatterns = [
    /(공학관\s*\d*호관?)/,
    /(사범관\s*\d*호관?\s*대강당?)/,
    /(사범관\s*\d*호관?)/,
    /(과사|학과\s*사무실)/,
    /(우석홀|70주년\s*기념관)/,
    /([가-힣a-zA-Z0-9]+관)/,
  ];

  for (const pat of locationPatterns) {
    const m = text.match(pat);
    if (m) return m[1];
  }
  return '캠퍼스 내 지정 장소';
}

export function parseCategory(text) {
  if (/소전|최종평가|시험|결석하면|발급 안 됨/i.test(text)) return '🔴 주요행사';
  if (/심폐소생술|CPR|교육|의무/i.test(text)) return '🟢 의무교육';
  if (/학생회|입후보|선거|과사/i.test(text)) return '🟣 공지사항';
  return '🔵 학과일정';
}

export function parseTitle(text) {
  if (/소전|소프트웨어/i.test(text)) return '[소전] 최종평가 시연';
  if (/심폐소생술|CPR/i.test(text)) return '[의무] CPR 심폐소생술 교육';
  if (/학생회|입후보/i.test(text)) return '[공지] 학생회 임원 등록 마감';
  return text.slice(0, 18);
}

export function parseNaturalLanguage(text) {
  const date = parseDate(text);
  const time = parseTime(text);
  const location = parseLocation(text);
  const category = parseCategory(text);
  const title = parseTitle(text);

  date.setHours(time.h, time.m, 0, 0);

  const dateStr = `2026-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  const timeStr = `${String(time.h).padStart(2, '0')}:${String(time.m).padStart(2, '0')}`;

  return {
    title,
    date,
    dateStr,
    timeStr,
    location,
    category,
    originalText: text,
    id: Date.now(),
  };
}

export function getCalendarEvents() {
  try {
    const saved = JSON.parse(localStorage.getItem('shee8_calendar_v2') || 'null');
    return saved || MONTHLY_EVENTS;
  } catch {
    return MONTHLY_EVENTS;
  }
}

export function saveCalendarEvent(evt) {
  const events = getCalendarEvents();
  events.push(evt);
  localStorage.setItem('shee8_calendar_v2', JSON.stringify(events));
  window.dispatchEvent(new CustomEvent('shee8-calendar-updated', { detail: evt }));
}
