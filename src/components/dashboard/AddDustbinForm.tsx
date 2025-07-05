"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import type { Dustbin } from '@/types';
import { Loader2, PlusCircle } from 'lucide-react';
import { useState } from 'react';

const dustbinSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  latitude: z.coerce.number().min(-90, { message: "Must be >= -90" }).max(90, { message: "Must be <= 90" }),
  longitude: z.coerce.number().min(-180, { message: "Must be >= -180" }).max(180, { message: "Must be <= 180" }),
});

type DustbinFormValues = z.infer<typeof dustbinSchema>;

interface AddDustbinFormProps {
  onAddDustbin: (dustbin: Dustbin) => void;
}

export function AddDustbinForm({ onAddDustbin }: AddDustbinFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const form = useForm<DustbinFormValues>({
    resolver: zodResolver(dustbinSchema),
    defaultValues: {
      name: "",
      latitude: undefined, // Use undefined for numeric inputs to allow placeholder
      longitude: undefined,
    },
  });

  async function onSubmit(values: DustbinFormValues) {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    const newDustbin: Dustbin = {
      id: Date.now().toString(), // Temporary ID generation
      ...values,
    };
    onAddDustbin(newDustbin);
    toast({
      title: "Dustbin Added",
      description: `"${values.name}" has been successfully registered.`,
    });
    form.reset();
    setIsSubmitting(false);
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Register New Dustbin</CardTitle>
        <CardDescription>Enter the details of the new IoT dustbin.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dustbin Name / Identifier</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Main Street Unit 001" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="latitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Latitude</FormLabel>
                    <FormControl>
                      <Input type="number" step="any" placeholder="e.g., 34.0522" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="longitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Longitude</FormLabel>
                    <FormControl>
                      <Input type="number" step="any" placeholder="e.g., -118.2437" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
               {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <PlusCircle className="mr-2 h-4 w-4" />
              )}
              Add Dustbin
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
