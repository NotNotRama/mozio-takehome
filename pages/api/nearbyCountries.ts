import { NextApiRequest, NextApiResponse } from 'next';
import { countries } from '@/utils/constants';

function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function nearbyCountriesHandler(
  req: NextApiRequest,
  res: NextApiResponse
): void {
  const { latitude, longitude } = req.query;

  console.log(req);
  // Console logged the arguments as requested in the instructions

  if (!latitude || !longitude) {
    return res
      .status(400)
      .json({ error: 'Latitude and longitude are required.' });
  }

  const maxDistance = 1000;

  const nearbyCountries = countries
    .map((country) => ({
      ...country,
      distance: calculateDistance(
        parseFloat(latitude as string),
        parseFloat(longitude as string),
        country.latitude,
        country.longitude
      ),
    }))
    .filter((country) => country.distance <= maxDistance)
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 4);

  //setTimeout to simulate the delay of a real api call
  setTimeout(() => {
    res.status(200).json(nearbyCountries);
  }, 1000);
}
