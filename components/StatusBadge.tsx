import Image from 'next/image';
import clsx from 'clsx';
import { STATUS_ICON } from '@/constants';
import { getColorByStatus } from '@/lib/utils';

const StatusBadge = ({ status }: { status: Status }) => {
  const color = getColorByStatus(status);

  return (
    <div className={clsx('status-badge', `bg-${color}-600`)}>
      <Image
        src={STATUS_ICON[status]}
        height={32}
        width={32}
        alt="icon"
        className="size-3 w-fit"
      />

      <p className={clsx('text-12-semibold', `text-${color}-500`)}>{status}</p>
    </div>
  );
};

export default StatusBadge;
