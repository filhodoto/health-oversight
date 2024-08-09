import { ICONS_URL, STATUS_ICON } from '@/constants';
import StatCard from '../StatCard';

const AdminStats = ({
  appointmentStatus,
}: {
  appointmentStatus: Record<Status, number>;
}) => {
  return (
    <section className="admin-stat">
      {Object.entries(appointmentStatus).map(([key, value]) => {
        // Choose specific icon for scheduled, if not use icon with type/key name
        const icon =
          key === 'scheduled'
            ? `${ICONS_URL}/appointments.svg`
            : STATUS_ICON[key as Status];
        return (
          <StatCard
            key={key}
            type={key as Status}
            icon={icon}
            count={value}
            label={`Total number of ${value} appointments`}
          />
        );
      })}
    </section>
  );
};

export default AdminStats;
