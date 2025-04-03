# 🥛 Milk Delivery App

A full-stack web application for ordering and managing milk delivery services. The application allows users to browse different types of milk and place orders and provides admin functionality to manage inventory and track orders.

## 🚀 Features

### Customer Features
- **Browse Milk Products**: View various types of milk with details like price per liter and available quantity
- **Order Management**: Add milk to the cart and place orders
- **Order Review**: Review orders before final placement

### Admin Features
- **Inventory Management**: Add, update, and remove milk products
- **Price Management**: Modify pricing for different milk types
- **Order Tracking**: View all customer orders with detailed information
- **Admin Authorization feature
- **Advanced Filtering**: Filter orders by:
  - Status (Confirmed, Pending, Delivered, Canceled)
  - Date Range
  - Keyword search

## 💻 Tech Stack

### Frontend
- **React** with **Vite** for enhanced development experience
- Chart.js for better visualisation
- **Tailwind CSS** for responsive and modern UI design
- **React Router** for navigation
- **Axios** for API communication

### Backend
- **Spring Boot** for robust API development
- **Spring Security** for authentication and authorization
- **Spring Data JPA** for database operations

### Database
- **PostgreSQL** for reliable data storage

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v16+)
- Java (v11+)
- PostgreSQL (v13+)

### Frontend Setup
```bash
# Clone the repository
git clone https://github.com/RachitaRani/Milk-Delivery-web-app-using-React-Vite.git
cd frontend-milkDelivery

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Backend Setup
```bash
# Navigate to the backend directory
cd ../backend-milkDelivery

# Build the application
./mvnw clean install

# Run the application
./mvnw spring-boot:run
```

### Environment Configuration
Create a `.env` file in the frontend directory:
```
VITE_API_URL=http://localhost:8080/api
```

Configure `application.properties` in the backend:
```
spring.datasource.url=jdbc:postgresql://localhost:5432/milk_delivery
spring.datasource.username=postgres
spring.datasource.password=yourpassword
```

## 📋 API Endpoints

### User Endpoints
- `GET /api/inventory` - Get all milk products
- `POST /api/orders` - Place a new order
- `GET /api/orders/:id` - Get order details

### Admin Endpoints
- `POST /api/inventory` - Add new milk product
- `PUT /api/inventory/:id` - Update milk product
- `DELETE /api/inventory/:id` - Remove milk product
- `GET /api/orders/viewallorders` - Get all orders with optional filters
- `PUT /api/orders/updateOrderStatus/:id` - Update status of orders(Pending,Confirmed,Delivered,Cancelled)

## 📷 Screenshots

### Home Page
![Home Page](/Assets/HomePage.png)

### Admin Login
![Admin Inventory](/Assets/AdminLogin.png)

### Admin Dashboard
![Admin Inventory](/Assets/AdminDashboard.png)

### Admin Order Management
![Admin Orders](/Assets/AdminOrdersManagement.png)

## 🔮 Future Scope

- **Subscription Model**: Allow users to subscribe for daily/weekly milk delivery
- **Payment Integration**: Add support for online payments
- **Delivery Tracking**: Real-time tracking of milk delivery
- **Loyalty Program**: Reward system for regular customers
- **Mobile App**: Native mobile applications for Android and iOS
- **Analytics Dashboard**: For admins to track sales and customer behavior

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Contact
For any questions or suggestions, please contact [rachitaraj113@gmail.com](mailto:your-rachitaraj113@gmail.com)
