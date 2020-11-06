export default async (req, res) => {
  // returns a url_private for the latest image posted in #dogs

  const fileList = await fetch(`https://slack.com/api/files.list?token=${process.env.SCRAPPY_TOKEN}&channel=CDJV1CXC2&count=1`)
    .then(r => r.json())
    .catch(err => res.status(400).send(err))

  const file = fileList.files[0].url_private
  res.redirect(file)
}
