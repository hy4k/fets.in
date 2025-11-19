document.addEventListener('DOMContentLoaded', () => {
  const messagesContainer = document.getElementById('messages');
  const messageInput = document.getElementById('input');
  const sendButton = document.getElementById('send');

  // Advanced conversation state management
  let conversationHistory = [];
  let userProfile = {
    examInterest: null,
    experienceLevel: null,
    timeframe: null,
    concerns: []
  };

  // Comprehensive FETS Knowledge Base
  const FETS_KNOWLEDGE = {
    exams: {
      'GRE': {
        provider: 'ETS',
        cost: '$150 USD',
        duration: '3 hours 45 minutes',
        sections: ['Verbal', 'Quantitative', 'Analytical Writing'],
        tips: 'Focus on vocabulary building and practice time management',
        booking: 'Register through ETS account, select FETS as test center'
      },
      'IELTS': {
        provider: 'IELTS Official',
        cost: '₹17,000 approximately',
        duration: '2 hours 45 minutes',
        sections: ['Listening', 'Reading', 'Writing', 'Speaking'],
        tips: 'Practice speaking with native speakers, improve listening skills',
        booking: 'Book through IELTS official website or visit FETS'
      },
      'TOEFL': {
        provider: 'ETS',
        cost: '$160 USD',
        duration: '3 hours',
        sections: ['Reading', 'Listening', 'Speaking', 'Writing'],
        tips: 'Practice academic English, focus on note-taking skills',
        booking: 'Register through ETS TOEFL website'
      },
      'CMA USA': {
        provider: 'IMA',
        cost: '$415 per part',
        duration: '4 hours per part',
        parts: ['Part 1: Financial Planning', 'Part 2: Strategic Financial Management'],
        tips: 'Use official Wiley materials, practice case studies extensively',
        booking: 'Register through Prometric after IMA authorization'
      }
    },
    contact: {
      phones: ['+91 8089393992', '+91 9895541552', '+91 8089219722'],
      email: 'edu@fets.in',
      address: 'Fourth Floor, Kadooli Tower, West Nadakkavu, Vandipetta Junction, Calicut, Kerala - 673011',
      hours: 'Monday to Saturday, 9 AM to 6 PM',
      map: 'https://maps.app.goo.gl/a5Wi5BdEQVxeHARi8'
    },
    facility: {
      features: ['Individual noise-reduced booths', 'Biometric security', '24/7 CCTV', 'Power backup', 'Air conditioning'],
      security: ['Metal detectors', 'Personal items storage', 'Continuous monitoring'],
      amenities: ['Mock exams', 'Trained staff', 'Comfortable seating', 'Clean washrooms']
    }
  };

  // Advanced prompt engineering with conversation awareness
  function createIntelligentPrompt(userQuestion, conversationContext) {
    const recentHistory = conversationHistory.slice(-6).map(msg => `${msg.role}: ${msg.content}`).join('\n');
    
    return `You are FETS, an advanced AI assistant for Forun Testing & Educational Services, India's premier multi-brand exam center in Calicut, Kerala. You have deep knowledge about certification exams and personalized guidance capabilities.

CONVERSATION CONTEXT:
${recentHistory}

USER PROFILE INSIGHTS:
- Exam Interest: ${userProfile.examInterest || 'Not determined'}
- Experience Level: ${userProfile.experienceLevel || 'Not determined'}  
- Timeline: ${userProfile.timeframe || 'Not determined'}
- Previous Concerns: ${userProfile.concerns.join(', ') || 'None identified'}

CORE KNOWLEDGE:
🏢 FETS: India's only multi-brand center (75+ exams) | Served 20,000+ candidates | 99% satisfaction
📍 Location: Calicut, Kerala | Contact: +91 8089393992, edu@fets.in | Hours: Mon-Sat 9AM-6PM
🔐 Facility: Individual booths, biometric security, 24/7 CCTV, mock exams available
🤝 Partners: Prometric, Pearson VUE, ETS, IELTS, PSI, CMA USA, Language Cert, TOEFL

CURRENT QUESTION: "${userQuestion}"

RESPONSE GUIDELINES:
1. BE CONVERSATIONAL: Respond like a knowledgeable friend, not a robot
2. SHOW UNDERSTANDING: Reference previous conversation if relevant
3. ASK FOLLOW-UP QUESTIONS: Gather information to provide better help
4. PROVIDE SPECIFIC DETAILS: Include costs, timelines, procedures when relevant
5. OFFER NEXT STEPS: Always suggest concrete actions user can take
6. BE ENCOURAGING: Build confidence about exam success
7. PERSONALIZE: Tailor advice based on user's situation and concerns

Remember: You're not just answering questions - you're having an intelligent conversation to truly help this person succeed in their certification journey.`;
  }

  // Enhanced user profiling based on conversation
  function updateUserProfile(userMessage, aiResponse) {
    const message = userMessage.toLowerCase();
    
    // Detect exam interest
    const examKeywords = {
      'gre': 'GRE',
      'ielts': 'IELTS', 
      'toefl': 'TOEFL',
      'cma': 'CMA USA',
      'prometric': 'Prometric exams',
      'pearson': 'Pearson VUE exams'
    };
    
    for (let keyword in examKeywords) {
      if (message.includes(keyword)) {
        userProfile.examInterest = examKeywords[keyword];
        break;
      }
    }
    
    // Detect experience level
    if (message.includes('first time') || message.includes('never taken') || message.includes('beginner')) {
      userProfile.experienceLevel = 'Beginner';
    } else if (message.includes('retake') || message.includes('second time') || message.includes('again')) {
      userProfile.experienceLevel = 'Returning';
    }
    
    // Detect timeline urgency
    if (message.includes('urgent') || message.includes('soon') || message.includes('this month')) {
      userProfile.timeframe = 'Urgent';
    } else if (message.includes('planning') || message.includes('next year') || message.includes('future')) {
      userProfile.timeframe = 'Planning';
    }
    
    // Detect concerns
    const concerns = [];
    if (message.includes('nervous') || message.includes('anxious') || message.includes('worried')) {
      concerns.push('Test anxiety');
    }
    if (message.includes('cost') || message.includes('expensive') || message.includes('price')) {
      concerns.push('Cost concerns');
    }
    if (message.includes('prepare') || message.includes('study') || message.includes('ready')) {
      concerns.push('Preparation');
    }
    
    userProfile.concerns = [...new Set([...userProfile.concerns, ...concerns])];
  }

  // Enhanced message display with animations
  function addMessage(text, sender, animate = true) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('msg', sender + '-msg');
    
    if (animate) {
      messageDiv.style.opacity = '0';
      messageDiv.style.transform = 'translateY(20px)';
    }

    const messageContentDiv = document.createElement('div');
    messageContentDiv.classList.add('msg-content');
    
    if (sender === 'ai') {
      messageContentDiv.innerHTML = formatAIResponse(text);
    } else {
      messageContentDiv.textContent = text;
    }

    messageDiv.appendChild(messageContentDiv);
    messagesContainer.appendChild(messageDiv);
    
    if (animate) {
      setTimeout(() => {
        messageDiv.style.transition = 'all 0.3s ease-out';
        messageDiv.style.opacity = '1';
        messageDiv.style.transform = 'translateY(0)';
      }, 100);
    }
    
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // Enhanced response formatting
  function formatAIResponse(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/```(.*?)```/gs, '<code>$1</code>')
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n/g, '<br>')
      .replace(/(\+91[\s-]?[\d\s-]+)/g, '<a href="tel:$1" style="color: #0FA4AF; text-decoration: none;">$1</a>')
      .replace(/(edu@fets\.in)/g, '<a href="mailto:$1" style="color: #0FA4AF; text-decoration: none;">$1</a>')
      .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" style="color: #0FA4AF; text-decoration: none;">$1</a>');
  }

  // Advanced typing indicator
  function showAdvancedTyping() {
    const typingDiv = document.createElement('div');
    typingDiv.classList.add('msg', 'ai-msg', 'typing');
    typingDiv.id = 'typing-indicator';
    
    const typingContent = document.createElement('div');
    typingContent.className = 'msg-content';
    typingContent.innerHTML = `
      <div style="display: flex; align-items: center; gap: 8px;">
        <span>FETS is thinking</span>
        <div style="display: flex; gap: 3px;">
          <div style="width: 6px; height: 6px; background: #0FA4AF; border-radius: 50%; animation: typing-bounce 1.4s infinite ease-in-out;"></div>
          <div style="width: 6px; height: 6px; background: #0FA4AF; border-radius: 50%; animation: typing-bounce 1.4s infinite ease-in-out 0.2s;"></div>
          <div style="width: 6px; height: 6px; background: #0FA4AF; border-radius: 50%; animation: typing-bounce 1.4s infinite ease-in-out 0.4s;"></div>
        </div>
      </div>
    `;
    
    typingDiv.appendChild(typingContent);
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    return typingDiv;
  }

  function removeTyping(typingElement) {
    if (typingElement && typingElement.parentNode) {
      typingElement.style.transition = 'opacity 0.3s ease-out';
      typingElement.style.opacity = '0';
      setTimeout(() => {
        if (typingElement.parentNode) {
          messagesContainer.removeChild(typingElement);
        }
      }, 300);
    }
  }

  // Main intelligent conversation handler
  async function sendMessage() {
    const text = messageInput.value.trim();
    if (text === '') return;

    // Add user message to conversation history
    conversationHistory.push({ role: 'user', content: text });
    addMessage(text, 'user');
    messageInput.value = '';
    sendButton.disabled = true;

    const typingElement = showAdvancedTyping();

    // Enhanced API call with conversation context
    const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCW6xMz-LciTbxN33FQ7JaSWveMP1nfyZ0";

    try {
      const intelligentPrompt = createIntelligentPrompt(text, conversationHistory);
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            role: "user",
            parts: [{ text: intelligentPrompt }]
          }],
          generationConfig: {
            temperature: 0.9,
            topK: 30,
            topP: 0.95,
            maxOutputTokens: 800,
            candidateCount: 1
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        }),
      });

      removeTyping(typingElement);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0]) {
        const aiResponse = data.candidates[0].content.parts[0].text;
        
        // Add AI response to conversation history
        conversationHistory.push({ role: 'assistant', content: aiResponse });
        
        // Update user profile based on conversation
        updateUserProfile(text, aiResponse);
        
        // Limit conversation history to last 20 messages
        if (conversationHistory.length > 20) {
          conversationHistory = conversationHistory.slice(-20);
        }
        
        addMessage(aiResponse, 'ai');
      } else if (data.promptFeedback && data.promptFeedback.blockReason) {
        addMessage("I understand you have a question, but let's keep our conversation focused on FETS services and exam guidance. How can I help you with your certification journey? Feel free to call us at +91 8089393992 for any concerns.", 'ai');
      } else {
        addMessage("I'm having trouble processing that right now. Could you rephrase your question? Our team is always available at +91 8089393992 or edu@fets.in for immediate assistance.", 'ai');
      }

    } catch (error) {
      removeTyping(typingElement);
      console.error('Error:', error);
      addMessage("I'm experiencing some technical difficulties. Please try again, or contact FETS directly at +91 8089393992 or edu@fets.in. Our team is ready to help you!", 'ai');
    } finally {
      sendButton.disabled = false;
      messageInput.focus();
    }
  }

  // Enhanced event listeners
  sendButton.addEventListener('click', sendMessage);
  messageInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  });

  // Auto-resize input for longer messages
  messageInput.addEventListener('input', () => {
    messageInput.style.height = 'auto';
    messageInput.style.height = Math.min(messageInput.scrollHeight, 120) + 'px';
  });

  // Add CSS for typing animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes typing-bounce {
      0%, 80%, 100% { 
        transform: scale(0.8);
        opacity: 0.5;
      }
      40% { 
        transform: scale(1);
        opacity: 1;
      }
    }
    
    .msg {
      animation: slideIn 0.3s ease-out;
    }
    
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(style);

  // Focus on input when page loads
  messageInput.focus();
  
  console.log('🚀 Advanced FETS AI Assistant initialized with conversation memory and intelligent responses!');
});
