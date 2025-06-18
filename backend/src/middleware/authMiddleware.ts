import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

// Interface for decoded JWT token
interface DecodedToken {
  id: string;
  iat: number;
  exp: number;
}

// Middleware to protect routes
export const protect = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  let token;

  // Check if token exists in Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'default_secret_change_this'
      ) as DecodedToken;

      // Get user from the token
      const user = await User.findById(decoded.id).select('-password');

      if (!user) {
        res.status(401).json({ message: 'Not authorized, user not found' });
        return;
      }

      // Add user to request object
      (req as any).user = user;
      next();
    } catch (error) {
      console.error('Authentication error:', error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Middleware to restrict to admin users
export const admin = (req: Request, res: Response, next: NextFunction): void => {
  if ((req as any).user && (req as any).user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as an admin' });
  }
};

// Middleware to check band membership
export const bandMember = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const bandId = req.params.bandId || req.body.bandId;
    const userId = (req as any).user._id;

    if (!bandId) {
      res.status(400).json({ message: 'Band ID is required' });
      return;
    }

    // Check if user is a member of the band
    const band = await require('../models/Band').default.findOne({
      _id: bandId,
      'members.user': userId,
    });

    if (!band) {
      res.status(403).json({ message: 'Not authorized, not a member of this band' });
      return;
    }

    next();
  } catch (error) {
    console.error('Band membership check error:', error);
    res.status(500).json({ message: 'Server error during authorization check' });
  }
};

// Middleware to check band admin role
export const bandAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const bandId = req.params.bandId || req.body.bandId;
    const userId = (req as any).user._id;

    if (!bandId) {
      res.status(400).json({ message: 'Band ID is required' });
      return;
    }

    // Check if user is an admin of the band
    const band = await require('../models/Band').default.findOne({
      _id: bandId,
      members: {
        $elemMatch: {
          user: userId,
          role: 'admin',
        },
      },
    });

    if (!band) {
      res.status(403).json({ message: 'Not authorized, not an admin of this band' });
      return;
    }

    next();
  } catch (error) {
    console.error('Band admin check error:', error);
    res.status(500).json({ message: 'Server error during authorization check' });
  }
};