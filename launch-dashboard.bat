@echo off
REM Launches the Adaptive Adventures dashboard on localhost:8888
REM Serves the adaptive_adventures folder and opens the dashboard in your default browser.

setlocal
set "PORT=8888"
set "ROOT=%~dp0"

REM Strip trailing backslash from ROOT for cleaner display
if "%ROOT:~-1%"=="\" set "ROOT=%ROOT:~0,-1%"

echo.
echo ============================================================
echo  Adaptive Adventures Dashboard
echo ============================================================
echo  Serving: %ROOT%
echo  URL:     http://localhost:%PORT%/dashboard.html
echo  Ctrl+C in this window to stop the server.
echo ============================================================
echo.

REM Open the dashboard in the default browser (slight delay to let server start)
start "" /min cmd /c "timeout /t 2 /nobreak >nul && start """" http://localhost:%PORT%/dashboard.html"

REM Start the HTTP server in this window (blocks until Ctrl+C)
cd /d "%ROOT%"
python -m http.server %PORT%

endlocal
