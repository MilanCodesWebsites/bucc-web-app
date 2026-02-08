'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BottomNav } from '@/components/bottom-nav';
import { StreakCalendar } from '@/components/streak-calendar';
import { getUserName } from '@/lib/streak-utils';
import { announcements, events, materials, type Announcement } from '@/lib/dummy-data';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import {
    MegaphoneIcon,
    CalendarDaysIcon,
    BookOpenIcon,
    ChevronRightIcon,
    MapPinIcon,
    ClockIcon,
    DocumentTextIcon,
    VideoCameraIcon,
    DocumentIcon,
    DocumentDuplicateIcon,
    ClipboardDocumentCheckIcon,
    PresentationChartBarIcon,
    ArrowDownTrayIcon,
    EyeIcon,
} from '@heroicons/react/24/outline';

function getMaterialIcon(type: string) {
    switch (type) {
        case 'PDF Guide':
            return DocumentTextIcon;
        case 'Video Tutorial':
            return VideoCameraIcon;
        case 'Article':
            return DocumentIcon;
        case 'Template':
            return DocumentDuplicateIcon;
        case 'Checklist':
            return ClipboardDocumentCheckIcon;
        case 'Slides':
            return PresentationChartBarIcon;
        default:
            return DocumentIcon;
    }
}

function getBadgeVariant(badge?: string) {
    switch (badge) {
        case 'New':
            return 'default';
        case 'Important':
            return 'destructive';
        case 'Update':
            return 'secondary';
        default:
            return 'outline';
    }
}

export default function DashboardPage() {
    const router = useRouter();
    const [userName, setUserName] = useState('there');
    const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);

    useEffect(() => {
        setUserName(getUserName());
    }, []);

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pb-28">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
                <div className="mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                        Hey {userName} 👋
                    </h1>
                    <p className="text-base sm:text-lg text-gray-500">
                        Here's what's happening in BUCC
                    </p>
                </div>

                <div className="mb-8">
                    <StreakCalendar />
                </div>

                {/* announcements */}
                <section className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <MegaphoneIcon className="size-5 text-blue-600" />
                            <h2 className="text-lg font-semibold text-gray-900">Announcements</h2>
                        </div>
                        <Link
                            href="/announcements"
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 transition-colors"
                        >
                            View all
                            <ChevronRightIcon className="size-4" />
                        </Link>
                    </div>

                    <div className="space-y-3">
                        {announcements.slice(0, 3).map((announcement) => (
                            <button
                                key={announcement.id}
                                onClick={() => setSelectedAnnouncement(announcement)}
                                className="w-full text-left bg-white/70 backdrop-blur-sm border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-200 group"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                                                {announcement.title}
                                            </h3>
                                            {announcement.badge && (
                                                <Badge variant={getBadgeVariant(announcement.badge)} className="text-xs shrink-0">
                                                    {announcement.badge}
                                                </Badge>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-500 line-clamp-2 mb-2">
                                            {announcement.excerpt}
                                        </p>
                                        <span className="text-xs text-gray-400">
                                            {formatDate(announcement.date)}
                                        </span>
                                    </div>
                                    <ChevronRightIcon className="size-5 text-gray-300 group-hover:text-blue-500 transition-colors shrink-0 mt-1" />
                                </div>
                            </button>
                        ))}
                    </div>
                </section>

                {/* upcoming events */}
                <section className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <CalendarDaysIcon className="size-5 text-blue-600" />
                            <h2 className="text-lg font-semibold text-gray-900">Upcoming Events</h2>
                        </div>
                        <Link
                            href="/events"
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 transition-colors"
                        >
                            View all
                            <ChevronRightIcon className="size-4" />
                        </Link>
                    </div>

                    <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 sm:-mx-6 sm:px-6 scrollbar-hide">
                        {events.slice(0, 4).map((event) => (
                            <Link
                                key={event.id}
                                href={`/events/${event.id}`}
                                className="flex-shrink-0 w-[280px] bg-white/70 backdrop-blur-sm border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200 group"
                            >
                                <div className="relative h-32 overflow-hidden">
                                    <img
                                        src={event.image}
                                        alt={event.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    {event.isOnline && (
                                        <Badge variant="secondary" className="absolute top-2 right-2 text-xs">
                                            🌐 Online
                                        </Badge>
                                    )}
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                                        {event.title}
                                    </h3>
                                    <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-2">
                                        <ClockIcon className="size-4 shrink-0" />
                                        <span>{event.date} • {event.time}</span>
                                    </div>
                                    <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                                        {event.description}
                                    </p>
                                    <div className="flex items-center gap-1 text-xs text-gray-400">
                                        <MapPinIcon className="size-3.5" />
                                        <span className="truncate">{event.location}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* learning materials */}
                <section className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <BookOpenIcon className="size-5 text-blue-600" />
                            <h2 className="text-lg font-semibold text-gray-900">Learning Materials</h2>
                        </div>
                        <Link
                            href="/resources"
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 transition-colors"
                        >
                            Browse all
                            <ChevronRightIcon className="size-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {materials.slice(0, 4).map((material) => {
                            const IconComponent = getMaterialIcon(material.type);
                            return (
                                <div
                                    key={material.id}
                                    className="bg-white/70 backdrop-blur-sm border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-200 group"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                                            <IconComponent className="size-5 text-blue-600" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
                                                {material.title}
                                            </h3>
                                            <p className="text-xs text-gray-500 line-clamp-2 mb-2">
                                                {material.description}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <Badge variant="outline" className="text-xs">
                                                    {material.type}
                                                </Badge>
                                                <button className="text-blue-600 hover:text-blue-700 transition-colors">
                                                    {material.type === 'Video Tutorial' ? (
                                                        <EyeIcon className="size-4" />
                                                    ) : (
                                                        <ArrowDownTrayIcon className="size-4" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            </div>

            <Dialog open={!!selectedAnnouncement} onOpenChange={() => setSelectedAnnouncement(null)}>
                <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
                    {selectedAnnouncement && (
                        <>
                            <DialogHeader>
                                <div className="flex items-center gap-2 mb-1">
                                    {selectedAnnouncement.badge && (
                                        <Badge variant={getBadgeVariant(selectedAnnouncement.badge)} className="text-xs">
                                            {selectedAnnouncement.badge}
                                        </Badge>
                                    )}
                                </div>
                                <DialogTitle className="text-xl">
                                    {selectedAnnouncement.title}
                                </DialogTitle>
                                <DialogDescription className="flex items-center gap-2 text-sm">
                                    <span>{formatDate(selectedAnnouncement.date)}</span>
                                    {selectedAnnouncement.author && (
                                        <>
                                            <span>•</span>
                                            <span>{selectedAnnouncement.author}</span>
                                        </>
                                    )}
                                </DialogDescription>
                            </DialogHeader>
                            <div className="mt-4 prose prose-sm prose-gray max-w-none">
                                {selectedAnnouncement.content.split('\n').map((paragraph, index) => (
                                    <p key={index} className="text-gray-600 text-sm whitespace-pre-wrap">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>

            <BottomNav />
        </div>
    );
}
