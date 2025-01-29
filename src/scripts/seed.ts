import { prisma } from "@/config/prisma";
import axios from "axios";
const BASE_URL =
  "https://ll.thespacedevs.com/2.2.0/config/launcher/?format=json&limit=100";

const fetchLaunchData = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data.results;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const insertData = async () => {
  const data = await fetchLaunchData();
  for (const launch of data) {
    await prisma.launcher.create({
      data: {
        name: launch.full_name ?? launch.name,
        imgUrl: launch.image_url ?? "no_url",
        manufacturer: launch.manufacturer.name,
        description: launch.manufacturer.description ?? launch.full_name,
      },
    });
  }
};

(async () => {
  try {
    await insertData();
    console.log("Data seeded successfully");
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
})();
