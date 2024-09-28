import AirtablePlus from 'airtable-plus'

const airtable = new AirtablePlus({
    baseID: 'app79wD9AFys1NMUp',
    apiKey: process.env.AIRTABLE_API_KEY,
    tableName: 'Current copy',
})

const cache = {
    refreshed_at: 0,
    current: [],
    acknowledged: []
};

export async function fetchTeam() {
    if ((cache.refreshed_at + (5 * 60 * 1000)) >= Date.now()) {
        return cache
    }

    const records = await airtable.read();
    const current = [];
    const acknowledged = [];

    for (let record of records.sort((a, b) => a.fields['Order'] - b.fields['Order'])) {
        const member = {
            name: record.fields["Name"],
            bio: record.fields["Bio"] || null,
            department: record.fields["Department"],
            role: record.fields["Role"],
            bio_hackfoundation: null,
            pronouns: null,
            slack_id: record.fields["Slack ID"] || null,
            slack_display_name: "",
            avatar: null,
            avatar_id: "",
            email: record.fields["Email"] || null,
            website: record.fields["Website"] || null,
        }

        if (process.env.SLACK_API_TOKEN) {
            const slackData = await fetch(
                'https://hackclub.slack.com/api/users.profile.get',
                {
                    method: 'POST',
                    body: `--orpheus\r\nContent-Disposition: form-data; name="token"\r\n\r\n${process.env.SLACK_API_TOKEN}\r\n--orpheus\r\nContent-Disposition: form-data; name="user"\r\n\r\n${record.fields["Slack ID"]}\r\n--orpheus\r\nContent-Disposition: form-data;`,
                    headers: {
                        'content-type': 'multipart/form-data; boundary=orpheus',
                    }
                }
            ).then(r => r.json());

            if (slackData.ok) {
                if (record.fields["Override Avatar"]) {
                    member.avatar = record.fields["Override Avatar"][0].thumbnails.large.url
                } else if (process.env.SLACK_API_TOKEN) {
                    member.avatar = `https://ca.slack-edge.com/T0266FRGM-${record.fields["Slack ID"]}-${slackData.profile.avatar_hash}-128`
                }
                member.pronouns = slackData.profile.pronouns
                if (slackData.profile.fields['Xf5LNGS86L']?.value) {
                    member.website = slackData.profile.fields['Xf5LNGS86L'].value
                }
            }
        }

        if (record.fields["Acknowledged"]) {
            acknowledged.push(member)
        } else {
            current.push(member)
        }
    }

    cache.current = current;
    cache.acknowledged = acknowledged;

    cache.refreshed_at = Date.now();

    return {
        current,
        acknowledged
    }
}

export default async function handler(req, res) {
    const team = await fetchTeam()

    res.status(200).json({
        refreshed_at: cache.refreshed_at,
        ...team
    });
}
