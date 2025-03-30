# 🥛 Milk Delivery App

A full-stack web application for ordering and managing milk delivery services. The application allows users to browse different types of milk, place orders, and provides admin functionality to manage inventory and track orders.

## 🚀 Features

### Customer Features
- **Browse Milk Products**: View various types of milk with details like price per liter and available quantity
- **Order Management**: Add milk to cart and place orders
- **Order Review**: Review orders before final placement
- **User Authentication**: Secure login and registration system

### Admin Features
- **Inventory Management**: Add, update, and remove milk products
- **Price Management**: Modify pricing for different milk types
- **Order Tracking**: View all customer orders with detailed information
- **Advanced Filtering**: Filter orders by:
  - Status (Confirmed, Pending, Delivered, Canceled)
  - Date range
  - Keyword search

## 💻 Tech Stack

### Frontend
- **React** with **Vite** for enhanced development experience
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
# Navigate to backend directory
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

## 📷 Screenshots

### Home Page
![Home Page](https://github.com/RachitaRani/Milk-Delivery-web-app-using-React-Vite/Assets/HomePage.png)

### Order Review
![Order Review](https://github.com/RachitaRani/Milk-Delivery-web-app-using-React-Vite/Assets/AdminInventory.png)

### Admin Inventory Management
![Admin Inventory](https://github.com/RachitaRani/Milk-Delivery-web-app-using-React-Vite/Assets/)

### Admin Order Management
![Admin Orders](https://github.com/yourusername/milk-delivery-app/raw/main/screenshots/admin-orders.png)

## 🔮 Future Scope

- **Subscription Model**: Allow users to subscribe for daily/weekly milk delivery
- **Payment Integration**: Add support for online payments
- **Delivery Tracking**: Real-time tracking of milk delivery
- **Loyalty Program**: Reward system for regular customers
- **Mobile App**: Native mobile applications for Android and iOS
- **Analytics Dashboard**: For admins to track sales and customer behavior

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact
For any questions or suggestions, please contact [your-email@example.com](mailto:your-email@example.com)
