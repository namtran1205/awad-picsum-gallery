import { useParams, useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {Box,  Typography, Button, Container } from "@mui/material";
import Loader from "../components/Loader";
import { ArrowLeft, Download, Share2 } from "lucide-react"

export default function PhotoDetail() {
    const { id } = useParams();
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPhoto = async () => {
            try {
                const res = await axios.get(`https://picsum.photos/id/${id}/info`);
                setPhoto(res.data);
            } catch {
                setPhoto(null);
            }
            finally {
                setLoading(false);
            }
        };
        fetchPhoto();
    }, [id]);

    if (loading) return <Loader />;
    if (!photo) return (
        <Container sx={{ py: 4, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
                Photo not found.
            </Typography>   
            <Button
                variant="text"
                startIcon={<ArrowLeft size={20} />}
                sx={{
                    color: "#1a1a1a",
                    textTransform: "none",
                    fontSize: "0.95rem",
                    padding: "8px 12px",
                    "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.05)",
                    },
                }}
                onClick={() => {
                    if (window.history.state && window.history.state.idx > 0) {
                    navigate(-1);
                    } else {
                    navigate("/photos");
                    }
                }}
                >
                Back to Gallery
            </Button>
        </Container>
    );
    return (
        <div sx={{ py: 4 }}>
            <Button
                variant="text"
                startIcon={<ArrowLeft size={20} />}
                sx={{
                    color: "#1a1a1a",
                    textTransform: "none",
                    fontSize: "0.95rem",
                    padding: "8px 12px",
                    "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.05)",
                    },
                }}
                onClick={() => {
                    if (window.history.state && window.history.state.idx > 0) {
                    navigate(-1);
                    } else {
                    navigate("/photos");
                    }
                }}
                >
                Back to Gallery
            </Button>

            <Box
                sx={{
                mb: 6,
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.12)",
                backgroundColor: "#f5f5f5",
                aspectRatio: "16/10",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                }}
            >
                <img
                src={photo.download_url || "/placeholder.svg"}
                alt={photo.author}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                }}
                />
            </Box>
            <Box sx={{ mb: 6 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            mb: 2,
            fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.8rem" },
            color: "#1a1a1a",
            letterSpacing: "-0.5px",
          }}
        >
          Photo #{photo.id}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 4, flexWrap: "wrap" }}>
          <Box>
            <Typography
              variant="body2"
              sx={{
                color: "#666",
                fontSize: "0.85rem",
                textTransform: "uppercase",
                letterSpacing: "1px",
                mb: 0.5,
              }}
            >
              Photographer
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: "#1a1a1a",
                fontSize: "1.1rem",
              }}
            >
              {photo.author}
            </Typography>
          </Box>

          <Box sx={{ width: "1px", height: "40px", backgroundColor: "#ddd" }} />

          <Box>
            <Typography
              variant="body2"
              sx={{
                color: "#666",
                fontSize: "0.85rem",
                textTransform: "uppercase",
                letterSpacing: "1px",
                mb: 0.5,
              }}
            >
              Dimensions
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: "#1a1a1a",
                fontSize: "1.1rem",
              }}
            >
              {photo.width} × {photo.height}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <Button
            variant="contained"
            startIcon={<Download size={20} />}
            href={photo.download_url}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              backgroundColor: "#1a1a1a",
              color: "#fff",
              textTransform: "none",
              fontSize: "0.95rem",
              padding: "12px 24px",
              borderRadius: "8px",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#333",
                transform: "translateY(-2px)",
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
              },
            }}
          >
            Download
          </Button>

          <Button
            variant="outlined"
            startIcon={<Share2 size={20} />}
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: `Photo by ${photo.author}`,
                  text: `Check out this beautiful photo!`,
                  url: window.location.href,
                })
              }
            }}
            sx={{
              color: "#1a1a1a",
              borderColor: "#ddd",
              textTransform: "none",
              fontSize: "0.95rem",
              padding: "12px 24px",
              borderRadius: "8px",
              transition: "all 0.3s ease",
              "&:hover": {
                borderColor: "#1a1a1a",
                backgroundColor: "rgba(0, 0, 0, 0.02)",
              },
            }}
          >
            Share
          </Button>
        </Box>
      </Box>
    </div>
    );  
}