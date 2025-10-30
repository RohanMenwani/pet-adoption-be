import mongoose, { Schema, Document, Types } from 'mongoose';

export type PetStatus = 'available' | 'pending' | 'adopted';

export interface IPet extends Document {
  name: string;
  species: string;
  breed?: string;
  age?: number;
  gender?: string;
  description?: string;
  photos?: string[];
  status: PetStatus;
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
  description: { type: String },
  photos: [{ type: String }],
  status: { type: String, enum: ['available', 'pending', 'adopted'], default: 'available' },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

PetSchema.index({ name: 'text', breed: 'text', species: 'text' });

export default mongoose.model<IPet>('Pet', PetSchema);
