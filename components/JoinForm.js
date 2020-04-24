import { useState, useEffect } from 'react'
import { Card, Label, Input, Button, Checkbox, Textarea } from 'theme-ui'
import fetch from 'isomorphic-unfetch'

const grad = (theme, from, to) => `radial-gradient(
  ellipse farthest-corner at top left, ${theme.colors[from] || from}, ${
  theme.colors[to] || to
  })`

const JoinForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [hs, setHs] = useState('')
  const [reason, setReason] = useState('')
  const [status, setStatus] = useState('')
  useEffect(() => {
    setTimeout(() => {
      setName('')
      setEmail('')
      setHs('')
      setReason('')
      setStatus('')
    }, 1500)
  }, [status])

  return (
    <Card
      sx={{
        bg: 'rgba(255,255,255,0.875)',
        maxWidth: 'narrow',
        mx: 'auto',
        label: {
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'left',
          fontSize: 2,
          mb: 3
        }
      }}
    >
      <form
        action={`https://auspicious-spring-concavenator.glitch.me/join`}
        method={`post`}
        onSubmit={(e) => {
          e.preventDefault()
          fetch(`https://auspicious-spring-concavenator.glitch.me/join`, {
            method: 'POST',
            body: JSON.stringify({ name, email, hs, reason })
          })
            .then((r) => r.json())
            .then((r) => { setStatus(r.status) })
        }}
      >
        <Label htmlFor="name">
          Full name
            <Input name="name" placeholder="Amanda Hackworth" value={name} onChange={(e) => setName(e.target.value)} />
        </Label>
        <Label htmlFor="email">
          Email address
            <Input
            name="email"
            type="email"
            value={email}
            placeholder="amanda@hackclub.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Label>
        <Label htmlFor="student" sx={{ flexDirection: 'row !important', alignItems: 'center' }}>
          <Checkbox name="student" sx={{ color: 'muted' }} onChange={(e) => setHs(e.target.value)} />
            Are you a high school or college student?
      </Label>
        <Label htmlFor="reason">
          Why do you want to join Hack Club?
            <Textarea
            name="reason"
            placeholder="Write a few sentences."
            variant="forms.input"
            onChange={(e) => setReason(e.target.value)}
            sx={{ boxShadow: 'none !important' }}
          />
        </Label>
        <Button
          as="input"
          type="submit"
          variant="cta"
          sx={{
            py: 2,
            px: 3,
            mt: 3,
            fontSize: 2,
            width: '100%',
            fontFamily: 'inherit',
            backgroundImage: (theme) => grad(theme, 'cyan', 'blue')
          }}
          value={status === 'success' ? 'Signed up!' : 'Request Invitation'}
        />
      </form>
    </Card >
  )
}

export default JoinForm