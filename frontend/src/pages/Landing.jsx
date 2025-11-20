import React from 'react'
import { HeroHeader } from '@/components/header'
import HeroSection from '@/components/hero-section'
import { LogoCloud } from '@/components/logo-cloud'
import FeaturesSection from '@/components/features-8'
import Pricing from '@/components/pricing'
import FAQsThree from '@/components/faqs-3'
import ContactSection from '@/components/contact'
import FooterSection from '@/components/footer'

const Landing = () => {
  return (
    <div>
      <HeroHeader />
      <HeroSection />
      <LogoCloud />
      <FeaturesSection />
      <Pricing />
      <FAQsThree />
      <ContactSection />
      <FooterSection />
    </div>
  )
}

export default Landing