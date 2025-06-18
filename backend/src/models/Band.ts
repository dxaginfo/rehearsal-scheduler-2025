import mongoose, { Document, Schema } from 'mongoose';

// Interface for member document with role
export interface IBandMember {
  user: mongoose.Types.ObjectId;
  role: 'admin' | 'manager' | 'member';
  instruments?: string[];
  joinedAt: Date;
}

// Interface for band document
export interface IBand extends Document {
  name: string;
  description?: string;
  logo?: string;
  coverImage?: string;
  genre?: string[];
  website?: string;
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    youtube?: string;
    spotify?: string;
    soundcloud?: string;
  };
  members: IBandMember[];
  preferredLocations?: {
    name: string;
    address?: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
    notes?: string;
  }[];
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const BandSchema = new Schema<IBand>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a band name'],
      trim: true,
      maxlength: [50, 'Band name cannot be more than 50 characters'],
    },
    description: {
      type: String,
      maxlength: [1000, 'Description cannot be more than 1000 characters'],
    },
    logo: {
      type: String,
    },
    coverImage: {
      type: String,
    },
    genre: {
      type: [String],
    },
    website: {
      type: String,
      validate: {
        validator: (value: string) => {
          if (!value) return true;
          // Simple URL validation
          return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(value);
        },
        message: 'Please provide a valid website URL',
      },
    },
    socialMedia: {
      instagram: String,
      facebook: String,
      twitter: String,
      youtube: String,
      spotify: String,
      soundcloud: String,
    },
    members: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        role: {
          type: String,
          enum: ['admin', 'manager', 'member'],
          default: 'member',
        },
        instruments: {
          type: [String],
        },
        joinedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    preferredLocations: [
      {
        name: {
          type: String,
          required: true,
        },
        address: {
          type: String,
        },
        coordinates: {
          latitude: {
            type: Number,
          },
          longitude: {
            type: Number,
          },
        },
        notes: {
          type: String,
        },
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient querying by member
BandSchema.index({ 'members.user': 1 });

// Create a Band model
export default mongoose.model<IBand>('Band', BandSchema);