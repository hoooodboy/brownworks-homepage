'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { keyframes, css, Global } from '@emotion/react';
import styled from '@emotion/styled';
import Link from 'next/link';

// ─── Keyframes ───────────────────────────────────────────────────────────────

const riseUp = keyframes`
  0% {
    bottom: -25%;
    opacity: 0;
    letter-spacing: .2em;
    transform: translateX(-50%) scale(.9);
    text-shadow: 0 0 80px rgba(245,243,238,0);
  }
  30% { opacity: .15; }
  70% { letter-spacing: .08em; }
  100% {
    bottom: 32%;
    opacity: .3;
    letter-spacing: .06em;
    transform: translateX(-50%) scale(1);
    text-shadow: 0 0 80px rgba(245,243,238,.06);
  }
`;

const shimmer = keyframes`
  0%   { text-shadow: 0 0 60px rgba(245,243,238,.04); }
  100% { text-shadow: 0 0 100px rgba(171,120,67,.1), 0 0 40px rgba(245,243,238,.06); }
`;

const breathe = keyframes`
  0%   { transform: translateX(-50%) scale(1); opacity: .3; }
  100% { transform: translateX(-50%) scale(1.02); opacity: .35; }
`;

// ─── Global styles ────────────────────────────────────────────────────────────

const globalStyles = css`
  html { overflow: hidden; height: 100%; }
  body {
    height: 100%; overflow: hidden;
    background: #fafaf8;
    color: #1a1816;
    font-family: var(--font-nunito-sans), system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    cursor: default;
  }
  a { color: inherit; text-decoration: none; }

  .reveal-h {
    opacity: 0;
    transform: translateX(40px);
    transition: opacity .9s cubic-bezier(.16,1,.3,1), transform .9s cubic-bezier(.16,1,.3,1);
  }
  .reveal-h.vis { opacity: 1; transform: none; }
  .rd1 { transition-delay: .15s; }
  .rd2 { transition-delay: .3s; }
  .rd3 { transition-delay: .45s; }

  .img-reveal {
    opacity: 0;
    transform: scale(1.03);
    transition: opacity 1s cubic-bezier(.16,1,.3,1), transform 1.2s cubic-bezier(.16,1,.3,1);
  }
  .img-reveal.vis { opacity: 1; transform: scale(1); }
`;

// ─── Styled Components ────────────────────────────────────────────────────────

const HScroll = styled.div`
  display: flex;
  width: 400vw;
  height: 100vh;
  transition: transform .8s cubic-bezier(.76,0,.24,1);
`;

const Section = styled.section`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
`;

const TopNav = styled.nav`
  position: fixed; top: 0; left: 0; width: 100%; z-index: 100;
  display: flex; justify-content: space-between; align-items: center;
  padding: 1.6rem clamp(2rem, 4vw, 3.5rem);
  pointer-events: none;
  & > * { pointer-events: auto; }
`;

const TopLogo = styled.div<{ inv?: boolean }>`
  font-family: var(--font-nunito-sans), system-ui, sans-serif;
  font-weight: 700;
  font-size: 1.1rem;
  color: ${({ inv }) => (inv ? '#fafaf8' : '#1a1816')};
  letter-spacing: -.01em;
  transition: color .3s;
`;

const TopBack = styled(Link)`
  font-family: var(--font-nunito-sans), system-ui, sans-serif;
  font-size: .7rem;
  letter-spacing: .15em;
  text-transform: uppercase;
  color: #b5b0a8;
  display: flex;
  align-items: center;
  gap: .5rem;
  transition: color .3s;
  cursor: pointer;
  &:hover { color: #1a1816; }
`;

const ProgressTrack = styled.div`
  position: fixed; top: 0; left: 0; width: 100%; height: 2px;
  z-index: 101; background: #e8e5df;
`;

const ProgressBar = styled.div<{ pct: number }>`
  height: 100%;
  width: ${({ pct }) => pct}%;
  background: #ab7843;
  transition: width .8s cubic-bezier(.76,0,.24,1);
`;

