import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Send, 
  Bot, 
  FileText, 
  Upload, 
  MessageCircle,
  Loader,
  CheckCircle,
  AlertCircle,
  Paperclip
} from 'lucide-react';
import { fileService } from '../services/fileService';
import { pdfParser, ContractContent } from '../utils/pdfParser';

interface LegalBotModalProps {
  isOpen: boolean;
  onClose: () => void;
  contract?: {
    id: number | string;
    name: string;
    riskLevel: string;
    riskScore: number;
  } | null;
}

interface Message {
  id: string;
  type: 'user' | 'bot' | 'system';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

export default function LegalBotModal({ isOpen, onClose, contract }: LegalBotModalProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [contractContent, setContractContent] = useState<ContractContent | null>(null);
  const [isLoadingContract, setIsLoadingContract] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Save messages to localStorage whenever messages change
  useEffect(() => {
    if (contract && messages.length > 0) {
      const contractKey = `chat_${contract.id}`;
      localStorage.setItem(contractKey, JSON.stringify(messages));
    }
  }, [messages, contract]);

  // Load contract content when modal opens
  useEffect(() => {
    if (isOpen && contract) {
      loadContractContent();
    }
  }, [isOpen, contract]);

  // Initialize bot conversation when contract content is loaded
  useEffect(() => {
    if (isOpen && contract && contractContent) {
      // Check if we already have messages for this contract in localStorage
      const contractKey = `chat_${contract.id}`;
      const savedMessages = localStorage.getItem(contractKey);
      
      if (savedMessages) {
        try {
          const parsedMessages = JSON.parse(savedMessages);
          // Convert timestamp strings back to Date objects
          const messagesWithDates = parsedMessages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }));
          setMessages(messagesWithDates);
        } catch (error) {
          console.error('Error parsing saved messages:', error);
          initializeWelcomeMessages();
        }
      } else {
        initializeWelcomeMessages();
      }
      
      // Focus input after a short delay
      setTimeout(() => {
        inputRef.current?.focus();
      }, 500);
    }
  }, [isOpen, contract, contractContent]);

  // Load contract content from PDF
  const loadContractContent = async () => {
    if (!contract) return;
    
    setIsLoadingContract(true);
    try {
      // Parse PDF content based on contract name
      const content = await pdfParser.parsePDFContent(contract.id.toString(), contract.name);
      setContractContent(content);
      console.log('Contract content loaded:', content);
    } catch (error) {
      console.error('Failed to load contract content:', error);
      // Set a fallback empty content
      setContractContent(null);
    } finally {
      setIsLoadingContract(false);
    }
  };

  // Initialize welcome messages function
  const initializeWelcomeMessages = () => {
    if (!contract || !contractContent) return;
    
    const welcomeMessages: Message[] = [
      {
        id: '1',
        type: 'system',
        content: `Legal Review Session Started for: ${contract.name}`,
        timestamp: new Date()
      },
      {
        id: '2',
        type: 'bot',
        content: `🤖 Hello! I'm your AI Legal Assistant. I've successfully loaded and analyzed the contract "${contract.name}" for you.\\n\\n📊 **Current Risk Assessment:** ${contract.riskScore}/100 (${contract.riskLevel})\\n\\n📄 **Contract Details:**\\n• **Type:** ${contractContent.contractType}\\n• **Parties:** ${contractContent.parties.join(' and ')}\\n• **Sections:** ${contractContent.sections.length} main sections analyzed\\n• **Key Terms:** ${contractContent.keyTerms.length} important terms identified\\n\\n💬 **I can answer specific questions about:**\\n• "What are the payment terms?"\\n• "Explain the termination clauses"\\n• "Who are the parties to this contract?"\\n• "What does [specific term] mean?"\\n• "What are the main risks?"\\n\\nWhat would you like to know about this contract?`,
        timestamp: new Date()
      }
    ];
    setMessages(welcomeMessages);
  };

  // Clear chat history for current contract
  const clearChatHistory = () => {
    if (contract) {
      const contractKey = `chat_${contract.id}`;
      localStorage.removeItem(contractKey);
      initializeWelcomeMessages();
    }
  };

  // Handle sending messages
  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate bot thinking
    const thinkingMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'bot',
      content: '🤔 Analyzing your question...',
      timestamp: new Date(),
      isTyping: true
    };

    setMessages(prev => [...prev, thinkingMessage]);

    try {
      // Simulate AI processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate response based on user input and contract content
      const response = generateBotResponse(inputMessage.trim(), contract, contractContent);
      
      // Remove thinking message and add actual response
      setMessages(prev => {
        // Remove only the thinking message, keep all other messages
        const filteredMessages = prev.filter(msg => msg.id !== thinkingMessage.id);
        return [...filteredMessages, {
          id: Date.now().toString(),
          type: 'bot',
          content: response,
          timestamp: new Date()
        }];
      });

    } catch (error) {
      console.error('Error generating response:', error);
      setMessages(prev => {
        // Remove only the thinking message, keep all other messages
        const filteredMessages = prev.filter(msg => msg.id !== thinkingMessage.id);
        return [...filteredMessages, {
          id: Date.now().toString(),
          type: 'bot',
          content: '❌ Sorry, I encountered an error processing your request. Please try again.',
          timestamp: new Date()
        }];
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Generate AI-like responses based on user input and actual contract content
  const generateBotResponse = (userInput: string, contract: any, content: ContractContent | null): string => {
    if (!content) {
      return `❌ Sorry, I'm having trouble accessing the contract content right now. Please try asking your question again, or check if the document was properly loaded.`;
    }

    const input = userInput.toLowerCase();
    
    // Handle specific questions about contract parties
    if (input.includes('parties') || input.includes('who are') || input.includes('between whom')) {
      return `👥 **Contract Parties:**\\n\\n${pdfParser.extractInfo(content, 'parties')}\\n\\n📄 **Additional Details:**\\n• Contract Type: ${content.contractType}\\n• Effective Date: ${content.effectiveDate || 'Not specified'}\\n• Expiration Date: ${content.expirationDate || 'Not specified'}`;
    }

    // Handle questions about specific terms or definitions
    if (input.includes('what does') || input.includes('define') || input.includes('definition') || input.includes('mean')) {
      // Extract the term being asked about
      const searchResults = pdfParser.searchContract(content, input);
      
      if (searchResults.terms.length > 0) {
        const term = searchResults.terms[0];
        return `📖 **Term Definition:**\\n\\n**${term.term}** (${term.importance} importance)\\n${term.definition}\\n\\n📄 **Found in Section:** ${term.section}\\n\\n🔍 **Context:** This term is considered ${term.importance} importance for understanding your contract.`;
      } else {
        // Search in contract text for matches
        if (searchResults.textMatches.length > 0) {
          return `🔍 **Found in Contract:**\\n\\n${searchResults.textMatches.slice(0, 3).join('\\n\\n')}\\n\\n💡 Based on the contract text, I found ${searchResults.textMatches.length} relevant mention(s). Would you like me to explain any specific part in more detail?`;
        }
      }
    }

    // Handle payment-related questions
    if (input.includes('payment') || input.includes('money') || input.includes('financial') || input.includes('cost') || input.includes('fee')) {
      const paymentSection = content.sections.find(s => 
        s.title.toLowerCase().includes('payment') || 
        s.title.toLowerCase().includes('compensation') ||
        s.content.toLowerCase().includes('payment') ||
        s.content.toLowerCase().includes('fee')
      );
      
      if (paymentSection) {
        return `💰 **Payment Terms Analysis:**\\n\\n**Section: ${paymentSection.title}**\\n${paymentSection.content}\\n\\n📊 **Key Points:**\\n• This information is extracted directly from your contract\\n• Section ${paymentSection.sectionNumber || 'N/A'} contains the payment details\\n\\n⚠️ **Note:** Please review these terms carefully and consult with legal counsel if you have concerns.`;
      } else {
        return `🔍 **Payment Terms Search:**\\n\\nI searched through the contract but couldn't find a dedicated payment section. Here's what I found:\\n\\n${pdfParser.searchContract(content, 'payment fee cost financial').textMatches.slice(0, 3).join('\\n\\n') || 'No specific payment terms were clearly identified in this contract.'}\\n\\n💡 You may want to look for payment information under different section titles or ask about specific financial terms.`;
      }
    }

    // Handle termination questions
    if (input.includes('termination') || input.includes('cancel') || input.includes('end') || input.includes('terminate')) {
      const terminationSection = content.sections.find(s => 
        s.title.toLowerCase().includes('termination') || 
        s.title.toLowerCase().includes('term') ||
        s.content.toLowerCase().includes('termination') ||
        s.content.toLowerCase().includes('terminate')
      );
      
      if (terminationSection) {
        return `📄 **Termination Clause Analysis:**\\n\\n**Section: ${terminationSection.title}**\\n${terminationSection.content}\\n\\n🔍 **Analysis:**\\n• This information comes directly from Section ${terminationSection.sectionNumber || 'N/A'} of your contract\\n• Pay special attention to notice requirements and termination conditions\\n\\n⚠️ **Important:** Make sure you understand all termination procedures before taking any action.`;
      } else {
        const searchResults = pdfParser.searchContract(content, 'termination terminate end');
        return `🔍 **Termination Terms Search:**\\n\\n${searchResults.textMatches.slice(0, 3).join('\\n\\n') || 'No specific termination clauses were found in this contract.'}\\n\\n💡 If this contract doesn't have clear termination terms, that might be a risk factor to address.`;
      }
    }

    // Handle general contract information requests
    if (input.includes('key terms') || input.includes('main terms') || input.includes('summary') || input.includes('overview')) {
      const keyTermsText = content.keyTerms.map(term => 
        `• **${term.term}** (${term.importance}): ${term.definition}`
      ).join('\\n');
      
      return `📋 **Key Terms Summary for ${contract?.name}:**\\n\\n**Contract Type:** ${content.contractType}\\n**Parties:** ${content.parties.join(' and ')}\\n\\n**Important Terms:**\\n${keyTermsText}\\n\\n📄 **Sections Available:**\\n${content.sections.map(s => `• ${s.title} (Section ${s.sectionNumber || 'N/A'})`).join('\\n')}\\n\\n💡 Ask me about any specific section or term for detailed information!`;
    }

    // Handle risk-related questions
    if (input.includes('risk') || input.includes('danger') || input.includes('concern') || input.includes('problem')) {
      return `🎯 **Risk Analysis for ${contract?.name}:**\\n\\n📊 **Overall Risk Score:** ${contract?.riskScore}/100 (${contract.riskLevel})\\n\\n🗺️ **Contract Structure:**\\n• **Type:** ${content.contractType}\\n• **Parties:** ${content.parties.join(' and ')}\\n• **Duration:** ${content.effectiveDate ? `From ${content.effectiveDate}` : 'Start date not specified'}${content.expirationDate ? ` to ${content.expirationDate}` : ''}\\n\\n🔍 **Key Areas to Review:**\\n${content.keyTerms.filter(t => t.importance === 'high').map(t => `• **${t.term}:** ${t.definition}`).join('\\n') || '• No high-risk terms specifically identified'}\\n\\n⚠️ **Recommendation:** Review the high-importance terms carefully and consider legal consultation for complex clauses.`;
    }

    // Handle date and duration questions
    if (input.includes('when') || input.includes('date') || input.includes('duration') || input.includes('effective') || input.includes('expire')) {
      return `📅 **Contract Timeline:**\\n\\n${pdfParser.extractInfo(content, 'effective_date')}\\n${pdfParser.extractInfo(content, 'expiration_date')}\\n\\n📄 **Contract Type:** ${content.contractType}\\n👥 **Between:** ${content.parties.join(' and ')}\\n\\n💡 **Note:** These dates are extracted directly from the contract text. Make sure to verify all critical dates in the original document.`;
    }

    // Handle section-specific questions
    const sectionMatch = content.sections.find(s => 
      s.title.toLowerCase().includes(input) || 
      input.includes(s.title.toLowerCase().split(' ')[0])
    );
    
    if (sectionMatch) {
      return `📄 **${sectionMatch.title} (Section ${sectionMatch.sectionNumber || 'N/A'}):**\\n\\n${sectionMatch.content}\\n\\n🔍 **Analysis:** This section contains important contractual obligations and terms. Make sure you understand all requirements and implications.\\n\\n💡 **Need clarification?** Ask me about specific terms or phrases in this section!`;
    }

    // Search for any matches in the contract
    const searchResults = pdfParser.searchContract(content, input);
    
    if (searchResults.textMatches.length > 0) {
      return `🔍 **Found in Contract:**\\n\\n${searchResults.textMatches.slice(0, 3).join('\\n\\n')}\\n\\n📊 **Search Results:** Found ${searchResults.textMatches.length} relevant mention(s) in the contract text.\\n\\n💡 Would you like me to explain any specific part or provide more context about these sections?`;
    }

    // Default response for questions not matching contract content
    if (input.includes('hello') || input.includes('hi') || input.includes('who are you') || input.includes('help')) {
      return `🤖 Hello! I'm your AI Legal Assistant, and I have the complete content of "${contract?.name}" loaded and ready for analysis.\\n\\n📄 **This contract contains:**\\n• ${content.sections.length} main sections\\n• ${content.keyTerms.length} important terms\\n• Contract type: ${content.contractType}\\n• Parties: ${content.parties.join(' and ')}\\n\\n💬 **Ask me specific questions like:**\\n• "What are the payment terms?"\\n• "Explain the termination clause"\\n• "When does this contract expire?"\\n• "What does [term] mean?"\\n• "Who are the parties?"\\n\\nWhat would you like to know about your contract?`;
    }

    // Handle general explanations and overview requests
    if (input.includes('explain') || input.includes('about') || input.includes('overview') || input.includes('tell me') || input.includes('describe')) {
      return `📜 **Comprehensive Contract Analysis for ${contract?.name}:**\\n\\n📄 **Document Overview:**\\n• **Contract Type:** ${content.contractType}\\n• **Primary Parties:** ${content.parties.join(' and ')}\\n• **Effective Period:** ${content.effectiveDate ? `From ${content.effectiveDate}` : 'Start date not clearly specified'}${content.expirationDate ? ` until ${content.expirationDate}` : ' (no specified end date)'}\\n\\n🗺️ **Contract Structure:**\\n${content.sections.map((section, index) => 
        `**${index + 1}. ${section.title}** (Section ${section.sectionNumber || 'N/A'})\\n${section.content.substring(0, 200)}${section.content.length > 200 ? '...' : ''}`
      ).join('\\n\\n')}\\n\\n🔑 **Critical Terms Defined:**\\n${content.keyTerms.map(term => 
        `• **${term.term}** (${term.importance} priority): ${term.definition}`
      ).join('\\n')}\\n\\n🎯 **Risk Assessment:**\\n• **Overall Risk Score:** ${contract?.riskScore}/100\\n• **Risk Category:** ${contract.riskLevel} Risk\\n• **Key Areas of Concern:** ${content.keyTerms.filter(t => t.importance === 'high').length > 0 ? content.keyTerms.filter(t => t.importance === 'high').map(t => t.term).join(', ') : 'No high-priority risk terms identified'}\\n\\n💡 **Professional Recommendation:** This ${content.contractType.toLowerCase()} establishes legal obligations between ${content.parties.join(' and ')}. Review all sections carefully, particularly high-priority terms, and consider legal consultation before execution.`;
    }

    // Fallback response
    return `🔍 **Contract Search Results for "${userInput}":**\\n\\nI've analyzed ${contract?.name} but couldn't find specific content matching your query. However, I can provide comprehensive information about this ${content.contractType.toLowerCase()}.\\n\\n📄 **Available Information:**\\n• **Document Sections:** ${content.sections.map(s => s.title).join(', ')}\\n• **Defined Terms:** ${content.keyTerms.map(t => t.term).join(', ')}\\n• **Contract Parties:** ${content.parties.join(' and ')}\\n• **Contract Duration:** ${content.effectiveDate || 'Not specified'} to ${content.expirationDate || 'Not specified'}\\n\\n💬 **For specific information, try asking:**\\n• "Explain this contract" - Complete overview\\n• "What are the main terms?" - Key contract elements\\n• "Who are the parties?" - Contract participants\\n• "What are the payment terms?" - Financial obligations\\n• "Explain termination clauses" - Contract ending procedures\\n\\n🕰️ **Professional Legal Assistant ready to analyze any aspect of this ${content.contractType.toLowerCase()} in detail.**`;
  };

  // Handle key press for sending messages
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Handle running analysis.py
  const handleRunAnalysis = async () => {
    if (!contract) return;
    
    setIsAnalyzing(true);
    const analysisMessage: Message = {
      id: Date.now().toString(),
      type: 'system',
      content: '🔄 Running detailed analysis.py on the contract... This may take a few moments.',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, analysisMessage]);
    
    try {
      // Run analysis.py through fileService
      const result = await fileService.runAnalysis(contract.id.toString());
      
      if (result.success) {
        const successMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: `✅ **Analysis Complete!**\\n\\n📊 I've completed a comprehensive analysis of ${contract.name} using advanced AI processing.\\n\\n🔍 **New insights are now available:**\\n• Updated risk assessment\\n• Detailed clause analysis\\n• Compliance verification\\n• Improvement recommendations\\n\\n📋 **Results saved to:** jsonweb.json\\n\\nYou can now ask me more detailed questions about the contract!`,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, successMessage]);
      } else {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: `❌ **Analysis Failed**\\n\\n${result.message}\\n\\nI can still help you with general contract questions based on the initial risk assessment.`,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error('Analysis error:', error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        type: 'bot',
        content: `❌ **Error running analysis**\\n\\nThere was an issue executing the analysis. I can still provide general legal assistance based on the contract information available.`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 rounded-t-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">AI Legal Assistant</h2>
              <p className="text-blue-100 text-sm">
                {isLoadingContract 
                  ? `Loading contract: ${contract?.name}...`
                  : contract 
                    ? `Analyzing: ${contract.name}`
                    : 'Ready to help'
                }
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleRunAnalysis}
              disabled={isAnalyzing}
              className="flex items-center space-x-2 px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-sm"
            >
              {isAnalyzing ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : (
                <FileText className="w-4 h-4" />
              )}
              <span>{isAnalyzing ? 'Analyzing...' : 'Run Analysis'}</span>
            </button>
            <button
              onClick={clearChatHistory}
              className="flex items-center space-x-1 px-2 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-sm"
              title="Clear chat history"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Clear</span>
            </button>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white p-1 transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-lg p-3 ${
                message.type === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : message.type === 'system'
                  ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                  : 'bg-white text-gray-800 shadow-sm border border-gray-200'
              }`}>
                {message.type === 'bot' && (
                  <div className="flex items-center space-x-2 mb-2">
                    <Bot className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-medium text-blue-600">AI Legal Assistant</span>
                  </div>
                )}
                <div className="whitespace-pre-line text-sm">
                  {message.content}
                </div>
                <div className={`text-xs mt-1 ${
                  message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-800 shadow-sm border border-gray-200 rounded-lg p-3 max-w-[80%]">
                <div className="flex items-center space-x-2">
                  <Loader className="w-4 h-4 animate-spin text-blue-600" />
                  <span className="text-sm">AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
          <div className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about the contract..."
                disabled={isLoading}
                className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-2 text-center">
            Press Enter to send • This AI assistant helps analyze contract terms and risks
          </div>
        </div>
      </div>
    </div>
  );
}