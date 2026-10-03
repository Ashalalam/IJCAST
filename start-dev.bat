@echo off
echo Starting IJCAST Development Servers...
echo.

echo Starting Frontend (React)...
start "IJCAST Frontend" cmd /k "cd /d %~dp0 && npm run dev"

echo Starting Backend API...
start "IJCAST API" cmd /k "cd /d %~dp0api && npm run dev"

echo.
echo Both servers are starting...
echo Frontend: http://localhost:5173
echo Backend API: http://localhost:3001
echo.
pause