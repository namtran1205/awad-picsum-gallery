import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import PhotoCard from '../components/PhotoCard';
import Loader from '../components/Loader';
import { Grid, Typography } from "@mui/material";

export default function PhotoList() {
    const [photos, setPhotos] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const loaderRef = useRef();

    useEffect(() => {
        const fetchPhotos = async () => {
            setLoading(true);
            const res = await axios.get(`https://picsum.photos/v2/list?page=${page}&limit=30`);
            if (res.data.length === 0) setHasMore(false);
            setPhotos(prev => [...prev, ...res.data]);
            setLoading(false);
        };
        fetchPhotos();
    }, [page]);
    
    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore && !loading) {
                setPage(prev => prev + 1);
            }
        }, { threshold: 1.0 });
        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }
        return () => observer.disconnect();
    }, [loading, hasMore]);

    return (
    <div style={{ paddingTop: '20px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Picsum Gallery
      </Typography>

      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        >
        {photos.map((photo) => (
            <Grid key={photo.id} item xs={12} sm={6} md={3}>
            <PhotoCard photo={photo} />
            </Grid>
        ))}
        </Grid>

      {loading && <Loader />}
      {!hasMore && (
        <Typography variant="body2" align="center" color="text.secondary" mt={2}>
          End of list
        </Typography>
      )}
      <div ref={loaderRef} />
    </div>
  );
}