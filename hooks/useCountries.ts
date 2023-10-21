import { Country } from '@/types/countriesTypes';
import { useQuery } from '@tanstack/react-query';

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
