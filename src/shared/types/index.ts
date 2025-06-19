import { DocumentData, DocumentReference, Timestamp } from "firebase/firestore"
export * from "./chart.types"

export interface Coords {
  x: number
  y: number
}

export interface StatsData {
  [date: string]: number[]
}

export interface SkukaSession {
  duration: Minute
  timestamp: DateString
  user?: string | DocumentReference<DocumentData>
  userId: string
}

export type FirestoreRefPath = Brand<string, "FirestoreRefPath">

export interface DayData {
  timestamp: Millisecond
  sessions: SkukaSession[]
  userId: string
  statsRef?: FirestoreRefPath
  /** @description for old data */
  totalDuration: Minute
  /** @deprecated */
  count: number
}

export interface ServerDayData {
  timestamp: Timestamp
  sessions: SkukaSession[]
  userId: string
  statsRef: DocumentReference<DocumentData>
  /** @deprecated */
  totalDuration: Minute
  /** @deprecated */
  count: number
}

export interface MockDayData {
  timestamp: Millisecond
  /** @deprecated */
  totalDuration: Minute
}

export type Brand<
  Base,
  Branding,
  ReservedName extends string = "__type__"
> = Base & { [K in ReservedName]: Branding } & { __witness__: Base }

export type Maybe<T> = T | null

export type Millisecond = Brand<number, "Milisecond">
export type Second = Brand<number, "Second">
export type Minute = Brand<number, "Minute">
export type Hour = Brand<number, "Hour">

export type DateString = Brand<string, "DateString">

interface BasicUserStatsData {
  maxStreak: number
  count: number
  totalDuration: Minute
  userId: Maybe<string>
  averageDuration: Maybe<Minute>
  updatedAt: Maybe<Millisecond>
  displayName?: Maybe<string>
}

export interface UserStatsData extends BasicUserStatsData {
  firstSessionDate: Millisecond
  averageCount: Maybe<number>
  streak: Maybe<number>
}

export interface ServerUserStatsData extends BasicUserStatsData {
  firstSessionDate: Timestamp
}

export enum RequestStatus {
  NONE,
  REQUEST,
  SUCCESS,
  FAILURE
}

export interface PseudoDayData {
  timestamp: Millisecond
  sessions: SkukaSession[]
  userId: string
  /** @deprecated */
  totalDuration: number
  /** @deprecated */
  count: number
}

export interface PseudoServerDayData {
  timestamp: Timestamp
  totalDuration: number
  count: number
  sessions: SkukaSession[]
  userId: string
}
