# 🚀 Comprehensive Setup & Deployment Guide

This guide provides step-by-step, "non-technical" instructions to get your portfolio fully operational, from local development to production.

---

## 1. 🗄️ Supabase Setup (Database & Auth)

Supabase provides your user authentication and the database for your projects.

### Step 1: Create your Project

1.  Go to [supabase.com](https://supabase.com) and sign in.
2.  Click the **"New Project"** button.
3.  Select an **Organization**.
4.  **Name**: `Neville Portfolio v3`
5.  **Database Password**: Create a secure password (store it safely).
6.  **Region**: Select the one closest to you (e.g., `EU (Frankfurt)` or `US East`).
7.  **Pricing Plan**: Ensure "Free" is selected.
8.  Click **"Create new project"** and wait ~2 minutes for initialization.

### Step 2: Obtain Credentials

1.  Once initialized, click the **Project Settings** (gear icon) at the very bottom of the left sidebar.
2.  Click on **"API"** under the "Configuration" heading.
3.  Copy the **URL** (Project URL) into your `.env.local`.
4.  Copy the **anon** (public) key into your `.env.local`.

### Step 3: Create your Admin User

1.  Click on **Authentication** (user/lock icon) in the left sidebar.
2.  In the "Users" tab, click the blue **"Add user"** button at the top right.
3.  Select **"Create new user"**.
4.  Enter your email and create a password. This will be your login for the `/admin` dashboard.
5.  Toggle **"Auto-confirm user"** ON so you don't have to check your email.

---

## 2. 📧 Resend Setup (Contact Form)

Resend handles sending the emails from your contact form to your inbox.

1.  Go to [resend.com](https://resend.com) and sign up.
2.  Click **"API Keys"** in the left sidebar.
3.  Click the blue **"Create API Key"** button in the top right.
4.  **Name**: `Portfolio v3`
5.  **Permission**: `Full Access`
6.  Click **"Add"**.
7.  **CRITICAL**: Copy the API key immediately (it starts with `re_`). Paste it into your `.env.local`.

---

## 3. 💻 Local Development Setup

### Step 1: Environment Configuration

1.  Locate the `.env.example` file in your root folder.
2.  **Duplicate** it and rename the copy to `.env.local`.
3.  Paste your keys into the file:
    ```bash
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    RESEND_API_KEY=your_resend_api_key
    CONTACT_EMAIL=nevooronni@gmail.com
    ```

### Step 2: Run the App

1.  Open your terminal.
2.  Run `npm install` to ensure all dependencies are fresh.
3.  Run `npm run dev`.
4.  The application is now live at [http://localhost:3000](http://localhost:3000).

---

## 4. 🛠️ Accessing the Admin Dashboard

1.  Navigate to [http://localhost:3000/admin](http://localhost:3000/admin).
2.  Log in using the **email and password** you created in the Supabase Authentication tab (Step 1.3).
3.  You can now add, edit, or delete projects directly. These changes will reflect on your live homepage in real-time.

---

## 🌐 Vercel Deployment

1.  Connect your GitHub repository to [Vercel](https://vercel.com).
2.  During the build settings, add the **same Environment Variables** you used in your `.env.local`.
3.  Click **"Deploy"**. Vercel will handle the rest!
