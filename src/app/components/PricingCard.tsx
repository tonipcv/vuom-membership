'use client';

interface PricingCardProps {
  name: string;
  price: string;
  pricePerDay: string;
  period: string;
  popular: boolean;
  features: string[];
  onClick: () => void;
  isLoading?: boolean;
}

export function PricingCard({
  name,
  price,
  pricePerDay,
  period,
  popular,
  features,
  onClick,
  isLoading = false
}: PricingCardProps) {
  return (
    <div className={`p-8 sm:p-10 ${popular ? 'bg-gray-900' : 'bg-white'} relative`}>
      {popular && (
        <div className="absolute -top-3 left-0 right-0 mx-8 rounded-full bg-indigo-600 px-3 py-1 text-center text-sm font-semibold text-white">
          Mais Popular
        </div>
      )}
      <div className="flex flex-col">
        <div>
          <h3 className={`text-lg font-semibold leading-8 ${popular ? 'text-white' : 'text-gray-900'}`}>
            {name}
          </h3>
          <div className="mt-4 flex items-baseline">
            <span className={`text-4xl font-bold tracking-tight ${popular ? 'text-white' : 'text-gray-900'}`}>
              {price}
            </span>
            <span className={`text-sm font-semibold leading-6 ${popular ? 'text-gray-300' : 'text-gray-600'}`}>
              {period}
            </span>
          </div>
          <p className={`mt-1 text-sm ${popular ? 'text-gray-300' : 'text-gray-600'}`}>
            {pricePerDay}
          </p>
        </div>
        <div className="mt-6 space-y-4">
          {features.map((feature) => (
            <div key={feature} className="flex gap-x-3">
              <svg
                className={`h-6 w-5 flex-none ${popular ? 'text-indigo-400' : 'text-indigo-600'}`}
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                  clipRule="evenodd"
                />
              </svg>
              <span className={`text-sm leading-6 ${popular ? 'text-gray-300' : 'text-gray-600'}`}>
                {feature}
              </span>
            </div>
          ))}
        </div>
        <button
          onClick={onClick}
          disabled={isLoading}
          className={`mt-6 block w-full rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
            popular
              ? 'bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600'
              : 'bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600'
          } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Carregando...' : 'Começar agora'}
        </button>
      </div>
    </div>
  );
} 