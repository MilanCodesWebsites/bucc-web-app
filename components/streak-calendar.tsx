'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { startOfWeek, addDays, format, isToday, isBefore, startOfDay } from 'date-fns';
import { cn } from '@/lib/utils';
import { getStreakData, updateStreak } from '@/lib/streak-utils';
import { StreakModal } from './streak-modal';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';

export function StreakCalendar() {
    const [streakData, setStreakData] = useState({ currentStreak: 0, longestStreak: 0, lastVisit: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [weekDays, setWeekDays] = useState<Date[]>([]);

    useEffect(() => {
        const updatedStreak = updateStreak();
        setStreakData(updatedStreak);

        const today = new Date();
        const sunday = startOfWeek(today, { weekStartsOn: 0 });
        const days = Array.from({ length: 7 }, (_, i) => addDays(sunday, i));
        setWeekDays(days);
    }, []);

    const isDayCompleted = (day: Date) => {
        const today = startOfDay(new Date());
        const dayStart = startOfDay(day);

        if (!isBefore(dayStart, today)) return false;

        const dayOfWeek = day.getDay();
        const todayDayOfWeek = new Date().getDay();
        const daysBack = todayDayOfWeek - dayOfWeek;

        return daysBack <= streakData.currentStreak && daysBack > 0;
    };

    const isDayMissed = (day: Date) => {
        const today = startOfDay(new Date());
        const dayStart = startOfDay(day);

        if (!isBefore(dayStart, today)) return false;

        return !isDayCompleted(day);
    };

    return (
        <>
            <motion.button
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
                whileHover={{ scale: 1.005 }}
                whileTap={{ scale: 0.995 }}
            >
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Daily Streak</h3>
                        <p className="text-sm text-gray-500">
                            {streakData.currentStreak === 0
                                ? "Start your streak today!"
                                : `${streakData.currentStreak} day${streakData.currentStreak !== 1 ? 's' : ''} and counting`}
                        </p>
                    </div>
                    <div className="text-sm text-gray-400 font-medium">
                        {format(new Date(), 'MMM yyyy')}
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    {weekDays.map((day, index) => {
                        const isTodayDay = isToday(day);
                        const dayName = format(day, 'EEE');
                        const completed = isDayCompleted(day);
                        const missed = isDayMissed(day);
                        const isFuture = !isBefore(startOfDay(day), startOfDay(new Date())) && !isTodayDay;

                        return (
                            <div
                                key={index}
                                className="flex flex-col items-center gap-2"
                            >
                                <span className={cn(
                                    "text-xs font-medium uppercase",
                                    isTodayDay ? "text-blue-600" : "text-gray-400"
                                )}>
                                    {dayName}
                                </span>

                                <div className={cn(
                                    "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                                    isTodayDay && "bg-blue-600 shadow-lg shadow-blue-200",
                                    completed && !isTodayDay && "bg-blue-100",
                                    missed && "bg-gray-100",
                                    isFuture && "border-2 border-gray-200 bg-white"
                                )}>
                                    {isTodayDay ? (
                                        <CheckIcon className="w-5 h-5 text-white" />
                                    ) : completed ? (
                                        <CheckIcon className="w-5 h-5 text-blue-600" />
                                    ) : missed ? (
                                        <XMarkIcon className="w-4 h-4 text-gray-400" />
                                    ) : (
                                        <span className="w-2 h-2 rounded-full bg-gray-200" />
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </motion.button>

            <StreakModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
}