const SectionDots = styled.div`
  position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%);
  z-index: 100; display: flex; gap: 1.8rem; align-items: center;
  @media(max-width: 768px) { gap: 1rem; }
`;

interface DotItemProps { active?: boolean; dark?: boolean; }
const DotItem = styled.div<DotItemProps>`
  font-family: var(--font-nunito-sans), system-ui, sans-serif;
  font-size: .6rem;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: ${({ active, dark }) =>
    active && dark ? '#fff'
    : active ? '#1a1816'
    : dark ? 'rgba(255,255,255,.35)'
    : '#b5b0a8'};
  cursor: pointer;
  transition: color .3s;
  position: relative;
  padding-bottom: .5rem;
  &::after {
    content: '';
    position: absolute; bottom: 0; left: 0;
    width: ${({ active }) => (active ? '100%' : '0')};
    height: 1px;
    background: #ab7843;
    transition: width .5s cubic-bezier(.76,0,.24,1);
  }
  @media(max-width: 768px) { font-size: .5rem; }
`;

const ScrollHint = styled.div<{ hidden?: boolean }>`
  position: fixed; right: 2rem; top: 50%; transform: translateY(-50%);
  z-index: 100;
  display: flex; flex-direction: column; align-items: center; gap: .5rem;
  opacity: ${({ hidden }) => (hidden ? 0 : .4)};
  pointer-events: ${({ hidden }) => (hidden ? 'none' : 'auto')};
  transition: opacity .3s;
`;

const ScrollHintSpan = styled.span`
  font-family: var(--font-nunito-sans), system-ui, sans-serif;
  font-size: .55rem;
  letter-spacing: .15em;
  text-transform: uppercase;
  color: #3a3632;
  writing-mode: vertical-lr;
`;

const ArrowR = styled.div`
  width: 20px; height: 1px; background: #b5b0a8;
  position: relative; margin-top: .3rem;
  &::after {
    content: '';
    position: absolute; right: -1px; top: -3px;
    width: 7px; height: 7px;
    border-right: 1px solid #b5b0a8;
    border-bottom: 1px solid #b5b0a8;
    transform: rotate(-45deg);
  }
`;

// ─── Section 1 ────────────────────────────────────────────────────────────────

const S1 = styled(Section)` background: #fafaf8; `;
const S1Grid = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; height: 100%;
  @media(max-width: 768px) { grid-template-columns: 1fr; }
`;
const S1Left = styled.div`
  display: flex; flex-direction: column; justify-content: center;
  padding: 8rem clamp(3rem,5vw,6rem) 6rem;
  position: relative;
  @media(max-width: 768px) { padding: 7rem 2rem 4rem; }
`;
const S1Eyebrow = styled.p`
  font-family: var(--font-nunito-sans), system-ui, sans-serif;
  font-size: .65rem; letter-spacing: .2em; text-transform: uppercase;
  color: #b5b0a8; margin-bottom: 2rem;
`;
const S1Heading = styled.h1`
  font-family: var(--font-cormorant-garamond), Georgia, serif;
  font-size: clamp(2rem,3.2vw,3.2rem); font-weight: 500; line-height: 1.15;
  margin-bottom: 1.8rem; color: #1a1816;
`;
const S1Body = styled.p`
  font-family: var(--font-nunito-sans), system-ui, sans-serif;
  font-size: .88rem; line-height: 1.9; color: #3a3632;
  max-width: 380px; font-weight: 300;
`;
const S1Right = styled.div`
  position: relative;
  @media(max-width: 768px) { display: none; }
`;
const S1ImgTop = styled.img`
  position: absolute; top: 0; right: 0;
  width: 75%; height: 55%; object-fit: cover; filter: grayscale(100%);
`;
const S1ImgBottom = styled.img`
  position: absolute; bottom: 8%; left: 8%;
  width: 50%; height: 35%; object-fit: cover; filter: grayscale(100%);
  box-shadow: 0 20px 60px rgba(0,0,0,.1);
