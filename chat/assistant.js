document.addEventListener('DOMContentLoaded', () => {
  const messagesContainer = document.getElementById('messages');
  const messageInput = document.getElementById('input');
  const sendButton = document.getElementById('send');

  // Function to add a message to the chat window
  function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('msg', sender + '-msg');

    const messageContentDiv = document.createElement('div');
    messageContentDiv.classList.add('msg-content');
    messageContentDiv.textContent = text;

    messageDiv.appendChild(messageContentDiv);
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll to the bottom
  }

  // Function to simulate AI typing
  function aiTyping() {
    const typingDiv = document.createElement('div');
    typingDiv.classList.add('msg', 'ai-msg', 'typing');
    typingDiv.innerHTML = '<div class="msg-content">Typing...</div>';
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

    const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCW6xMz-LciTbxN33FQ7JaSWveMP1nfyZ0"; // IMPORTANT: User-provided key

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
                { text: text }
              ]
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
        addMessage(`Sorry, there was an error communicating with the AI: ${errorMessage}. Please try again.`, 'ai');
      } else {
        const data = await response.json();
        if (data.candidates && data.candidates.length > 0 &&
            data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts.length > 0) {
          const aiResponse = data.candidates[0].content.parts[0].text;
          addMessage(aiResponse, 'ai');
        } else if (data.promptFeedback && data.promptFeedback.blockReason) {
          // Handle cases where the prompt was blocked
          const blockMessage = `Your request was blocked: ${data.promptFeedback.blockReason}.`;
          console.warn('Prompt blocked:', data.promptFeedback);
          addMessage(blockMessage, 'ai');
        }
        else {
          console.error('Unexpected API response format:', data);
          addMessage("Sorry, I received an unexpected response from the AI. Please try again.", 'ai');
        }
      }

    } catch (error) {
      removeTypingIndicator(typingElement); // Ensure typing indicator is removed on any error
      console.error('Error sending message:', error);
      addMessage("Sorry, something went wrong while trying to reach the AI. Please check your connection and try again.", 'ai');
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
