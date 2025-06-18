# Rehearsal Scheduler

A web application that helps bands schedule rehearsals, track attendance, and optimize practice time.

## Features

- **User Authentication and Management**
  - Create accounts and join band workspaces
  - Role-based permissions (admin, member)
  
- **Rehearsal Creation and Management**
  - Create rehearsal events with location, date, time
  - View rehearsals in an interactive calendar
  - Set up recurring rehearsals (weekly, bi-weekly, monthly)
  
- **Availability Polling and Optimization**
  - Poll members for their availability
  - Mark available times with ease
  - Get smart suggestions for optimal rehearsal times
  
- **Attendance Tracking**
  - Track who attended each rehearsal
  - Easy one-click RSVP system
  - View attendance patterns over time
  
- **Rehearsal Planning**
  - Create agendas for each rehearsal
  - Add notes during or after rehearsals
  - Attach files (sheet music, MP3s) to rehearsal events
  
- **Notifications and Reminders**
  - Automatic reminders about upcoming rehearsals
  - Send announcements to all members
  - Get notified of schedule changes
  
- **Calendar Integration**
  - Sync rehearsals with personal calendars (Google, Apple, Outlook)
  - View conflicts with other events in members' calendars
  
- **Mobile Responsive Design**
  - Access all features on any device

## Technology Stack

### Frontend
- React.js with Next.js
- Material-UI
- React Context API and hooks (with Redux for complex state)
- React Big Calendar for scheduling view
- Formik with Yup for form validation

### Backend
- Node.js
- Express.js
- RESTful API with GraphQL option
- JWT authentication with OAuth integration

### Database
- MongoDB
- Redis for caching

### Cloud Services
- Vercel (frontend)
- Heroku or AWS (backend)
- AWS S3 (file storage)
- SendGrid (email notifications)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB
- Redis (optional for production)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/dxaginfo/rehearsal-scheduler-2025.git
   cd rehearsal-scheduler-2025
   ```

2. Install frontend dependencies
   ```bash
   cd frontend
   npm install
   ```

3. Install backend dependencies
   ```bash
   cd ../backend
   npm install
   ```

4. Set up environment variables
   ```bash
   # Create .env files in both frontend and backend directories
   # Example for backend/.env:
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/rehearsal-scheduler
   JWT_SECRET=your_jwt_secret
   # Add other necessary variables (AWS, SendGrid, etc.)
   ```

5. Start the development servers
   ```bash
   # In backend directory
   npm run dev
   
   # In frontend directory (in a new terminal)
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:3000`

### Setting Up MongoDB

1. Install MongoDB Community Edition from the [official website](https://www.mongodb.com/try/download/community)
2. Start the MongoDB service
3. Create a new database named `rehearsal-scheduler`

## Deployment

### Frontend (Vercel)

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Configure the build settings
4. Deploy

### Backend (Heroku)

1. Create a new Heroku app
2. Connect your GitHub repository
3. Set the necessary environment variables
4. Deploy the backend directory

## Project Structure

```
rehearsal-scheduler/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── utils/
│   │   └── App.js
│   ├── package.json
│   └── README.md
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── server.js
│   ├── package.json
│   └── README.md
└── README.md
```

## API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/auth/me` - Get current user info

### Band Endpoints

- `POST /api/bands` - Create a new band
- `GET /api/bands` - Get all bands for current user
- `GET /api/bands/:id` - Get specific band details
- `PUT /api/bands/:id` - Update band details
- `POST /api/bands/:id/members` - Add member to band

### Rehearsal Endpoints

- `POST /api/rehearsals` - Create a new rehearsal
- `GET /api/rehearsals` - Get all rehearsals (with filters)
- `GET /api/rehearsals/:id` - Get specific rehearsal details
- `PUT /api/rehearsals/:id` - Update rehearsal details
- `DELETE /api/rehearsals/:id` - Delete a rehearsal

### Availability Endpoints

- `POST /api/availability` - Submit availability
- `GET /api/availability/poll/:id` - Get all responses for a poll
- `POST /api/availability/optimize` - Get optimal rehearsal times

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Project Link: [https://github.com/dxaginfo/rehearsal-scheduler-2025](https://github.com/dxaginfo/rehearsal-scheduler-2025)