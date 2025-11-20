import React from "react";
import {
  blogIcon,
  blogPostImage1,
  blogPostImage2,
  blogPostImage3,
  blogPostImage4,
  blogPostImage5,
  blogPostImage6,
  readMoreIcon
} from "../assets/images";
import { Link } from "react-router-dom";

const Blogs = () => {
  return (
    <div>
      <div className="page-header">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8 order-md-1 order-2">
              {/* Page Heading Start */}
              <div className="page-header-box">
                <h1 className="text-anime">Our Blog</h1>
                {/* <ol className="breadcrumb wow fadeInUp" data-wow-delay="0.25s">
                  <li className="breadcrumb-item">
                    <Link to="#">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Blog
                  </li>
                </ol> */}
              </div>
              {/* Page Heading End */}
            </div>

            <div className="col-md-4 order-md-2 order-1">
              {/* Page Header Right Icon Start */}
              <div
                className="page-header-icon-box wow fadeInUp"
                data-wow-delay="0.5s"
              >
                <div className="page-header-icon">
                  <img src={blogIcon} alt="" />
                </div>
              </div>
              {/* Page Header Right Icon End */}
            </div>
          </div>
        </div>
      </div>

      {/* Page Header Section End */}

      {/* Blog Archive Page Start */}
      <div className="page-blog-archive">
        <div className="container">
          <div className="row">
            {[
              {
                img: blogPostImage1,
                title: "Unlocking the Secrets to Healthy, Luscious Locks.",
              },
              {
                img: blogPostImage2,
                title: "Trend Alert: Hottest Hairstyles for 2024",
              },
              {
                img: blogPostImage3,
                title: "Behind the Chair: A Day in the Life of Our Stylists",
              },
              {
                img: blogPostImage4,
                title: "Revamp Your Look: Seasonal Hair Makeover",
              },
              {
                img: blogPostImage5,
                title: "Step into Spring with Fresh Hair Color Ideas",
              },
              {
                img: blogPostImage6,
                title: "Top 10 Hair Products Every Stylish Woman",
              },
            ].map((post, index) => (
              <div className="col-lg-4" key={index}>
                <div
                  className="post-item wow fadeInUp"
                  data-wow-delay={`${index * 0.25}s`}
                >
                  <div className="post-featured-image">
                    <Link to="#">
                      <figure className="hover-anime">
                        <img src={post.img} alt="" />
                      </figure>
                    </Link>
                  </div>
                  <div className="post-header">
                    <h3>
                      <Link to="#" style={{textDecoration:"none"}}>{post.title}</Link>
                    </h3>
                    <div className="post-meta">
                      <ul>
                        <li>
                          <Link to="#" style={{textDecoration:"none"}}>December 20, 2023</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="post-readmore">
                    <Link to="#">
                      <img src={readMoreIcon} alt="" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {
            //   <div className="row">
            //     <div className="col-md-12">
            //       {/* Post Pagination Start */}
            //       <div className="post-pagination wow fadeInUp" data-wow-delay="1.5s">
            //         <ul className="pagination">
            //           <li><Link to="#"><i className="fa-solid fa-arrow-left-long"></i></Link></li>
            //           <li><Link to="#">1</Link></li>
            //           <li className="active"><Link to="#">2</Link></li>
            //           <li><Link to="#">3</Link></li>
            //           <li><Link to="#"><i className="fa-solid fa-arrow-right-long"></i></Link></li>
            //         </ul>
            //       </div>
            //       {/* Post Pagination End */}
            //     </div>
            //   </div>
          }
        </div>
      </div>
    </div>
  );
};

export default Blogs;
