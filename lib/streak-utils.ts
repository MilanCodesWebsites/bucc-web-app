import { differenceInCalendarDays, format, isToday } from 'date-fns';

export interface StreakData {
    lastVisit: string;
    currentStreak: number;
    longestStreak: number;
}

export interface StreakTier {
    name: string;
    icon: string;
    gradient: string;
    minDays: number;
    image: string;
}

const STREAK_TIERS: StreakTier[] = [
    { name: 'Rising', icon: 'trophy', gradient: 'from-blue-400 to-blue-500', minDays: 7, image: '/tier-1.png' },
    { name: 'Consistent', icon: 'trophy', gradient: 'from-blue-500 to-blue-600', minDays: 14, image: '/tier-2.png' },
    { name: 'Elite', icon: 'sparkles', gradient: 'from-blue-600 to-indigo-600', minDays: 30, image: '/tier-4.png' },
    { name: 'Goated', icon: 'sparkles', gradient: 'from-indigo-600 to-purple-600', minDays: 60, image: '/tier-5.png' },
];

const STORAGE_KEY = 'bucc_streak_data';

// get current streak data from localStorage
export function getStreakData(): StreakData {
    if (typeof window === 'undefined') {
        return { lastVisit: '', currentStreak: 0, longestStreak: 0 };
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
        return { lastVisit: '', currentStreak: 0, longestStreak: 0 };
    }

    try {
        return JSON.parse(stored);
    } catch {
        return { lastVisit: '', currentStreak: 0, longestStreak: 0 };
    }
}

// update streak based on current visit - call this on app load
export function updateStreak(): StreakData {
    const currentData = getStreakData();
    const today = format(new Date(), 'yyyy-MM-dd');

    // first visit ever
    if (!currentData.lastVisit) {
        const newData: StreakData = {
            lastVisit: today,
            currentStreak: 1,
            longestStreak: 1,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
        return newData;
    }

    // already visited today, no change
    if (currentData.lastVisit === today) {
        return currentData;
    }

    const lastVisitDate = new Date(currentData.lastVisit);
    const todayDate = new Date(today);
    const daysDifference = differenceInCalendarDays(todayDate, lastVisitDate);

    let newStreak = currentData.currentStreak;

    if (daysDifference === 1) {
        // consecutive day - increment streak
        newStreak = currentData.currentStreak + 1;
    } else if (daysDifference > 1) {
        // missed one or more days - reset streak
        newStreak = 1;
    }

    const newData: StreakData = {
        lastVisit: today,
        currentStreak: newStreak,
        longestStreak: Math.max(newStreak, currentData.longestStreak),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    return newData;
}

// get the tier for a given streak count
export function getStreakTier(streakCount: number): StreakTier | null {
    const achievedTiers = STREAK_TIERS.filter(tier => streakCount >= tier.minDays);
    return achievedTiers.length > 0 ? achievedTiers[achievedTiers.length - 1] : null;
}

// get the next tier to achieve
export function getNextTier(streakCount: number): StreakTier | null {
    const nextTier = STREAK_TIERS.find(tier => streakCount < tier.minDays);
    return nextTier || null;
}

// reset streak (for testing)
export function resetStreak(): StreakData {
    const resetData: StreakData = {
        lastVisit: '',
        currentStreak: 0,
        longestStreak: 0,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resetData));
    return resetData;
}

// get user name from onboarding data
export function getUserName(): string {
    if (typeof window === 'undefined') return 'there';

    const userData = localStorage.getItem('user_data');
    if (!userData) return 'there';

    try {
        const data = JSON.parse(userData);
        return data.name || 'there';
    } catch {
        return 'there';
    }
}
