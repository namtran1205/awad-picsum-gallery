# Picsum Gallery

A modern, responsive photo gallery web application built with React and Material-UI, featuring infinite scroll and detailed photo views.

## Features

- 📸 **Photo Gallery**: Browse beautiful random photos from Lorem Picsum API
- ♾️ **Infinite Scroll**: Automatically loads more photos as you scroll
- 🔍 **Photo Details**: View high-resolution images with photographer information

## Tech Stack

- **React** (v19.2.0) - UI framework
- **React Router** (v7.9.5) - Client-side routing
- **Material-UI** (v7.3.4) - Component library
- **Axios** (v1.13.1) - HTTP client
- **Lorem Picsum API** - Photo source

## Installation

1. Clone the repository:
```bash
git clone https://github.com/namtran1205/awad-picsum-gallery.git picsum-gallery
cd picsum-gallery
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm start` - Run development server
- `npm build` - Create production build
- `npm test` - Run tests
- `npm eject` - Eject from Create React App (one-way operation)

## Project Structure

```
picsum-gallery/
├── src/
│   ├── components/
│   │   ├── Layout.jsx         # Main layout wrapper
│   │   ├── Loader.jsx         # Loading spinner
│   │   ├── PhotoCard.jsx      # Photo card component
│   │   └── PhotoCard.css      # PhotoCard styles
│   ├── pages/
│   │   ├── PhotoList.jsx      # Gallery page with infinite scroll
│   │   ├── PhotoDetail.jsx    # Individual photo detail page
│   │   └── PhotoDetail.css    # PhotoDetail styles
│   ├── context/
│   │   └── PhotoContext.jsx   # Global state management
│   ├── App.jsx                # Main app component
│   └── index.js               # App entry point
└── package.json
```

## Key Components

### PhotoList
- Displays photos in a responsive grid layout
- Implements infinite scroll using Intersection Observer
- Manages photo state through Context API
- Shows loader while fetching new photos

### PhotoDetail
- Displays full-size photo with metadata
- Shows photographer name and image dimensions
- Provides download and share functionality
- Responsive layout with side-by-side info on desktop

### PhotoCard
- Reusable card component for each photo
- Hover animations and transitions
- Links to detailed photo view
- Optimized image loading

### Layout
- Fixed gradient header with site title
- Consistent spacing and max-width container
- Wraps all page content

## API Integration

Uses the [Lorem Picsum API](https://picsum.photos/) for fetching photos:

- **List endpoint**: `https://picsum.photos/v2/list?page={page}&limit={limit}`
- **Photo info**: `https://picsum.photos/id/{id}/info`
- **Image URL**: `https://picsum.photos/id/{id}/{width}/{height}`

## State Management

Global state managed with React Context API:
- `photos`: Array of loaded photos
- `page`: Current page number
- `hasMore`: Whether more photos are available

## Styling

- Material-UI `sx` props for component-level styles
- Custom CSS files for complex styling
- BEM naming convention for CSS classes
- Responsive breakpoints: xs, sm, md, lg, xl

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Photos provided by [Lorem Picsum](https://picsum.photos/)
- Built with [Create React App](https://create-react-app.dev/)
- UI components from [Material-UI](https://mui.com/)