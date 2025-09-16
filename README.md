# 🧺 Sumi Fabcare - Laundry Frontend

A modern, responsive web application for laundry and dry cleaning services built with React and Vite. This platform provides a seamless experience for customers to book laundry services and for staff to manage orders efficiently.

## ✨ Features

### 🔐 User Authentication
- **Customer Registration & Login** - Secure authentication for customers
- **Staff Registration & Login** - Separate authentication system for staff members
- **Protected Routes** - Role-based access control for different user types

### 🛒 Customer Features
- **Service Booking** - Easy-to-use booking system for laundry services
- **Service Selection** - Choose from various laundry services (Washing, Dry Cleaning, Ironing)
- **Price Calculator** - Dynamic pricing based on selected services and quantities
- **Booking Preview** - Review booking details before confirmation
- **Order Tracking** - Track order status and history
- **Dashboard** - Personal dashboard to manage bookings and view order history
- **Payment Integration** - Secure payment processing with Razorpay

### 👨‍💼 Staff Features
- **Staff Dashboard** - Comprehensive dashboard for order management
- **Order Management** - View, update, and manage customer orders
- **Order Status Updates** - Update order status (pending, processing, completed)
- **Customer Service** - Access customer information and order details

### 🎨 User Experience
- **Responsive Design** - Mobile-first design that works on all devices
- **Modern UI** - Clean, intuitive interface with TailwindCSS
- **Interactive Components** - Smooth animations and transitions
- **Real-time Updates** - Dynamic content updates using React Context

## 🛠️ Technology Stack

### Frontend
- **React 19** - Modern React with hooks and functional components
- **Vite 6** - Fast build tool and development server
- **React Router DOM 7** - Client-side routing and navigation
- **TailwindCSS 4** - Utility-first CSS framework for styling
- **Axios** - HTTP client for API requests
- **React Icons** - Beautiful icon library

### Development Tools
- **ESLint** - Code linting and formatting
- **FontAwesome** - Additional icon library
- **Vite Plugins** - React plugin for fast refresh

### Deployment
- **Vercel** - Frontend hosting and deployment
- **Environment Variables** - Secure configuration management

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Dipjyoti46/laundryfrontend.git
   cd laundryfrontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Copy the example environment file
   cp .env.example .env
   
   # Update the .env file with your configuration
   VITE_API_URL=your_backend_api_url
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

## 📁 Project Structure

```
laundryfrontend/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images and static files
│   ├── components/        # React components
│   │   ├── auth/         # Authentication components
│   │   ├── Booking/      # Booking-related components
│   │   ├── common/       # Shared components (Navbar, Footer)
│   │   ├── orders/       # Order management components
│   │   ├── pages/        # Main page components
│   │   ├── pricelist/    # Pricing components
│   │   ├── service/      # Service-related components
│   │   └── staff/        # Staff dashboard components
│   ├── contexts/         # React Context providers
│   │   ├── AuthContext.jsx
│   │   ├── LaundryDataContext.jsx
│   │   └── ServicesContext.jsx
│   ├── img/              # Image assets
│   ├── middleware/       # Route protection
│   ├── App.jsx           # Main app component
│   ├── axios.js          # API configuration
│   ├── index.css         # Global styles
│   └── main.jsx          # App entry point
├── .env.example          # Environment variables template
├── .gitignore           # Git ignore rules
├── eslint.config.js     # ESLint configuration
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── tailwind.config.js   # TailwindCSS configuration
├── vercel.json          # Vercel deployment config
└── vite.config.js       # Vite configuration
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file based on `.env.example`:

```env
# API Configuration
VITE_API_URL=https://your-backend-api.com

# Add other environment-specific variables here
```

### API Integration
The application integrates with a backend API for:
- User authentication and authorization
- Service and pricing data
- Order management
- Payment processing

## 🎯 Usage

### For Customers
1. **Sign Up/Login** - Create an account or login to existing account
2. **Browse Services** - View available laundry services and pricing
3. **Book Service** - Select services, quantities, and schedule pickup
4. **Make Payment** - Secure payment processing with Razorpay
5. **Track Orders** - Monitor order status and history in dashboard

### For Staff
1. **Staff Login** - Access staff portal with credentials
2. **View Orders** - See all customer orders in the staff dashboard
3. **Manage Orders** - Update order status and processing information
4. **Customer Service** - Access customer details and order history

## 🚀 Deployment

The application is configured for deployment on Vercel:

1. **Connect to Vercel**
   - Import the repository to Vercel
   - Configure environment variables
   - Deploy automatically on push to main branch

2. **Custom Deployment**
   ```bash
   # Build the project
   npm run build
   
   # Deploy the dist folder to your hosting provider
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style and patterns
- Use meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

## 📝 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## 🔗 API Endpoints

The frontend communicates with the backend API for:
- `/auth/*` - Authentication endpoints
- `/services/*` - Service and pricing data
- `/orders/*` - Order management
- `/payments/*` - Payment processing

## 🎨 UI/UX Features

- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Modern Aesthetics** - Clean, professional design with smooth animations
- **Intuitive Navigation** - Easy-to-use interface with clear call-to-actions
- **Accessibility** - Built with accessibility best practices
- **Performance** - Optimized for fast loading and smooth interactions

## 🐛 Known Issues

- None currently reported

## 📞 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team

## 📄 License

This project is private and proprietary. All rights reserved.

---

**Built with ❤️ by the Sumi Fabcare Team**

*"The warmth of a mother in every wash"* 
