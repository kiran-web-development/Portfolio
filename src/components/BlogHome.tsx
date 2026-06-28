import React, { useState } from 'react';
import type { BlogPost } from '../types/blog';
import { Search, Heart, MessageSquare, ArrowLeft, LayoutDashboard, Star } from 'lucide-react';
import FadeIn from './FadeIn';
import Footer from './Footer';

interface BlogHomeProps {
  posts: BlogPost[];
  onPostSelect: (id: string) => void;
  onGoBack: () => void;
  onGoToDashboard: () => void;
  onNavClick?: (sectionId: string) => void;
}

export const BlogHome: React.FC<BlogHomeProps> = ({
  posts,
  onPostSelect,
  onGoBack,
  onGoToDashboard,
  onNavClick,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Get only published posts
  const publishedPosts = posts.filter((post) => post.status === 'published');

  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(publishedPosts.map((p) => p.category)))];

  // Filter posts based on search and category
  const filteredPosts = publishedPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getAverageRating = (post: BlogPost) => {
    if (!post.reviews || post.reviews.length === 0) return 0;
    const sum = post.reviews.reduce((acc, r) => acc + r.rating, 0);
    return (sum / post.reviews.length).toFixed(1);
  };

  return (
    <div className="min-h-screen bg-[#0C0C0C] text-[#D7E2EA] px-6 sm:px-10 md:px-16 pt-8 pb-20">
      {/* Blog Top Nav */}
      <FadeIn delay={0} y={-10} className="max-w-5xl mx-auto flex justify-between items-center mb-16 border-b border-[#D7E2EA]/10 pb-6">
        <button
          onClick={onGoBack}
          className="flex items-center gap-2 text-[#D7E2EA]/60 hover:text-white uppercase tracking-wider text-xs sm:text-sm font-medium transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Back to Portfolio</span>
        </button>

        <h1 className="text-xl sm:text-2xl font-black uppercase tracking-widest text-[#D7E2EA] select-none">
          kiran's<span className="text-[#BBCCD7]/60">blog Platform</span>
        </h1>

        {new URLSearchParams(window.location.search).get('admin') === 'true' ? (
          <button
            onClick={onGoToDashboard}
            className="flex items-center gap-2 px-4 py-2 border border-[#D7E2EA]/20 hover:border-white rounded-full text-xs uppercase tracking-widest font-medium transition-all bg-[#D7E2EA]/5 hover:bg-[#D7E2EA]/15 cursor-pointer"
          >
            <LayoutDashboard size={14} />
            <span>Dashboard</span>
          </button>
        ) : (
          <div className="w-[100px] sm:w-[120px]" />
        )}
      </FadeIn>

      <div className="max-w-5xl mx-auto">
        {/* Hero Header */}
        <div className="text-center mb-12 select-none">
          <FadeIn delay={0.1} y={30}>
            <h2 className="hero-heading text-[2.5rem] sm:text-[8vw] md:text-[80px] font-black uppercase leading-none mb-4">
              Insights & Ideas
            </h2>
            <p className="text-[#D7E2EA]/60 font-light text-sm sm:text-base uppercase tracking-wider max-w-md mx-auto leading-relaxed">
              thoughts, tutorials, and reflections on Web development, UI/UX, and artificial intelligence.
            </p>
          </FadeIn>
        </div>

        {/* Filters and Search Bar */}
        <FadeIn delay={0.2} y={20} className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          {/* Search Input */}
          <div className="relative w-full md:max-w-xs">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#D7E2EA]/40">
              <Search size={16} />
            </span>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#121212] border border-[#D7E2EA]/15 rounded-full pl-10 pr-4 py-2.5 text-sm text-[#D7E2EA] focus:outline-none focus:border-[#BBCCD7] transition-all"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                  selectedCategory === category
                    ? 'bg-[#D7E2EA] text-black font-bold'
                    : 'bg-[#121212] border border-[#D7E2EA]/10 text-[#D7E2EA]/60 hover:text-white hover:border-[#D7E2EA]/30'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Grid Feed */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, i) => {
              const avgRating = getAverageRating(post);
              return (
                <FadeIn
                  key={post.id}
                  delay={i * 0.05}
                  y={30}
                  className="flex"
                >
                  <article
                    onClick={() => onPostSelect(post.id)}
                    className="w-full bg-[#121212] border border-[#D7E2EA]/10 hover:border-[#D7E2EA]/30 rounded-[30px] overflow-hidden flex flex-col justify-between hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer group"
                  >
                    {/* Cover Image */}
                    <div className="w-full h-48 overflow-hidden relative bg-[#1c1c1c]">
                      <img
                        src={post.image}
                        alt={post.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none select-none"
                      />
                      <span className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm border border-white/10 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold text-white">
                        {post.category}
                      </span>
                    </div>

                    {/* Metadata & Title */}
                    <div className="p-6 flex-grow flex flex-col justify-between select-none">
                      <div>
                        <div className="flex justify-between items-center text-xs text-[#D7E2EA]/40 mb-3 font-light">
                          <span>{post.date}</span>
                          <span>•</span>
                          <span>{post.readTime}</span>
                        </div>
                        <h3 className="text-lg font-bold uppercase tracking-tight text-[#D7E2EA] mb-3 leading-tight group-hover:text-white transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-sm text-[#D7E2EA]/60 font-light leading-relaxed line-clamp-3 mb-6">
                          {post.content}
                        </p>
                      </div>

                      {/* Card Bottom Stats */}
                      <div className="flex justify-between items-center border-t border-[#D7E2EA]/5 pt-4 text-xs text-[#D7E2EA]/50 font-medium">
                        <div className="flex items-center gap-1.5">
                          <Heart size={14} className="text-red-500/80" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          {avgRating !== 0 && (
                            <div className="flex items-center gap-1">
                              <Star size={13} className="text-yellow-500 fill-yellow-500" />
                              <span className="text-yellow-500 font-bold">{avgRating}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <MessageSquare size={13} />
                            <span>{post.reviews ? post.reviews.length : 0}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </FadeIn>
              );
            })}
          </div>
        ) : (
          <FadeIn delay={0} y={15} className="text-center py-20 bg-[#121212] border border-[#D7E2EA]/10 rounded-[30px] select-none">
            <p className="text-[#D7E2EA]/40 uppercase tracking-widest text-sm font-medium">
              No articles found matching your criteria.
            </p>
          </FadeIn>
        )}
        {/* Shared Footer Section */}
        <Footer onNavClick={onNavClick} />
      </div>
    </div>
  );
};

export default BlogHome;
