document.addEventListener('DOMContentLoaded', () => {
  const messagesContainer = document.getElementById('messages');
  const messageInput = document.getElementById('input');
  const sendButton = document.getElementById('send');

  // Optimized FETS Knowledge Base - Concise but comprehensive
  const FETS_KNOWLEDGE = {
    about: "FETS (Forun Testing & Educational Services) is India's only multi-brand exam center in Calicut, Kerala, established in 2021. We've served over 20,000 candidates across 75+ exam types with 99% satisfaction rate.",
    contact: "Phone: +91 8089393992, +91 9895541552, +91 8089219722 | Email: edu@fets.in | Address: Fourth Floor, Kadooli Tower, West Nadakkavu, Vandipetta Junction, Calicut, Kerala - 673011 | Hours: Mon-Sat 9AM-6PM",
    exams: "We offer exams from Prometric, Pearson VUE, ETS, IELTS, PSI, CMA USA, GRE, Language Cert, TOEFL. Covers IT certifications, healthcare credentials, language tests, professional licenses, and academic exams.",
    facility: "Individual noise-reduced booths, modern tech with power backups, military-grade security (biometric auth, 24/7 CCTV, metal detectors), trained staff, mock exams available.",
    security: "Full biometric verification, strict no personal items policy, materials provided (note board/marker or scratch paper), accommodations available with pre-approval."
  };

  // Function to create a more natural, conversational response
  function createContextualPrompt(userQuestion) {
    return `You are FETS, the helpful assistant for Forun Testing & Educational Services exam center in Calicut, Kerala. 

Key Facts:
- India's only multi-brand exam center with 75+ exams (Prometric, Pearson VUE, ETS, IELTS, PSI, CMA USA, GRE, TOEFL, etc.)
- Located: Calicut, Kerala | Contact: +91 8089393992, edu@fets.in
- Served 20,000+ candidates since 2021 with 99% satisfaction rate
- Secure facility with individual booths, biometric security, mock exams available

User Question: "${userQuestion}"

Provide a helpful, specific answer. Be conversational and encouraging. Give practical advice. If about booking, mention contacting us. If about exam prep, give useful tips. Keep it focused and avoid generic lists or unnecessary emojis.`;
  }

  // Function to add a message to the chat window
  function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('msg', sender + '-msg');

    const messageContentDiv = document.createElement('div');
    messageContentDiv.classList.add('msg-content');
    
    // Support basic formatting for AI responses
    if (sender === 'ai') {
      messageContentDiv.innerHTML = formatResponse(text);
    } else {
      messageContentDiv.textContent = text;
    }

    messageDiv.appendChild(messageContentDiv);
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // Format AI responses for better readability
  function formatResponse(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>')
      .replace(/(\+91[\s-]?[\d\s-]+)/g, '<a href="tel:$1">$1</a>')
      .replace(/(edu@fets\.in)/g, '<a href="mailto:$1">$1</a>');
  }

  // Function to show typing indicator
  function showTyping() {
    const typingDiv = document.createElement('div');
    typingDiv.classList.add('msg', 'ai-msg', 'typing');
    typingDiv.id = 'typing-indicator';
    typingDiv.innerHTML = '<div class="msg-content">Thinking...</div>';
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    return typingDiv;
  }

  // Function to remove typing indicator
  function removeTyping(typingElement) {
    if (typingElement && typingElement.parentNode) {
      messagesContainer.removeChild(typingElement);
    }
  }

  // Main function to handle sending messages
  async function sendMessage() {
    const text = messageInput.value.trim();
    if (text === '') return;

    addMessage(text, 'user');
    messageInput.value = '';
    sendButton.disabled = true;

    const typingElement = showTyping();

    // Optimized API call with better parameters
    const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCW6xMz-LciTbxN33FQ7JaSWveMP1nfyZ0";

    try {
      const prompt = createContextualPrompt(text);
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            role: "user",
            parts: [{ text: prompt }]
          }],
          generationConfig: {
            temperature: 0.8,
            topK: 20,
            topP: 0.9,
            maxOutputTokens: 512,
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
        addMessage(aiResponse, 'ai');
      } else if (data.promptFeedback && data.promptFeedback.blockReason) {
        addMessage("I apologize, but I can't process that request. Please ask about FETS services, exam booking, or study guidance. You can also call us at +91 8089393992.", 'ai');
      } else {
        addMessage("I'm having trouble understanding that. Could you please rephrase your question? For immediate assistance, contact FETS at +91 8089393992 or edu@fets.in.", 'ai');
      }

    } catch (error) {
      removeTyping(typingElement);
      console.error('Error:', error);
      addMessage("I'm currently experiencing technical difficulties. Please try again in a moment, or contact FETS directly at +91 8089393992 or edu@fets.in for immediate assistance.", 'ai');
    } finally {
      sendButton.disabled = false;
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

  // Focus on input when page loads
  messageInput.focus();
});
