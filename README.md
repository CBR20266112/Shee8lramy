# 🐑 Shee8lramy (쉽알라미)

> **"F학점 위기 탈출! 대학생 출결 방어 & 학사 관리 에이전트"**

[![GitHub Pages Deployment](https://img.shields.io/badge/GitHub%20Pages-Live%20Demo-brightgreen?style=for-the-badge&logo=github)](https://cbr20266112.github.io/Shee8lramy/)
[![Repository](https://img.shields.io/badge/GitHub-Repository-blue?style=for-the-badge&logo=github)](https://github.com/CBR20266112/Shee8lramy)

---

## 🌐 실시간 웹앱 서비스 배포 링크

👉 **[Shee8lramy 데모 바로가기 (https://cbr20266112.github.io/Shee8lramy/)](https://cbr20266112.github.io/Shee8lramy/)**

---

## 🔥 핵심 주요 기능

### 1. 🚨 Web Audio API 기반 괴악한 기상 알람 센터 (`/pages/wake.html`)
- 외부 오디오 파일 없이 `sound.js`에서 오실레이터와 노이즈 필터로 실시간 오디오 합성 재생:
  - 🚨 **비상 공습 사이렌**: 300Hz ~ 1200Hz 주파수 스윕 + 고출력 펄스 변조
  - 🪚 **칠판 긁는 소리 & 비명**: 3.5kHz ~ 6kHz 고주파 밴드패스 필터링
  - 🐔 **시끄러운 미친 수닭**: 하모닉 오실레이터 스윕 + 비브라토
  - 📢 **교관 긴급 점호 비상벨**: 240BPM 880Hz 고출력 사각파 타격
- **강제 기상 3대 해제 미션**:
  1) `전공 상식 퀴즈`: 랜덤 학사/전공 문제 정답 입력
  2) `타자 타이핑`: "교수님 지각 죄송합니다" 100% 정타 입력
  3) `광란의 화면 연타`: 15초 내 30회 연타 완료 시 알람 해제

### 2. 📅 카카오톡 스타일 자연어 캘린더 파서 (`/pages/calendar.html`)
- *"내일 오후 2시 공학관 302호 데이터베이스 과제 제출"* 등 공지/과제 줄글 입력 시 정규식 NLP 파서 작동
- 날짜, 시간, 장소, 과제명 자동 파싱 및 스케줄 카드 즉시 생성
- 과제 D-Day 및 주간 출결 카운트다운 연동

### 3. 👥 학점 방어 친구 공동체 (`/pages/friends.html`)
- **실시간 기상/출결 현황판**: `생존(기상완료)`, `위험(알람중)`, `전사(지각확정)` 3가지 실시간 상태 및 ⚡ 모닝 꿀밤(찌르기) 기능
- **시간표 오버레이**: 친구와 겹치는 공강 시간 자동 탐색 및 공강 메이트 매칭

### 4. 🐑 학점/출결 연동 다마고치 마스코트 '쉽라미' (`index.html`)
- 기상 미션 및 출석 달성도에 따라 성장 및 포즈 변화하는 대학생 전용 학점 방어 다마고치 마스코트 **'쉽라미'**

---

## 🌿 브랜치 구성 (Branch Strategy)

- **`main`**: 심사위원 평가 및 정식 서비스용 배포 브랜치 (GitHub Pages)
- **`dev`**: 신규 기능 개발 및 테스트 작업 브랜치

---

## 💻 로컬 개발 및 데모 실행

1. 저장소 클론:
   ```bash
   git clone https://github.com/CBR20266112/Shee8lramy.git
   cd Shee8lramy
   ```
2. 로컬 실행:
   - **Windows**: `serve-demo.bat` 실행
   - **Linux / macOS**: `chmod +x serve-demo.sh && ./serve-demo.sh`
3. 브라우저 접속: `http://localhost:8000`
