import axios from "axios";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PhotoThumbnail from "./PhotoThumbnail";

function GridPhotos() {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  // status includes (ok, empty, error)
  const [status, setStatus] = useState("ok");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // call api to get photo
        const response = await axios.get(
          `https://api.unsplash.com/photos?client_id=${
            import.meta.env.VITE_CLIENT_KEY
          }&per_page=20&page=${page}`
        );

        // there are no more photos to load
        if (response.data.length === 0) {
          setStatus("empty");
          return;
        }
        // append new photos
        setPhotos([...photos, ...response.data]);
      } catch (err) {
        setStatus("error");
        console.log(err);
      }
    };
    fetchData();
  }, [page]);

  // this function will be call when user scroll to the end of page
  // it will increase page state to load more photos
  const handleScrollToEnd = () => {
    setPage(page + 1);
  };

  return (
    <div className="p-4 mb-4 position-relative">
      <h1 className="text-center my-4">IA02 - The Photo Gallery</h1>

      {/* using InfiniteScroll from react-infinite-scroll-component 
          to automatically load more photos */}
      <InfiniteScroll
        dataLength={photos.length}
        next={handleScrollToEnd}
        hasMore={status === "ok"}
        endMessage={
          <div className="text-center fw-medium text-info">
            {status === "empty"
              ? "There are no more photos to load"
              : "Oops! Something went wrong, please try later!"}
          </div>
        }
        loader={
          <div className="d-flex align-items-center justify-content-center position-absolute start-50 translate-middle-x bottom-0">
            <div className="spinner-border me-2 text-info" role="status"></div>
            <span className="text-info">Loading photos...</span>
          </div>
        }
      >
        <div
          className="container pb-4"
          style={{ minHeight: 700, maxWidth: 1200 }}
        >
          <div className="row">
            {photos.map((photo, index) => (
              <div
                key={index}
                className="col-6 col-sm-4 col-md-3 col-lg-2 mt-2 px-1"
              >
                <PhotoThumbnail photo={photo} />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default GridPhotos;
