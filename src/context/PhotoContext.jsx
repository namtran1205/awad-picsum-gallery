import { createContext, useState, useContext } from "react";

const PhotoContext = createContext();

export const PhotoProvider = ({ children }) => {
    const [photos, setPhotos] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    return (
        <PhotoContext.Provider value={{ photos, setPhotos, page, setPage, hasMore, setHasMore }}>
            {children}
        </PhotoContext.Provider>
    );
};

export const usePhotos = () => {
    return useContext(PhotoContext);
};
