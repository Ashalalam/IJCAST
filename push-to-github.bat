@echo off
echo ========================================
echo Pushing IJCAST to GitHub
echo ========================================
echo.

echo Current changes committed:
echo - Cashfree payment integration
echo - Policy pages (Terms, Refunds)
echo - Payment form and success/failure pages
echo - Supabase Edge Functions
echo - Complete documentation
echo.

echo ========================================
echo AUTHENTICATION REQUIRED
echo ========================================
echo.
echo You need to authenticate with GitHub.
echo.
echo Option 1: Use GitHub CLI (gh)
echo   1. Install GitHub CLI: https://cli.github.com/
echo   2. Run: gh auth login
echo   3. Run this script again
echo.
echo Option 2: Use Personal Access Token (PAT)
echo   1. Go to: https://github.com/settings/tokens
echo   2. Generate new token (classic)
echo   3. Select scopes: repo (full control)
echo   4. Copy the token
echo   5. Run: git push https://YOUR_TOKEN@github.com/Ashalalam/IJCAST.git main
echo.
echo Option 3: Use GitHub Desktop
echo   1. Install GitHub Desktop
echo   2. Clone the repository
echo   3. Push changes from GitHub Desktop
echo.

pause

echo.
echo Attempting to push with GitHub CLI...
gh auth status
if %ERRORLEVEL% EQU 0 (
    echo GitHub CLI authenticated!
    gh repo view Ashalalam/IJCAST
    git push origin main
) else (
    echo.
    echo GitHub CLI not authenticated or not installed.
    echo.
    echo Please choose one of the authentication methods above.
    echo.
    echo Quick setup with GitHub CLI:
    echo   winget install GitHub.cli
    echo   gh auth login
    echo.
)

pause
