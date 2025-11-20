import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { DynamicIcon } from 'lucide-react/dynamic';

export default function FAQsThree() {
    const faqItems = [
        {
            id: 'item-1',
            icon: 'brain',
            question: 'How does the AI portfolio creation work?',
            answer: 'Our AI analyzes your financial goals, risk tolerance, and investment preferences through a detailed onboarding process. It then creates a personalized portfolio tailored to your needs, continuously learning and adapting to market conditions and your feedback.',
        },
        {
            id: 'item-2',
            icon: 'credit-card',
            question: 'How do subscription payments work?',
            answer: 'Subscription payments are automatically charged to your default payment method on the same day each month or year, depending on your billing cycle. You can update your payment information and view billing history in your account dashboard. We accept all major payment methods.',
        },
        {
            id: 'item-3',
            icon: 'trending-up',
            question: 'Is the live stocks playground real money?',
            answer: 'No, the live stocks playground uses virtual currency with real-time market data. This allows you to practice trading strategies, test investment decisions, and build confidence without risking actual money. Once you\'re ready, you can apply these learnings to real investments.',
        },
        {
            id: 'item-4',
            icon: 'shield',
            question: 'Is my financial data secure?',
            answer: 'Absolutely. We use bank-level encryption and security protocols to protect your data. Your information is encrypted both in transit and at rest. We never share your personal or financial information with third parties without your explicit consent.',
        },
        {
            id: 'item-5',
            icon: 'message-circle',
            question: 'Can I chat with the AI anytime?',
            answer: 'Yes! Our AI assistant is available 24/7 to answer your questions about investments, market trends, portfolio decisions, and more. Get instant insights whenever you need guidance, whether it\'s early morning or late at night.',
        },
    ]

    return (
        <section id="faqs" className="bg-muted dark:bg-background py-20">
            <div className="mx-auto max-w-6xl px-4 md:px-6">
                <div className="flex flex-col gap-10 md:flex-row md:gap-16">
                    <div className="md:w-1/3">
                        <div className="sticky top-20">
                            <h2 className="mt-4 text-3xl font-bold">Frequently Asked Questions</h2>
                            <p className="text-muted-foreground mt-4">
                                Can't find what you're looking for? Contact our{' '}
                                <a href="#contact" className="text-primary font-medium hover:underline">
                                    support team
                                </a>
                            </p>
                        </div>
                    </div>
                    <div className="md:w-2/3">
                        <Accordion type="single" collapsible className="w-full space-y-2">
                            {faqItems.map((item) => (
                                <AccordionItem
                                    key={item.id}
                                    value={item.id}
                                    className="bg-background shadow-xs rounded-lg border px-4 last:border-b">
                                    <AccordionTrigger className="cursor-pointer items-center py-5 hover:no-underline">
                                        <div className="flex items-center gap-3">
                                            <div className="flex size-6">
                                                <DynamicIcon name={item.icon} className="m-auto size-4" />
                                            </div>
                                            <span className="text-base">{item.question}</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-5">
                                        <div className="px-9">
                                            <p className="text-base">{item.answer}</p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </div>
        </section>
    );
}
