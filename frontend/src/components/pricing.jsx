import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

export default function Pricing() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <section id="pricing" className="py-16 md:py-32">
            <div className="mx-auto max-w-6xl px-6">
                <div className="mx-auto max-w-2xl space-y-6 text-center">
                    <h1 className="text-center text-4xl font-semibold lg:text-5xl">Simple, Transparent Pricing</h1>
                    <p>Choose the plan that works best for your investment journey. Start building your wealth with AI-powered guidance today.</p>
                </div>

                <div className="mt-8 grid gap-6 md:mt-20 md:grid-cols-5 md:gap-0">
                    <div
                        className="rounded-(--radius) flex flex-col justify-between space-y-8 border p-6 md:col-span-2 md:my-2 md:rounded-r-none md:border-r-0 lg:p-10">
                        <div className="space-y-4">
                            <div>
                                <h2 className="font-medium">Monthly</h2>
                                <span className="my-3 block text-2xl font-semibold">₹500 / month</span>
                                <p className="text-muted-foreground text-sm">Perfect for getting started</p>
                            </div>

                            <Button onClick={scrollToTop} variant="outline" className="w-full">
                                Get Started
                            </Button>

                            <hr className="border-dashed" />

                            <ul className="list-outside space-y-3 text-sm">
                                {['AI-Powered Portfolio Creation', 'Chat with AI About Decisions', 'Live Stocks Playground', 'Personalized Onboarding'].map((item, index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <Check className="size-3" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div
                        className="dark:bg-muted rounded-(--radius) border p-6 shadow-lg shadow-gray-950/5 md:col-span-3 lg:p-10 dark:[--color-muted:var(--color-zinc-900)]">
                        <div className="grid gap-6 sm:grid-cols-2">
                            <div className="space-y-4">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h2 className="font-medium">Yearly</h2>
                                        <span className="rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-600 dark:text-green-400">Save 17%</span>
                                    </div>
                                    <span className="my-3 block text-2xl font-semibold">₹5,000 / year</span>
                                    <p className="text-muted-foreground text-sm">Best value for serious investors</p>
                                </div>

                                <Button onClick={scrollToTop} className="w-full">
                                    Get Started
                                </Button>
                            </div>

                            <div>
                                <div className="text-sm font-medium">Everything in Monthly plus:</div>

                                <ul className="mt-4 list-outside space-y-3 text-sm">
                                    {['AI-Powered Portfolio Creation', 'Unlimited AI Chat Support', 'Live Stocks Playground', 'Very Precise Onboarding', 'Advanced Market Analytics', 'Priority Customer Support', 'Early Access to New Features', 'Detailed Performance Reports', 'Custom Investment Goals', 'Risk Assessment Tools'].map((item, index) => (
                                        <li key={index} className="flex items-center gap-2">
                                            <Check className="size-3" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
