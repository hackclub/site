import teamMembers from '../../public/team.json'

export default async function fetchTeam(_req, res) {
  const current = []
  const acknowledged = []

  for (const member of teamMembers) {
    for (const department of member.Department) {
      const currentmember = {
        name: member.Name,
        bio: member.Bio || null,
        department: department,
        role: member.Role,
        bio_hackfoundation: null,
        pronouns: null,
        slack_id: member['Slack ID'] || null,
        slack_display_name: '',
        avatar: member['Override Avatar'] || null,
        avatar_id: '',
        email: member.Email || null,
        website: member.Website || null
      }

      if (process.env.SLACK_API_TOKEN) {
        const slackData = await fetch(
          `https://hackclub.slack.com/api/users.profile.get?user=${member['Slack ID']}`,
          {
            method: 'POST',
            headers: {
              'content-type': 'multipart/form-data; boundary=----orpheus',
              cookie: process.env.SLACK_API_COOKIE
            },
            body: `------orpheus\r\nContent-Disposition: form-data; name=\"token\"\r\n\r\n${process.env.SLACK_API_TOKEN}\r\n------orpheus\r\nContent-Disposition: form-data; name=\"user\"\r\n\r\n${member['Slack ID']}\r\n------orpheus\r\n`
          }
        ).then(r => r.json())

        if (slackData.ok) {
          if (!currentmember.avatar == null) {
            currentmember.avatar = `https://ca.slack-edge.com/T0266FRGM-${member['Slack ID']}-${slackData.profile.avatar_hash}-128`
          }
          currentmember.pronouns = slackData.profile.pronouns
        }
      }

      if (member.Acknowledged) {
        acknowledged.push(currentmember)
      } else {
        current.push(currentmember)
      }
    }
  }

  res.status(200).json({ current, acknowledged })
}
