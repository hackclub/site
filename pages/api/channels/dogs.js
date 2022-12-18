export default async function handler(req, res) {
  // returns a url_private for the latest image posted in #dogs
  const fileList = await fetch(
    `https://slack.com/api/files.list?token=${process.env.SLACK_BOT_TOKEN}&channel=CDJV1CXC2&count=1`
  )
    .then(r => r.json())
    .catch(err => res.status(400).send(err))

  const file = fileList.files
    ? fileList.files[0].url_private
    : 'https://files.slack.com/files-pri/T0266FRGM-F01DYH13S1X/image_from_ios.jpg?pub_secret=132dcdb6ab'
  res.redirect(file)
}
