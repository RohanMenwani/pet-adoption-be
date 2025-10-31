import Pet from '../models/Pet.model';
import Application from '../models/Application.model';
import User from '../models/User.model';

export async function getDashboardStats() {
  const totalPets = await Pet.countDocuments();
  const availablePets = await Pet.countDocuments({ status: 'available' });
  const adoptedPets = await Pet.countDocuments({ status: 'adopted' });
  const totalApplications = await Application.countDocuments();
  const pendingApplications = await Application.countDocuments({ status: 'applied' });
  const approvedApplications = await Application.countDocuments({ status: 'approved' });
  const rejectedApplications = await Application.countDocuments({ status: 'rejected' });
  const totalUsers = await User.countDocuments();

  return {
    pets: { total: totalPets, available: availablePets, adopted: adoptedPets },
    applications: {
      total: totalApplications,
      pending: pendingApplications,
      approved: approvedApplications,
      rejected: rejectedApplications
    },
    users: { total: totalUsers }
  };
}
