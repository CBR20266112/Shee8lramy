/**
 * nlp-calendar.js — 자연어 → 일정 파서 (Vanilla JS 정규식 기반)
 * 에타/단톡방 줄글을 캘린더 이벤트로 자동 변환
 */

// ──────────────────────────────────────────────
// 날짜 파싱
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

  // 오늘, 내일, 모레
  if (/오늘/.test(text)) return new Date(now);
  if (/내일/.test(text)) { const d = new Date(now); d.setDate(d.getDate() + 1); return d; }
  if (/모레/.test(text)) { const d = new Date(now); d.setDate(d.getDate() + 2); return d; }

  // 이번 주 X요일
  const thisWeekMatch = text.match(/이번\s*주?\s*(월|화|수|목|금|토|일)요일?/);
  if (thisWeekMatch) {
    const targetDay = WEEKDAY_MAP[thisWeekMatch[1] + '요일'] ?? WEEKDAY_MAP[thisWeekMatch[1]];
    const d = new Date(now);
    const diff = (targetDay - now.getDay() + 7) % 7;
    d.setDate(d.getDate() + diff);
    return d;
  }

  // 다음 주 X요일
  const nextWeekMatch = text.match(/다음\s*주?\s*(월|화|수|목|금|토|일)요일?/);
  if (nextWeekMatch) {
    const targetDay = WEEKDAY_MAP[nextWeekMatch[1] + '요일'] ?? WEEKDAY_MAP[nextWeekMatch[1]];
    const d = new Date(now);
    const diff = (targetDay - now.getDay() + 7) % 7 + 7;
    d.setDate(d.getDate() + diff);
    return d;
  }

  // M월 D일
  const mdMatch = text.match(/(\d{1,2})[월]\s*(\d{1,2})[일]/);
  if (mdMatch) {
    const d = new Date(now);
    d.setMonth(parseInt(mdMatch[1]) - 1, parseInt(mdMatch[2]));
    return d;
  }

  // D일 (이번 달)
  const dayMatch = text.match(/(\d{1,2})일/);
  if (dayMatch) {
    const d = new Date(now);
    d.setDate(parseInt(dayMatch[1]));
    return d;
  }

  // 이번 주 일요일 → 다음 주 일요일 처리
  const weekdayOnly = text.match(/(월|화|수|목|금|토|일)요일/);
  if (weekdayOnly) {
    const targetDay = WEEKDAY_MAP[weekdayOnly[1] + '요일'];
    const d = new Date(now);
    const diff = (targetDay - now.getDay() + 7) % 7;
    d.setDate(d.getDate() + (diff === 0 ? 7 : diff));
    return d;
  }

  return new Date(now); // 기본: 오늘
}

// ──────────────────────────────────────────────
// 시간 파싱
// ──────────────────────────────────────────────

export function parseTime(text) {
  // 오후 H시 M분 / 오전 H시
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

  // HH:MM
  const colonMatch = text.match(/(\d{1,2}):(\d{2})/);
  if (colonMatch) {
    return { h: parseInt(colonMatch[1]), m: parseInt(colonMatch[2]) };
  }

  // H시 M분
  const hMatch = text.match(/(\d{1,2})시\s*(\d{1,2})?분?/);
  if (hMatch) {
    return { h: parseInt(hMatch[1]), m: parseInt(hMatch[2] || '0') };
  }

  // 밤 11시 59분
  const nightMatch = text.match(/밤\s*(\d{1,2})시\s*(\d{1,2})?분?/);
  if (nightMatch) {
    let h = parseInt(nightMatch[1]);
    if (h < 12) h += 12;
    return { h, m: parseInt(nightMatch[2] || '0') };
  }

  return { h: 9, m: 0 }; // 기본: 09:00
}

// ──────────────────────────────────────────────
// 장소 파싱
// ──────────────────────────────────────────────

