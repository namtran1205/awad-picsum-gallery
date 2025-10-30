import { useEffect, useRef, useState, useCallback } from "react";
import axios from "axios";
import { Grid, Typography } from "@mui/material";
import PhotoCard from "../components/PhotoCard";
import Loader from "../components/Loader";
import { usePhotos } from "../context/PhotoContext";

export default function PhotoList() {
  const { photos, setPhotos, page, setPage, hasMore, setHasMore } = usePhotos();
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef();

  const fetchPhotos = useCallback(
    async (pageNum) => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://picsum.photos/v2/list?page=${pageNum}&limit=30`
        );
        if (res.data.length === 0) {
          setHasMore(false);
        } else {
          setPhotos((prev) => {
            const combined = [...prev, ...res.data];
            const unique = Array.from(
              new Map(combined.map((p) => [p.id, p])).values()
            );
            return unique;
          });
        }
      } catch (err) {
        console.error("Error loading photos:", err);
      } finally {
        setLoading(false);
      }
    },
    [setHasMore, setPhotos]
  );

  // initial fetch
  useEffect(() => {
    if (photos.length === 0) fetchPhotos(page);
  }, [photos.length, page, fetchPhotos]);

  // 🌀 infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          const next = page + 1;
          setPage(next);
          fetchPhotos(next);
        }
      },
      { threshold: 1.0 }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [loading, hasMore, page, fetchPhotos, setPage]);

  return (
    <div sx={{ py: 4 }}>
      <Grid container spacing={2} justifyContent="center">
        {photos.map((photo, index) => (
          <Grid key={`${photo.id}-${index}`} item xs={12} sm={6} md={3}>
            <PhotoCard photo={photo} />
          </Grid>
        ))}
      </Grid>

      {loading && <Loader />}
      {!hasMore && (
        <Typography
          variant="body2"
          align="center"
          color="text.secondary"
          mt={2}
        >
          End of list
        </Typography>
      )}
      <div ref={loaderRef} />
    </div>
  );
}
