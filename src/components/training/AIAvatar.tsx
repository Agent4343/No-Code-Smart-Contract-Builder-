import { useState, useEffect, useCallback } from 'react';
import { Volume2, VolumeX, MessageCircle, ThumbsUp, RefreshCw } from 'lucide-react';
import type { Avatar, AvatarMessage } from '../../types/training';

interface AIAvatarProps {
  avatar: Avatar;
  message?: AvatarMessage;
  isActive?: boolean;
  isSpeaking?: boolean;
  size?: 'small' | 'medium' | 'large';
  onSpeakComplete?: () => void;
  showControls?: boolean;
  autoSpeak?: boolean;
}

const avatarImages: Record<string, string> = {
  'captain-sarah': '👩‍✈️',
  'engineer-james': '👨‍🔧',
  'safety-officer-maria': '👩‍🔬',
  'drilling-expert-mike': '👷',
  'environmental-specialist-emma': '🌊',
  'operations-manager-david': '👨‍💼',
};

const emotionStyles: Record<string, string> = {
  neutral: 'bg-gradient-to-br from-blue-500 to-blue-600',
  happy: 'bg-gradient-to-br from-green-500 to-emerald-600',
  thinking: 'bg-gradient-to-br from-purple-500 to-indigo-600',
  concerned: 'bg-gradient-to-br from-amber-500 to-orange-600',
  encouraging: 'bg-gradient-to-br from-cyan-500 to-teal-600',
};

const sizeStyles = {
  small: 'w-16 h-16 text-2xl',
  medium: 'w-24 h-24 text-4xl',
  large: 'w-32 h-32 text-5xl',
};

export default function AIAvatar({
  avatar,
  message,
  isActive = true,
  isSpeaking = false,
  size = 'medium',
  onSpeakComplete,
  showControls = true,
  autoSpeak = false,
}: AIAvatarProps) {
  const [speaking, setSpeaking] = useState(isSpeaking);
  const [muted, setMuted] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [displayedText, setDisplayedText] = useState('');
  const [emotion, setEmotion] = useState<string>(message?.emotion || 'neutral');

  // Typing animation effect
  useEffect(() => {
    if (message?.content && autoSpeak) {
      setCurrentText(message.content);
      setDisplayedText('');
      setSpeaking(true);
      setEmotion(message.emotion);
    }
  }, [message, autoSpeak]);

  useEffect(() => {
    if (speaking && currentText && !muted) {
      let index = 0;
      const interval = setInterval(() => {
        if (index < currentText.length) {
          setDisplayedText(currentText.slice(0, index + 1));
          index++;
        } else {
          clearInterval(interval);
          setSpeaking(false);
          onSpeakComplete?.();
        }
      }, 30);

      return () => clearInterval(interval);
    }
  }, [speaking, currentText, muted, onSpeakComplete]);

  const handleSpeak = useCallback(() => {
    if (message?.content) {
      setCurrentText(message.content);
      setDisplayedText('');
      setSpeaking(true);
    }
  }, [message]);

  const handleReplay = useCallback(() => {
    setDisplayedText('');
    setSpeaking(true);
  }, []);

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Avatar Circle */}
      <div className="relative">
        <div
          className={`
            ${sizeStyles[size]}
            ${emotionStyles[emotion]}
            rounded-full flex items-center justify-center
            shadow-lg transition-all duration-300
            ${speaking ? 'animate-pulse ring-4 ring-blue-400 ring-opacity-50' : ''}
            ${isActive ? 'opacity-100' : 'opacity-60'}
          `}
        >
          <span className="filter drop-shadow-md">
            {avatarImages[avatar.id] || '🧑‍💼'}
          </span>
        </div>

        {/* Speaking indicator */}
        {speaking && (
          <div className="absolute -bottom-1 -right-1">
            <div className="flex space-x-0.5">
              <div className="w-1.5 h-3 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1.5 h-4 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1.5 h-3 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}

        {/* Active status */}
        {isActive && (
          <div className="absolute top-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-800" />
        )}
      </div>

      {/* Avatar Info */}
      <div className="text-center">
        <h4 className="text-white font-semibold">{avatar.name}</h4>
        <p className="text-slate-400 text-sm">{avatar.role}</p>
      </div>

      {/* Speech Bubble */}
      {displayedText && (
        <div className="relative max-w-md">
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-slate-700 rotate-45" />
          <div className="bg-slate-700 rounded-lg p-4 shadow-xl">
            <p className="text-white text-sm leading-relaxed">
              {displayedText}
              {speaking && <span className="animate-pulse">|</span>}
            </p>
          </div>
        </div>
      )}

      {/* Controls */}
      {showControls && (
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setMuted(!muted)}
            className={`p-2 rounded-full transition-colors ${
              muted ? 'bg-red-500/20 text-red-400' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
            title={muted ? 'Unmute' : 'Mute'}
          >
            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            onClick={handleSpeak}
            className="p-2 rounded-full bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors"
            title="Start Speaking"
          >
            <MessageCircle className="w-4 h-4" />
          </button>

          <button
            onClick={handleReplay}
            className="p-2 rounded-full bg-slate-700 text-slate-300 hover:bg-slate-600 transition-colors"
            title="Replay"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

// Interactive Avatar for Quiz Explanations
interface QuizAvatarProps {
  avatar: Avatar;
  isCorrect: boolean;
  explanation: string;
  onContinue: () => void;
}

export function QuizAvatar({ avatar, isCorrect, explanation, onContinue }: QuizAvatarProps) {
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowExplanation(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`p-6 rounded-xl ${isCorrect ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
      <div className="flex items-start space-x-4">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl ${
          isCorrect ? 'bg-green-500' : 'bg-orange-500'
        }`}>
          {avatarImages[avatar.id] || '🧑‍💼'}
        </div>

        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className="font-semibold text-white">{avatar.name}</span>
            {isCorrect ? (
              <ThumbsUp className="w-5 h-5 text-green-400" />
            ) : (
              <MessageCircle className="w-5 h-5 text-orange-400" />
            )}
          </div>

          {showExplanation && (
            <div className="space-y-3">
              <p className={`text-sm ${isCorrect ? 'text-green-300' : 'text-orange-300'}`}>
                {isCorrect ? "Great job! That's correct!" : "Not quite right, let me explain..."}
              </p>
              <p className="text-slate-300 text-sm leading-relaxed">{explanation}</p>
            </div>
          )}

          <button
            onClick={onContinue}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

// Floating Avatar for Lessons
interface FloatingAvatarProps {
  avatar: Avatar;
  position?: 'bottom-right' | 'bottom-left';
  onAskQuestion?: () => void;
}

export function FloatingAvatar({ avatar, position = 'bottom-right', onAskQuestion }: FloatingAvatarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const positionStyles = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
  };

  return (
    <div className={`fixed ${positionStyles[position]} z-50`}>
      {isExpanded && (
        <div className="mb-4 bg-slate-800 rounded-lg p-4 shadow-xl w-72 animate-fade-in">
          <p className="text-white text-sm mb-3">
            Hi! I'm {avatar.name}. Need help understanding something?
          </p>
          <div className="space-y-2">
            <button
              onClick={onAskQuestion}
              className="w-full px-3 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
            >
              Ask a Question
            </button>
            <button
              onClick={() => setIsExpanded(false)}
              className="w-full px-3 py-2 bg-slate-700 text-slate-300 rounded text-sm hover:bg-slate-600 transition-colors"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl shadow-lg hover:scale-110 transition-transform"
      >
        {avatarImages[avatar.id] || '🧑‍💼'}
      </button>
    </div>
  );
}
