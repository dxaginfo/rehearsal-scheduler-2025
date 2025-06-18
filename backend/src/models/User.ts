import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';

// Interface for user document
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone?: string;
  profileImage?: string;
  instruments?: string[];
  preferences: {
    notificationSettings: {
      email: boolean;
      push: boolean;
    };
    colorTheme: string;
  };
  externalCalendars?: {
    provider: string;
    accountId: string;
    accessToken: string;
    refreshToken: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
      maxlength: [50, 'Name cannot be more than 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: 'Please provide a valid email',
      },
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [8, 'Password must be at least 8 characters'],
      select: false,
    },
    phone: {
      type: String,
      validate: {
        validator: (value: string) => {
          if (!value) return true;
          return validator.isMobilePhone(value);
        },
        message: 'Please provide a valid phone number',
      },
    },
    profileImage: {
      type: String,
    },
    instruments: {
      type: [String],
      default: [],
    },
    preferences: {
      notificationSettings: {
        email: {
          type: Boolean,
          default: true,
        },
        push: {
          type: Boolean,
          default: true,
        },
      },
      colorTheme: {
        type: String,
        default: 'light',
      },
    },
    externalCalendars: [
      {
        provider: {
          type: String,
          required: true,
        },
        accountId: {
          type: String,
          required: true,
        },
        accessToken: {
          type: String,
          required: true,
        },
        refreshToken: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', UserSchema);