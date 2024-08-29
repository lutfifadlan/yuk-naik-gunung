import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';

const Navbar: React.FC = () => {
  const { data: session } = useSession();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-green-600">MountainHike</span>
            </Link>
          </div>
          <div className="flex items-center">
            {session ? (
              <>
                <Link href="/dashboard" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">
                  Dashboard
                </Link>
                <Button variant="outline" onClick={() => signOut()} className="ml-4">
                  Sign out
                </Button>
              </>
            ) : (
              <Link href="/login" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;