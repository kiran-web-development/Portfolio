import { useState, useEffect } from 'react';
import { sanityClient } from './sanityClient';
import HeroSection from './components/HeroSection';
import MarqueeSection from './components/MarqueeSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import BlogHome from './components/BlogHome';
import BlogPostDetail from './components/BlogPostDetail';
import BlogDashboard from './components/BlogDashboard';
import type { BlogPost, Review } from './types/blog';

// Preloaded default blogs to match Menni Kiran Kumar's background
const DEFAULT_POSTS: BlogPost[] = [
  {
    id: 'ai-medical-image',
    title: 'Integrating AI in Modern Medical Image Analysis',
    category: 'AI & React',
    readTime: '6 min read',
    date: 'Jun 08, 2026',
    image: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
    status: 'published',
    views: 342,
    likes: 48,
    content: `AI-powered analysis of medical images is revolutionizing clinical diagnostics. In this article, we explore how deep learning models are trained on DICOM datasets and how to build a web-based interface using React, Vite, and TypeScript to visualize predictions in real time.\n\nFirst, we tackle DICOM parsing. Since browser environments cannot read raw DICOM headers out of the box, we utilize specialized parsers to extract pixel arrays and metadata (like patient data and pixel spacing). Once parsed, the rendering canvas maps the Hounsfield units to 8-bit grayscale values.\n\nNext, we integrate the computer vision inference layer. We discuss setting up client-side ONNX Runtime Web instances or secure endpoints. The article details how user tasks are logged and managed efficiently in our database to track patient diagnostics history.`,
    reviews: [
      { name: 'Dr. Suresh', rating: 5, comment: 'Great outline on DICOM rendering. Very relevant for my research.', date: 'Jun 09, 2026' },
      { name: 'Anil Kumar', rating: 4, comment: 'Slick UI implementation. Can you share the ONNX runtime configuration?', date: 'Jun 10, 2026' },
    ],
  },
  {
    id: 'supabase-gallery',
    title: 'Designing a Collaborative Gallery with Supabase Auth',
    category: 'Web & Supabase',
    readTime: '4 min read',
    date: 'May 24, 2026',
    image: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
    status: 'published',
    views: 215,
    likes: 32,
    content: `Authentication and storage management are two core pillars of modern web apps. Let's walk through building KMG Photography Gallery—a collaborative sharing platform where users can create profiles, upload images, and interact in real time.\n\nWe utilize Supabase for authentication and database management. Email/password authentication is wired through standard hook wrappers, giving users a seamless sign-up and session experience. Row-Level Security (RLS) is enabled on our tables to guarantee that only the post owners can edit or delete their uploaded graphics.\n\nFor file uploads, we configure Supabase Storage buckets. The user drags an image, we perform client-side optimization to compress it, upload it via the Supabase SDK, and store the public URL in our media table. High-speed caching is configured to ensure fast loading on grid views.`,
    reviews: [
      { name: 'Malli', rating: 5, comment: 'Beautiful integration. Love how you handled compression before uploading.', date: 'May 25, 2026' },
    ],
  },
  {
    id: 'hackathon-uiux',
    title: 'UI/UX Strategies for Hackathon Winning Submissions',
    category: 'Team Lead',
    readTime: '5 min read',
    date: 'Apr 15, 2026',
    image: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
    status: 'published',
    views: 410,
    likes: 65,
    content: `In hackathons like Cynosure 2K25, visual appeal and seamless UX make up half the victory. Leading a team of developers requires clear guidelines, wireframing, and interactive visual designs that make the submission stand out.\n\nWe focus on styling foundations: typography, layout, and visual feedback. Using a high-contrast dark theme combined with curated color gradients (such as matching our metallic headers) will wow judges at first glance.\n\nWe discuss how to build rapid prototypes, use Framer Motion for micro-animations that show polished effort, and create clear user flows that communicate product value in under 2 minutes of demonstration.`,
    reviews: [
      { name: 'Rajesh M.', rating: 5, comment: 'Winning lead strategies indeed! Our team used similar layout grids.', date: 'Apr 16, 2026' },
      { name: 'Kavitha P.', rating: 4, comment: 'Simple, effective tips. Color selections are key in visual pitches.', date: 'Apr 17, 2026' },
      { name: 'Ganesh', rating: 5, comment: 'A complete masterclass for Cynosure competitors!', date: 'Apr 18, 2026' },
    ],
  },
];

