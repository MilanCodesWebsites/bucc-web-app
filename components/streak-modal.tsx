'use client';

import { useState, useEffect, useRef } from 'react';
import { Drawer } from 'vaul';
import { motion, AnimatePresence } from 'framer-motion';
import {
    XMarkIcon,
    ShareIcon,
    ArrowDownTrayIcon,
    CheckIcon,
} from '@heroicons/react/24/outline';
import { FireIcon } from '@heroicons/react/24/solid';
import { getStreakData, getStreakTier, getNextTier, getUserName } from '@/lib/streak-utils';
import { toPng } from 'html-to-image';

interface StreakModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function StreakModal({ isOpen, onClose }: StreakModalProps) {
    const [streakData, setStreakData] = useState(getStreakData());
    const [userName, setUserName] = useState('');
    const [isSharing, setIsSharing] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [shareSuccess, setShareSuccess] = useState(false);
    const shareCardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            setStreakData(getStreakData());
            setUserName(getUserName());
            setShowPreview(false);
            setShareSuccess(false);
        }
    }, [isOpen]);

    const currentTier = getStreakTier(streakData.currentStreak);
    const nextTier = getNextTier(streakData.currentStreak);
    const progressPercent = nextTier
        ? Math.min((streakData.currentStreak / nextTier.minDays) * 100, 100)
        : 100;

    // fallback for users without a tier yet
    const displayTier = currentTier || {
        name: 'Starter',
        gradient: 'from-gray-400 to-gray-500',
        image: '/tier-1.png',
        minDays: 0,
        icon: 'trophy'
    };

    const handleShare = async () => {
        if (!shareCardRef.current) return;

        setIsSharing(true);
        try {
            const dataUrl = await toPng(shareCardRef.current, {
                quality: 1,
                pixelRatio: 2,
                backgroundColor: '#ffffff',
            });

            const blob = await (await fetch(dataUrl)).blob();
            const file = new File([blob], 'bucc-streak.png', { type: 'image/png' });

            if (navigator.share && navigator.canShare?.({ files: [file] })) {
                await navigator.share({
                    files: [file],
                    title: 'My BUCC Streak',
                    text: `I'm ${displayTier.name} with a ${streakData.currentStreak} day streak! 🔥`,
                });
                setShareSuccess(true);
            } else {
                const link = document.createElement('a');
                link.download = 'bucc-streak.png';
                link.href = dataUrl;
                link.click();
                setShareSuccess(true);
            }
        } catch (error) {
            console.error('Failed to share:', error);
        } finally {
            setIsSharing(false);
        }
    };

    const getMotivationalMessage = () => {
        if (streakData.currentStreak === 0) return "Start your journey today!";
        if (streakData.currentStreak < 7) return "Building momentum...";
        if (streakData.currentStreak < 14) return "You're on your way up!";
        if (streakData.currentStreak < 30) return "Consistency is your superpower!";
        if (streakData.currentStreak < 60) return "You're in the elite now!";
        return "Absolutely Goated. Legend status.";
    };

    return (
        <>
            <Drawer.Root open={isOpen} onOpenChange={onClose}>
                <Drawer.Portal>
                    <Drawer.Overlay className="fixed inset-0 bg-black/40 z-50" />
                    <Drawer.Content className="bg-white flex flex-col rounded-t-[2rem] h-[90vh] mt-24 fixed bottom-0 left-0 right-0 z-50 outline-none">
                        <Drawer.Title className="sr-only">Your Streak Details</Drawer.Title>

                        <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mt-4 mb-2" />

                        <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900">Your Streak</h2>
                            <button
                                onClick={onClose}
                                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                            >
                                <XMarkIcon className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto px-6 py-4">
                            <AnimatePresence mode="wait">
                                {!showPreview ? (
                                    <motion.div
                                        key="main"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="space-y-6"
                                    >
                                        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-6 text-center relative overflow-hidden border border-blue-100">
                                            <motion.div
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ delay: 0.2, type: 'spring' }}
                                                className="relative z-10 mb-4"
                                            >
                                                <img
                                                    src={displayTier.image}
                                                    alt={displayTier.name}
                                                    className="w-28 h-28 mx-auto object-contain drop-shadow-lg"
                                                />
                                            </motion.div>

                                            <motion.h3
                                                initial={{ y: 10, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 0.3 }}
                                                className="text-2xl font-black text-gray-900 relative z-10 tracking-tight"
                                            >
                                                {displayTier.name}
                                            </motion.h3>

                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: 0.4, type: 'spring' }}
                                                className="relative z-10 mt-3"
                                            >
                                                <div className="flex items-center justify-center gap-2">
                                                    <FireIcon className="w-7 h-7 text-blue-500" />
                                                    <span className="text-5xl font-black text-blue-600">
                                                        {streakData.currentStreak}
                                                    </span>
                                                </div>
                                                <p className="text-gray-500 text-sm mt-1 font-medium">
                                                    {streakData.currentStreak === 1 ? 'Day' : 'Days'} Streak
                                                </p>
                                            </motion.div>
                                        </div>

                                        <div className="text-center">
                                            <p className="text-gray-500 text-sm">
                                                {getMotivationalMessage()}
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 text-center">
                                                <p className="text-3xl font-bold text-blue-600">{streakData.currentStreak}</p>
                                                <p className="text-gray-500 text-xs mt-1">Current</p>
                                            </div>
                                            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 text-center">
                                                <p className="text-3xl font-bold text-blue-600">{streakData.longestStreak}</p>
                                                <p className="text-gray-500 text-xs mt-1">Best Ever</p>
                                            </div>
                                        </div>

                                        {nextTier && (
                                            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4">
                                                <div className="flex items-center justify-between mb-3">
                                                    <div className="flex items-center gap-2">
                                                        <img
                                                            src={nextTier.image}
                                                            alt={nextTier.name}
                                                            className="w-8 h-8 object-contain opacity-60"
                                                        />
                                                        <span className="text-gray-600 text-sm font-medium">Next: {nextTier.name}</span>
                                                    </div>
                                                    <span className="text-gray-400 text-xs">
                                                        {nextTier.minDays - streakData.currentStreak} days to go
                                                    </span>
                                                </div>
                                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                                    <motion.div
                                                        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${progressPercent}%` }}
                                                        transition={{ duration: 1, ease: 'easeOut' }}
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        <button
                                            onClick={() => setShowPreview(true)}
                                            disabled={streakData.currentStreak === 0}
                                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:cursor-not-allowed text-white disabled:text-gray-400 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-200"
                                        >
                                            <ShareIcon className="w-5 h-5" />
                                            Share My Streak
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="preview"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="space-y-6"
                                    >
                                        <div className="flex items-center justify-between">
                                            <button
                                                onClick={() => setShowPreview(false)}
                                                className="text-gray-500 hover:text-gray-900 text-sm font-medium"
                                            >
                                                ← Back
                                            </button>
                                            <p className="text-gray-400 text-sm">Preview</p>
                                        </div>

                                        <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-xl">
                                            <div className="aspect-square bg-white flex items-center justify-center relative">
                                                <ShareCardPreview
                                                    userName={userName}
                                                    streakCount={streakData.currentStreak}
                                                    tierName={displayTier.name}
                                                    tierImage={displayTier.image}
                                                    gradient={displayTier.gradient}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            {shareSuccess ? (
                                                <div className="w-full bg-green-50 border border-green-200 text-green-600 font-bold py-4 rounded-2xl flex items-center justify-center gap-2">
                                                    <CheckIcon className="w-5 h-5" />
                                                    Saved!
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={handleShare}
                                                    disabled={isSharing}
                                                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-200"
                                                >
                                                    {isSharing ? (
                                                        <>
                                                            <motion.div
                                                                animate={{ rotate: 360 }}
                                                                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                                                                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                                            />
                                                            Generating...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <ArrowDownTrayIcon className="w-5 h-5" />
                                                            Download & Share
                                                        </>
                                                    )}
                                                </button>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </Drawer.Content>
                </Drawer.Portal>
            </Drawer.Root>

            {/* hidden card for generating the share image */}
            <div className="fixed -left-[9999px] -top-[9999px]">
                <div
                    ref={shareCardRef}
                    className="w-[1080px] h-[1080px] bg-white relative overflow-hidden"
                    style={{ fontFamily: "'Schibsted Grotesk', system-ui, -apple-system, sans-serif" }}
                >
                    {/* ankara pattern header */}
                    <div className="absolute top-0 left-0 right-0 h-[320px] overflow-hidden">
                        <img
                            src="/ankara.jpg"
                            alt="Ankara Pattern"
                            className="w-full h-full object-cover"
                            style={{
                                maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)',
                                WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)'
                            }}
                        />
                    </div>

                    <div className="relative h-full flex flex-col items-center justify-between py-12 px-10">
                        {/* user info */}
                        <div className="text-center mt-4">
                            <p className="text-4xl font-bold text-gray-900 mb-2">
                                {userName || 'BUCC Member'}
                            </p>
                            <div className={`inline-block bg-gradient-to-r ${displayTier.gradient} px-8 py-3 rounded-full shadow-lg`}>
                                <span className="text-2xl font-black text-white tracking-wide">
                                    {displayTier.name.toUpperCase()}
                                </span>
                            </div>
                        </div>

                        {/* tier badge + streak count */}
                        <div className="flex-1 flex flex-col items-center justify-center -mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 bg-blue-400 blur-3xl opacity-25 scale-150 rounded-full" />
                                <img
                                    src={displayTier.image}
                                    alt={displayTier.name}
                                    className="w-96 h-96 object-contain relative z-10 drop-shadow-2xl"
                                />
                            </div>

                            <div className="-mt-4 text-center">
                                <div className="flex items-center justify-center gap-4">
                                    <FireIcon className="w-24 h-24 text-blue-500" />
                                    <p className="text-[260px] font-black text-gray-900 leading-none tracking-tighter">
                                        {streakData.currentStreak}
                                    </p>
                                </div>
                                <p className="text-4xl font-medium text-gray-400 -mt-6">
                                    Days Streak
                                </p>
                            </div>
                        </div>

                        {/* branding */}
                        <div className="text-center pb-4">
                            <p className="text-xl text-gray-400 mb-3 tracking-wide italic">
                                Consistency looks good on you
                            </p>
                            <div className="flex items-center justify-center gap-2">
                                <span className="text-3xl font-black text-blue-600">BUCC</span>
                                <span className="text-gray-300 text-xl">•</span>
                                <span className="text-lg text-gray-500">Babcock University Computer Club</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

// scaled down preview for the modal
function ShareCardPreview({ userName, streakCount, tierName, tierImage, gradient }: {
    userName: string;
    streakCount: number;
    tierName: string;
    tierImage: string;
    gradient: string;
}) {
    return (
        <div className="w-full h-full bg-white relative overflow-hidden p-4">
            <div className="absolute top-0 left-0 right-0 h-1/4 overflow-hidden">
                <img
                    src="/ankara.jpg"
                    alt="Ankara Pattern"
                    className="w-full h-full object-cover opacity-50"
                    style={{
                        maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 100%)'
                    }}
                />
            </div>

            <div className="relative h-full flex flex-col items-center justify-between py-4">
                <div className="text-center mt-4">
                    <p className="text-sm font-bold text-gray-900">{userName || 'BUCC Member'}</p>
                    <div className={`inline-block bg-gradient-to-r ${gradient} px-3 py-1 rounded-full mt-1 shadow`}>
                        <span className="text-[10px] font-black text-white">{tierName.toUpperCase()}</span>
                    </div>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center">
                    <img src={tierImage} alt={tierName} className="w-16 h-16 object-contain drop-shadow" />
                    <div className="flex items-center gap-1 mt-2">
                        <FireIcon className="w-4 h-4 text-blue-500" />
                        <p className="text-4xl font-black text-gray-900">{streakCount}</p>
                    </div>
                    <p className="text-[10px] text-gray-400">Days Streak</p>
                </div>

                <div className="text-center">
                    <p className="text-[8px] text-gray-400 italic">Consistency looks good on you</p>
                    <p className="text-xs font-bold text-blue-600 mt-1">BUCC</p>
                </div>
            </div>
        </div>
    );
}
