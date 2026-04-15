'use client'

import styled from '@emotion/styled'
import { Global, css } from '@emotion/react'
import Link from 'next/link'

const globalStyles = css`
  html, body {
    height: 100%;
    overflow: hidden;
    background: #111;
    font-family: var(--font-nunito-sans), sans-serif;
    color: #f0ebe2;
    -webkit-font-smoothing: antialiased;
  }
`

// ─── CSS variables (mirrors :root in original) ───────────────────────────────
const vars = {
  cream: '#f0ebe2',
  brownDark: '#5c2018',
  burgundy: '#8b2520',
  caramel: '#c8923e',
  caramelDrizzle: '#ab7843',
  maroon: '#3d1210',
  bg: '#1a1614',
  fg: '#f0ebe2',
}

// ─── Page ────────────────────────────────────────────────────────────────────
const Page = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(ellipse at 50% 50%, rgba(26,22,20,.95) 0%, #111 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: .025;
    pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }
`

const PageLogo = styled.div`
  position: absolute;
  top: clamp(1.2rem, 2.5vh, 2rem);
  left: clamp(1.5rem, 3vw, 3rem);
  z-index: 10;
  font-family: var(--font-nunito-sans), sans-serif;
  font-weight: 700;
  font-size: 1.3rem;
  color: ${vars.cream};
  letter-spacing: -.01em;
  opacity: .7;
`

// ─── Monitor ──────────────────────────────────────────────────────────────────
const Monitor = styled.div`
  position: relative;
  width: min(88vw, 1100px);
  aspect-ratio: 16 / 10;
  max-height: 72vh;
`

const MonitorBezel = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: #1c1c1c;
  border-radius: 14px;
  padding: 10px;
  box-shadow:
    0 0 0 2px rgba(255,255,255,.05),
    0 20px 60px rgba(0,0,0,.6),
    0 5px 20px rgba(0,0,0,.4),
    inset 0 1px 0 rgba(255,255,255,.06);
`

