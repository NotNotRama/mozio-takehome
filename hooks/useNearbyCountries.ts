import { useQuery } from '@tanstack/react-query';
type Country = {
  id: number;
  name: string;
  description: string;
  country: string;
  climate: string;
  currency: string;
  latitude: number;
  longitude: number;
};

const fetchNearbyCountries = async (
  latitude: number | undefined,
  longitude: number | undefined
): Promise<Country[]> => {
  if (!latitude || !longitude) return [];
  if (isNaN(latitude) || isNaN(longitude)) {
    throw new Error('Invalid coordinates');
  }

  const response = await fetch(
    `/api/nearbyCountries?latitude=${latitude}&longitude=${longitude}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch nearby countries');
  }
  return response.json();
};

export const useNearbyCountries = (
  latitude: number | undefined,
  longitude: number | undefined
) => {
  return useQuery({
    queryKey: ['nearbyCountries', latitude, longitude],
    queryFn: () => fetchNearbyCountries(latitude, longitude),
    enabled: !!latitude && !!longitude,
    retry: 1,
  });
};
