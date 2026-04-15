'use client';

import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import Link from 'next/link';

// ─── Keyframes ───────────────────────────────────────────────────────────────

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const fadeInSlow = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

// ─── Styled Components ────────────────────────────────────────────────────────

const Poster = styled.div`
  width: 100%; height: 100vh;
  position: relative; overflow: hidden;
  background: #0a0807;
  font-family: var(--font-nunito-sans), sans-serif;
  color: #f0ebe2;
  -webkit-font-smoothing: antialiased;
`;

const PosterBg = styled.div`
  position: absolute; inset: 0; z-index: 0;
  background-image: url('https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1920&q=85&auto=format&fit=crop');
  background-size: cover;
  background-position: center 30%;
  filter: saturate(.7) contrast(1.05);
`;

const PosterTint = styled.div`
  position: absolute; inset: 0; z-index: 1;
  background: linear-gradient(
    180deg,
    rgba(80,50,18,.3)   0%,
    rgba(50,30,10,.2)   25%,
    rgba(20,14,10,.45)  55%,
    rgba(12,8,5,.9)     80%,
    rgba(10,8,7,.97)    100%
  );
`;

const PosterWarm = styled.div`
  position: absolute; inset: 0; z-index: 2;
  background: rgba(100,60,20,.1);
  mix-blend-mode: multiply;
`;

const PosterGrain = styled.div`
  position: absolute; inset: 0; z-index: 3;
  opacity: .04; pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
`;

const WallLogo = styled.div`
  position: absolute;
  left: clamp(1.2rem, 2.5vw, 2.5rem);
  top: 28%;
  z-index: 5;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  font-family: var(--font-nunito-sans), sans-serif;
  font-weight: 700;
  font-size: clamp(1rem, 1.4vw, 1.4rem);
  letter-spacing: .2em;
  color: rgba(220,210,195,.18);
  text-shadow:
    0 0 20px rgba(220,210,195,.06),
    1px 1px 0 rgba(0,0,0,.3),
    -1px -1px 0 rgba(255,255,255,.03);
  mix-blend-mode: screen;
  animation: ${fadeInSlow} 1.5s .8s both;
  @media(max-width: 768px) { display: none; }
`;

const TopNav = styled.nav`
  position: absolute; top: 0; left: 0; width: 100%; z-index: 10;
  padding: 1.4rem clamp(2rem, 4vw, 3.5rem);
`;

const TopBack = styled(Link)`
  font-family: var(--font-nunito-sans), sans-serif;
  font-size: .68rem; letter-spacing: .14em;
  text-transform: uppercase;
  color: rgba(240,235,226,.35);
  display: inline-flex; align-items: center; gap: .4rem;
  transition: color .3s; cursor: pointer; text-decoration: none;
  &:hover { color: #f0ebe2; }
`;

const CenterTitle = styled.div`
  position: absolute;
  top: 48%; left: 55%;
  transform: translate(-50%, -50%);
  z-index: 5;
  text-align: center;
  animation: ${fadeIn} .8s .3s both;
  @media(max-width: 768px) { left: 50%; }
`;

const CenterTitleH1 = styled.h1`
  font-family: var(--font-cormorant-garamond), Georgia, serif;
  font-size: clamp(1.6rem, 3.2vw, 3rem);
  font-weight: 500;
  letter-spacing: .2em;
  text-transform: uppercase;
  color: #fff;
  text-shadow: 0 2px 30px rgba(0,0,0,.5);
`;

const Services = styled.div`
  position: absolute;
  bottom: clamp(1.5rem, 3.5vh, 3rem);
  left: clamp(3.5rem, 6vw, 6rem);
  right: clamp(2rem, 4vw, 4rem);
  z-index: 5;
  animation: ${fadeIn} .8s .6s both;
  @media(max-width: 768px) {
    left: 1.5rem; right: 1.5rem; bottom: 1.5rem;
  }
`;

const ServicesLine = styled.p`
  font-size: clamp(.55rem, .72vw, .72rem);
  line-height: 2;
  color: rgba(240,235,226,.5);
  font-weight: 300;
  letter-spacing: .02em;
  & + & { margin-top: .1rem; }
  @media(max-width: 768px) { font-size: .5rem; line-height: 1.9; }
`;

const B = styled.span`
  font-weight: 700;
  color: rgba(240,235,226,.85);
  text-transform: uppercase;
  letter-spacing: .06em;
  font-size: clamp(.56rem, .74vw, .74rem);
`;

const Sep = styled.span`
  color: rgba(240,235,226,.18);
  margin: 0 .2em;
`;

// ─── Component ────────────────────────────────────────────────────────────────

export default function OfferingsPage() {
  return (
    <Poster>
      <PosterBg />
      <PosterTint />
      <PosterWarm />
      <PosterGrain />

      <TopNav>
        <TopBack href="/"><span>←</span> Back</TopBack>
      </TopNav>

      <WallLogo>brownworks</WallLogo>

      <CenterTitle>
        <CenterTitleH1>Our Offerings</CenterTitleH1>
      </CenterTitle>

      <Services>
        <ServicesLine>
          <B>Content Creation</B> &amp; <B>Graphic Design</B>{' '}
          <Sep>|</Sep>{' '}
          <B>Photography &amp; Videography</B>{' '}
          <Sep>|</Sep>{' '}
          <B>Social Media Management</B> &amp; Strategy{' '}
          <Sep>|</Sep>
        </ServicesLine>
        <ServicesLine>
          <B>Logo &amp; Branding</B>{' '}
          <Sep>|</Sep>{' '}
          <B>Web Design</B>{' '}
          <Sep>|</Sep>{' '}
          Business Setup &amp; Strategy
        </ServicesLine>
        <ServicesLine>
          <Sep>|</Sep>{' '}
          <B>Creative Training &amp; Education</B>{' '}
          <Sep>|</Sep>{' '}
          AI &amp; Automation Solutions
        </ServicesLine>
        <ServicesLine>
          <B>Digital Strategy</B>{' '}
          <Sep>|</Sep>{' '}
          SEO, SEM, PPC{' '}
          <Sep>|</Sep>{' '}
          Email Campaigns{' '}
          <Sep>|</Sep>{' '}
          Influencer Strategy{' '}
          <Sep>|</Sep>{' '}
          <B>Public Relations</B>
        </ServicesLine>
        <ServicesLine>
          <B>Data &amp; Analytics</B>{' '}
          <Sep>|</Sep>{' '}
          Campaign Tracking{' '}
          <Sep>|</Sep>{' '}
          ROI &amp; Optimization{' '}
          <Sep>|</Sep>{' '}
          <B>Experiential &amp; Events</B>{' '}
          <Sep>|</Sep>{' '}
          XR Experiences
        </ServicesLine>
      </Services>
    </Poster>
  );
}
