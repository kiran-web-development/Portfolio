import React, { useState } from 'react';
import type { BlogPost, Review } from '../types/blog';
import { ArrowLeft, LayoutDashboard, Heart, Star, Send, Mail, User, MessageSquare } from 'lucide-react';
import FadeIn from './FadeIn';
import Footer from './Footer';

interface BlogPostDetailProps {
  post: BlogPost;
  onGoBack: () => void;
  onGoToDashboard: () => void;
  onLike: (id: string) => void;
  onAddReview: (id: string, review: Review) => void;
  onNavClick?: (sectionId: string) => void;
}

export const BlogPostDetail: React.FC<BlogPostDetailProps> = ({
  post,
  onGoBack,
  onGoToDashboard,
  onLike,
  onAddReview,
  onNavClick,
}) => {
  const [hasLiked, setHasLiked] = useState(false);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const handleLike = () => {
    if (!hasLiked) {
      onLike(post.id);
      setHasLiked(true);
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewerName.trim() && reviewComment.trim() && reviewRating > 0) {
      const newReview: Review = {
        name: reviewerName.trim(),
        rating: reviewRating,
        comment: reviewComment.trim(),
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
      };
      onAddReview(post.id, newReview);
      setReviewerName('');
      setReviewComment('');
      setReviewRating(5);
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactName.trim() && contactEmail.trim() && contactMsg.trim()) {
      setContactSubmitted(true);
      setTimeout(() => {
        setContactSubmitted(false);
        setContactName('');
        setContactEmail('');
        setContactMsg('');
      }, 3000);
    }
  };

  // Split content by newlines to render paragraphs
  const paragraphs = post.content.split('\n\n').filter(Boolean);

  // Calculate rating stats
  const totalReviews = post.reviews?.length || 0;
  const avgRating = totalReviews
    ? (post.reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1)
    : 0;

  return (
    <div className="min-h-screen bg-[#0C0C0C] text-[#D7E2EA] px-6 sm:px-10 md:px-16 pt-8 pb-24">
      {/* Top Navigation */}
      <FadeIn delay={0} y={-10} className="max-w-4xl mx-auto flex justify-between items-center mb-12 border-b border-[#D7E2EA]/10 pb-6">
        <button
          onClick={onGoBack}
          className="flex items-center gap-2 text-[#D7E2EA]/60 hover:text-white uppercase tracking-wider text-xs sm:text-sm font-medium transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Back to Articles</span>
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

      <article className="max-w-3xl mx-auto">
        {/* Post Meta Headers */}
        <FadeIn delay={0.1} y={20} className="mb-6 select-none">
          <span className="bg-[#D7E2EA]/10 text-[#D7E2EA] text-xs uppercase tracking-widest font-bold px-3 py-1 rounded-full border border-white/5">
            {post.category}
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-tight mt-4 mb-6 text-white">
            {post.title}
          </h2>
          <div className="flex flex-wrap items-center justify-between gap-4 border-y border-[#D7E2EA]/10 py-4 text-xs text-[#D7E2EA]/50 font-light">
            <div className="flex items-center gap-4">
              <span>Published: {post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
              <span>•</span>
              <span>{post.views} Views</span>
            </div>

            {/* Sticky Actions Header */}
            <div className="flex items-center gap-4">
              <button
                onClick={handleLike}
                disabled={hasLiked}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                  hasLiked
                    ? 'bg-red-500/15 border-red-500/30 text-red-500 font-bold'
                    : 'border-[#D7E2EA]/20 hover:border-red-500/40 hover:text-red-400'
                }`}
              >
                <Heart size={14} className={hasLiked ? 'fill-red-500' : ''} />
                <span>{hasLiked ? 'Liked!' : 'Like'} ({post.likes})</span>
              </button>
              {avgRating !== 0 && (
                <div className="flex items-center gap-1 text-yellow-500 font-bold border border-yellow-500/20 px-3 py-1 rounded-full bg-yellow-500/5">
                  <Star size={13} className="fill-yellow-500" />
                  <span>{avgRating} ({totalReviews})</span>
                </div>
              )}
            </div>
          </div>
        </FadeIn>

        {/* Hero Image */}
        <FadeIn delay={0.2} y={30} className="mb-10 w-full h-[240px] sm:h-[380px] rounded-[30px] overflow-hidden bg-[#1c1c1c] border border-[#D7E2EA]/10 select-none">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover pointer-events-none" />
        </FadeIn>

        {/* Post Content Body */}
        <FadeIn delay={0.3} y={20} className="prose prose-invert max-w-none mb-16 text-[#D7E2EA]/85 font-light leading-relaxed text-base sm:text-lg">
          {paragraphs.map((para, idx) => (
            <p key={idx} className="mb-6 whitespace-pre-line text-left">
              {para}
            </p>
          ))}
        </FadeIn>

        {/* Grid for Reviews & Contact Decks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-[#D7E2EA]/15 pt-12 mb-10">
          
          {/* Deck A: Post Contact Form */}
          <FadeIn delay={0.1} y={35} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-[#D7E2EA] flex items-center gap-2">
                <Mail size={18} className="text-[#BBCCD7]" />
                <span>Discuss Post</span>
              </h3>
              <p className="text-xs text-[#D7E2EA]/60 font-light leading-relaxed">
                Have any doubts, questions, or ideas about this specific topic? Send Menni Kiran Kumar a direct query.
              </p>
            </div>

            <form onSubmit={handleContactSubmit} className="flex flex-col gap-4 bg-[#121212] p-6 rounded-[24px] border border-[#D7E2EA]/10">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-wider text-[#D7E2EA]/60 font-semibold">Name</label>
                <input
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="Your Name"
                  className="bg-transparent border border-[#D7E2EA]/15 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#BBCCD7] transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-wider text-[#D7E2EA]/60 font-semibold">Email</label>
                <input
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="bg-transparent border border-[#D7E2EA]/15 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#BBCCD7] transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-wider text-[#D7E2EA]/60 font-semibold">Message</label>
                <textarea
                  required
                  rows={3}
                  value={contactMsg}
                  onChange={(e) => setContactMsg(e.target.value)}
                  placeholder={`Question regarding "${post.title.substring(0, 25)}..."`}
                  className="bg-transparent border border-[#D7E2EA]/15 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#BBCCD7] transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl text-black bg-[#D7E2EA] font-semibold text-xs uppercase tracking-widest hover:bg-white active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {contactSubmitted ? 'Message Sent!' : 'Send Query'}
                {!contactSubmitted && <Send size={12} />}
              </button>
            </form>
          </FadeIn>

          {/* Deck B: Rating Form */}
          <FadeIn delay={0.2} y={35} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-[#D7E2EA] flex items-center gap-2">
                <MessageSquare size={18} className="text-[#BBCCD7]" />
                <span>Write a Review</span>
              </h3>
              <p className="text-xs text-[#D7E2EA]/60 font-light leading-relaxed">
                Enjoyed the read? Share your thoughts and rate this post to help improve future content.
              </p>
            </div>

            <form onSubmit={handleReviewSubmit} className="flex flex-col gap-4 bg-[#121212] p-6 rounded-[24px] border border-[#D7E2EA]/10">
              {/* Star Selector */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-wider text-[#D7E2EA]/60 font-semibold">Your Rating</label>
                <div className="flex gap-1.5 py-1">
                  {[1, 2, 3, 4, 5].map((starVal) => {
                    const isActive = hoverRating !== null ? starVal <= hoverRating : starVal <= reviewRating;
                    return (
                      <button
                        key={starVal}
                        type="button"
                        onClick={() => setReviewRating(starVal)}
                        onMouseEnter={() => setHoverRating(starVal)}
                        onMouseLeave={() => setHoverRating(null)}
                        className="text-2xl transition-transform hover:scale-110 cursor-pointer"
                      >
                        <span className={isActive ? 'text-yellow-500' : 'text-[#D7E2EA]/20'}>★</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-wider text-[#D7E2EA]/60 font-semibold">Name</label>
                <input
                  type="text"
                  required
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  placeholder="Anonymous Reader"
                  className="bg-transparent border border-[#D7E2EA]/15 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#BBCCD7] transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-wider text-[#D7E2EA]/60 font-semibold">Comment</label>
                <textarea
                  required
                  rows={3}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Loved the layout explanation..."
                  className="bg-transparent border border-[#D7E2EA]/15 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#BBCCD7] transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl text-black bg-[#D7E2EA] font-semibold text-xs uppercase tracking-widest hover:bg-white active:scale-95 transition-all cursor-pointer"
              >
                Submit Review
              </button>
            </form>
          </FadeIn>

        </div>

        {/* Existing Reviews List */}
        <FadeIn delay={0.1} y={30} className="border-t border-[#D7E2EA]/10 pt-10 select-none">
          <h4 className="text-lg font-bold uppercase tracking-wider text-[#D7E2EA] mb-6 flex items-center gap-2">
            <span>Reviews ({totalReviews})</span>
          </h4>

          {totalReviews > 0 ? (
            <div className="flex flex-col gap-4">
              {post.reviews.map((rev, index) => (
                <div
                  key={index}
                  className="bg-[#121212] border border-[#D7E2EA]/5 p-5 rounded-[20px] flex flex-col gap-3"
                >
                  <div className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#BBCCD7]/10 flex items-center justify-center text-xs font-bold text-[#BBCCD7]">
                        <User size={14} />
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="font-semibold text-[#D7E2EA]">{rev.name}</span>
                        <span className="text-[10px] text-[#D7E2EA]/40 font-light">{rev.date}</span>
                      </div>
                    </div>
                    {/* Stars Display */}
                    <div className="flex text-yellow-500 text-sm">
                      {Array.from({ length: 5 }).map((_, starIdx) => (
                        <span key={starIdx} className={starIdx < rev.rating ? 'text-yellow-500' : 'text-white/10'}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-[#D7E2EA]/75 font-light leading-relaxed text-left pl-10">
                    {rev.comment}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-[#121212]/50 border border-dashed border-[#D7E2EA]/10 rounded-[20px]">
              <p className="text-[#D7E2EA]/40 text-sm font-light uppercase tracking-wider">
                No reviews yet. Be the first to share your thoughts!
              </p>
            </div>
          )}
        </FadeIn>
        {/* Shared Footer Section */}
        <Footer onNavClick={onNavClick} />
      </article>
    </div>
  );
};

export default BlogPostDetail;
