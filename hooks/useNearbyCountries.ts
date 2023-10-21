import { Coordinates, Country } from '@/types/countriesTypes';
import { useQuery } from '@tanstack/react-query';

async function fetchNearbyCountries({
  latitude,
  longitude,
}: Coordinates): Promise<Country[]> {
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
}

export function useNearbyCountries({ latitude, longitude }: Coordinates) {
  return useQuery({
    queryKey: ['nearbyCountries', latitude, longitude],
    queryFn: () => fetchNearbyCountries({ latitude, longitude }),
    enabled: !!latitude && !!longitude,
    retry: 1,
  });
}
