// User and Authentication
export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  department: string
  avatar?: string
  phone?: string
  createdAt: string
  lastLogin?: string
}

export type UserRole =
  | 'admin'
  | 'hse_manager'
  | 'electrical_engineer'
  | 'mechanical_engineer'
  | 'production_engineer'
  | 'operations_supervisor'
  | 'area_authority'
  | 'maintenance_supervisor'
  | 'contractor'
  | 'inspector'
  | 'employee'
  | 'executive_readonly'

// PTW (Permit to Work)
export type PTWType =
  | 'electrical'
  | 'hot_work'
  | 'cold_work'
  | 'confined_space'
  | 'excavation'
  | 'lifting'
  | 'working_at_height'
  | 'radiography'
  | 'pressure_testing'
  | 'chemical_handling'

export interface PTW {
  id: string
  permitNumber: string
  type: PTWType
  department: string
  location: string
  area: string
  equipment: string
  description: string
  startDate: string
  endDate: string
  responsibleEngineer: string
  supervisor: string
  contractor?: string
  priority: 'low' | 'medium' | 'high' | 'critical'
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected' | 'closed' | 'expired' | 'suspended'
  hazards: Hazard[]
  isolation: IsolationData
  signatures: Signature[]
  attachments: Attachment[]
  createdAt: string
  updatedAt: string
}

export interface Hazard {
  id: string
  description: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  likelihood: 'rare' | 'unlikely' | 'possible' | 'likely' | 'almost_certain'
  riskScore: number
  controlMeasures: string[]
  residualRisk: string
}

export interface IsolationData {
  electrical?: {
    isolated: boolean
    certificateId?: string
    verifiedBy?: string
    timestamp?: string
  }
  mechanical?: {
    isolated: boolean
    details?: string
  }
  process?: {
    isolated: boolean
    details?: string
  }
  lotoRequired: boolean
}

export interface Signature {
  role: string
  signedBy: string
  timestamp: string
  gps?: {
    latitude: number
    longitude: number
  }
  photoUrl?: string
}

// Attachments
export interface Attachment {
  id: string
  name: string
  type: 'photo' | 'document' | 'video' | 'drawing'
  url: string
  size: number
  uploadedAt: string
  uploadedBy: string
}

// Risk Assessment
export interface RiskAssessment {
  id: string
  taskDescription: string
  hazards: string[]
  personsAtRisk: string[]
  existingControls: string[]
  likelihood: string
  severity: string
  riskRating: string
  additionalControls: string[]
  residualRisk: string
  approvedBy?: string
  status: 'draft' | 'submitted' | 'approved' | 'rejected'
  attachments: Attachment[]
  createdAt: string
}

// Near Miss
export interface NearMiss {
  id: string
  reportNumber: string
  date: string
  location: string
  department: string
  category: string
  description: string
  immediateAction: string
  rootCause: string
  recommendedAction: string
  assignedTo: string
  targetDate: string
  status: 'open' | 'in_progress' | 'closed'
  priority: 'low' | 'medium' | 'high' | 'critical'
  attachments: Attachment[]
  createdAt: string
  createdBy: string
}

// Incident
export interface Incident {
  id: string
  incidentNumber: string
  type: IncidentType
  date: string
  time: string
  location: string
  peopleInvolved: string[]
  witnesses: string[]
  description: string
  immediateResponse: string
  investigation?: string
  rootCause?: string
  correctiveAction?: string
  lessonsLearned?: string
  status: 'open' | 'investigating' | 'closed'
  severity: 'minor' | 'major' | 'critical'
  attachments: Attachment[]
  createdAt: string
}

export type IncidentType =
  | 'first_aid'
  | 'medical_treatment'
  | 'restricted_work'
  | 'lost_time_injury'
  | 'environmental'
  | 'vehicle'
  | 'fire'
  | 'explosion'
  | 'electrical'
  | 'equipment_damage'

// Inspection
export interface Inspection {
  id: string
  inspectionNumber: string
  type: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annual'
  location: string
  date: string
  inspector: string
  checklist: ChecklistItem[]
  score: number
  status: 'open' | 'completed' | 'pending_action'
  actions: Action[]
  photos: Attachment[]
  createdAt: string
}

export interface ChecklistItem {
  id: string
  category: string
  item: string
  status: 'pass' | 'fail' | 'na'
  notes?: string
  photoUrl?: string
}

// Actions
export interface Action {
  id: string
  description: string
  priority: 'low' | 'medium' | 'high' | 'critical'
  assignedTo: string
  dueDate: string
  status: 'open' | 'in_progress' | 'completed' | 'overdue'
  progress: number
  comments: string[]
  attachments: Attachment[]
  createdAt: string
}

// LOTO (Lockout/Tagout)
export interface LOTO {
  id: string
  equipment: string
  isolationPoint: string
  padlockNumber: string
  tagNumber: string
  responsiblePerson: string
  verifiedBy?: string
  releaseBy?: string
  photoUrl?: string
  signature?: Signature
  status: 'active' | 'released'
  createdAt: string
  releasedAt?: string
}

// Electrical Isolation
export interface ElectricalIsolation {
  id: string
  equipmentId: string
  singleLineDiagram?: string
  breaker: {
    number: string
    status: 'open' | 'closed'
  }
  earthSwitch?: {
    status: 'open' | 'closed'
  }
  voltageVerification: {
    verified: boolean
    timestamp?: string
    verifiedBy?: string
  }
  ptwId?: string
  status: 'active' | 'released'
  createdAt: string
}

// Gas Testing
export interface GasTest {
  id: string
  date: string
  time: string
  location: string
  detector: {
    calibrationStatus: string
    lastCalibration: string
  }
  readings: {
    oxygen: number
    lel: number
    h2s: number
    co: number
  }
  testerName: string
  expiryTime: string
  signature?: Signature
  status: 'safe' | 'unsafe' | 'pending_repeat'
  createdAt: string
}

// Document
export interface Document {
  id: string
  name: string
  category: 'standard' | 'procedure' | 'emergency_plan' | 'manual' | 'method_statement' | 'drawing'
  type: string
  url: string
  version?: string
  uploadedBy: string
  uploadedAt: string
  size: number
  offlineAvailable: boolean
}

// Notification
export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: 'approval_required' | 'ptw_expiring' | 'overdue_action' | 'incident' | 'near_miss' | 'inspection_due' | 'training_due'
  referenceId?: string
  referenceType?: string
  read: boolean
  createdAt: string
}

// Analytics
export interface SafetyKPI {
  safeDays: number
  totalPTW: number
  openPTW: number
  closedPTW: number
  highRiskJobs: number
  nearMissReports: number
  incidents: number
  inspections: number
  correctiveActions: number
  toolboxTalks: number
  trainingCompliance: number
  trir: number
  ltif: number
  nearMissFrequency: number
}

export interface AnalyticsData {
  monthlyPTW: Array<{ month: string; count: number }>
  ptwByType: Array<{ type: string; count: number }>
  incidentTrend: Array<{ month: string; count: number }>
  nearMissTrend: Array<{ month: string; count: number }>
  departmentPerformance: Array<{ department: string; score: number }>
  contractorPerformance: Array<{ contractor: string; score: number }>
  lostTimeInjuryTrend: Array<{ month: string; count: number }>
}
