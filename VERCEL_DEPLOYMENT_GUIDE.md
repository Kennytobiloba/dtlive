# Vercel Deployment Guide - DTLIVE

## Current Issues & Fixes Applied

### Issue 1: "Failed to fetch" Error
**Problem**: API calls using `http://localhost:3000` don't work on Vercel
**Fix Applied**: Changed all API calls to use relative URLs (`/api/...`)

### Issue 2: MongoDB Connection Not Working
**Problem**: MongoDB Atlas IP whitelist blocks Vercel's dynamic IPs
**Fix Required**: See MongoDB Setup section below

---

## Step-by-Step Deployment Guide

### 1. MongoDB Atlas Setup (CRITICAL)

**This is the main issue preventing blogs from loading!**

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Login with your account
3. Click **Network Access** (left sidebar)
4. Click **Add IP Address**
5. Select **Allow access from anywhere** (0.0.0.0/0)
   - ⚠️ This is required for Vercel's dynamic IPs
6. Click **Confirm**

### 2. Vercel Environment Variables

1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Add these variables:

```
MONGO_URI=mongodb+srv://olaatunbikehinde_db_user:tIBlHorK7NZC5Nn5@cluster0.chcuyn9.mongodb.net/dtlive_blog?retryWrites=true&w=majority

CLOUDINARY_CLOUD_NAME=dkocpumx7
CLOUDINARY_API_KEY=965277727873862
CLOUDINARY_API_SECRET=6xKLifFOpYPBanHW2jRXvAExoDc
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dkocpumx7

EMAIL_USER=olaatunbikehinde@gmail.com
EMAIL_PASS=dkhx jiuk alno sbxm
EMAIL_TO=olaatunbikehinde@gmail.com
```

4. Click **Save**

### 3. Redeploy on Vercel

1. Go to **Deployments**
2. Find the latest deployment
3. Click the **...** menu → **Redeploy**
4. Wait for deployment to complete

### 4. Test the Connection

**Test Blog Loading:**
1. Visit your site
2. Scroll to "Latest Events & Updates"
3. Should show blog posts (or "No events found" if no blogs created)

**Test Contact Form:**
1. Scroll to contact section
2. Fill out form and submit
3. Should see success toast notification
4. Check your email for the booking request

**Test Image Upload:**
1. Go to `/admin/create`
2. Try uploading an image
3. Should show preview and upload to Cloudinary

---

## Troubleshooting

### Blogs Still Not Loading?

**Check Vercel Logs:**
1. Go to **Deployments** → Latest deployment
2. Click **Logs** tab
3. Look for MongoDB connection messages

**Expected Success Message:**
```
MongoDB connected successfully
```

**Expected Error Messages:**
```
MongoDB connection error: [error details]
```

### MongoDB Connection Errors

| Error | Cause | Fix |
|-------|-------|-----|
| ECONNREFUSED | IP not whitelisted | Add 0.0.0.0/0 to IP whitelist |
| Authentication failed | Wrong password | Check password in MongoDB Atlas |
| Timeout | Network issue | Verify connection string |

### Email Not Sending?

1. Check Gmail app password is correct
2. Verify EMAIL_USER and EMAIL_PASS in Vercel
3. Check Vercel logs for email errors

### Images Not Uploading?

1. Verify Cloudinary credentials in Vercel
2. Check Cloudinary dashboard for upload limits
3. Ensure file size < 5MB

---

## Quick Checklist

- [ ] MongoDB IP whitelist includes 0.0.0.0/0
- [ ] All environment variables set in Vercel
- [ ] Redeployed after changes
- [ ] Checked Vercel logs for errors
- [ ] Tested blog loading
- [ ] Tested contact form
- [ ] Tested image upload

---

## Local Development

To test locally before deploying:

```bash
npm run dev
```

Visit `http://localhost:3000` and test all features.

---

## Support

If issues persist:
1. Check Vercel logs for specific error messages
2. Verify all environment variables are set
3. Ensure MongoDB IP whitelist is correct
4. Try redeploying again
