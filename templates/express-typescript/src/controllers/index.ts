import { Request, Response } from 'express';

const hello = async (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Hello!',
  });
};

export { hello };
