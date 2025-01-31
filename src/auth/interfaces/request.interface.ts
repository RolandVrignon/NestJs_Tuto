export interface RequestWithUser extends Request {
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
  };
} 