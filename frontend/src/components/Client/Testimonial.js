import React, { useEffect, useState } from "react";

const Testimonial = ({ testimonialRedux }) => {
  const [currentIdx, setcurrentIdx] = useState(0);

  useEffect(() => {
    let interval;
    if (testimonialRedux && testimonialRedux) {
      testimonialRedux &&
        testimonialRedux.forEach((parent) => {
          const testimonials = parent.testimonialTestimonialDetails;

          if (parent.animation) {
            const testimonialsLength = testimonials.length;

            interval = setInterval(() => {
              setcurrentIdx((prev) => (prev + 1) % testimonialsLength);
            }, parent?.timer);
          }
        });
    }

    return () => clearInterval(interval);
  }, [testimonialRedux]);

  return (function () {
    try {
      {
        return (
          testimonialRedux &&
          testimonialRedux.map((parent, parentIdx) => {
            const testimonials =
              parent.testimonialTestimonialDetails &&
              parent.testimonialTestimonialDetails;

            return (
              <div className="testimonial__wrapper" key={parentIdx}>
                <div className="row">
                  <div className="col-12 col-md-7  order-2  order-md-1">
                    <div className="testimonial__wrapper__card">
                      <div className="testimonial__wrapper__card__left">
                        <div className="testimonial__wrapper__card__left__wrapper">
                          <div>
                            {" "}
                            <h6 className="testimonial__wrapper__card__left__wrapper__title">
                              Customer Stories
                            </h6>
                          </div>

                          <div>
                            <p className="testimonial__wrapper__card__left__wrapper__customerMsg">
                              {testimonials[currentIdx]?.customerMsg}
                            </p>
                          </div>

                          <div className="testimonial__wrapper__card__left__wrapper__customerName">
                            <p> {testimonials[currentIdx]?.customerName} </p>
                          </div>

                          <div className="testimonial__wrapper__card__left__wrapper__loader">
                            {testimonials &&
                              testimonials.map((_, idx) => {
                                return (
                                  <div
                                    key={idx}
                                    className={`testimonial__wrapper__card__left__wrapper__loader__card ${
                                      idx === currentIdx ? "active" : null
                                    } ${idx < currentIdx ? "finished" : ""}`}
                                  >
                                    <div
                                      style={{
                                        transitionDuration: `${
                                          parent?.timer / 1000
                                        }s`,
                                      }}
                                      className="loader-bar"
                                    ></div>
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-md-5  order-1  order-md-2">
                    <div className="testimonial__wrapper__card">
                      <div className="testimonial__wrapper__card__right">
                        <img
                          src={`${testimonials[currentIdx]?.imageSrc}`}
                          alt={`${testimonials[currentIdx]?.imageAlt}`}
                          width={`${parent?.width}`}
                          height={`${parent?.height}`}
                          style={{ objectFit: `${parent?.objectFit}` }}
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        );
      }
    } catch (error) {
      console.log("Error - ", error.message);
    }
  })();
};

export default Testimonial;
