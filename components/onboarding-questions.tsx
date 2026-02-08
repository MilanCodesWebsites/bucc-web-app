'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import confetti from 'canvas-confetti';
import { ChevronLeftIcon, CheckIcon } from '@heroicons/react/24/solid';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {
    AcademicCapIcon,
    ComputerDesktopIcon,
    CodeBracketIcon,
    ServerIcon,
    ShieldCheckIcon,
    UserGroupIcon,
    ChatBubbleLeftRightIcon,
    DevicePhoneMobileIcon,
    MegaphoneIcon,
    SparklesIcon,
    UserIcon,
    CakeIcon,
    QuestionMarkCircleIcon,
    CameraIcon
} from '@heroicons/react/24/outline';



const OnboardingSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    profilePicture: z.string().optional(),
    level: z.string().min(1, { message: "Please select a level" }),
    department: z.string().min(1, { message: "Please select a department" }),
    dob: z.string().refine((val) => {
        const date = new Date(val);
        const now = new Date();
        const age = now.getFullYear() - date.getFullYear();
        return age >= 15;
    }, { message: "You must be at least 15 years old" }),
    referral: z.string().min(1, { message: "Please select how you found us" }),
});

type OnboardingData = z.infer<typeof OnboardingSchema>;



const LEVELS = ["100 Level", "200 Level", "300 Level", "400 Level", "500 Level", "Spillover/Grad"];

const DEPARTMENTS = [
    { id: 'se', name: 'Software Engineering', icon: CodeBracketIcon },
    { id: 'cs', name: 'Computer Science', icon: ComputerDesktopIcon },
    { id: 'it', name: 'Information Technology', icon: ServerIcon },
    { id: 'cis', name: 'CIS', label: 'Comp. Info. Systems', icon: AcademicCapIcon },
    { id: 'cyber', name: 'Cyber Security', icon: ShieldCheckIcon },
];

const REFERRALS = [
    { id: 'friend', name: 'Friend told me', icon: UserGroupIcon },
    { id: 'social', name: 'Social media', icon: DevicePhoneMobileIcon },
    { id: 'whatsapp', name: 'WhatsApp group', icon: ChatBubbleLeftRightIcon },
    { id: 'announcement', name: 'Class announcement', icon: MegaphoneIcon },
    { id: 'vibing', name: 'Just vibing', icon: SparklesIcon },
];



