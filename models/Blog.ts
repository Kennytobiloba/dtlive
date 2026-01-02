import mongoose, { Document, Schema } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  venue: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  excerpt: {
    type: String,
    required: false, // Make optional for existing blogs
    trim: true,
    maxlength: [500, 'Excerpt cannot be more than 500 characters'],
    default: ""
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true,
    maxlength: [100, 'Author name cannot be more than 100 characters']
  },
  date: {
    type: String,
    required: false, // Make optional for existing blogs
    default: ""
  },
  venue: {
    type: String,
    required: false, // Make optional for existing blogs
    trim: true,
    maxlength: [200, 'Venue cannot be more than 200 characters'],
    default: ""
  },
  image: {
    type: String,
    required: true, // Make optional for existing blogs
    trim: true,
    default: "/placeholder.svg"
  }
}, {
  timestamps: true
});

export default mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);