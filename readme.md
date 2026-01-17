
# Steps to Run the Project

This project has a backend (Python/Flask) and a frontend (React/Vite). Follow these steps to run both:

## 1. Backend Setup

1. Open a terminal and navigate to the `backend` directory:
	```powershell
	cd backend
	```
2. (Optional but recommended) Create and activate a virtual environment:
	```powershell
	python -m venv .venv
	.\.venv\Scripts\Activate.ps1
	```
3. Install the required Python packages:
	```powershell
	pip install -r requirements.txt
	```
4. Run the backend server:
	```powershell
	python app.py
	```

## 2. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
	```powershell
	cd frontend\chatbotui
	```
2. Install the required npm packages:
	```powershell
	npm install
	```
3. Start the frontend development server:
	```powershell
	npm run dev
	```

## 3. Access the Application

- The frontend will usually be available at [http://localhost:5173](http://localhost:5173) (or as shown in your terminal).
- The backend will run on the port specified in `backend/app.py` (commonly 5000 or 8000).

---
Make sure both servers are running for the chatbot to work correctly.
