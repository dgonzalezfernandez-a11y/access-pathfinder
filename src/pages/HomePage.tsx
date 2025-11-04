import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, Search, Compass, Loader2, Server, Users, BarChart2 } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { addDays, format } from 'date-fns';
import { cn } from '@/lib/utils';
import { api } from '@/lib/api-client';
import type { AccessReportItem } from '@shared/types';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Toaster, toast } from '@/components/ui/sonner';
import { Card, CardContent } from '@/components/ui/card';
function DateRangePicker({
  className,
  date,
  setDate,
}: {
  className?: string;
  date: DateRange | undefined;
  setDate: (date: DateRange | undefined) => void;
}) {
  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-full justify-start text-left font-normal h-12 text-base',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
const EmptyState = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    className="text-center py-16 px-6"
  >
    <div className="mx-auto w-fit p-4 bg-primary/10 rounded-full">
      <Compass className="h-12 w-12 text-primary" />
    </div>
    <h3 className="mt-6 text-2xl font-semibold text-foreground">Ready to Discover?</h3>
    <p className="mt-2 text-lg text-muted-foreground">
      Select a date range and start your scan to find unmanaged applications.
    </p>
  </motion.div>
);
const LoadingState = () => (
  <div className="space-y-4 p-4">
    {Array.from({ length: 5 }).map((_, i) => (
      <div key={i} className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-lg" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    ))}
  </div>
);
const ResultsTable = ({ data }: { data: AccessReportItem[] }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Hostname</TableHead>
              <TableHead>Last Seen</TableHead>
              <TableHead>First Seen</TableHead>
              <TableHead className="text-right">Unique Users</TableHead>
              <TableHead className="text-right">Total Requests</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id} className="hover:bg-muted/50">
                <TableCell className="font-medium flex items-center gap-2">
                  <Server className="h-4 w-4 text-muted-foreground" />
                  {item.hostname}
                </TableCell>
                <TableCell>{format(new Date(item.lastSeen), 'PP')}</TableCell>
                <TableCell>{format(new Date(item.firstSeen), 'PP')}</TableCell>
                <TableCell className="text-right flex items-center justify-end gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  {item.uniqueUsers.toLocaleString()}
                </TableCell>
                <TableCell className="text-right flex items-center justify-end gap-2">
                  <BarChart2 className="h-4 w-4 text-muted-foreground" />
                  {item.totalRequests.toLocaleString()}
                </TableCell>
                <TableCell className="text-center">
                  <Button variant="outline" size="sm">Define App</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </motion.div>
);
export function HomePage() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -30),
    to: new Date(),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [reportData, setReportData] = useState<AccessReportItem[] | null>(null);
  const handleScan = useCallback(async () => {
    if (!date?.from || !date?.to) {
      toast.error('Please select a valid date range.');
      return;
    }
    setIsLoading(true);
    setReportData(null);
    try {
      const data = await api<AccessReportItem[]>('/api/access/scan');
      setReportData(data);
    } catch (error) {
      toast.error('Failed to fetch access report. Please try again.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [date]);
  return (
    <>
      <ThemeToggle className="fixed top-4 right-4" />
      <main className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-16 md:py-24">
            <div className="text-center animate-fade-in">
              <h1 className="text-5xl font-bold font-display tracking-tight text-foreground sm:text-6xl">
                Access Pathfinder
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
                Discover applications accessed via Cloudflare but not defined in Access.
                Scan your logs to identify and secure your entire application landscape.
              </p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-12 max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-3 items-center gap-4"
            >
              <div className="md:col-span-2">
                <DateRangePicker date={date} setDate={setDate} />
              </div>
              <Button
                size="lg"
                className="h-12 text-base font-semibold w-full transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-0.5"
                onClick={handleScan}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <Search className="mr-2 h-5 w-5" />
                )}
                Scan for Applications
              </Button>
            </motion.div>
            <div className="mt-16">
              <AnimatePresence mode="wait">
                {isLoading && <LoadingState key="loading" />}
                {!isLoading && reportData === null && <EmptyState key="empty" />}
                {!isLoading && reportData !== null && <ResultsTable key="results" data={reportData} />}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>
      <footer className="text-center py-8 text-muted-foreground">
        <p>Built with ❤�� at Cloudflare</p>
      </footer>
      <Toaster richColors />
    </>
  );
}