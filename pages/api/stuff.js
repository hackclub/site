import FormData from 'form-data'

export default async function stuff(req, res) {
  const formData = new FormData()

  formData.append(
    'token',
    'xoxc-2210535565-1329510668482-3738018363764-a06090b7e70cef57099ae10c6d18f80013869ef9be48fcc389e5a40c90df2624'
  )
  formData.append('date_range', '30d')

  const data = await fetch(
    'https://hackclub.slack.com/api/team.stats.timeSeries',
    {
      method: 'POST',
      body: formData,
      headers: {
        Cookie:
          'd=xoxd-52SpoJa3LK%2BF%2FZA3OwTuxIhUHfsXCx%2Fq1hpcu1VdiH2OUhPuonSeXAYYGJefTNiJUZE8SjAIEfASlHsdYHeGkg%2FFZ584%2B7JbekY8Mz%2FbOEgEJxhGjRW7miVyqQvbPq3oQlSfwNoXb507TnD5VYOCLYUh3OuK2tc2GnfwC0MgPl9ZsAoDc1caaA%3D%3D'
      }
    }
  ).then(r => r.json())

  res.json(data.stats.sort((a, b) => a.ds - b.ds).reverse()[0])
}
