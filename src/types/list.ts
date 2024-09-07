import { Id } from '../../convex/_generated/dataModel';

export interface IListItem {
  _id: Id<'lists'>;
  _creationTime: number;
  unity_id: string;
  is_favorite?: boolean;
  name: string;
  rate?: string;
  status: string;
  viewed_count?: string;
  imageUrl: string;
  episode?: string;
  season?: string;
  user: Id<'users'>;
}
