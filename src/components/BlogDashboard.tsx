import React, { useState } from 'react';
import type { BlogPost } from '../types/blog';
import { ArrowLeft, Plus, Edit, Trash2, CheckCircle, HelpCircle, Star, Heart, Eye } from 'lucide-react';
import FadeIn from './FadeIn';
import Footer from './Footer';

interface BlogDashboardProps {
  posts: BlogPost[];
  onGoBack: () => void;
  onCreatePost: (post: Omit<BlogPost, 'id' | 'views' | 'likes' | 'reviews' | 'date'>) => void;
  onUpdatePost: (post: BlogPost) => void;
  onDeletePost: (id: string) => void;
  onToggleStatus: (id: string) => void;
  onNavClick?: (sectionId: string) => void;
}

export const BlogDashboard: React.FC<BlogDashboardProps> = ({
  posts,
  onGoBack,
  onCreatePost,
  onUpdatePost,
  onDeletePost,
  onToggleStatus,
  onNavClick,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [readTime, setReadTime] = useState('');
  const [image, setImage] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState<'published' | 'draft'>('draft');

  // Open form for Create
  const handleOpenCreate = () => {
    setTitle('');
    setCategory('');
    setReadTime('');
    setImage('');
    setContent('');
    setStatus('draft');
    setEditingPost(null);
    setShowForm(true);
  };

  // Open form for Edit
  const handleOpenEdit = (post: BlogPost) => {
    setEditingPost(post);
    setTitle(post.title);
    setCategory(post.category);
    setReadTime(post.readTime);
    setImage(post.image);
    setContent(post.content);
    setStatus(post.status);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !category || !readTime || !image || !content) return;

    if (editingPost) {
      // Edit mode
      const updated: BlogPost = {
        ...editingPost,
        title,
        category,
        readTime,
        image,
        content,
        status,
      };
      onUpdatePost(updated);
    } else {
      // Create mode
      onCreatePost({
        title,
        category,
        readTime,
        image,
        content,
        status,
      });
    }

    setShowForm(false);
  };

  // Get average rating for a post
  const getAverageRating = (post: BlogPost) => {
    if (!post.reviews || post.reviews.length === 0) return 0;
    return post.reviews.reduce((acc, r) => acc + r.rating, 0) / post.reviews.length;
  };

  // 1. Calculate Overall Analytics
  const totalViews = posts.reduce((acc, p) => acc + p.views, 0);
  const totalLikes = posts.reduce((acc, p) => acc + p.likes, 0);
  const totalReviews = posts.reduce((acc, p) => acc + (p.reviews?.length || 0), 0);
  
  const allRatings = posts.flatMap((p) => p.reviews || []).map((r) => r.rating);
  const averageRating = allRatings.length
    ? (allRatings.reduce((acc, r) => acc + r, 0) / allRatings.length).toFixed(1)
    : '0';

  // 2. Bar Chart views calculation
  const maxViews = Math.max(...posts.map((p) => p.views), 1);

  return (
    <div className="min-h-screen bg-[#0C0C0C] text-[#D7E2EA] px-6 sm:px-10 md:px-16 pt-8 pb-20">
      {/* Dashboard Top Header */}
      <FadeIn delay={0} y={-10} className="max-w-5xl mx-auto flex justify-between items-center mb-12 border-b border-[#D7E2EA]/10 pb-6 select-none">
        <button
          onClick={onGoBack}
          className="flex items-center gap-2 text-[#D7E2EA]/60 hover:text-white uppercase tracking-wider text-xs sm:text-sm font-medium transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Back to Blog Feed</span>
        </button>

        <h1 className="text-xl sm:text-2xl font-black uppercase tracking-widest text-[#D7E2EA]">
          Blog<span className="text-[#BBCCD7]/60">.Dashboard</span>
        </h1>

        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 px-4 py-2 bg-[#D7E2EA] text-black hover:bg-white rounded-full text-xs uppercase tracking-widest font-semibold transition-all cursor-pointer"
        >
          <Plus size={14} />
          <span>New Article</span>
        </button>
      </FadeIn>

      <div className="max-w-5xl mx-auto">
        {/* Form Modal overlay */}
        {showForm && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto">
            <FadeIn delay={0} y={20} className="bg-[#121212] border border-[#D7E2EA]/15 p-6 sm:p-8 rounded-[30px] w-full max-w-xl my-8">
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-white mb-6 select-none">
                {editingPost ? 'Edit Article' : 'Create New Article'}
              </h2>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-[#D7E2EA]/60 font-semibold">Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="E.g., Getting Started with Next.js"
                    className="bg-transparent border border-[#D7E2EA]/20 rounded-xl px-4 py-2.5 text-sm text-[#D7E2EA] focus:outline-none focus:border-[#BBCCD7]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-[#D7E2EA]/60 font-semibold">Category</label>
                    <input
                      type="text"
                      required
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      placeholder="React, AI, Web..."
                      className="bg-transparent border border-[#D7E2EA]/20 rounded-xl px-4 py-2.5 text-sm text-[#D7E2EA] focus:outline-none focus:border-[#BBCCD7]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-[#D7E2EA]/60 font-semibold">Read Time</label>
                    <input
                      type="text"
                      required
                      value={readTime}
                      onChange={(e) => setReadTime(e.target.value)}
                      placeholder="5 min read"
                      className="bg-transparent border border-[#D7E2EA]/20 rounded-xl px-4 py-2.5 text-sm text-[#D7E2EA] focus:outline-none focus:border-[#BBCCD7]"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-[#D7E2EA]/60 font-semibold">Cover Image URL</label>
                  <input
                    type="text"
                    required
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="bg-transparent border border-[#D7E2EA]/20 rounded-xl px-4 py-2.5 text-sm text-[#D7E2EA] focus:outline-none focus:border-[#BBCCD7]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-[#D7E2EA]/60 font-semibold">Content</label>
                  <textarea
                    required
                    rows={8}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your article content here..."
                    className="bg-transparent border border-[#D7E2EA]/20 rounded-xl px-4 py-2.5 text-sm text-[#D7E2EA] focus:outline-none focus:border-[#BBCCD7] resize-none"
                  />
                </div>

                <div className="flex items-center gap-6 py-2 select-none">
                  <span className="text-[10px] uppercase tracking-wider text-[#D7E2EA]/60 font-semibold">Publish Status</span>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-1.5 text-sm cursor-pointer">
                      <input
                        type="radio"
                        name="status"
                        checked={status === 'draft'}
                        onChange={() => setStatus('draft')}
                        className="accent-[#D7E2EA]"
                      />
                      <span>Draft</span>
                    </label>
                    <label className="flex items-center gap-1.5 text-sm cursor-pointer">
                      <input
                        type="radio"
                        name="status"
                        checked={status === 'published'}
                        onChange={() => setStatus('published')}
                        className="accent-[#D7E2EA]"
                      />
                      <span>Published</span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-4 mt-4 select-none">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 py-2.5 border border-[#D7E2EA]/20 hover:border-white rounded-xl text-xs uppercase tracking-widest font-semibold transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-[#D7E2EA] hover:bg-white text-black rounded-xl text-xs uppercase tracking-widest font-semibold transition-all cursor-pointer"
                  >
                    {editingPost ? 'Save Changes' : 'Create Article'}
                  </button>
                </div>
              </form>
            </FadeIn>
          </div>
        )}

        {/* 2. Overall Stats Row */}
        <FadeIn delay={0.1} y={30} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 select-none">
          <div className="bg-[#121212] border border-[#D7E2EA]/10 p-5 rounded-[24px] flex flex-col text-left">
            <span className="text-[10px] uppercase tracking-widest text-[#D7E2EA]/50 font-medium mb-1">Total Views</span>
            <div className="flex items-center gap-2 mt-auto">
              <Eye size={18} className="text-[#BBCCD7]" />
              <span className="text-xl sm:text-2xl font-black text-white">{totalViews}</span>
            </div>
          </div>

          <div className="bg-[#121212] border border-[#D7E2EA]/10 p-5 rounded-[24px] flex flex-col text-left">
            <span className="text-[10px] uppercase tracking-widest text-[#D7E2EA]/50 font-medium mb-1">Total Likes</span>
            <div className="flex items-center gap-2 mt-auto">
              <Heart size={18} className="text-red-500/80" />
              <span className="text-xl sm:text-2xl font-black text-white">{totalLikes}</span>
            </div>
          </div>

          <div className="bg-[#121212] border border-[#D7E2EA]/10 p-5 rounded-[24px] flex flex-col text-left">
            <span className="text-[10px] uppercase tracking-widest text-[#D7E2EA]/50 font-medium mb-1">Avg Rating</span>
            <div className="flex items-center gap-2 mt-auto">
              <Star size={18} className="text-yellow-500 fill-yellow-500" />
              <span className="text-xl sm:text-2xl font-black text-white">{averageRating} ★</span>
            </div>
          </div>

          <div className="bg-[#121212] border border-[#D7E2EA]/10 p-5 rounded-[24px] flex flex-col text-left">
            <span className="text-[10px] uppercase tracking-widest text-[#D7E2EA]/50 font-medium mb-1">Total Reviews</span>
            <div className="flex items-center gap-2 mt-auto">
              <Star size={18} className="text-blue-400" />
              <span className="text-xl sm:text-2xl font-black text-white">{totalReviews}</span>
            </div>
          </div>
        </FadeIn>

        {/* 3. Analytics Chart Deck */}
        <FadeIn delay={0.2} y={30} className="bg-[#121212] border border-[#D7E2EA]/10 p-6 sm:p-8 rounded-[30px] mb-8 select-none">
          <h3 className="text-base sm:text-lg font-bold uppercase tracking-wider text-[#D7E2EA] mb-6 text-left">
            Article Performance (Views)
          </h3>
          <div className="flex flex-col gap-4">
            {posts.map((post) => {
              const widthPct = (post.views / maxViews) * 100;
              return (
                <div key={post.id} className="flex flex-col gap-1 text-left">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-[#D7E2EA]/90 truncate max-w-xs">{post.title}</span>
                    <span className="font-light text-[#D7E2EA]/60">{post.views} Views</span>
                  </div>
                  <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                    <div
                      style={{
                        width: `${widthPct}%`,
                        background: 'linear-gradient(90deg, #7621B0 0%, #B600A8 100%)',
                      }}
                      className="h-full rounded-full transition-all duration-1000"
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </FadeIn>

        {/* 4. Blog Manager Table/List */}
        <FadeIn delay={0.25} y={30} className="bg-[#121212] border border-[#D7E2EA]/10 rounded-[30px] overflow-hidden">
          <div className="p-6 border-b border-[#D7E2EA]/10 flex justify-between items-center select-none">
            <h3 className="text-base sm:text-lg font-bold uppercase tracking-wider text-[#D7E2EA]">
              Manage Articles
            </h3>
            <span className="text-xs text-[#D7E2EA]/40 font-light">{posts.length} Total</span>
          </div>

          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-[#D7E2EA]/10 text-[#D7E2EA]/50 text-[10px] uppercase tracking-widest select-none">
                  <th className="py-4 px-6 font-semibold">Title</th>
                  <th className="py-4 px-6 font-semibold text-center">Status</th>
                  <th className="py-4 px-6 font-semibold text-center">Views</th>
                  <th className="py-4 px-6 font-semibold text-center">Likes</th>
                  <th className="py-4 px-6 font-semibold text-center">Rating</th>
                  <th className="py-4 px-6 font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => {
                  const ratingAvg = getAverageRating(post);
                  return (
                    <tr
                      key={post.id}
                      className="border-b border-[#D7E2EA]/5 hover:bg-white/2 transition-colors text-sm"
                    >
                      {/* Title */}
                      <td className="py-4 px-6 font-medium text-white text-left max-w-xs truncate">
                        {post.title}
                      </td>

                      {/* Status badge */}
                      <td className="py-4 px-6 text-center select-none">
                        <button
                          onClick={() => onToggleStatus(post.id)}
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest cursor-pointer ${
                            post.status === 'published'
                              ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                              : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                          }`}
                        >
                          {post.status === 'published' ? (
                            <>
                              <CheckCircle size={10} />
                              <span>Live</span>
                            </>
                          ) : (
                            <>
                              <HelpCircle size={10} />
                              <span>Draft</span>
                            </>
                          )}
                        </button>
                      </td>

                      {/* Views */}
                      <td className="py-4 px-6 text-center font-light text-[#D7E2EA]/85">
                        {post.views}
                      </td>

                      {/* Likes */}
                      <td className="py-4 px-6 text-center font-light text-[#D7E2EA]/85">
                        {post.likes}
                      </td>

                      {/* Rating */}
                      <td className="py-4 px-6 text-center select-none">
                        {ratingAvg > 0 ? (
                          <div className="inline-flex items-center gap-1 text-yellow-500 font-semibold text-xs">
                            <span>{ratingAvg.toFixed(1)}</span>
                            <span>★</span>
                          </div>
                        ) : (
                          <span className="text-[#D7E2EA]/30">—</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-center select-none">
                        <div className="inline-flex gap-2">
                          <button
                            onClick={() => handleOpenEdit(post)}
                            className="p-2 border border-[#D7E2EA]/15 rounded-xl hover:border-white hover:text-white transition-colors cursor-pointer"
                            aria-label="Edit Post"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            onClick={() => onDeletePost(post.id)}
                            className="p-2 border border-red-500/20 rounded-xl text-red-500/80 hover:bg-red-500/10 hover:border-red-500 transition-colors cursor-pointer"
                            aria-label="Delete Post"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </FadeIn>
        {/* Shared Footer Section */}
        <Footer onNavClick={onNavClick} />
      </div>
    </div>
  );
};

export default BlogDashboard;
