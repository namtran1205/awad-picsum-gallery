import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  Container,
  Divider,
} from "@mui/material";
import Loader from "../components/Loader";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DownloadIcon from "@mui/icons-material/Download";
import ShareIcon from "@mui/icons-material/Share";
import "./PhotoDetail.css";

export default function PhotoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch photo info
  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const res = await axios.get(`https://picsum.photos/id/${id}/info`);
        setPhoto(res.data);
      } catch {
        setPhoto(null);
      } finally {
        setLoading(false);
      }
    };
    fetchPhoto();
  }, [id]);

  if (loading) return <Loader />;

  if (!photo)
    return (
      <Container className="photo-detail__container">
        <Typography variant="h6" gutterBottom>
          Photo not found.
        </Typography>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() =>
            window.history.state && window.history.state.idx > 0
              ? navigate(-1)
              : navigate("/photos")
          }
          className="photo-detail__back-btn"
        >
          Back to Gallery
        </Button>
      </Container>
    );

  return (
    <div className="photo-detail__container">
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() =>
          window.history.state && window.history.state.idx > 0
            ? navigate(-1)
            : navigate("/photos")
        }
        className="photo-detail__back-btn"
      >
        Back to Gallery
      </Button>

      {/* Main: image and info side-by-side (responsive) */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          alignItems: "flex-start",
        }}
      >
        {/* Photo Section */}
        <Box
          className="photo-detail__image-wrapper"
          sx={{ flex: 1, minWidth: 0 }}
        >
          <img
            src={photo.download_url}
            alt={photo.author}
            className="photo-detail__image"
            style={{ width: "100%", height: "auto", borderRadius: 8 }}
          />
        </Box>

        {/* Info Section */}
        <Box
          className="photo-detail__info"
          sx={{ width: { xs: "100%", md: "30%" } }}
        >
          <Typography variant="h4" className="photo-detail__title">
            Photo #{photo.id}
          </Typography>

          <Divider className="photo-detail__divider" sx={{ my: 2 }} />

          <Box className="photo-detail__meta">
            <Box className="photo-detail__meta-item" sx={{ mb: 2 }}>
              <Typography
                variant="body2"
                className="photo-detail__meta-label"
                color="text.secondary"
              >
                Photographer
              </Typography>
              <Typography
                variant="h6"
                className="photo-detail__meta-value"
                sx={{ wordBreak: "break-word" }}
              >
                {photo.author}
              </Typography>
            </Box>

            <Box className="photo-detail__meta-item" sx={{ mb: 2 }}>
              <Typography
                variant="body2"
                className="photo-detail__meta-label"
                color="text.secondary"
              >
                Dimensions
              </Typography>
              <Typography variant="h6" className="photo-detail__meta-value">
                {photo.width} × {photo.height}
              </Typography>
            </Box>

            <Box className="photo-detail__meta-item">
              <Typography
                variant="body2"
                className="photo-detail__meta-label"
                color="text.secondary"
              >
                Description
              </Typography>
              <Typography
                variant="body1"
                className="photo-detail__meta-desc"
                color="text.secondary"
              >
                No description available.
              </Typography>
            </Box>
            <Box className="photo-detail__actions">
              <Button
                variant="contained"
                startIcon={<DownloadIcon />}
                href={photo.download_url}
                target="_blank"
                rel="noopener noreferrer"
                className="photo-detail__btn-download"
              >
                Download
              </Button>

              <Button
                variant="outlined"
                startIcon={<ShareIcon />}
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: `Photo by ${photo.author}`,
                      text: "Check out this beautiful photo!",
                      url: window.location.href,
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Link copied to clipboard!");
                  }
                }}
                className="photo-detail__btn-share"
              >
                Share
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
