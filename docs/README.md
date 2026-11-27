# 문서 인덱스

현재 프로젝트 개요와 **마스코트 성격/브랜드 톤**은 저장소의 [`README.md`](../README.md)를 기준으로 합니다. README는 체크인된 소스를 바탕으로 목적, 구조, 데이터 저장, 로컬 실행 방법, 확인되지 않은 범위를 정리합니다. 캐릭터 톤의 구체적인 코드 근거는 `js/mascot-ai.js`의 `SCHEDULE_PROVOCATIONS`와 `handleMascotNLPInput`, `index.html`의 `QUOTES_POOL`입니다.

아래 보고서·감사·제안서는 당시 범위의 기록으로 보존합니다. 별도 검수 없이 현행 구현이나 배포를 보증하는 문서로 사용하지 마세요.

## 과거 검수 및 보고서

| 문서 | 범위와 상태 |
| --- | --- |
| [`deployment-test-report.md`](deployment-test-report.md) | 2026-07-08에 기록한 v1.92.0 배포/브라우저 검수와 v1.92.1 로컬 수정 기록. 현행 배포 검수 결과가 아닙니다. |
| [`../SHEE8LRAMY_DEV_REPORT.md`](../SHEE8LRAMY_DEV_REPORT.md) | 날짜·버전이 기재되지 않은 구현 요약. 과거 보고서로 취급하고 코드를 기준으로 사실 여부를 확인하세요. |
| [`../sleepysheep_integrated_review.md`](../sleepysheep_integrated_review.md), [`../sleepysheep_integrated_review.txt`](../sleepysheep_integrated_review.txt) | 2026-07-09 점검의 Markdown/TXT 사본. 둘 다 과거 스냅샷이며 Markdown을 대표 사본으로 사용합니다. |
| [`../asmr-tingle-final-report.md`](../asmr-tingle-final-report.md), [`asmr-tingle-final-report.md`](asmr-tingle-final-report.md), `../asmr-tingle-final-report.html`, `../asmr-tingle-final-report.pdf` | 2026-07-10 작성, v1.96.1 ASMR 기능 보고서의 Markdown·HTML·PDF 사본. `docs/`의 Markdown을 대표 문서로 삼으며, 어느 사본도 현재 런타임 검증을 뜻하지 않습니다. |

## 감사와 제안

| 문서 | 범위와 상태 |
| --- | --- |
| [`workshop-shop-audit-report.md`](workshop-shop-audit-report.md) | 2026-07-16 감사 기록. 권고사항은 구현 완료를 뜻하지 않습니다. |
| [`asmr-audit-report.md`](asmr-audit-report.md) | 2026-07-16 감사 기록. 권고사항은 구현 완료를 뜻하지 않습니다. |
| [`v1.92.7-quality-audit.md`](v1.92.7-quality-audit.md) | v1.92.7을 대상으로 한 2026-07-16 계획 문서. 계획한 작업이 출시됐다는 증거가 아닙니다. |
| [`asmr-catalog-redesign-proposal.md`](asmr-catalog-redesign-proposal.md) | 2026-07-16 제안서. 제안한 카탈로그가 현재 구현됐다는 뜻이 아닙니다. |
| [`asmr-redesign-plan.md`](asmr-redesign-plan.md) | 2026-07-16 계획 문서. |

## 기타 안내

[`../UPDATE_GUIDE.md`](../UPDATE_GUIDE.md)는 과거의 일반적인 GitHub Pages 업데이트 안내입니다. 게시 명령을 사용하기 전에 현재 브랜치와 Pages 설정을 확인하세요. 이 체크아웃의 실제 배포 상태는 검증하지 않았습니다.

## 버전 표기

현재 소스 버전은 `VERSION`과 `js/constants.js`에 기록된 `1.96.1`입니다. 과거 문서의 v1.92.x, v1.96.0, v1.96.1 표기는 각각 문서가 다루는 당시 범위이며 현재 배포 버전이나 배포 여부를 증명하지 않습니다.