`;
const S1Watermark = styled.div`
  position: absolute; bottom: 12%; right: 5%;
  font-family: var(--font-cormorant-garamond), Georgia, serif;
  font-size: clamp(5rem,10vw,10rem); font-weight: 700;
  color: rgba(26,24,22,.04); letter-spacing: .02em;
  text-transform: uppercase; line-height: .85; pointer-events: none;
`;
const S1Divider = styled.div`
  position: absolute; top: 50%; right: 0;
  width: 1px; height: 30%; transform: translateY(-50%);
  background: #e8e5df;
`;

// ─── Section 2 ────────────────────────────────────────────────────────────────

const S2 = styled(Section)` background: #f2f0ec; `;
const S2Layout = styled.div`
  display: grid; grid-template-columns: 55% 45%; height: 100%;
  @media(max-width: 768px) { grid-template-columns: 1fr; }
`;
const S2ImgWrap = styled.div`
  position: relative; display: flex;
  align-items: center; justify-content: center; padding: 6rem;
  @media(max-width: 768px) { display: none; }
`;
const S2ImgMain = styled.img`
  width: 80%; max-height: 70vh; object-fit: cover;
  filter: grayscale(100%); box-shadow: 0 30px 80px rgba(0,0,0,.08);
`;
const S2Watermark = styled.div`
  position: absolute; bottom: 8%; left: 50%;
  transform: translateX(-40%);
  font-family: var(--font-cormorant-garamond), Georgia, serif;
  font-size: clamp(4rem,9vw,9rem); font-weight: 700;
  color: rgba(26,24,22,.03); letter-spacing: .02em;
  text-transform: uppercase; pointer-events: none; white-space: nowrap;
`;
const S2Text = styled.div`
  display: flex; flex-direction: column; justify-content: center;
  padding: 6rem clamp(2.5rem,4vw,5rem) 6rem 2rem;
  @media(max-width: 768px) { padding: 7rem 2rem 4rem; }
`;
const S2Eyebrow = styled.p`
  font-family: var(--font-nunito-sans), system-ui, sans-serif;
  font-size: .65rem; letter-spacing: .2em; text-transform: uppercase;
  color: #b5b0a8; margin-bottom: 2rem;
`;
const S2Heading = styled.h2`
  font-family: var(--font-cormorant-garamond), Georgia, serif;
  font-size: clamp(1.8rem,2.8vw,2.8rem); font-weight: 500; line-height: 1.2;
  margin-bottom: 1.8rem; color: #1a1816;
`;
const S2Body = styled.p`
  font-family: var(--font-nunito-sans), system-ui, sans-serif;
  font-size: .88rem; line-height: 1.9; color: #3a3632;
  max-width: 360px; font-weight: 300;
`;
const S2Line = styled.div`
  width: 50px; height: 1px; background: #ab7843; margin-top: 2rem;
`;

// ─── Section 3 ────────────────────────────────────────────────────────────────

const S3 = styled(Section)` background: #f5f0e8; `;
const S3Layout = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; height: 100%; position: relative;
  @media(max-width: 768px) { grid-template-columns: 1fr; }
`;
const S3ImgSide = styled.div`
  position: relative; display: flex; align-items: flex-end;
  padding: 0 0 0 clamp(2rem,4vw,5rem);
  @media(max-width: 768px) { display: none; }
`;
const S3ImgMain = styled.img`
  width: 85%; height: 75vh; object-fit: cover; filter: grayscale(100%);
`;
const S3Text = styled.div`
  display: flex; flex-direction: column; justify-content: center;
  padding: 6rem clamp(2.5rem,4vw,5rem); position: relative;
  @media(max-width: 768px) { padding: 7rem 2rem 4rem; }
`;
const S3Eyebrow = styled.p`
  font-family: var(--font-nunito-sans), system-ui, sans-serif;
  font-size: .65rem; letter-spacing: .2em; text-transform: uppercase;
  color: #b5b0a8; margin-bottom: 2rem;
