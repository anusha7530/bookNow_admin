"use client";

import { useRouter } from "next/navigation";
import { Calendar, Film, LayoutDashboard, Users } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
    const checkAdminAuthentication = async () => {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_BACKEND_API + "/admin/checklogin",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (response.ok) {
          // Admin is authenticated
          setIsAdminAuthenticated(true);
        } else {
          // Admin is not authenticated
          setIsAdminAuthenticated(false);
          window.location.href = '/pages/auth/signin'
        }
      } catch (error) {
        console.error(
          "An error occurred during admin authentication check",
          error
        );
        setIsAdminAuthenticated(false);
      }
    };
    useEffect(() => {
      checkAdminAuthentication();
    }, []);

  const sections = [
    {
      title: "Manage Movies",
      description: "Add movie details like name, genre, duration.",
      icon: <Film className="w-8 h-8 text-indigo-600" />,
      path: "/pages/movie/createmovie",
    },
    {
      title: "Manage Screens",
      description: "Create screen layouts for theatres.",
      icon: <LayoutDashboard className="w-8 h-8 text-green-600" />,
      path: "/pages/screen",
    },
    {
      title: "Schedule Shows",
      description: "Assign movies to screens with date & time slots.",
      icon: <Calendar className="w-8 h-8 text-blue-600" />,
      path: "/pages/schedule",
    },
    {
      title: "Cast & Crew",
      description: "Add or update actor and director information.",
      icon: <Users className="w-8 h-8 text-pink-600" />,
      path: "/pages/movie/addceleb",
    },
  ];

  return (
   isAdminAuthenticated &&  (<div className="min-h-screen bg-gray-50 py-10 px-4 md:px-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-[#b92d14e8]">
        Admin Dashboard
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {sections.map((section, index) => (
          <div
            key={index}
            onClick={() => router.push(section.path)}
            className="cursor-pointer bg-white rounded-xl shadow hover:shadow-lg transition duration-300 p-6 flex flex-col justify-between"
          >
            <div className="mb-4">
              {section.icon}
              <h2 className="text-xl font-semibold mt-3">{section.title}</h2>
              <p className="text-sm text-gray-600 mt-1">{section.description}</p>
            </div>
            <div>
              <button className="mt-4 inline-block bg-[#b92d14e8] hover:bg-[#573a2de8] text-white text-sm px-4 py-2 rounded-lg">
                Go to Section
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>)
)};