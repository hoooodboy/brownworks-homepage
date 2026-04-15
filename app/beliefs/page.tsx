'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import { css, Global } from '@emotion/react'

const globalStyles = css`
  html { scroll-behavior: smooth; }
  body {
    background: #fafaf8;
    color: #2a2622;
    font-family: var(--font-nunito-sans), sans-serif;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }
  .reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity .9s cubic-bezier(.16,1,.3,1), transform .9s cubic-bezier(.16,1,.3,1);
  }
  .reveal.vis { opacity: 1; transform: none; }
  .rd1 { transition-delay: .12s; }
  .rd2 { transition-delay: .24s; }
  .num-reveal {
    opacity: 0;
    transform: scale(.92);
    transition: opacity 1s cubic-bezier(.16,1,.3,1), transform 1.2s cubic-bezier(.16,1,.3,1);
  }
  .num-reveal.vis { opacity: 1; transform: scale(1); }
`

const TopNav = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.6rem clamp(2rem, 4vw, 3.5rem);
  background: rgba(250,250,248,.9);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(0,0,0,.04);
`

const TopNavBack = styled.span`
  font-family: var(--font-nunito-sans), sans-serif;
  font-size: .68rem;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: #a8a29e;
  display: inline-flex;
  align-items: center;
  gap: .4rem;
  transition: color .3s;
  cursor: pointer;
  &:hover { color: #2a2622; }
`

const TopNavLogo = styled.div`
  font-family: var(--font-nunito-sans), sans-serif;
  font-weight: 700;
  font-size: 1.1rem;
  color: #2a2622;
  letter-spacing: -.01em;
`

const HeroBanner = styled.section`
  position: relative;
  margin-top: clamp(4.5rem, 7vh, 5.5rem);
  padding: clamp(3rem, 5vh, 5rem) clamp(2rem, 8vw, 10rem);
  text-align: center;
  overflow: hidden;
  &::before, &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 1px;
    background: #e0ddd6;
    z-index: 3;
  }
  &::before { top: 0; }
  &::after { bottom: 0; }
`

const HeroBannerBg = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  background-image: url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1400&q=80&auto=format&fit=crop');
  background-size: cover;
  background-position: center 40%;
  filter: brightness(.35) saturate(.6) sepia(.15);
`

const HeroBannerOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(to right, rgba(250,250,248,.82) 0%, rgba(250,250,248,.55) 30%, rgba(250,250,248,.55) 70%, rgba(250,250,248,.82) 100%);
`

const HeroBannerContent = styled.div`
  position: relative;
  z-index: 2;
`

const HeroEyebrow = styled.p`
  font-family: var(--font-nunito-sans), sans-serif;
  font-size: .65rem;
  letter-spacing: .25em;
  text-transform: uppercase;
  color: #ab7843;
  margin-bottom: 1rem;
`

const HeroTitle = styled.h1`
  font-family: var(--font-cormorant-garamond), Georgia, serif;
  font-size: clamp(2.2rem, 4vw, 3.6rem);
  font-weight: 500;
  line-height: 1.1;
  color: #1a1816;
`

const BeliefSection = styled.section<{ flip?: boolean }>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  padding: clamp(3rem, 6vh, 6rem) clamp(2rem, 8vw, 10rem);
  gap: clamp(2rem, 4vw, 5rem);
  position: relative;
  ${({ flip }) => flip && `
    direction: rtl;
    & > * { direction: ltr; }
  `}
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    direction: ltr;
    text-align: center;
    padding: 3rem 2rem;
    gap: 1rem;
    & > * { direction: ltr; }
  }
`

const BigNumber = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    order: 1;
  }
`

const NumberText = styled.div<{ numClass: 'num-01' | 'num-02' | 'num-03' }>`
  font-family: var(--font-cormorant-garamond), Georgia, serif;
  font-size: clamp(12rem, 22vw, 20rem);
  font-weight: 700;
  line-height: .85;
  color: transparent;
  background-size: cover;
  background-position: center;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  user-select: none;
  ${({ numClass }) => numClass === 'num-01' && `
    background-image:
      linear-gradient(135deg, #e8756d 0%, #d4583e 20%, #c8923e 40%, #e8a96a 60%, #f2d4a0 80%, #e8756d 100%),
      url('https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80&auto=format&fit=crop');
    background-blend-mode: overlay;
  `}
  ${({ numClass }) => numClass === 'num-02' && `
    background-image:
      linear-gradient(225deg, #6b8cce 0%, #8b6bce 20%, #c86b9e 40%, #e8756d 60%, #c8923e 80%, #6b8cce 100%),
      url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80&auto=format&fit=crop');
    background-blend-mode: overlay;
  `}
  ${({ numClass }) => numClass === 'num-03' && `
    background-image:
      linear-gradient(315deg, #5cb88a 0%, #4a9ec8 20%, #6b78ce 40%, #9b6bce 60%, #ce6b8c 80%, #e8a96a 100%),
      url('https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&q=80&auto=format&fit=crop');
    background-blend-mode: overlay;
  `}
  @media (max-width: 768px) {
    font-size: clamp(8rem, 30vw, 12rem);
  }
