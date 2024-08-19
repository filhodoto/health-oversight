'use client';

import { ColumnDef } from '@tanstack/react-table';
import { DOCTORS } from '@/constants';
import StatusBadge from '../StatusBadge';
import { formatDateTime } from '@/lib/utils';
import { Appointment } from '@/types/appwrite.types';
import Image from 'next/image';
import AppointmentModal from '../AppointmentModal';

/* NOTE:
 * Columns are where you define the core of what your table will look like.
 * They define the data that will be displayed, how it will be formatted, sorted and filtered.
 * */

export const columns: ColumnDef<Appointment>[] = [
  {
    header: '#',
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },
  {
    accessorKey: 'patient',
    header: 'Patient',
    cell: ({ row }) => {
      const { patient } = row.original;
      return <p className="text-14-medium">{patient.name}</p>;
    },
  },
  {
    accessorKey: 'schedule',
    header: 'Appointment',
    cell: ({ row }) => (
      <p className="text-14-regular min-w-[100px]">
        {formatDateTime(row.original.schedule).dateTime}
      </p>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
  {
    accessorKey: 'primaryPhysician',
    header: 'Doctor',
    cell: ({ row }) => {
      const doctor = DOCTORS.find(
        (doctor) => doctor.name === row.original.primaryPhysician,
      );

      if (!doctor) return <p>No Dr.</p>;

      return (
        <div className="flex items-center gap-3">
          <Image
            src={doctor.image}
            className="size-8"
            height={30}
            width={30}
            alt="doctor"
          />
          <p className="whitespace-nowrap">Dr. {doctor.name}</p>
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: () => <div className="actions">Actions</div>,
    cell: () => {
      return (
        <div className="flex items-center gap-3">
          <AppointmentModal type="schedule" />
          <AppointmentModal type="cancel" />
        </div>
      );
    },
  },
];
