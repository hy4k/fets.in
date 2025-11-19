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
- Friendly and approachable - use conversational and encouraging tone
- Helpful and supportive - provide comprehensive, actionable advice
- Always identify yourself as "FETS" when greeting users

**Sample Responses:**
For booking inquiries: Guide users through the process, mention available partners, and offer preparation resources
For exam anxiety: Provide calming strategies, preparation tips, and direct to FETS's supportive environment
For career guidance: Ask about interests, suggest relevant certifications, and explain career pathways
For general questions: Provide comprehensive FETS information and proactively offer additional help

Remember: You represent FETS as the trusted testing partner for every Indian student and professional ready to level up. Make every interaction valuable and supportive.`;

  // Function to add a message to the chat window
  function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('msg', sender + '-msg');

    const messageContentDiv = document.createElement('div');
    messageContentDiv.classList.add('msg-content');
    
    // Support basic markdown formatting for AI responses
    if (sender === 'ai') {
      messageContentDiv.innerHTML = formatAIResponse(text);
    } else {
      messageContentDiv.textContent = text;
    }

    messageDiv.appendChild(messageContentDiv);
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll to the bottom
  }

  // Function to format AI responses with basic markdown support
  function formatAIResponse(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold text
      .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic text
      .replace(/•/g, '•') // Bullet points
      .replace(/\n/g, '<br>') // Line breaks
      .replace(/(\+91[\s-]?[\d\s-]+)/g, '<a href="tel:$1">$1</a>') // Phone numbers
      .replace(/(edu@fets\.in)/g, '<a href="mailto:$1">$1</a>'); // Email
  }

  // Function to simulate AI typing
  function aiTyping() {
    const typingDiv = document.createElement('div');
    typingDiv.classList.add('msg', 'ai-msg', 'typing');
    typingDiv.innerHTML = '<div class="msg-content">FETS is thinking...</div>';
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    return typingDiv;
  }

  // Function to remove typing indicator
  function removeTypingIndicator(typingElement) {
    if (typingElement && typingElement.parentNode) {
      messagesContainer.removeChild(typingElement);
    }
  }

  // Function to handle sending a message
  async function sendMessage() {
    const text = messageInput.value.trim();
    if (text === '') return;

    addMessage(text, 'user');
    messageInput.value = '';
    sendButton.disabled = true; // Disable send button

    const typingElement = aiTyping(); // Show typing indicator

    const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCW6xMz-LciTbxN33FQ7JaSWveMP1nfyZ0";

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                { 
                  text: FETS_SYSTEM_PROMPT + "\n\nUser Question: " + text + "\n\nAs FETS AI assistant, provide a helpful, accurate, and professional response based on the knowledge above. If the question is outside your scope, politely redirect to FETS contact information or suggest they visit the website." 
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
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

      removeTypingIndicator(typingElement); // Remove typing indicator once response starts processing

      if (!response.ok) {
        // Attempt to read error from API response body
        let errorData;
        try {
          errorData = await response.json();
        } catch (e) {
          // Ignore if error response is not JSON
        }
        console.error('API Error:', response.status, errorData);
        const errorMessage = errorData?.error?.message || `API Error: ${response.status}`;
        addMessage(`Sorry, I'm experiencing technical difficulties right now. Please try again in a moment, or contact FETS directly at +91 8089393992 or edu@fets.in for immediate assistance.`, 'ai');
      } else {
        const data = await response.json();
        if (data.candidates && data.candidates.length > 0 &&
            data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts.length > 0) {
          const aiResponse = data.candidates[0].content.parts[0].text;
          addMessage(aiResponse, 'ai');
        } else if (data.promptFeedback && data.promptFeedback.blockReason) {
          // Handle cases where the prompt was blocked
          const blockMessage = `I apologize, but I can't process that request. Please feel free to ask about FETS services, exam booking, or study guidance. You can also contact us directly at +91 8089393992.`;
          console.warn('Prompt blocked:', data.promptFeedback);
          addMessage(blockMessage, 'ai');
        }
        else {
          console.error('Unexpected API response format:', data);
          addMessage("I'm having trouble understanding that request. Please try rephrasing your question, or contact FETS directly at edu@fets.in for assistance.", 'ai');
        }
      }

    } catch (error) {
      removeTypingIndicator(typingElement); // Ensure typing indicator is removed on any error
      console.error('Error sending message:', error);
      addMessage("I'm currently experiencing connectivity issues. Please try again, or contact FETS directly at +91 8089393992 or edu@fets.in for immediate assistance.", 'ai');
    } finally {
      sendButton.disabled = false; // Re-enable send button
      messageInput.focus();
    }
  }

  // Event listeners
  sendButton.addEventListener('click', sendMessage);
  messageInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  });

  // Initial focus on input
  messageInput.focus();
});
