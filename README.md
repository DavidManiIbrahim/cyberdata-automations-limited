# CyberData Automations Learning Management System

## Overview

This is a comprehensive Learning Management System (LMS) built with modern web technologies. The platform offers both student and administrative functionalities, providing a robust environment for online learning and course management.

## Features

### Student Features
- **User Authentication**: Secure login and user management system
- **Dashboard**: Personalized dashboard showing enrolled courses and progress
- **Course Access**: Browse and access available courses
- **Profile Management**: Update and manage personal profile information
- **Certificates**: View and download earned certificates
- **Course Enrollment**: Easy enrollment process for new courses

### Administrative Features
- **Admin Dashboard**: Comprehensive overview of system statistics including:
  - Total user count
  - Course enrollment statistics
  - Submission tracking
  - New user registrations
  - Pending certificates
- **User Management**: Manage student accounts and access levels
- **Certificate Management**: Issue and manage student certificates
- **Analytics**: Track platform usage and student progress
- **Course Management**: Add, edit, and manage course content

## Technology Stack

This project is built with modern technologies for optimal performance and scalability:

There are several ways of editing your application.


**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

- **Frontend**:
  - React (with TypeScript)
  - Vite (Build tool)
  - Tailwind CSS (Styling)
  - shadcn/ui (UI Components)
  - Tanstack Query (Data fetching)
  - React Router (Navigation)
- **Backend**:
  - Supabase (Backend as a Service)
  - PostgreSQL (Database)
- **Authentication**:
  - Supabase Auth

## Getting Started

### Prerequisites
- Node.js 18+ & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- Git for version control
- Supabase account (for backend services)

### Installation

1. **Clone the repository**:
```sh
git clone https://github.com/DavidManiIbrahim/cyberdata-automations-limited.git
cd cyberdata-automations-limited
```

2. **Install dependencies**:
```sh
npm install
```

3. **Set up environment variables**:
Create a `.env` file in the root directory with the following variables:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

4. **Supabase Setup**:
   - Create a new project in Supabase
   - Run the migration scripts located in `supabase/migrations/` to set up your database schema
   - Enable authentication in your Supabase project settings
   - Configure email authentication provider
   - Copy the project URL and publishable key from your Supabase project settings to your `.env` file

5. **Development Server**:
```sh
# Start the development server
npm run dev

# Run linting
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

The development server will be available at `http://localhost:5173`

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run build:dev` - Create development build
- `npm run lint` - Run ESLint for code quality
- `npm run preview` - Preview production build locally

### Environment Setup Notes
- Ensure all environment variables are properly set before starting the application
- The Supabase project must have the correct database schema and tables
- Authentication must be properly configured in Supabase
- For local development, make sure ports 5173 (Vite) are available

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
