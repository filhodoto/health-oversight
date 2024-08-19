import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { useState } from 'react';
import { Button } from './ui/button';
import { CalendarCheck, Trash2 } from 'lucide-react';

interface AppointmentModalProps {
  type: 'schedule' | 'cancel';
}

const AppointmentTooltip = ({ isSchedule }: { isSchedule: boolean }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          // variant="outline"
          size="icon"
          className="border-green-500 p-0 text-green-500"
        >
          {isSchedule ? <CalendarCheck /> : <Trash2 />}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{isSchedule ? 'Schedule appointment' : 'Delete appointment'}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const AppointmentModal = ({ type }: AppointmentModalProps) => {
  const [open, setOpen] = useState(false);
  const isSchedule = type === 'schedule';
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="border-2">
        <AppointmentTooltip isSchedule={isSchedule} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentModal;
