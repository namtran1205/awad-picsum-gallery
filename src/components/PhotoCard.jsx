"use client"

import { CardActionArea, CardMedia, CardContent, Typography, Box } from "@mui/material"
import { Link } from "react-router-dom"
import { useState } from "react"

export default function PhotoCard({ photo }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link to={`/photos/${photo.id}`} style={{ textDecoration: "none" }}>
      <Box
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: isHovered ? "0 20px 40px rgba(0, 0, 0, 0.15)" : "0 4px 12px rgba(0, 0, 0, 0.08)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: isHovered ? "translateY(-8px)" : "translateY(0)",
          cursor: "pointer",
          backgroundColor: "#fff",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardActionArea sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              position: "relative",
              overflow: "hidden",
              backgroundColor: "#f5f5f5",
              aspectRatio: "4/3",
              width: "100%",
            }}
          >
            <CardMedia
              component="img"
              image={`https://picsum.photos/id/${photo.id}/300/250`}
              alt={photo.author}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                transform: isHovered ? "scale(1.08)" : "scale(1)",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                backgroundColor: "rgba(0, 0, 0, 0)",
                transition: "background-color 0.3s ease",
                ...(isHovered && {
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                }),
              }}
            />
          </Box>

          <CardContent
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px",
              backgroundColor: "#fff",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                fontSize: "0.95rem",
                color: "#1a1a1a",
                textAlign: "center",
                letterSpacing: "0.3px",
                transition: "color 0.3s ease",
                ...(isHovered && {
                  color: "#0066cc",
                }),
              }}
            >
              {photo.author}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Box>
    </Link>
  )
}
