import type { Avatar, Course, CourseBundle, CNLOERRegulation, PricingPackage } from '../types/training';

// AI Avatars for Training
export const avatars: Avatar[] = [
  {
    id: 'captain-sarah',
    name: 'Captain Sarah Mitchell',
    role: 'Offshore Installation Manager',
    imageUrl: '/avatars/sarah.png',
    voiceId: 'sarah-professional',
    personality: 'professional',
    specialization: ['operations-management', 'emergency-response', 'marine-operations'],
  },
  {
    id: 'engineer-james',
    name: 'James O\'Brien',
    role: 'Senior Drilling Engineer',
    imageUrl: '/avatars/james.png',
    voiceId: 'james-friendly',
    personality: 'mentor',
    specialization: ['drilling-operations', 'equipment-certification', 'technical-standards'],
  },
  {
    id: 'safety-officer-maria',
    name: 'Dr. Maria Santos',
    role: 'Health, Safety & Environment Director',
    imageUrl: '/avatars/maria.png',
    voiceId: 'maria-expert',
    personality: 'expert',
    specialization: ['safety-regulations', 'environmental-compliance', 'risk-management'],
  },
  {
    id: 'drilling-expert-mike',
    name: 'Mike Thompson',
    role: 'Drilling Operations Supervisor',
    imageUrl: '/avatars/mike.png',
    voiceId: 'mike-mentor',
    personality: 'mentor',
    specialization: ['drilling-operations', 'well-control', 'blowout-prevention'],
  },
  {
    id: 'environmental-specialist-emma',
    name: 'Emma Blackwood',
    role: 'Environmental Compliance Specialist',
    imageUrl: '/avatars/emma.png',
    voiceId: 'emma-friendly',
    personality: 'friendly',
    specialization: ['environmental-compliance', 'spill-response', 'marine-protection'],
  },
  {
    id: 'operations-manager-david',
    name: 'David Chen',
    role: 'Production Operations Manager',
    imageUrl: '/avatars/david.png',
    voiceId: 'david-professional',
    personality: 'professional',
    specialization: ['production-operations', 'facility-management', 'process-safety'],
  },
];

// C-NLOER Regulations Database - Based on Actual Canadian Offshore Regulations
// Reference: Canada-Newfoundland and Labrador Offshore Area OHS Regulations (SOR/2021-247)
// Reference: Offshore Petroleum Operations Framework Regulations (SOR/2024-25)
// Note: C-NLOPB was renamed to C-NLOER (Canada-Newfoundland and Labrador Offshore Energy Regulator) on June 2, 2025

