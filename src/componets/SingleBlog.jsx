import React from "react";
import { Link } from "react-router-dom";
import { blogPostImage1, blogIcon } from "../assets/images";

const SingleBlog = () => {
  return (
    <div>
      <div className="page-header">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-9 order-md-1 order-2">
              {/* Page Heading Start  */}
              <div className="page-header-box">
                <h1 className="text-anime">
                  Unlocking the Secrets to Healthy, Luscious Locks.
                </h1>
                <div className="post-meta wow fadeInUp" data-wow-delay="0.25s">
                  <ul>
                    <li>
                      <Link to="#" style={{ textDecoration: "none" }}>
                        On January 1, 2024
                      </Link>
                    </li>
                    <li>
                      <Link to="#" style={{ textDecoration: "none" }}>
                        By Amanya Richard
                      </Link>
                    </li>
                    <li>
                      <Link to="#" style={{ textDecoration: "none" }}>
                        In Hair Saloon
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              {/* Page Heading End  */}
            </div>

            <div className="col-md-3 order-md-2 order-1">
              {/* Page Header Right Icon Start  */}
              <div
                className="page-header-icon-box wow fadeInUp"
                data-wow-delay="0.5s"
              >
                <div className="page-header-icon">
                  <img src={blogIcon} alt="" />
                </div>
              </div>
              {/* Page Header Right Icon End  */}
            </div>
          </div>
        </div>
      </div>
      {/* Page Header Section End  */}

      {/* Blog Single Start  */}
      <div className="blog-single-page">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {/* Post Featured Image Start  */}
              <div
                className="post-featured-image wow fadeInUp"
                data-wow-delay="0.25s"
              >
                <figure className="hover-anime">
                  <img src={blogPostImage1} alt="" />
                </figure>
              </div>
              {/* Post Featured Image End  */}

              {/* Post Content Start  */}
              <div className="post-content wow fadeInUp" data-wow-delay="0.5s">
                {/* Post Entry Start  */}
                <div className="post-entry">
                  <p>
                It has been a really long time, and it hasn’t been easy without your happy faces after a good day at the salon.
Some of you kept it interesting with attempts at self-grooming, and we loved it.
But we’re back now, ready to pamper you again.
                  </p>

                  <p>
                    Suspendisse interdum risus nisl, vitae pulvinar leo euismod
                    eu. Aenean in aliquam sapien, eget tristique dolor. Praesent
                    id interdum dolor. Duis gravida semper quam, sed lacinia
                    velit. Vivamus placerat eu arcu eget tempus. Quisque cursus
                    purus rutrum tellus accumsan placerat. Donec faucibus nisi
                    id aliquam laoreet. Integer porttitor ac nulla sit amet
                    vulputate.
                  </p>

                  <h2>Finibus non neque ac</h2>

                  <p>
                    Mauris sapien erat, finibus non neque ac, molestie cursus
                    ipsum. Cras turpis elit, interdum vitae quam ac, tempus
                    placerat purus. Quisque eu sem sit amet neque lacinia
                    porttitor. Curabitur viverra fringilla hendrerit. Praesent
                    aliquam erat sit amet massa finibus, sed consectetur arcu
                    laoreet. Suspendisse interdum risus nisl, vitae pulvinar leo
                    euismod eu. Aenean in aliquam sapien, eget tristique dolor.
                    Praesent id interdum dolor. Duis gravida semper quam, sed
                    lacinia velit. Vivamus placerat eu arcu eget tempus.
                  </p>

                  <blockquote>
                    <p>
                      Praesent aliquam erat sit amet massa finibus, sed
                      consectetur arcu laoreet. Suspendisse interdum risus nisl,
                      vitae pulvinar leo euismod eu. Aenean in aliquam sapien,
                      eget tristique dolor. Praesent id interdum dolor. Duis
                      gravida semper quam, sed lacinia velit. Vivamus placerat
                      eu arcu eget tempus. Quisque cursus purus rutrum tellus
                      accumsan placerat.
                    </p>
                  </blockquote>

                  <h2>Tempus placerat Purus</h2>

                  <p>
                    Mauris sapien erat, finibus non neque ac, molestie cursus
                    ipsum. Cras turpis elit, interdum vitae quam ac, tempus
                    placerat purus. Quisque eu sem sit amet neque lacinia
                    porttitor. Curabitur viverra fringilla hendrerit. Praesent
                    aliquam erat sit amet massa finibus, sed consectetur arcu
                    laoreet. Suspendisse interdum risus nisl, vitae pulvinar leo
                    euismod eu. Aenean in aliquam sapien, eget tristique dolor.
                    Praesent id interdum dolor. Duis gravida semper quam, sed
                    lacinia velit. Vivamus placerat eu arcu eget tempus.
                  </p>
                </div>
                {/* Post Entry End  */}

                {/* Post Extra Info Start  */}
                <div className="row">
                  <div className="col-lg-8">
                    {/* Post Tags Start  */}
                    <div className="post-tags">
                      Tags :
                      <Link to="#" style={{ textDecoration: "none" }}>
                        Salon
                      </Link>
                      <Link to="#" style={{ textDecoration: "none" }}>
                        Hair Styling
                      </Link>
                      <Link to="#" style={{ textDecoration: "none" }}>
                        Hair Treatments
                      </Link>
                    </div>
                    {/* Post Tags  */}
                  </div>

                  <div className="col-lg-4">
                    {/* Post Sharing Links Start  */}
                    <div className="post-social-sharing">
                      <ul>
                        <li>
                          <Link to="#" style={{ textDecoration: "none" }}>
                            <i className="fab fa-facebook-f"></i>
                          </Link>
                        </li>
                        <li>
                          <Link to="#" style={{ textDecoration: "none" }}>
                            <i className="fab fa-instagram"></i>
                          </Link>
                        </li>
                        <li>
                          <Link to="#" style={{ textDecoration: "none" }}>
                            <i className="fab fa-twitter"></i>
                          </Link>
                        </li>
                      </ul>
                    </div>
                    {/* Post Sharing Links End  */}
                  </div>
                </div>
                {/* Post Extra Info End  */}
              </div>
              {/* Post Content End  */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
