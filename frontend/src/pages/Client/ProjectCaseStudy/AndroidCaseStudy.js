import React from "react";

const AndroidCaseStudy = () => {
  return (
    <div className="case-study-container">
      {/* Key Features Section */}
      <section className="section">
        <h5 className="mb-3 text-center">A. Key Features</h5>

        {/* Route Guarding & Drawer Screen */}

        <div className="snippet">
          <span> Route Guarding & Drawer Screen </span>
        </div>
        <p>
          Users are restricted from accessing specific screens without
          authentication. The app employs route guards to ensure that only
          authenticated users can access certain parts of the app.
        </p>

        {/* Offline State Management with Redux Persist */}

        <div className="snippet">
          <span>Offline State Management with Redux Persist</span>
        </div>
        <p>
          By integrating Redux Persist, the app efficiently caches and syncs
          data with the API when the internet reconnects. This ensures users
          have a smooth experience even during network transitions.
        </p>
        <video controls autoPlay={true} loop={true} width={"100%"} height={400}>
          <source
            // src={require("./assets/debounced-search-demo.mp4")}
            src="/screenshots/offlineStateManagement.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        {/* Dynamic Carousels and Product Filters */}

        <div className="snippet">
          <span>Dynamic Carousels and Product Filters</span>
        </div>
        <p>
          The carousel dynamically adjusts based on the screen size, Filters are
          applied in real-time to allow users to find products quickly.
        </p>

        <video controls width={"100%"} height={400} autoPlay={true} loop={true}>
          <source
            // src={require("./assets/debounced-search-demo.mp4")}
            src="/screenshots/productFilteration.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        {/* Debounced Search */}
        <div className="snippet">
          <span>Debounced Search</span>
        </div>
        <p>
          Debounced search improves performance by delaying the API calls while
          the user is typing, ensuring a smooth and efficient search experience.
        </p>

        {/* Cart & Razorpay Integration */}

        <div className="snippet">
          <span> Cart & Razorpay Integration </span>
        </div>
        <p>
          The app features full cart functionality, allowing users to add
          products, view their cart, and securely pay via Razorpay for a smooth
          checkout experience.
        </p>

        {/* Skeleton UI */}

        <div className="snippet">
          <span>Skeleton UI</span>
        </div>
        <p>
          Skeleton UI was implemented to enhance the user experience by
          displaying loading placeholders while data is being fetched.
        </p>
        <video controls width={"100%"} height={400} autoPlay={true} loop={true}>
          <source
            // src={require("./assets/debounced-search-demo.mp4")}
            src="/screenshots/skeltonUi.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </section>

      {/* Development Highlights Section */}
      <section className="section">
        <h6 className="mb-3 text-center">B. Development Highlights</h6>
        <p>
          The app leverages libraries like Redux for state management, Formik
          for form handling, and Axios for API requests. Different states like
          loading, empty, and error were handled effectively to provide clear
          feedback to the user.
        </p>
        <div className="state-handling-examples"></div>
      </section>

      {/* Performance Optimization Section */}
      <section className="section">
        <h6 className="mb-3 text-center">C. Performance Optimization</h6>
        <p>
          Performance was a key focus, with optimizations like lazy loading,
          image optimization, and API caching to ensure a smooth and fast user
          experience across all devices.
        </p>
      </section>

      {/* Conclusion Section */}
      <section className="section">
        <h6 className="mb-3 text-center">5. Conclusion</h6>
        <h6>Achievements</h6>
        <p>
          The app scales efficiently, provides real-time features, and maintains
          cross-platform consistency between iOS and Android.
        </p>
        <h6>Future Improvements</h6>
        <p>
          Future plans include adding new payment gateways and improving user
          features, like advanced product recommendations and real-time delivery
          tracking.
        </p>
      </section>

      {/* Call to Action Section */}
      <section className="section">
        <h6 className="mb-3 text-center">6. Call to Action</h6>
        <p>
          Explore the project on GitHub or contact me for a detailed discussion.
          You can also download the Android APK for testing the app in
          real-time.
        </p>
        <div className="cta-buttons">
          <a
            href="https://github.com/your-username"
            target="_blank"
            rel="noopener noreferrer"
            className="github-link"
          >
            GitHub Repository
          </a>

          <a
            href="https://example.com/apk-download"
            target="_blank"
            rel="noopener noreferrer"
            className="apk-link"
          >
            Download APK
          </a>
        </div>
      </section>
    </div>
  );
};

export default AndroidCaseStudy;
