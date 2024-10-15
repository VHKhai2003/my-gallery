import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function PhotoDetail() {
  const { id } = useParams(); // get id from the url
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const fetchInfo = async () => {
      // call api to get detailed information of the photo
      try {
        const response = await axios.get(
          `https://api.unsplash.com/photos/${id}?client_id=${
            import.meta.env.VITE_CLIENT_KEY
          }`
        );
        setInfo(response.data);
      } catch (err) {
        console.log(err);
        alert("Oops! Something went wrong. Please try later.");
      }
    };
    fetchInfo();
  }, []);

  return (
    info && (
      <div className="p-4">
        <div className="container" style={{ maxWidth: 1200 }}>
          <div className="row justify-content-center">
            {/* full photo */}
            <div className="col-12 col-md-6">
              <img
                className="w-100 shadow"
                src={info.urls.full}
                alt={info.slug || "image"}
              />
            </div>

            {/* Card info */}
            <div className="col-12 col-md-6 mt-4 mt-md-0 text-end">
              <div className="card shadow text-start">
                <div className="card-header bg-primary text-white h4">
                  Photo details
                </div>
                <div className="card-body">
                  <p className="card-text">
                    <b>Title: </b>
                    {info.title || "This photo doesn't have a title"}
                  </p>

                  <p className="card-text">
                    <b>Author: </b> {info.user.name}
                  </p>

                  <p className="card-text">
                    <b>Description: </b>
                    {info.description ||
                      info.alt_description ||
                      "This photo doesn't have description"}
                  </p>
                </div>
              </div>

              <Link to={"/photos"}>
                <div className="btn btn-outline-success mt-4">
                  Back to Gallery
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default PhotoDetail;
