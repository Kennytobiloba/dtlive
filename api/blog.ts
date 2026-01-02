export const createBlog = async (blogData:any) => {
  try {
    const response = await fetch("http://localhost:3000/api/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blogData),
    });

    const result = await response.json();
    
    if (result.success) {
      return result;
    } else {
      throw new Error(result.message || 'Create failed');
    }
  } catch (error) {
    console.error("Create blog error:", error);
    throw error;
  }
};


export const getBlogs = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/blogs");
    const result = await response.json();
    
    if (result.success) {
      return result;
    } else {
      throw new Error(result.message || 'Failed to fetch blogs');
    }
  } catch (error) {
    console.error("Get blogs error:", error);
    throw error;
  }
};

export const getBlogById = async (id:any) => {
  try {
    const response = await fetch(`http://localhost:3000/api/blogs/${id}`);
    const result = await response.json();
    
    if (result.success) {
      return result;
    } else {
      throw new Error(result.message || 'Failed to fetch blog');
    }
  } catch (error) {
    console.error("Get blog error:", error);
    throw error;
  }
};

export const updateBlog = async (id:any, updatedData:any) => {
  try {
    const response = await fetch(`http://localhost:3000/api/blogs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    const result = await response.json();
    
    if (result.success) {
      return result;
    } else {
      throw new Error(result.message || 'Update failed');
    }
  } catch (error) {
    console.error("Update blog error:", error);
    throw error;
  }
};

export const deleteBlog = async (id:any) => {
  try {
    const response = await fetch(`http://localhost:3000/api/blogs/${id}`, {
      method: "DELETE",
    });

    const result = await response.json();
    
    if (result.success) {
      return result;
    } else {
      throw new Error(result.message || 'Delete failed');
    }
  } catch (error) {
    console.error("Delete blog error:", error);
    throw error;
  }
};