`;
const S3Heading = styled.h2`
  font-family: var(--font-cormorant-garamond), Georgia, serif;
  font-size: clamp(1.8rem,2.8vw,2.8rem); font-weight: 500; line-height: 1.2;
  margin-bottom: 1.8rem; color: #1a1816;
`;
const S3Body = styled.p`
  font-family: var(--font-nunito-sans), system-ui, sans-serif;
  font-size: .88rem; line-height: 1.9; color: #3a3632;
  max-width: 380px; font-weight: 300;
`;
const S3Watermark = styled.div`
  position: absolute; top: 15%; right: -5%;
  font-family: var(--font-cormorant-garamond), Georgia, serif;
  font-size: clamp(5rem,11vw,11rem); font-weight: 700;
  color: rgba(26,24,22,.03); text-transform: uppercase;
  pointer-events: none; letter-spacing: .02em;
`;
const S3AccentBlock = styled.div`
  position: absolute; bottom: 10%; right: 8%;
  width: 120px; height: 120px; background: #e8e5df; opacity: .4;
`;

// ─── Section 4 ────────────────────────────────────────────────────────────────

const S4 = styled(Section)` background: #1a1816; color: #fafaf8; overflow: hidden; `;
const S4Layout = styled.div`
  display: grid; grid-template-columns: 45% 55%; height: 100%;
  position: relative; z-index: 2;
  @media(max-width: 768px) { grid-template-columns: 1fr; }
`;
const S4Text = styled.div`
  display: flex; flex-direction: column; justify-content: center;
  padding: 6rem clamp(2.5rem,4vw,5rem); position: relative;
  @media(max-width: 768px) { padding: 7rem 2rem 4rem; }
`;
const S4Eyebrow = styled.p`
  font-family: var(--font-nunito-sans), system-ui, sans-serif;
  font-size: .65rem; letter-spacing: .2em; text-transform: uppercase;
  color: #b5b0a8; margin-bottom: 2rem;
`;
const S4Heading = styled.h2`
  font-family: var(--font-cormorant-garamond), Georgia, serif;
  font-size: clamp(1.8rem,2.8vw,2.8rem); font-weight: 500; line-height: 1.2;
  margin-bottom: 1.8rem; color: #fafaf8;
`;
const S4Body = styled.p`
  font-family: var(--font-nunito-sans), system-ui, sans-serif;
  font-size: .88rem; line-height: 1.9; color: #b5b0a8;
  max-width: 360px; font-weight: 300;
`;
const S4Line = styled.div`
  width: 50px; height: 1px; background: #ab7843; margin-top: 2rem;
`;
const S4ImgWrap = styled.div`
  position: relative; display: flex; align-items: center; justify-content: center;
  overflow: hidden;
  @media(max-width: 768px) { display: none; }
`;
const S4ImgMain = styled.img`
  width: 70%; max-height: 65vh; object-fit: cover;
  filter: grayscale(100%) brightness(1.1) contrast(1.1);
  box-shadow: 0 30px 80px rgba(0,0,0,.3);
`;
const S4Glow = styled.div`
  position: absolute; top: 30%; right: 20%;
  width: 300px; height: 300px; border-radius: 50%;
  background: radial-gradient(circle,rgba(171,120,67,.08),transparent 70%);
  pointer-events: none;
`;

const S4Watermark = styled.div<{ rising?: boolean }>`
  position: absolute;
  bottom: -25%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  font-family: var(--font-cormorant-garamond), Georgia, serif;
  font-size: clamp(7rem,18vw,16rem);
  font-weight: 700;
  color: rgba(245,243,238,.25);
  text-transform: uppercase;
  pointer-events: none;
  letter-spacing: .15em;
  white-space: nowrap;
  opacity: 0;
  text-shadow: 0 0 60px rgba(245,243,238,.08);
  ${({ rising }) =>
    rising &&
    css`
      animation:
        ${riseUp} 3.5s cubic-bezier(.16,1,.3,1) forwards,
        ${shimmer} 4s ease-in-out 3s infinite alternate,
        ${breathe} 6s ease-in-out 3.5s infinite alternate;
    `}
`;

