'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BottomNav } from '@/components/bottom-nav';
import { announcements, type Announcement } from '@/lib/dummy-data';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    MegaphoneIcon,
} from '@heroicons/react/24/outline';

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

export default function AnnouncementsPage() {
    const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pb-28">
            <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg border-b border-gray-100">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 py-4">
                    <div className="flex items-center gap-3">
                        <Link
                            href="/dashboard"
                            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                        >
                            <ChevronLeftIcon className="size-5 text-gray-600" />
                        </Link>
                        <div className="flex items-center gap-2">
                            <MegaphoneIcon className="size-6 text-blue-600" />
                            <h1 className="text-xl font-bold text-gray-900">Announcements</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6">
                <p className="text-gray-500 text-sm mb-6">
                    Stay up to date with the latest news and updates from BUCC.
                </p>

                <div className="space-y-3">
                    {announcements.map((announcement) => (
                        <button
                            key={announcement.id}
                            onClick={() => setSelectedAnnouncement(announcement)}
                            className="w-full text-left bg-white/70 backdrop-blur-sm border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-200 group"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
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
                                    <div className="flex items-center gap-2 text-xs text-gray-400">
                                        <span>{formatDate(announcement.date)}</span>
                                        {announcement.author && (
                                            <>
                                                <span>•</span>
                                                <span>{announcement.author}</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <ChevronRightIcon className="size-5 text-gray-300 group-hover:text-blue-500 transition-colors shrink-0 mt-1" />
                            </div>
                        </button>
                    ))}
                </div>
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
