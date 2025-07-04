cd client

echo Installing dependencies...
npm install react-scripts react-chartjs-2 chart.js

echo Adding files to Git...
git add package.json package-lock.json

echo Committing the changes...
git commit -m "Fix: Ensured all required dependencies are installed"

echo Pushing to GitHub...
git push origin main

echo ✅ Done! Now check your Vercel deployment.
pause
