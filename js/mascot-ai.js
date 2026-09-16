/**
 * js/mascot-ai.js — 지능형 캠퍼스 잔소리 에이전트 (학사 일정 감시 팩폭 엔진 & 대화형 자연어 비서)
 */

import { getCalendarEvents, parseNaturalLanguage, saveCalendarEvent, MONTHLY_EVENTS, NOVEMBER_EVENTS } from './nlp-calendar.js';
import { SHEEP_POSE } from './constants.js';

// 팩폭 대사 뱅크 (학사 일정 연동)
export const SCHEDULE_PROVOCATIONS = {
  PRESENTATION: [
    "발표 대본도 제대로 안 읽었으면서 침대랑 물아일체냐? 당일날 단상에서 어버버 할 미래가 훤하다.",
    "발표 연습 최소 3번은 돌려봤어? 교수님이 질의응답으로 뼈 때리실 텐데 용기가 가상하네.",
    "PPT 폰트 깨지고 슬라이드 넘길 줄도 몰라서 식은땀 흘릴래? 대본 켜라."
  ],
  ASSIGNMENT: [
    "과제 제출 마감 몇 시간 안 남았다. 11시 58분에 LMS 서버 터져서 울고불고 메일 쓰지 마라.",
    "과제 분량 A4 3장인데 아직 1줄 쓰고 폰 보고 있네? 뇌 빼고 과제해라, 제발.",
    "표절률 15% 넘으면 0점인 거 알지? 복붙하지 말고 네 뇌세포 좀 가동해라."
  ],
  EXAM: [
    "재수강비 50만 원 통장에 여유 있나 봐? 시험 범위 펴지도 않고 유튜브 알고리즘 타네.",
    "동기들은 족보 3회독 돌렸대. 넌 기출 1번도 안 풀었잖아. 다음 학기 수강신청 12학점 걸려볼래?"
  ],
  CLASS: [
    "교수님 출석부 볼펜 딸깍거리시는 소리 안 들려? 5분 뒤에 뛰면 사범관까지 100m 전력질주다.",
    "오늘 결석하면 삼수강 확정인 거 뻔히 알면서 신발 안 신냐? 1교시 교수님 눈빛 마주칠 자신 있어?"
  ],
  FREE_DAY: [
    "공강이라고 하루 종일 폰만 잡고 뒹굴거리는 꼴이 레전드네. 방 청소라도 하든가.",
    "오늘 누워있는 시간만큼 내일 지옥이 펼쳐질 텐데... 뭐, 네 학점이지 내 학점이냐?"
  ]
};

/**
 * 사용자의 등록된 학사 일정(캘린더, 시간표)을 감사하여 우선순위에 따른 팩폭 멘트와 포즈를 반환
 * @returns {{ quote: string, pose: string, category: string }}
 */