// ─── Component ────────────────────────────────────────────────────────────────

const TOTAL = 4;
const SECTIONS = ['What\'s Next', 'Discover', 'Purpose', 'Catalyst'];

export default function IgnitionPage() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [rising, setRising] = useState(false);
  const isAnimating = useRef(false);
  const hscrollRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  const goTo = useCallback((idx: number) => {
    if (idx < 0 || idx >= TOTAL || isAnimating.current) return;
    isAnimating.current = true;
    setCurrentIdx(idx);

    if (hscrollRef.current) {
      hscrollRef.current.style.transform = `translateX(-${idx * 100}vw)`;
    }

    // Catalyst watermark
    if (idx === 3) {
      setRising(false);
    } else {
      setRising(false);
    }

    setTimeout(() => {
      // Trigger reveal animations on current section
      const section = sectionRefs.current[idx];
      if (section) {
        section.querySelectorAll<HTMLElement>('.reveal-h, .img-reveal').forEach(el => {
          el.classList.add('vis');
        });
      }
      // Trigger CATALYST rising animation
      if (idx === 3) {
        setRising(true);
      }
      isAnimating.current = false;
    }, 300);
  }, []);

  // Initial reveal for first section
  useEffect(() => {
    const timer = setTimeout(() => {
      const section = sectionRefs.current[0];
      if (section) {
        section.querySelectorAll<HTMLElement>('.reveal-h, .img-reveal').forEach(el => {
          el.classList.add('vis');
        });
      }
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  // Wheel handler
  useEffect(() => {
    let wheelTimeout: ReturnType<typeof setTimeout>;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      clearTimeout(wheelTimeout);
      wheelTimeout = setTimeout(() => {
        if (e.deltaY > 20 || e.deltaX > 20) goTo(currentIdx + 1);
        else if (e.deltaY < -20 || e.deltaX < -20) goTo(currentIdx - 1);
      }, 80);
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', onWheel);
      clearTimeout(wheelTimeout);
    };
  }, [currentIdx, goTo]);

  // Keyboard handler
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goTo(currentIdx + 1);
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goTo(currentIdx - 1);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [currentIdx, goTo]);

  // Touch handler
  useEffect(() => {
    let touchStartX = 0;
    const onTouchStart = (e: TouchEvent) => { touchStartX = e.touches[0].clientX; };
    const onTouchEnd = (e: TouchEvent) => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) goTo(currentIdx + 1);
        else goTo(currentIdx - 1);
      }
    };
    window.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchend', onTouchEnd);
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [currentIdx, goTo]);

  const isDark = currentIdx === 3;
  const progressPct = ((currentIdx + 1) / TOTAL) * 100;

  return (
    <>
      <Global styles={globalStyles} />

      {/* Progress bar */}
      <ProgressTrack>
        <ProgressBar pct={progressPct} />
      </ProgressTrack>

      {/* Top nav */}
      <TopNav>
        <TopBack href="/"><span style={{ fontSize: '.9rem' }}>←</span> Back</TopBack>
        <TopLogo inv={isDark}>brownworks</TopLogo>
      </TopNav>

      {/* Section dots */}
      <SectionDots>
        {SECTIONS.map((label, i) => (
          <DotItem
            key={label}
            active={i === currentIdx}
            dark={isDark}
            onClick={() => goTo(i)}
          >
            {label}
          </DotItem>
        ))}
      </SectionDots>

      {/* Scroll hint */}
      <ScrollHint hidden={currentIdx === TOTAL - 1}>
        <ScrollHintSpan>Scroll</ScrollHintSpan>
        <ArrowR />
      </ScrollHint>

      {/* Horizontal scroll container */}
      <HScroll ref={hscrollRef}>

        {/* Section 1 — What's Next */}
        <S1 ref={el => { sectionRefs.current[0] = el; }}>
          <S1Grid>
            <S1Left>
              <S1Eyebrow className="reveal-h">Brownworks / Ignition</S1Eyebrow>
              <S1Heading className="reveal-h rd1">What is our<br />core value?</S1Heading>
              <S1Body className="reveal-h rd2">
                Create. Extraordinary. Our comprehensive services streamline strategy consulting,
                creative, PR, digital, social and paid media into a one stop shop for your growth.
                Seamlessly aligned to make your vision come to reality.
              </S1Body>
            </S1Left>
            <S1Right>
              <S1ImgTop
                className="img-reveal"
                src="https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&q=80&auto=format&fit=crop"
                alt=""
              />
              <S1ImgBottom
                className="img-reveal rd2"
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80&auto=format&fit=crop"
                alt=""
              />
              <S1Watermark>VALUE</S1Watermark>
            </S1Right>
            <S1Divider />
          </S1Grid>
        </S1>

        {/* Section 2 — Discover */}
        <S2 ref={el => { sectionRefs.current[1] = el; }}>
          <S2Layout>
            <S2ImgWrap>
              <S2ImgMain
                className="img-reveal"
                src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80&auto=format&fit=crop&crop=face"
                alt=""
              />
              <S2Watermark>WE</S2Watermark>
            </S2ImgWrap>
            <S2Text>
              <S2Eyebrow className="reveal-h">02 / Discover</S2Eyebrow>
              <S2Heading className="reveal-h rd1">We are Brownworks.</S2Heading>
              <S2Body className="reveal-h rd2">
                Every brand has a story. We begin by understanding your business, your category,
                your culture. We listen, observe, and discover. Until we find the one insight that
                matters and effectively brings your campaign together.
              </S2Body>
              <S2Line className="reveal-h rd3" />
            </S2Text>
          </S2Layout>
        </S2>

        {/* Section 3 — Purpose */}
        <S3 ref={el => { sectionRefs.current[2] = el; }}>
          <S3Layout>
            <S3ImgSide>
              <S3ImgMain
                className="img-reveal"
                src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&q=80&auto=format&fit=crop"
                alt=""
              />
            </S3ImgSide>
            <S3Text>
              <S3Eyebrow className="reveal-h">03 / Purpose</S3Eyebrow>
              <S3Heading className="reveal-h rd1">Minimal Vision.</S3Heading>
              <S3Body className="reveal-h rd2">
                Inside every brand is a future waiting to be claimed. The destination isn&apos;t
                just the goal, it&apos;s the harmony between who you are and who you&apos;re meant
                to become. To achieve the destination, we align the discovery of your brand with
                the heights it must reach. What emerges is a bold vision, one that drives growth
                now, and guides what&apos;s next.
              </S3Body>
            </S3Text>
            <S3Watermark>PURPOSE</S3Watermark>
            <S3AccentBlock />
          </S3Layout>
        </S3>

        {/* Section 4 — Catalyst */}
        <S4 ref={el => { sectionRefs.current[3] = el; }}>
          <S4Layout>
            <S4Text>
              <S4Eyebrow className="reveal-h">04 / Catalyst</S4Eyebrow>
              <S4Heading className="reveal-h rd1">Accelerate<br />growth.</S4Heading>
              <S4Body className="reveal-h rd2">
                More than a campaign, we ignite your brand&apos;s awareness enabling the right
                audience to discover your business to accelerate growth.
              </S4Body>
              <S4Line className="reveal-h rd3" />
            </S4Text>
            <S4ImgWrap>
              <S4ImgMain
                className="img-reveal"
                src="https://images.unsplash.com/photo-1476973422084-e0fa29f6c5a4?w=800&q=80&auto=format&fit=crop"
                alt=""
              />
              <S4Glow />
            </S4ImgWrap>
          </S4Layout>
          <S4Watermark rising={rising}>CATALYST</S4Watermark>
        </S4>

      </HScroll>
    </>
  );
}
