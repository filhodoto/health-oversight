import Image from 'next/image';
import clsx from 'clsx';

interface StatCardProps {
  type: 'scheduled' | 'pending' | 'cancelled';
  icon: string;
  count: number;
  label: string;
}

const StatCard = ({ icon, count, label, type }: StatCardProps) => {
  return (
    <div
      className={clsx('stat-card', {
        'border-yellow-300': type === 'scheduled',
        'border-blue-500': type === 'pending',
        'border-red-800': type === 'cancelled',
      })}
    >
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
