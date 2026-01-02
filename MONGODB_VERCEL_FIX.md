# MongoDB Connection Fix for Vercel

## Problem
MongoDB is not connecting on Vercel even though Cloudinary works fine.

## Solution Steps

### Step 1: Update MongoDB Atlas IP Whitelist
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Login to your account
3. Go to **Network Access** (left sidebar)
4. Click **Add IP Address**
5. Select **Allow access from anywhere** (0.0.0.0/0)
   - This allows Vercel's dynamic IPs to connect
6. Click **Confirm**

### Step 2: Verify Environment Variables in Vercel
1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Make sure `MONGO_URI` is set correctly:
   ```
   mongodb+srv://olaatunbikehinde_db_user:tIBlHorK7NZC5Nn5@cluster0.chcuyn9.mongodb.net/dtlive_blog?retryWrites=true&w=majority
   ```
4. **Important**: Make sure the password doesn't have special characters that need URL encoding
5. Click **Save**

### Step 3: Redeploy on Vercel
1. Go to your Vercel project
2. Click **Deployments**
3. Find the latest deployment
4. Click the **...** menu → **Redeploy**
5. Wait for deployment to complete

### Step 4: Test the Connection
1. Visit your site on Vercel
2. Try to create a blog post
3. Check Vercel logs for errors:
   - Click **Deployments** → Latest deployment → **Logs**
   - Look for MongoDB connection messages

## Alternative: Use MongoDB Atlas Connection String Helper

If the above doesn't work:

1. Go to MongoDB Atlas → **Clusters**
2. Click **Connect** on your cluster
3. Select **Drivers** → **Node.js**
4. Copy the connection string
5. Replace `<password>` with your actual password
6. Update in Vercel environment variables

## Common Issues

### Issue: "ECONNREFUSED"
- **Cause**: IP not whitelisted
- **Fix**: Add 0.0.0.0/0 to IP whitelist

### Issue: "Authentication failed"
- **Cause**: Wrong password or special characters
- **Fix**: Check password in MongoDB Atlas → Database Access

### Issue: "Timeout"
- **Cause**: Network connectivity issue
- **Fix**: Check IP whitelist and connection string

## Debugging

Check Vercel logs for detailed error messages:
```
Deployments → Select deployment → Logs → Function logs
```

Look for messages like:
- "MongoDB connected successfully" ✅
- "MongoDB connection error" ❌

## Quick Checklist

- [ ] IP whitelist includes 0.0.0.0/0
- [ ] MONGO_URI environment variable is set in Vercel
- [ ] Connection string has correct password
- [ ] Redeployed after changes
- [ ] Checked Vercel logs for errors
