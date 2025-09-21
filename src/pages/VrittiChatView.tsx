import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, Smile, Paperclip, Hash, Users, Bell, Settings, Search, Plus, MessageCircle, User, Phone, Video } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: Date;
  isCurrentUser: boolean;
}

interface Channel {
  id: string;
  name: string;
  type: 'text' | 'voice';
  unread?: number;
  isActive?: boolean;
}

interface DirectMessage {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'idle' | 'dnd';
  unread?: number;
  isActive?: boolean;
}

const channels: Channel[] = [
  { id: 'general', name: 'general', type: 'text', unread: 0, isActive: true },
  { id: 'mental-health', name: 'mental-health', type: 'text', unread: 3 },
  { id: 'study-tips', name: 'study-tips', type: 'text', unread: 0 },
  { id: 'peer-support', name: 'peer-support', type: 'text', unread: 0 },
  { id: 'wellness', name: 'wellness', type: 'text', unread: 0 },
  { id: 'voice-support', name: 'voice-support', type: 'voice', unread: 0 },
];

const directMessages: DirectMessage[] = [
  { id: 'counselor1', name: 'Dr. Anya Sharma', avatar: '/counselor1.jpg', status: 'online' },
  { id: 'counselor2', name: 'Dr. Rajiv Mehta', avatar: '/counselor2.jpg', status: 'idle' },
  { id: 'peer1', name: 'Priya S.', avatar: '/peer1.jpg', status: 'online', unread: 2 },
  { id: 'peer2', name: 'Arjun K.', avatar: '/peer2.jpg', status: 'offline' },
  { id: 'peer3', name: 'Neha T.', avatar: '/peer3.jpg', status: 'dnd' },
];

const initialMessages: Record<string, Message[]> = {
  general: [
    {
      id: '1',
      content: 'Welcome to the Vritti general channel! This is a safe space for all students.',
      sender: 'Vritti Bot',
      timestamp: new Date(Date.now() - 86400000 * 2),
      isCurrentUser: false,
    },
    {
      id: '2',
      content: 'Hi everyone! I\'m new here. Looking forward to connecting with you all.',
      sender: 'Priya S.',
      timestamp: new Date(Date.now() - 3600000 * 5),
      isCurrentUser: false,
    },
    {
      id: '3',
      content: 'Welcome Priya! Feel free to introduce yourself and join the conversations.',
      sender: 'Dr. Anya Sharma',
      timestamp: new Date(Date.now() - 3600000 * 4),
      isCurrentUser: false,
    },
    {
      id: '4',
      content: 'Thanks for the warm welcome! I\'m a second-year engineering student.',
      sender: 'Priya S.',
      timestamp: new Date(Date.now() - 3600000 * 3),
      isCurrentUser: false,
    },
  ],
  'mental-health': [
    {
      id: '1',
      content: 'This channel is dedicated to discussing mental health topics. Remember this is a supportive space.',
      sender: 'Vritti Bot',
      timestamp: new Date(Date.now() - 86400000 * 5),
      isCurrentUser: false,
    },
    {
      id: '2',
      content: 'I\'ve been feeling overwhelmed with assignments lately. Any tips for managing academic stress?',
      sender: 'Arjun K.',
      timestamp: new Date(Date.now() - 3600000 * 2),
      isCurrentUser: false,
    },
    {
      id: '3',
      content: 'Try breaking down your tasks into smaller, manageable chunks. Also, don\'t forget to take breaks!',
      sender: 'Dr. Rajiv Mehta',
      timestamp: new Date(Date.now() - 3600000 * 1),
      isCurrentUser: false,
    },
    {
      id: '4',
      content: 'I find the Pomodoro technique really helpful - 25 minutes of focused work followed by a 5-minute break.',
      sender: 'Neha T.',
      timestamp: new Date(Date.now() - 1800000),
      isCurrentUser: false,
    },
  ],
};

const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

const formatDate = (date: Date): string => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
};

