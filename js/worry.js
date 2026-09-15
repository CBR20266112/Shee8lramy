/**
 * worry.js — 교수님 맞춤형 지각/결석 사유서 세탁기 (100% 오프라인 규칙 엔진)
 * 외부 API 키 사용 0%, 오프라인 규칙 기반 전문 비즈니스 메일 생성
 */

export function cleanExcuse(rawInput, persona = 'strict', meta = {}) {
  const profName = (meta.profName || '').trim() || '교수님';
  const courseName = (meta.courseName || '').trim() || '전공 강의';
  const studentName = (meta.studentName || '').trim() || '김쉽알';
  const studentId = (meta.studentId || '').trim() || '202612345';
  const deptName = (meta.deptName || '').trim() || '소프트웨어학과';

  const raw = (rawInput || '').trim();

  // 1. 날것 핑계 키워드 감지 & 세탁 문장 추출
  let cleanReason = '일신상의 불가피한 사유';
  let evidenceTip = '대중교통 지연 증명서(또는 병원 진료확인서) PDF';

  if (/비|폭우|눈|태풍|날씨|우산|악천후/.test(raw) && /셔틀|버스|지하철|연착|놓침|지각/.test(raw)) {
    cleanReason = '기상 악화 및 폭우로 인한 통학 대중교통(셔틀버스) 연쇄 지연';
    evidenceTip = '대중교통 운행 지연 증명서 및 탑승 내역 캡처본';
  } else if (/셔틀|버스|지하철|택시|교통|막힘|연착|놓침/.test(raw)) {
    cleanReason = '통학 대중교통 예기치 못한 운행 지연 및 연착';
    evidenceTip = '교통 수단 지연 증명서 및 이동 시간 기록';
  } else if (/감기|아픔|열|몸살|병원|체함|두통|복통|응급|아파/.test(raw)) {
    cleanReason = '환절기 급성 오한 및 신체 컨디션 난조로 인한 병원 방문';
    evidenceTip = '의학 진료확인서(또는 처방전 및 진단서) PDF';
  } else if (/과제|팀플|마감|밤샘|제출|깜빡/.test(raw)) {
    cleanReason = '팀 학술 과제 수행 및 시험 준비로 인한 일시적 피로 누적';
    evidenceTip = '과제 제출본 및 보충 연구 보고서 파일';
  } else if (/늦잠|잠|알람|못 들음|안 들림|피곤/.test(raw)) {
    cleanReason = '심야 학업 과제 이행 후 알람 미작동에 따른 불가피한 출석 지연';
    evidenceTip = '금일 자율 보충 학습 노트 및 사유 정리서';
  } else if (raw.length > 0) {
    cleanReason = `개인 일신상의 긴급 사유 (${raw.slice(0, 35)})`;
  }

  // 2. 페르소나별 메일 생성
  if (persona === 'strict') {
    // 🏛️ 원칙주의 엄격형
    return {
      title: `[공결/지각 사유서] [${deptName}/${studentId}/${studentName}] 수업 참석 지연 사유 및 증빙 제출의 건`,
      recipient: `${profName} 교수님 귀하`,
      sender: `${deptName} ${studentId} ${studentName}`,
      body: `안녕하십니까, ${profName} 교수님.
${deptName} ${studentId} ${studentName}입니다.

소중한 [${courseName}] 수업 참석을 위해 사전 준비를 진행하였으나, '${cleanReason}'(으)로 인하여 금일 수업 참석에 차질(지각/결석)을 겪게 되었습니다.

학칙 공결 규정 제14조에 의거하여, 불의의 사유로 수업 엄수 의무를 완수하지 못한 점 깊이 반성하고 있습니다. 

수업 미참석에 따른 학업 손실을 최소화하기 위해 타 학생의 강의 필기 노트를 입수하여 자율 복습을 이행하겠으며, 교수님께서 지정해 주시는 보충 학습 과제나 추가 보고서를 기한 내에 성실히 작성하여 제출하겠습니다.

아울러 관련 사유에 대한 객관적 증빙 자료를 본 메일의 첨부파일로 함께 제출하오니 확인을 부탁드립니다.

교수님의 귀중한 강의 진행에 차질을 드려 다시 한번 진심으로 죄송합니다.

${studentName} 올림`,
      evidence: `📌 [첨부 필요 서류]: ${evidenceTip}, 공결 신청서`
    };
  } else if (persona === 'emotional') {
    // 🌱 인자한 감성형
    return {
      title: `[감사 및 사과] [${deptName}/${studentName}] 교수님, 오늘 수업에 죄송한 마음으로 메일 올립니다.`,
      recipient: `존경하는 ${profName} 교수님께`,
      sender: `${deptName} ${studentName} 드림`,
      body: `교수님, 안녕하십니까!
요즘 환절기 및 급변하는 날씨에 교수님의 건강과 댁내 평안이 함께하시길 먼저 진심으로 기원합니다.

오늘 교수님의 열정적인 [${courseName}] 강의를 현장에서 직접 듣고자 일찍부터 서둘러 길을 나섰으나, 안타깝게도 '${cleanReason}' 사태가 발생하여 제시된 시간에 참석하지 못하였습니다.

교수님께서 전달해 주시는 지성의 배움터를 제 불찰과 사유로 놓치게 된 것에 대해 스스로 깊은 탄식과 자책을 느끼고 있습니다. 교수님의 기대에 미치지 못하고 실망을 드린 점 머리 숙여 깊이 사과드립니다.

비록 금일 현장 강의에는 함께하지 못하였으나, 오늘 다루어진 강의 내용 및 관련 규범 자료를 철저히 독학하고 동기들의 조언을 받아 학업 이수 과정에 단 한 치의 소홀함도 없도록 하겠습니다.

늘 제자들을 위해 아낌없이 피와 땀을 쏟아주시는 교수님께 깊은 감사와 존경을 표하며, 너그러운 양해를 감히 부탁드립니다. 늘 건강하십시오!

${studentName} 드림`,
      evidence: `📌 [첨부 권장 서류]: ${evidenceTip} 및 자율 보충 학습 요약 보고서`
    };
  } else {
    // ⚡ 바쁜 연구형 (3줄 요약)
    return {
      title: `[3줄 요약/사유서] [${courseName}] [${studentId}/${studentName}] 지각(결석) 보고의 건`,
      recipient: `${profName} 교수님`,
      sender: `${deptName} ${studentId} ${studentName}`,
      body: `교수님, 바쁘신 연구 및 강의 업무 중 메일 읽어주셔서 감사합니다. 금일 출결 관련 사안 3줄 요약 보고드립니다.

1. [인적 사항]: ${deptName} ${studentId} ${studentName}
2. [발생 사유]: ${cleanReason}
3. [보충 계획]: 금일 강의 자료 자율 이수 후, 미진한 파트는 보충 보고서로 요약하여 차주 수업 전까지 제출하겠습니다.

감사합니다.
${studentName} 드림`,
      evidence: `📌 [첨부 서류]: ${evidenceTip}`
    };
  }
}
