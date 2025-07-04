@echo off
echo Navigating to client folder...
cd client

echo Installing required dependencies: react-chartjs-2 and chart.js ...
npm install react-chartjs-2 chart.js react-scripts


echo Going back to root folder...
cd ..

echo Adding all changes to git...
git add .

echo Committing the changes...
git commit -m "Install chart.js and react-chartjs-2 dependencies"

echo Pushing to GitHub...
git push origin main

echo Done! Now try redeploying on Vercel.
pause