const VrittiChatView = () => {
  const [activeChannel, setActiveChannel] = useState('general');
  const [messages, setMessages] = useState<Record<string, Message[]>>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [showUserInfo, setShowUserInfo] = useState(false);
  
  useEffect(() => {
    // Scroll to bottom of messages when they change
    const messagesContainer = document.getElementById('messages-container');
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }, [messages, activeChannel]);
  
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const updatedMessages = { ...messages };
    if (!updatedMessages[activeChannel]) {
      updatedMessages[activeChannel] = [];
    }
    
    updatedMessages[activeChannel].push({
      id: Date.now().toString(),
      content: newMessage,
      sender: 'You',
      timestamp: new Date(),
      isCurrentUser: true,
    });
    
    setMessages(updatedMessages);
    setNewMessage('');
    
    // Simulate response after a delay
    if (Math.random() > 0.5) {
      setTimeout(() => {
        const responses = [
          'That\'s an interesting point!',
          'I understand how you feel.',
          'Thanks for sharing that with us.',
          'Let\'s discuss this further.',
          'I appreciate your perspective on this.',
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        const randomSender = directMessages[Math.floor(Math.random() * directMessages.length)];
        
        const updatedMessagesWithResponse = { ...messages };
        if (!updatedMessagesWithResponse[activeChannel]) {
          updatedMessagesWithResponse[activeChannel] = [];
        }
        
        updatedMessagesWithResponse[activeChannel].push({
          id: Date.now().toString(),
          content: randomResponse,
          sender: randomSender.name,
          timestamp: new Date(),
          isCurrentUser: false,
        });
        
        setMessages(updatedMessagesWithResponse);
      }, 2000 + Math.random() * 3000);
    }
  };
  
  const handleChannelSelect = (channelId: string) => {
    setActiveChannel(channelId);
    
    // Mark channel as read
    const updatedChannels = channels.map(channel => 
      channel.id === channelId ? { ...channel, unread: 0, isActive: true } : { ...channel, isActive: false }
    );
    
    // Update channels state if needed
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const groupMessagesByDate = (messages: Message[]) => {
    const grouped: Record<string, Message[]> = {};
    
    messages.forEach(message => {
      const dateKey = formatDate(message.timestamp);
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(message);
    });
    
    return grouped;
  };
  
  const activeChannelMessages = messages[activeChannel] || [];
  const groupedMessages = groupMessagesByDate(activeChannelMessages);
  
  return (
    <div className="h-full flex flex-col">
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-64 bg-neutral-800 text-white flex flex-col h-full">
          <div className="p-4 border-b border-neutral-700">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Vritti Chat
            </h2>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-neutral-400 text-sm font-medium uppercase">Channels</h3>
                <button className="text-neutral-400 hover:text-white">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              
              <div className="space-y-1">
                {channels.map(channel => (
                  <button
                    key={channel.id}
                    onClick={() => handleChannelSelect(channel.id)}
                    className={`w-full flex items-center gap-2 px-2 py-1 rounded ${channel.isActive ? 'bg-primary text-white' : 'text-neutral-300 hover:bg-neutral-700'}`}
                  >
                    {channel.type === 'text' ? (
                      <Hash className="h-4 w-4 flex-shrink-0" />
                    ) : (
                      <MessageCircle className="h-4 w-4 flex-shrink-0" />
                    )}
                    <span className="flex-1 text-left truncate">{channel.name}</span>
                    {channel.unread ? (
                      <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {channel.unread}
                      </span>
                    ) : null}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-neutral-400 text-sm font-medium uppercase">Direct Messages</h3>
                <button className="text-neutral-400 hover:text-white">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              
              <div className="space-y-1">
                {directMessages.map(dm => (
                  <button
                    key={dm.id}
                    className="w-full flex items-center gap-2 px-2 py-1 rounded text-neutral-300 hover:bg-neutral-700"
                  >
                    <div className="relative flex-shrink-0">
                      <div className="w-6 h-6 rounded-full bg-neutral-600 overflow-hidden">
                        <img 
                          src={dm.avatar} 
                          alt={dm.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = `https://via.placeholder.com/32?text=${dm.name.charAt(0)}`;
                          }}
                        />
                      </div>
                      <div 
                        className={`absolute bottom-0 right-0 w-2 h-2 rounded-full border border-neutral-800 ${dm.status === 'online' ? 'bg-green-500' : dm.status === 'idle' ? 'bg-yellow-500' : dm.status === 'dnd' ? 'bg-red-500' : 'bg-neutral-500'}`}
                      />
                    </div>
                    <span className="flex-1 text-left truncate">{dm.name}</span>
                    {dm.unread ? (
                      <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {dm.unread}
                      </span>
                    ) : null}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="p-3 border-t border-neutral-700 flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-neutral-700 overflow-hidden">
                <img 
                  src="/avatar.jpg" 
                  alt="Your avatar"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://via.placeholder.com/40?text=You`;
                  }}
                />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-neutral-800" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-sm">You</div>
              <div className="text-xs text-neutral-400">#student1234</div>
            </div>
            <button className="text-neutral-400 hover:text-white">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col bg-white">
          {/* Channel Header */}
          <div className="h-14 border-b border-neutral-200 flex items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <Link to="/support" className="p-1 rounded-full hover:bg-neutral-100">
                <ArrowLeft className="h-5 w-5 text-neutral-500" />
              </Link>
              <div className="flex items-center gap-2">
                <Hash className="h-5 w-5 text-neutral-500" />
                <h2 className="font-bold text-neutral-800">
                  {channels.find(c => c.id === activeChannel)?.name || activeChannel}
                </h2>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="p-1 rounded-full hover:bg-neutral-100">
                <Bell className="h-5 w-5 text-neutral-500" />
              </button>
              <button className="p-1 rounded-full hover:bg-neutral-100">
                <Users className="h-5 w-5 text-neutral-500" />
              </button>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search" 
                  className="py-1 px-3 pl-8 text-sm rounded-md bg-neutral-100 focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <Search className="h-4 w-4 text-neutral-500 absolute left-2 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>
          </div>
          
          {/* Messages */}
          <div id="messages-container" className="flex-1 overflow-y-auto p-4">
            {Object.entries(groupedMessages).map(([date, dateMessages]) => (
              <div key={date} className="mb-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-neutral-100 text-neutral-500 text-xs font-medium py-1 px-3 rounded-full">
                    {date}
                  </div>
                </div>
                
                <div className="space-y-4">
                  {dateMessages.map(message => (
                    <div 
                      key={message.id} 
                      className={`flex ${message.isCurrentUser ? 'justify-end' : 'items-start gap-3'}`}
                    >
                      {!message.isCurrentUser && (
                        <div className="w-8 h-8 rounded-full bg-neutral-200 overflow-hidden flex-shrink-0 mt-1">
                          <img 
                            src={`/avatar-${message.sender.toLowerCase().replace(' ', '-')}.jpg`} 
                            alt={message.sender}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = `https://via.placeholder.com/32?text=${message.sender.charAt(0)}`;
                            }}
                          />
                        </div>
                      )}
                      
                      <div className={`max-w-[70%]`}>
                        {!message.isCurrentUser && (
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">{message.sender}</span>
                            <span className="text-neutral-500 text-xs">{formatTime(message.timestamp)}</span>
                          </div>
                        )}
                        
                        <div 
                          className={`rounded-lg py-2 px-3 ${message.isCurrentUser ? 'bg-primary text-white' : 'bg-neutral-100 text-neutral-800'}`}
                        >
                          {message.content}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {/* Message Input */}
          <div className="border-t border-neutral-200 p-3">
            <div className="flex items-end gap-2">
              <button className="p-2 text-neutral-500 hover:text-neutral-700">
                <Paperclip className="h-5 w-5" />
              </button>
              <div className="flex-1 relative">
                <textarea 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={`Message #${channels.find(c => c.id === activeChannel)?.name || activeChannel}`}
                  className="w-full border border-neutral-300 rounded-lg py-2 px-3 pr-10 max-h-32 focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                  rows={1}
                />
                <button className="absolute right-2 bottom-2 p-1 text-neutral-500 hover:text-neutral-700">
                  <Smile className="h-5 w-5" />
                </button>
              </div>
              <button 
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className={`p-2 rounded-full ${newMessage.trim() ? 'bg-primary text-white' : 'bg-neutral-200 text-neutral-400'}`}
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        
        {/* User Info Sidebar - can be toggled */}
        {showUserInfo && (
          <div className="w-64 border-l border-neutral-200 p-4">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-20 h-20 rounded-full bg-neutral-200 mb-3 overflow-hidden">
                <img 
                  src="/avatar-user.jpg" 
                  alt="User"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://via.placeholder.com/80?text=U`;
                  }}
                />
              </div>
              <h3 className="font-bold text-neutral-800">Username</h3>
              <p className="text-sm text-neutral-500">Online</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-medium text-neutral-500 uppercase mb-2">About</h4>
                <p className="text-sm text-neutral-800">User bio goes here...</p>
              </div>
              
              <div>
                <h4 className="text-xs font-medium text-neutral-500 uppercase mb-2">Member Since</h4>
                <p className="text-sm text-neutral-800">January 15, 2023</p>
              </div>
              
              <div className="pt-4 border-t border-neutral-200">
                <button className="w-full py-2 flex items-center justify-center gap-2 rounded-lg bg-primary text-white">
                  <MessageCircle className="h-4 w-4" />
                  Message
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VrittiChatView;