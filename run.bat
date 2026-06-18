@echo off
title N.I. Engineering Challan Launcher
echo ==========================================================
echo    Starting N.I. Engineering Challan Editor...
echo ==========================================================
echo.

:: Check if Node.js is installed in the system PATH
where node >nul 2>nul
if %errorlevel% equ 0 (
  echo [Info] Node.js is installed. Launching local web server...
  echo Application URL: http://localhost:8080/
  echo.
  start "" "http://localhost:8080/"
  echo.
  echo [Info] Running server...
  echo (Keep this window open to keep the server running. Press Ctrl+C to close.)
  echo.
  node server.js
) else (
  echo [Warning] Node.js was not found on this computer.
  echo [Info] Opening Challan Editor directly in your web browser...
  echo.
  start "" "index.html"
)
