export interface RacerProfile {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  createdBy: string;
  updatedBy: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date; // Optional since new profiles aren't deleted
  deletedBy: string;
  deletedReason: string;
}