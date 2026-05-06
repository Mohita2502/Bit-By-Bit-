import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

// Each message in the chat has a role + text
type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function ChatWidget() {
  // Controls whether chat panel is open or closed
  const [open, setOpen] = useState(false);

  // Stores current input text
  const [input, setInput] = useState('');

  // Indicates if assistant is "typing"
  const [loading, setLoading] = useState(false);

  // Chat history
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "Hi! I'm your GameStart assistant. Ask me about games, consoles, or your cart.",
    },
  ]);

  // Reference to ScrollView so we can auto-scroll
  const scrollRef = useRef<ScrollView>(null);

  // Automatically scroll to bottom when messages update or chat opens
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollToEnd({ animated: true });
    }
  }, [messages, open]);

  async function sendMessage() {
    const text = input.trim();

    // Prevent sending empty message or double sending
    if (!text || loading) return;

    // Clear input immediately
    setInput('');

    // Add user message to chat
    setMessages((prev) => [...prev, { role: 'user', content: text }]);

    setLoading(true);

    try {
      // Send query to backend AI endpoint
      const response = await fetch('http://127.0.0.1:8000/com.gamestart/v1/ai/recommendation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: text,
          model: 'llama-3.3-70b-versatile',
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const reply = data.response || 'No response from AI';

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: reply },
      ]);
      setLoading(false);
    } catch (error) {
      console.error('Chat error:', error);
      // Fallback error message
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Something went wrong. Please try again.',
        },
      ]);
      setLoading(false);
    }
  }

  return (
    <>
      {/* Floating Chat Button (bottom-right) */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setOpen((prev) => !prev)} // toggle chat
        activeOpacity={0.85}
      >
        {/* Show X when open, chat icon when closed */}
        <Text style={styles.fabText}>{open ? '✕' : '💬'}</Text>
      </TouchableOpacity>

      {/* Chat Panel */}
      {open && (
        <KeyboardAvoidingView
          // Prevent keyboard from covering input
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.panelWrapper}
        >
          <View style={styles.panel}>
            {/* Header */}
            <View style={styles.header}>
              <View>
                <Text style={styles.title}>GameStart Assistant</Text>
                <Text style={styles.subtitle}>
                  Ask about products, carts, and deals
                </Text>
              </View>

              {/* Close button */}
              <TouchableOpacity onPress={() => setOpen(false)}>
                <Text style={styles.closeBtn}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Messages list */}
            <ScrollView
              ref={scrollRef}
              style={styles.messages}
              contentContainerStyle={{ paddingBottom: 8 }}
            >
              {messages.map((m, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.bubbleRow,
                    // Align right if user, left if assistant
                    m.role === 'user' ? styles.userRow : styles.assistantRow,
                  ]}
                >
                  <View
                    style={[
                      styles.bubble,
                      // Different styling for user vs assistant
                      m.role === 'user'
                        ? styles.userBubble
                        : styles.assistantBubble,
                    ]}
                  >
                    <Text
                      style={
                        m.role === 'user'
                          ? styles.userBubbleText
                          : styles.assistantBubbleText
                      }
                    >
                      {m.content}
                    </Text>
                  </View>
                </View>
              ))}

              {/* Typing indicator */}
              {loading && (
                <View style={[styles.bubbleRow, styles.assistantRow]}>
                  <View style={[styles.bubble, styles.assistantBubble]}>
                    <Text style={styles.assistantBubbleText}>Typing...</Text>
                  </View>
                </View>
              )}
            </ScrollView>

            {/* Input area */}
            <View style={styles.inputRow}>
              <TextInput
                value={input}
                onChangeText={setInput}
                placeholder="Ask about games, consoles, accessories..."
                placeholderTextColor="#888"
                style={styles.input}
              />

              <TouchableOpacity
                style={styles.sendBtn}
                onPress={sendMessage}
                disabled={loading}
              >
                <Text style={styles.sendBtnText}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      )}
    </>
  );
}

// 🔹 Simple rule-based chatbot (temporary)
// Later: replace with backend AI
function fallbackReply(text: string) {
  const t = text.toLowerCase();

  if (t.includes('recommend') || t.includes('suggest')) {
    return 'Tell me your platform (PS5, Xbox, PC, or Switch) and your favorite genre, and I will suggest some options.';
  }

  if (t.includes('cart')) {
    return 'I can help with your cart. Tell me what items you are considering.';
  }

  if (t.includes('ps5')) {
    return 'Looking for PS5 games or accessories? Tell me your budget and whether you like story, sports, or shooter games.';
  }

  if (t.includes('xbox')) {
    return 'For Xbox, I can help you compare consoles, controllers, and games.';
  }

  if (t.includes('switch')) {
    return 'For Switch, I can suggest family games, platformers, or accessories.';
  }

  return 'I can help you find a game, compare consoles, or think through accessories.';
}

// Styles (UI only, no logic here)
const styles = StyleSheet.create({
  fab: {
    position: 'absolute', // makes it float
    right: 18,
    bottom: 90,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#00ffff',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
    elevation: 8,
  },
  fabText: {
    fontSize: 22,
    color: '#000',
    fontWeight: 'bold',
  },
  panelWrapper: {
    position: 'absolute', // keeps chat floating above UI
    right: 18,
    bottom: 84,
    zIndex: 999,
  },
  panel: {
    width: 340,
    maxWidth: '95%',
    height: 500,
    backgroundColor: '#0b0f10',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    elevation: 10,
  },
  header: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#e9feff',
    fontWeight: '700',
    fontSize: 14,
  },
  subtitle: {
    color: 'rgba(233,254,255,0.7)',
    fontSize: 12,
    marginTop: 2,
  },
  closeBtn: {
    color: '#e9feff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  messages: {
    flex: 1,
    padding: 12,
    backgroundColor: '#101516',
  },
  bubbleRow: {
    marginBottom: 10,
    flexDirection: 'row',
  },
  userRow: {
    justifyContent: 'flex-end', // right side
  },
  assistantRow: {
    justifyContent: 'flex-start', // left side
  },
  bubble: {
    maxWidth: '82%',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 14,
  },
  assistantBubble: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  userBubble: {
    backgroundColor: '#00ffff',
  },
  assistantBubbleText: {
    color: '#e9feff',
    fontSize: 13,
    lineHeight: 18,
  },
  userBubbleText: {
    color: '#001010',
    fontSize: 13,
    lineHeight: 18,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 8,
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',
    backgroundColor: '#070a0b',
  },
  input: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    backgroundColor: '#0b0f10',
    color: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13,
  },
  sendBtn: {
    borderRadius: 12,
    backgroundColor: '#00ffff',
    paddingHorizontal: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendBtnText: {
    color: '#000',
    fontWeight: '700',
  },
});