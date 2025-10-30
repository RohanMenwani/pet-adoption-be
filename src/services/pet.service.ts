import Pet, { IPet } from '../models/Pet.model';
import { Types } from 'mongoose';

export async function createPet(data: Partial<IPet>) {
  const pet = new Pet(data);
  return pet.save();
}

export async function getPets(query: any, skip = 0, limit = 20) {
  // supports text search, filters
  const filter: any = {};
  if (query.species) filter.species = query.species;
  if (query.breed) filter.breed = query.breed;
  if (query.age) filter.age = query.age;
  if (query.status) filter.status = query.status;
  if (query.q) filter.$text = { $search: query.q };
  const total = await Pet.countDocuments(filter);
  const items = await Pet.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit);
  return { total, items };
}

export async function getPetById(id: string) {
  if (!Types.ObjectId.isValid(id)) throw new Error('Invalid id');
  return Pet.findById(id);
}

export async function updatePet(id: string, data: Partial<IPet>) {
  return Pet.findByIdAndUpdate(id, data, { new: true });
}

export async function deletePet(id: string) {
  return Pet.findByIdAndDelete(id);
}
