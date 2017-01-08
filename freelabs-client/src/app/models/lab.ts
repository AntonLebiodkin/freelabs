import { UserProfile } from './userprofile';

export class Lab {
  id: string;
  name: string;
  author: UserProfile;
  subject: number;
  description: string;
  proposals: any;
  status: number;
  endDate: Date;
}
