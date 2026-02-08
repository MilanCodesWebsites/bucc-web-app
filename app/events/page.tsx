'use client';

import Link from 'next/link';
import { BottomNav } from '@/components/bottom-nav';
import { events } from '@/lib/dummy-data';
import { Badge } from '@/components/ui/badge';
import {
    ChevronLeftIcon,
    CalendarDaysIcon,
    ClockIcon,
    MapPinIcon,
} from '@heroicons/react/24/outline';

export default function EventsPage() {
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
                            <CalendarDaysIcon className="size-6 text-blue-600" />
                            <h1 className="text-xl font-bold text-gray-900">Upcoming Events</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6">
                <p className="text-gray-500 text-sm mb-6">
                    Don't miss out on these exciting events and activities.
                </p>

                <div className="space-y-4">
                    {events.map((event) => (
                        <Link
                            key={event.id}
                            href={`/events/${event.id}`}
                            className="block bg-white/70 backdrop-blur-sm border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-200 group"
                        >
                            <div className="relative h-40 overflow-hidden">
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                {event.isOnline && (
                                    <Badge variant="secondary" className="absolute top-3 right-3 text-xs">
                                        🌐 Online
                                    </Badge>
                                )}
                            </div>
                            <div className="p-4">
                                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
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
                                    <span>{event.location}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <BottomNav />
        </div>
    );
}
