import React from "react";
import { Link } from "react-router-dom";
import {
  blogPostImage1,
  blogPostImage2,
  blogPostImage3,
  readMoreIcon,
} from "../assets/images";

const HomeBlogs = () => {
  return (
    <div>
      {" "}
      <div className="latest-posts">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {/* Section Title Start  */}
              <div className="section-title">
                <h3 className="wow fadeInUp">Blog & News</h3>
                <h2 className="text-anime wow fadeInUp">Latest Tips & News</h2>
              </div>
              {/* Section Title End  */}
            </div>
          </div>

          <div className="row">
            <div className="col-lg-4">
              {/* Post Item Start  */}
              <div className="post-item wow fadeInUp" data-wow-delay="0.5s">
                {/* Post Featured Image Start  */}
                <div className="post-featured-image">
                  <Link to="#">
                    <figure className="hover-anime">
                      <img src={blogPostImage1} alt="" />
                    </figure>
                  </Link>
                </div>
                {/* Post Featured Image End  */}

                {/* Post Header Start  */}
                <div className="post-header">
                  <h3>
                    <Link to="#" style={{ textDecoration: "none" }}>
                      Unlocking the Secrets to Healthy, Luscious Locks.
                    </Link>
                  </h3>
                  <div className="post-meta">
                    <ul>
                      <li>
                        <Link to="#" style={{textDecoration:"none"}}>December 20, 2023</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* Post Header End  */}

                {/* Post Read More Button Start  */}
                <div className="post-readmore">
                  <Link to="#">
                    <img src={readMoreIcon} alt="" />
                  </Link>
                </div>
                {/* Post Read More Button End  */}
              </div>
              {/* Post Item End  */}
            </div>

            <div className="col-lg-4">
              {/* Post Item Start  */}
              <div className="post-item wow fadeInUp" data-wow-delay="0.75s">
                {/* Post Featured Image Start  */}
                <div className="post-featured-image">
                  <Link to="#">
                    <figure className="hover-anime">
                      <img src={blogPostImage2} alt="" />
                    </figure>
                  </Link>
                </div>
                {/* Post Featured Image End  */}

                {/* Post Header Start  */}
                <div className="post-header">
                  <h3>
                    <Link to="#" style={{ textDecoration: "none" }}>
                      Trend Alert: Hottest Hairstyles for 2024
                    </Link>
                  </h3>
                  <div className="post-meta">
                    <ul>
                      <li>
                        <Link to="#" style={{textDecoration:"none"}}>December 20, 2023</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* Post Header End  */}

                {/* Post Read More Button Start  */}
                <div className="post-readmore">
                  <Link to="#">
                    <img src={readMoreIcon} alt="" />
                  </Link>
                </div>
                {/* Post Read More Button End  */}
              </div>
              {/* Post Item End  */}
            </div>

            <div className="col-lg-4">
              {/* Post Item Start  */}
              <div className="post-item wow fadeInUp" data-wow-delay="1.0s">
                {/* Post Featured Image Start  */}
                <div className="post-featured-image">
                  <Link to="#">
                    <figure className="hover-anime">
                      <img src={blogPostImage3} alt="" />
                    </figure>
                  </Link>
                </div>
                {/* Post Featured Image End  */}

                {/* Post Header Start  */}
                <div className="post-header">
                  <h3>
                    <Link to="#" style={{ textDecoration: "none" }}>
                      Behind the Chair: A Day in the Life of Our Stylists
                    </Link>
                  </h3>
                  <div className="post-meta">
                    <ul>
                      <li>
                        <Link to="#" style={{textDecoration:"none"}}>December 20, 2023</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* Post Header  */}

                {/* Post Read More Button Start  */}
                <div className="post-readmore">
                  <Link to="#">
                    <img src={readMoreIcon} alt="" />
                  </Link>
                </div>
                {/* Post Read More Button End  */}
              </div>
              {/* Post Item End  */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBlogs;
