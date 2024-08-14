import Image from 'next/image';
import clsx from 'clsx';
import { getColorByStatus } from '@/lib/utils';

interface StatCardProps {
  type: 'scheduled' | 'pending' | 'cancelled';
  icon: string;
  count: number;
  label: string;
}

const StatCard = ({ icon, count, label, type }: StatCardProps) => {
  // If type scheduled return yellow because "getColorByStatus" would return green.
  const color = type === 'scheduled' ? 'yellow' : getColorByStatus(type);
  return (
    <div className={clsx('stat-card', `border-${color}-500`)}>
      <div className="flex items-center gap-4">
        <Image
          src={icon}
          height={32}
          width={32}
          alt="icon"
          className="size-8 w-fit"
        />
        <h2 className="text-32-bold text-white">{count}</h2>
      </div>
      <p className="text-14-regular">{label}</p>
    </div>
  );
};

export default StatCard;
