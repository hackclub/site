import teamMembers from '../../public/team.json'

export async function fetchTeam() {
  const current = []
  const acknowledged = []

  teamMembers.forEach(async member => {
    const currentmember = {
      name: member.Name,
      bio: member.Bio || null,
      department: member.Department,
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
        'https://hackclub.slack.com/api/users.profile.get?user=' +
          record.fields['Slack ID'],
        {
          method: 'POST',
          headers: {
            'content-type': 'multipart/form-data; boundary=----orpheus',
            cookie: process.env.SLACK_API_COOKIE
          },
          body: `------orpheus\r\nContent-Disposition: form-data; name=\"token\"\r\n\r\n${process.env.SLACK_API_TOKEN}\r\n------orpheus\r\nContent-Disposition: form-data; name=\"user\"\r\n\r\n${record.fields['Slack ID']}\r\n------orpheus\r\n`
        }
      ).then(r => r.json())

      if (slackData.ok) {
        if (!currentmember.avatar == null) {
          member.avatar = `https://ca.slack-edge.com/T0266FRGM-${record.fields['Slack ID']}-${slackData.profile.avatar_hash}-128`
        }
        member.pronouns = slackData.profile.pronouns
      }
    }

    if (member['Acknowledged']) {
      acknowledged.push(currentmember)
    } else {
      current.push(currentmember)
    }
  })

  return { current, acknowledged }
}
