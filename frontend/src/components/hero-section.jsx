import React, { useState } from 'react'
import { Mail, SendHorizonal, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TextEffect } from '@/components/ui/text-effect'
import { AnimatedGroup } from '@/components/ui/animated-group'
import { HeroHeader } from './header'
import { saveEmail } from '@/lib/firebase'

const transitionVariants = {
    item: {
        hidden: {
            opacity: 0,
            filter: 'blur(12px)',
            y: 12,
        },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: {
                type: 'spring',
                bounce: 0.3,
                duration: 1.5,
            },
        },
    },
}

export default function HeroSection() {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;
        
        setIsSubmitting(true);
        const result = await saveEmail(email);
        
        if (result.success) {
            setSubmitStatus('success');
            setEmail('');
            setTimeout(() => setSubmitStatus(null), 5000);
        } else {
            setSubmitStatus('error');
            setTimeout(() => setSubmitStatus(null), 5000);
        }
        setIsSubmitting(false);
    };

    return (
        <>
            <HeroHeader />
            <main
                className="overflow-hidden [--color-primary-foreground:var(--color-white)] [--color-primary:var(--color-green-600)]">
                <section id="home">
                    <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-32 lg:pt-48">
                        <div className="relative z-10 mx-auto max-w-6xl text-center">
                            <TextEffect
                                preset="fade-in-blur"
                                speedSegment={0.3}
                                as="h1"
                                className="text-balance text-5xl font-medium md:text-6xl">
                                AI-Powered Investment Guidance
                            </TextEffect>
                            <TextEffect
                                per="line"
                                preset="fade-in-blur"
                                speedSegment={0.3}
                                delay={0.5}
                                as="p"
                                className="mx-auto mt-10 max-w-2xl text-pretty text-lg">
                                Transform your investment journey with Sunio. Get personalized AI guidance, practice with mock trading, and build your portfolio step-by-step with confidence.
                            </TextEffect>

                            <AnimatedGroup
                                variants={{
                                    container: {
                                        visible: {
                                            transition: {
                                                staggerChildren: 0.05,
                                                delayChildren: 0.75,
                                            },
                                        },
                                    },
                                    ...transitionVariants,
                                }}
                                className="mt-12">
                                {submitStatus === 'success' ? (
                                    <div className="mx-auto max-w-sm rounded-lg border border-green-500/50 bg-green-500/10 p-4 text-green-600 dark:text-green-400">
                                        <div className="flex items-center gap-2 justify-center">
                                            <CheckCircle2 className="size-5" />
                                            <p className="font-medium">Thank you! We'll be in touch soon.</p>
                                        </div>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="mx-auto max-w-sm">
                                        <div
                                            className="bg-background has-[input:focus]:ring-muted relative grid grid-cols-[1fr_auto] items-center rounded-[calc(var(--radius)+0.5rem)] border pr-2 shadow shadow-zinc-950/5 has-[input:focus]:ring-2">
                                            <Mail className="pointer-events-none absolute inset-y-0 left-4 my-auto size-4" />

                                            <input
                                                placeholder="Your email address"
                                                className="h-12 w-full bg-transparent pl-12 focus:outline-none"
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                disabled={isSubmitting} />

                                            <div className="md:pr-1.5 lg:pr-0">
                                                <Button 
                                                    type="submit" 
                                                    aria-label="submit" 
                                                    size="sm" 
                                                    className="rounded-(--radius)"
                                                    disabled={isSubmitting}>
                                                    <span className="hidden md:block">{isSubmitting ? 'Submitting...' : 'Get Started'}</span>
                                                    <SendHorizonal className="relative mx-auto size-5 md:hidden" strokeWidth={2} />
                                                </Button>
                                            </div>
                                        </div>
                                        {submitStatus === 'error' && (
                                            <p className="mt-2 text-sm text-red-500">Something went wrong. Please try again.</p>
                                        )}
                                    </form>
                                )}

                                <div
                                    aria-hidden
                                    className="bg-radial from-primary/50 dark:from-primary/25 relative mx-auto mt-32 max-w-2xl to-transparent to-55% text-left">
                                    <div
                                        className="bg-background border-border/50 absolute inset-0 mx-auto w-80 -translate-x-3 -translate-y-12 rounded-[2rem] border p-2 [mask-image:linear-gradient(to_bottom,#000_50%,transparent_90%)] sm:-translate-x-6">
                                        <div
                                            className="relative h-96 overflow-hidden rounded-[1.5rem] border p-2 pb-12 before:absolute before:inset-0 before:bg-[repeating-linear-gradient(-45deg,var(--color-border),var(--color-border)_1px,transparent_1px,transparent_6px)] before:opacity-50"></div>
                                    </div>
                                    <div
                                        className="bg-muted dark:bg-background/50 border-border/50 mx-auto w-80 translate-x-4 rounded-[2rem] border p-2 backdrop-blur-3xl [mask-image:linear-gradient(to_bottom,#000_50%,transparent_90%)] sm:translate-x-8">
                                        <div
                                            className="bg-background space-y-2 overflow-hidden rounded-[1.5rem] border p-2 shadow-xl dark:bg-white/5 dark:shadow-black dark:backdrop-blur-3xl">
                                            <AppComponent />

                                            <div className="bg-muted rounded-[1rem] p-4 pb-16 dark:bg-white/5"></div>
                                        </div>
                                    </div>
                                    <div
                                        className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] mix-blend-overlay [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:opacity-5"></div>
                                </div>
                            </AnimatedGroup>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

const AppComponent = () => {
    return (
        <div className="relative space-y-3 rounded-[1rem] bg-white/5 p-4">
            <div className="flex items-center gap-1.5 text-green-400">
                <svg
                    className="size-5"
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2">
                    <line x1="12" y1="1" x2="12" y2="23"></line>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
                <div className="text-sm font-medium">Portfolio Growth</div>
            </div>
            <div className="space-y-3">
                <div
                    className="text-foreground border-b border-white/10 pb-3 text-sm font-medium">Your portfolio is growing steadily with AI-guided decisions.</div>
                <div className="space-y-3">
                    <div className="space-y-1">
                        <div className="space-x-1">
                            <span className="text-foreground align-baseline text-xl font-medium">₹1,24,500</span>
                            <span className="text-muted-foreground text-xs">Portfolio Value</span>
                        </div>
                        <div
                            className="flex h-5 items-center rounded bg-gradient-to-l from-emerald-400 to-green-600 px-2 text-xs text-white">Current</div>
                    </div>
                    <div className="space-y-1">
                        <div className="space-x-1">
                            <span className="text-foreground align-baseline text-xl font-medium">₹1,00,000</span>
                            <span className="text-muted-foreground text-xs">Initial Investment</span>
                        </div>
                        <div
                            className="text-foreground bg-muted flex h-5 w-4/5 items-center rounded px-2 text-xs dark:bg-white/20">Start</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
