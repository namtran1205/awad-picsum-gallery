import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {Box,  Typography, Button, Container } from "@mui/material";
import Loader from "../components/Loader";

export default function PhotoDetail() {
    const { id } = useParams();
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(true);

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
            <Button variant="contained" component={Link} to="/photos" sx={{ mt: 2 }}>
                Back to Gallery
            </Button>
        </Container>
    );
    return (
        <Container sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>
                Photo Detail
            </Typography>
            <Button variant="outlined" component={Link} to="/photos" sx={{ mb: 3 }}>
                Back to Gallery
            </Button>

            <Box display="flex" flexDirection="column" alignItems="center">
                <img
                    src={photo.download_url}
                    alt={photo.author}
                    style={{ maxWidth: '100%', borderRadius: 8, marginBottom: 20 }}
                />
                <Typography variant="h5" gutterBottom>
                    Photo #{photo.id}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Author: {photo.author}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Description: <em>No description available.</em>
                </Typography>
            </Box>
        </Container>
    );  
}