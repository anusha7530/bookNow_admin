"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

interface Movie {
  title: string;
  description: string;
  portraitImgUrl: string;
  portraitImg: File | null;
  landscapeImgUrl: string;
  landscapeImg: File | null;
  rating: number;
  genre: string[];
  duration: number;
}

const CreateMoviePage = () => {
  const [movie, setMovie] = useState<Movie>({
    title: "",
    description: "",
    portraitImgUrl: "",
    portraitImg: null,
    landscapeImgUrl: "",
    landscapeImg: null,
    rating: 0,
    genre: [],
    duration: 0,
  });

  const genres = [
    "Action",
    "Comedy",
    "Drama",
    "Fantasy",
    "Horror",
    "Science Fiction",
    "Thriller",
    "Other",
  ];

  const handleGenreChange = (genre: string) => {
    if (movie.genre.includes(genre)) {
      setMovie({
        ...movie,
        genre: movie.genre.filter((selectedGenre) => selectedGenre !== genre),
      });
    } else {
      setMovie({ ...movie, genre: [...movie.genre, genre] });
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setMovie({ ...movie, [name]: value });
  };

  const uploadImage = async (image: File) => {
    try {
      const formData = new FormData();
      formData.append("myimage", image);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/image/uploadimage`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Image uploaded successfully:", data);
        return data.imageUrl;
      } else {
        console.error("Failed to upload the image.");
        return null;
      }
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };
  const handleCreateMovie = async () => {
    try {
      if (
        movie.title === "" ||
        movie.description === "" ||
        movie.rating === 0 ||
        movie.genre.length === 0 ||
        movie.duration === 0
      ) {
        toast.error("Please fill all the fields", {
          position: "top-center",
        });
        return;
      }

      let portraitImgUrl = movie.portraitImgUrl;
      let landscapeImgUrl = movie.landscapeImgUrl;

      if (movie.portraitImg) {
        portraitImgUrl = await uploadImage(movie.portraitImg);
        if (!portraitImgUrl) {
          toast.error("Portrait Image upload failed", {
            position: "top-center",
          });
          return;
        }
      }
      if (movie.landscapeImg) {
        landscapeImgUrl = await uploadImage(movie.landscapeImg);
        if (!landscapeImgUrl) {
          toast.error("Landscape Image upload failed", {
            position: "top-center",
          });
          return;
        }
      }

      const newMovie = { ...movie, portraitImgUrl, landscapeImgUrl };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/movie/createmovie`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newMovie),
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Movie creation successful", data);

        toast.success("Movie Created Successfully", {
          position: "top-center",
        });
      } else {
        console.error("Movie creation failed", response.statusText);
        toast.error("Movie Creation Failed", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("An error occurred during movie creation", error);
    }
  };

  return (

    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      <label className="block text-[#b92d14e8] mb-1">Title</label>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={movie.title}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#573a2de8] mb-3"
      />
      <label className="block text-[#b92d14e8] mb-1">Description</label>
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={movie.description}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#573a2de8] mb-3"
      />

      <label className="block text-[#b92d14e8] mb-1">Portrait Image</label>
      <input
        type="file"
        accept="image/*"
        onChange={(event) => {
          if (event.target.files && event.target.files.length > 0) {
            setMovie({ ...movie, portraitImg: event.target.files[0] });
          }
        }}
        className="w-full p-2 border border-gray-300 rounded-md mb-3"
      />

      <label className="block text-[#b92d14e8] mb-1">Landscape Image</label>
      <input
        type="file"
        accept="image/*"
        onChange={(event) => {
          if (event.target.files && event.target.files.length > 0) {
            setMovie({ ...movie, landscapeImg: event.target.files[0] });
          }
        }}
        className="w-full p-2 border border-gray-300 rounded-md mb-3"
      />

      <label className="block text-[#b92d14e8] mb-1">Rating</label>
      <input
        type="number"
        name="rating"
        placeholder="Rating"
        value={movie.rating}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#573a2de8] mb-3"
      />

      <p className="text-[#b92d14e8]">Select Genres:</p>
      <div className="flex flex-wrap gap-2 mb-3">
        {genres.map((genre) => (
          <label key={genre} className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="genre"
              checked={movie.genre.includes(genre)}
              onChange={() => handleGenreChange(genre)}
              className="form-checkbox text-[#573a2de8]"
            />
            <span>{genre}</span>
          </label>
        ))}
      </div>

      <label className="block text-[#b92d14e8] mb-1">Duration</label>
      <input
        type="number"
        name="duration"
        placeholder="Duration"
        value={movie.duration}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#573a2de8] mb-4"
      />

      <button
        onClick={handleCreateMovie}
        className="w-full bg-[#b92d14e8] text-white py-2 rounded-md hover:bg-[#573a2de8] transition duration-200"
      >
        Create Movie
      </button>
    </div>
  );
};

export default CreateMoviePage;
