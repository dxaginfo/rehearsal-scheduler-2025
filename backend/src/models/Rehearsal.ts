import mongoose, { Document, Schema } from 'mongoose';

// Interface for rehearsal document
export interface IAttendee {
  user: mongoose.Types.ObjectId;
  status: 'confirmed' | 'declined' | 'pending';
  checkedIn: boolean;
  notes?: string;
}

export interface IRehearsalItem {
  title: string;
  description?: string;
  duration: number; // in minutes
  completed: boolean;
}

export interface IRehearsal extends Document {
  title: string;
  band: mongoose.Types.ObjectId;
  location: {
    name: string;
    address?: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  startTime: Date;
  endTime: Date;
  isRecurring: boolean;
  recurrencePattern?: {
    frequency: 'daily' | 'weekly' | 'biweekly' | 'monthly';
    interval: number;
    endDate?: Date;
    daysOfWeek?: number[]; // 0 = Sunday, 1 = Monday, etc.
  };
  attendees: IAttendee[];
  agenda: IRehearsalItem[];
  notes?: string;
  files?: {
    name: string;
    url: string;
    type: string;
    uploadedBy: mongoose.Types.ObjectId;
    uploadedAt: Date;
  }[];
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const RehearsalSchema = new Schema<IRehearsal>(
  {
    title: {
      type: String,
      required: [true, 'Please provide a rehearsal title'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    band: {
      type: Schema.Types.ObjectId,
      ref: 'Band',
      required: [true, 'Please provide a band'],
    },
    location: {
      name: {
        type: String,
        required: [true, 'Please provide a location name'],
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
    },
    startTime: {
      type: Date,
      required: [true, 'Please provide a start time'],
    },
    endTime: {
      type: Date,
      required: [true, 'Please provide an end time'],
    },
    isRecurring: {
      type: Boolean,
      default: false,
    },
    recurrencePattern: {
      frequency: {
        type: String,
        enum: ['daily', 'weekly', 'biweekly', 'monthly'],
      },
      interval: {
        type: Number,
        default: 1,
      },
      endDate: {
        type: Date,
      },
      daysOfWeek: {
        type: [Number],
        validate: {
          validator: (values: number[]) => {
            return values.every(value => value >= 0 && value <= 6);
          },
          message: 'Days of week must be between 0 (Sunday) and 6 (Saturday)',
        },
      },
    },
    attendees: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        status: {
          type: String,
          enum: ['confirmed', 'declined', 'pending'],
          default: 'pending',
        },
        checkedIn: {
          type: Boolean,
          default: false,
        },
        notes: {
          type: String,
        },
      },
    ],
    agenda: [
      {
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
        },
        duration: {
          type: Number, // in minutes
          default: 15,
        },
        completed: {
          type: Boolean,
          default: false,
        },
      },
    ],
    notes: {
      type: String,
    },
    files: [
      {
        name: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          required: true,
        },
        uploadedBy: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        uploadedAt: {
          type: Date,
          default: Date.now,
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

// Index for efficient querying by band and date range
RehearsalSchema.index({ band: 1, startTime: 1 });

export default mongoose.model<IRehearsal>('Rehearsal', RehearsalSchema);