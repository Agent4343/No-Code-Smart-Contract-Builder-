import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Check,
  BookOpen,
  FileText,
  Clock,
  Menu,
  X,
  MessageCircle,
  HelpCircle,
} from 'lucide-react';
import { useTrainingStore } from '../../store/trainingStore';
import { courses, avatars } from '../../data/cnlopbData';
import AIAvatar, { FloatingAvatar } from '../../components/training/AIAvatar';
import type { Lesson, LessonContent, Module, AvatarMessage } from '../../types/training';

export default function LessonPlayer() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const {
    isEnrolled,
    getProgress,
    completeLesson,
    startLesson,
    currentModuleId,
    currentLessonId,
  } = useTrainingStore();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentContentIndex, setCurrentContentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAvatarChat, setShowAvatarChat] = useState(false);

  const course = courses.find((c) => c.id === courseId);
  const progress = courseId ? getProgress(courseId) : null;

  // Find current module and lesson
  const [activeModuleId, setActiveModuleId] = useState<string | null>(
    currentModuleId || course?.modules[0]?.id || null
  );
  const [activeLessonId, setActiveLessonId] = useState<string | null>(
    currentLessonId || course?.modules[0]?.lessons[0]?.id || null
  );

  const activeModule = course?.modules.find((m) => m.id === activeModuleId);
  const activeLesson = activeModule?.lessons.find((l) => l.id === activeLessonId);
  const instructor = activeLesson
    ? avatars.find((a) => a.id === activeLesson.avatarId)
    : null;

  // Check enrollment
  useEffect(() => {
    if (courseId && !isEnrolled(courseId)) {
      navigate(`/training/course/${course?.slug || courseId}`);
    }
  }, [courseId, isEnrolled, navigate, course?.slug]);

  // Start lesson tracking
  useEffect(() => {
    if (courseId && activeModuleId && activeLessonId) {
      startLesson(courseId, activeModuleId, activeLessonId);
    }
  }, [courseId, activeModuleId, activeLessonId, startLesson]);

  if (!course || !activeModule || !activeLesson) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl text-white mb-4">Course content not found</h2>
        <Link to="/training" className="text-blue-400 hover:text-blue-300">
          Return to training
        </Link>
      </div>
    );
  }

  const currentContent = activeLesson.contents[currentContentIndex];
  const isLessonCompleted = progress?.lessonsCompleted.includes(activeLessonId);

  const handleNextContent = () => {
    if (currentContentIndex < activeLesson.contents.length - 1) {
      setCurrentContentIndex(currentContentIndex + 1);
    }
  };

  const handlePrevContent = () => {
    if (currentContentIndex > 0) {
      setCurrentContentIndex(currentContentIndex - 1);
    }
  };

  const handleCompleteLesson = () => {
    if (courseId && activeModuleId && activeLessonId) {
      completeLesson(courseId, activeModuleId, activeLessonId);
    }
  };

  const handleNextLesson = () => {
    const currentLessonIndex = activeModule.lessons.findIndex(
      (l) => l.id === activeLessonId
    );

    if (currentLessonIndex < activeModule.lessons.length - 1) {
      // Next lesson in current module
      setActiveLessonId(activeModule.lessons[currentLessonIndex + 1].id);
      setCurrentContentIndex(0);
    } else {
      // Check if there's a quiz for this module
      navigate(`/training/quiz/${courseId}/${activeModuleId}`);
    }
  };

  const handleSelectLesson = (moduleId: string, lessonId: string) => {
    setActiveModuleId(moduleId);
    setActiveLessonId(lessonId);
    setCurrentContentIndex(0);
  };

  const avatarMessage: AvatarMessage = {
    id: 'msg-' + currentContent?.id,
    avatarId: instructor?.id || '',
    type: 'explanation',
    content: currentContent?.avatarScript || currentContent?.content || '',
    emotion: 'neutral',
  };

  return (
    <div className="flex h-[calc(100vh-120px)]">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'w-80' : 'w-0'
        } bg-slate-800 border-r border-slate-700 transition-all duration-300 overflow-hidden flex-shrink-0`}
      >
        <div className="w-80 h-full overflow-y-auto">
          {/* Course Header */}
          <div className="p-4 border-b border-slate-700">
            <Link
              to={`/training/course/${course.slug}`}
              className="text-sm text-blue-400 hover:text-blue-300 flex items-center mb-2"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Course
            </Link>
            <h2 className="text-white font-semibold">{course.title}</h2>
            <div className="mt-2 h-2 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all"
                style={{ width: `${progress?.overallProgress || 0}%` }}
              />
            </div>
            <p className="text-slate-400 text-sm mt-1">
              {progress?.overallProgress || 0}% complete
            </p>
          </div>

          {/* Module List */}
          <div className="p-2">
            {course.modules.map((module, moduleIndex) => {
              const isModuleComplete = progress?.modulesCompleted.includes(
                module.id
              );

              return (
                <div key={module.id} className="mb-4">
                  <div className="flex items-center px-3 py-2">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium mr-2 ${
                        isModuleComplete
                          ? 'bg-green-500 text-white'
                          : 'bg-slate-700 text-slate-400'
                      }`}
                    >
                      {isModuleComplete ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        moduleIndex + 1
                      )}
                    </span>
                    <span className="text-slate-300 font-medium text-sm">
                      {module.title}
                    </span>
                  </div>

                  {/* Lessons */}
                  <div className="ml-4 space-y-1">
                    {module.lessons.map((lesson) => {
                      const isCompleted = progress?.lessonsCompleted.includes(
                        lesson.id
                      );
                      const isActive = lesson.id === activeLessonId;

                      return (
                        <button
                          key={lesson.id}
                          onClick={() => handleSelectLesson(module.id, lesson.id)}
                          className={`w-full flex items-center px-3 py-2 rounded-lg text-left text-sm transition-colors ${
                            isActive
                              ? 'bg-blue-500/20 text-blue-400'
                              : isCompleted
                              ? 'text-green-400 hover:bg-slate-700'
                              : 'text-slate-400 hover:bg-slate-700 hover:text-slate-300'
                          }`}
                        >
                          {isCompleted ? (
                            <Check className="w-4 h-4 mr-2 flex-shrink-0" />
                          ) : isActive ? (
                            <Play className="w-4 h-4 mr-2 flex-shrink-0" />
                          ) : (
                            <BookOpen className="w-4 h-4 mr-2 flex-shrink-0" />
                          )}
                          <span className="truncate">{lesson.title}</span>
                          <span className="ml-auto text-xs text-slate-500">
                            {lesson.duration}m
                          </span>
                        </button>
                      );
                    })}

                    {/* Quiz Link */}
                    <Link
                      to={`/training/quiz/${courseId}/${module.id}`}
                      className="w-full flex items-center px-3 py-2 rounded-lg text-left text-sm text-purple-400 hover:bg-purple-500/10 transition-colors"
                    >
                      <FileText className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>Module Quiz</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 py-3 bg-slate-800 border-b border-slate-700">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700 mr-4"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div>
              <h3 className="text-white font-medium">{activeLesson.title}</h3>
              <p className="text-slate-400 text-sm">{activeModule.title}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowAvatarChat(!showAvatarChat)}
              className="flex items-center px-3 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors"
            >
              <HelpCircle className="w-4 h-4 mr-2" />
              Ask {instructor?.name.split(' ')[0]}
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto">
            {/* Avatar Section */}
            {currentContent?.type === 'avatar-presentation' && instructor && (
              <div className="mb-8 bg-slate-800 rounded-xl p-6 border border-slate-700">
                <div className="flex items-start space-x-6">
                  <AIAvatar
                    avatar={instructor}
                    message={avatarMessage}
                    size="large"
                    autoSpeak={isPlaying}
                    showControls={true}
                    onSpeakComplete={() => setIsPlaying(false)}
                  />
                  <div className="flex-1">
                    <h4 className="text-white font-semibold mb-2">
                      {currentContent.title}
                    </h4>
                    <p className="text-slate-300 leading-relaxed">
                      {currentContent.avatarScript || currentContent.content}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Text Content */}
            {currentContent?.type === 'text' && (
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h4 className="text-xl font-semibold text-white mb-4">
                  {currentContent.title}
                </h4>
                <div className="prose prose-invert max-w-none">
                  <div
                    className="text-slate-300 leading-relaxed whitespace-pre-line"
                    dangerouslySetInnerHTML={{ __html: currentContent.content }}
                  />
                </div>
              </div>
            )}

            {/* Interactive Content */}
            {currentContent?.type === 'interactive' && (
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h4 className="text-xl font-semibold text-white mb-4">
                  {currentContent.title}
                </h4>
                <div className="text-slate-300 mb-6">{currentContent.content}</div>
                <div className="bg-slate-700/50 rounded-lg p-8 text-center">
                  <MessageCircle className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <p className="text-slate-400">
                    Interactive exercise will appear here
                  </p>
                </div>
              </div>
            )}

            {/* Scenario Content */}
            {currentContent?.type === 'scenario' && (
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h4 className="text-xl font-semibold text-white mb-4">
                  Scenario: {currentContent.title}
                </h4>
                <p className="text-slate-300 mb-6">{currentContent.content}</p>
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                  <p className="text-amber-400 text-sm">
                    Complete this scenario to continue with the lesson.
                  </p>
                </div>
              </div>
            )}

            {/* Content Navigation */}
            <div className="flex items-center justify-between mt-6">
              <div className="text-slate-400 text-sm">
                Part {currentContentIndex + 1} of {activeLesson.contents.length}
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={handlePrevContent}
                  disabled={currentContentIndex === 0}
                  className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </button>

                {currentContentIndex < activeLesson.contents.length - 1 ? (
                  <button
                    onClick={handleNextContent}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      handleCompleteLesson();
                      handleNextLesson();
                    }}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center"
                  >
                    {isLessonCompleted ? 'Continue' : 'Complete & Continue'}
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Progress Bar */}
        <div className="px-6 py-3 bg-slate-800 border-t border-slate-700">
          <div className="flex items-center justify-between text-sm text-slate-400 mb-2">
            <span>Lesson Progress</span>
            <span>
              {Math.round(
                ((currentContentIndex + 1) / activeLesson.contents.length) * 100
              )}
              %
            </span>
          </div>
          <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all"
              style={{
                width: `${
                  ((currentContentIndex + 1) / activeLesson.contents.length) * 100
                }%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Floating Avatar Helper */}
      {instructor && (
        <FloatingAvatar
          avatar={instructor}
          onAskQuestion={() => setShowAvatarChat(true)}
        />
      )}
    </div>
  );
}
