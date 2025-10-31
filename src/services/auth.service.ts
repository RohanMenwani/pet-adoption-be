import User, { IUser } from '../models/User.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SALT_ROUNDS = 10;

export async function registerUser(name: string, email: string, password: string): Promise<IUser> {
  const existing = await User.findOne({ email });
  if (existing) throw new Error('Email already registered');
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const user = new User({ name, email, passwordHash });
  await user.save();
  return user;
}

export function generateToken(user: IUser) {
  const payload = { id: user._id.toString(), role: user.role, email: user.email };
  const secret = process.env.JWT_SECRET || 'devsecret';
  const expiresIn = process.env.JWT_EXPIRES || '7d';
  return jwt.sign(payload,secret, {expiresIn: expiresIn as any});
}

export async function loginUser(email: string, password: string) {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid credentials');
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) throw new Error('Invalid credentials');
  return user;
}

export async function getProfile(userId: string) {
  const user = await User.findById(userId).select('-passwordHash');
  if (!user) throw new Error('User not found');
  return user;
}
