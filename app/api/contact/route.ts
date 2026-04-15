export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, company, phone, message } = body

    if (!name || !email || !message) {
      return Response.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      )
    }

    const scriptUrl = process.env.GOOGLE_SCRIPT_URL
    if (!scriptUrl) {
      console.error('GOOGLE_SCRIPT_URL is not set')
      return Response.json(
        { error: 'Server configuration error.' },
        { status: 500 }
      )
    }

    const res = await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        company: company || '',
        phone: phone || '',
        message,
      }),
    })

    if (!res.ok) {
      const text = await res.text()
      console.error('Google Script error:', text)
      return Response.json(
        { error: 'Failed to save data.' },
        { status: 502 }
      )
    }

    return Response.json({ success: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return Response.json(
      { error: 'Internal server error.' },
      { status: 500 }
    )
  }
}