export function getScheduleAwareQuote() {
  const events = getCalendarEvents() || [];
  const allEvents = [...events, ...MONTHLY_EVENTS, ...NOVEMBER_EVENTS];
  
  const now = new Date();
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, '0')}-${String(tomorrow.getDate()).padStart(2, '0')}`;

  // 1. 당일/익일 발표 일정 체크 (우선순위 1)
  const presEvt = allEvents.find(e => {
    const d = e.dateStr || e.date;
    const isTargetDate = (d === todayStr || d === tomorrowStr);
    const title = e.title || '';
    const cat = e.category || '';
    return isTargetDate && (/발표|시연/i.test(title) || /발표/i.test(cat));
  });

  if (presEvt) {
    const list = SCHEDULE_PROVOCATIONS.PRESENTATION;
    const quote = list[Math.floor(Math.random() * list.length)];
    return { quote, pose: SHEEP_POSE.WORKSHOP, category: 'PRESENTATION' };
  }

  // 2. 당일/익일 과제 마감 일정 체크 (우선순위 2)
  const assgnEvt = allEvents.find(e => {
    const d = e.dateStr || e.date;
    const isTargetDate = (d === todayStr || d === tomorrowStr);
    const title = e.title || '';
    const cat = e.category || '';
    return isTargetDate && (/과제|마감|제출|초안/i.test(title) || /과제|마감/i.test(cat));
  });

  if (assgnEvt) {
    const list = SCHEDULE_PROVOCATIONS.ASSIGNMENT;
    const quote = list[Math.floor(Math.random() * list.length)];
    return { quote, pose: SHEEP_POSE.WORKSHOP, category: 'ASSIGNMENT' };
  }

  // 3. D-7 이내 시험/중간고사/기말고사 체크 (우선순위 3)
  const examEvt = allEvents.find(e => {
    const d = e.dateStr || e.date;
    if (!d) return false;
    const evtDate = new Date(d);
    const diffTime = evtDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24));
    const title = e.title || '';
    const cat = e.category || '';
    return diffDays >= 0 && diffDays <= 7 && (/시험|중간|기말|퀴즈|평가/i.test(title) || /시험/i.test(cat));
  });

  if (examEvt) {
    const list = SCHEDULE_PROVOCATIONS.EXAM;
    const quote = list[Math.floor(Math.random() * list.length)];
    return { quote, pose: SHEEP_POSE.MINIGAME, category: 'EXAM' };
  }

  // 4. 1시간 이내 또는 당일 수업/출석 체크 (우선순위 4)
  const classEvt = allEvents.find(e => {
    const d = e.dateStr || e.date;
    const isToday = (d === todayStr);
    const title = e.title || '';
    const cat = e.category || '';
    return isToday && (/수업|강의|1교시|컴교론|프로그래밍|이산수학|자료구조|운영체제|CPR/i.test(title) || /의무|수업/i.test(cat));
  });

  if (classEvt) {
    const list = SCHEDULE_PROVOCATIONS.CLASS;
    const quote = list[Math.floor(Math.random() * list.length)];
    return { quote, pose: SHEEP_POSE.MINIGAME, category: 'CLASS' };
  }

  // 5. 공강 또는 당일 일정 무 (우선순위 5)
  const hasTodayEvt = allEvents.some(e => (e.dateStr || e.date) === todayStr);
  if (!hasTodayEvt && Math.random() < 0.4) {
    const list = SCHEDULE_PROVOCATIONS.FREE_DAY;
    const quote = list[Math.floor(Math.random() * list.length)];
    return { quote, pose: SHEEP_POSE.IDLE, category: 'FREE_DAY' };
  }

  // 6. 기본 팩폭 멘트 반환
  return { quote: null, pose: SHEEP_POSE.IDLE, category: 'DEFAULT' };
}

/**
 * 대화형 자연어 일정 비서 텍스트 처리 및 츤데레 팩폭 대답 반환
 * @param {string} rawInput 
 */
export function handleMascotNLPInput(rawInput) {
  const text = (rawInput || '').trim();
  if (!text) {
    return {
      success: false,
      quote: "내용도 없이 멍하니 엔터 쳤냐? 일정 텍스트 써서 던져라.",
      pose: SHEEP_POSE.MINIGAME
    };
  }

  const parsed = parseNaturalLanguage(text);
  saveCalendarEvent(parsed);

  let quote = "등록 완료. 등록만 해놓고 침대로 다이빙하면 진짜 F다.";
  if (/발표|시연/i.test(text)) {
    quote = "발표? 벼락치기 하려고 또? 쯧... 캘린더에 일단 박아뒀으니 제발 연습이나 해라.";
  } else if (/과제|마감|제출|초안/i.test(text)) {
    quote = "과제 마감 등록했다. 잊어버렸다고 징징대기만 해봐, 털 다 뽑아버린다.";
  } else if (/시험|중간|기말|퀴즈/i.test(text)) {
    quote = "시험 일정 추가 완료. 이 시간에 인스타 보지 말고 도서관 가라.";
  }

  return {
    success: true,
    event: parsed,
    quote,
    pose: SHEEP_POSE.GALLERY // pose5.png (츤데레 윙크)
  };
}

// Global window 등록 (non-module 환경 대응)
if (typeof window !== 'undefined') {
  window.MascotAI = {
    getScheduleAwareQuote,
    handleMascotNLPInput,
    SCHEDULE_PROVOCATIONS
  };
}
