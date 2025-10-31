import mongoose, { Schema, Document } from 'mongoose';

export type ApplicationStatus = 'applied' | 'approved' | 'rejected';

export interface IApplication extends Document {
  pet: mongoose.Types.ObjectId;
  applicant: mongoose.Types.ObjectId;
  message?: string;
  status: ApplicationStatus;
  appliedAt: Date;
  processedAt?: Date;
  noteByAdmin?: string;
}

const ApplicationSchema = new Schema<IApplication>({
  pet: { type: Schema.Types.ObjectId, ref: 'Pet', required: true },
  applicant: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String },
  status: { type: String, enum: ['applied', 'approved', 'rejected'], default: 'applied' },
  appliedAt: { type: Date, default: () => new Date() },
  processedAt: { type: Date },
  noteByAdmin: { type: String }
}, { timestamps: true });

ApplicationSchema.index({ pet: 1, applicant: 1 }, { unique: true }); // one application per user per pet

export default mongoose.model<IApplication>('Application', ApplicationSchema);

//ApplicationSchema adds a unique compound index to prevent duplicate applications by the same user for the same pet.