import { Link } from "react-router-dom";

function PhotoThumbnail({ photo }) {
  // display photo thumbnail and author name
  return (
    <>
      <Link to={`/photos/${photo.id}`} className="w-100 ratio ratio-1x1">
        <img
          className="object-fit-cover shadow"
          src={photo.urls.thumb}
          alt={photo.description || photo.alt_description || "image"}
        />
      </Link>
      <div className="text-center fw-medium text-truncate mb-2">
        {photo.user.name}
      </div>
    </>
  );
}

export default PhotoThumbnail;
