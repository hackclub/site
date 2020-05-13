import AirtablePlus from 'airtable-plus'
import fetch from 'isomorphic-unfetch'
import axios from 'axios'

const joinTable = new AirtablePlus({
  apiKey: process.env.AIRTABLE_API_KEY,
  baseID: 'appaqcJtn33vb59Au',
  tableName: 'Join Requests'
})

export default async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', "*");
  if (req.method === 'POST') {
    const data = JSON.parse(req.body)
    console.log(data)
    console.log(`name: ${data.name}`)
    console.log(`token: ${process.env.SLACK_BOT_TOKEN}`)
    console.log(`AIRTABLE: ${process.env.AIRTABLE_API_KEY}`)

    const exists = await isDuplicate(data.name, data.email, data.reason)
    const empty = await isEmpty(data)

    if (!exists && !empty) {
      await joinTable.create({
        'Full Name': data.name,
        'Email Address': data.email,
        Student: data.teen,
        Reason: data.reason
      })
      if (data.teen) {
        console.log(data)
        let testData = { token: process.env.SLACK_BOT_TOKEN }
        let postData = {
          channel: 'G0147KPNHU0', //G0132DNFE7J
          blocks: [
            {
              "type": "section",
              "text": {
                "type": "mrkdwn",
                "text": "Someone just requested to join the Slack."
              }
            },
            {
              "type": "section",
              "text": {
                "type": "mrkdwn",
                "text": `*Full name:* ${data.name}\n*Email:* ${data.email}\n*Student:* ${data.teen ? 'true' : 'false'}\n*Reason:* ${data.reason}`
              }
            },
            {
              "type": "actions",
              "elements": [
                {
                  "type": "button",
                  "text": {
                    "type": "plain_text",
                    "emoji": true,
                    "text": "Send Invitation"
                  },
                  "style": "primary",
                  "action_id": "invite_member"
                },
                {
                  "type": "button",
                  "text": {
                    "type": "plain_text",
                    "emoji": true,
                    "text": "Deny"
                  },
                  "style": "danger",
                  "action_id": "deny"
                }
              ]
            }
          ]
        }
        fetch('https://slack.com/api/chat.postMessage', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.SLACK_BOT_TOKEN}`
          },
          body: JSON.stringify(postData)
        }).catch(err => console.error(err))
        /*axios.post('https://slack.com/api/chat.postMessage', JSON.stringify(postData), {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.SLACK_BOT_TOKEN}`
          },
        }).then(r => console.log(r)).catch(err => console.error(err))*/
      }
    }
    res.json({ status: 'success' })
  }
}

async function isDuplicate(name, email, reason) {
  reason = reason.replace(`'`, `\\'`)
  const exists = await joinTable.read({
    filterByFormula: `AND({Full Name} = '${name}', {Email Address} = '${email}', Reason = '${reason}')`
  })
  return typeof exists[0] !== 'undefined'
}

function isEmpty(jsonObject) {
  let empty = true
  for (let key of Object.entries(jsonObject)) {
    if (key[1] !== '' && key[0] !== 'teen') {
      empty = false
      break
    }
  }
  return empty
}
