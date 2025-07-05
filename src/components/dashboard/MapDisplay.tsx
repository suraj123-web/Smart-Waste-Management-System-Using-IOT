
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Expand, Minimize } from 'lucide-react';
import type { Dustbin } from '@/types';
import { cn } from '@/lib/utils';

interface MapDisplayProps {
  selectedDustbin: Dustbin | null;
}

// Default coordinates (e.g., center of a city or region) if no dustbin is selected
const DEFAULT_LAT = 39.8283; // Approximate center of USA
const DEFAULT_LON = -98.5795;

export function MapDisplay({ selectedDustbin }: MapDisplayProps) {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const lat = selectedDustbin?.latitude ?? DEFAULT_LAT;
  const lon = selectedDustbin?.longitude ?? DEFAULT_LON;
  
  let bbox;
  if (selectedDustbin) {
    // Adjust bounding box for a closer view when a dustbin is selected
    const delta = isFullScreen ? 0.002 : 0.005; // Smaller delta for more zoom in fullscreen
    bbox = `${lon - delta},${lat - delta},${lon + delta},${lat + delta}`;
  } else {
    // Wider view for the default map state
    const delta = 20; 
    bbox = `${DEFAULT_LON - delta},${DEFAULT_LAT - delta},${DEFAULT_LON + delta},${DEFAULT_LAT + delta}`;
  }

  const mapUrl = selectedDustbin 
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lon}`
    : `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik`;

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  useEffect(() => {
    const originalBodyOverflow = document.body.style.overflow;
    if (isFullScreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = originalBodyOverflow;
    }
    return () => {
      // Restore original overflow when component unmounts or fullscreen is exited
      document.body.style.overflow = originalBodyOverflow;
    };
  }, [isFullScreen]);

  return (
    <Card className={cn(
      "shadow-lg flex flex-col", // Base classes
      isFullScreen 
        ? "fixed inset-0 z-[100] w-screen h-screen p-0 rounded-none border-0" // Fullscreen overrides
        : "h-full" // Original class for non-fullscreen
    )}>
      <CardHeader className={cn(
        "flex flex-row items-center justify-between",
        isFullScreen && "bg-background/95 backdrop-blur-sm py-3 px-4 border-b" 
      )}>
        <CardTitle className={cn("text-2xl", isFullScreen && "text-xl")}>
          {selectedDustbin ? `Location: ${selectedDustbin.name}` : "Dustbin Location Map"}
        </CardTitle>
        <Button onClick={toggleFullScreen} variant="ghost" size="icon" className="ml-auto">
          {isFullScreen ? <Minimize className="h-5 w-5" /> : <Expand className="h-5 w-5" />}
          <span className="sr-only">{isFullScreen ? "Exit Full Screen" : "Enter Full Screen"}</span>
        </Button>
      </CardHeader>
      <CardContent className={cn(
        "flex-grow p-0", 
        isFullScreen ? "h-full" : "" 
      )}>
        <iframe
          width="100%"
          height="100%"
          style={{ 
            border: 0, 
            minHeight: isFullScreen ? '0' : '400px', 
            borderRadius: isFullScreen ? '0' : 'var(--radius)'
          }}
          loading="lazy"
          allowFullScreen
          src={mapUrl}
          title={selectedDustbin ? `Map of ${selectedDustbin.name}` : "Dustbin Map"}
        ></iframe>
      </CardContent>
    </Card>
  );
}
