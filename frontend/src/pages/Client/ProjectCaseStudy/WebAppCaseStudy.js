import React from "react";

const WebAppCaseStudy = () => {
  return (
    <div>
      <main className="main-content">
        {/* Admin Features Section */}
        <section className="section">
          <h5 className="mb-4 text-center ">A. Admin Features</h5>

          <div className="snippet">
            <span> Menu & Submenu Management </span>
          </div>

          <p>
            Admins can dynamically create, read, update, and delete menus and
            submenus. This allows flexible content organization and easy
            navigation management for the store.
          </p>
          <ul>
            <li>Dynamic CRUD operations for menus</li>
            <li>Real-time menu updates visible on the user-facing side</li>
          </ul>

          <img
            src="/screenshots/menuManagement.png"
            alt="Menu Management Dashboard Screenshot"
          />

          {/* Product Filters */}
          <div className="snippet">
            <span> Product Filters </span>
          </div>

          <p>
            The admin can dynamically create, read, update, and delete product
            filters based on category, color, and size. created and managed to
            help users easily find products.
          </p>
          <ul>
            <li>Category: Allow users to select specific product categories</li>
            <li>Color: Dynamically filter products based on color</li>
            <li>Size: Filter based on product size</li>
          </ul>

          <img
            src="/screenshots/productFilterWebApp.png"
            alt="Product Filter Page Screenshot"
            height={"auto"}
          />

          {/* Banner Carousel & Testimonials Management */}

          <div className="snippet">
            <span> Banner Carousel & Testimonials Management </span>
          </div>
          <p>
            Admins can customize the Banner carousel and Testimonials by
            adjusting width, height, and animations. This ensures that marketing
            visuals are tailored to different devices and requirements.
          </p>

          <img
            src="/screenshots/bannerManagement.png"
            alt="Banner Carousel Admin Panel Screenshot"
          />

          {/* Product Specifications */}

          <div className="snippet">
            <span> Product Management </span>
          </div>
          <p>1. Dynamic Product Specifications:</p>
          <ul>
            <li>
              Admins can dynamically add multiple sizes for each product, each
              size having its own set of properties.
              <ul>
                <li style={{ listStyleType: "none", marginTop: "10px" }}>
                  For Each Sizes
                </li>
                <li style={{ listStyleType: "circle" }}>
                  <b> Quantity : </b>
                  Admin can set the available quantity of each size.
                </li>
                <li style={{ listStyleType: "circle" }}>
                  <b>MRP : </b>
                  The Maximum Retail Price can be assigned individually.
                </li>
                <li style={{ listStyleType: "circle" }}>
                  <b>Discount : </b> A specific discount percentage can be
                  applied for each size.
                </li>
              </ul>
            </li>
          </ul>
          <p>2. Multiple Colors Selection:</p>
          <ul>
            <li>
              The admin can assign multiple colors to a product, allowing the
              user to select from a wide range of color options.
            </li>
          </ul>

          <p>3. Multiple Fabrics Selection:</p>
          <ul>
            <li>
              The admin can assign multiple fabrics, offering flexibility in
              fabric choices like Cotton, Polyester, Silk, etc.
            </li>
          </ul>
          {/* productManagement */}
          <video
            controls
            width={"100%"}
            height={300}
            autoPlay={true}
            loop={true}
          >
            <source
              // src={require("./assets/debounced-search-demo.mp4")}
              src="/screenshots/productManagementRecording.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>

          {/* Product Image Uploads */}

          <div className="snippet">
            <span>Product Image Uploads</span>
          </div>
          <p>
            Images are uploaded via AWS S3 for scalability and fast access. The
            system is optimized for handling high-resolution product images.
          </p>
        </section>

        {/* User-Facing Features Section */}
        <section className="section">
          <h5 className="mb-4 text-center ">B. User-Facing Features</h5>

          {/* Real-Time Order Tracking */}
          <div className="snippet">
            <span>Real-Time Order Tracking</span>
          </div>

          <p>
            Admin can track their placed orders in real-time using Socket.io
            integration. The order status updates dynamically on the Admin's
            /admin/placedOrders/ dashboard.
          </p>

          <div className="snippet">
            <span>Device-Specific Product Carousel:</span>
          </div>

          <ul>
            <li>
              Responsive mobile mode individual carousel where users can swipe
              cards horizontally using touch gestures.
            </li>
            <li>
              Category wise Product carousel adjusts for different screen sizes:
            </li>

            <ul>
              <li style={{ listStyleType: "circle" }}>
                Desktop: Displays 4 products
              </li>
              <li style={{ listStyleType: "circle" }}>
                Tablet: Displays 3 products
              </li>
              <li style={{ listStyleType: "circle" }}>
                Mobile: Displays 2 products.
              </li>
              <li style={{ listStyleType: "circle" }}>
                Navigation with <b> next/prev buttons </b> for remaining
                products.
              </li>
            </ul>
          </ul>

          <div className="snippet">
            <span>Responsive Designs</span>
          </div>
          <p>
            (Desktop, Tablet, Mobile) to ensure a seamless shopping experience.
          </p>

          {/* Responsive Carousels */}

          <div className="snippet">
            <span>Responsive Carousels</span>
          </div>
          <p>
            The product carousels adjust based on the user's device (Desktop,
            Tablet, Mobile) to ensure a seamless shopping experience.
          </p>

          {/* Wishlist, Cart, and Checkout (with Razorpay) */}
          <div className="snippet">
            <span> Wishlist, Cart, and Checkout (with Razorpay) </span>
          </div>

          <p>
            Users can add products to their wishlist, view their cart, and
            seamlessly checkout using Razorpay for secure payment processing.
          </p>
          <div className="snippet">
            <span> Debounce Search </span>
          </div>

          <p>
            Debounced search improves performance by delaying the API calls
            while the user is typing, ensuring a smooth and efficient search
            experience.
          </p>

          <div className="snippet">
            <span> User Dashboard </span>
          </div>

          <p>
            Personalized dashboard for users to manage their orders, wishlists,
            and account details.
          </p>

          <div className="snippet">
            <span> Wishlist </span>
          </div>

          <p>User can click on Favorite icon & Wishlist Dashboard</p>
        </section>

        {/* Challenges and Solutions Section */}
        <section className="section">
          <h5 className="mb-4 text-center ">
            {" "}
            C. Key Challenges and Solutions
          </h5>

          <div className="snippet">
            {" "}
            <span> Challenge: Real-Time Order Tracking </span>{" "}
          </div>

          <p>
            Solution: Integrated Socket.io for real-time communication between
            the server and client, ensuring seamless order status updates.
          </p>

          <div className="snippet">
            {" "}
            <span>Challenge: Optimizing Product Filters</span>{" "}
          </div>

          <p>
            Solution: Implemented debouncing and lazy loading techniques to
            optimize filter performance, reducing API calls and improving load
            times.
          </p>
        </section>
      </main>
    </div>
  );
};

export default WebAppCaseStudy;
