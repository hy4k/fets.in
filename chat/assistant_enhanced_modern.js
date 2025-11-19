document.addEventListener('DOMContentLoaded', () => {
  const messagesContainer = document.getElementById('messages');
  const messageInput = document.getElementById('input');
  const sendButton = document.getElementById('send');

  // Enhanced FETS AI System Prompt with comprehensive knowledge base
  const FETS_SYSTEM_PROMPT = `You are FETS, the official AI assistant for Forun Testing & Educational Services (FETS). Your primary role is to provide expert guidance on FETS's services, exam procedures, and policies, as well as to offer educational advice to help users succeed in their academic and professional goals. You should be knowledgeable, helpful, and maintain a professional yet friendly tone that aligns with the FETS brand.

**About FETS:**
- FETS (Forun Testing & Educational Services) is an online exam center located in Kozhikode (Calicut), Kerala, India, established in 2021
- Mission: To make world-class certification exams more accessible, more secure, and more student-focused than ever before
- India's ONLY multi-brand center officially partnered with ALL major global exam bodies
- Over 75 exams under one roof with 99% satisfaction rate and zero security breaches
- Served over 20,000 candidates since 2021
- Core values: Secure. Reliable. Innovative.

**Location & Contact:**
- Address: Fourth Floor, Kadooli Tower, West Nadakkavu, Vandipetta Junction, Calicut, Kerala, India - 673011
- Phone: +91 8089393992, +91 9895541552, +91 8089219722
- Email: edu@fets.in
- Working Hours: Monday to Saturday, 9 AM to 6 PM
- Map: https://maps.app.goo.gl/a5Wi5BdEQVxeHARi8

**Exam Partners & Types:**
We offer exams from ALL major providers: Prometric, Pearson VUE, ETS, IELTS, PSI, CMA USA, GRE, Language Cert, TOEFL
- IT certifications, healthcare credentials, language tests (IELTS, TOEFL)
- Professional licenses and academic exams (GRE)
- Over 75 different exam types available

**Testing Environment:**
- Individual, noise-reduced testing booths
- Modern technology with power backups
- Military-grade security: biometric authentication, 24/7 CCTV, metal detectors
- Trained staff and continuous monitoring
- 'Test Drive' mock exams available

**Security & Policies:**
- Full biometric authentication and ID verification
- Strict prohibition of personal items (phones, watches, electronics, bags, notes, food/drink)
- Erasable note board/marker OR scratch paper/pencil provided (depending on exam)
- Testing accommodations available with pre-approval from exam sponsor

**Your Core Capabilities:**
1. **FETS Business Knowledge:** Provide detailed information about services, booking procedures, policies, contact info, and testing environment
2. **Exam Guidance:** Offer preparation tips, study strategies, test-taking techniques, and anxiety management
3. **Career Advice:** Guide users on certification paths for IT, healthcare, language, and professional development
4. **Booking Support:** Help with exam scheduling, slot availability, and voucher information

**Communication Style:**
- Professional and authoritative - you are the expert on FETS and certification exams
- Warm and encouraging - users often have anxiety about exams
- Clear and informative - provide practical, actionable advice
- Patient and thorough - take time to understand user needs
- Use emojis sparingly and only when appropriate (🎓 for education, 📚 for study tips, etc.)

**Response Guidelines:**
- Keep responses concise but comprehensive
- Use bullet points for lists and steps
- Provide specific contact information when relevant
- Suggest next steps or follow-up actions
- If unsure about specific policies, recommend contacting FETS directly
- Always be encouraging about exam preparation and success

Remember: You represent FETS's commitment to excellence and student success. Your responses should build confidence and provide clear guidance while maintaining professional standards.`;

  // Enhanced message handling with better animations
  let messageId = 0;

  function createTypingIndicator() {
    const typingMsg = document.createElement('div');
    typingMsg.className = 'msg ai-msg typing';
    typingMsg.id = 'typing-indicator';
    
    const content = document.createElement('div');
    content.className = 'msg-content';
    content.innerHTML = `
      Typing
      <span class="typing-dots">
        <span></span>
        <span></span>
        <span></span>
      </span>
    `;
    
    typingMsg.appendChild(content);
    return typingMsg;
  }

  function addMessage(content, isUser = false, animated = true) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `msg ${isUser ? 'user-msg' : 'ai-msg'}`;
    messageDiv.dataset.messageId = ++messageId;
    
    if (!animated) {
      messageDiv.style.animation = 'none';
    }
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'msg-content';
    contentDiv.textContent = content;
    
    messageDiv.appendChild(contentDiv);
    messagesContainer.appendChild(messageDiv);
    
    // Smooth scroll to bottom
    setTimeout(() => {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 100);
    
    return messageDiv;
  }

  function showTypingIndicator() {
    const typingIndicator = createTypingIndicator();
    messagesContainer.appendChild(typingIndicator);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    return typingIndicator;
  }

  function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }

  async function getAIResponse(userMessage) {
    // Enhanced AI response simulation with FETS knowledge
    const responses = {
      greeting: [
        "Hello! Welcome to FETS. I'm here to help you with all your certification exam needs. Whether you're looking to book an exam, need preparation tips, or want to know about our testing environment, I'm here to assist! 🎓",
        "Hi there! Great to see you at FETS. How can I help you today? I can assist with exam bookings, provide information about our 75+ available certifications, or help with study strategies.",
        "Welcome! I'm your FETS AI assistant. Ready to help you succeed in your certification journey. What would you like to know about our exams or services?"
      ],
      
      booking: [
        "I'd be happy to help you with exam booking! FETS offers over 75 different certification exams from all major providers including Prometric, Pearson VUE, ETS, and more.\n\n📋 To book an exam:\n• Visit our center or call +91 8089393992\n• Choose your preferred date and time\n• Bring valid ID for verification\n• We're open Monday-Saturday, 9 AM to 6 PM\n\nWhich specific exam are you interested in?",
        "Absolutely! We make exam booking simple and convenient. You can schedule from our wide range of IT, healthcare, language, and professional certifications.\n\n🏢 Visit us at:\nFourth Floor, Kadooli Tower\nWest Nadakkavu, Vandipetta Junction\nCalicut, Kerala - 673011\n\nOr call us at +91 8089393992. What exam would you like to book?"
      ],
      
      location: [
        "🗺️ You can find FETS at:\n\nFourth Floor, Kadooli Tower\nWest Nadakkavu, Vandipetta Junction\nCalicut, Kerala, India - 673011\n\n📞 Contact: +91 8089393992\n📧 Email: edu@fets.in\n🕘 Hours: Mon-Sat, 9 AM to 6 PM\n\nMap: https://maps.app.goo.gl/a5Wi5BdEQVxeHARi8"
      ],
      
      preparation: [
        "Great question! Here are my top exam preparation tips:\n\n📚 Study Strategies:\n• Create a structured study schedule\n• Use official practice materials\n• Take advantage of our 'Test Drive' mock exams\n• Focus on weak areas identified in practice tests\n\n🧘 Exam Day Tips:\n• Get good sleep the night before\n• Arrive 30 minutes early\n• Bring valid ID and required documents\n• Stay calm and focused\n\nWhat specific exam are you preparing for? I can provide more targeted advice!",
        "Excellent! Preparation is key to success. At FETS, we recommend:\n\n✅ Study Plan:\n• Start preparation 4-6 weeks in advance\n• Use official study guides and practice tests\n• Join study groups or online forums\n• Schedule regular review sessions\n\n🎯 Our Mock Exams:\n• Experience the actual test environment\n• Identify knowledge gaps\n• Build confidence and reduce anxiety\n\nWould you like information about mock exams for your specific certification?"
      ],
      
      security: [
        "Security is our top priority at FETS! Here's what makes us India's most secure testing center:\n\n🔒 Security Measures:\n• Biometric authentication for entry\n• 24/7 CCTV monitoring\n• Metal detectors at entrance\n• Trained security staff\n• Individual, monitored testing booths\n\n📵 Prohibited Items:\n• Mobile phones and electronics\n• Bags, watches, jewelry\n• Food, drinks, and personal notes\n• Any unauthorized materials\n\nWe provide erasable note boards or scratch paper as needed. Zero security breaches since 2021!"
      ],
      
      default: [
        "I'm here to help with all your FETS-related questions! I can assist with:\n\n🎯 Exam booking and scheduling\n📍 Center location and contact info\n📚 Study tips and preparation strategies\n🔒 Security policies and procedures\n💼 Career guidance and certification paths\n\nWhat specific information would you like to know?",
        "Thanks for reaching out! As your FETS AI assistant, I'm equipped to help with exam bookings, preparation advice, center information, and more.\n\nFETS serves over 20,000 candidates with 75+ certification exams under one roof. How can I make your certification journey successful?",
        "Hello! I'm here to support your certification goals. Whether you need help with:\n\n• Booking exams (IT, healthcare, language tests)\n• Understanding our testing environment\n• Preparation strategies\n• Contact information\n\nJust let me know what you'd like to know! 🎓"
      ]
    };

    // Simple keyword-based response selection
    const lowerMessage = userMessage.toLowerCase();
    
    let responseCategory = 'default';
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      responseCategory = 'greeting';
    } else if (lowerMessage.includes('book') || lowerMessage.includes('schedule') || lowerMessage.includes('appointment') || lowerMessage.includes('slot')) {
      responseCategory = 'booking';
    } else if (lowerMessage.includes('location') || lowerMessage.includes('address') || lowerMessage.includes('where') || lowerMessage.includes('contact')) {
      responseCategory = 'location';
    } else if (lowerMessage.includes('study') || lowerMessage.includes('prepare') || lowerMessage.includes('tips') || lowerMessage.includes('exam') || lowerMessage.includes('mock')) {
      responseCategory = 'preparation';
    } else if (lowerMessage.includes('security') || lowerMessage.includes('safe') || lowerMessage.includes('prohibited') || lowerMessage.includes('allowed')) {
      responseCategory = 'security';
    }
    
    const categoryResponses = responses[responseCategory];
    return categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
  }

  async function sendMessage() {
    const message = messageInput.value.trim();
    if (!message) return;

    // Disable input and button
    messageInput.disabled = true;
    sendButton.disabled = true;
    
    // Add user message
    addMessage(message, true);
    
    // Clear input
    messageInput.value = '';
    
    // Show typing indicator
    const typingIndicator = showTypingIndicator();
    
    try {
      // Simulate AI thinking time (1-3 seconds)
      const thinkingTime = 1000 + Math.random() * 2000;
      await new Promise(resolve => setTimeout(resolve, thinkingTime));
      
      // Get AI response
      const response = await getAIResponse(message);
      
      // Hide typing indicator
      hideTypingIndicator();
      
      // Add AI response with typing effect
      const aiMessage = addMessage('', false, true);
      await typeMessage(aiMessage.querySelector('.msg-content'), response);
      
    } catch (error) {
      hideTypingIndicator();
      addMessage("I apologize, but I'm having trouble right now. Please contact FETS directly at +91 8089393992 or edu@fets.in for immediate assistance.", false);
    } finally {
      // Re-enable input and button
      messageInput.disabled = false;
      sendButton.disabled = false;
      messageInput.focus();
    }
  }

  async function typeMessage(element, text, speed = 30) {
    element.textContent = '';
    
    for (let i = 0; i < text.length; i++) {
      element.textContent += text[i];
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
      
      // Add slight randomness to typing speed
      const delay = speed + Math.random() * 20;
      await new Promise(resolve => setTimeout(resolve, delay));
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

  // Auto-resize textarea if multiline support is needed
  messageInput.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 120) + 'px';
  });

  // Initial focus on input
  messageInput.focus();

  // Add some initial interaction hints
  setTimeout(() => {
    if (messagesContainer.children.length === 1) {
      const hintMessage = addMessage("💡 Tip: Try asking me about exam bookings, preparation tips, or our test center location!", false, true);
      hintMessage.querySelector('.msg-content').style.opacity = '0.8';
      hintMessage.querySelector('.msg-content').style.fontStyle = 'italic';
    }
  }, 10000); // Show hint after 10 seconds if no interaction
});
