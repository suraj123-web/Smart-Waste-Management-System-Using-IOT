"use client";

import { useState, useEffect } from 'react';
import type { Dustbin } from '@/types';
import { AddDustbinForm } from '@/components/dashboard/AddDustbinForm';
import { DustbinList } from '@/components/dashboard/DustbinList';
import { MapDisplay } from '@/components/dashboard/MapDisplay';
import { useToast } from '@/hooks/use-toast';

// Mock data storage/retrieval for dustbins using localStorage
const DUSTBIN_STORAGE_KEY = 'binsight_dustbins';

export default function DashboardPage() {
  const [dustbins, setDustbins] = useState<Dustbin[]>([]);
  const [selectedDustbin, setSelectedDustbin] = useState<Dustbin | null>(null);
  const { toast } = useToast();

  // Load dustbins from localStorage on initial render
  useEffect(() => {
    const storedDustbins = localStorage.getItem(DUSTBIN_STORAGE_KEY);
    if (storedDustbins) {
      try {
        const parsedDustbins = JSON.parse(storedDustbins);
        setDustbins(parsedDustbins);
        if (parsedDustbins.length > 0) {
           // Select the first dustbin by default if available
          setSelectedDustbin(parsedDustbins[0]);
        }
      } catch (error) {
        console.error("Failed to parse dustbins from localStorage", error);
        localStorage.removeItem(DUSTBIN_STORAGE_KEY); // Clear corrupted data
      }
    }
  }, []);

  // Save dustbins to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(DUSTBIN_STORAGE_KEY, JSON.stringify(dustbins));
  }, [dustbins]);

  const handleAddDustbin = (newDustbin: Dustbin) => {
    setDustbins((prevDustbins) => [...prevDustbins, newDustbin]);
    setSelectedDustbin(newDustbin); // Select the newly added dustbin
  };

  const handleDeleteDustbin = (dustbinId: string) => {
    const dustbinToDelete = dustbins.find(d => d.id === dustbinId);
    setDustbins((prevDustbins) => prevDustbins.filter((db) => db.id !== dustbinId));
    if (selectedDustbin?.id === dustbinId) {
      setSelectedDustbin(dustbins.length > 1 ? dustbins.filter(db => db.id !== dustbinId)[0] : null);
    }
    toast({
      title: "Dustbin Deleted",
      description: `Dustbin "${dustbinToDelete?.name || 'Unknown'}" has been removed.`,
      variant: "destructive"
    });
  };

  const handleSelectDustbin = (dustbin: Dustbin) => {
    setSelectedDustbin(dustbin);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <AddDustbinForm onAddDustbin={handleAddDustbin} />
          <DustbinList
            dustbins={dustbins}
            onSelectDustbin={handleSelectDustbin}
            onDeleteDustbin={handleDeleteDustbin}
          />
        </div>
        <div className="lg:col-span-1">
          <MapDisplay selectedDustbin={selectedDustbin} />
        </div>
      </div>
    </div>
  );
}
