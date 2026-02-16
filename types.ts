import { ReactNode } from 'react';

export interface NavItem {
  id: string;
  label: string;
  icon: ReactNode;
}

export interface PrayerTime {
  name: string;
  time: string;
  isNext: boolean;
}

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  count: number;
  country: string;
}

export interface GeoLocation {
  latitude: number;
  longitude: number;
}
