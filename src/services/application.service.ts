import Application from '../models/Application.model';
import Pet from '../models/Pet.model';
import { Types } from 'mongoose';

export async function applyToPet(applicantId: string, petId: string, message?: string) {
  if (!Types.ObjectId.isValid(petId)) throw new Error('Invalid pet id');
  // check pet exists and available
  const pet = await Pet.findById(petId);
  if (!pet) throw new Error('Pet not found');
  if (pet.status !== 'available') throw new Error('Pet not available for adoption');
  // unique index prevents duplicates, but check for helpful message
  const existing = await Application.findOne({ pet: petId, applicant: applicantId });
  if (existing) throw new Error('You already applied for this pet');

  const application = new Application({
    pet: petId,
    applicant: applicantId,
    message,
    status: 'applied'
  });
  await application.save();
  return application;
}

export async function getApplicationsForUser(userId: string) {
  return Application.find({ applicant: userId }).populate('pet').sort({ appliedAt: -1 });
}

export async function getAllApplications() {
  return Application.find().populate('pet applicant').sort({ appliedAt: -1 });
}

export async function processApplication(applicationId: string, action: 'approve' | 'reject', adminNote?: string) {
  const app = await Application.findById(applicationId).populate('pet');
  if (!app) throw new Error('Application not found');
  if (app.status !== 'applied') throw new Error('Already processed');

  app.status = action === 'approve' ? 'approved' : 'rejected';
  app.processedAt = new Date();
  app.noteByAdmin = adminNote;
  await app.save();

  if (action === 'approve') {
    // mark pet adopted
    const pet = await Pet.findById(app.pet._id);
    if (pet) {
      pet.status = 'adopted';
      await pet.save();
    }
  }

  return app;
}

export async function getApplicationById(id: string) {
  if (!Types.ObjectId.isValid(id)) throw new Error('Invalid application ID');
  const app = await Application.findById(id)
    .populate('pet')
    .populate('applicant', 'name email role');
  if (!app) throw new Error('Application not found');
  return app;
}

export async function updateApplicationStatus(
  applicationId: string,
  status: 'approved' | 'rejected',
  adminId: string,
  note?: string
) {
  const app = await Application.findById(applicationId).populate('pet');
  if (!app) throw new Error('Application not found');

  if (app.status !== 'applied') throw new Error('Already processed');
  app.status = status;
  app.noteByAdmin = note;
  app.reviewedBy = adminId;
  app.processedAt = new Date();
  await app.save();

  if (status === 'approved' && app.pet) {
    const pet = await Pet.findById(app.pet._id);
    if (pet) {
      pet.status = 'adopted';
      await pet.save();
    }
  }

  return app;
}