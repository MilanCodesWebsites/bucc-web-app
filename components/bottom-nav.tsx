'use client';

import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    HomeIcon,
    MegaphoneIcon,
    CalendarIcon,
    DocumentTextIcon,
    UserIcon
} from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

const navItems = [
    { id: 'home', label: 'Home', icon: HomeIcon, path: '/dashboard' },
    { id: 'announcements', label: 'Announcements', icon: MegaphoneIcon, path: '/announcements' },
    { id: 'events', label: 'Events', icon: CalendarIcon, path: '/events' },
    { id: 'resources', label: 'Resources', icon: DocumentTextIcon, path: '/resources' },
    { id: 'profile', label: 'Profile', icon: UserIcon, path: '/profile' },
];

export function BottomNav() {
    const pathname = usePathname();
    const router = useRouter();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 pb-safe">
            {/* liquid glass effect container */}
            <div className="mx-4 mb-4 rounded-[2rem] bg-white/70 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/10">
                <div className="flex items-center justify-around px-2 py-3">
                    {navItems.map((item) => {
                        const isActive = pathname === item.path;
                        const Icon = item.icon;
                        const isLongLabel = item.label.length > 8; // "Announcements" is 13 chars

                        return (
                            <button
                                key={item.id}
                                onClick={() => router.push(item.path)}
                                className="relative flex items-center justify-center"
                            >
                                {/* active pill background */}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-blue-600 rounded-full"
                                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                    />
                                )}

                                {/* icon and label container */}
                                <div
                                    className={cn(
                                        "relative flex items-center gap-2 transition-colors duration-200",
                                        isActive ? "text-white px-4 py-2" : "text-gray-500 px-2 py-2"
                                    )}
                                >
                                    <Icon className={cn(
                                        isActive && isLongLabel ? "size-5" : "size-6"
                                    )} />
                                    {isActive && (
                                        <motion.span
                                            initial={{ opacity: 0, width: 0 }}
                                            animate={{ opacity: 1, width: 'auto' }}
                                            exit={{ opacity: 0, width: 0 }}
                                            className={cn(
                                                "font-semibold whitespace-nowrap",
                                                isLongLabel ? "text-xs" : "text-sm"
                                            )}
                                        >
                                            {item.label}
                                        </motion.span>
                                    )}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}
