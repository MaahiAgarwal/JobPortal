import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Maximize2, Minimize2, MessageSquare, User, Bot, Paperclip, Mic, Search, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Chatbot.css';
import { generateResponse } from '../services/gemini';
import { ErrorBoundary } from './ErrorBoundary';
import { useRateLimit } from './useRateLimit';
import { 
  jobKnowledgeBase, 
  careerTransitionGuidance, 
  responseTemplates,
  generateAdvancedResponse 
} from './JobKnowledgeBase';

const Chatbot = ({ isDarkMode, user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const { count, isLimited, increment } = useRateLimit(15, 60000); // Increased rate limit
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: `Hello${user?.name ? ` ${user.name}` : ''}! I'm JobBot Pro, your AI career assistant. I can help with resumes, interviews, job searches, and career advice. What would you like to focus on today?`,
      sender: 'bot',
      timestamp: new Date().toISOString()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [userPreferences, setUserPreferences] = useState({
    jobType: null,
    location: null,
    skills: [],
    experienceLevel: null,
    industry: null
  });
  const [feedback, setFeedback] = useState({});
  const [conversationContext, setConversationContext] = useState('general');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Enhanced domain knowledge
  const domainKnowledge = {
    techSalaries: {
      'Software Engineer': {
        'Entry': '$85,000 - $120,000',
        'Mid': '$120,000 - $160,000', 
        'Senior': '$160,000 - $220,000',
        'Lead': '$180,000 - $250,000+'
      },
      'Data Scientist': {
        'Entry': '$95,000 - $130,000',
        'Mid': '$130,000 - $170,000',
        'Senior': '$170,000 - $250,000',
        'Lead': '$200,000 - $300,000+'
      },
      'Product Manager': {
        'Entry': '$90,000 - $120,000',
        'Mid': '$120,000 - $150,000',
        'Senior': '$150,000 - $200,000',
        'Lead': '$180,000 - $250,000+'
      }
    },
    interviewFormats: {
      'FAANG': [
        '1 Phone Screen (45min)',
        '2 Technical Rounds (LeetCode)',
        '1 System Design',
        '1 Behavioral'
      ],
      'Startups': [
        '1 Technical Take-home',
        '2-3 Interview Rounds',
        'Culture Fit Discussion'
      ],
      'Enterprise': [
        'HR Screening',
        'Technical Assessment',
        'Team Interviews',
        'Executive Meeting'
      ]
    },
    trendingSkills: {
      '2024': [
        'AI/ML Engineering',
        'Cloud Architecture',
        'Cybersecurity',
        'Data Engineering',
        'DevOps',
        'UX/UI Design'
      ]
    }
  };

  const quickSuggestions = [
    "How do I optimize my resume for ATS?",
    "What are common technical interview questions?",
    "Find software engineering jobs in my area",
    "How to negotiate a higher salary offer?",
    "How to prepare for a system design interview?",
    "What skills should I learn to advance my career?",
    "How to transition into tech from another field?",
    "Best remote job platforms for developers"
  ];

  const systemPrompt = `
  You are JobBot Pro, an expert AI career coach specializing in technical roles. Follow these guidelines:

  1. Response Structure:
  - Key Points (bullet points)
  - Action Steps (numbered list)
  - Examples (concrete illustrations)
  - Resources (when applicable)

  2. For technical questions:
  - Include code snippets when relevant (use markdown code blocks)
  - Specify languages/frameworks
  - Mention complexity analysis for algorithms

  3. For salary questions:
  - Provide 2024 market ranges with location adjustments
  - Include equity/benefits considerations
  - Mention negotiation strategies

  4. For interview prep:
  - Give specific question examples
  - Provide evaluation criteria
  - Include time complexity for technical answers

  5. Context Awareness:
  - Maintain conversation context
  - Remember user preferences
  - Build on previous messages

  Current user context:
  ${user ? `Name: ${user.name}` : 'Guest User'}
  ${userPreferences.jobType ? `Job Type: ${userPreferences.jobType}` : ''}
  ${userPreferences.location ? `Location: ${userPreferences.location}` : ''}
  ${userPreferences.skills.length > 0 ? `Skills: ${userPreferences.skills.join(', ')}` : ''}
  ${userPreferences.experienceLevel ? `Experience: ${userPreferences.experienceLevel}` : ''}
  ${userPreferences.industry ? `Industry: ${userPreferences.industry}` : ''}

  Current conversation context: ${conversationContext}

  Always be specific, actionable, and professional. Avoid vague language.
  `;

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  useEffect(() => {
    const savedMessages = localStorage.getItem('chatbotMessages');
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        setMessages(parsedMessages);
        
        // Extract preferences from saved messages
        const lastUserMessages = parsedMessages
          .filter(msg => msg.sender === 'user')
          .slice(-3)
          .map(msg => msg.text)
          .join(' ');
        
        if (lastUserMessages) {
          setUserPreferences(prev => ({
            ...prev,
            ...extractJobPreferences(lastUserMessages)
          }));
        }
      } catch (error) {
        console.error('Error loading chat history:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (messages.length > 1) {
      localStorage.setItem('chatbotMessages', JSON.stringify(messages));
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsMinimized(false);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    
    // Show suggestions as user types
    if (e.target.value.length > 2) {
      const input = e.target.value.toLowerCase();
      const matchedSuggestions = quickSuggestions.filter(suggestion => 
        suggestion.toLowerCase().includes(input)
      ).slice(0, 3);
      setSuggestions(matchedSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setMessage(suggestion);
    handleSubmit({ preventDefault: () => {} }, suggestion);
  };

  const extractJobPreferences = (text) => {
    const preferences = {...userPreferences};
    
    // Enhanced job type detection
    const jobTypePatterns = [
      { pattern: /full[ -]?time/i, value: 'Full-time' },
      { pattern: /part[ -]?time/i, value: 'Part-time' },
      { pattern: /contract(?!\s*work)/i, value: 'Contract' },
      { pattern: /freelance/i, value: 'Freelance' },
      { pattern: /remote|work from home|wfh/i, value: 'Remote' },
      { pattern: /hybrid/i, value: 'Hybrid' },
      { pattern: /intern/i, value: 'Internship' }
    ];
    
    for (const { pattern, value } of jobTypePatterns) {
      if (pattern.test(text)) {
        preferences.jobType = value;
        break;
      }
    }
    
    // Improved location detection
    const locationMatch = text.match(/(?:in|near|around|at)\s+([A-Za-z\s,]+)(?:,|\s|$)/i);
    if (locationMatch && locationMatch[1]) {
      preferences.location = locationMatch[1].trim();
    }
    
    // Enhanced skills detection with categories
    const technicalSkills = [
      'javascript', 'python', 'java', 'c#', 'c++', 'go', 'rust',
      'react', 'angular', 'vue', 'svelte', 'node', 'express', 'django',
      'spring', 'flask', 'laravel', 'rails', 
      'sql', 'nosql', 'mongodb', 'postgresql', 'mysql', 'dynamodb',
      'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'terraform',
      'machine learning', 'ai', 'data science', 'data analysis',
      'cybersecurity', 'devops', 'sre', 'backend', 'frontend', 'fullstack'
    ];
    
    const softSkills = [
      'communication', 'leadership', 'teamwork', 'problem solving',
      'critical thinking', 'adaptability', 'time management',
      'project management', 'agile', 'scrum', 'kanban'
    ];
    
    const allSkills = [...technicalSkills, ...softSkills];
    const skills = [...preferences.skills || []];
    
    for (const skill of allSkills) {
      if (text.toLowerCase().includes(skill)) {
        const formattedSkill = skill.split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        
        if (!skills.includes(formattedSkill)) {
          skills.push(formattedSkill);
        }
      }
    }
    
    if (skills.length > 0) {
      preferences.skills = skills;
    }
    
    // Experience level detection
    const experiencePatterns = [
      { pattern: /(entry[ -]?level|junior|beginner)/i, value: 'Entry-level' },
      { pattern: /(mid[ -]?level|experienced)/i, value: 'Mid-level' },
      { pattern: /(senior|lead|principal)/i, value: 'Senior' },
      { pattern: /(manager|director|executive)/i, value: 'Management' }
    ];
    
    for (const { pattern, value } of experiencePatterns) {
      if (pattern.test(text)) {
        preferences.experienceLevel = value;
        break;
      }
    }
    
    // Industry detection
    const industryPatterns = [
      { pattern: /tech|software|it|computer/i, value: 'Technology' },
      { pattern: /finance|banking|investment/i, value: 'Finance' },
      { pattern: /health(care)?|medical/i, value: 'Healthcare' },
      { pattern: /education|school|university/i, value: 'Education' },
      { pattern: /retail|e[ -]?commerce/i, value: 'Retail' },
      { pattern: /manufacturing|industrial/i, value: 'Manufacturing' }
    ];
    
    for (const { pattern, value } of industryPatterns) {
      if (pattern.test(text)) {
        preferences.industry = value;
        break;
      }
    }
    
    return preferences;
  };

  const generateEnhancedResponse = async (userInput) => {
    // Check for specific queries that can use domain knowledge
    const lowerInput = userInput.toLowerCase();
    
    // Salary queries
    if (lowerInput.includes('salary') || lowerInput.includes('pay')) {
      const role = userPreferences.skills[0] || 'Software Engineer';
      if (domainKnowledge.techSalaries[role]) {
        const level = userPreferences.experienceLevel || 'Mid';
        const salaryRange = domainKnowledge.techSalaries[role][level] || 
                            domainKnowledge.techSalaries[role]['Mid'];
        
        let locationAdjustment = '';
        if (userPreferences.location) {
          locationAdjustment = `\n\nLocation Adjustment: Salaries in ${userPreferences.location} may vary by ±15% based on cost of living.`;
        }
        
        return {
          text: `Current salary ranges for ${role} (${level}, 2024):\n\nBase Salary: ${salaryRange}\n\nAdditional Compensation:\n- Equity: 0-20% of base salary\n- Bonuses: 5-15% of base salary\n- Benefits: $10,000-$30,000 value${locationAdjustment}\n\nWould you like negotiation tips specific to this role?`,
          action: 'suggestSalaryNegotiation',
          success: true
        };
      }
    }
    
    // Interview queries
    if (lowerInput.includes('interview') || lowerInput.includes('process')) {
      const companyType = lowerInput.includes('faang') ? 'FAANG' : 
                         lowerInput.includes('startup') ? 'Startups' : 
                         lowerInput.includes('enterprise') ? 'Enterprise' : null;
      
      if (companyType && domainKnowledge.interviewFormats[companyType]) {
        return {
          text: `Typical interview process for ${companyType} companies:\n\n${domainKnowledge.interviewFormats[companyType].map(step => `• ${step}`).join('\n')}\n\nWould you like preparation tips for any specific stage?`,
          action: 'suggestInterviewPrep',
          success: true
        };
      }
    }
    
    // Skills queries
    if (lowerInput.includes('skill') || lowerInput.includes('learn') || lowerInput.includes('technology')) {
      if (domainKnowledge.trendingSkills['2024']) {
        const relevantSkills = userPreferences.skills.length > 0 
          ? domainKnowledge.trendingSkills['2024'].filter(skill => 
              skill.toLowerCase().includes(userPreferences.skills[0]?.toLowerCase() || '')
            )
          : domainKnowledge.trendingSkills['2024'];
        
        if (relevantSkills.length > 0) {
          return {
            text: `Top trending skills in 2024 for ${userPreferences.skills[0] ? userPreferences.skills[0] + ' roles' : 'tech'}:\n\n${relevantSkills.map(skill => `• ${skill}`).join('\n')}\n\nWould you like learning resources for any of these?`,
            action: 'suggestLearningResources',
            success: true
          };
        }
      }
    }
    
    // Use knowledge base for common queries
    const knowledgeResponse = generateAdvancedResponse(userInput, userPreferences, messages);
    if (knowledgeResponse && knowledgeResponse !== "I'm here to help with your job search and career questions...") {
      return {
        text: knowledgeResponse,
        action: null,
        success: true
      };
    }
    
    // Use Gemini for other queries
    try {
      const response = await generateResponse(userInput, messages, systemPrompt);
      return {
        ...response,
        text: formatResponse(response.text)
      };
    } catch (error) {
      console.error('Error generating response:', error);
      return {
        success: false,
        text: "I'm having trouble connecting to my knowledge base. Please try again later.",
        error: error.message
      };
    }
  };

  const formatResponse = (text) => {
    // Enhanced markdown to HTML conversion
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/\n/g, '<br />')
      .replace(/^•\s(.*?)(<br \/>|$)/gm, '• $1<br />');
  };

  const handleSubmit = async (e, suggestionText = null) => {
    e.preventDefault();
    const userInput = suggestionText || message;
    if (!userInput.trim()) return;

    if (isLimited) {
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: "I'm getting a lot of requests. Please wait a moment before sending another message.",
        sender: 'bot',
        timestamp: new Date().toISOString(),
        isError: true
      }]);
      return;
    }

    increment();
    
    const userMessage = {
      id: Date.now(),
      text: userInput,
      sender: 'user',
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setSuggestions([]);
    
    const newPreferences = extractJobPreferences(userInput);
    setUserPreferences(newPreferences);
    
    // Update conversation context based on user input
    updateConversationContext(userInput);
    
    setIsTyping(true);
    
    try {
      const response = await generateEnhancedResponse(userInput);
      
      const botMessage = {
        id: Date.now() + 1,
        text: response.text,
        sender: 'bot',
        timestamp: new Date().toISOString(),
        action: response.action,
        isError: !response.success
      };
      
      setMessages(prev => [...prev, botMessage]);
      
      if (response.success) {
        generateSuggestions(userInput, newPreferences);
        if (response.action) {
          handleBotAction(response.action, newPreferences);
        }
      }
      
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "Sorry, something went wrong. Please try again.",
        sender: 'bot',
        timestamp: new Date().toISOString(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const updateConversationContext = (userInput) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('resume') || input.includes('cv')) {
      setConversationContext('resume');
    } else if (input.includes('interview')) {
      setConversationContext('interview');
    } else if (input.includes('salary') || input.includes('pay') || input.includes('compensation')) {
      setConversationContext('salary');
    } else if (input.includes('job') && (input.includes('search') || input.includes('find'))) {
      setConversationContext('jobSearch');
    } else if (input.includes('skill') || input.includes('learn')) {
      setConversationContext('skills');
    } else if (input.includes('career') && input.includes('change')) {
      setConversationContext('careerTransition');
    }
  };

  const handleBotAction = (action, preferences) => {
    switch (action) {
      case 'suggestJobSearch':
        const searchParams = new URLSearchParams();
        if (preferences.jobType) searchParams.append('type', preferences.jobType);
        if (preferences.location) searchParams.append('location', preferences.location);
        if (preferences.skills.length > 0) searchParams.append('skills', preferences.skills.join(','));
        
        setTimeout(() => {
          const actionMessage = {
            id: Date.now(),
            text: `Would you like to search for ${preferences.jobType || ''} jobs ${preferences.location ? 'in ' + preferences.location : ''} matching your skills (${preferences.skills.join(', ') || 'your field'})?`,
            sender: 'bot',
            timestamp: new Date().toISOString(),
            buttons: [
              {
                text: 'Search Jobs',
                action: () => navigate(`/all-jobs?${searchParams.toString()}`)
              },
              {
                text: 'Refine Search',
                action: () => {
                  setMessages(prev => [...prev, {
                    id: Date.now() + 1,
                    text: "Let me help refine your search. What specific criteria are you looking for in your next role?",
                    sender: 'bot',
                    timestamp: new Date().toISOString()
                  }]);
                }
              }
            ]
          };
          setMessages(prev => [...prev, actionMessage]);
        }, 1000);
        break;
        
      case 'suggestRemoteJobs':
        setTimeout(() => {
          const actionMessage = {
            id: Date.now(),
            text: "Here are remote opportunities matching your profile:",
            sender: 'bot',
            timestamp: new Date().toISOString(),
            buttons: [
              {
                text: 'View Remote Jobs',
                action: () => navigate('/all-jobs?type=Remote')
              },
              {
                text: 'View Hybrid Jobs',
                action: () => navigate('/all-jobs?type=Hybrid')
              },
              {
                text: 'Remote Work Tips',
                action: () => {
                  setMessages(prev => [...prev, {
                    id: Date.now() + 1,
                    text: jobKnowledgeBase.jobSearchStrategies.remoteWork.skills.map(
                      skill => `• ${skill}`
                    ).join('\n'),
                    sender: 'bot',
                    timestamp: new Date().toISOString()
                  }]);
                }
              }
            ]
          };
          setMessages(prev => [...prev, actionMessage]);
        }, 1000);
        break;
        
      case 'suggestSalaryNegotiation':
        setTimeout(() => {
          const actionMessage = {
            id: Date.now(),
            text: "Would you like specific negotiation strategies for your situation?",
            sender: 'bot',
            timestamp: new Date().toISOString(),
            buttons: [
              {
                text: 'Show Negotiation Tips',
                action: () => {
                  setMessages(prev => [...prev, {
                    id: Date.now() + 1,
                    text: jobKnowledgeBase.salaryNegotiation.tactics.map(
                      (tip, i) => `${i + 1}. ${tip}`
                    ).join('\n'),
                    sender: 'bot',
                    timestamp: new Date().toISOString()
                  }]);
                }
              },
              {
                text: 'Email Templates',
                action: () => {
                  setMessages(prev => [...prev, {
                    id: Date.now() + 1,
                    text: "Here's a sample negotiation email template:\n\nSubject: Follow-Up on [Job Title] Offer\n\nDear [Hiring Manager],\n\nThank you for the opportunity... [customize with your specifics]",
                    sender: 'bot',
                    timestamp: new Date().toISOString()
                  }]);
                }
              }
            ]
          };
          setMessages(prev => [...prev, actionMessage]);
        }, 1000);
        break;
        
      case 'suggestInterviewPrep':
        setTimeout(() => {
          const actionMessage = {
            id: Date.now(),
            text: "I can help you prepare for specific interview stages:",
            sender: 'bot',
            timestamp: new Date().toISOString(),
            buttons: [
              {
                text: 'Technical Questions',
                action: () => {
                  setMessages(prev => [...prev, {
                    id: Date.now() + 1,
                    text: jobKnowledgeBase.interviewPreparation.commonQuestions.technical.join('\n• '),
                    sender: 'bot',
                    timestamp: new Date().toISOString()
                  }]);
                }
              },
              {
                text: 'Behavioral Questions',
                action: () => {
                  setMessages(prev => [...prev, {
                    id: Date.now() + 1,
                    text: "Common behavioral questions:\n\n" + 
                      jobKnowledgeBase.interviewPreparation.commonQuestions.behavioral.join('\n• '),
                    sender: 'bot',
                    timestamp: new Date().toISOString()
                  }]);
                }
              },
              {
                text: 'Mock Interview',
                action: () => {
                  setMessages(prev => [...prev, {
                    id: Date.now() + 1,
                    text: "Let's practice! I'll ask you interview questions and provide feedback. Ready for your first question?",
                    sender: 'bot',
                    timestamp: new Date().toISOString()
                  }]);
                }
              }
            ]
          };
          setMessages(prev => [...prev, actionMessage]);
        }, 1000);
        break;
        
      default:
        break;
    }
  };

  const generateSuggestions = (userInput, preferences) => {
    const lowercaseInput = userInput.toLowerCase();
    let newSuggestions = [];
    
    // Context-aware suggestions
    switch(conversationContext) {
      case 'resume':
        newSuggestions = [
          "How to quantify achievements on my resume?",
          "ATS-friendly resume templates",
          "Should I include a summary section?",
          "How long should my resume be?"
        ];
        break;
        
      case 'interview':
        newSuggestions = [
          "How to answer behavioral questions using STAR?",
          "Common system design questions",
          "How to approach take-home assignments",
          "What to wear for a video interview"
        ];
        break;
        
      case 'salary':
        newSuggestions = [
          "How to research company salary bands",
          "Negotiation email templates",
          "How to evaluate total compensation",
          "When to discuss salary in the interview process"
        ];
        break;
        
      case 'jobSearch':
        newSuggestions = [
          `Find ${preferences.jobType || ''} jobs ${preferences.location ? 'in ' + preferences.location : ''}`,
          `Top certifications for ${preferences.skills[0] || 'your field'}`,
          "How to tailor my cover letter",
          "Best job boards for my industry"
        ];
        break;
        
      case 'skills':
        newSuggestions = [
          `Best courses for ${preferences.skills[0] || 'new skills'}`,
          "How to showcase skills on LinkedIn",
          "Certifications vs. practical experience",
          "In-demand skills for 2024"
        ];
        break;
        
      case 'careerTransition':
        newSuggestions = [
          "How to highlight transferable skills",
          "Entry-level positions in new field",
          "Networking strategies for career changers",
          "Should I go back to school?"
        ];
        break;
        
      default:
        newSuggestions = quickSuggestions.slice(0, 4);
    }
    
    // Filter based on preferences if available
    if (preferences.skills.length > 0) {
      newSuggestions = newSuggestions.map(suggestion => 
        suggestion.replace('your field', preferences.skills[0])
      );
    }
    
    setSuggestions(newSuggestions);
  };

  const handleFeedback = (messageId, isHelpful) => {
    setFeedback(prev => ({
      ...prev,
      [messageId]: isHelpful
    }));
    
    if (!isHelpful) {
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: "I'm sorry my response wasn't helpful. Could you please specify what you'd like me to clarify or expand on?",
        sender: 'bot',
        timestamp: new Date().toISOString()
      }]);
    } else {
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: "Thank you for your feedback! Is there anything else I can help you with?",
        sender: 'bot',
        timestamp: new Date().toISOString()
      }]);
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const clearChat = () => {
    setMessages([
      {
        id: Date.now(),
        text: "Chat history cleared. How can I help you today?",
        sender: 'bot',
        timestamp: new Date().toISOString()
      }
    ]);
    setUserPreferences({
      jobType: null,
      location: null,
      skills: [],
      experienceLevel: null,
      industry: null
    });
    setConversationContext('general');
    localStorage.removeItem('chatbotMessages');
  };

  const handleButtonAction = (action) => {
    if (typeof action === 'function') {
      action();
    }
  };

  return (
    <>
      <button
        onClick={toggleChatbot}
        className={`chatbot-toggle ${isDarkMode ? 'dark' : ''}`}
        aria-label="Toggle chatbot"
      >
        <MessageSquare size={24} />
        <span className="unread-badge">{messages.length > 1 && !isOpen ? '●' : ''}</span>
      </button>

      {isOpen && (
        <div className={`chatbot-container ${isDarkMode ? 'dark' : ''} ${isMinimized ? 'minimized' : ''}`}>
          <div className="chatbot-header">
            <div className="chatbot-title">
              <Bot size={20} />
              <h3>JobBot Pro</h3>
              <span className="ai-badge">AI Career Assistant</span>
            </div>
            <div className="chatbot-controls">
              <button onClick={clearChat} aria-label="Clear chat" title="Clear chat history">
                <X size={16} />
              </button>
              <button onClick={toggleMinimize} aria-label={isMinimized ? 'Maximize' : 'Minimize'}>
                {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
              </button>
              <button onClick={toggleChatbot} aria-label="Close">
                <X size={18} />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              <div className="chatbot-messages">
                {messages.map((msg) => (
                  <div key={msg.id} className={`message ${msg.sender} ${msg.isError ? 'error' : ''}`}>
                    <div className="message-avatar">
                      {msg.sender === 'bot' ? (
                        <Bot size={20} className={msg.isError ? 'error-icon' : ''} />
                      ) : (
                        <User size={20} />
                      )}
                    </div>
                    <div className="message-content">
                      <div 
                        className="message-text" 
                        dangerouslySetInnerHTML={{ __html: msg.text }}
                      />
                      {msg.buttons && (
                        <div className="message-buttons">
                          {msg.buttons.map((button, index) => (
                            <button 
                              key={index} 
                              onClick={() => handleButtonAction(button.action)}
                              className="action-button"
                            >
                              {button.text.includes('Search') || button.text.includes('View') ? (
                                <>
                                  <Search size={14} />
                                  <span>{button.text}</span>
                                </>
                              ) : (
                                button.text
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                      <div className="message-footer">
                        <span className="message-time">{formatTime(msg.timestamp)}</span>
                        {msg.sender === 'bot' && !msg.isError && (
                          <div className="message-feedback">
                            <span>Helpful?</span>
                            <button 
                              onClick={() => handleFeedback(msg.id, true)}
                              className={feedback[msg.id] === true ? 'active' : ''}
                              aria-label="Helpful"
                            >
                              <ThumbsUp size={14} />
                            </button>
                            <button 
                              onClick={() => handleFeedback(msg.id, false)}
                              className={feedback[msg.id] === false ? 'active' : ''}
                              aria-label="Not helpful"
                            >
                              <ThumbsDown size={14} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="message bot">
                    <div className="message-avatar">
                      <Bot size={20} />
                    </div>
                    <div className="message-content">
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {suggestions.length > 0 && !isTyping && (
                <div className="chatbot-suggestions">
                  {suggestions.map((suggestion, index) => (
                    <button 
                      key={index} 
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="suggestion-button"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}

              <form onSubmit={handleSubmit} className="chatbot-input">
                <div className="input-actions">
                  <button type="button" aria-label="Attach file" title="Attach file">
                    <Paperclip size={18} />
                  </button>
                  <button type="button" aria-label="Voice input" title="Voice input">
                    <Mic size={18} />
                  </button>
                </div>
                <input
                  type="text"
                  value={message}
                  onChange={handleInputChange}
                  placeholder="Ask about jobs, resumes, interviews..."
                  ref={inputRef}
                  disabled={isLimited}
                />
                <button 
                  type="submit" 
                  aria-label="Send message"
                  disabled={isLimited || !message.trim()}
                  title="Send message"
                >
                  <Send size={18} />
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Chatbot;