export const cnloerRegulations: CNLOERRegulation[] = [
  {
    id: 'reg-001',
    code: 'SOR/2021-247 Part 3',
    title: 'General Duties - Occupational Health and Safety',
    chapter: 'Part 3',
    section: 'Sections 15-25',
    fullText: `Under SOR/2021-247, the operator has the following general duties:

(a) ensure, so far as is reasonably practicable, the health and safety of all persons at the workplace;
(b) provide and maintain a workplace, and the equipment and systems used there, that are safe and without risk to health;
(c) establish written occupational health and safety policies and programs;
(d) ensure that persons at the workplace are informed of any known or foreseeable health or safety hazards;
(e) ensure that persons are provided with the information, training, instruction and supervision necessary for their health and safety;
(f) maintain records of training provided to each employee;
(g) ensure that all safety equipment is maintained in good working condition and readily accessible.

Every employee while at a workplace shall:
(a) take all reasonable precautions to ensure their own health and safety and that of other persons;
(b) cooperate with any person exercising a duty under these Regulations;
(c) use safety materials, equipment, devices and clothing that are intended for their protection;
(d) report any hazard or contravention to their supervisor.`,
    summary: 'Core duties for operators and employees under Canada-Newfoundland OHS Regulations regarding workplace health and safety.',
    effectiveDate: '2021-12-31',
    amendments: [],
    relatedRegulations: ['reg-002', 'reg-003', 'reg-009'],
    applicableTo: ['All offshore personnel', 'Operators', 'Contractors', 'Employers'],
  },
  {
    id: 'reg-002',
    code: 'SOR/2021-247 Part 5',
    title: 'Hazard Prevention Program',
    chapter: 'Part 5',
    section: 'Sections 40-52',
    fullText: `Every operator shall develop, implement, and maintain a hazard prevention program that:

(a) identifies all agents, conditions and activities that could be hazardous to the health or safety of persons at the workplace;
(b) assesses the risks of injury or illness arising from exposure to those hazards;
(c) specifies the measures to be taken to prevent, control or minimize those risks;
(d) specifies procedures for responding to emergency situations;
(e) identifies responsibilities for implementation.

The program must include:
- Hazard identification through regular workplace inspections
- Risk assessments using recognized methodologies
- Control measures following the hierarchy of controls (elimination, substitution, engineering controls, administrative controls, PPE)
- Regular review and updates based on incident investigations
- Worker participation in hazard identification and risk assessment

Records must be maintained for a minimum of 5 years and made available for inspection.`,
    summary: 'Requirements for hazard prevention programs including identification, assessment, and control measures.',
    effectiveDate: '2021-12-31',
    amendments: [],
    relatedRegulations: ['reg-001', 'reg-003'],
    applicableTo: ['Operators', 'Safety Officers', 'Supervisors', 'All Personnel'],
  },
  {
    id: 'reg-003',
    code: 'SOR/2021-247 Part 6',
    title: 'Workplace Health and Safety Committees',
    chapter: 'Part 6',
    section: 'Sections 53-67',
    fullText: `Every operator shall establish a workplace health and safety committee for each offshore workplace where 5 or more persons are normally employed.

Committee composition:
- At least 50% of members must be non-management employees
- Committee must have two co-chairs: one management representative, one employee representative
- Employee members are selected by the employees or their union

Committee duties include:
(a) participate in workplace inspections at least monthly;
(b) receive, consider and expeditiously dispose of complaints relating to health and safety;
(c) participate in investigations of work refusals and serious incidents;
(d) review the effectiveness of health and safety policies and programs;
(e) make recommendations to the operator for improvement;
(f) review inspection reports and follow up on corrective actions.

Meetings must be held at least monthly, with minutes recorded and posted.`,
    summary: 'Requirements for establishing and operating workplace health and safety committees.',
    effectiveDate: '2021-12-31',
    amendments: [],
    relatedRegulations: ['reg-001', 'reg-002'],
    applicableTo: ['Operators', 'Committee Members', 'All Personnel'],
  },
  {
    id: 'reg-004',
    code: 'SOR/2021-247 Part 7',
    title: 'Right to Refuse Dangerous Work',
    chapter: 'Part 7',
    section: 'Sections 68-75',
    fullText: `An employee may refuse to perform work if they have reasonable cause to believe that:

(a) the performance of the work constitutes a danger to themselves or another person;
(b) using or operating a machine or thing constitutes a danger;
(c) a condition exists at the workplace that constitutes a danger.

Procedure for work refusal:
1. Employee immediately reports refusal and reasons to supervisor
2. Supervisor investigates in presence of employee and safety committee member
3. If danger exists, supervisor takes immediate corrective action
4. If supervisor determines no danger, and employee still refuses, matter referred to Health and Safety Officer
5. Employee may be assigned reasonable alternative work pending investigation
6. No reprisal permitted against employee for exercising right to refuse

IMPORTANT: An employee cannot refuse to perform work if the danger is a normal condition of employment or if refusal would directly endanger the life, health or safety of another person.`,
    summary: 'Employee rights to refuse dangerous work and the investigation process.',
    effectiveDate: '2021-12-31',
    amendments: [],
    relatedRegulations: ['reg-001', 'reg-003'],
    applicableTo: ['All Offshore Personnel', 'Supervisors', 'Safety Committees'],
  },
  {
    id: 'reg-005',
    code: 'SOR/2024-25 Part 3',
    title: 'Safety and Environmental Management System',
    chapter: 'Part 3',
    section: 'Sections 12-28',
    fullText: `Under the Offshore Petroleum Operations Framework Regulations (SOR/2024-25), every operator must establish and implement a safety and environmental management system (SEMS) that includes:

(a) A safety and environmental protection policy signed by senior management;
(b) Organizational structure with defined roles, responsibilities, and authorities;
(c) Risk management processes for identifying, assessing, and controlling hazards;
(d) Operating procedures for all safety-critical activities;
(e) Management of change procedures;
(f) Training and competency assurance programs;
(g) Emergency preparedness and response plans;
(h) Incident investigation and analysis;
(i) Internal audit program;
(j) Management review and continuous improvement.

The SEMS must be documented, communicated to all personnel, and reviewed at least annually. Performance metrics must be established and monitored.`,
    summary: 'Requirements for Safety and Environmental Management Systems under the new 2024 Operations Framework.',
    effectiveDate: '2024-02-01',
    amendments: [],
    relatedRegulations: ['reg-001', 'reg-002', 'reg-006'],
    applicableTo: ['Operators', 'Facility Managers', 'Safety Officers'],
  },
  {
    id: 'reg-006',
    code: 'SOR/2021-247 Part 12',
    title: 'Emergency Preparedness and Response',
    chapter: 'Part 12',
    section: 'Sections 150-168',
    fullText: `Every operator shall prepare and implement an emergency response plan that addresses:

(a) Fire and explosion
(b) Blowout or loss of well control
(c) Hazardous substance release
(d) Structural failure or vessel collision
(e) Severe weather and environmental emergencies
(f) Medical emergencies and mass casualty incidents
(g) Helicopter ditching or crash
(h) Person overboard

The plan must include:
- Emergency organization and responsibilities
- Muster procedures and designated stations
- Evacuation routes and assembly points
- Communication procedures (internal and external)
- Emergency equipment locations and operation
- Procedures for temporary refuge
- Evacuation, escape and rescue procedures
- Post-emergency procedures

DRILLS: Emergency drills must be conducted:
- Muster drills: Weekly
- Boat drills: Monthly
- Fire drills: Monthly
- Abandonment drills: Every 6 months
- Full-scale exercises: Annually

All drills must be documented with evaluation and corrective actions.`,
    summary: 'Comprehensive emergency preparedness and response requirements including drill frequencies.',
    effectiveDate: '2021-12-31',
    amendments: [],
    relatedRegulations: ['reg-001', 'reg-007', 'reg-010'],
    applicableTo: ['All Personnel', 'Emergency Response Teams', 'Installation Managers'],
  },
  {
    id: 'reg-007',
    code: 'SOR/2021-247 Part 13',
    title: 'Helicopter Operations and Passenger Safety',
    chapter: 'Part 13',
    section: 'Sections 169-185',
    fullText: `Requirements for helicopter operations to offshore installations:

MANDATORY TRAINING - All helicopter passengers must complete:
1. Basic Survival Training (BST) - Valid for 4 years
   - Sea survival techniques
   - Life raft operation
   - Helicopter emergency procedures

2. Helicopter Underwater Escape Training (HUET) - Valid for 4 years
   - Underwater escape from submerged helicopter
   - Emergency breathing systems (EBS)
   - Window and door egress procedures

3. HUET with Emergency Breathing System (EBS) refresher - Every 3 years

PASSENGER REQUIREMENTS:
- Must wear approved helicopter transportation suit (survival suit)
- Must attend pre-flight safety briefing
- Must be medically fit for helicopter travel
- Must carry offshore safety induction valid certification

HELIDECK REQUIREMENTS:
- Helideck crew must hold valid training certificates
- Fire-fighting equipment must be positioned and ready
- Weather monitoring for operational limits
- Obstacle-free approach and departure paths

Weather minimums for operations are specified in the operator's aviation management system.`,
    summary: 'Helicopter safety requirements including mandatory BST and HUET training for all passengers.',
    effectiveDate: '2021-12-31',
    amendments: [],
    relatedRegulations: ['reg-001', 'reg-006', 'reg-009'],
    applicableTo: ['All Helicopter Passengers', 'Helideck Crews', 'Aviation Personnel'],
  },
  {
    id: 'reg-008',
    code: 'SOR/2024-25 Part 5',
    title: 'Well Control and Blowout Prevention',
    chapter: 'Part 5',
    section: 'Sections 45-72',
    fullText: `Requirements for well control operations:

BLOWOUT PREVENTER (BOP) REQUIREMENTS:
- BOP system must be rated for maximum anticipated surface pressure
- Surface BOP stacks must include minimum: annular preventer, pipe rams, blind/shear rams
- Subsea BOP stacks require redundant control systems

BOP TESTING REQUIREMENTS:
- Function test: Every 7 days
- Pressure test: Every 14 days or after disconnection
- Pressure test to full rated working pressure initially
- Subsequent tests to 70% of rated working pressure
- All tests must be documented with time, pressure, and results

WELL CONTROL CERTIFICATION:
Personnel in well control positions must hold valid certification from:
- IWCF (International Well Control Forum), or
- IADC (International Association of Drilling Contractors)

Certification levels:
- Level 2: Driller/Supervisory level
- Level 3: Superintendent level
- Level 4: Engineer level

Certificates valid for 2 years. Recertification required.

WELL CONTROL DRILLS:
- Kick drills must be conducted weekly
- All drilling crew must participate
- Drills must be documented with evaluation`,
    summary: 'Well control requirements including BOP testing frequencies and certification standards.',
    effectiveDate: '2024-02-01',
    amendments: [],
    relatedRegulations: ['reg-005', 'reg-009'],
    applicableTo: ['Drilling Personnel', 'Well Control Specialists', 'Toolpushers', 'Supervisors'],
  },
  {
    id: 'reg-009',
    code: 'SOR/2021-247 Part 8',
    title: 'Training and Competency Requirements',
    chapter: 'Part 8',
    section: 'Sections 76-92',
    fullText: `Training requirements for offshore personnel:

MANDATORY TRAINING FOR ALL OFFSHORE WORKERS:
1. Basic Offshore Safety Induction and Emergency Training (BOSIET)
   - Or equivalent T-BOSIET (Tropical) where applicable
   - Valid for 4 years
   - Includes: helicopter safety, sea survival, firefighting, first aid

2. Basic Survival Training (BST)
   - Sea survival techniques
   - Valid for 4 years

3. Helicopter Underwater Escape Training (HUET)
   - Valid for 4 years
   - EBS refresher every 3 years

4. H2S (Hydrogen Sulfide) Awareness
   - Where H2S may be present
   - Valid for 3 years

OPITO STANDARDS:
C-NLOER recognizes OPITO (Offshore Petroleum Industry Training Organization) approved training for:
- Basic Offshore Safety Induction and Emergency Training
- Further Offshore Emergency Training (FOET)
- Offshore Helideck Operations
- Offshore Crane Operations
- Banksman/Slinger

COMPETENCY ASSURANCE:
Operators must establish competency management systems that:
- Define competency requirements for each position
- Assess and verify competencies
- Maintain training records
- Provide refresher training as required

Records must be maintained for duration of employment plus 5 years.`,
    summary: 'Training and competency requirements including OPITO standards and certification validity periods.',
    effectiveDate: '2021-12-31',
    amendments: [],
    relatedRegulations: ['reg-001', 'reg-007', 'reg-008'],
    applicableTo: ['All Offshore Personnel', 'Training Coordinators', 'HR Departments'],
  },
  {
    id: 'reg-010',
    code: 'Accord Acts - Spill Prevention',
    title: 'Oil Spill Prevention and Response Requirements',
    chapter: 'Canada-Newfoundland Atlantic Accord Implementation Act',
    section: 'Part III.1',
    fullText: `Oil Spill Prevention and Response Requirements under the Accord Acts:

SPILL PREVENTION:
Every operator must:
- Implement spill prevention measures in design and operations
- Maintain equipment to prevent releases
- Conduct regular inspections of containment systems
- Train personnel in spill prevention practices

RESPONSE CAPABILITY:
Operators must demonstrate financial responsibility and response capability for:
- Tier 1: On-site response capability (immediate response)
- Tier 2: Regional response capability (within 24 hours)
- Tier 3: National/international response (major incidents)

SPILL RESPONSE PLAN must include:
- Immediate notification procedures
- Source control measures
- Containment and recovery operations
- Wildlife protection procedures
- Waste management and disposal
- Communication protocols

REPORTING REQUIREMENTS:
Immediate notification to C-NLOER Chief Conservation Officer for:
- Any unintended release of petroleum
- Release of pollutants
- Debris that may pose a hazard
- Any incident that may result in a release

Financial responsibility: Operators must maintain proof of financial resources of at least $1 billion for spill response.`,
    summary: 'Spill prevention and response requirements under the Canada-Newfoundland Atlantic Accord.',
    effectiveDate: '2020-01-01',
    amendments: [
      {
        date: '2022-07-01',
        description: 'Increased financial responsibility requirements',
        previousText: '$250 million minimum financial responsibility',
        newText: '$1 billion minimum financial responsibility',
      },
    ],
    relatedRegulations: ['reg-005', 'reg-006'],
    applicableTo: ['Operators', 'Environmental Officers', 'Response Teams'],
  },
  {
    id: 'reg-011',
    code: 'SOR/2021-247 Part 9',
    title: 'Personal Protective Equipment',
    chapter: 'Part 9',
    section: 'Sections 93-108',
    fullText: `Personal Protective Equipment (PPE) Requirements:

GENERAL REQUIREMENTS:
The operator shall provide, at no cost to workers:
- All PPE required for the work being performed
- Training in proper use, care, and limitations of PPE
- Proper storage and maintenance facilities

MANDATORY PPE ON OFFSHORE INSTALLATIONS:
- Hard hat (CSA approved) in designated areas
- Safety footwear (CSA Grade 1) at all times outside living quarters
- Safety glasses with side shields in work areas
- Hearing protection where noise exceeds 85 dBA
- High-visibility clothing in designated areas

SPECIALIZED PPE REQUIREMENTS:
Fall Protection:
- Required when working at heights above 3 meters
- Full body harness with shock-absorbing lanyard
- Inspection before each use

Respiratory Protection:
- Required where atmospheric hazards exist
- Proper fit testing required
- SCBA for emergency response teams

Chemical Protection:
- Appropriate for the hazard (gloves, suits, eye protection)
- Material Safety Data Sheets must be consulted

Cold Water Immersion Protection:
- Approved survival suits for helicopter travel
- Suits must be inspected and properly maintained`,
    summary: 'Requirements for personal protective equipment including mandatory and specialized PPE.',
    effectiveDate: '2021-12-31',
    amendments: [],
    relatedRegulations: ['reg-001', 'reg-002'],
    applicableTo: ['All Offshore Personnel', 'Supervisors', 'Safety Officers'],
  },
  {
    id: 'reg-012',
    code: 'SOR/2021-247 Part 14',
    title: 'Incident Reporting and Investigation',
    chapter: 'Part 14',
    section: 'Sections 186-198',
    fullText: `Incident Reporting and Investigation Requirements:

IMMEDIATE NOTIFICATION (within 24 hours) to C-NLOER for:
- Fatality
- Serious injury requiring medical evacuation
- Fire or explosion causing injury or significant damage
- Uncontrolled release of hydrocarbons
- Structural damage affecting installation integrity
- Loss of well control
- Helicopter incident
- Collision with installation
- Loss of station-keeping ability

WRITTEN REPORT (within 7 days) must include:
- Date, time, and location of incident
- Description of circumstances
- Immediate causes identified
- Injuries or damage sustained
- Immediate corrective actions taken

INVESTIGATION REQUIREMENTS:
- Root cause analysis for all serious incidents
- Investigation team must include worker representative
- Final report within 90 days
- Corrective actions tracked to completion

RECORD RETENTION:
- Incident records: minimum 10 years
- Investigation reports: minimum 10 years
- Corrective action records: minimum 5 years`,
    summary: 'Requirements for reporting incidents and conducting investigations with specified timeframes.',
    effectiveDate: '2021-12-31',
    amendments: [],
    relatedRegulations: ['reg-001', 'reg-005', 'reg-006'],
    applicableTo: ['All Personnel', 'Supervisors', 'Safety Officers', 'Operators'],
  },
];

