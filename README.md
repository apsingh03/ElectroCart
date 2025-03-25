## Electrocart

Electrocart is a full-featured multivendor e-commerce platform built using the MERN stack for the web. It provides a seamless shopping experience with advanced admin control and user-facing features.

## Features

### Admin Control Features

- **Menu, Submenu, Banner Carousel, and Testimonial Management**: Full control from the Admin Panel over creating and managing dynamic content with CRUD operations.
- **Product Filters**: Configure product filters by category, color, and size with dynamic CRUD operations.
- **Product Specifications**:
  - Associate each product with multiple color options & fabric types.
  - Products can have individual size options with specific quantities, MRP, and discount percentages.
  - Images are uploaded via **AWS S3**.
- **Debounced Product Search**: Efficiently search through the entire product catalog.

### User-Facing Features

- **Real-Time Order Tracking**: Uses **Socket.io** to update order status in real-time.
- **Wishlist & Cart**: Fully functional wishlist and shopping cart for a seamless shopping experience.
- **Payment Gateway**: Secure payment processing using **Razorpay**.
- **User Dashboard**: A personalized dashboard for users to manage orders, wishlists, and account details.


## Performance Optimization

- **GTMetrix Score**: Achieved an **A grade** with a **95% performance score**.
- **AWS CloudFront Integration**: Configured **CloudFront** for enhanced performance through edge caching and optimized content delivery.

## Tech Stack

HTML, CSS, JavaScript, ReactJS, Redux Toolkit Node.js, Express.js, Mysql, AWS S3, Razorpay Socket.io, MERN Stack

## Project Structure

```
Electrocart/
│── frontend/    # ReactJS frontend
│── backend/     # ExpressJS backend
│── README.md
│── package.json
│── .gitignore
```


## Screenshots

(Add screenshots here. Replace the dummy images with actual screenshots.)

| Feature         | Screenshot |
| --------------- | ---------- |
| Homepage        |            |
| Admin Panel     |            |
| Product Listing |            |
| Order Tracking  |            |

## Author

**[Ajay Pratap Singh]**\
MERN Stack Developer\
Portfolio: [ajaypratapsingh.com](http://ajaypratapsingh.com/)\
GitHub: [Your GitHub](https://github.com/apsingh03)\
LinkedIn: [Your LinkedIn](https://www.linkedin.com/in/apsingh03/)

## Installation

### Backend Setup

```sh
# Navigate to the backend folder
cd backend

# Install dependencies
npm install

# Start the backend server
npm start
```

### Frontend Setup

```sh
# Navigate to the frontend folder
cd ../frontend

# Install dependencies
npm install

# Start the frontend development server
npm start
```

## Contributing

Contributions are welcome! Feel free to fork this repository and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

