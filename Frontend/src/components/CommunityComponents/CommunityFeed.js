import React, { useState, useEffect } from "react";
import { 
  ThumbsUp, 
  MessageCircle, 
  Share, 
  ChevronLeft, 
  ChevronRight, 
  Bookmark,
  MoreHorizontal,
  Send,
  Image,
  Video,
  Link,
  AlertCircle,
  User,
  Clock,
  Heart
} from "lucide-react";
import { 
  INITIAL_POSTS, 
  POSTS_PER_PAGE, 
  DEFAULT_AVATAR, 
  DEFAULT_USER_NAME 
} from "../../constants/constants";

const CommunityFeed = ({ isDarkMode, user }) => {
  // Post data state
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [activeCommentPostId, setActiveCommentPostId] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [likedPostIds, setLikedPostIds] = useState([]);
  const [postImage, setPostImage] = useState(null);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = POSTS_PER_PAGE;
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const currentPosts = posts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  // Handler functions
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPostImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreatePost = () => {
    if (!user) {
      setErrorMessage("Please sign in to create a post");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    if (!newPostContent.trim()) {
      setErrorMessage("Post content cannot be empty");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }
    
    const newPost = {
      id: Date.now(),
      user: user.name || DEFAULT_USER_NAME,
      avatar: user.profileImage || DEFAULT_AVATAR,
      content: newPostContent,
      timestamp: "Just now",
      likes: 0,
      comments: 0,
      commentsList: [],
      image: postImage
    };

    setPosts(prevPosts => [newPost, ...prevPosts]);
    setNewPostContent("");
    setPostImage(null);
    setShowNewPostForm(false);
  };

  const handleLikeClick = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: likedPostIds.includes(postId)
                ? post.likes - 1
                : post.likes + 1,
            }
          : post
      )
    );

    setLikedPostIds((prevLikedPostIds) =>
      likedPostIds.includes(postId)
        ? prevLikedPostIds.filter((id) => id !== postId)
        : [...prevLikedPostIds, postId]
    );
  };

  const toggleComments = (postId) => {
    setActiveCommentPostId(activeCommentPostId === postId ? null : postId);
  };

  const handleAddComment = (postId) => {
    if (!commentText.trim()) return;
    
    if (!user) {
      setErrorMessage("Please sign in to comment");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }
    
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId
          ? {
              ...post,
              comments: post.comments + 1,
              commentsList: [
                {
                  id: Date.now(),
                  user: user.name || DEFAULT_USER_NAME,
                  avatar: user.profileImage || DEFAULT_AVATAR,
                  text: commentText,
                  timestamp: "Just now"
                },
                ...post.commentsList
              ]
            }
          : post
      )
    );
    
    setCommentText("");
  };

  return (
    <div className={`rounded-2xl ${isDarkMode ? "bg-zinc-800" : "bg-white"} shadow-lg overflow-hidden w-full max-w-4xl mx-auto`}>
      {/* Error Message */}
      {showError && (
        <div className={`p-4 mb-4 flex items-center gap-3 ${isDarkMode ? "bg-red-900/50" : "bg-red-100"} text-red-500 rounded-lg mx-4 mt-4`}>
          <AlertCircle size={20} className="flex-shrink-0" />
          <span className="font-medium">{errorMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className={`p-4 md:p-6 ${isDarkMode ? "border-zinc-700" : "border-zinc-200"} border-b`}>
        <h2 className={`text-xl md:text-2xl font-bold ${isDarkMode ? "text-white" : "text-zinc-900"} mb-1`}>
          Community Feed
        </h2>
        <p className={`text-xs md:text-sm ${isDarkMode ? "text-zinc-400" : "text-zinc-500"}`}>
          Connect with other professionals in your field
        </p>
      </div>

      {/* Create Post */}
      <div className={`p-3 md:p-4 ${isDarkMode ? "border-zinc-700" : "border-zinc-200"} border-b`}>
        {!showNewPostForm ? (
          <div
            onClick={() => setShowNewPostForm(true)}
            className={`p-2 md:p-3 rounded-xl cursor-pointer transition-all flex items-center gap-3 ${
              isDarkMode
                ? "bg-zinc-700 hover:bg-zinc-600 text-zinc-300"
                : "bg-zinc-50 hover:bg-zinc-100 text-zinc-600"
            }`}
          >
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden bg-zinc-200 flex items-center justify-center">
              {user?.profileImage ? (
                <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User className="w-4 h-4 md:w-5 md:h-5 text-zinc-500" />
              )}
            </div>
            <span className="text-xs md:text-sm font-medium">What's on your mind?</span>
          </div>
        ) : (
          <div className={`p-3 md:p-4 rounded-xl ${isDarkMode ? "bg-zinc-700" : "bg-zinc-50"} transition-all`}>
            <div className="flex items-start gap-3 mb-4">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden bg-zinc-200 flex items-center justify-center">
                {user?.profileImage ? (
                  <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-4 h-4 md:w-5 md:h-5 text-zinc-500" />
                )}
              </div>
              <textarea
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="Share your thoughts, questions, or insights..."
                className={`flex-1 p-2 md:p-3 rounded-lg resize-none focus:outline-none focus:ring-2 transition-all text-sm md:text-base ${
                  isDarkMode 
                    ? "bg-zinc-800 text-white focus:ring-indigo-500" 
                    : "bg-white text-zinc-800 focus:ring-indigo-400 shadow-sm"
                }`}
                rows={3}
              ></textarea>
            </div>
            
            {postImage && (
              <div className="mb-4 relative rounded-xl overflow-hidden">
                <img 
                  src={postImage} 
                  alt="Post preview" 
                  className="w-full h-40 sm:h-48 md:h-64 object-cover"
                />
                <button 
                  onClick={() => setPostImage(null)}
                  className={`absolute top-2 right-2 md:top-3 md:right-3 p-1 md:p-1.5 rounded-full ${
                    isDarkMode ? "bg-zinc-800/90 hover:bg-zinc-700" : "bg-white/90 hover:bg-zinc-100"
                  } shadow-md text-xs md:text-base`}
                >
                  ✕
                </button>
              </div>
            )}
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-3">
              <div className="flex gap-1 md:gap-2 w-full md:w-auto justify-between">
                <label className={`p-1 md:p-2 rounded-lg cursor-pointer transition-colors ${
                  isDarkMode
                    ? "hover:bg-zinc-600 text-indigo-400"
                    : "hover:bg-zinc-200 text-indigo-500"
                }`}>
                  <Image className="w-4 h-4 md:w-5 md:h-5" />
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleImageUpload}
                  />
                </label>
                <button className={`p-1 md:p-2 rounded-lg transition-colors ${
                  isDarkMode
                    ? "hover:bg-zinc-600 text-indigo-400"
                    : "hover:bg-zinc-200 text-indigo-500"
                }`}>
                  <Video className="w-4 h-4 md:w-5 md:h-5" />
                </button>
                <button className={`p-1 md:p-2 rounded-lg transition-colors ${
                  isDarkMode
                    ? "hover:bg-zinc-600 text-indigo-400"
                    : "hover:bg-zinc-200 text-indigo-500"
                }`}>
                  <Link className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>
              <div className="flex gap-2 w-full md:w-auto justify-end">
                <button
                  onClick={() => setShowNewPostForm(false)}
                  className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg font-medium text-sm md:text-base transition-colors ${
                    isDarkMode
                      ? "bg-zinc-600 hover:bg-zinc-500 text-white"
                      : "bg-zinc-200 hover:bg-zinc-300 text-zinc-800"
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreatePost}
                  className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg font-medium text-sm md:text-base transition-colors ${
                    isDarkMode
                      ? "bg-indigo-600 hover:bg-indigo-500 text-white"
                      : "bg-indigo-500 hover:bg-indigo-600 text-white"
                  } shadow-md`}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Posts List */}
      <div className="divide-y divide-zinc-200 dark:divide-zinc-700">
        {currentPosts.map((post) => (
          <div
            key={post.id}
            className={`p-3 md:p-4 lg:p-6 transition-all hover:${isDarkMode ? "bg-zinc-750" : "bg-zinc-50"}`}
          >
            <div className="flex items-start gap-3 md:gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden bg-zinc-200 flex items-center justify-center">
                  {post.avatar ? (
                    <img src={post.avatar} alt={post.user} className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-5 h-5 md:w-6 md:h-6 text-zinc-500" />
                  )}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={`font-semibold text-sm md:text-base ${isDarkMode ? "text-white" : "text-zinc-900"}`}>
                      {post.user}
                    </h3>
                    <div className="flex items-center gap-1 md:gap-2 mt-1">
                      <Clock className={`w-3 h-3 ${isDarkMode ? "text-zinc-500" : "text-zinc-400"}`} />
                      <span className={`text-xs ${isDarkMode ? "text-zinc-400" : "text-zinc-500"}`}>
                        {post.timestamp}
                      </span>
                    </div>
                  </div>
                  <button
                    className={`p-1 rounded-full hover:${isDarkMode ? "bg-zinc-700" : "bg-zinc-100"} transition-colors`}
                  >
                    <MoreHorizontal className={`w-4 h-4 md:w-5 md:h-5 ${isDarkMode ? "text-zinc-400" : "text-zinc-500"}`} />
                  </button>
                </div>
                
                <p className={`mt-2 md:mt-3 text-xs md:text-sm lg:text-base ${isDarkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                  {post.content}
                </p>
                
                {post.image && (
                  <div className="mt-3 md:mt-4 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-700">
                    <img src={post.image} alt="" className="w-full h-auto max-h-64 md:max-h-80 lg:max-h-96 object-cover" />
                  </div>
                )}
                
                <div className="mt-3 md:mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <div className="flex items-center -space-x-2">
                      <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-indigo-500 flex items-center justify-center">
                        <Heart className="w-2.5 h-2.5 md:w-3 md:h-3 text-white fill-white" />
                      </div>
                    </div>
                    <span className={`text-xs md:text-sm ${isDarkMode ? "text-zinc-400" : "text-zinc-500"}`}>
                      {post.likes} likes
                    </span>
                  </div>
                  <div className="flex items-center gap-2 md:gap-4">
                    <span className={`text-xs md:text-sm ${isDarkMode ? "text-zinc-400" : "text-zinc-500"}`}>
                      {post.comments} comments
                    </span>
                  </div>
                </div>
                
                <div className="mt-2 md:mt-3 pt-2 md:pt-3 border-t border-zinc-200 dark:border-zinc-700 flex items-center justify-between">
                  <button
                    onClick={() => handleLikeClick(post.id)}
                    className={`flex-1 flex items-center justify-center gap-1 md:gap-2 py-1 md:py-2 rounded-lg transition-colors text-xs md:text-sm ${
                      likedPostIds.includes(post.id)
                        ? "text-indigo-500"
                        : isDarkMode
                          ? "text-zinc-400 hover:bg-zinc-700"
                          : "text-zinc-500 hover:bg-zinc-100"
                    }`}
                  >
                    <ThumbsUp className={`w-4 h-4 md:w-5 md:h-5 ${likedPostIds.includes(post.id) ? "fill-current" : ""}`} />
                    <span className="font-medium">Like</span>
                  </button>
                  <button
                    onClick={() => toggleComments(post.id)}
                    className={`flex-1 flex items-center justify-center gap-1 md:gap-2 py-1 md:py-2 rounded-lg transition-colors text-xs md:text-sm ${
                      isDarkMode
                        ? "text-zinc-400 hover:bg-zinc-700"
                        : "text-zinc-500 hover:bg-zinc-100"
                    }`}
                  >
                    <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="font-medium">Comment</span>
                  </button>
                  <button
                    className={`flex-1 flex items-center justify-center gap-1 md:gap-2 py-1 md:py-2 rounded-lg transition-colors text-xs md:text-sm ${
                      isDarkMode
                        ? "text-zinc-400 hover:bg-zinc-700"
                        : "text-zinc-500 hover:bg-zinc-100"
                    }`}
                  >
                    <Share className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="font-medium">Share</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            {activeCommentPostId === post.id && (
              <div className="mt-3 md:mt-4 pl-10 md:pl-14 lg:pl-16">
                <div className="space-y-2 md:space-y-3">
                  {post.commentsList.map((comment, index) => (
                    <div key={index} className={`p-2 md:p-3 rounded-xl ${isDarkMode ? "bg-zinc-700" : "bg-zinc-50"}`}>
                      <div className="flex items-start gap-2 md:gap-3">
                        <div className="w-6 h-6 md:w-8 md:h-8 rounded-full overflow-hidden bg-zinc-200 flex items-center justify-center">
                          {comment.avatar ? (
                            <img src={comment.avatar} alt={comment.user} className="w-full h-full object-cover" />
                          ) : (
                            <User className="w-3 h-3 md:w-4 md:h-4 text-zinc-500" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1 md:gap-2">
                            <span className={`font-medium text-xs md:text-sm ${isDarkMode ? "text-white" : "text-zinc-900"}`}>
                              {comment.user}
                            </span>
                            <span className={`text-xs ${isDarkMode ? "text-zinc-400" : "text-zinc-500"}`}>
                              {comment.timestamp}
                            </span>
                          </div>
                          <p className={`mt-1 text-xs md:text-sm ${isDarkMode ? "text-zinc-300" : "text-zinc-600"}`}>
                            {comment.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-2 md:mt-3 flex gap-1 md:gap-2">
                  <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Write a comment..."
                    className={`flex-1 px-3 py-1.5 md:px-4 md:py-2 rounded-full focus:outline-none focus:ring-2 transition-all text-xs md:text-sm ${
                      isDarkMode 
                        ? "bg-zinc-700 text-white focus:ring-indigo-500" 
                        : "bg-zinc-100 text-zinc-800 focus:ring-indigo-400"
                    }`}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                  />
                  <button
                    onClick={() => handleAddComment(post.id)}
                    className={`p-1.5 md:p-2 rounded-full ${
                      isDarkMode
                        ? "bg-indigo-600 hover:bg-indigo-500 text-white"
                        : "bg-indigo-500 hover:bg-indigo-600 text-white"
                    } transition-colors`}
                  >
                    <Send className="w-3 h-3 md:w-4 md:h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className={`p-3 md:p-4 lg:p-6 flex flex-col sm:flex-row justify-between items-center gap-3 ${
        isDarkMode ? "border-t border-zinc-700" : "border-t border-zinc-200"
      }`}>
        <div className={`text-xs md:text-sm ${isDarkMode ? "text-zinc-400" : "text-zinc-500"}`}>
          Showing {currentPage * postsPerPage - postsPerPage + 1}-{Math.min(currentPage * postsPerPage, posts.length)} of {posts.length} posts
        </div>
        <div className="flex items-center gap-1 md:gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`p-1.5 md:p-2 rounded-lg transition-colors ${
              isDarkMode
                ? "bg-zinc-700 hover:bg-zinc-600 disabled:bg-zinc-800 disabled:opacity-50"
                : "bg-white hover:bg-zinc-100 disabled:bg-zinc-100 disabled:opacity-50 shadow-sm"
            }`}
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          <span className={`text-xs md:text-sm font-medium ${isDarkMode ? "text-zinc-300" : "text-zinc-600"}`}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`p-1.5 md:p-2 rounded-lg transition-colors ${
              isDarkMode
                ? "bg-zinc-700 hover:bg-zinc-600 disabled:bg-zinc-800 disabled:opacity-50"
                : "bg-white hover:bg-zinc-100 disabled:bg-zinc-100 disabled:opacity-50 shadow-sm"
            }`}
          >
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunityFeed;