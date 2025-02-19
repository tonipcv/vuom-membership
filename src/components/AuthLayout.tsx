import XLogo from './XLogo';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="flex justify-center">
          <XLogo />
        </div>
        {children}
      </div>
    </div>
  );
} 