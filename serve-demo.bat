@echo off
chcp 65001 > nul
echo ========================================================
echo   [Shee8lramy 쉽알라미] 로컬 데모 서버 실행 중...
echo ========================================================
echo.
echo 웹 브라우저에서 아래 주소로 접속하거나 Mobile HTTP 서버를 사용하세요:
echo http://localhost:8000
echo.
python -m http.server 8000
pause
