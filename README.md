# EasyAttend – Attendance Management System

## Technologies
- React.js – easyattend-admin
- Flutter – easyattend_user
- Node.js + Express – Backend API ( easyattend-backend)
- MySQL – Database (easyattend)

## How to Run

### Backend
1. Navigate to `easyattend-backend`
2. Run `node server.js`


### MySQL
1. Create database `easyattend`
2. Run the provided SQL file

### Admin
1. Navigate to `easyattend-admin`
2. Run `npm install`
3. Run `npm start`

### User
1. Open Flutter project in Android Studio
2. Run on emulator or real device
3. Update the API URL in api_service.dart and login_screen.dart to point to backend IP (make sure device and backend are on the same network).
ex: const String baseUrl = 'http://192.168.x.x:5000/api';
4. flutter run

## Admin Credentials
- Email: a@gmail.com
- Password: a123
