cd frontend
call npm run build
cd ../backend
rmdir /s /q build
move ../frontend/build .
call node server.js