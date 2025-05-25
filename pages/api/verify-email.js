import crypto from 'crypto';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { name, email, signature } = req.query;
    const secretKey = process.env.HAPPENINGS_SECRET_KEY;
    const loopsToken = process.env.LOOPS_TOKEN;

    if (!name || !email || !signature) {
        return res.status(400).json({ message: 'Missing required parameters (name, email, or signature).' });
    }

    if (!secretKey) {
        console.error('HAPPENINGS_SECRET_KEY is not set for verification.');
        return res.status(500).json({ message: 'Server configuration error.' });
    }

    if (!loopsToken) {
        console.error('LOOPS_TOKEN is not set for verification.');
        return res.status(500).json({ message: 'Server configuration error.' });
    }

    try {
        const dataToVerify = JSON.stringify({ name, email });
        const expectedSignature = crypto
            .createHmac('sha256', secretKey)
            .update(dataToVerify)
            .digest('hex');

        if (crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
            // Signature is valid
            console.log(`Email verification successful for: Name - ${name}, Email - ${email}`);

            const options = {
                method: 'PUT',
                headers: { Authorization: `Bearer ${loopsToken}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email,
                    firstName: name,
                    lastName: "",
                    source: "happenings-homepage",
                    subscribed: true,
                    mailingLists: {
                        "cm7jez861000m0njy8wsn1dxc": true // "Slack Happenings"
                    }
                })
            };

            fetch('https://app.loops.so/api/v1/contacts/update', options)
                .then(response => response.json())
                .then(response => console.log(response))
                .catch(err => console.error(err));

            return res.redirect(302, '/email-verified');
        } else {
            // Signature is invalid
            console.warn(`Invalid signature attempt for: Name - ${name}, Email - ${email}`);
            return res.status(400).json({ message: 'Invalid or tampered verification link.' });
        }
    } catch (error) {
        console.error('Error during email verification:', error);
        return res.status(500).json({ message: 'Error during email verification.' });
    }
} 