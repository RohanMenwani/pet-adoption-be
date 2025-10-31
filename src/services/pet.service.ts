import Pet, { IPet } from '../models/Pet.model';
import { Types } from 'mongoose';

export async function createPet(data: Partial<IPet>) {
  const pet = new Pet(data);
  return pet.save();
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

export async function getPets(query: any, skip = 0, limit = 20) {
  const filter: any = {};

  if (query.q) filter.$text = { $search: query.q };
  if (query.species) filter.species = new RegExp(query.species, 'i');
  if (query.breed) filter.breed = new RegExp(query.breed, 'i');
  if (query.gender) filter.gender = new RegExp(query.gender, 'i');
  if (query.size) filter.size = new RegExp(query.size, 'i');
  if (query.status) filter.status = query.status;
  if (query.age) filter.age = Number(query.age);

  console.log('__filter',{filter, skip, limit});
  
  const total = await Pet.countDocuments(filter);
  const items = await Pet.find(filter)
    .populate('createdBy', 'name email')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
    console.log('__items.length',items.length);
    

  return { total, items };
}

export async function updatePetStatus(id: string, status: 'available' | 'pending' | 'adopted') {
  const pet = await Pet.findById(id);
  if (!pet) throw new Error('Pet not found');
  pet.status = status;
  await pet.save();
  return pet;
}
