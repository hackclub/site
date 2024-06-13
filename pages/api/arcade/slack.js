export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        const data = JSON.parse(req.body);
  
        const response = await fetch('https://8-bit-heart.hackclub.com/slack-invite', {
          body: JSON.stringify({
            email: data.userEmail,
          }),
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.SLACK_KEY}`
          }
        });
  
        if (response.ok) {
          res.json({ status: 'Success', message: 'Invitation sent!' });
        } else {
          const errorData = await response.json();
          res.status(response.status).json({ status: 'error', error: errorData });
        }
      } catch (error) {
        console.error(error);
        res.json({ status: 'Uh oh!', error });
      }
    } else {
      res.status(405).json({ status: 'error', error: 'POST method required' });
    }
  }
  