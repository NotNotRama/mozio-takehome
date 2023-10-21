import { Inter } from 'next/font/google';
import Autocomplete from '@/components/Autocomplete';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Autocomplete />
    </>
  );
}
