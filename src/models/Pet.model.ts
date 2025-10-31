import mongoose, { Schema, Document, Types } from 'mongoose';

export type PetStatus = 'available' | 'pending' | 'adopted';

export interface IPet extends Document {
  name: string;
  species: string;
  breed?: string;
  age?: number;
  gender?: string;
  size?: string;
  description?: string;
  photos?: string[];
  status: PetStatus;
  medicalHistory?: string;
  vaccinated?: boolean;
  neutered?: boolean;
  createdBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const PetSchema = new Schema<IPet>({
  name: { type: String, required: true },
  species: { type: String, required: true },
  breed: { type: String },
  age: { type: Number },
  gender: { type: String },
  size: { type: String },
  description: { type: String },
  photos: [{ type: String }],
  status: { type: String, enum: ['available', 'pending', 'adopted'], default: 'available' },
  medicalHistory: { type: String },
  vaccinated: { type: Boolean, default: false },
  neutered: { type: Boolean, default: false },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

PetSchema.index({ name: 'text', breed: 'text', species: 'text', description: 'text' });

export default mongoose.model<IPet>('Pet', PetSchema);
