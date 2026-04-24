import { useRouteError, Link } from "react-router";
import { Button } from "../components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF8F3] p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto text-red-600">
          <AlertTriangle className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Oops! Something went wrong</h1>
        <p className="text-gray-600">
          We encountered an unexpected application error. Please try refreshing the page or going back to the home page.
        </p>
        {error?.message && (
          <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-700 text-sm font-mono overflow-auto max-h-32 text-left">
            {error.message}
          </div>
        )}
        <div className="flex gap-4 justify-center pt-4">
          <Button 
            onClick={() => window.location.reload()} 
            className="bg-[#2C5F2D] hover:bg-[#234F24] text-white"
          >
            Refresh Page
          </Button>
          <Link to="/">
            <Button variant="outline" className="border-[#2C5F2D] text-[#2C5F2D]">
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
