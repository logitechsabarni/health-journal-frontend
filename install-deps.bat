@echo off

REM Install chart dependencies
npm install react-chartjs-2 chart.js

REM Stage changes
git add package.json package-lock.json

REM Commit
git commit -m "Add chart dependencies for frontend"

REM Push to GitHub (main branch)
git push origin main
