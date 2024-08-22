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
import { CalendarCheck, CircleX } from 'lucide-react';
import AppointmentForm from './forms/AppointmentForm';
import { Appointment } from '@/types/appwrite.types';

interface AppointmentModalProps {
  type: 'schedule' | 'cancel';
  userId: string;
  patientId: string;
  appointment?: Appointment;
}

const AppointmentTooltip = ({
  type,
}: {
  type: AppointmentModalProps['type'];
}) => {
  const color = type === 'schedule' ? 'text-green-500' : 'text-red-400';

  const iconStyles = `${color} h-[18px] w-[18px]`;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {type === 'schedule' ? (
            <CalendarCheck className={iconStyles} />
          ) : (
            <CircleX className={iconStyles} />
          )}
        </TooltipTrigger>
        <TooltipContent className="border-dark-300 bg-dark-400">
          {/* <p>{isSchedule ? 'Schedule appointment' : 'Cancel appointment'}</p> */}
          <p>{`${type} appointment`}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const AppointmentModal = ({
  userId,
  patientId,
  type,
  appointment,
}: AppointmentModalProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/* Wrap trigger in span so the span becomes trigger of the click instead fo tooltip provider */}
        <span className="flex cursor-pointer">
          <AppointmentTooltip type={type} />
        </span>
      </DialogTrigger>
      <DialogContent className="shad-dialog sm:max-w-md">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle className="capitalize">{type} Appointment</DialogTitle>
          <DialogDescription>
            Please fill in the following details to {type} appointment.
          </DialogDescription>
        </DialogHeader>
        <AppointmentForm
          userId={userId}
          patientId={patientId}
          type={type}
          appointment={appointment}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentModal;
