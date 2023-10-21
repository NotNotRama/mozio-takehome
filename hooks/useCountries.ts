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

const fetchCountries = async (query: string): Promise<Country[]> => {
  if (query === 'error') throw new Error('Users input was error');
  const response = await fetch(`/api/countries?query=${query}`);
  if (!response.ok) {
    throw new Error('Failed to fetch countries');
  }
  return response.json();
};

export const useCountries = (query: string) => {
  return useQuery({
    queryKey: ['countries', query],
    queryFn: () => fetchCountries(query),
    enabled: Boolean(query),
    retry: 1,
  });
};