// Complete Courses Data - Based on Actual C-NLOER/OPITO Training Standards
export const courses: Course[] = [
  {
    id: 'course-001',
    title: 'C-NLOER Safety Fundamentals (SOR/2021-247)',
    slug: 'c-nloer-safety-fundamentals',
    description: 'Comprehensive introduction to C-NLOER safety regulations based on SOR/2021-247 OHS Regulations.',
    longDescription: `This foundational course covers the essential safety regulations mandated by the Canada-Newfoundland and Labrador Offshore Energy Regulator under SOR/2021-247 (Canada-Newfoundland and Labrador Offshore Area Occupational Health and Safety Regulations). You'll learn about operator and employee duties, hazard prevention programs, workplace health and safety committees, your right to refuse dangerous work, PPE requirements, and incident reporting. Our AI instructor, Dr. Maria Santos, will guide you through real regulatory requirements with practical examples.`,
    imageUrl: '/courses/safety-fundamentals.jpg',
    category: 'safety-regulations',
    level: 'beginner',
    modules: [
      {
        id: 'mod-001-1',
        title: 'Introduction to C-NLOER and Regulatory Framework',
        description: 'Understanding C-NLOER authority and SOR/2021-247',
        lessons: [
          {
            id: 'les-001-1-1',
            title: 'What is C-NLOER?',
            description: 'Overview of the regulatory body and its authority',
            avatarId: 'safety-officer-maria',
            contents: [
              {
                id: 'cont-001',
                type: 'avatar-presentation',
                title: 'Welcome to C-NLOER Training',
                content: 'Introduction to the regulatory framework',
                avatarScript: 'Welcome to your C-NLOER Safety Fundamentals training. I\'m Dr. Maria Santos, and I\'ll be your guide through this important course. The Canada-Newfoundland and Labrador Offshore Energy Regulator, formerly known as C-NLOPB before June 2, 2025, is the independent joint agency responsible for regulating all petroleum activities in our offshore area. Understanding their regulations is essential for every offshore worker.',
                duration: 5,
              },
              {
                id: 'cont-002',
                type: 'text',
                title: 'C-NLOER Regulatory Authority',
                content: `The Canada-Newfoundland and Labrador Offshore Energy Regulator (C-NLOER) is an independent joint agency of the federal government and the Province of Newfoundland and Labrador.

KEY LEGISLATION:
• Canada-Newfoundland and Labrador Atlantic Accord Implementation Act
• SOR/2021-247: Canada-Newfoundland and Labrador Offshore Area Occupational Health and Safety Regulations
• SOR/2024-25: Offshore Petroleum Operations Framework Regulations

Regulatory Responsibilities:
• Regulate all petroleum activities in the offshore area
• Ensure occupational health and safety of offshore workers
• Protect the marine environment
• Manage petroleum resources responsibly
• Issue licenses, authorizations, and approvals
• Conduct inspections and enforce compliance
• Investigate incidents and accidents

The offshore area extends from the low-water mark of Newfoundland and Labrador to the outer edge of the continental margin, covering approximately 1.5 million square kilometers.`,
                duration: 10,
              },
            ],
            regulationSections: ['reg-001', 'reg-005'],
            duration: 15,
            order: 1,
          },
          {
            id: 'les-001-1-2',
            title: 'Operator and Employee Duties Under SOR/2021-247',
            description: 'General duties as defined in Part 3 of the OHS Regulations',
            avatarId: 'safety-officer-maria',
            contents: [
              {
                id: 'cont-003',
                type: 'avatar-presentation',
                title: 'General Duties',
                content: 'Understanding duties under OHS Regulations',
                avatarScript: 'Under Part 3 of SOR/2021-247, both operators and employees have specific duties. The operator must ensure, so far as is reasonably practicable, the health and safety of all persons at the workplace. But safety is a shared responsibility - you as an employee also have duties to take reasonable precautions and cooperate with safety measures.',
                duration: 8,
              },
              {
                id: 'cont-004',
                type: 'text',
                title: 'Operator Duties (SOR/2021-247 Part 3)',
                content: `OPERATOR GENERAL DUTIES (Sections 15-20):

The operator shall:
(a) Ensure, so far as is reasonably practicable, the health and safety of all persons at the workplace
(b) Provide and maintain a workplace that is safe and without risk to health
(c) Establish written occupational health and safety policies and programs
(d) Ensure persons are informed of known or foreseeable health and safety hazards
(e) Provide information, training, instruction, and supervision necessary for health and safety
(f) Maintain records of all training provided
(g) Ensure safety equipment is maintained in good working condition

EMPLOYEE DUTIES (Sections 21-25):

Every employee shall:
(a) Take all reasonable precautions to ensure their own health and safety and that of others
(b) Cooperate with any person exercising duties under these Regulations
(c) Use safety materials, equipment, devices, and clothing provided for protection
(d) Report any hazard or contravention to their supervisor
(e) Report any injury or illness to their supervisor`,
                duration: 12,
              },
            ],
            regulationSections: ['reg-001'],
            duration: 25,
            order: 2,
          },
          {
            id: 'les-001-1-3',
            title: 'Your Right to Refuse Dangerous Work',
            description: 'Understanding Part 7 of SOR/2021-247',
            avatarId: 'safety-officer-maria',
            contents: [
              {
                id: 'cont-005',
                type: 'avatar-presentation',
                title: 'Right to Refuse',
                content: 'Your fundamental right to refuse dangerous work',
                avatarScript: 'One of the most important rights you have as an offshore worker is the right to refuse work you believe is dangerous. This right is protected under Part 7 of SOR/2021-247. No one can punish you for exercising this right in good faith. Let me explain exactly how this process works.',
                duration: 10,
              },
              {
                id: 'cont-006',
                type: 'text',
                title: 'Work Refusal Process (SOR/2021-247 Part 7)',
                content: `RIGHT TO REFUSE DANGEROUS WORK (Sections 68-75):

You may refuse work if you have reasonable cause to believe that:
• The work constitutes a danger to yourself or another person
• Using or operating equipment constitutes a danger
• A condition at the workplace constitutes a danger

REFUSAL PROCEDURE:
1. Immediately report refusal and reasons to your supervisor
2. Supervisor investigates with you and a safety committee member present
3. If danger confirmed: supervisor takes immediate corrective action
4. If supervisor finds no danger but you still believe danger exists: matter referred to C-NLOER Health and Safety Officer
5. You may be assigned reasonable alternative work during investigation
6. NO REPRISAL is permitted against you for exercising this right

IMPORTANT LIMITATIONS:
You CANNOT refuse work if:
• The danger is a normal condition of your employment
• Your refusal would directly endanger another person's life, health, or safety

PROTECTION FROM REPRISAL:
It is prohibited for anyone to dismiss, discipline, or discriminate against an employee for exercising the right to refuse dangerous work.`,
                duration: 15,
              },
            ],
            regulationSections: ['reg-004'],
            duration: 30,
            order: 3,
          },
        ],
        quiz: {
          id: 'quiz-001-1',
          title: 'C-NLOER Regulatory Framework Quiz',
          description: 'Test your knowledge of C-NLOER regulations and worker rights',
          questions: [
            {
              id: 'q-001',
              question: 'What is the primary regulation governing occupational health and safety in the Canada-Newfoundland offshore area?',
              type: 'multiple-choice',
              options: [
                'SOR/2021-247',
                'SOR/2020-100',
                'Canada Labour Code Part II',
                'Provincial OHS Act',
              ],
              correctAnswer: 'SOR/2021-247',
              explanation: 'SOR/2021-247 is the Canada-Newfoundland and Labrador Offshore Area Occupational Health and Safety Regulations, which governs OHS in the offshore area.',
              avatarExplanation: 'The correct answer is SOR/2021-247 - this is the specific regulation that applies to our offshore area. It\'s important to know this because these regulations have specific requirements that differ from provincial or other federal OHS laws. Whenever you see "SOR" it means "Statutory Order and Regulation" - these are federal regulations.',
              regulationReference: 'reg-001',
              difficulty: 'beginner',
              points: 10,
            },
            {
              id: 'q-002',
              question: 'Under SOR/2021-247, employees have the right to refuse work they believe is dangerous.',
              type: 'true-false',
              correctAnswer: 'true',
              explanation: 'Part 7 of SOR/2021-247 grants employees the right to refuse dangerous work without fear of reprisal.',
              avatarExplanation: 'This is absolutely true and it\'s one of the most important rights you have! Part 7, Sections 68-75 of SOR/2021-247 specifically protects your right to refuse work you believe is dangerous. This right cannot be taken away by your employer or supervisor. Always remember: your safety comes first!',
              regulationReference: 'reg-004',
              difficulty: 'beginner',
              points: 10,
            },
            {
              id: 'q-003',
              question: 'When refusing dangerous work, what is the FIRST step you must take?',
              type: 'multiple-choice',
              options: [
                'Call C-NLOER directly',
                'Immediately report the refusal and reasons to your supervisor',
                'Leave the workplace',
                'Document everything and file a complaint later',
              ],
              correctAnswer: 'Immediately report the refusal and reasons to your supervisor',
              explanation: 'The first step in the work refusal process is to immediately report your refusal and the reasons to your supervisor.',
              avatarExplanation: 'The proper procedure under Part 7 requires you to first report your refusal to your supervisor immediately. Don\'t leave the workplace or call the regulator first. Your supervisor must then investigate with you and a safety committee member. Only if the matter isn\'t resolved does it escalate to C-NLOER.',
              regulationReference: 'reg-004',
              difficulty: 'intermediate',
              points: 15,
            },
            {
              id: 'q-004',
              question: 'How long must operators maintain training records under SOR/2021-247?',
              type: 'multiple-choice',
              options: [
                '1 year',
                '3 years',
                'Duration of employment plus 5 years',
                'Indefinitely',
              ],
              correctAnswer: 'Duration of employment plus 5 years',
              explanation: 'Training records must be maintained for the duration of employment plus 5 years.',
              avatarExplanation: 'The regulations require operators to keep training records for your entire employment period plus an additional 5 years after. This ensures there\'s always documentation available if questions arise about training you received. Make sure to keep your own copies of certificates too!',
              regulationReference: 'reg-009',
              difficulty: 'intermediate',
              points: 15,
            },
            {
              id: 'q-005',
              question: 'Can you be disciplined for refusing work you genuinely believe is dangerous?',
              type: 'multiple-choice',
              options: [
                'Yes, if your supervisor disagrees',
                'No, reprisal is prohibited under SOR/2021-247',
                'Yes, if the work is considered normal duties',
                'Only if you refuse more than once',
              ],
              correctAnswer: 'No, reprisal is prohibited under SOR/2021-247',
              explanation: 'The regulations explicitly prohibit any form of reprisal against employees who exercise their right to refuse dangerous work.',
              avatarExplanation: 'The regulations are very clear on this - no one can dismiss, discipline, or discriminate against you for exercising your right to refuse dangerous work. This protection exists specifically so workers feel safe speaking up about safety concerns. Your employment is protected when you act in good faith.',
              regulationReference: 'reg-004',
              difficulty: 'beginner',
              points: 10,
            },
          ],
          passingScore: 70,
          timeLimit: 20,
          attemptsAllowed: 3,
          avatarId: 'safety-officer-maria',
        },
        order: 1,
        estimatedTime: 75,
        prerequisites: [],
      },
      {
        id: 'mod-001-2',
        title: 'Hazard Prevention Programs',
        description: 'Understanding Part 5 of SOR/2021-247 - Hazard Prevention',
        lessons: [
          {
            id: 'les-001-2-1',
            title: 'Hazard Prevention Program Requirements',
            description: 'Components of an effective hazard prevention program',
            avatarId: 'safety-officer-maria',
            contents: [
              {
                id: 'cont-007',
                type: 'avatar-presentation',
                title: 'Hazard Prevention',
                content: 'Overview of hazard prevention requirements',
                avatarScript: 'Part 5 of SOR/2021-247 requires every operator to develop, implement, and maintain a hazard prevention program. This isn\'t just paperwork - it\'s a systematic approach to identifying hazards before they cause harm. Let me explain what this program must include and your role in making it work.',
                duration: 8,
              },
              {
                id: 'cont-008',
                type: 'text',
                title: 'Hazard Prevention Program Components',
                content: `HAZARD PREVENTION PROGRAM (SOR/2021-247 Part 5, Sections 40-52):

Every operator must develop a hazard prevention program that:

1. HAZARD IDENTIFICATION
• Identify all agents, conditions, and activities that could be hazardous
• Regular workplace inspections
• Worker participation in hazard identification
• Review of incident reports and near-misses

2. RISK ASSESSMENT
• Assess risks of injury or illness from identified hazards
• Use recognized risk assessment methodologies
• Consider likelihood and severity of potential harm
• Document assessment findings

3. CONTROL MEASURES (Hierarchy of Controls)
• Elimination - Remove the hazard entirely
• Substitution - Replace with something less hazardous
• Engineering Controls - Isolate people from the hazard
• Administrative Controls - Change the way work is done
• PPE - Personal protective equipment as last resort

4. EMERGENCY PROCEDURES
• Procedures for responding to emergency situations
• Communication protocols
• Evacuation procedures

5. RESPONSIBILITIES
• Clear assignment of responsibilities for implementation
• Accountability at all levels

RECORD KEEPING: Minimum 5 years, available for inspection`,
                duration: 15,
              },
            ],
            regulationSections: ['reg-002'],
            duration: 25,
            order: 1,
          },
          {
            id: 'les-001-2-2',
            title: 'Identifying Offshore Hazards',
            description: 'Common hazards in the offshore environment',
            avatarId: 'safety-officer-maria',
            contents: [
              {
                id: 'cont-009',
                type: 'avatar-presentation',
                title: 'Offshore Hazard Categories',
                content: 'Types of hazards specific to offshore operations',
                avatarScript: 'Working offshore exposes you to unique hazards. Understanding these hazards is the first step in preventing incidents. Let\'s explore the main categories: physical hazards like noise and moving equipment, chemical hazards including H2S and drilling fluids, and environmental hazards from weather and sea conditions.',
                duration: 10,
              },
              {
                id: 'cont-010',
                type: 'text',
                title: 'Offshore Hazard Categories',
                content: `PHYSICAL HAZARDS:
• Noise - Drilling operations, machinery (hearing protection required >85 dBA)
• Moving equipment - Cranes, drawworks, rotary table
• Working at heights - Derrick work, scaffolding
• Confined spaces - Tanks, vessels, mud pits
• Electrical hazards - High voltage equipment
• Hot surfaces and steam
• Pressure systems and stored energy

CHEMICAL HAZARDS:
• Hydrogen Sulfide (H2S) - Deadly at high concentrations
• Drilling fluids and chemicals
• Hydrocarbons - Fire and explosion risk
• Cleaning solvents and degreasers
• Welding fumes
• Naturally Occurring Radioactive Material (NORM)

ENVIRONMENTAL HAZARDS:
• Severe weather - Storms, high winds, fog
• Sea conditions - Wave height, vessel motion
• Cold stress - Hypothermia risk
• Heat stress - In enclosed spaces
• Ice accumulation

ERGONOMIC HAZARDS:
• Manual handling - Heavy lifting
• Repetitive motions
• Awkward postures
• Vibration from tools and equipment

BIOLOGICAL HAZARDS:
• Food-borne illness
• Communicable diseases in close quarters`,
                duration: 15,
              },
              {
                id: 'cont-011',
                type: 'interactive',
                title: 'Hazard Identification Exercise',
                content: 'Interactive scenario: identify hazards in various offshore work situations',
                duration: 20,
              },
            ],
            regulationSections: ['reg-002', 'reg-011'],
            duration: 50,
            order: 2,
          },
        ],
        quiz: {
          id: 'quiz-001-2',
          title: 'Hazard Prevention Quiz',
          description: 'Test your understanding of hazard prevention requirements',
          questions: [
            {
              id: 'q-006',
              question: 'What is the correct order of the Hierarchy of Controls?',
              type: 'multiple-choice',
              options: [
                'PPE, Administrative, Engineering, Substitution, Elimination',
                'Elimination, Substitution, Engineering, Administrative, PPE',
                'Engineering, PPE, Elimination, Substitution, Administrative',
                'Administrative, Engineering, Substitution, PPE, Elimination',
              ],
              correctAnswer: 'Elimination, Substitution, Engineering, Administrative, PPE',
              explanation: 'The hierarchy goes from most effective (elimination) to least effective (PPE). Always try to eliminate hazards first.',
              avatarExplanation: 'The hierarchy starts with the most effective controls: Elimination removes the hazard entirely. If that\'s not possible, try Substitution. Then Engineering Controls, followed by Administrative Controls. PPE is always the last resort because it only protects the individual and relies on proper use. Remember: PPE should never be your first choice!',
              regulationReference: 'reg-002',
              difficulty: 'intermediate',
              points: 15,
            },
            {
              id: 'q-007',
              question: 'How long must hazard prevention program records be maintained?',
              type: 'multiple-choice',
              options: [
                '1 year',
                '3 years',
                'Minimum 5 years',
                '10 years',
              ],
              correctAnswer: 'Minimum 5 years',
              explanation: 'SOR/2021-247 requires hazard prevention records to be maintained for a minimum of 5 years.',
              avatarExplanation: 'Part 5 of SOR/2021-247 requires that hazard prevention program records be kept for at least 5 years and must be available for inspection by C-NLOER. This includes risk assessments, inspection reports, and corrective actions taken. Good record-keeping is essential for regulatory compliance and continuous improvement.',
              regulationReference: 'reg-002',
              difficulty: 'intermediate',
              points: 10,
            },
            {
              id: 'q-008',
              question: 'At what noise level is hearing protection required under the regulations?',
              type: 'multiple-choice',
              options: [
                '75 dBA',
                '80 dBA',
                '85 dBA',
                '90 dBA',
              ],
              correctAnswer: '85 dBA',
              explanation: 'Hearing protection is required when noise levels exceed 85 dBA.',
              avatarExplanation: 'The threshold for mandatory hearing protection is 85 dBA. Many offshore operations - drilling, machinery, helicopters - exceed this level. Prolonged exposure above this threshold can cause permanent hearing damage. When in doubt, wear your hearing protection!',
              regulationReference: 'reg-011',
              difficulty: 'beginner',
              points: 10,
            },
            {
              id: 'q-009',
              question: 'When you identify a new hazard in your work area, what should you do FIRST?',
              type: 'multiple-choice',
              options: [
                'Fix it yourself immediately',
                'Report it to your supervisor',
                'Wait to see if anyone else notices',
                'Complete a formal written report at end of shift',
              ],
              correctAnswer: 'Report it to your supervisor',
              explanation: 'Immediate reporting to your supervisor allows for proper assessment and control of the hazard.',
              avatarExplanation: 'Your duty under Section 21 of SOR/2021-247 is to report any hazard to your supervisor. Don\'t try to fix it yourself unless you\'re trained and authorized - you might create additional hazards. Don\'t wait until end of shift - hazards need immediate attention. Your supervisor can then initiate the proper response.',
              regulationReference: 'reg-001',
              difficulty: 'beginner',
              points: 10,
            },
          ],
          passingScore: 70,
          timeLimit: 15,
          attemptsAllowed: 3,
          avatarId: 'safety-officer-maria',
        },
        order: 2,
        estimatedTime: 80,
        prerequisites: ['mod-001-1'],
      },
      {
        id: 'mod-001-3',
        title: 'Workplace Health and Safety Committees',
        description: 'Understanding Part 6 of SOR/2021-247',
        lessons: [
          {
            id: 'les-001-3-1',
            title: 'Safety Committee Requirements',
            description: 'Composition and duties of workplace safety committees',
            avatarId: 'safety-officer-maria',
            contents: [
              {
                id: 'cont-012',
                type: 'avatar-presentation',
                title: 'Safety Committees',
                content: 'Your role in workplace safety committees',
                avatarScript: 'Every offshore workplace with 5 or more employees must have a workplace health and safety committee. These committees are a key part of the internal responsibility system - they give workers a voice in safety decisions. Let me explain how these committees work and how you can participate.',
                duration: 8,
              },
              {
                id: 'cont-013',
                type: 'text',
                title: 'Committee Requirements (Part 6)',
                content: `WORKPLACE HEALTH AND SAFETY COMMITTEES (SOR/2021-247 Part 6, Sections 53-67):

WHEN REQUIRED:
• Every offshore workplace with 5+ employees must have a committee

COMPOSITION:
• Minimum 50% must be non-management employees
• Two co-chairs: one management, one employee representative
• Employee members selected by employees or their union

COMMITTEE DUTIES:
(a) Participate in monthly workplace inspections
(b) Receive and address health and safety complaints
(c) Participate in work refusal and serious incident investigations
(d) Review effectiveness of H&S policies and programs
(e) Make recommendations to operator for improvement
(f) Review inspection reports and follow up on corrective actions

MEETINGS:
• Must meet at least monthly
• Minutes must be recorded
• Minutes must be posted for all workers to see

YOUR RIGHT TO PARTICIPATE:
• You can raise safety concerns through the committee
• Committee members have protection from reprisal
• You can volunteer to serve on the committee`,
                duration: 12,
              },
            ],
            regulationSections: ['reg-003'],
            duration: 25,
            order: 1,
          },
        ],
        quiz: {
          id: 'quiz-001-3',
          title: 'Safety Committee Quiz',
          description: 'Test your knowledge of safety committee requirements',
          questions: [
            {
              id: 'q-010',
              question: 'What percentage of a workplace health and safety committee must be non-management employees?',
              type: 'multiple-choice',
              options: [
                'At least 25%',
                'At least 50%',
                'At least 75%',
                'All members must be non-management',
              ],
              correctAnswer: 'At least 50%',
              explanation: 'At least 50% of committee members must be non-management employees to ensure worker representation.',
              avatarExplanation: 'The regulations require at least half of the committee to be non-management workers. This ensures that workers have a strong voice in safety decisions. The committee has two co-chairs - one from management and one elected by workers - to ensure balanced leadership.',
              regulationReference: 'reg-003',
              difficulty: 'beginner',
              points: 10,
            },
            {
              id: 'q-011',
              question: 'How often must the workplace health and safety committee meet?',
              type: 'multiple-choice',
              options: [
                'Weekly',
                'At least monthly',
                'Quarterly',
                'As needed',
              ],
              correctAnswer: 'At least monthly',
              explanation: 'Committees must meet at least once per month, with minutes recorded and posted.',
              avatarExplanation: 'Monthly meetings are the minimum requirement. The committee should meet more often if needed to address urgent safety matters. All meetings must have recorded minutes that are posted where workers can see them. This transparency is essential for the committee to be effective.',
              regulationReference: 'reg-003',
              difficulty: 'beginner',
              points: 10,
            },
          ],
          passingScore: 70,
          timeLimit: 10,
          attemptsAllowed: 3,
          avatarId: 'safety-officer-maria',
        },
        order: 3,
        estimatedTime: 35,
        prerequisites: ['mod-001-2'],
      },
      {
        id: 'mod-001-4',
        title: 'Personal Protective Equipment',
        description: 'PPE Requirements under Part 9 of SOR/2021-247',
        lessons: [
          {
            id: 'les-001-4-1',
            title: 'PPE Requirements and Standards',
            description: 'Understanding mandatory and specialized PPE',
            avatarId: 'safety-officer-maria',
            contents: [
              {
                id: 'cont-014',
                type: 'avatar-presentation',
                title: 'PPE Overview',
                content: 'Your personal protective equipment requirements',
                avatarScript: 'Personal Protective Equipment is your last line of defense against workplace hazards. Under Part 9 of SOR/2021-247, your employer must provide PPE at no cost to you, train you in its proper use, and maintain it in good condition. But you have responsibilities too - you must use the PPE provided. Let\'s look at the specific requirements.',
                duration: 10,
              },
              {
                id: 'cont-015',
                type: 'text',
                title: 'PPE Requirements (SOR/2021-247 Part 9)',
                content: `PERSONAL PROTECTIVE EQUIPMENT (Sections 93-108):

OPERATOR RESPONSIBILITIES:
• Provide all required PPE at no cost to workers
• Train workers in proper use, care, and limitations
• Provide proper storage and maintenance facilities
• Ensure PPE meets applicable CSA standards

MANDATORY PPE ON OFFSHORE INSTALLATIONS:
• Hard hat (CSA approved) - In all designated work areas
• Safety footwear (CSA Grade 1) - Outside living quarters
• Safety glasses with side shields - All work areas
• Hearing protection - Where noise exceeds 85 dBA
• High-visibility clothing - Designated areas

SPECIALIZED PPE:

Fall Protection (Required above 3 meters):
• Full body harness with shock-absorbing lanyard
• Proper anchor points
• Inspection before each use
• Annual certification

Respiratory Protection:
• Required where atmospheric hazards exist
• Proper fit testing required
• SCBA for emergency response teams
• Training in use and limitations

Chemical Protection:
• Appropriate for specific hazards (gloves, suits, eye protection)
• Reference Safety Data Sheets (SDS)
• Chemical-specific training

Cold Water Immersion (Survival Suits):
• Approved suits for all helicopter travel
• Must be properly inspected and maintained
• Training in donning and use required`,
                duration: 15,
              },
            ],
            regulationSections: ['reg-011'],
            duration: 30,
            order: 1,
          },
        ],
        quiz: {
          id: 'quiz-001-4',
          title: 'PPE Requirements Quiz',
          description: 'Test your knowledge of PPE requirements',
          questions: [
            {
              id: 'q-012',
              question: 'Who is responsible for providing PPE to offshore workers?',
              type: 'multiple-choice',
              options: [
                'The worker must purchase their own',
                'The operator must provide at no cost to workers',
                'The union provides PPE',
                'Workers can choose whether to use PPE',
              ],
              correctAnswer: 'The operator must provide at no cost to workers',
              explanation: 'Under SOR/2021-247, operators must provide all required PPE at no cost to workers.',
              avatarExplanation: 'The regulations are clear - the operator must provide all required PPE at no cost to you. They must also train you in its proper use and maintain it in good condition. You should never have to pay for safety equipment that\'s required for your job.',
              regulationReference: 'reg-011',
              difficulty: 'beginner',
              points: 10,
            },
            {
              id: 'q-013',
              question: 'At what height is fall protection required?',
              type: 'multiple-choice',
              options: [
                'Above 1 meter',
                'Above 2 meters',
                'Above 3 meters',
                'Above 5 meters',
              ],
              correctAnswer: 'Above 3 meters',
              explanation: 'Fall protection is required when working at heights above 3 meters.',
              avatarExplanation: 'The trigger height for fall protection is 3 meters. However, fall protection may be required at lower heights if there are additional hazards below. Always assess the situation - a fall from any height can cause serious injury. When in doubt, use fall protection.',
              regulationReference: 'reg-011',
              difficulty: 'intermediate',
              points: 15,
            },
          ],
          passingScore: 70,
          timeLimit: 10,
          attemptsAllowed: 3,
          avatarId: 'safety-officer-maria',
        },
        order: 4,
        estimatedTime: 40,
        prerequisites: ['mod-001-3'],
      },
    ],
    instructorAvatarId: 'safety-officer-maria',
    targetAudience: ['New offshore workers', 'Contractors', 'Visitors to offshore installations', 'All personnel requiring safety orientation'],
    learningObjectives: [
      'Understand C-NLOER regulatory authority and SOR/2021-247',
      'Know operator and employee duties under the OHS Regulations',
      'Understand your right to refuse dangerous work and the proper procedure',
      'Comprehend hazard prevention program requirements and the hierarchy of controls',
      'Know the role and composition of workplace health and safety committees',
      'Understand PPE requirements and standards',
    ],
    certification: {
      available: true,
      name: 'C-NLOER Safety Fundamentals Certificate',
      validityPeriod: 24,
      accreditedBy: 'C-NLOER Training Standards - SOR/2021-247 Compliant',
      certificateTemplate: 'template-safety-fundamentals',
    },
    pricing: {
      type: 'one-time',
      basePrice: 299,
      currency: 'CAD',
      discounts: [
        {
          code: 'OFFSHORE2025',
          type: 'percentage',
          value: 20,
          validUntil: '2025-12-31',
        },
      ],
      packages: [],
    },
    tags: ['safety', 'fundamentals', 'c-nloer', 'beginner', 'certification', 'SOR/2021-247', 'ohs'],
    featured: true,
    publishedAt: '2024-01-01',
    updatedAt: '2025-06-15',
    totalDuration: 240,
    totalLessons: 8,
    enrollmentCount: 2450,
    rating: 4.8,
    reviewCount: 312,
  },
  {
    id: 'course-002',
    title: 'Environmental Compliance Essentials',
    slug: 'environmental-compliance-essentials',
    description: 'Master environmental regulations and protection requirements for offshore operations.',
    longDescription: `Learn the critical environmental regulations that govern offshore petroleum operations in the Canada-Newfoundland and Labrador offshore area. This course covers spill prevention and response, emissions management, waste handling, and marine life protection. Emma Blackwood, our Environmental Compliance Specialist, will share real-world examples and best practices.`,
    imageUrl: '/courses/environmental-compliance.jpg',
    category: 'environmental-compliance',
    level: 'intermediate',
    modules: [
      {
        id: 'mod-002-1',
        title: 'Environmental Management Systems',
        description: 'Understanding EMS requirements',
        lessons: [
          {
            id: 'les-002-1-1',
            title: 'Introduction to Environmental Management',
            description: 'Core concepts of offshore environmental management',
            avatarId: 'environmental-specialist-emma',
            contents: [
              {
                id: 'cont-006',
                type: 'avatar-presentation',
                title: 'Environmental Stewardship',
                content: 'Introduction to environmental responsibilities',
                avatarScript: 'Hello! I\'m Emma Blackwood, and protecting our ocean environment is my passion. In offshore operations, we have a responsibility to minimize our environmental footprint. Let me show you how we do that through comprehensive environmental management systems.',
                duration: 8,
              },
            ],
            regulationSections: ['reg-002', 'reg-005'],
            duration: 25,
            order: 1,
          },
        ],
        quiz: {
          id: 'quiz-002-1',
          title: 'Environmental Management Quiz',
          description: 'Test your EMS knowledge',
          questions: [
            {
              id: 'q-005',
              question: 'How often must emissions be reported under current C-NLOER requirements?',
              type: 'multiple-choice',
              options: [
                'Annually',
                'Quarterly',
                'Monthly',
                'Weekly',
              ],
              correctAnswer: 'Quarterly',
              explanation: 'Current regulations require quarterly emissions reporting with real-time monitoring for major sources.',
              avatarExplanation: 'Since the 2022 amendments to C-NLOER-ENV-001, emissions must be reported quarterly, not annually as before. This change was made to provide more timely data for environmental monitoring. Additionally, major emission sources now require real-time monitoring systems.',
              regulationReference: 'reg-002',
              difficulty: 'intermediate',
              points: 15,
            },
          ],
          passingScore: 75,
          timeLimit: 20,
          attemptsAllowed: 3,
          avatarId: 'environmental-specialist-emma',
        },
        order: 1,
        estimatedTime: 90,
        prerequisites: [],
      },
      {
        id: 'mod-002-2',
        title: 'Spill Prevention and Response',
        description: 'Comprehensive spill management training',
        lessons: [
          {
            id: 'les-002-2-1',
            title: 'Spill Prevention Strategies',
            description: 'Preventing spills before they happen',
            avatarId: 'environmental-specialist-emma',
            contents: [
              {
                id: 'cont-007',
                type: 'avatar-presentation',
                title: 'Prevention First',
                content: 'The importance of spill prevention',
                avatarScript: 'The best spill response is prevention. In this lesson, we\'ll explore the engineering controls, operational procedures, and personal practices that help prevent spills from occurring in the first place.',
                duration: 12,
              },
              {
                id: 'cont-008',
                type: 'scenario',
                title: 'Spill Scenario Exercise',
                content: 'Work through a realistic spill scenario',
                duration: 20,
              },
            ],
            regulationSections: ['reg-005'],
            duration: 40,
            order: 1,
          },
        ],
        quiz: {
          id: 'quiz-002-2',
          title: 'Spill Response Quiz',
          description: 'Test your spill response knowledge',
          questions: [
            {
              id: 'q-006',
              question: 'What is the first action to take when discovering an oil spill?',
              type: 'multiple-choice',
              options: [
                'Start cleaning up immediately',
                'Ensure personal safety and report to supervisor',
                'Take photos for documentation',
                'Notify the media',
              ],
              correctAnswer: 'Ensure personal safety and report to supervisor',
              explanation: 'Safety first, then immediate reporting to activate the spill response plan.',
              avatarExplanation: 'I know it\'s tempting to start cleaning up right away, but your safety must come first! Ensure you\'re in a safe location, then report the spill to your supervisor immediately. This activates our trained response team and ensures proper equipment and procedures are used. Improper cleanup can actually make things worse!',
              regulationReference: 'reg-005',
              difficulty: 'intermediate',
              points: 20,
            },
          ],
          passingScore: 80,
          timeLimit: 15,
          attemptsAllowed: 3,
          avatarId: 'environmental-specialist-emma',
        },
        order: 2,
        estimatedTime: 75,
        prerequisites: ['mod-002-1'],
      },
    ],
    instructorAvatarId: 'environmental-specialist-emma',
    targetAudience: ['Environmental officers', 'Supervisors', 'Operations personnel'],
    learningObjectives: [
      'Implement effective environmental management systems',
      'Understand emissions monitoring and reporting requirements',
      'Master spill prevention and response procedures',
      'Know waste management and disposal regulations',
    ],
    certification: {
      available: true,
      name: 'Environmental Compliance Specialist Certificate',
      validityPeriod: 24,
      accreditedBy: 'C-NLOER Environmental Standards',
      certificateTemplate: 'template-environmental',
    },
    pricing: {
      type: 'one-time',
      basePrice: 449,
      currency: 'CAD',
      discounts: [],
      packages: [],
    },
    tags: ['environmental', 'compliance', 'spill-response', 'intermediate'],
    featured: true,
    publishedAt: '2024-02-01',
    updatedAt: '2024-07-01',
    totalDuration: 240,
    totalLessons: 16,
    enrollmentCount: 1820,
    rating: 4.7,
    reviewCount: 245,
  },
  {
    id: 'course-003',
    title: 'Well Control Certification Preparation',
    slug: 'well-control-certification',
    description: 'Comprehensive preparation for C-NLOER well control certification.',
    longDescription: `This intensive course prepares drilling personnel for C-NLOER well control certification. Covering kick detection, well shut-in procedures, pressure control, and blowout prevention, this course combines theory with practical scenarios. Led by Mike Thompson, a veteran drilling operations supervisor with 25 years of experience.`,
    imageUrl: '/courses/well-control.jpg',
    category: 'drilling-operations',
    level: 'advanced',
    modules: [
      {
        id: 'mod-003-1',
        title: 'Well Control Fundamentals',
        description: 'Core well control concepts and principles',
        lessons: [
          {
            id: 'les-003-1-1',
            title: 'Understanding Well Pressure',
            description: 'Pressure dynamics in well operations',
            avatarId: 'drilling-expert-mike',
            contents: [
              {
                id: 'cont-009',
                type: 'avatar-presentation',
                title: 'Pressure Control Basics',
                content: 'Introduction to well pressure management',
                avatarScript: 'Welcome to well control training. I\'m Mike Thompson, and I\'ve spent 25 years on drilling rigs. Understanding pressure is the foundation of well control. Let me explain the relationship between formation pressure, hydrostatic pressure, and how we maintain control of the well.',
                duration: 15,
              },
            ],
            regulationSections: ['reg-003', 'reg-004'],
            duration: 45,
            order: 1,
          },
        ],
        quiz: {
          id: 'quiz-003-1',
          title: 'Well Control Fundamentals Quiz',
          description: 'Test your understanding of well pressure',
          questions: [
            {
              id: 'q-007',
              question: 'What is the primary purpose of the Blowout Preventer (BOP)?',
              type: 'multiple-choice',
              options: [
                'To increase drilling speed',
                'To seal the wellbore and control well pressure',
                'To measure formation pressure',
                'To clean drilling mud',
              ],
              correctAnswer: 'To seal the wellbore and control well pressure',
              explanation: 'The BOP is critical safety equipment designed to seal the wellbore and prevent uncontrolled flow.',
              avatarExplanation: 'The Blowout Preventer is our last line of defense against an uncontrolled well. It can seal around the drill pipe or completely close off the wellbore if needed. Understanding BOP operation is absolutely critical for anyone working in drilling operations. These devices have saved countless lives.',
              regulationReference: 'reg-003',
              difficulty: 'advanced',
              points: 25,
            },
            {
              id: 'q-008',
              question: 'How often must BOP pressure testing be conducted according to C-NLOER requirements?',
              type: 'multiple-choice',
              options: [
                'Daily',
                'Weekly',
                'At specified intervals per the drilling program',
                'Only when a problem is suspected',
              ],
              correctAnswer: 'At specified intervals per the drilling program',
              explanation: 'C-NLOER requires BOP testing at intervals specified in the approved drilling program.',
              avatarExplanation: 'BOP testing frequency is determined by the approved drilling program, which considers the specific conditions of each well. However, the regulations are clear that this testing must be documented and must meet specified pressure thresholds. Never skip or delay a BOP test - this equipment must be reliable when we need it most.',
              regulationReference: 'reg-003',
              difficulty: 'advanced',
              points: 25,
            },
          ],
          passingScore: 85,
          timeLimit: 30,
          attemptsAllowed: 2,
          avatarId: 'drilling-expert-mike',
        },
        order: 1,
        estimatedTime: 120,
        prerequisites: [],
      },
    ],
    instructorAvatarId: 'drilling-expert-mike',
    targetAudience: ['Drilling personnel', 'Well control specialists', 'Toolpushers'],
    learningObjectives: [
      'Master well pressure control principles',
      'Understand kick detection and response',
      'Learn proper well shut-in procedures',
      'Prepare for C-NLOER well control certification exam',
    ],
    certification: {
      available: true,
      name: 'Well Control Competency Certificate',
      validityPeriod: 12,
      accreditedBy: 'C-NLOER Drilling Standards',
      certificateTemplate: 'template-well-control',
    },
    pricing: {
      type: 'one-time',
      basePrice: 799,
      currency: 'CAD',
      discounts: [],
      packages: [],
    },
    tags: ['well-control', 'drilling', 'certification', 'advanced', 'bop'],
    featured: true,
    publishedAt: '2024-01-15',
    updatedAt: '2024-08-01',
    totalDuration: 480,
    totalLessons: 24,
    enrollmentCount: 890,
    rating: 4.9,
    reviewCount: 156,
  },
  {
    id: 'course-004',
    title: 'Emergency Response and Evacuation',
    slug: 'emergency-response-evacuation',
    description: 'Complete training on offshore emergency procedures and evacuation protocols.',
    longDescription: `Learn life-saving emergency response procedures for offshore installations. This course covers fire response, evacuation procedures, muster drills, survival craft operation, and emergency communication. Captain Sarah Mitchell brings decades of offshore installation management experience to guide you through realistic emergency scenarios.`,
    imageUrl: '/courses/emergency-response.jpg',
    category: 'emergency-response',
    level: 'all-levels',
    modules: [
      {
        id: 'mod-004-1',
        title: 'Emergency Preparedness',
        description: 'Being ready for emergencies',
        lessons: [
          {
            id: 'les-004-1-1',
            title: 'Types of Offshore Emergencies',
            description: 'Understanding different emergency scenarios',
            avatarId: 'captain-sarah',
            contents: [
              {
                id: 'cont-010',
                type: 'avatar-presentation',
                title: 'Emergency Overview',
                content: 'Types of emergencies on offshore installations',
                avatarScript: 'I\'m Captain Sarah Mitchell, and as an Offshore Installation Manager, emergency preparedness is my top priority. Every person on this installation needs to know how to respond when an alarm sounds. Let\'s start by understanding the types of emergencies we might face.',
                duration: 10,
              },
            ],
            regulationSections: ['reg-006'],
            duration: 30,
            order: 1,
          },
        ],
        quiz: {
          id: 'quiz-004-1',
          title: 'Emergency Preparedness Quiz',
          description: 'Test your emergency knowledge',
          questions: [
            {
              id: 'q-009',
              question: 'What should you do when you hear the general alarm on an offshore installation?',
              type: 'multiple-choice',
              options: [
                'Continue your work until you get more information',
                'Proceed immediately to your designated muster station',
                'Call the control room for instructions',
                'Go to your cabin to get your belongings',
              ],
              correctAnswer: 'Proceed immediately to your designated muster station',
              explanation: 'When the general alarm sounds, immediate response to your muster station is required.',
              avatarExplanation: 'When that alarm sounds, every second counts. Don\'t wait, don\'t call for instructions, don\'t collect belongings. Go directly to your muster station. This is drilled into us for a reason - in a real emergency, a few seconds delay could mean the difference between getting off the installation safely or not. Know your muster station and the quickest route there.',
              regulationReference: 'reg-006',
              difficulty: 'beginner',
              points: 20,
            },
          ],
          passingScore: 80,
          timeLimit: 15,
          attemptsAllowed: 3,
          avatarId: 'captain-sarah',
        },
        order: 1,
        estimatedTime: 60,
        prerequisites: [],
      },
    ],
    instructorAvatarId: 'captain-sarah',
    targetAudience: ['All offshore personnel', 'New hires', 'Contractors'],
    learningObjectives: [
      'Respond correctly to emergency alarms',
      'Know your muster station and evacuation routes',
      'Understand survival craft operation basics',
      'Communicate effectively during emergencies',
    ],
    certification: {
      available: true,
      name: 'Emergency Response Competency Certificate',
      validityPeriod: 12,
      accreditedBy: 'C-NLOER Safety Standards',
      certificateTemplate: 'template-emergency',
    },
    pricing: {
      type: 'one-time',
      basePrice: 349,
      currency: 'CAD',
      discounts: [],
      packages: [],
    },
    tags: ['emergency', 'evacuation', 'safety', 'all-levels', 'required'],
    featured: false,
    publishedAt: '2024-03-01',
    updatedAt: '2024-06-01',
    totalDuration: 180,
    totalLessons: 10,
    enrollmentCount: 3200,
    rating: 4.8,
    reviewCount: 420,
  },
  {
    id: 'course-005',
    title: 'HUET, BST & Helicopter Safety (OPITO Aligned)',
    slug: 'helicopter-safety-survival',
    description: 'Mandatory helicopter safety training including HUET and BST requirements under SOR/2021-247 Part 13.',
    longDescription: `This course covers the mandatory helicopter safety training required under SOR/2021-247 Part 13 for all personnel traveling to offshore installations. Learn about HUET (Helicopter Underwater Escape Training), BST (Basic Survival Training), Emergency Breathing Systems (EBS), and OPITO certification standards. This theoretical preparation complements the hands-on practical training required at approved training centers. Validity: BST and HUET certificates are valid for 4 years, with EBS refresher every 3 years.`,
    imageUrl: '/courses/helicopter-safety.jpg',
    category: 'helicopter-operations',
    level: 'beginner',
    modules: [
      {
        id: 'mod-005-1',
        title: 'Mandatory Training Requirements',
        description: 'Understanding HUET, BST, and OPITO certification requirements',
        lessons: [
          {
            id: 'les-005-1-1',
            title: 'Training Requirements Under SOR/2021-247',
            description: 'Mandatory certifications for helicopter passengers',
            avatarId: 'captain-sarah',
            contents: [
              {
                id: 'cont-heli-001',
                type: 'avatar-presentation',
                title: 'Mandatory Training Overview',
                content: 'Understanding your certification requirements',
                avatarScript: 'I\'m Captain Sarah Mitchell. Before you can travel by helicopter to any offshore installation in the Canada-Newfoundland offshore area, you must hold valid certifications in BST and HUET. These aren\'t optional - they\'re required by law under SOR/2021-247 Part 13. Let me explain exactly what training you need and how long each certificate remains valid.',
                duration: 8,
              },
              {
                id: 'cont-heli-002',
                type: 'text',
                title: 'Certification Requirements (SOR/2021-247 Part 13)',
                content: `MANDATORY TRAINING FOR ALL HELICOPTER PASSENGERS:

1. BASIC SURVIVAL TRAINING (BST)
   • Validity: 4 years
   • Required Content:
     - Sea survival techniques
     - Life raft boarding and operation
     - Survival at sea procedures
     - Signaling and rescue procedures
     - Helicopter emergency procedures basics

2. HELICOPTER UNDERWATER ESCAPE TRAINING (HUET)
   • Validity: 4 years
   • Required Content:
     - Underwater escape from submerged helicopter simulator
     - Emergency exit procedures (windows and doors)
     - Orientation after water entry
     - Breath-hold techniques
     - Escape route planning

3. EMERGENCY BREATHING SYSTEM (EBS) TRAINING
   • Initial: Included with HUET
   • Refresher: Every 3 years
   • Required Content:
     - EBS device operation
     - Underwater breathing techniques
     - Integration with escape procedures

OPITO RECOGNITION:
C-NLOER recognizes OPITO (Offshore Petroleum Industry Training Organization) approved training:
• BOSIET - Basic Offshore Safety Induction and Emergency Training
• FOET - Further Offshore Emergency Training (refresher)
• T-BOSIET and T-FOET for tropical operations

RECORD KEEPING:
• You must carry valid certificates when traveling offshore
• Operators verify certifications before helicopter boarding
• Expired certificates = NO TRAVEL`,
                duration: 15,
              },
            ],
            regulationSections: ['reg-007', 'reg-009'],
            duration: 25,
            order: 1,
          },
          {
            id: 'les-005-1-2',
            title: 'Pre-Flight Requirements and Survival Suits',
            description: 'What you must do before every helicopter flight',
            avatarId: 'captain-sarah',
            contents: [
              {
                id: 'cont-heli-003',
                type: 'avatar-presentation',
                title: 'Pre-Flight Preparation',
                content: 'Critical preparation before every flight',
                avatarScript: 'Every helicopter flight requires proper preparation. You must wear an approved helicopter transportation suit - what we call a survival suit. You must attend the pre-flight safety briefing. And you must be medically fit to fly. The North Atlantic is unforgiving - these requirements exist because they save lives.',
                duration: 10,
              },
              {
                id: 'cont-heli-004',
                type: 'text',
                title: 'Pre-Flight Requirements',
                content: `BEFORE EVERY HELICOPTER FLIGHT:

SURVIVAL SUIT REQUIREMENTS:
• Must wear approved helicopter transportation suit (survival suit)
• Suit must be properly sized and fitted
• All zippers and seals must be functional
• Suit must be inspected before donning
• Personal locator beacon (PLB) where required

SURVIVAL SUIT INSPECTION CHECKLIST:
□ Check for tears, holes, or damage
□ Verify zipper functions smoothly
□ Check neck and wrist seals
□ Inspect reflective tape condition
□ Verify suit is within service date
□ Check attached hood condition

PRE-FLIGHT SAFETY BRIEFING:
You MUST attend and pay attention to the briefing covering:
• Emergency exits and operation
• Brace position for impact
• Life jacket location and use
• EBS device location and operation
• Emergency flotation system
• Communication with crew

MEDICAL FITNESS:
• Must be medically fit for helicopter travel
• Report any conditions that may affect flight safety
• No alcohol within 8 hours of flight
• Inform crew of any mobility limitations

PROHIBITED ITEMS:
• Loose items that could become projectiles
• Sharp objects
• Hazardous materials not approved for air transport`,
                duration: 15,
              },
            ],
            regulationSections: ['reg-007'],
            duration: 30,
            order: 2,
          },
        ],
        quiz: {
          id: 'quiz-005-1',
          title: 'Training Requirements Quiz',
          description: 'Test your knowledge of mandatory training requirements',
          questions: [
            {
              id: 'q-heli-001',
              question: 'How long is a HUET (Helicopter Underwater Escape Training) certificate valid?',
              type: 'multiple-choice',
              options: [
                '1 year',
                '2 years',
                '3 years',
                '4 years',
              ],
              correctAnswer: '4 years',
              explanation: 'HUET certificates are valid for 4 years under SOR/2021-247.',
              avatarExplanation: 'Your HUET certificate is valid for 4 years from the date of completion. However, remember that EBS refresher training is required every 3 years. Keep track of both expiry dates - you cannot fly offshore with an expired certificate.',
              regulationReference: 'reg-007',
              difficulty: 'beginner',
              points: 10,
            },
            {
              id: 'q-heli-002',
              question: 'How often must Emergency Breathing System (EBS) refresher training be completed?',
              type: 'multiple-choice',
              options: [
                'Every year',
                'Every 2 years',
                'Every 3 years',
                'Every 4 years',
              ],
              correctAnswer: 'Every 3 years',
              explanation: 'EBS refresher training is required every 3 years, even though HUET is valid for 4 years.',
              avatarExplanation: 'This is an important distinction - while your HUET certificate is valid for 4 years, EBS refresher training is required every 3 years. The EBS is a critical piece of equipment that requires regular practice to maintain proficiency. Many training centers combine the EBS refresher with other training.',
              regulationReference: 'reg-007',
              difficulty: 'intermediate',
              points: 15,
            },
            {
              id: 'q-heli-003',
              question: 'What must you always wear when traveling by helicopter to an offshore installation?',
              type: 'multiple-choice',
              options: [
                'Business casual clothing',
                'Approved helicopter transportation suit (survival suit)',
                'Steel-toed boots only',
                'High-visibility vest only',
              ],
              correctAnswer: 'Approved helicopter transportation suit (survival suit)',
              explanation: 'Survival suits are mandatory for all helicopter travel over water to offshore installations.',
              avatarExplanation: 'A survival suit is absolutely mandatory - no exceptions. The North Atlantic water temperature can cause incapacitation within minutes without protection. Your survival suit keeps you alive by providing thermal protection and flotation. Always inspect it before wearing and ensure it fits properly.',
              regulationReference: 'reg-007',
              difficulty: 'beginner',
              points: 10,
            },
            {
              id: 'q-heli-004',
              question: 'What does OPITO stand for?',
              type: 'multiple-choice',
              options: [
                'Offshore Petroleum Industry Training Organization',
                'Oil Platform International Training Office',
                'Offshore Personnel Instructional Training Organization',
                'Oil Production Industry Training Operations',
              ],
              correctAnswer: 'Offshore Petroleum Industry Training Organization',
              explanation: 'OPITO is the Offshore Petroleum Industry Training Organization, which sets international training standards.',
              avatarExplanation: 'OPITO - Offshore Petroleum Industry Training Organization - is the global body that sets standards for offshore safety training. C-NLOER recognizes OPITO-approved training, which means your BOSIET or FOET certificate from an OPITO-approved center is valid for working in our offshore area. This international recognition makes it easier for workers to move between different offshore regions.',
              regulationReference: 'reg-009',
              difficulty: 'beginner',
              points: 10,
            },
            {
              id: 'q-heli-005',
              question: 'Can you travel offshore by helicopter with an expired BST certificate?',
              type: 'true-false',
              correctAnswer: 'false',
              explanation: 'You cannot travel offshore with expired safety certifications. Valid BST is mandatory.',
              avatarExplanation: 'Absolutely not. Operators are required to verify your certifications before you board the helicopter. An expired certificate means no travel - there are no exceptions. Plan ahead and renew your certifications before they expire. Most training centers recommend rebooking at least 2-3 months before expiry.',
              regulationReference: 'reg-007',
              difficulty: 'beginner',
              points: 10,
            },
          ],
          passingScore: 80,
          timeLimit: 15,
          attemptsAllowed: 3,
          avatarId: 'captain-sarah',
        },
        order: 1,
        estimatedTime: 60,
        prerequisites: [],
      },
      {
        id: 'mod-005-2',
        title: 'Helicopter Emergency Procedures',
        description: 'Emergency response during helicopter operations',
        lessons: [
          {
            id: 'les-005-2-1',
            title: 'In-Flight Emergency Procedures',
            description: 'What to do during helicopter emergencies',
            avatarId: 'captain-sarah',
            contents: [
              {
                id: 'cont-heli-005',
                type: 'avatar-presentation',
                title: 'Emergency Response',
                content: 'Responding to in-flight emergencies',
                avatarScript: 'In the unlikely event of a helicopter emergency, your training and preparation will determine your survival. You need to know the brace position, how to operate emergency exits, and how to use your EBS device. Most importantly, you need to remain calm. Let\'s go through each scenario.',
                duration: 10,
              },
              {
                id: 'cont-heli-006',
                type: 'text',
                title: 'Emergency Procedures',
                content: `HELICOPTER EMERGENCY PROCEDURES:

CONTROLLED DITCHING (Anticipated Water Landing):
1. Listen to crew instructions
2. Tighten seatbelt and shoulder harness
3. Assume brace position when instructed
4. Locate nearest exit and backup exit
5. Hand on EBS device, do not deploy yet
6. Wait for helicopter to stabilize after impact
7. Reference point, release, escape

BRACE POSITION:
• Feet flat on floor
• Head down, chin to chest
• Hands protecting head
• Shoulders against seat back

UNDERWATER ESCAPE SEQUENCE (After water entry):
1. REFERENCE - Orient yourself, locate exit
2. RELEASE - Seatbelt and shoulder harness
3. ESCAPE - Push out window/door, swim to surface

USING YOUR EBS:
• DO NOT inflate until you need to breathe underwater
• Bite down on mouthpiece firmly
• Breathe normally through mouth
• Keep eyes open to navigate
• Deploy to give you time to escape

IF HELICOPTER INVERTS:
• Wait for rotation to stop
• Maintain reference point (seat, door frame)
• Use EBS if needed
• Push through exit
• Swim away from helicopter before surfacing

AFTER SURFACING:
• Inflate life jacket if not auto-inflated
• Swim away from helicopter
• Locate life raft if deployed
• Signal for rescue
• Stay with the group`,
                duration: 20,
              },
            ],
            regulationSections: ['reg-007', 'reg-006'],
            duration: 35,
            order: 1,
          },
        ],
        quiz: {
          id: 'quiz-005-2',
          title: 'Emergency Procedures Quiz',
          description: 'Test your knowledge of helicopter emergency procedures',
          questions: [
            {
              id: 'q-heli-006',
              question: 'What is the correct sequence for underwater escape from a helicopter?',
              type: 'multiple-choice',
              options: [
                'Escape, Release, Reference',
                'Release, Reference, Escape',
                'Reference, Release, Escape',
                'Reference, Escape, Release',
              ],
              correctAnswer: 'Reference, Release, Escape',
              explanation: 'The sequence is Reference (orient yourself), Release (seatbelt), Escape (exit the aircraft).',
              avatarExplanation: 'Remember: Reference, Release, Escape. First, you orient yourself by maintaining a reference point like the door frame or your seat. Then you release your seatbelt and harness. Finally, you escape through your exit. This sequence is drilled repeatedly in HUET training because it needs to be automatic.',
              regulationReference: 'reg-007',
              difficulty: 'intermediate',
              points: 20,
            },
            {
              id: 'q-heli-007',
              question: 'When should you deploy and use your Emergency Breathing System (EBS)?',
              type: 'multiple-choice',
              options: [
                'As soon as the helicopter starts to descend',
                'Before water entry',
                'When you need to breathe underwater',
                'After you reach the surface',
              ],
              correctAnswer: 'When you need to breathe underwater',
              explanation: 'The EBS should only be deployed when you need to breathe underwater to complete your escape.',
              avatarExplanation: 'The EBS gives you precious extra time underwater - but only deploy it when you actually need to breathe. Deploying too early wastes the limited air supply. In HUET training, you\'ll practice using the EBS during underwater escapes. Many escapes can be completed on a single breath, but the EBS is there if you need more time.',
              regulationReference: 'reg-007',
              difficulty: 'intermediate',
              points: 15,
            },
            {
              id: 'q-heli-008',
              question: 'After escaping from a submerged helicopter, what should you do immediately after surfacing?',
              type: 'multiple-choice',
              options: [
                'Swim back to check on others inside',
                'Inflate your life jacket and swim away from the helicopter',
                'Wait at the helicopter for rescue',
                'Remove your survival suit',
              ],
              correctAnswer: 'Inflate your life jacket and swim away from the helicopter',
              explanation: 'Inflate your life jacket (if not auto-inflated) and swim away from the helicopter to avoid hazards.',
              avatarExplanation: 'Once you surface, inflate your life jacket if it hasn\'t auto-inflated, and swim away from the helicopter. The helicopter can sink, create suction, or have fuel on the water. Get clear, then look for the life raft and other survivors. Never go back inside a sinking helicopter - trained rescue teams will handle any remaining passengers.',
              regulationReference: 'reg-007',
              difficulty: 'beginner',
              points: 15,
            },
          ],
          passingScore: 80,
          timeLimit: 12,
          attemptsAllowed: 3,
          avatarId: 'captain-sarah',
        },
        order: 2,
        estimatedTime: 45,
        prerequisites: ['mod-005-1'],
      },
      {
        id: 'mod-005-3',
        title: 'Helideck Operations and Safety',
        description: 'Safety around helicopter landing areas',
        lessons: [
          {
            id: 'les-005-3-1',
            title: 'Helideck Safety',
            description: 'Safe behavior around helidecks',
            avatarId: 'captain-sarah',
            contents: [
              {
                id: 'cont-heli-007',
                type: 'avatar-presentation',
                title: 'Helideck Operations',
                content: 'Safety around helicopter landing areas',
                avatarScript: 'The helideck is one of the most dangerous areas on an offshore installation. Helicopter blades, jet blast, and poor visibility from the cockpit create serious hazards. Only authorized personnel should be on the helideck, and everyone must follow strict safety procedures.',
                duration: 8,
              },
              {
                id: 'cont-heli-008',
                type: 'text',
                title: 'Helideck Safety Requirements',
                content: `HELIDECK SAFETY REQUIREMENTS:

HELIDECK CREW REQUIREMENTS:
• Must hold valid Helideck Operations training (OPITO standard)
• Fire-fighting equipment positioned and ready
• Rescue equipment available
• Weather monitoring active
• Radio communication with pilot

PASSENGER SAFETY ON HELIDECK:
• Only approach when directed by helideck crew
• Always approach from the front (pilot's field of view)
• Stay low - main rotor can flex down significantly
• Never walk toward tail rotor - it's nearly invisible when spinning
• Hold onto loose items - rotor wash is powerful
• Follow crew signals exactly
• Wait for crew to open doors

APPROACH ZONES:
• GREEN ZONE: Safe approach area, front of aircraft
• RED ZONE: Danger area, rear of aircraft near tail rotor
• Never walk behind a helicopter with rotors turning

WEATHER LIMITATIONS:
• Helideck operations have specific weather minimums
• Visibility, wind speed, wave height all monitored
• Operations suspended when limits exceeded
• Pilot has final authority on landing decisions

EMERGENCY PROCEDURES ON HELIDECK:
• Know location of fire extinguishers
• Know evacuation routes from helideck
• If fire occurs - evacuate unless trained in response
• Follow helideck crew instructions`,
                duration: 15,
              },
            ],
            regulationSections: ['reg-007'],
            duration: 25,
            order: 1,
          },
        ],
        quiz: {
          id: 'quiz-005-3',
          title: 'Helideck Safety Quiz',
          description: 'Test your knowledge of helideck safety',
          questions: [
            {
              id: 'q-heli-009',
              question: 'From which direction should you approach a helicopter on a helideck?',
              type: 'multiple-choice',
              options: [
                'From the rear',
                'From either side',
                'From the front (where the pilot can see you)',
                'Any direction is safe',
              ],
              correctAnswer: 'From the front (where the pilot can see you)',
              explanation: 'Always approach from the front where the pilot has visibility. Never approach from the rear near the tail rotor.',
              avatarExplanation: 'You must always approach from the front of the helicopter where the pilot can see you. The tail rotor is extremely dangerous - it spins at high speed and is nearly invisible. Even the main rotor can flex down significantly, so stay low. Wait for the helideck crew to direct you before approaching.',
              regulationReference: 'reg-007',
              difficulty: 'beginner',
              points: 15,
            },
            {
              id: 'q-heli-010',
              question: 'Who has final authority on whether a helicopter can land on an offshore helideck?',
              type: 'multiple-choice',
              options: [
                'The Offshore Installation Manager',
                'The Helideck Landing Officer',
                'The Pilot',
                'The Company representative',
              ],
              correctAnswer: 'The Pilot',
              explanation: 'The pilot always has final authority on flight safety decisions, including landing.',
              avatarExplanation: 'The pilot always has final authority on whether to land. They have the best information about aircraft status, weather conditions, and their assessment of the helideck. Even if operations personnel say conditions are acceptable, the pilot can decline to land if they judge it unsafe. This authority is absolute and must be respected.',
              regulationReference: 'reg-007',
              difficulty: 'intermediate',
              points: 15,
            },
          ],
          passingScore: 80,
          timeLimit: 10,
          attemptsAllowed: 3,
          avatarId: 'captain-sarah',
        },
        order: 3,
        estimatedTime: 30,
        prerequisites: ['mod-005-2'],
      },
    ],
    instructorAvatarId: 'captain-sarah',
    targetAudience: ['All helicopter passengers', 'First-time offshore workers', 'Personnel requiring BST/HUET renewal preparation'],
    learningObjectives: [
      'Understand mandatory HUET, BST, and EBS training requirements under SOR/2021-247',
      'Know certification validity periods and renewal requirements',
      'Master pre-flight safety procedures and survival suit requirements',
      'Learn helicopter emergency response procedures including the Reference-Release-Escape sequence',
      'Understand proper EBS device usage',
      'Know helideck safety rules and approach procedures',
    ],
    certification: {
      available: true,
      name: 'Helicopter Safety Awareness Certificate',
      validityPeriod: 48,
      accreditedBy: 'C-NLOER Training Standards - SOR/2021-247 Part 13 Compliant',
      certificateTemplate: 'template-helicopter',
    },
    pricing: {
      type: 'one-time',
      basePrice: 249,
      currency: 'CAD',
      discounts: [],
      packages: [],
    },
    tags: ['helicopter', 'HUET', 'BST', 'OPITO', 'survival', 'EBS', 'beginner', 'mandatory'],
    featured: true,
    publishedAt: '2024-02-15',
    updatedAt: '2025-06-01',
    totalDuration: 150,
    totalLessons: 5,
    enrollmentCount: 2800,
    rating: 4.9,
    reviewCount: 380,
  },
  {
    id: 'course-006',
    title: 'Production Operations Excellence',
    slug: 'production-operations-excellence',
    description: 'Advanced training for production facility operations and process safety.',
    longDescription: `Master the complexities of offshore production operations. This comprehensive course covers process safety management, equipment integrity, production optimization, and regulatory compliance. David Chen shares his expertise in facility management to prepare you for leadership roles in production operations.`,
    imageUrl: '/courses/production-ops.jpg',
    category: 'production-operations',
    level: 'advanced',
    modules: [
      {
        id: 'mod-006-1',
        title: 'Process Safety Management',
        description: 'PSM principles and implementation',
        lessons: [
          {
            id: 'les-006-1-1',
            title: 'Introduction to PSM',
            description: 'Process Safety Management fundamentals',
            avatarId: 'operations-manager-david',
            contents: [
              {
                id: 'cont-012',
                type: 'avatar-presentation',
                title: 'PSM Overview',
                content: 'Understanding Process Safety Management',
                avatarScript: 'Hello, I\'m David Chen. Process Safety Management is the backbone of safe production operations. It\'s not just about following procedures - it\'s about understanding why those procedures exist and how they protect everyone on the installation.',
                duration: 15,
              },
            ],
            regulationSections: ['reg-008'],
            duration: 40,
            order: 1,
          },
        ],
        quiz: {
          id: 'quiz-006-1',
          title: 'PSM Quiz',
          description: 'Test your PSM knowledge',
          questions: [
            {
              id: 'q-011',
              question: 'What is the primary goal of Process Safety Management (PSM)?',
              type: 'multiple-choice',
              options: [
                'Increase production rates',
                'Prevent catastrophic releases of hazardous materials',
                'Reduce maintenance costs',
                'Improve employee satisfaction',
              ],
              correctAnswer: 'Prevent catastrophic releases of hazardous materials',
              explanation: 'PSM focuses on preventing major incidents involving releases of hazardous materials.',
              avatarExplanation: 'While all those options might be positive outcomes, PSM\'s core purpose is preventing catastrophic events. We\'re talking about preventing explosions, fires, and toxic releases that could harm our people and the environment. Everything in our PSM program is designed with this goal in mind.',
              regulationReference: 'reg-008',
              difficulty: 'advanced',
              points: 20,
            },
          ],
          passingScore: 85,
          timeLimit: 25,
          attemptsAllowed: 2,
          avatarId: 'operations-manager-david',
        },
        order: 1,
        estimatedTime: 90,
        prerequisites: [],
      },
    ],
    instructorAvatarId: 'operations-manager-david',
    targetAudience: ['Production operators', 'Process engineers', 'Supervisors'],
    learningObjectives: [
      'Implement effective PSM systems',
      'Manage equipment integrity programs',
      'Optimize production while maintaining safety',
      'Lead process safety initiatives',
    ],
    certification: {
      available: true,
      name: 'Production Operations Specialist Certificate',
      validityPeriod: 24,
      accreditedBy: 'C-NLOER Production Standards',
      certificateTemplate: 'template-production',
    },
    pricing: {
      type: 'one-time',
      basePrice: 599,
      currency: 'CAD',
      discounts: [],
      packages: [],
    },
    tags: ['production', 'psm', 'operations', 'advanced', 'leadership'],
    featured: false,
    publishedAt: '2024-04-01',
    updatedAt: '2024-07-15',
    totalDuration: 360,
    totalLessons: 20,
    enrollmentCount: 650,
    rating: 4.7,
    reviewCount: 98,
  },
];