const MonitorScreen = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  background: #0c0a09;
`

const MonitorChin = styled.div`
  width: 38%;
  margin: 0 auto;
  height: clamp(28px, 4vh, 45px);
  background: linear-gradient(to bottom, #2a2a2a, #1e1e1e);
  border-radius: 0 0 8px 8px;
  position: relative;
  box-shadow: 0 8px 24px rgba(0,0,0,.4);

  &::before {
    content: '';
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translateX(-50%);
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: radial-gradient(circle, #333 40%, #222 100%);
    box-shadow: inset 0 1px 2px rgba(0,0,0,.5);
  }
`

const MonitorStand = styled.div`
  width: 18%;
  height: clamp(40px, 6vh, 65px);
  margin: 0 auto;
  background: linear-gradient(to bottom, #1e1e1e 0%, #252525 50%, #1a1a1a 100%);
  clip-path: polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%);
`

const MonitorBase = styled.div`
  width: 32%;
  height: clamp(6px, 1vh, 10px);
  margin: 0 auto;
  background: linear-gradient(to bottom, #2a2a2a, #1c1c1c);
  border-radius: 0 0 6px 6px;
  box-shadow: 0 4px 16px rgba(0,0,0,.3);
`

// ─── Panels ───────────────────────────────────────────────────────────────────
// The hover interactions require parent-aware selectors:
//   .panels:hover .panel          → shrink all panels
//   .panels .panel:hover          → expand hovered panel
//   .panels:hover .panel:not(:hover) .panel-title → shrink + dim non-hovered titles
// Emotion's nested CSS handles this via the `Panels` wrapper targeting child classNames.

const Panels = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  cursor: pointer;

  /* When any panel is hovered, shrink all */
  &:hover .panel {
    flex: .6;
  }
  /* Expand the hovered panel */
  & .panel:hover {
    flex: 2.5;
  }

  /* ── panel-bg ── */
  &:hover .panel-bg {
    /* default hover state handled per panel */
  }

  /* ── panel-label: dim non-hovered ── */
  &:hover .panel:not(:hover) .panel-label {
    opacity: .2;
    transform: scale(.8);
  }
  &:hover .panel-label {
    font-size: clamp(.5rem, .7vw, .7rem);
    color: rgba(240,235,226,.4);
  }

  /* ── panel-title: base size on hover-active state ── */
  &:hover .panel-title {
    font-size: clamp(1.2rem, 2.2vw, 2.2rem);
    opacity: 1;
  }
  /* Non-hovered panels: title shrinks and dims */
  &:hover .panel:not(:hover) .panel-title {
    transform: scale(.7);
    opacity: .35;
  }

  @media (max-width: 480px) {
    flex-direction: column;

    &:hover .panel { flex: .6; }
    & .panel:hover { flex: 3; }
  }
`

const Panel = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
  transition: flex .6s cubic-bezier(.4,0,.2,1);
  border-right: 1px solid rgba(255,255,255,.04);

  &:last-child { border-right: none; }

  /* Bottom edge glow */
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    z-index: 3;
    background: ${vars.caramel};
    opacity: 0;
    transition: opacity .4s;
  }
  &:hover::after { opacity: .6; }

  @media (max-width: 480px) {
    border-right: none;
    border-bottom: 1px solid rgba(255,255,255,.04);
    &:last-child { border-bottom: none; }
  }
`

const PanelBg = styled.div`
  position: absolute;
  inset: -20px;
  background-size: cover;
  background-position: center;
  transition: transform .8s cubic-bezier(.4,0,.2,1), filter .6s;
  filter: brightness(.35) saturate(.7);

  .panel:hover & {
    transform: scale(1.08);
    filter: brightness(.55) saturate(1);
  }
`

const PanelOverlay = styled.div`
  position: absolute;
  inset: 0;
  transition: opacity .6s;
  z-index: 1;

  .panel:hover & { opacity: .4; }
`

// Overlay color variants per nth-child
const overlayStyles: Record<number, string> = {
  1: 'linear-gradient(to bottom, rgba(92,32,24,.5), rgba(61,18,16,.7))',
  2: 'linear-gradient(to bottom, rgba(139,37,32,.4), rgba(92,32,24,.6))',
  3: 'linear-gradient(to bottom, rgba(200,146,62,.3), rgba(171,120,67,.5))',
  4: 'linear-gradient(to bottom, rgba(61,18,16,.5), rgba(26,22,20,.7))',
  5: 'linear-gradient(to bottom, rgba(139,37,32,.4), rgba(61,18,16,.6))',
}

const PanelContent = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 1.5rem 1rem;
`

const PanelLabel = styled.span`
  font-family: var(--font-nunito-sans), sans-serif;
  font-size: clamp(.42rem, .58vw, .58rem);
  letter-spacing: .25em;
  text-transform: uppercase;
  color: rgba(240,235,226,.25);
  margin-bottom: .5rem;
  transition: color .4s, transform .4s, font-size .4s, opacity .4s;

  .panel:hover & {
    color: ${vars.caramel};
    transform: translateY(-4px);
  }

  @media (max-width: 768px) {
    font-size: .45rem;
  }
`

const PanelTitle = styled.h2`
  font-family: var(--font-cormorant-garamond), Georgia, serif;
  font-size: clamp(1rem, 1.8vw, 1.8rem);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .08em;
  color: #fff;
  text-shadow: 0 2px 20px rgba(0,0,0,.5);
  transition:
    transform .5s cubic-bezier(.4,0,.2,1),
    text-shadow .4s,
    font-size .5s cubic-bezier(.4,0,.2,1),
    opacity .4s;
  line-height: 1.15;
  opacity: .75;

  .panel:hover & {
    transform: scale(1.08);
    text-shadow: 0 4px 30px rgba(200,146,62,.3);
  }

  @media (max-width: 768px) {
    font-size: clamp(.9rem, 3vw, 1.4rem);
  }
`

const PanelLine = styled.div`
  width: 0;
  height: 1px;
  background: ${vars.caramel};
  margin-top: .6rem;
  transition: width .5s .15s cubic-bezier(.4,0,.2,1);

  .panel:hover & {
    width: 40px;
  }
`

// ─── Screen footer ────────────────────────────────────────────────────────────
const ScreenFooter = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 5;
  padding: .5rem 1.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(to top, rgba(12,10,9,.85), transparent);
  pointer-events: none;

  span {
    font-size: clamp(.4rem, .5vw, .5rem);
    letter-spacing: .12em;
    text-transform: uppercase;
    color: rgba(240,235,226,.2);
  }
`

// ─── Panel data ───────────────────────────────────────────────────────────────
const PANELS = [
  {
    label: 'The Spark',
    title: 'Ignition',
    href: '/ignition',
    bg: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&q=80&auto=format&fit=crop',
  },
  {
    label: 'Case Studies',
    title: 'Works',
    href: '/works',
    bg: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80&auto=format&fit=crop',
  },
  {
    label: 'Services',
    title: 'Offerings',
    href: '/offerings',
    bg: 'https://images.unsplash.com/photo-1510797215324-95aa89f43c33?w=800&q=80&auto=format&fit=crop',
  },
  {
    label: 'The Agency',
    titleHtml: 'Our<br>Beliefs',
    title: 'Our Beliefs',
    href: '/beliefs',
    bg: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=80&auto=format&fit=crop',
  },
  {
    label: 'Get In Touch',
    title: 'Connect',
    href: '/connect',
    bg: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800&q=80&auto=format&fit=crop',
  },
]

// ─── Component ────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <Page>
      <Global styles={globalStyles} />
      <PageLogo>brownworks</PageLogo>

      <Monitor>
        <MonitorBezel>
          <MonitorScreen>
            <Panels>
              {PANELS.map((p, i) => (
                <Link key={p.href} href={p.href} style={{ display: 'contents' }}>
                  <Panel className="panel">
                    <PanelBg
                      className="panel-bg"
                      style={{ backgroundImage: `url('${p.bg}')` }}
                    />
                    <PanelOverlay
                      className="panel-overlay"
                      style={{ background: overlayStyles[i + 1] }}
                    />
                    <PanelContent>
                      <PanelLabel className="panel-label">{p.label}</PanelLabel>
                      <PanelTitle
                        className="panel-title"
                        dangerouslySetInnerHTML={
                          p.titleHtml
                            ? { __html: p.titleHtml }
                            : undefined
                        }
                      >
                        {p.titleHtml ? undefined : p.title}
                      </PanelTitle>
                      <PanelLine className="panel-line" />
                    </PanelContent>
                  </Panel>
                </Link>
              ))}
            </Panels>

            <ScreenFooter>
              <span>Brownworks &copy; 2026</span>
              <span>Seoul, South Korea</span>
            </ScreenFooter>
          </MonitorScreen>
        </MonitorBezel>

        <MonitorChin />
        <MonitorStand />
        <MonitorBase />
      </Monitor>
    </Page>
  )
}
