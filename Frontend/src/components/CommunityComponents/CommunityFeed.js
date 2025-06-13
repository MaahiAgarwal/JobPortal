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
  AlertCircle
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

  // UI States
  const [activeCommentPostId, setActiveCommentPostId] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [expandedPosts, setExpandedPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState("");
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [likedPostIds, setLikedPostIds] = useState([]);
  const [postImage, setPostImage] = useState(null);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = POSTS_PER_PAGE;
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Event handlers
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

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
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

  const togglePostExpand = (postId) => {
    setExpandedPosts(prev =>
      prev.includes(postId)
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
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

    console.log("Creating post with user data:", user);
    console.log("User profile image:", user.profileImage);

    setPosts(prevPosts => [newPost, ...prevPosts]);
    setNewPostContent("");
    setPostImage(null);
    setShowNewPostForm(false);
  };

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

  return (
    <div className={`rounded-xl shadow-lg overflow-hidden ${isDarkMode ? "bg-zinc-800" : "bg-white"}`}>
      {/* Error Message */}
      {showError && (
        <div className={`p-4 mb-4 rounded-lg text-white bg-red-500 flex items-center gap-2`}>
          <AlertCircle size={20} />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className={`p-4 border-b ${isDarkMode ? "border-zinc-700" : "border-zinc-200"}`}>
        <h2 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-zinc-900"}`}>
          Community Feed
        </h2>
      </div>

      {/* Create Post */}
      <div className={`p-4 border-b ${isDarkMode ? "border-zinc-700" : "border-zinc-200"}`}>
        {!showNewPostForm ? (
          <div
            onClick={() => setShowNewPostForm(true)}
            className={`p-3 rounded-lg cursor-pointer ${
              isDarkMode
                ? "bg-zinc-700 hover:bg-zinc-600 text-zinc-300"
                : "bg-zinc-100 hover:bg-zinc-200 text-zinc-600"
            }`}
          >
            <span>What's on your mind?</span>
          </div>
        ) : (
          <div className={`p-4 rounded-lg ${isDarkMode ? "bg-zinc-700" : "bg-zinc-100"}`}>
            <textarea
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              placeholder="Share your thoughts, questions, or insights..."
              className={`w-full p-3 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                isDarkMode ? "bg-zinc-800 text-white" : "bg-white text-zinc-800"
              }`}
              rows={4}
            ></textarea>
            
            {postImage && (
              <div className="mt-3 relative">
                <img 
                  src={postImage} 
                  alt="Post preview" 
                  className="max-h-40 rounded-lg object-cover"
                />
                <button 
                  onClick={() => setPostImage(null)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                >
                  ✕
                </button>
              </div>
            )}
            
            <div className="flex items-center justify-between mt-3">
              <div className="flex gap-2">
                <label className={`p-2 rounded-lg cursor-pointer ${
                  isDarkMode
                    ? "hover:bg-zinc-600 text-indigo-400"
                    : "hover:bg-zinc-200 text-indigo-500"
                }`}>
                  <Image className="w-5 h-5" />
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleImageUpload}
                  />
                </label>
                <button className={`p-2 rounded-lg ${
                  isDarkMode
                    ? "hover:bg-zinc-600 text-indigo-400"
                    : "hover:bg-zinc-200 text-indigo-500"
                }`}>
                  <Video className="w-5 h-5" />
                </button>
                <button className={`p-2 rounded-lg ${
                  isDarkMode
                    ? "hover:bg-zinc-600 text-indigo-400"
                    : "hover:bg-zinc-200 text-indigo-500"
                }`}>
                  <Link className="w-5 h-5" />
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowNewPostForm(false)}
                  className={`px-3 py-1 rounded-lg ${
                    isDarkMode
                      ? "bg-zinc-600 hover:bg-zinc-500 text-white"
                      : "bg-zinc-300 hover:bg-zinc-400 text-zinc-800"
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreatePost}
                  className={`px-3 py-1 rounded-lg ${
                    isDarkMode
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                      : "bg-indigo-500 hover:bg-indigo-600 text-white"
                  }`}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Posts List */}
      <div className="space-y-4 sm:space-y-6">
        {currentPosts.map((post) => (
          <div
            key={post.id}
            className={`p-4 rounded-lg ${isDarkMode ? "bg-zinc-800" : "bg-white shadow-md"}`}
          >
            <div className="flex items-start gap-3">
              <img
                src={post.avatar}
                alt={post.user}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <h3 className={`font-medium ${isDarkMode ? "text-white" : "text-zinc-900"}`}>
                    {post.user}
                  </h3>
                  <span className={`text-sm ${isDarkMode ? "text-zinc-400" : "text-zinc-500"}`}>
                    {post.timestamp}
                  </span>
                </div>
                <p className={`mt-2 text-sm sm:text-base break-words ${isDarkMode ? "text-zinc-300" : "text-zinc-600"}`}>
                  {post.content}
                </p>
                {post.image && (
                  <div className="mt-3 rounded-lg overflow-hidden">
                    <img src={post.image} alt="" className="w-full h-auto" />
                  </div>
                )}
                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
                  <button
                    onClick={() => handleLikeClick(post.id)}
                    className={`flex items-center gap-1 ${
                      isDarkMode ? "text-zinc-400 hover:text-indigo-400" : "text-zinc-500 hover:text-indigo-500"
                    }`}
                  >
                    <ThumbsUp className={`w-4 h-4 ${likedPostIds.includes(post.id) ? "fill-current text-indigo-500" : ""}`} />
                    <span>{post.likes}</span>
                  </button>
                  <button
                    onClick={() => toggleComments(post.id)}
                    className={`flex items-center gap-1 ${
                      isDarkMode ? "text-zinc-400 hover:text-indigo-400" : "text-zinc-500 hover:text-indigo-500"
                    }`}
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.comments}</span>
                  </button>
                  <button
                    className={`flex items-center gap-1 ${
                      isDarkMode ? "text-zinc-400 hover:text-indigo-400" : "text-zinc-500 hover:text-indigo-500"
                    }`}
                  >
                    <Share className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                  <button
                    className={`flex items-center gap-1 ${
                      isDarkMode ? "text-zinc-400 hover:text-indigo-400" : "text-zinc-500 hover:text-indigo-500"
                    }`}
                  >
                    <Bookmark className="w-4 h-4" />
                    <span>Save</span>
                  </button>
                </div>
              </div>
              <button
                className={`p-1 rounded-full ${
                  isDarkMode ? "hover:bg-zinc-700 text-zinc-400" : "hover:bg-zinc-100 text-zinc-500"
                }`}
              >
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>

            {/* Comments Section */}
            {activeCommentPostId === post.id && (
              <div className="mt-4 pl-12 sm:pl-14">
                <div className="space-y-3">
                  {post.commentsList.map((comment, index) => (
                    <div key={index} className={`p-3 rounded-lg ${isDarkMode ? "bg-zinc-700" : "bg-zinc-50"}`}>
                      <div className="flex items-start gap-2">
                        <img
                          src={comment.avatar}
                          alt={comment.user}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className={`font-medium ${isDarkMode ? "text-white" : "text-zinc-900"}`}>
                              {comment.user}
                            </span>
                            <span className={`text-xs ${isDarkMode ? "text-zinc-400" : "text-zinc-500"}`}>
                              {comment.timestamp}
                            </span>
                          </div>
                          <p className={`mt-1 text-sm break-words ${isDarkMode ? "text-zinc-300" : "text-zinc-600"}`}>
                            {comment.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex gap-2">
                  <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Write a comment..."
                    className={`flex-1 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      isDarkMode ? "bg-zinc-700 text-white" : "bg-zinc-100 text-zinc-800"
                    }`}
                  />
                  <button
                    onClick={() => handleAddComment(post.id)}
                    className={`p-2 rounded-lg ${
                      isDarkMode
                        ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                        : "bg-indigo-500 hover:bg-indigo-600 text-white"
                    }`}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 sm:mt-8">
        <div className="text-sm text-center sm:text-left w-full sm:w-auto">
          Showing {currentPage * postsPerPage - 4}-{Math.min(currentPage * postsPerPage, posts.length)} of {posts.length} posts
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`p-2 rounded-lg ${
              isDarkMode
                ? "bg-zinc-800 hover:bg-zinc-700 disabled:bg-zinc-800 disabled:opacity-50"
                : "bg-white hover:bg-zinc-50 disabled:bg-white disabled:opacity-50 shadow-sm"
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className={`text-sm ${isDarkMode ? "text-zinc-300" : "text-zinc-600"}`}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-lg ${
              isDarkMode
                ? "bg-zinc-800 hover:bg-zinc-700 disabled:bg-zinc-800 disabled:opacity-50"
                : "bg-white hover:bg-zinc-50 disabled:bg-white disabled:opacity-50 shadow-sm"
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunityFeed;