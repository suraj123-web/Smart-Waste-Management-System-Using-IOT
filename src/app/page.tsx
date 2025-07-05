"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Loader2, Trash2 } from 'lucide-react';

export default function HomePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    if (!isLoading && user) {
      router.replace('/dashboard');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-lg text-foreground">Loading BinSight...</p>
      </div>
    );
  }

  if (user) {
    return (
       <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-lg text-foreground">Redirecting to dashboard...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background to-secondary p-6 text-center">
      <div className="mb-8 flex items-center space-x-4">
        <Trash2 className="h-20 w-20 text-primary" />
        <h1 className="text-7xl font-bold text-primary">BinSight</h1>
      </div>
      <p className="mb-10 max-w-2xl text-2xl text-foreground">
        Welcome to BinSight, your smart solution for IoT dustbin management. Monitor, track, and manage your dustbins with ease.
      </p>
      <div className="space-x-4">
        <Link href="/login" passHref>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg">
            <a>Login</a>
          </Button>
        </Link>
        <Link href="/signup" passHref>
          <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10 px-8 py-6 text-lg">
            <a>Sign Up</a>
          </Button>
        </Link>
      </div>
      <footer className="absolute bottom-6 text-base text-muted-foreground">
        © {year} BinSight. All rights reserved.
      </footer>
    </div>
  );
}
