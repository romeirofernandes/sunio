import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { saveContactForm } from '@/lib/firebase'
import { CheckCircle2 } from 'lucide-react'

export default function ContactSection() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        country: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        const result = await saveContactForm(formData);
        
        if (result.success) {
            setSubmitStatus('success');
            setFormData({
                name: '',
                email: '',
                country: '',
                message: ''
            });
            setTimeout(() => setSubmitStatus(null), 5000);
        } else {
            setSubmitStatus('error');
            setTimeout(() => setSubmitStatus(null), 5000);
        }
        setIsSubmitting(false);
    };

    return (
        <section id="contact" className="py-32">
            <div className="mx-auto max-w-6xl px-4 lg:px-0">
                <h1 className="mb-12 text-center text-4xl font-semibold lg:text-5xl">Get in Touch</h1>

                <div
                    className="grid divide-y border md:grid-cols-2 md:gap-4 md:divide-x md:divide-y-0">
                    <div className="flex flex-col justify-between space-y-8 p-6 sm:p-12">
                        <div>
                            <h2 className="mb-3 text-lg font-semibold">Support</h2>
                            <a
                                href="mailto:theromeirofernandes@gmail.com"
                                className="text-lg text-blue-600 hover:underline dark:text-blue-400">
                                theromeirofernandes@gmail.com
                            </a>
                            <p className="mt-3 text-sm">Get help with your investments</p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between space-y-8 p-6 sm:p-12">
                        <div>
                            <h3 className="mb-3 text-lg font-semibold">Partnerships</h3>
                            <a
                                href="mailto:russeldanielpaul@gmail.com"
                                className="text-lg text-blue-600 hover:underline dark:text-blue-400">
                                russeldanielpaul@gmail.com
                            </a>
                            <p className="mt-3 text-sm">Collaborate with us</p>
                        </div>
                    </div>
                </div>

                <div
                    className="h-3 border-x bg-[repeating-linear-gradient(-45deg,var(--color-border),var(--color-border)_1px,transparent_1px,transparent_6px)]"></div>
                <form onSubmit={handleSubmit} className="border px-4 py-12 lg:px-0 lg:py-24">
                    <Card className="mx-auto max-w-4xl p-8 sm:p-16">
                        <h3 className="text-xl font-semibold">Let's Start Your Investment Journey</h3>
                        <p className="mt-4 text-sm">Reach out to our team! We're eager to help you achieve your financial goals with personalized AI-powered guidance.</p>

                        {submitStatus === 'success' && (
                            <div className="mt-6 rounded-lg border border-green-500/50 bg-green-500/10 p-4 text-green-600 dark:text-green-400">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="size-5" />
                                    <p className="font-medium">Thank you! We'll get back to you soon.</p>
                                </div>
                            </div>
                        )}
                        {submitStatus === 'error' && (
                            <div className="mt-6 rounded-lg border border-red-500/50 bg-red-500/10 p-4 text-red-600 dark:text-red-400">
                                <p className="font-medium">Something went wrong. Please try again.</p>
                            </div>
                        )}

                        <div className="**:[&>label]:block mt-12 space-y-6 *:space-y-3">
                            <div>
                                <Label htmlFor="name" className="space-y-2">
                                    Full name
                                </Label>
                                <Input 
                                    type="text" 
                                    id="name" 
                                    value={formData.name}
                                    onChange={(e) => handleChange('name', e.target.value)}
                                    required 
                                    disabled={isSubmitting}
                                />
                            </div>
                            <div>
                                <Label htmlFor="email" className="space-y-2">
                                    Work Email
                                </Label>
                                <Input 
                                    type="email" 
                                    id="email" 
                                    value={formData.email}
                                    onChange={(e) => handleChange('email', e.target.value)}
                                    required 
                                    disabled={isSubmitting}
                                />
                            </div>
                            <div>
                                <Label htmlFor="country" className="space-y-2">
                                    Country/Region
                                </Label>
                                <Select 
                                    value={formData.country}
                                    onValueChange={(value) => handleChange('country', value)}
                                    disabled={isSubmitting}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a country" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="DR Congo">DR Congo</SelectItem>
                                        <SelectItem value="United States">United States</SelectItem>
                                        <SelectItem value="France">France</SelectItem>
                                        <SelectItem value="India">India</SelectItem>
                                        <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                                        <SelectItem value="Canada">Canada</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="msg" className="space-y-2">
                                    Message
                                </Label>
                                <Textarea 
                                    id="msg" 
                                    rows={3} 
                                    value={formData.message}
                                    onChange={(e) => handleChange('message', e.target.value)}
                                    disabled={isSubmitting}
                                />
                            </div>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Submitting...' : 'Submit'}
                            </Button>
                        </div>
                    </Card>
                </form>
            </div>
        </section>
    );
}
