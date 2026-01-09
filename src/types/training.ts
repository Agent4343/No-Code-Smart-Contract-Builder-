// Training Platform Types for C-NLOER Offshore Regulations

export interface Avatar {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  voiceId: string;
  personality: 'friendly' | 'professional' | 'mentor' | 'expert';
  specialization: string[];
}

export interface RegulationSection {
  id: string;
  title: string;
  code: string;
  description: string;
  content: string;
  keyPoints: string[];
  references: string[];
}

export interface LessonContent {
  id: string;
  type: 'video' | 'text' | 'interactive' | 'avatar-presentation' | 'scenario';
  title: string;
  content: string;
  avatarScript?: string;
  duration: number; // in minutes
  mediaUrl?: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  avatarId: string;
  contents: LessonContent[];
  regulationSections: string[];
  duration: number;
  order: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'scenario-based' | 'fill-blank';
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  avatarExplanation: string; // Script for avatar to explain if wrong
  regulationReference: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  points: number;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  passingScore: number;
  timeLimit?: number; // in minutes
  attemptsAllowed: number;
  avatarId: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  quiz: Quiz;
  order: number;
  estimatedTime: number;
  prerequisites: string[];
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  imageUrl: string;
  category: CourseCategory;
  level: 'beginner' | 'intermediate' | 'advanced' | 'all-levels';
  modules: Module[];
  instructorAvatarId: string;
  targetAudience: string[];
  learningObjectives: string[];
  certification: CertificationInfo;
  pricing: CoursePricing;
  tags: string[];
  featured: boolean;
  publishedAt: string;
  updatedAt: string;
  totalDuration: number;
  totalLessons: number;
  enrollmentCount: number;
  rating: number;
  reviewCount: number;
}

export type CourseCategory =
  | 'safety-regulations'
  | 'environmental-compliance'
  | 'operations-management'
  | 'emergency-response'
  | 'equipment-certification'
  | 'personnel-training'
  | 'drilling-operations'
  | 'production-operations'
  | 'marine-operations'
  | 'helicopter-operations';

export interface CertificationInfo {
  available: boolean;
  name: string;
  validityPeriod: number; // in months
  accreditedBy: string;
  certificateTemplate: string;
}

export interface CoursePricing {
  type: 'free' | 'one-time' | 'subscription' | 'enterprise';
  basePrice: number;
  currency: string;
  discounts: PricingDiscount[];
  packages: PricingPackage[];
}

export interface PricingDiscount {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  validUntil: string;
  minPurchase?: number;
}

export interface PricingPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  popular?: boolean;
  courseIds?: string[];
  duration?: number; // subscription duration in months
}

export interface UserProgress {
  oderId: string;
  courseId: string;
  modulesCompleted: string[];
  lessonsCompleted: string[];
  quizAttempts: QuizAttempt[];
  overallProgress: number;
  startedAt: string;
  lastAccessedAt: string;
  completedAt?: string;
  certificateIssued: boolean;
  certificateId?: string;
}

export interface QuizAttempt {
  quizId: string;
  attemptNumber: number;
  answers: { questionId: string; answer: string | string[]; correct: boolean }[];
  score: number;
  passed: boolean;
  completedAt: string;
  timeSpent: number;
}

export interface Certificate {
  id: string;
  oderId: string;
  courseId: string;
  courseName: string;
  userName: string;
  issueDate: string;
  expiryDate: string;
  certificateNumber: string;
  verificationUrl: string;
}

export interface Enrollment {
  id: string;
  oderId: string;
  courseId: string;
  packageId?: string;
  purchaseDate: string;
  expiryDate?: string;
  paymentStatus: 'pending' | 'completed' | 'refunded';
  amount: number;
  accessType: 'lifetime' | 'limited';
}

// C-NLOER Specific Regulation Categories
export interface CNLOERRegulation {
  id: string;
  code: string;
  title: string;
  chapter: string;
  section: string;
  fullText: string;
  summary: string;
  effectiveDate: string;
  amendments: RegulationAmendment[];
  relatedRegulations: string[];
  applicableTo: string[];
}

export interface RegulationAmendment {
  date: string;
  description: string;
  previousText: string;
  newText: string;
}

// Avatar Interaction Types
export interface AvatarMessage {
  id: string;
  avatarId: string;
  type: 'greeting' | 'explanation' | 'encouragement' | 'correction' | 'summary';
  content: string;
  emotion: 'neutral' | 'happy' | 'thinking' | 'concerned' | 'encouraging';
  audioUrl?: string;
}

export interface InteractiveScenario {
  id: string;
  title: string;
  description: string;
  situation: string;
  avatarId: string;
  choices: ScenarioChoice[];
  correctChoiceId: string;
  feedback: {
    correct: AvatarMessage;
    incorrect: AvatarMessage;
  };
}

export interface ScenarioChoice {
  id: string;
  text: string;
  consequence: string;
  isCorrect: boolean;
}

// Course Bundle/Package Types
export interface CourseBundle {
  id: string;
  name: string;
  description: string;
  courses: string[];
  originalPrice: number;
  bundlePrice: number;
  savings: number;
  imageUrl: string;
  featured: boolean;
}

// Enterprise/Team Training
export interface TeamSubscription {
  id: string;
  organizationName: string;
  seats: number;
  usedSeats: number;
  courses: string[];
  startDate: string;
  endDate: string;
  adminUsers: string[];
  pricing: {
    perSeat: number;
    total: number;
    billingCycle: 'monthly' | 'annual';
  };
}

// Analytics Types
export interface TrainingAnalytics {
  totalEnrollments: number;
  completionRate: number;
  averageScore: number;
  topCourses: { courseId: string; enrollments: number }[];
  revenueThisMonth: number;
  activeUsers: number;
}
