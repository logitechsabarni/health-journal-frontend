@echo off
cd client

echo Installing dependencies from package.json...
npm install

echo Adding updated files to Git...
git add package.json package-lock.json

echo Committing the changes...
git commit -m "Update package.json with full dependency list"

echo Pushing to GitHub...
git push origin main

echo ✅ Done! Now check your Vercel deployment.
pause
