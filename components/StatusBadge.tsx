import Image from 'next/image';
import { STATUS_ICON } from '@/constants';
import { getColorByStatus } from '@/lib/utils';
import clsx from 'clsx';

const StatusBadge = ({ status }: { status: Status }) => {
  const color = getColorByStatus(status);

  return (
    <div
      // * NOTE:: clsx usage is not DRY. Unfortunately using variables is giving unreliable results so we're using clsx in some places
      className={clsx('status-badge', {
        'border-blue-500 bg-blue-600': status === 'pending',
        'border-green-500 bg-green-600': status === 'scheduled',
        'border-red-500 bg-red-600': status === 'cancelled',
      })}
    >
      <Image
        src={STATUS_ICON[status]}
        height={32}
        width={32}
        alt="icon"
        className="size-3 w-fit"
      />

      <p className={`text-12-semibold text-${color}-500`}>{status}</p>
    </div>
  );
};

export default StatusBadge;