`

const BeliefText = styled.div`
  padding: clamp(1rem, 2vw, 2rem) 0;
  @media (max-width: 768px) {
    order: 2;
  }
`

const BeliefLine = styled.div`
  width: 40px;
  height: 1px;
  background: #ab7843;
  margin-bottom: 1.6rem;
  opacity: .5;
  @media (max-width: 768px) {
    margin: 0 auto 1.6rem;
  }
`

const BeliefH2 = styled.h2`
  font-family: var(--font-cormorant-garamond), Georgia, serif;
  font-size: clamp(1.6rem, 2.5vw, 2.4rem);
  font-weight: 500;
  color: #1a1816;
  margin-bottom: 1.4rem;
  line-height: 1.15;
`

const BeliefP = styled.p`
  font-family: var(--font-nunito-sans), sans-serif;
  font-size: .88rem;
  line-height: 1.9;
  color: #a8a29e;
  font-weight: 300;
  max-width: 420px;
  @media (max-width: 768px) {
    max-width: 100%;
  }
`

const BottomSpace = styled.div`
  height: clamp(4rem, 8vh, 8rem);
  border-top: 1px solid #e0ddd6;
  display: flex;
  align-items: center;
  justify-content: center;
`

const BottomSpanText = styled.span`
  font-size: .6rem;
  letter-spacing: .2em;
  text-transform: uppercase;
  color: #a8a29e;
  opacity: .4;
`

export default function BeliefsPage() {
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) e.target.classList.add('vis')
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    )

    const targets = document.querySelectorAll('.reveal, .num-reveal')
    targets.forEach(el => obs.observe(el))

    return () => obs.disconnect()
  }, [])

  return (
    <div ref={pageRef}>
      <Global styles={globalStyles} />

      <TopNav>
        <Link href="/">
          <TopNavBack><span>←</span> Back</TopNavBack>
        </Link>
        <TopNavLogo>Brownworks</TopNavLogo>
      </TopNav>

      <HeroBanner>
        <HeroBannerBg />
        <HeroBannerOverlay />
        <HeroBannerContent>
          <HeroEyebrow className="reveal">Brownworks</HeroEyebrow>
          <HeroTitle className="reveal rd1">Our Beliefs</HeroTitle>
        </HeroBannerContent>
      </HeroBanner>

      {/* Section 01 — The Agency */}
      <BeliefSection>
        <BigNumber>
          <NumberText numClass="num-01" className="num-reveal">01</NumberText>
        </BigNumber>
        <BeliefText>
          <BeliefLine className="reveal" />
          <BeliefH2 className="reveal rd1">The Agency</BeliefH2>
          <BeliefP className="reveal rd2">
            Success is where opportunity, strategy, and execution converge. We've established our agency to have a global perspective to meet the real world needs of modern brands, combining insight into shifting consumer behavior with the foresight to anticipate what's next. We create brand experiences that drive engagement.
          </BeliefP>
        </BeliefText>
      </BeliefSection>

      {/* Section 02 — Values */}
      <BeliefSection flip>
        <BigNumber>
          <NumberText numClass="num-02" className="num-reveal">02</NumberText>
        </BigNumber>
        <BeliefText>
          <BeliefLine className="reveal" />
          <BeliefH2 className="reveal rd1">Values</BeliefH2>
          <BeliefP className="reveal rd2">
            At Brownworks, you will find your people and your purpose. We grow together, work for each other, and for our clients. This isn't just where we work; it's where many of us have chosen to build something meaningful. We're dedicated, curious, and united by the belief that ignition happens when good people do great work together. Making a real difference is why we exist.
          </BeliefP>
        </BeliefText>
      </BeliefSection>

      {/* Section 03 — Our Promise */}
      <BeliefSection>
        <BigNumber>
          <NumberText numClass="num-03" className="num-reveal">03</NumberText>
        </BigNumber>
        <BeliefText>
          <BeliefLine className="reveal" />
          <BeliefH2 className="reveal rd1">Our Promise</BeliefH2>
          <BeliefP className="reveal rd2">
            We don't just deliver campaigns. We build lasting partnerships rooted in trust, transparency, and results. Your success is our measure. Every strategy we craft, every story we tell, and every brand we build is designed with one goal: to grow alongside our clients and earn our place at the table, today and tomorrow.
          </BeliefP>
        </BeliefText>
      </BeliefSection>

      <BottomSpace>
        <BottomSpanText>Brownworks &copy; 2026</BottomSpanText>
      </BottomSpace>
    </div>
  )
}
