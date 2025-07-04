@echo off
echo Navigating to client folder...
cd client

echo Installing required dependencies: react-chartjs-2, chart.js, and react-scripts ...
npm install react-chartjs-2 chart.js react-scripts

if exist package-lock.json (
    echo ✅ package-lock.json has been generated successfully.
) else (
    echo ⚠️  package-lock.json was not created!
)

echo Going back to root folder...
cd ..

echo Adding all changes to git...
git add .

echo Committing the changes...
git commit -m "Install chart.js, react-chartjs-2, and react-scripts dependencies"

echo Pushing to GitHub...
git push origin main

echo ✅ Done! Now check your Vercel deployment.
pause
