import Image from 'next/image';
// ou import { TrendingUp, CandlestickChart } from 'lucide-react';

const XLogo = () => {
  return (
    <div className="flex items-center justify-center">
      <Image
        src="/katsu.png"
        alt="Katsu Logo"
        width={80}
        height={24}
        className="h-auto"
        priority
      />
    </div>
  );
};

export default XLogo; 