// Course Bundles
export const courseBundles: CourseBundle[] = [
  {
    id: 'bundle-001',
    name: 'Complete Offshore Safety Package',
    description: 'Everything you need for comprehensive offshore safety training. Includes all fundamental and specialized courses.',
    courses: ['course-001', 'course-004', 'course-005'],
    originalPrice: 897,
    bundlePrice: 699,
    savings: 198,
    imageUrl: '/bundles/complete-safety.jpg',
    featured: true,
  },
  {
    id: 'bundle-002',
    name: 'Drilling Professional Bundle',
    description: 'Complete drilling operations training including well control and safety fundamentals.',
    courses: ['course-001', 'course-003'],
    originalPrice: 1098,
    bundlePrice: 899,
    savings: 199,
    imageUrl: '/bundles/drilling-pro.jpg',
    featured: true,
  },
  {
    id: 'bundle-003',
    name: 'Environmental Excellence Package',
    description: 'Comprehensive environmental compliance training for operators and supervisors.',
    courses: ['course-001', 'course-002'],
    originalPrice: 748,
    bundlePrice: 599,
    savings: 149,
    imageUrl: '/bundles/environmental.jpg',
    featured: false,
  },
  {
    id: 'bundle-004',
    name: 'Full C-NLOER Certification Bundle',
    description: 'All courses for complete C-NLOER compliance. Best value for organizations training multiple roles.',
    courses: ['course-001', 'course-002', 'course-003', 'course-004', 'course-005', 'course-006'],
    originalPrice: 2744,
    bundlePrice: 1999,
    savings: 745,
    imageUrl: '/bundles/full-certification.jpg',
    featured: true,
  },
];

