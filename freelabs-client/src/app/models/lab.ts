import { UserProfile } from './userprofile';

export class Lab {
  name: string;
  author: UserProfile;
  subject: number;
  description: string;
  proposals: any;
  status: number;
  endDate: Date;
}
