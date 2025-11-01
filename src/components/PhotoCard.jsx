import { CardActionArea, CardMedia, CardContent, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import "./PhotoCard.css";

export default function PhotoCard({ photo }) {
  return (
    <Link to={`/photos/${photo.id}`} className="photo-card">
      <Box className="photo-card__box">
        <CardActionArea className="photo-card__action-area">
          <Box className="photo-card__image-wrapper">
            <CardMedia
              component="img"
              image={`https://picsum.photos/id/${photo.id}/300/250`}
              alt={photo.author}
              className="photo-card__image"
            />
            <Box className="photo-card__overlay" />
          </Box>

          <CardContent className="photo-card__content">
            <Typography variant="body2" className="photo-card__author">
              {photo.author}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Box>
    </Link>
  );
}