export function OnboardingQuestions({ onComplete }: { onComplete: () => void }) {
    const [step, setStep] = useState(0);
    const totalSteps = 6;
    const [direction, setDirection] = useState(0);
    const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);

    const {
        register,
        trigger,
        setValue,
        watch,
        formState: { errors, isValid },
        handleSubmit
    } = useForm<OnboardingData>({
        resolver: zodResolver(OnboardingSchema),
        mode: 'onChange'
    });

    const formData = watch();

    const handleNext = async () => {
        let stepValid = false;

        if (step === 0) stepValid = await trigger('name');
        if (step === 1) stepValid = await trigger('level');
        if (step === 2) stepValid = await trigger('department');
        if (step === 3) stepValid = await trigger('dob');
        if (step === 4) stepValid = await trigger('referral');
        if (step === 5) stepValid = true;

        if (stepValid) {
            if (step < totalSteps - 1) {
                setDirection(1);
                setStep(step + 1);
            } else {
                completeOnboarding();
            }
        }
    };

    const handleBack = () => {
        if (step > 0) {
            setDirection(-1);
            setStep(step - 1);
        }
    };

    const completeOnboarding = () => {
        localStorage.setItem('onboarding_complete', 'true');
        localStorage.setItem('user_data', JSON.stringify(formData));

        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#2563EB', '#60A5FA', '#93C5FD', '#FFFFFF']
        });

        setStep(totalSteps);
        setTimeout(() => {
            onComplete();
        }, 2500);
    };

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 50 : -50,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 50 : -50,
            opacity: 0
        })
    };


    if (step === totalSteps) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, type: 'spring' }}
                    className="flex flex-col items-center"
                >
                    <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                        <span className="text-4xl">🎉</span>
                    </div>
                    <h1 className="text-3xl font-bold text-black mb-2">You're all set!</h1>
                    <p className="text-gray-500">Let's get you to the good stuff.</p>
                </motion.div>
            </div>
        )
    }

    return (
        <div className="h-screen max-h-screen bg-white flex flex-col w-full max-w-lg mx-auto overflow-hidden">
            <div className="pt-6 px-6 mb-6">
                <div className="flex justify-between items-center text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
                    <span>Step {step + 1} of {totalSteps}</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-blue-600 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${((step + 1) / totalSteps) * 100}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
            </div>

            <div className="flex-1 px-6 relative overflow-y-auto">
                <AnimatePresence custom={direction} mode="wait">
                    <motion.div
                        key={step}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                        className="flex-1 flex flex-col"
                    >
                        {step === 0 && (
                            <div className="flex flex-col gap-6">
                                <div className="flex items-center gap-3">
                                    <UserIcon className="size-7 text-blue-600" />
                                    <h2 className="text-2xl font-bold text-black">What should we call you?</h2>
                                </div>
                                <p className="text-sm text-gray-500 -mt-4">Just your first name works, no pressure!</p>
                                <Input
                                    {...register('name')}
                                    placeholder="Your name"
                                    className="text-lg py-6 rounded-2xl border-gray-200 focus:border-blue-600 focus:ring-blue-600"
                                    autoFocus
                                />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                            </div>
                        )}

                        {step === 1 && (
                            <div className="flex flex-col gap-6">
                                <div className="flex items-center gap-3">
                                    <AcademicCapIcon className="size-7 text-blue-600" />
                                    <h2 className="text-2xl font-bold text-black">What level are you in?</h2>
                                </div>
                                <p className="text-sm text-gray-500 -mt-4">Let us know where you're at in your journey</p>
                                <div className="grid grid-cols-2 gap-3">
                                    {LEVELS.map((level) => (
                                        <button
                                            key={level}
                                            type="button"
                                            onClick={() => setValue('level', level, { shouldValidate: true })}
                                            className={cn(
                                                "p-4 rounded-xl border-2 text-left transition-all duration-200",
                                                formData.level === level
                                                    ? "border-blue-600 bg-blue-50 text-blue-700"
                                                    : "border-gray-100 bg-white hover:border-blue-200 text-black"
                                            )}
                                        >
                                            <span className="font-semibold">{level}</span>
                                        </button>
                                    ))}
                                </div>
                                {errors.level && <p className="text-red-500 text-sm">{errors.level.message}</p>}
                            </div>
                        )}

                        {step === 2 && (
                            <div className="flex flex-col gap-6">
                                <div className="flex items-center gap-3">
                                    <CodeBracketIcon className="size-7 text-blue-600" />
                                    <h2 className="text-2xl font-bold text-black">Which department?</h2>
                                </div>
                                <p className="text-sm text-gray-500 -mt-4">Pick your tech lane - all paths are fire!</p>
                                <div className="grid grid-cols-1 gap-3">
                                    {DEPARTMENTS.map((dept) => (
                                        <button
                                            key={dept.id}
                                            type="button"
                                            onClick={() => setValue('department', dept.id, { shouldValidate: true })}
                                            className={cn(
                                                "p-4 rounded-xl border-2 flex items-center gap-4 transition-all duration-200",
                                                formData.department === dept.id
                                                    ? "border-blue-600 bg-blue-50 text-blue-700"
                                                    : "border-gray-100 bg-white hover:border-blue-200 text-black"
                                            )}
                                        >
                                            <span className="font-semibold text-base">{dept.label || dept.name}</span>
                                        </button>
                                    ))}
                                </div>
                                {errors.department && <p className="text-red-500 text-sm">{errors.department.message}</p>}
                            </div>
                        )}

                        {step === 3 && (
                            <div className="flex flex-col gap-6">
                                <div className="flex items-center gap-3">
                                    <CakeIcon className="size-7 text-blue-600" />
                                    <h2 className="text-2xl font-bold text-black">When's your birthday?</h2>
                                </div>
                                <p className="text-sm text-gray-500 -mt-4">No worries, we won't spam you on your special day</p>
                                <div className="relative">
                                    <Input
                                        type="date"
                                        {...register('dob')}
                                        className="text-lg py-6 rounded-2xl border-gray-200 focus:border-blue-600 focus:ring-blue-600 block w-full"
                                    />
                                </div>
                                {errors.dob && <p className="text-red-500 text-sm">{errors.dob.message}</p>}
                            </div>
                        )}

                        {step === 4 && (
                            <div className="flex flex-col gap-6">
                                <div className="flex items-center gap-3">
                                    <QuestionMarkCircleIcon className="size-7 text-blue-600" />
                                    <h2 className="text-2xl font-bold text-black">How'd you find us?</h2>
                                </div>
                                <p className="text-sm text-gray-500 -mt-4">Just curious how you stumbled on this gem</p>
                                <div className="grid grid-cols-1 gap-3">
                                    {REFERRALS.map((ref) => (
                                        <button
                                            key={ref.id}
                                            type="button"
                                            onClick={() => setValue('referral', ref.id, { shouldValidate: true })}
                                            className={cn(
                                                "p-4 rounded-xl border-2 flex items-center gap-4 transition-all duration-200",
                                                formData.referral === ref.id
                                                    ? "border-blue-600 bg-blue-50 text-blue-700"
                                                    : "border-gray-100 bg-white hover:border-blue-200 text-black"
                                            )}
                                        >
                                            <span className="font-semibold text-base">{ref.name}</span>
                                        </button>
                                    ))}
                                </div>
                                {errors.referral && <p className="text-red-500 text-sm">{errors.referral.message}</p>}
                            </div>
                        )}

                        {step === 5 && (
                            <div className="flex flex-col gap-6">
                                <div className="flex items-center gap-3">
                                    <CameraIcon className="size-7 text-blue-600" />
                                    <h2 className="text-2xl font-bold text-black">Upload your photo</h2>
                                </div>
                                <p className="text-sm text-gray-500 -mt-4">Optional, but it's nice to put a face to the name!</p>
                                <div className="flex flex-col items-center gap-6">
                                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                                        {profileImagePreview ? (
                                            <img src={profileImagePreview} alt="Profile preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <CameraIcon className="size-12 text-gray-400" />
                                        )}
                                    </div>

                                    <label className="cursor-pointer">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    const reader = new FileReader();
                                                    reader.onloadend = () => {
                                                        const result = reader.result as string;
                                                        setProfileImagePreview(result);
                                                        setValue('profilePicture', result);
                                                    };
                                                    reader.readAsDataURL(file);
                                                }
                                            }}
                                        />
                                        <div className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-colors">
                                            {profileImagePreview ? 'Change Photo' : 'Upload Photo'}
                                        </div>
                                    </label>

                                    {profileImagePreview && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setProfileImagePreview(null);
                                                setValue('profilePicture', '');
                                            }}
                                            className="text-sm text-gray-500 hover:text-red-600 transition-colors"
                                        >
                                            Remove photo
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="p-4 bg-white">
                <div className="flex gap-3">
                    <Button
                        onClick={handleBack}
                        disabled={step === 0}
                        variant="ghost"
                        className={cn("h-12 w-12 rounded-full p-0 flex items-center justify-center", step === 0 ? "opacity-0 pointer-events-none" : "")}
                    >
                        <ChevronLeftIcon className="size-6 text-gray-500" />
                    </Button>

                    <Button
                        onClick={handleNext}
                        className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white text-lg rounded-full"
                    >
                        {step === totalSteps - 1 ? 'Finish' : 'Continue'}
                    </Button>
                </div>
            </div>
        </div>
    );
}
