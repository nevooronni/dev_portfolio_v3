const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

export const siteMetadata = {
  // Points to the permanent Supabase storage location
  resumeUrl: supabaseUrl
    ? `${supabaseUrl}/storage/v1/object/public/resumes/resume.pdf`
    : "/nevo-oronni-cv.pdf",
  email: "nevooronni@gmail.com",
  location: "Nairobi, Kenya",
  github: "https://github.com/nevooronni",
  linkedin: "https://www.linkedin.com/in/neville-oronni-5471699b/",
};