export function parseLocation(text) {
  // 건물명 패턴: XXX관 / LMS / 온라인
  const locationPatterns = [
    /([가-힣]+관(?:\s*\d+호관)?)/,
    /([가-힣]+\s*\d+호관)/,
    /(LMS|온라인|줌|zoom|Zoom)/i,
    /([가-힣]+강의실)/,
    /([가-힣]+도서관)/,
    /([가-힣]+실험실)/,
  ];

  for (const pat of locationPatterns) {
    const m = text.match(pat);
    if (m) return m[1];
  }
  return '';
}

// ──────────────────────────────────────────────
// 카테고리 분류
// ──────────────────────────────────────────────

export function parseCategory(text) {
  if (/레포트|보고서|과제|homework|assignment/i.test(text)) return '과제';
  if (/발표|프레젠테이션|PPT/i.test(text)) return '발표';
  if (/중간|기말|시험|exam|test/i.test(text)) return '시험';
  if (/수업|강의|lecture/i.test(text)) return '수업';
  if (/스터디|스터디모임|study/i.test(text)) return '스터디';
  if (/LMS|제출|업로드/i.test(text)) return '제출';
  if (/모임|회의|미팅|meeting/i.test(text)) return '모임';
  return '일정';
}

// ──────────────────────────────────────────────
// 제목 추출
// ──────────────────────────────────────────────

export function parseTitle(text) {
  // 과목명 + 이벤트 유형 조합
  const subjectMatch = text.match(/([가-힣a-zA-Z]+(?:론|학|론|개론|프로그래밍|실습|설계))/);
  const eventMatch = text.match(/(중간|기말|과제|발표|레포트|시험|모임|미팅|스터디|제출)/);

  if (subjectMatch && eventMatch) {
    return `${subjectMatch[1]} ${eventMatch[1]}`;
  }
  if (subjectMatch) return subjectMatch[1];
  if (eventMatch) return eventMatch[1];

  // 긴 텍스트의 앞 20자
  return text.slice(0, 20).trim() + (text.length > 20 ? '…' : '');
}

// ──────────────────────────────────────────────
// 메인 파서
// ──────────────────────────────────────────────

export function parseNaturalLanguage(text) {
  const date = parseDate(text);
  const time = parseTime(text);
  const location = parseLocation(text);
  const category = parseCategory(text);
  const title = parseTitle(text);

  date.setHours(time.h, time.m, 0, 0);

  const dateStr = date.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'short' });
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
// 카테고리 이모지
// ──────────────────────────────────────────────

export const CATEGORY_EMOJI = {
  '과제': '📝',
  '발표': '🎤',
  '시험': '📚',
  '수업': '📖',
  '스터디': '🤝',
  '제출': '📤',
  '모임': '👥',
  '일정': '📅',
};

export function getCategoryEmoji(cat) {
  return CATEGORY_EMOJI[cat] || '📅';
}

// ──────────────────────────────────────────────
// localStorage 이벤트 저장소
// ──────────────────────────────────────────────

export function getCalendarEvents() {
  try { return JSON.parse(localStorage.getItem('shee8_calendar') || '[]'); } catch { return []; }
}

export function saveCalendarEvent(evt) {
  const events = getCalendarEvents();
  events.push({ ...evt, date: evt.date.toISOString() });
  localStorage.setItem('shee8_calendar', JSON.stringify(events));
}

export function deleteCalendarEvent(id) {
  const events = getCalendarEvents().filter(e => e.id !== id);
  localStorage.setItem('shee8_calendar', JSON.stringify(events));
}

export function getEventsForDate(date) {
  const events = getCalendarEvents();
  const target = new Date(date);
  return events.filter(e => {
    const d = new Date(e.date);
    return d.getFullYear() === target.getFullYear() &&
           d.getMonth() === target.getMonth() &&
           d.getDate() === target.getDate();
  });
}

export function getUpcomingEvents(count = 5) {
  const events = getCalendarEvents();
  const now = new Date();
  return events
    .map(e => ({ ...e, date: new Date(e.date) }))
    .filter(e => e.date >= now)
    .sort((a, b) => a.date - b.date)
    .slice(0, count);
}
