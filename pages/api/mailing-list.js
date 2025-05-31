import crypto from 'crypto';

export default async function submit(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email } = req.body;
  const secretKey = process.env.HAPPENINGS_SECRET_KEY;
  const host = req.headers.host;
  const protocol = req.headers['x-forwarded-proto'] || 'http';
  const appUrl = `${protocol}://${host}`;
  const loopsToken = process.env.LOOPS_TOKEN;

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required.' });
  }

  if (!secretKey) {
    console.error('HAPPENINGS_SECRET_KEY is not set.');
    return res.status(500).json({ message: 'Server configuration error.' });
  }

  if (!loopsToken) {
    console.error('LOOPS_TOKEN is not set.');
    return res.status(500).json({ message: 'Server configuration error.' });
  }

  try {
    const dataToSign = JSON.stringify({ name, email });
    const signature = crypto
      .createHmac('sha256', secretKey)
      .update(dataToSign)
      .digest('hex');

    const verificationLink = `${appUrl}/api/verify-email?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&signature=${signature}`;

    const options = {
      method: 'POST',
      headers: { Authorization: `Bearer ${loopsToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "transactionalId": "cmb2wpr2m0rhbyk0ietwjvczg",
        "email": email,
        "dataVariables": {
          "name": name,
          "verificationLink": verificationLink
        }
      })
    };

    fetch('https://app.loops.so/api/v1/transactional', options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));

    return res.status(200).json({ message: 'Email sent successfully.' });
  } catch (error) {
    console.error('Error generating verification link:', error);
    return res.status(500).json({ message: 'Error generating verification link.' });
  }
} 