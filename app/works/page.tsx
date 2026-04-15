'use client'

import styled from '@emotion/styled'
import { keyframes, Global, css } from '@emotion/react'
import Link from 'next/link'

const globalStyles = css`
  html, body {
    height: 100%;
    overflow: hidden;
    background: #1a1614;
    font-family: var(--font-nunito-sans), sans-serif;
    color: #f0ebe2;
    -webkit-font-smoothing: antialiased;
  }
`

// ─── Keyframes ────────────────────────────────────────────────────────────────
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`

const hexPulse = keyframes`
  0%, 100% { opacity: .5; transform: scale(1); }
  50%       { opacity: .8; transform: scale(1.03); }
`

// ─── CSS variables ────────────────────────────────────────────────────────────
const vars = {
  cream: '#f0ebe2',
  caramel: '#c8923e',
  bg: '#1a1614',
}

// ─── Page ─────────────────────────────────────────────────────────────────────
const Page = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`

// ─── Top nav ──────────────────────────────────────────────────────────────────
const TopNav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.6rem clamp(2rem, 4vw, 3.5rem);
`

const TopNavLogo = styled.div`
  font-family: var(--font-nunito-sans), sans-serif;
  font-weight: 700;
  font-size: 1.1rem;
  color: ${vars.cream};
  letter-spacing: -.01em;
  opacity: .7;
`

const TopNavBack = styled(Link)`
  font-family: var(--font-nunito-sans), sans-serif;
  font-size: .7rem;
  letter-spacing: .15em;
  text-transform: uppercase;
  color: rgba(240,235,226,.4);
  display: flex;
  align-items: center;
  gap: .5rem;
  transition: color .3s;
  cursor: pointer;
  text-decoration: none;

  &:hover { color: ${vars.cream}; }
`

// ─── Honeycomb background ──────────────────────────────────────────────────────
const HoneycombBg = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`

const HexGrid = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
`

const HexRow = styled.div<{ $offset?: boolean }>`
  display: flex;
  gap: 6px;
  margin-left: ${({ $offset }) => ($offset ? 'calc(55px + 3px)' : '0')};

  @media (max-width: 768px) {
    margin-left: ${({ $offset }) => ($offset ? 'calc(35px + 3px)' : '0')};
  }
`

const HexCell = styled.div<{ $empty?: boolean }>`
  width: 110px;
  height: 120px;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: transform .4s cubic-bezier(.4,0,.2,1), filter .4s;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    background: ${({ $empty }) =>
      $empty
        ? 'linear-gradient(135deg, rgba(200,146,62,.06), rgba(61,18,16,.08))'
        : 'linear-gradient(135deg, rgba(200,146,62,.15), rgba(171,120,67,.08))'};
    z-index: 1;
    transition: background .4s;
  }

  &::after {
    content: 'Coming Soon';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(.8);
    font-family: var(--font-nunito-sans), sans-serif;
    font-size: .5rem;
    letter-spacing: .15em;
    text-transform: uppercase;
    color: rgba(240,235,226,.5);
    background: rgba(26,22,20,.7);
    padding: .3rem .6rem;
    border-radius: 2px;
    z-index: 3;
    opacity: 0;
    transition: opacity .3s, transform .3s;
    white-space: nowrap;
    pointer-events: none;
  }

  &:hover {
    transform: scale(1.08);
    z-index: 5;
  }
  &:hover::before {
    background: linear-gradient(135deg, rgba(200,146,62,.25), rgba(171,120,67,.15));
  }
  &:hover::after {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }

  @media (max-width: 768px) {
    width: 70px;
    height: 76px;

    &::after { display: none; }
  }
`

const HexImg = styled.div<{ $empty?: boolean; $url?: string }>`
  position: absolute;
  inset: -10px;
  background-size: cover;
  background-position: center;
  background-image: ${({ $url }) => ($url ? `url('${$url}')` : 'none')};
  background-color: ${({ $empty }) => ($empty ? vars.bg : 'transparent')};
  filter: ${({ $empty }) =>
    $empty ? 'brightness(.4)' : 'brightness(.25) saturate(.3)'};
  transition: filter .4s, transform .4s;

  ${HexCell}:hover & {
    filter: ${({ $empty }) =>
      $empty ? 'brightness(.4)' : 'brightness(.35) saturate(.5)'};
    transform: scale(1.05);
  }
