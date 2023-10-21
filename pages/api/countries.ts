import { NextApiRequest, NextApiResponse } from 'next';
import { countries } from '@/utils/constants';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const query = req.query.query as string;

  setTimeout(() => {
    const filteredCountries = countries.filter((country) =>
      country.name.toLowerCase().includes(query.toString().toLowerCase())
    );

    if (filteredCountries.length === 0) {
      res.status(404).json({ error: 'No matching countries found' });
    } else {
      res.status(200).json(filteredCountries);
    }
  }, 500);
}