// Pricing Packages
export const pricingPackages: PricingPackage[] = [
  {
    id: 'pkg-individual',
    name: 'Individual Learner',
    description: 'Perfect for individual offshore workers',
    price: 0,
    features: [
      'Pay per course',
      'Lifetime access to purchased courses',
      'Certificate upon completion',
      'Email support',
    ],
  },
  {
    id: 'pkg-professional',
    name: 'Professional',
    description: 'Best for career advancement',
    price: 79,
    duration: 1,
    features: [
      'Access to all courses',
      'Priority certificate processing',
      'Monthly progress reports',
      'Live Q&A sessions',
      'Priority email support',
    ],
    popular: true,
  },
  {
    id: 'pkg-team',
    name: 'Team (5-20 seats)',
    description: 'Perfect for small teams',
    price: 59,
    duration: 1,
    features: [
      'All Professional features',
      'Team progress dashboard',
      'Bulk enrollment',
      'Admin controls',
      'Custom reporting',
      'Dedicated account manager',
    ],
  },
  {
    id: 'pkg-enterprise',
    name: 'Enterprise',
    description: 'For large organizations',
    price: 0,
    features: [
      'All Team features',
      'Unlimited seats',
      'Custom branding',
      'API access',
      'LMS integration',
      'Custom course development',
      'On-site training options',
      '24/7 priority support',
    ],
  },
];

// Get course by ID helper
export const getCourseById = (id: string): Course | undefined => {
  return courses.find(course => course.id === id);
};

// Get avatar by ID helper
export const getAvatarById = (id: string): Avatar | undefined => {
  return avatars.find(avatar => avatar.id === id);
};

// Get courses by category helper
export const getCoursesByCategory = (category: string): Course[] => {
  return courses.filter(course => course.category === category);
};

// Get featured courses helper
export const getFeaturedCourses = (): Course[] => {
  return courses.filter(course => course.featured);
};
