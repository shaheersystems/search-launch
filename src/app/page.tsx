"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

type Launcher = {
  id: number;
  name: string;
  imgUrl: string;
  manufacturer: string;
  description: string;
};

export default function Home() {
  const [launchers, setLaunchers] = useState<Launcher[] | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchLaunchersData = async () => {
      setLoading(true);
      fetch("/api/launcher")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setLaunchers(data.data);
        });
    };
    fetchLaunchersData().then(() => {
      setLoading(false);
    });
  }, []);
  return (
    <div className="max-w-5xl space-y-4 mx-auto py-10">
      <div className="py-4">
        <h1 className="text-4xl font-bold text-center">Launchers</h1>
      </div>
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search launchers"
          className="w-full p-2 border rounded-lg"
        />
        <button className="px-4 py-2 rounded-md bg-black text-white">
          Search
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : launchers ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
          {launchers.map((launcher) => (
            <div
              key={launcher.id}
              className="bg-white flex border shadow rounded-lg overflow-hidden"
            >
              <img
                src={
                  launcher.imgUrl === "no_url"
                    ? "https://picsum.photos/500"
                    : launcher.imgUrl
                }
                alt={launcher.name}
                className="w-48 h-full object-cover object-center"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold">{launcher.name}</h2>
                <p className="text-gray-500">{launcher.manufacturer}</p>
                <p className="line-clamp-3">{launcher.description}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No launchers found</p>
      )}
    </div>
  );
}