`

// ─── Silhouette overlay ────────────────────────────────────────────────────────
const SilhouetteOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 10;
  background: radial-gradient(
    ellipse at center,
    rgba(26,22,20,.5)  0%,
    rgba(26,22,20,.75) 50%,
    rgba(26,22,20,.92) 100%
  );
  pointer-events: none;
`

// ─── Zoom controls ─────────────────────────────────────────────────────────────
const ZoomControls = styled.div`
  position: fixed;
  left: 2rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 30;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: .6rem;

  @media (max-width: 768px) {
    display: none;
  }
`

const ZoomBtn = styled.div`
  width: 30px;
  height: 30px;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  background: rgba(200,146,62,.15);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: .8rem;
  color: rgba(240,235,226,.4);
  cursor: not-allowed;
  transition: background .3s;

  &:hover { background: rgba(200,146,62,.25); }
`

const ZoomTrack = styled.div`
  width: 2px;
  height: 60px;
  background: rgba(240,235,226,.08);
  border-radius: 1px;
`

// ─── Center message ────────────────────────────────────────────────────────────
const CenterMessage = styled.div`
  position: relative;
  z-index: 20;
  text-align: center;
  pointer-events: none;
`

const MsgEyebrow = styled.p`
  font-family: var(--font-nunito-sans), sans-serif;
  font-size: .65rem;
  letter-spacing: .3em;
  text-transform: uppercase;
  color: ${vars.caramel};
  margin-bottom: 1.2rem;
  opacity: .7;
  animation: ${fadeInUp} .8s .2s both;
`

const MsgHexOutline = styled.div`
  width: 180px;
  height: 200px;
  margin: 0 auto 2rem;
  position: relative;
  animation: ${fadeInUp} .8s .4s both;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    border: 1px solid rgba(200,146,62,.2);
    background: transparent;
  }
`

const MsgHexBorder = styled.div`
  position: absolute;
  inset: 0;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  background: rgba(200,146,62,.08);
  animation: ${hexPulse} 4s ease-in-out infinite;
`

const MsgHexInner = styled.div`
  position: absolute;
  inset: 3px;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  background: rgba(26,22,20,.9);
  display: flex;
  align-items: center;
  justify-content: center;
`

const HexIcon = styled.span`
  font-family: var(--font-cormorant-garamond), Georgia, serif;
  font-size: 1.8rem;
  color: ${vars.caramel};
  opacity: .5;
`

const MsgTitle = styled.h1`
  font-family: var(--font-cormorant-garamond), Georgia, serif;
  font-size: clamp(4rem, 10vw, 9rem);
  font-weight: 500;
  color: ${vars.cream};
  letter-spacing: .04em;
  line-height: .9;
  margin-bottom: 1rem;
  text-shadow: 0 4px 40px rgba(0,0,0,.4);
  animation: ${fadeInUp} .8s .6s both;
`

const MsgSubtitle = styled.p`
  font-family: var(--font-cormorant-garamond), Georgia, serif;
  font-size: clamp(1.2rem, 2.2vw, 2rem);
  font-weight: 300;
  font-style: italic;
  color: rgba(200,146,62,.6);
  margin-bottom: 2rem;
  animation: ${fadeInUp} .8s .8s both;
`

const MsgBody = styled.p`
  font-family: var(--font-nunito-sans), sans-serif;
  font-size: .82rem;
  line-height: 1.8;
  color: rgba(240,235,226,.35);
  max-width: 380px;
  margin: 0 auto;
  font-weight: 300;
  animation: ${fadeInUp} .8s 1s both;
`

const MsgLine = styled.div`
  width: 50px;
  height: 1px;
  background: ${vars.caramel};
  margin: 2rem auto 0;
  opacity: .4;
  animation: ${fadeInUp} .8s 1.2s both;
`

