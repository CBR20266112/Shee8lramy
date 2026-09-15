/**
 * nlp-calendar.js — 자연어 → 일정 파서 & 국립순천대 컴교과 스케줄 데이터셋
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

  const thisWeekMatch = text.match(/이번\s*주?\s*(월|화|수|목|금|토|일)요일?/);
  if (thisWeekMatch) {
    const targetDay = WEEKDAY_MAP[thisWeekMatch[1] + '요일'] ?? WEEKDAY_MAP[thisWeekMatch[1]];
    const d = new Date(now);
    const diff = (targetDay - now.getDay() + 7) % 7;
    d.setDate(d.getDate() + diff);
    return d;
  }

  const nextWeekMatch = text.match(/다음\s*주?\s*(월|화|수|목|금|토|일)요일?/);
  if (nextWeekMatch) {
    const targetDay = WEEKDAY_MAP[nextWeekMatch[1] + '요일'] ?? WEEKDAY_MAP[nextWeekMatch[1]];
    const d = new Date(now);
    const diff = (targetDay - now.getDay() + 7) % 7 + 7;
    d.setDate(d.getDate() + diff);
    return d;
  }

  const mdMatch = text.match(/(\d{1,2})[월]\s*(\d{1,2})[일]/);
  if (mdMatch) {
    const d = new Date(now);
    d.setMonth(parseInt(mdMatch[1]) - 1, parseInt(mdMatch[2]));
    return d;
  }

  const dayMatch = text.match(/(\d{1,2})일/);
  if (dayMatch) {
    const d = new Date(now);
    d.setDate(parseInt(dayMatch[1]));
    return d;
  }

  return new Date(now);
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

  const hMatch = text.match(/(\d{1,2})시\s*(\d{1,2})?분?/);
  if (hMatch) {
    return { h: parseInt(hMatch[1]), m: parseInt(hMatch[2] || '0') };
  }

  return { h: 16, m: 0 }; // 기본값 오후 4시
}

export function parseLocation(text) {
  const locationPatterns = [
    /([가-힣a-zA-Z0-9]+관(?:\s*\d+호관)?)/,
    /([가-힣]+\s*학식)/,
    /(학생회관|도서관|LMS|온라인|동아리방)/,
    /([가-힣]+호)/,
  ];

  for (const pat of locationPatterns) {
    const m = text.match(pat);
    if (m) return m[1];
  }
  return '캠퍼스 내';
}

export function parseCategory(text) {
  if (/시험|중간|기말|퀴즈/i.test(text)) return '🔴 시험';
  if (/과제|리포트|제출|LMS/i.test(text)) return '🟡 과제';
  if (/발표|PPT/i.test(text)) return '🟡 발표';
  if (/개강총회|행사|캠프/i.test(text)) return '🔵 행사';
  if (/약속|학식|번개|회식/i.test(text)) return '🟢 조별모임';
  return '🟢 조별모임';
}

export function parseTitle(text) {
  const cleaned = text.replace(/(오늘|내일|모레|오후|오전|\d+시|\d+분)/g, '').trim();
  return cleaned.slice(0, 20) || '학사 약속 일정';
}

export function parseNaturalLanguage(text) {
  const date = parseDate(text);
  const time = parseTime(text);
  const location = parseLocation(text);
  const category = parseCategory(text);
  const title = parseTitle(text);

  date.setHours(time.h, time.m, 0, 0);

  const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
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

// ──────────────────────────────────────────────
// 캘린더 이벤트 로컬스토리지 입출력
// ──────────────────────────────────────────────

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

export function getEventsForDate(dateStr) {
  const events = getCalendarEvents();
  return events.filter(e => e.date === dateStr);
}
