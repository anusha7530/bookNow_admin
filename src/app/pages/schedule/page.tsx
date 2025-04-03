"use client";
import React from "react";
import { ToastContainer, toast } from "react-toastify";

interface schedule {
  screenId: string;
  movieId: string;
  showTime: string;
  showDate: string;
}
interface Screen {
  _id: string;
  name: string;
  location: string;
  seats: any[]; // Change the type to an array of numbers
  city: string;
  screenType: string;
}

interface Movie {
  _id: string;
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

const page = () => {
  const [schedule, setSchedule] = React.useState<schedule>({
    screenId: "",
    movieId: "",
    showTime: "",
    showDate: "",
  });

  const [city, setCity] = React.useState("");
  const [screens, setScreens] = React.useState<Screen[]>([]);
  const [movies, setMovies] = React.useState<Movie[]>([]);

  const getMovies = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/movie/movies`
    );
    const data = await res.json();
    setMovies(data.data);
  };

  React.useEffect(() => {
    getMovies();
  }, []);

  const getScreensByCity = async () => {
    if (city === "") return toast.error("Please select a city");
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_BACKEND_API
      }/movie/screensbycity/${city}`
    );
    const data = await res.json();
    if (data.ok) {
      setScreens(data.data);
    } else {
      toast.error("No screens found in this city");
    }
  };

  const createSchedule = async () => {
    if (
      !schedule.screenId ||
      !schedule.movieId ||
      !schedule.showTime ||
      !schedule.showDate
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/movie/addmoviescheduletoscreen`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(schedule),
      }
    );

    const data = await res.json();
    if (data.ok) {
      toast.success("Schedule created successfully");
    } else {
      toast.error("Schedule creation failed");
    }
  };
  return (
    <div className="flex flex-col items-center p-6 space-y-6 bg-gray-100 min-h-screen">
      <h2 className="text-center font-bold text-2xl md:text-3xl  mb-2 text-[#b92d14e8]">
        Add schedules
      </h2>
      <div className="w-full max-w-md">
        <div className="flex space-x-2">
          <input
            type="text"
            name="city"
            id="city"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#573a2de8]"
          />
          <button
            onClick={() => getScreensByCity()}
            className="px-4 py-2 bg-[#b92d14e8] text-white rounded-lg hover:bg-[#573a2de8]"
          >
            Search
          </button>
        </div>
      </div>

      <div className="w-full max-w-lg">
        <h1 className="text-xl font-bold text-[#b92d14e8]">Screens</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {screens?.map((screen, index) => (
            <div
              key={index}
              className={`${
                schedule.screenId === screen._id
                  ? "border-2 border-[#b92d14e8] bg-[#f4afa3e8]"
                  : ""
              } p-4 border rounded-lg cursor-pointer hover:shadow-lg`}
              onClick={() => setSchedule({ ...schedule, screenId: screen._id })}
            >
              <p className="font-semibold">{screen.name}</p>
              <p className="text-sm text-[#b92d14e8]">
                Location: {screen.location}
              </p>
              <p className="text-sm text-[#b92d14e8]">City: {screen.city}</p>
              <p className="text-sm text-[#b92d14e8]">
                Type: {screen.screenType}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full max-w-lg">
        <h1 className="text-xl font-bold text-[#b92d14e8]">Movies</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {movies?.map((movie, index) => (
            <div
              key={index}
              className={`${
                schedule.movieId === movie._id
                  ? "border-2 border-[#b92d14e8] bg-[#f4afa3e8]"
                  : ""
              } p-4 border rounded-lg cursor-pointer hover:shadow-lg`}
              onClick={() => setSchedule({ ...schedule, movieId: movie._id })}
            >
              <p className="font-semibold">{movie.title}</p>
              <p className="text-sm text-[#b92d14e8]">{movie.description}</p>
              <p className="text-sm text-[#b92d14e8]">Rating: {movie.rating}</p>
              <p className="text-sm text-[#b92d14e8]">
                Genre: {movie.genre?.join(", ")}
              </p>
              <p className="text-sm text-[#b92d14e8]">
                Duration: {movie.duration}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full max-w-md space-y-4">
        <input
          type="time"
          name="showTime"
          id="showTime"
          onChange={(e) =>
            setSchedule({ ...schedule, showTime: e.target.value })
          }
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#573a2de8]"
        />
        <input
          type="date"
          name="showDate"
          id="showDate"
          onChange={(e) =>
            setSchedule({ ...schedule, showDate: e.target.value })
          }
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#573a2de8]"
        />
      </div>

      <button
        onClick={() => createSchedule()}
        className="px-6 py-2 bg-[#b92d14e8] text-white rounded-lg hover:bg-[#573a2de8]"
      >
        Save
      </button>
    </div>

    // <div className="formpage">
    //   <div className="citysearch">
    //     <input
    //       type="text"
    //       name="city"
    //       id="city"
    //       placeholder="City"
    //       value={city}
    //       onChange={(e) => setCity(e.target.value)}
    //     />
    //     <button onClick={() => getScreensByCity()}>Search</button>
    //   </div>

    //   <div className="items">
    //     <h1>Screens</h1>
    //     {screens?.map((screen, index) => (
    //       <div
    //         className={
    //           schedule.screenId === screen._id ? "item selected" : "item"
    //         }
    //         key={index}
    //         onClick={() => {
    //           setSchedule({ ...schedule, screenId: screen._id });
    //         }}
    //       >
    //         <p>{screen.name}</p>
    //         <p>{screen.location}</p>
    //         <p>{screen.city}</p>
    //         <p>{screen.screenType}</p>
    //       </div>
    //     ))}
    //   </div>

    //   <div className="items">
    //     <h1>Movies</h1>
    //     {movies?.map((movie, index) => (
    //       <div
    //         className={
    //           schedule.movieId === movie._id ? "item selected" : "item"
    //         }
    //         key={index}
    //         onClick={() => {
    //           setSchedule({ ...schedule, movieId: movie._id });
    //         }}
    //       >
    //         <p className="font-semibold">{movie.title}</p>
    //         <p className="text-sm text-gray-600">{movie.description}</p>
    //         <p className="text-sm text-gray-600">{movie.rating}</p>
    //         <p className="text-sm text-gray-600">{movie.genre}</p>
    //         <p className="text-sm text-gray-600">{movie.duration}</p>
    //       </div>
    //     ))}
    //   </div>
    //   <div className="w-full max-w-md space-y-4">
    //     <input
    //       type="time"
    //       name="showTime"
    //       id="showTime"
    //       className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    //       onChange={(e) =>
    //         setSchedule({ ...schedule, showTime: e.target.value })
    //       }
    //     />
    //     <input
    //       type="date"
    //       name="showDate"
    //       id="showDate"
    //       className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    //       onChange={(e) =>
    //         setSchedule({ ...schedule, showDate: e.target.value })
    //       }
    //     />
    //   </div>
    //   <button
    //     className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
    //     onClick={() => {
    //       createSchedule();
    //     }}
    //   >
    //     Save
    //   </button>
    // </div>
  );
};

export default page;
