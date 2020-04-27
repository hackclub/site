import { useState, useEffect } from 'react'
import { Card, Label, Input, Button, Checkbox, Textarea } from 'theme-ui'
import fetch from 'isomorphic-unfetch'

const JoinForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [teen, setTeen] = useState(false)
  const [reason, setReason] = useState('')

  const [status, setStatus] = useState('')

  useEffect(() => {
    setTimeout(() => {
      setName('')
      setEmail('')
      setTeen(false)
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
        action="https://v3.hackclub.com/api/join"
        method="post"
        onSubmit={(e) => {
          e.preventDefault()
          fetch('https://v3.hackclub.com/api/join', {
            method: 'POST',
            body: JSON.stringify({ name, email, teen, reason })
          })
            .then((r) => r.json())
            .then((r) => setStatus(r.status))
            .catch((e) => console.error(e))
        }}
      >
        <Label htmlFor="name">
          Full name
          <Input
            name="name"
            placeholder="Fiona Hackworth"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Label>
        <Label htmlFor="email">
          Email address
          <Input
            name="email"
            type="email"
            value={email}
            placeholder="fiona@hackclub.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Label>
        <Label sx={{ flexDirection: 'row !important', alignItems: 'center' }}>
          <Checkbox
            name="teen"
            sx={{ color: 'muted' }}
            checked={teen}
            onChange={(e) => setTeen(e.target.checked)}
          />
          Are you a teenager?
        </Label>
        <Label htmlFor="reason">
          Why do you want to join Hack Club?
          <Textarea
            name="reason"
            placeholder="Write a few sentences."
            variant="forms.input"
            value={reason}
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
            backgroundImage: (theme) => theme.util.gradient('cyan', 'blue')
          }}
          value={status === 'success' ? 'Submitted!' : 'Queue signup'}
        />
      </form>
    </Card>
  )
}

export default JoinForm
