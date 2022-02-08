import { Entry } from './entry.interface';

export interface Journal {
  id?: string;
  title: string;
  type: 'private' | 'public';
  createdAt?: string;
  updatedAt?: string;
  userId?: string;
  entryIds: string[] | null;
  entries?: Entry[];
}
