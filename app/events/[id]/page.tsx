'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { events } from '@/lib/dummy-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    ChevronLeftIcon,
    CalendarDaysIcon,
    ClockIcon,
    MapPinIcon,
    CheckCircleIcon,
} from '@heroicons/react/24/outline';

export default function EventDetailPage() {
    const params = useParams();
    const eventId = params.id as string;

    const event = events.find(e => e.id === eventId);

    if (!event) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Event Not Found</h1>
                    <p className="text-gray-500 mb-4">The event you're looking for doesn't exist.</p>
                    <Link href="/dashboard" className="text-blue-600 hover:underline">
                        Go back to Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pb-8">
            <div className="relative h-48 sm:h-64 overflow-hidden">
                <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                {event.isOnline && (
                    <Badge variant="secondary" className="absolute top-4 right-4 text-xs">
                        🌐 Online Event
                    </Badge>
                )}
            </div>

            <div className="max-w-2xl mx-auto px-4 sm:px-6 py-4">
                <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                    <ChevronLeftIcon className="size-5" />
                    <span className="text-sm font-medium">Back to Dashboard</span>
                </Link>
            </div>

            <div className="max-w-2xl mx-auto px-4 sm:px-6">
                <div className="bg-white/70 backdrop-blur-sm border border-gray-100 rounded-2xl p-6 shadow-sm mb-4">
                    <div className="mb-4">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            {event.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-2">
                            {event.isOnline ? (
                                <Badge variant="secondary" className="text-xs">
                                    🌐 Online Event
                                </Badge>
                            ) : (
                                <Badge variant="outline" className="text-xs">
                                    📍 In Person
                                </Badge>
                            )}
                        </div>
                    </div>

                    <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-3 text-gray-600">
                            <ClockIcon className="size-5 text-gray-400" />
                            <div>
                                <p className="font-medium">{event.date}</p>
                                <p className="text-sm text-gray-500">{event.time}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600">
                            <MapPinIcon className="size-5 text-gray-400" />
                            <p className="font-medium">{event.location}</p>
                        </div>
                    </div>

                    <Button
                        className="w-full h-12 text-base rounded-xl bg-blue-600 hover:bg-blue-700"
                    >
                        <CheckCircleIcon className="size-5 mr-2" />
                        RSVP for this Event
                    </Button>
                </div>

                <div className="bg-white/70 backdrop-blur-sm border border-gray-100 rounded-2xl p-6 shadow-sm mb-4">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">About this Event</h2>
                    <div className="prose prose-sm prose-gray max-w-none">
                        {event.fullDescription.split('\n').map((paragraph, index) => (
                            <p key={index} className="text-gray-600 text-sm whitespace-pre-wrap mb-2">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>

                {event.agenda && event.agenda.length > 0 && (
                    <div className="bg-white/70 backdrop-blur-sm border border-gray-100 rounded-2xl p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Agenda</h2>
                        <div className="space-y-2">
                            {event.agenda.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                                >
                                    <div
                                        className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold text-white bg-blue-600"
                                    >
                                        {index + 1}
                                    </div>
                                    <span className="text-gray-700 text-sm font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
