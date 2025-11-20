import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  shopFavourites,
  deleteFavourite,
} from "../redux/slice/favouritesSlice";
import { Trash2 } from "lucide-react";
import { FaStar, FaMapMarkerAlt, FaTrashAlt } from "react-icons/fa";
import Loader from "../componets/Loader";

const FavouritesPage = () => {
  const dispatch = useDispatch();
  const { allFavourites: favourites, loading } = useSelector(
    (state) => state.favourites
  );

  useEffect(() => {
    dispatch(shopFavourites());
  }, [dispatch]);

  const handleDelete = async (store_id) => {
    try {
      await dispatch(deleteFavourite(store_id)).unwrap();
      dispatch(shopFavourites());
    } catch (error) {
      console.error("Failed to delete favourite:", error);
    }
  };

  return (
    <div className="page-favourites py-5 bg-light">
      <div className="container">
        {/* {loading ? (
          <Loader />
        ) : ( */}
          <>
            <h2 className="fw-bold mb-4 text-dark">❤️ My Favourites</h2>

            {favourites?.length > 0 ? (
              <div className="row">
                {favourites.map((fav) => (
                  <div className="col-md-6 col-lg-4 mb-4" key={fav.store_id}>
                    <div className="card shadow-sm border-0 rounded-4 h-100 p-3 d-flex flex-column justify-content-between">
                      <div className="d-flex align-items-start gap-3">
                        <img
                          src={
                            fav.images?.[0]
                              ? `${import.meta.env.VITE_API_BASE_URL}/images/${
                                  fav.images[0]
                                }`
                              : "/default.jpg"
                          }
                          alt={fav.name}
                          className="rounded-3 flex-shrink-0"
                          style={{ width: 80, height: 80, objectFit: "cover" }}
                        />
                        <div>
                          <h5 className="mb-1 text-dark fw-semibold">
                            {fav.name}
                          </h5>

                          <div className="d-flex align-items-center text-muted mb-1 small">
                            <FaStar className="text-warning me-1" />
                            {fav.averagerating || 0}{" "}
                            <span className="ms-1">
                              ({fav.total_reviews || 0})
                            </span>
                          </div>

                          <div className="d-flex align-items-center text-muted small">
                            <FaMapMarkerAlt className="me-1" />
                            {fav.addressline1}, {fav.city}
                          </div>
                        </div>
                      </div>

                      <div className="d-flex justify-content-between align-items-center mt-3">
                        <span className="badge bg-white border text-dark px-3 py-2 rounded-pill">
                          {fav.category_name || "Salon"}
                        </span>

                        <Trash2
                          className="text-danger"
                          style={{ cursor: "pointer" }}
                          title="Delete"
                          onClick={() => handleDelete(fav.store_id)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center mt-5 text-muted">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="60"
                  height="60"
                  fill="currentColor"
                  className="bi bi-heart text-danger mb-3"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="m8 2.748-.717-.737C5.6.281 2.514.878 
                      1.4 3.053c-.523 1.023-.641 2.5.314 
                      4.385.92 1.777 2.834 3.989 6.286 
                      6.357 3.452-2.368 5.365-4.58 
                      6.286-6.357.955-1.885.838-3.362.314-4.385C13.486.878 
                      10.4.28 8.717 2.01L8 2.748zm0 
                      12.068C-7.333 4.868 3.279-3.04 
                      7.824 1.143c.06.055.119.112.176.171a3.12 
                      3.12 0 0 1 .176-.17C12.72-3.042 
                      23.333 4.867 8 14.816z"
                  />
                </svg>
                <h5 className="fw-semibold text-dark">No favourites added</h5>
                <p className="text-muted mb-3">
                  You haven’t saved any stores yet. Start browsing and add your
                  favourites.
                </p>
                <a href="/" className="btn btn-dark px-4 rounded-pill">
                  Browse Stores
                </a>
              </div>
            )}
          </>
        {/* )} */}
      </div>
    </div>
  );
};

export default FavouritesPage;
