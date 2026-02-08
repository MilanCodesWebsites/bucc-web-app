'use client';

import Link from 'next/link';
import { BottomNav } from '@/components/bottom-nav';
import { materials } from '@/lib/dummy-data';
import { Badge } from '@/components/ui/badge';
import {
    ChevronLeftIcon,
    BookOpenIcon,
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

function getBadgeColor(type: string) {
    switch (type) {
        case 'PDF Guide':
            return 'bg-red-50 text-red-600';
        case 'Video Tutorial':
            return 'bg-purple-50 text-purple-600';
        case 'Article':
            return 'bg-blue-50 text-blue-600';
        case 'Template':
            return 'bg-green-50 text-green-600';
        case 'Checklist':
            return 'bg-yellow-50 text-yellow-600';
        case 'Slides':
            return 'bg-orange-50 text-orange-600';
        default:
            return 'bg-gray-50 text-gray-600';
    }
}

export default function ResourcesPage() {
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
                            <BookOpenIcon className="size-6 text-blue-600" />
                            <h1 className="text-xl font-bold text-gray-900">Learning Materials</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6">
                <p className="text-gray-500 text-sm mb-6">
                    Curated resources to help you learn and grow as a developer.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {materials.map((material) => {
                        const IconComponent = getMaterialIcon(material.type);
                        return (
                            <div
                                key={material.id}
                                className="bg-white/70 backdrop-blur-sm border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-200 group"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                                        <IconComponent className="size-6 text-blue-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                                            {material.title}
                                        </h3>
                                        <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                                            {material.description}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${getBadgeColor(material.type)}`}>
                                                {material.type}
                                            </span>
                                            <button className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
                                                {material.type === 'Video Tutorial' ? (
                                                    <>
                                                        <EyeIcon className="size-4" />
                                                        Watch
                                                    </>
                                                ) : material.type === 'Article' ? (
                                                    <>
                                                        <EyeIcon className="size-4" />
                                                        Read
                                                    </>
                                                ) : (
                                                    <>
                                                        <ArrowDownTrayIcon className="size-4" />
                                                        Download
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <BottomNav />
        </div>
    );
}
