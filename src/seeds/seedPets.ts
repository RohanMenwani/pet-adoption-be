// scripts/seedPets.js
import mongoose from 'mongoose';
import Pet from '../models/Pet.model';

const petsData = [
  {
  "name": "Max",
  "species": "Dog",
  "breed": "Labrador Retriever",
  "age": 3,
  "gender": "male",
  "size": "large",
  "description": "Energetic and loyal Labrador with a gentle temperament. Loves swimming and outdoor activities. Great family dog.",
  "photos": [
    "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=600&fit=crop"
  ],
  "status": "available",
  "medicalHistory": "Vaccinated, neutered. Excellent health. All vaccinations up to date.",
  "vaccinated": true,
  "neutered": true
}
,
{
  "name": "Rex",
  "species": "Dog",
  "breed": "German Shepherd",
  "age": 4,
  "gender": "male",
  "size": "large",
  "description": "Intelligent and protective German Shepherd. Well-trained, obedient, and perfect for experienced dog owners. Excellent guard dog.",
  "photos": [
    "https://images.unsplash.com/photo-1568572933382-74d440641117?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1568572933382-74d440641117?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1568572933382-74d440641117?w=800&h=600&fit=crop"
  ],
  "status": "available",
  "medicalHistory": "Fully vaccinated, neutered. All health checks passed.",
  "vaccinated": true,
  "neutered": true
}
,
{
  "name": "Charlie",
  "species": "Dog",
  "breed": "Beagle",
  "age": 2,
  "gender": "female",
  "size": "small",
  "description": "Cute and playful Beagle with a great nose for tracking. Loves treats and playtime. Perfect for families with children.",
  "photos": [
    "https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=800&h=600&fit=crop"
  ],
  "status": "available",
  "medicalHistory": "Vaccinated. Minor ear issues resolved. Overall healthy.",
  "vaccinated": true,
  "neutered": false
}

,{
  "name": "Sophie",
  "species": "Dog",
  "breed": "Standard Poodle",
  "age": 1,
  "gender": "female",
  "size": "medium",
  "description": "Intelligent and elegant Poodle. Very friendly and loves being around people. Requires regular grooming. Great companion dog.",
  "photos": [
    "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=800&h=600&fit=crop"
  ],
  "status": "available",
  "medicalHistory": "Vaccinated. Excellent health. Recently groomed.",
  "vaccinated": true,
  "neutered": false
}

,
{
  "name": "Tiger",
  "species": "Cat",
  "breed": "Tabby",
  "age": 2,
  "gender": "male",
  "size": "small",
  "description": "Playful and affectionate orange tabby cat. Loves interactive play and cozy naps. Perfect for apartment living. Very vocal and friendly.",
  "photos": [
    "https://images.unsplash.com/photo-1574158622682-e40c69881006?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1574158622682-e40c69881006?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1574158622682-e40c69881006?w=800&h=600&fit=crop"
  ],
  "status": "available",
  "medicalHistory": "Vaccinated, neutered. Microchipped. Excellent health.",
  "vaccinated": true,
  "neutered": true
}

,

{
  "name": "Midnight",
  "species": "Cat",
  "breed": "Domestic Shorthair",
  "age": 3,
  "gender": "female",
  "size": "small",
  "description": "Elegant black cat with striking green eyes. Calm and independent but loves cuddles when she wants them. Great for quiet homes.",
  "photos": [
    "https://images.unsplash.com/photo-1529778873920-4da0926926d5?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1529778873920-4da0926926d5?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1529778873920-4da0926926d5?w=800&h=600&fit=crop"
  ],
  "status": "available",
  "medicalHistory": "Fully vaccinated, spayed. No health concerns.",
  "vaccinated": true,
  "neutered": true
}

,
{
  "name": "Luna",
  "species": "Cat",
  "breed": "Siamese",
  "age": 1,
  "gender": "female",
  "size": "small",
  "description": "Beautiful Siamese cat with blue eyes and pointed markings. Extremely social and loves attention. Very talkative and playful.",
  "photos": [
    "https://images.unsplash.com/photo-1566299857202-d1c5a0d61eb6?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1566299857202-d1c5a0d61eb6?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1566299857202-d1c5a0d61eb6?w=800&h=600&fit=crop"
  ],
  "status": "available",
  "medicalHistory": "Vaccinated. Excellent health.",
  "vaccinated": true,
  "neutered": false
}
,
{
  "name": "Mittens",
  "species": "Cat",
  "breed": "Mixed",
  "age": 4,
  "gender": "female",
  "size": "small",
  "description": "Sweet and gentle white cat with ginger patches. Very affectionate and loves being held. Calm demeanor, perfect for families.",
  "photos": [
    "https://images.unsplash.com/photo-1603407830022-a4fbf1e3e5d6?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1603407830022-a4fbf1e3e5d6?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1603407830022-a4fbf1e3e5d6?w=800&h=600&fit=crop"
  ],
  "status": "available",
  "medicalHistory": "Spayed, vaccinated. Senior cat, overall good health.",
  "vaccinated": true,
  "neutered": true
}
,
{
  "name": "Snowball",
  "species": "Rabbit",
  "breed": "Holland Lop",
  "age": 1,
  "gender": "female",
  "size": "small",
  "description": "Adorable white Holland Lop rabbit. Very gentle and friendly. Loves vegetables and hay. Great starter pet for children.",
  "photos": [
    "https://images.unsplash.com/photo-1585110396000-c9ffd4d4b3f0?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1585110396000-c9ffd4d4b3f0?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1585110396000-c9ffd4d4b3f0?w=800&h=600&fit=crop"
  ],
  "status": "available",
  "medicalHistory": "Healthy. Regular hay diet. No health issues.",
  "vaccinated": false,
  "neutered": false
}

,
{
  "name": "Pepper",
  "species": "Rabbit",
  "breed": "Flemish Giant",
  "age": 2,
  "gender": "male",
  "size": "large",
  "description": "Large and gentle Flemish Giant rabbit. Calm personality, great for families. Enjoys free roaming and social interaction.",
  "photos": [
    "https://images.unsplash.com/photo-1585518701491-ce7426fbdec9?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1585518701491-ce7426fbdec9?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1585518701491-ce7426fbdec9?w=800&h=600&fit=crop"
  ],
  "status": "available",
  "medicalHistory": "Vaccinated against common diseases. Excellent health.",
  "vaccinated": true,
  "neutered": true
}

,
{
  "name": "Daisy",
  "species": "Rabbit",
  "breed": "Rex",
  "age": 1,
  "gender": "female",
  "size": "medium",
  "description": "Cute gray Rex rabbit with soft fur. Friendly and curious. Loves to hop around and explore. Good with gentle handling.",
  "photos": [
    "https://images.unsplash.com/photo-1585512221958-8447ea50ae14?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1585512221958-8447ea50ae14?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1585512221958-8447ea50ae14?w=800&h=600&fit=crop"
  ],
  "status": "available",
  "medicalHistory": "Healthy. Regular diet. No medical concerns.",
  "vaccinated": false,
  "neutered": false
}

,
{
  "name": "Sunny",
  "species": "Bird",
  "breed": "Cockatiel",
  "age": 3,
  "gender": "female",
  "size": "small",
  "description": "Beautiful yellow and white cockatiel. Very social and affectionate. Can whistle simple tunes. Loves millet treats.",
  "photos": [
    "https://images.unsplash.com/photo-1535856261915-bced776dacfa?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1535856261915-bced776dacfa?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1535856261915-bced776dacfa?w=800&h=600&fit=crop"
  ],
  "status": "available",
  "medicalHistory": "Vaccinated. Excellent health. Regular wing clipping.",
  "vaccinated": true,
  "neutered": false
}
,
{
  "name": "Coco",
  "species": "Guinea Pig",
  "breed": "Peruvian",
  "age": 1,
  "gender": "female",
  "size": "small",
  "description": "Friendly and social guinea pig. Loves vegetables and hay. Very cute and interactive. Great for children. Enjoys being held.",
  "photos": [
    "https://images.unsplash.com/photo-1590080876299-9ae4cd37763f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1590080876299-9ae4cd37763f?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1590080876299-9ae4cd37763f?w=800&h=600&fit=crop"
  ],
  "status": "available",
  "medicalHistory": "Healthy. Good diet. No health concerns.",
  "vaccinated": false,
  "neutered": false
}
,
{
  "name": "Nibbles",
  "species": "Hamster",
  "breed": "Syrian Hamster",
  "age": 1,
  "gender": "male",
  "size": "small",
  "description": "Active and curious Syrian hamster. Loves his wheel and tubes. Mainly nocturnal. Easy to care for. Perfect starter pet.",
  "photos": [
    "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=600&fit=crop"
  ],
  "status": "available",
  "medicalHistory": "Healthy. Active. No medical issues.",
  "vaccinated": false,
  "neutered": false
}
,

];

async function seedPets() {
  try {
    await mongoose.connect('mongodb://localhost:27017/pet-adoption');
    // await Pet.deleteMany({});
    const result = await Pet.insertMany(petsData);
    console.log(`✅ ${result.length} pets added!`);
    mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

seedPets();