function App() {
  const [currentView, setCurrentView] = useState<'portfolio' | 'blog' | 'dashboard' | 'post'>('portfolio');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [heroData, setHeroData] = useState<any>(null);
  const [aboutData, setAboutData] = useState<any>(null);
  const [skillsData, setSkillsData] = useState<any[] | null>(null);
  const [projectsData, setProjectsData] = useState<any[] | null>(null);

  // Load posts from localStorage or set defaults, then overlay Sanity
  useEffect(() => {
    const saved = localStorage.getItem('kiran_blog_posts');
    let localPosts = DEFAULT_POSTS;
    if (saved) {
      try {
        localPosts = JSON.parse(saved);
      } catch (e) {
        localPosts = DEFAULT_POSTS;
      }
    } else {
      localStorage.setItem('kiran_blog_posts', JSON.stringify(DEFAULT_POSTS));
    }
    setPosts(localPosts);

    const fetchData = async () => {
      try {
        const hero = await sanityClient.fetch(`*[_type == "hero"][0] {
          ...,
          "resumeFileUrl": resumeFile.asset->url,
          "profileImageUrl": profileImage.asset->url
        }`);
        if (hero) setHeroData(hero);

        const about = await sanityClient.fetch(`*[_type == "about"][0] {
          ...,
          "moonImageUrl": moonImage.asset->url,
          "legoImageUrl": legoImage.asset->url,
          "decorObject1Url": decorObject1.asset->url,
          "decorObject2Url": decorObject2.asset->url
        }`);
        if (about) setAboutData(about);

        const skills = await sanityClient.fetch(`*[_type == "skillCategory"] | order(num asc)`);
        if (skills && skills.length > 0) setSkillsData(skills);

        const projects = await sanityClient.fetch(`*[_type == "project"] | order(num asc) {
          ...,
          "imageUrl": image.asset->url
        }`);
        if (projects && projects.length > 0) setProjectsData(projects);

        const blogs = await sanityClient.fetch(`*[_type == "blogPost"] | order(date desc) {
          ...,
          "imageUrl": coverImage.asset->url
        }`);
        if (blogs && blogs.length > 0) {
          const mappedBlogs = blogs.map((b: any) => ({
            id: b.slug?.current || b._id,
            title: b.title,
            category: b.category,
            readTime: b.readTime,
            date: b.date,
            image: b.imageUrl,
            status: b.status || 'published',
            views: b.views || 0,
            likes: b.likes || 0,
            content: b.content,
            reviews: b.reviews || []
          }));
          setPosts(mappedBlogs);
        }
      } catch (err) {
        console.warn('Failed to fetch from Sanity, using local data:', err);
      }
    };

    fetchData();

    // Listen for real-time updates
    const subscription = sanityClient
      .listen(`*[_type in ["hero", "about", "skillCategory", "project", "blogPost"]]`)
      .subscribe(() => {
        fetchData();
      });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Save helper
  const savePosts = (updatedPosts: BlogPost[]) => {
    setPosts(updatedPosts);
    localStorage.setItem('kiran_blog_posts', JSON.stringify(updatedPosts));
  };

  const handleScrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (id: string) => {
    setCurrentView('portfolio');
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // 1. Increment Views & Select Post
  const handlePostSelect = (id: string) => {
    const updated = posts.map((p) =>
      p.id === id ? { ...p, views: p.views + 1 } : p
    );
    savePosts(updated);
    setSelectedPostId(id);
    setCurrentView('post');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // 2. Click Like
  const handleLikePost = (id: string) => {
    const updated = posts.map((p) =>
      p.id === id ? { ...p, likes: p.likes + 1 } : p
    );
    savePosts(updated);
  };

  // 3. Add Review
  const handleAddReview = (id: string, review: Review) => {
    const updated = posts.map((p) =>
      p.id === id ? { ...p, reviews: [review, ...(p.reviews || [])] } : p
    );
    savePosts(updated);
  };

  // 4. Create Article
  const handleCreatePost = (newPost: Omit<BlogPost, 'id' | 'views' | 'likes' | 'reviews' | 'date'>) => {
    const post: BlogPost = {
      ...newPost,
      id: newPost.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now(),
      views: Math.floor(Math.random() * 50) + 10,
      likes: Math.floor(Math.random() * 5) + 2,
      reviews: [],
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
    };
    savePosts([post, ...posts]);
  };

  // 5. Update Article
  const handleUpdatePost = (updatedPost: BlogPost) => {
    const updated = posts.map((p) => (p.id === updatedPost.id ? updatedPost : p));
    savePosts(updated);
  };

  // 6. Delete Article
  const handleDeletePost = (id: string) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      const updated = posts.filter((p) => p.id !== id);
      savePosts(updated);
    }
  };

  // 7. Toggle published/draft status
  const handleToggleStatus = (id: string) => {
    const updated = posts.map((p) =>
      p.id === id ? { ...p, status: p.status === 'published' ? 'draft' as const : 'published' as const } : p
    );
    savePosts(updated);
  };

  const selectedPost = posts.find((p) => p.id === selectedPostId);

  // SPA Views switcher
  if (currentView === 'blog') {
    return (
      <BlogHome
        posts={posts}
        onPostSelect={handlePostSelect}
        onGoBack={() => {
          setCurrentView('portfolio');
          window.scrollTo({ top: 0, behavior: 'instant' });
        }}
        onGoToDashboard={() => {
          setCurrentView('dashboard');
          window.scrollTo({ top: 0, behavior: 'instant' });
        }}
        onNavClick={handleNavClick}
      />
    );
  }

  if (currentView === 'post' && selectedPost) {
    return (
      <BlogPostDetail
        post={selectedPost}
        onGoBack={() => {
          setCurrentView('blog');
          window.scrollTo({ top: 0, behavior: 'instant' });
        }}
        onGoToDashboard={() => {
          setCurrentView('dashboard');
          window.scrollTo({ top: 0, behavior: 'instant' });
        }}
        onLike={handleLikePost}
        onAddReview={handleAddReview}
        onNavClick={handleNavClick}
      />
    );
  }

  if (currentView === 'dashboard') {
    return (
      <BlogDashboard
        posts={posts}
        onGoBack={() => {
          setCurrentView('blog');
          window.scrollTo({ top: 0, behavior: 'instant' });
        }}
        onCreatePost={handleCreatePost}
        onUpdatePost={handleUpdatePost}
        onDeletePost={handleDeletePost}
        onToggleStatus={handleToggleStatus}
        onNavClick={handleNavClick}
      />
    );
  }

  // Default: Landing Portfolio Page
  return (
    <div className="w-full min-h-screen bg-[#0C0C0C] text-[#D7E2EA] overflow-x-clip relative select-none">
      {/* Hero Section */}
      <HeroSection
        heroData={heroData}
        onContactClick={handleScrollToContact}
        onNavClick={(id) => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onBlogClick={() => {
          setCurrentView('blog');
          window.scrollTo({ top: 0, behavior: 'instant' });
        }}
      />

      {/* MarqueeSection - pass the resolved resume file url */}
      <MarqueeSection resumeFileUrl={heroData?.resumeFileUrl} />

      {/* About Section */}
      <AboutSection aboutData={aboutData} onContactClick={handleScrollToContact} />

      {/* Skills Section */}
      <SkillsSection skills={skillsData || undefined} />

      {/* Projects Section */}
      <ProjectsSection projects={projectsData || undefined} />

      {/* Contact, Footer & Copyright Section */}
      <ContactSection
        onNavClick={handleNavClick}
      />
    </div>
  );
}

export default App;
