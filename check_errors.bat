@echo off
echo Checking for errors...
echo.
echo Running build process...
call npm run build
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Build failed! Please check the errors above.
    exit /b %errorlevel%
)
echo.
echo [SUCCESS] No errors found!
pause
