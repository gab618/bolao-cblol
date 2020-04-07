import User from '../models/User';

export default async (req, res, next) => {
  const isAdmin = await User.findOne({
    where: { id: req.userId, is_admin: true },
  });

  if (!isAdmin) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
};
