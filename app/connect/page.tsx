'use client'

import { useState } from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'
import { keyframes, css, Global } from '@emotion/react'

const titleIn = keyframes`
  from { opacity: 0; transform: translateY(20px) scale(.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
`

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
`

const globalStyles = css`
  html {
    scroll-behavior: smooth;
    overflow-x: hidden;
  }
  body {
    background: #1a1614;
    font-family: var(--font-nunito-sans), sans-serif;
    color: #f0ebe2;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
    max-width: 100vw;
  }
`

const PAD = 'clamp(2.5rem, 6vw, 7rem)'

const TopNav = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  padding: 1.4rem ${PAD};
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const TopNavBack = styled.span`
  font-family: var(--font-nunito-sans), sans-serif;
  font-size: .68rem;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: rgba(60,40,30,.5);
  display: inline-flex;
  align-items: center;
  gap: .4rem;
  transition: color .3s;
  cursor: pointer;
  &:hover { color: #2a2622; }
`

const TopNavLogo = styled.div`
  font-family: var(--font-nunito-sans), sans-serif;
  font-size: .72rem;
  font-weight: 700;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: #3a2820;
  opacity: .4;
`

const Hero = styled.div`
  background: #f0ebe2;
  padding-top: clamp(5rem, 10vh, 8rem);
  padding-left: ${PAD};
  padding-right: ${PAD};
  padding-bottom: 0;
  position: relative;
  z-index: 2;
  overflow: visible;
`

const GiantTitle = styled.div`
  font-family: var(--font-cormorant-garamond), Georgia, serif;
  font-size: clamp(7rem, 18vw, 18rem);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: -.01em;
  line-height: .88;
  text-align: center;
  color: transparent;
  background: linear-gradient(100deg,
    #ff4422 0%, #ff7733 13%, #ffcc22 26%,
    #88dd44 39%, #33cc88 52%, #22aadd 65%,
    #5566ff 78%, #aa44ee 88%, #ff3388 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  user-select: none;
  position: relative;
  z-index: 4;
  margin-bottom: -0.22em;
  display: block;
  animation: ${titleIn} 1s .1s both;
  @media (max-width: 768px) {
    font-size: clamp(3.2rem, 13vw, 7rem);
    margin-bottom: -.18em;
  }
`

const DarkSection = styled.div`
  position: relative;
  min-height: 80vh;
  overflow: hidden;
`

const DarkSectionBg = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  background-image: url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80&auto=format&fit=crop');
  background-size: cover;
  background-position: center 40%;
  filter: brightness(.4) saturate(.55);
`

const DarkSectionFade = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 5rem;
  z-index: 1;
  background: linear-gradient(to bottom, #f0ebe2 0%, transparent 100%);
`

const DarkSectionContent = styled.div`
  position: relative;
  z-index: 2;
  padding-top: clamp(5rem, 10vw, 9rem);
  padding-left: ${PAD};
  padding-right: ${PAD};
  padding-bottom: clamp(3rem, 6vh, 5rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`

const SectionHeadline = styled.p`
  font-family: var(--font-nunito-sans), sans-serif;
  font-size: clamp(.78rem, 1.1vw, 1rem);
  font-weight: 700;
  letter-spacing: .16em;
  text-transform: uppercase;
  color: #f0ebe2;
  margin-bottom: .6rem;
  animation: ${fadeUp} .8s .5s both;
`

const SectionSub = styled.p`
  font-size: clamp(.78rem, .95vw, .9rem);
  line-height: 1.8;
  color: rgba(240,235,226,.5);
  font-weight: 300;
  max-width: 600px;
  margin-bottom: clamp(1.8rem, 3.5vh, 3rem);
  animation: ${fadeUp} .8s .6s both;
  text-align: center;
`

const FormWrap = styled.div`
  max-width: 960px;
  width: 100%;
  animation: ${fadeUp} .8s .7s both;
`

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3.5rem;
  margin-bottom: 2.4rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const FormGroup = styled.div<{ full?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: .35rem;
  ${({ full }) => full && 'grid-column: 1 / -1;'}
`

const FormLabel = styled.label`
  font-size: .6rem;
  letter-spacing: .13em;
  text-transform: uppercase;
  color: rgba(240,235,226,.4);
  font-weight: 600;
`

const FormLabelReq = styled.span`
  color: #c8923e;
`

const FormInput = styled.input`
  background: #ffffff;
  border: none;
  border-left: 3px solid transparent;
  padding: .85rem 1rem;
  color: #1a1614;
  font-family: var(--font-nunito-sans), sans-serif;
  font-size: .85rem;
  font-weight: 500;
  outline: none;
  transition: border-color .25s, box-shadow .25s;
  width: 100%;
  &:focus {
    border-left-color: #c8923e;
    box-shadow: 0 0 0 1px #c8923e;
  }
  &::placeholder {
    color: #c8923e;
    font-weight: 600;
  }
`

const FormTextarea = styled.textarea`
  background: #ffffff;
  border: none;
  border-left: 3px solid transparent;
  padding: .85rem 1rem;
  color: #1a1614;
  font-family: var(--font-nunito-sans), sans-serif;
  font-size: .85rem;
  font-weight: 500;
  outline: none;
  transition: border-color .25s, box-shadow .25s;
  width: 100%;
  min-height: 200px;
  resize: vertical;
  &:focus {
    border-left-color: #c8923e;
    box-shadow: 0 0 0 1px #c8923e;
  }
  &::placeholder {
    color: #c8923e;
    font-weight: 600;
  }
`

const FormHint = styled.span`
  font-size: .55rem;
  color: rgba(240,235,226,.2);
  margin-top: .2rem;
  font-weight: 300;
`

const FormSubmit = styled.button`
  margin-top: 1.4rem;
  background: transparent;
  border: 1.5px solid rgba(240,235,226,.55);
  color: #f0ebe2;
  padding: .75rem 2.2rem;
  font-family: var(--font-nunito-sans), sans-serif;
  font-size: .65rem;
  letter-spacing: .18em;
  text-transform: uppercase;
  font-weight: 700;
  cursor: pointer;
  transition: background .25s, border-color .25s, color .25s;
  display: inline-block;
  &:hover {
    background: #f0ebe2;
    color: #1a1614;
    border-color: #f0ebe2;
  }
`

const FormSuccess = styled.div<{ show: boolean }>`
  display: ${({ show }) => show ? 'block' : 'none'};
  padding: 2rem 0;
`

const FormSuccessH3 = styled.h3`
  font-family: var(--font-cormorant-garamond), Georgia, serif;
  font-size: 2rem;
  font-weight: 500;
  color: #f0ebe2;
  margin-bottom: .6rem;
`

const FormSuccessP = styled.p`
  font-size: .85rem;
  color: rgba(240,235,226,.45);
  font-weight: 300;
`

const InfoBar = styled.div`
  margin-top: clamp(2.5rem, 5vh, 4rem);
  padding-top: 1.5rem;
  border-top: 1px solid rgba(240,235,226,.1);
  display: flex;
  justify-content: center;
  gap: clamp(2rem, 5vw, 5rem);
  max-width: 960px;
  width: 100%;
  animation: ${fadeUp} .8s .85s both;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.2rem;
  }
`

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: .3rem;
  align-items: center;
  text-align: center;
`

const InfoLabel = styled.span`
  font-size: .55rem;
  letter-spacing: .16em;
  text-transform: uppercase;
  color: rgba(240,235,226,.25);
  font-weight: 600;
`

const InfoValue = styled.span`
  font-size: .82rem;
  color: rgba(240,235,226,.55);
  font-weight: 300;
  line-height: 1.65;
  a {
    color: #c8923e;
    transition: opacity .3s;
    &:hover { opacity: .7; }
  }
`

const Footer = styled.div`
  position: relative;
  z-index: 2;
  padding: 1.2rem ${PAD};
  text-align: center;
  background: #111010;
`

const FooterText = styled.span`
  font-size: .52rem;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: rgba(240,235,226,.12);
`

interface FormData {
  name: string
  email: string
  company: string
  phone: string
  message: string
}

export default function ConnectPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
  })
  const [showForm, setShowForm] = useState(true)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const { name, email, company, phone, message } = formData
    const subject = encodeURIComponent('Inquiry from ' + name + ' via Brownworks Website')
    const body = encodeURIComponent(
      'Name: ' + name + '\n' +
      'Email: ' + email + '\n' +
      'Company: ' + (company || 'Not provided') + '\n' +
      'Phone: ' + (phone || 'Not provided') + '\n\n' +
      'Message:\n' + message
    )
    window.location.href = 'mailto:info@brownworks.co.kr?subject=' + subject + '&body=' + body
    setShowForm(false)
    setShowSuccess(true)
  }

  return (
    <div>
      <Global styles={globalStyles} />

      <TopNav>
        <Link href="/">
          <TopNavBack><span>←</span> Back</TopNavBack>
        </Link>
        <TopNavLogo>Brownworks</TopNavLogo>
      </TopNav>

      <Hero>
        <GiantTitle>Connect</GiantTitle>
      </Hero>

      <DarkSection>
        <DarkSectionBg />
        <DarkSectionFade />

        <DarkSectionContent>
          <SectionHeadline>We'd love to hear from you.</SectionHeadline>
          <SectionSub>
            Whether you have a project in mind, a question about our work, or simply want to start a conversation — reach out and let's explore what we can build together.
          </SectionSub>

          <FormWrap>
            {showForm && (
              <form onSubmit={handleSubmit}>
                <FormRow>
                  <FormGroup>
                    <FormLabel>Name <FormLabelReq>*</FormLabelReq></FormLabel>
                    <FormInput
                      type="text"
                      name="name"
                      placeholder="Name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Email <FormLabelReq>*</FormLabelReq></FormLabel>
                    <FormInput
                      type="email"
                      name="email"
                      placeholder="Email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </FormGroup>
                </FormRow>
                <FormRow>
                  <FormGroup>
                    <FormLabel>Company</FormLabel>
                    <FormInput
                      type="text"
                      name="company"
                      placeholder="Company"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Phone</FormLabel>
                    <FormInput
                      type="tel"
                      name="phone"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </FormGroup>
                </FormRow>
                <FormRow>
                  <FormGroup full>
                    <FormLabel>Message <FormLabelReq>*</FormLabelReq></FormLabel>
                    <FormTextarea
                      name="message"
                      placeholder="Message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                    />
                    <FormHint>4000 max characters</FormHint>
                  </FormGroup>
                </FormRow>
                <FormSubmit type="submit">Submit</FormSubmit>
              </form>
            )}

            <FormSuccess show={showSuccess}>
              <FormSuccessH3>Message Sent</FormSuccessH3>
              <FormSuccessP>Thank you for reaching out. We'll be in touch soon.</FormSuccessP>
            </FormSuccess>
          </FormWrap>

          <InfoBar>
            <InfoItem>
              <InfoLabel>Email</InfoLabel>
              <InfoValue>
                <a href="mailto:info@brownworks.co.kr">info@brownworks.co.kr</a>
              </InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Location</InfoLabel>
              <InfoValue>
                21F Trade Tower, 511 Yeongdong-daero<br />
                Samseong-dong, Gangnam-gu, Seoul 06164<br />
                South Korea
              </InfoValue>
            </InfoItem>
          </InfoBar>
        </DarkSectionContent>
      </DarkSection>

      <Footer>
        <FooterText>Brownworks &copy; 2026</FooterText>
      </Footer>
    </div>
  )
}
