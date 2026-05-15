import { Link } from 'react-router';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';

export function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-[#FAF8F3] to-[#F5F1E8]">
      <div className="text-center px-4">
        <h1 className="text-9xl font-bold text-[#C9A961] mb-4">404</h1>
        <h2 className="text-3xl font-bold text-[#1B2A4A] mb-4">Page Not Found</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/">
            <Button size="lg" className="bg-[#C9A961] hover:bg-[#B89751] text-white">
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </Button>
          </Link>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-[#1B2A4A] text-[#1B2A4A]"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
