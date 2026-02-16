import { PrayerTime } from '../types';

// Mock data to prevent API rate limits and CORS issues in demo environment
// In a real app, this would fetch from http://api.aladhan.com/v1/timings
export const getPrayerTimes = async (lat: number, lng: number): Promise<PrayerTime[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  const now = new Date();
  const hours = now.getHours();
  
  // Dynamic mock based on current time to show "Next" correctly
  const times = [
    { name: 'Fajr', time: '05:12' },
    { name: 'Sunrise', time: '06:45' },
    { name: 'Dhuhr', time: '12:30' },
    { name: 'Asr', time: '15:45' },
    { name: 'Maghrib', time: '18:20' },
    { name: 'Isha', time: '19:50' },
  ];

  let nextFound = false;
  
  return times.map(t => {
    const [h, m] = t.time.split(':').map(Number);
    const timeDate = new Date();
    timeDate.setHours(h, m, 0);

    let isNext = false;
    if (!nextFound && timeDate > now && t.name !== 'Sunrise') {
      isNext = true;
      nextFound = true;
    }

    return { ...t, isNext };
  });
};

export const getHijriDate = () => {
  return "14 Ramadan 1445"; // Static for demo
};