// ─── Hex grid data ─────────────────────────────────────────────────────────────
type HexRowData = Array<{ empty?: true; url?: string }>

const HEX_ROWS: HexRowData[] = [
  // Row 1
  [
    { url: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&q=60&auto=format&fit=crop' },
    { empty: true },
    { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=300&q=60&auto=format&fit=crop' },
    { empty: true },
    { url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&q=60&auto=format&fit=crop' },
    { empty: true },
    { url: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=300&q=60&auto=format&fit=crop' },
    { empty: true },
  ],
  // Row 2 (offset)
  [
    { empty: true },
    { url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=300&q=60&auto=format&fit=crop' },
    { empty: true },
    { url: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=300&q=60&auto=format&fit=crop' },
    { empty: true },
    { url: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=300&q=60&auto=format&fit=crop' },
    { empty: true },
    { url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=300&q=60&auto=format&fit=crop' },
  ],
  // Row 3
  [
    { url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300&q=60&auto=format&fit=crop' },
    { empty: true },
    { url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=300&q=60&auto=format&fit=crop' },
    { empty: true },
    { url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=300&q=60&auto=format&fit=crop' },
    { empty: true },
    { url: 'https://images.unsplash.com/photo-1493421419110-74f4e85ba126?w=300&q=60&auto=format&fit=crop' },
    { empty: true },
  ],
  // Row 4 (offset)
  [
    { empty: true },
    { url: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=300&q=60&auto=format&fit=crop' },
    { empty: true },
    { url: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=300&q=60&auto=format&fit=crop' },
    { empty: true },
    { url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=300&q=60&auto=format&fit=crop' },
    { empty: true },
    { url: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=300&q=60&auto=format&fit=crop' },
  ],
  // Row 5
  [
    { empty: true },
    { url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=300&q=60&auto=format&fit=crop' },
    { empty: true },
    { url: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=300&q=60&auto=format&fit=crop' },
    { empty: true },
    { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300&q=60&auto=format&fit=crop' },
    { empty: true },
    { url: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=300&q=60&auto=format&fit=crop' },
  ],
]

const OFFSET_ROWS = new Set([1, 3]) // 0-indexed rows that are offset

// ─── Component ────────────────────────────────────────────────────────────────
export default function WorksPage() {
  return (
    <>
      <Global styles={globalStyles} />
      {/* Top nav */}
      <TopNav>
        <TopNavBack href="/"><span>←</span> Back</TopNavBack>
        <TopNavLogo>brownworks</TopNavLogo>
      </TopNav>

      {/* Full page */}
      <Page>
        {/* Honeycomb grid background */}
        <HoneycombBg>
          <HexGrid>
            {HEX_ROWS.map((row, rowIdx) => (
              <HexRow key={rowIdx} $offset={OFFSET_ROWS.has(rowIdx)}>
                {row.map((cell, cellIdx) => (
                  <HexCell key={cellIdx} $empty={cell.empty}>
                    <HexImg $empty={cell.empty} $url={cell.url} />
                  </HexCell>
                ))}
              </HexRow>
            ))}
          </HexGrid>
        </HoneycombBg>

        {/* Dark silhouette overlay */}
        <SilhouetteOverlay />

        {/* Zoom controls (decorative) */}
        <ZoomControls>
          <ZoomBtn>+</ZoomBtn>
          <ZoomTrack />
          <ZoomBtn>−</ZoomBtn>
        </ZoomControls>

        {/* Center message */}
        <CenterMessage>
          <MsgEyebrow>Works</MsgEyebrow>
          <MsgHexOutline>
            <MsgHexBorder />
            <MsgHexInner>
              <HexIcon>✦</HexIcon>
            </MsgHexInner>
          </MsgHexOutline>
          <MsgTitle>Brewing.</MsgTitle>
          <MsgSubtitle>Great things take time.</MsgSubtitle>
          <MsgBody>
            Each cell will reveal our portfolio of campaigns, brand stories, and creative work we are proud to share with you.
          </MsgBody>
          <MsgLine />
        </CenterMessage>
      </Page>
    </>
  )
}
