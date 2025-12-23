import { NextRequest, NextResponse } from 'next/server';

// This would be your database in a real app
// For now, we'll import the dummy data (in a real app, you'd use a database)
let blogs = [
  {
    id: '1',
    title: 'Getting Started with Jazz',
    content: 'Jazz is a music genre that originated in the African-American communities...',
    author: 'John Doe',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'The Art of Improvisation',
    content: 'Improvisation is at the heart of jazz music...',
    author: 'Jane Smith',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// GET /api/blogs/[id] - Get a single blog by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const blog = blogs.find(b => b.id === id);

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
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch blog' },
      { status: 500 }
    );
  }
}

// PUT /api/blogs/[id] - Update a blog
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { title, content, author } = body;

    const blogIndex = blogs.findIndex(b => b.id === id);

    if (blogIndex === -1) {
      return NextResponse.json(
        { success: false, message: 'Blog not found' },
        { status: 404 }
      );
    }

    // Update the blog
    blogs[blogIndex] = {
      ...blogs[blogIndex],
      title: title || blogs[blogIndex].title,
      content: content || blogs[blogIndex].content,
      author: author || blogs[blogIndex].author,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: blogs[blogIndex],
      message: 'Blog updated successfully'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to update blog' },
      { status: 500 }
    );
  }
}

// DELETE /api/blogs/[id] - Delete a blog
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const blogIndex = blogs.findIndex(b => b.id === id);

    if (blogIndex === -1) {
      return NextResponse.json(
        { success: false, message: 'Blog not found' },
        { status: 404 }
      );
    }

    const deletedBlog = blogs.splice(blogIndex, 1)[0];

    return NextResponse.json({
      success: true,
      data: deletedBlog,
      message: 'Blog deleted successfully'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to delete blog' },
      { status: 500 }
    );
  }
}