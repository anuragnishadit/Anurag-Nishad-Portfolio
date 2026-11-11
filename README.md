# Anurag Nishad - MERN Portfolio

React (Vite) + Express + MongoDB. Home page shows Anurag's photo; a Resume section has Download and Preview.

## Setup (Windows CMD)
1. Extract the ZIP, open the folder in VS Code (File > Open Folder).
2. Install MongoDB Community (or use a free MongoDB Atlas URL) and make sure it is running.
3. Backend:
   ```
   cd backend
   npm install
   copy .env.example .env
   ```
   Edit `.env`: set MONGO_URI, JWT_SECRET (long random text), ADMIN_EMAIL, ADMIN_PASSWORD.
   ```
   npm run seed
   npm run dev
   ```
4. Frontend (new CMD window):
   ```
   cd frontend
   npm install
   npm run dev
   ```
   Open http://localhost:5173
5. Admin: open http://localhost:5173/admin and log in with ADMIN_EMAIL / ADMIN_PASSWORD (account is created automatically on first backend start; password is stored hashed).

## Change content
- Photo: replace `frontend/public/images/profile.jpeg`
- Resume: replace `frontend/public/resume/Anurag_Nishad_Resume.pdf`
- Text, LinkedIn and GitHub URLs: edit `frontend/src/data.js` (`linkedin`, `github` are empty on purpose)
- Project Live/GitHub links: add them in the Admin dashboard (or in `data.js` defaults)

## Deploy
- Backend (Render/Railway): root `backend`, start `npm start`, set the .env values and CLIENT_URL = your frontend URL. Use MongoDB Atlas for MONGO_URI.
- Frontend (Vercel/Netlify): root `frontend`, build `npm run build`, output `dist`, env `VITE_API_URL` = your backend URL.
