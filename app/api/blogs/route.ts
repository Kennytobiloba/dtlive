import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';

// GET /api/blogs - Get all blogs
export async function GET() {
  try {
    await connectDB();
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      data: blogs,
      message: 'Blogs fetched successfully'
    });
  } catch (error) {
    console.error('Get blogs error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { title, excerpt, content, author, date, venue, image } = body;
     console.log("newblog", body)

    // Only require the essential fields
    if (!title || !content || !author) {
      return NextResponse.json(
        { success: false, message: 'Title, content, and author are required' },
        { status: 400 }
      );
    }

    const newBlog = await Blog.create({
      title,
      excerpt: excerpt || "",
      content,
      author,
      date,
      venue,
      image: image || "/placeholder.svg"
    });
    console.log(" new blog", newBlog)
   

    return NextResponse.json({
      success: true,
      data: newBlog,
      message: 'Blog created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Create blog error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create blog' },
      { status: 500 }
    );
  }
}