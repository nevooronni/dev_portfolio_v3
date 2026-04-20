# 🚀 Deployment Guide: Neville Oronni Portfolio v3

Your portfolio is production-ready. To go live with all features (Auth, Database, Emails), follow these steps. **Everything is designed to work on Free Tiers.**

---

## 1. 🗄️ Supabase Setup (Database & Auth)

The Admin Dashboard uses Supabase for authentication and project management.

1.  **Create Project**: Go to [supabase.com](https://supabase.com) and create a new project.
2.  **Authentication**:
    - Go to **Authentication > Providers** and ensure **Email** is enabled.
    - (Optional) Disable "Confirm Email" if you want to create an account immediately.
3.  **Database Schema**:
    Run this SQL in the **SQL Editor** to create the projects table:
    ```sql
    create table public.projects (
      id uuid default gen_random_uuid() primary key,
      title text not null,
      description text,
      category text,
      impact text,
      tech_stack text[],
      featured boolean default false,
      repo_link text,
      live_link text,
      created_at timestamp with time zone default timezone('utc'::text, now()) not null
    );
    ```
4.  **Environment Variables**:
    Copy these from **Project Settings > API**:
    - `NEXT_PUBLIC_SUPABASE_URL`
    - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## 2. 📧 Resend Setup (Contact Form)

The contact form uses Resend for reliable email delivery.

1.  **Create API Key**: Sign up at [resend.com](https://resend.com) and create an API Key.
2.  **Verify Domain** (Optional): For production, verify your domain. For testing, you can send emails to yourself using their default domain.
3.  **Environment Variables**:
    - `RESEND_API_KEY`: Your API key.
    - `CONTACT_EMAIL`: The email where you want to receive leads (e.g., `nevooronni@gmail.com`).

---

## 3. 🌐 Vercel Deployment

1.  **Push to GitHub**: Initialize a git repo and push your code.
2.  **Import to Vercel**: Connect your repo to Vercel.
3.  **Configure Vars**: Add all the environment variables mentioned above in the Vercel Dashboard.
4.  **Deploy**: Vercel will automatically build and deploy.

---

## 🔒 Security Note

The admin dashboard is protected. Once you've deployed, go to your Supabase Auth dashboard and manually "Invite" yourself or create a user. Only authenticated users can access `/admin`.

> [!IMPORTANT]
> Ensure you have the `nevo-oronni-cv.pdf` in the `public/` folder. It has already been copied there during setup.

---

## 📈 SEO Check

- **OG Image**: Located at `/og-image.png`.
- **Sitemap**: Automatically generated at `/sitemap.xml`.
- **Favicon**: Ensure you add a custom favicon to `public/favicon.ico`.
