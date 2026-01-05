import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';
import mongoose from 'mongoose';

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Handle OPTIONS requests
export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

// GET /api/blogs or /api/blogs?id=xxx - Get all blogs or a single blog by ID
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    // If id is provided, get single blog
    if (id) {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json(
          { success: false, message: 'Invalid blog ID' },
          { status: 400 }
        );
      }
      
      const blog = await Blog.findById(id);
      
      if (!blog) {
        return NextResponse.json(
          { success: false, message: 'Blog not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json({
        success: true,
        data: blog,
        message: 'Blog fetched successfully'
      });
    }
    
    // Otherwise get all blogs
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

// PUT - Update a blog (use query param: ?id=xxx)
export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Blog ID is required' },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: 'Invalid blog ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { title, excerpt, content, author, date, venue, image } = body;

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        ...(title && { title }),
        ...(excerpt && { excerpt }),
        ...(content && { content }),
        ...(author && { author }),
        ...(date && { date }),
        ...(venue && { venue }),
        ...(image && { image }),
      },
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      return NextResponse.json(
        { success: false, message: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedBlog,
      message: 'Blog updated successfully'
    });
  } catch (error) {
    console.error('Update blog error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update blog' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a blog (use query param: ?id=xxx)
export async function DELETE(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Blog ID is required' },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: 'Invalid blog ID' },
        { status: 400 }
      );
    }

    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return NextResponse.json(
        { success: false, message: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: deletedBlog,
      message: 'Blog deleted successfully'
    });
  } catch (error) {
    console.error('Delete blog error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete blog' },
      { status: 500 }
    );
  }
}
