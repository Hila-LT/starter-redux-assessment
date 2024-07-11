import { createSlice } from '@reduxjs/toolkit';
import { selectSearchTerm } from '../search/search.slice';
import photos from './photos.data.js';

const initialState = {
  photos,
};

const options = {
  name: 'photos',
  initialState,
  reducers: {
    // Task 1: Create an `addPhoto()` case reducer that adds a photo to state.photos.
    addPhoto: (state, action) => {
      state.photos.unshift({ id: state.photos.length + 1, caption: action.payload.caption, imageUrl: action.payload.imageUrl });
    },
    removePhoto: (state, action) => {
      state.photos.splice(
          state.photos.findIndex((photo) => photo.id === action.payload),
          1
      );
    },
  },
};

const photosSlice = createSlice(options);
export const { addPhoto, removePhoto } = photosSlice.actions;

export default photosSlice.reducer;

export const selectAllPhotos = (state) => state.photos.photos;


// Task 12: Complete `selectFilteredPhotos()` selector to return a filtered list of photos whose captions match the user's search term
export const selectFilteredPhotos = (state) => {
  const photos = selectAllPhotos(state);
  const searchTerm = selectSearchTerm(state);
  if(searchTerm){
    return photos.filter((item) =>
        item.caption.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  else
    return photos;
};


