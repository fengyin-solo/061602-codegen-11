export type GrowthStage = 'egg' | 'chick' | 'juvenile' | 'subadult' | 'adult'

export type Weather = 'sunny' | 'rainy' | 'snowy' | 'stormy'

export type Personality = 'bold' | 'shy' | 'gentle' | 'curious' | 'stubborn'

export type BerryType = 'red' | 'blue' | 'golden'

export type GamePhase = 'start' | 'playing' | 'breeding' | 'ended'

export type ExpeditionArea = 'forest' | 'meadow' | 'riverside' | 'mountain'

export type ExpeditionStatus = 'idle' | 'exploring' | 'returning'

export type ExpeditionEventType = 'find' | 'clue' | 'danger' | 'encounter' | 'weather'

export interface ExpeditionEvent {
  id: string
  type: ExpeditionEventType
  title: string
  description: string
  emoji: string
  hungerDelta: number
  fearDelta: number
  healthDelta: number
  foodReward: number
  clueReward?: string
  weight: number
}

export interface ExpeditionState {
  status: ExpeditionStatus
  area: ExpeditionArea
  startTime: number
  duration: number
  returnTime: number
  progress: number
  currentEvent?: ExpeditionEvent
  history: ExpeditionRecord[]
}

export interface ExpeditionRecord {
  id: string
  birdId: string
  birdName: string
  area: ExpeditionArea
  startTime: number
  endTime: number
  duration: number
  events: ExpeditionEvent[]
  totalFoodGained: number
  totalCluesFound: string[]
  hungerDelta: number
  fearDelta: number
  healthDelta: number
  success: boolean
}

export interface Bird {
  id: string
  name: string
  stage: GrowthStage
  stageProgress: number
  hunger: number
  fear: number
  health: number
  personality: Personality
  hatchDuration: number
  hatchTimeLeft: number
  isAway: boolean
  isSick: boolean
  isDead: boolean
  feedingCount: number
  lastFedAt: number
  awayUntil?: number
  sickUntil?: number
  justHatched?: boolean
  justGrew?: boolean
  justFed?: boolean
  expedition?: ExpeditionState
}

export interface Berry {
  id: string
  x: number
  y: number
  value: number
  type: BerryType
  spawnedAt: number
}

export interface GameState {
  phase: GamePhase
  day: number
  dayProgress: number
  currentWeather: Weather
  nextWeatherChangeAt: number
  foodStock: number
  birds: Bird[]
  berries: Berry[]
  totalHatched: number
  totalDied: number
  breedingCount: number
  maxBreedingRounds: number
  eventLog: { id: string; message: string; type: string; timestamp: number }[]
  expeditionRecords: ExpeditionRecord[]
  collectedClues: string[]
  score?: GameScore
  selectedBirdId?: string
}

export interface GameScore {
  totalScore: number
  survivalRate: number
  avgHealth: number
  breedingBonus: number
  personalityBonus: number
  stars: number
  rank: string
}

export interface WeatherEffect {
  hungerMod: number
  fearMod: number
  healthMod: number
  awayChance?: number
  sickChance?: number
}
