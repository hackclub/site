import AirtablePlus from 'airtable-plus'

export const shopParts = async () => {
  // Arcade is over, so we're just hardcoding the items here :)

  return [
    {
      'Full Name': 'USB-C Charger (30W)',
      Description:
        'Small, uses the latest GaN technology, & charges fast - pretty sweet!',
      'Fulfillment Description': 'Available US only. \n',
      'Cost Hours': 6,
      Stock: 0,
      id: 'rec0yAytJaSyye10S'
    },
    {
      'Full Name': 'YubiKey ',
      Description: '5C NFC model w/ GitHub logo',
      'Fulfillment Description':
        'Fulfilled by USPS. Customs fees may apply if outside the US.\n',
      'Cost Hours': 12,
      Stock: 801,
      id: 'rec1pCxBpw737NP3I'
    },
    {
      'Full Name': 'Tuxedo pick set + clear training lock',
      'Fulfillment Description':
        'Orders fulfilled by [Sparrows](https://www.sparrowslockpicks.com/pages/about) & can be shipped to anywhere in the US.\n',
      'Cost Hours': 18,
      id: 'rec2ANqg9AUReF4BI'
    },
    {
      'Full Name': 'ThinkPad T490 (14-inch model)',
      Description:
        'Lenovo ThinkPad T490 14-inch - Core i5-8365U - 16 GB - SSD 256 GB. Refurbished.',
      'Fulfillment Description':
        'Available anywhere. Customs fees may apply if outside the US.\n',
      'Cost Hours': 168,
      Stock: 0,
      id: 'rec2c40SBadXg44Dh'
    },
    {
      'Full Name': 'Breadboard + jumper wires',
      'Fulfillment Description':
        'Available in US, IN, EU, CA, SG & AU. Fulfilled by Amazon.\n',
      'Cost Hours': 6,
      id: 'rec3kwLZQjCB84lpT'
    },
    {
      'Full Name': 'Bambu Lab A1 mini',
      'Fulfillment Description':
        'Available in US, CA, SG, MY, TH, NZ, CH, AU, & EU. Shipping provided by Bambu Lab. You can check for [additional supported countries here](https://eu.store.bambulab.com/a/faq).\n',
      'Cost Hours': 135,
      id: 'rec58YSzn7V5x1GPR'
    },
    {
      'Full Name': 'PineTime by PINE64',
      'Fulfillment Description':
        'Shipped by [PINE64](https://pine64.org/devices/pinetime/).\n',
      'Cost Hours': 20,
      id: 'rec5UcxZRGGhq86UJ'
    },
    {
      'Full Name': 'Invertocat Backpack MIIR',
      'Fulfillment Description':
        'Fulfilled by USPS. Customs fees may apply if outside the US.\n',
      'Cost Hours': 85,
      Stock: 0,
      id: 'rec5i2AZtzHAG5znC'
    },
    {
      'Full Name': 'Soldering iron + solder',
      'Fulfillment Description':
        'Available in US, IN, EU, CA, SG & AU. Fulfilled by Amazon.\n',
      'Cost Hours': 8,
      id: 'rec5ssvcMqrSKneac'
    },
    {
      'Full Name': 'Hot glue gun ',
      'Fulfillment Description': 'Fulfilled by Amazon\n',
      'Cost Hours': 8,
      id: 'rec7U980iSfcEMP7Q'
    },
    {
      'Full Name': 'Pile of stickers ',
      Description: "We'll send you 3 random stickers!\n",
      'Fulfillment Description': 'Available anywhere\n',
      'Cost Hours': 1,
      id: 'rec7rzTHzjLa1ZysL'
    },
    {
      'Full Name': 'Framework 16 inch',
      'Fulfillment Description':
        'Available in [specific countries](https://knowledgebase.frame.work/what-countries-and-regions-do-you-ship-to-r1899ikiO). Ships via USPS– customs fees may apply.\n',
      'Cost Hours': 400,
      Stock: 0,
      id: 'rec9cXQSlAJVnfJkv'
    },
    {
      'Full Name': 'Keychron EU/UK K6 Pro',
      'Fulfillment Description': 'Available in EU/UK\n',
      'Cost Hours': 64,
      id: 'recBK6UZL1g1jT5b9'
    },
    {
      'Full Name': 'E-fidgets Made by Micha!',
      'Fulfillment Description': 'Available in US only. \n',
      'Cost Hours': 3,
      id: 'recC0FFWiXXLsgUTB'
    },
    {
      'Full Name': 'GitHub Keycaps x8',
      'Fulfillment Description':
        'Fulfilled by USPS. Customs fees may apply if outside the US.\n',
      'Cost Hours': 15,
      Stock: 0,
      id: 'recCEtkEWr6u8mCfd'
    },
    {
      'Full Name': 'Prusa MINI+',
      'Fulfillment Description':
        'Available in US & EU. Customs fees outside the EU [may apply](https://help.prusa3d.com/article/vat-value-added-tax-customs-fees_1505#orders-outside-eu).\n',
      'Cost Hours': 130,
      id: 'recCeMp5iK7tRpqc3'
    },
    {
      'Full Name': 'Multimeter ',
      'Fulfillment Description':
        'Available in US, IN, EU, CA, SG & AU. Fulfilled by Amazon.\n',
      'Cost Hours': 7,
      id: 'recDJkGhWEU60NmBV'
    },
    {
      'Full Name': 'Flipper Zero',
      'Fulfillment Description':
        'Available in US & EU. Fulfilled by [Flipper Zero](https://shop.flipperzero.one/policies/shipping-policy).\n',
      'Cost Hours': 70,
      id: 'recDmVbngx6NdN6pA'
    },
    {
      'Full Name': 'Digital Ocean credits ',
      Description: "We'll give you $10 worth of DO credits!",
      'Fulfillment Description': 'Available anywhere\n',
      'Cost Hours': 4,
      id: 'recF11YTTS6DRQE7J'
    },
    {
      'Full Name': 'MacBook Air M2',
      'Fulfillment Description':
        'Fulfilled by Apple & available anywhere Apple delivers.\n',
      'Cost Hours': 400,
      Stock: 5,
      id: 'recFT8SlSOxFrG9ha'
    },
    {
      'Full Name': 'Ryobi  Rotary Tool Kit',
      Description:
        'Like Dremel but... better. https://www.ryobitools.com/products/details/3328720530',
      'Fulfillment Description': 'Available US only.\n',
      'Cost Hours': 55,
      id: 'recFYxckk8ays8qZC'
    },
    {
      'Full Name': 'Keychron US K6 Pro',
      'Fulfillment Description': 'Available in US.\n',
      'Cost Hours': 50,
      id: 'recGzOvroho1Dal4u'
    },
    {
      'Full Name': 'Cybertruck (all-wheel drive model)',
      'Fulfillment Description':
        'Available in any country connected by land. Fulfillment through autopilot.\n',
      'Cost Hours': 700,
      Stock: 2,
      id: 'recHMg5RN5mtHB8A3'
    },
    {
      'Full Name': 'OpenAI credits ',
      Description: "We'll give you $10 worth of OpenAI credits!",
      'Fulfillment Description': 'Available anywhere\n',
      'Cost Hours': 4,
      id: 'recJN0RO9obEGqP6e'
    },
    {
      'Full Name': 'Leatherman Skeletool ',
      Description:
        'For those @cwalker cosplayers. https://www.leatherman.com/skeletool-18.html',
      'Fulfillment Description':
        'Orders fulfilled by [Leatherman](https://www.leatherman.com/country-selector.html?hrefkey=hreflang-830845). Available in US, EU, UK\n',
      'Cost Hours': 25,
      id: 'recK0j5EPlWOx2SQq'
    },
    {
      'Full Name': 'Blåhaj ',
      Description:
        'Shark good and soft to hold. Fantastic object! very Squish for hug the shark... with very Soft and Comfort human sleep soundly with blåhaj snuggle. Snuggle Blåhaj Always. no sad feels ever with blåhaj because good Shape and Support for human heart weak of big emotion feels. Ablåhaj yes a friend for a human can trust blåhaj for giveing good love to lonely person. share secrets with shark friend, never tell! most good listener in whole sea and land. Also makes girl better at software engineering. warm soft helpful companion! friend Shark.',
      'Fulfillment Description': 'Fulfilled by IKEA. \n',
      'Cost Hours': 20,
      Stock: 0,
      id: 'recMt0akKwl9F0c3R'
    },
    {
      'Full Name': 'Raspberry Pi Zero 2W Kit',
      Description:
        'The Raspberry Pi Zero 2W comes with a 64 GB micro SD card, USB SD card reader, & power supply.',
      'Fulfillment Description':
        'Available everywhere, but customs fees may apply outside the US.\n',
      'Cost Hours': 15,
      id: 'recOWGBXUReYUoaUp'
    },
    {
      'Full Name': 'Samsung T7 1TB SSD (1,050MB/s, beige)',
      Description: 'Supa dupa fast and rugged portable SSD',
      'Fulfillment Description':
        'Available anywhere. Customs fees may apply if outside the US.\n',
      'Cost Hours': 65,
      Stock: 0,
      id: 'recOx6JaqK3cAvFVV'
    },
    {
      'Full Name': 'Notebook from GitHub',
      Description:
        'A Denik Layflat from the [GitHub Shop](https://www.thegithubshop.com/1455318-00-denik-layflat-notebook)',
      'Fulfillment Description': 'Available in the US.\n',
      'Cost Hours': 5,
      Stock: 0,
      id: 'recPP2L3kPwDYmu0B'
    },
    {
      'Full Name': 'Pinecil ',
      'Fulfillment Description':
        'Fulfilled by USPS. Customs fees may apply if outside the US.\n',
      'Cost Hours': 14,
      id: 'recSXzyxP636j4dee'
    },
    {
      'Full Name': 'Heroku credits ',
      Description: "We'll give you $10 worth of Heroku credits!",
      'Fulfillment Description': 'Available anywhere\n',
      'Cost Hours': 4,
      id: 'recTe3R7FaTq6NEbO'
    },
    {
      'Full Name': 'Logic Analyzer ',
      'Fulfillment Description':
        'Available in US, IN, EU, CA, SG & AU. Fulfilled by Amazon.\n',
      'Cost Hours': 5,
      id: 'recYa7NF3Amqcvf0i'
    },
    {
      'Full Name': 'AirPods Pro ',
      Description:
        '2nd generation with MagSafe Charging Case (USB-C). Refurbished.',
      'Fulfillment Description':
        'Available anywhere. Customs fees may apply if outside the US.\n',
      'Cost Hours': 79,
      Stock: 2,
      id: 'recZkh52txlgw4Et3'
    },
    {
      'Full Name': 'Domain for 1 year',
      'Fulfillment Description':
        'Available in every IP range around or under $10 that allows purchasing from the US, includes shipping and handling /j\n',
      'Cost Hours': 4,
      id: 'reca4tNvbZ6JLTcUH'
    },
    {
      'Full Name':
        '2 Arcade Posters 11x17 inches. Designed by Acon & Krishna. Good for bedroom walls.',
      'Fulfillment Description':
        "Available anywhere. It's unlikely, but a customs fees may apply if outside the US.\n",
      'Cost Hours': 5,
      id: 'recc69ZPhcQRatqBs'
    },
    {
      'Full Name': 'iPad 10th Gen + 1st Gen Apple Pencil',
      Description:
        "Tablet (+ more) & what we wish we'd had for making this project!\n\nThis comes with the 1st gen pencil + a lightning to USB-C converter",
      'Fulfillment Description':
        'Fulfilled by Apple & available anywhere Apple delivers.\n',
      'Cost Hours': 160,
      id: 'rece7XQEjvi9GQj8A'
    },
    {
      'Full Name': 'RTX 3090 (24GB GDDR6)',
      Description: "Founder's Edition. Used.",
      'Fulfillment Description':
        'Available anywhere. Customs fees may apply if outside the US.\n',
      'Cost Hours': 280,
      Stock: 1,
      id: 'recf9KOAzmGmYQkfj'
    },
    {
      'Full Name': 'Framework factory seconds',
      'Fulfillment Description':
        'Available in [specific countries](https://knowledgebase.frame.work/what-countries-and-regions-do-you-ship-to-r1899ikiO). Ships via USPS– customs fees may apply.\n',
      'Cost Hours': 200,
      Stock: 0,
      id: 'reciRscdVv46bC7cf'
    },
    {
      'Full Name': 'Nvidia Tesla P40 GPU (24GB GDDR5)',
      Description:
        "Great for AI stuff, r/LocalLLAMA's favorite GPU! Bad for gaming.",
      'Fulfillment Description':
        'Available anywhere. Customs fees may apply if outside the US.\n',
      'Cost Hours': 90,
      Stock: 0,
      id: 'reciugSIxWJVmWBjG'
    },
    {
      'Full Name': 'Framework 13 inch',
      'Fulfillment Description':
        'Available in [specific countries](https://knowledgebase.frame.work/what-countries-and-regions-do-you-ship-to-r1899ikiO). Ships via USPS– customs fees may apply.\n',
      'Cost Hours': 175,
      Stock: 0,
      id: 'recj3qt349e2KXW6X'
    },
    {
      'Full Name': 'Wacom One display',
      Description: 'Drawing tablet & the exact model we used on this project!',
      'Fulfillment Description':
        'Available in US, EU, CA. Fulfilled by Amazon.\n',
      'Cost Hours': 90,
      id: 'reclyjIns73XfGMZ1'
    },
    {
      'Full Name': 'Wacom Intuos S',
      'Fulfillment Description':
        'Available in US, EU, SG & AU. Fulfilled by Amazon.\n',
      'Cost Hours': 25,
      id: 'recoatqwqCXrsiAoz'
    },
    {
      'Full Name': 'Logitech MX Mechanical',
      'Fulfillment Description':
        'Fulfilled by Logitech. Ships anywhere their site ships to. <https://www.logitech.com/en-us/products/keyboards/mx-mechanical.html> \n',
      'Cost Hours': 75,
      id: 'recrybqL6E6d4tzoe'
    },
    {
      'Full Name': 'Helping hands ',
      'Fulfillment Description': 'Available in US, CA, UK, EU, AU, and SG. \n',
      'Cost Hours': 9,
      id: 'recskR2ZCiCWQPgTy'
    },
    {
      'Full Name': 'Good Sci-Fi Book ',
      Description:
        'Zach Latta, founder of Hack Club, will send you one of his favs. Books are used.',
      'Fulfillment Description': 'Available US only. \n',
      'Cost Hours': 4,
      id: 'recsqHsV34CBTFN2T'
    },
    {
      'Full Name': 'Logitech MX Anywhere 2S (Mouse)',
      'Fulfillment Description':
        'Available anywhere. Customs fees may apply if outside the US.\n',
      'Cost Hours': 25,
      Stock: 0,
      id: 'rectkgw2Vy7fRWxZI'
    },
    {
      'Full Name': 'Quest 3 ',
      'Fulfillment Description':
        'Available in [specific countries](https://www.meta.com/help/orders-and-returns/articles/quest-supported-countries/). Fulfilled by Meta.\n',
      'Cost Hours': 200,
      id: 'recuol7Uk5Z2sjViv'
    },
    {
      'Full Name': 'Sticker of your choice',
      'Fulfillment Description': 'Available anywhere\n',
      'Cost Hours': 2,
      id: 'recvsJVFthUTnozTO'
    },
    {
      'Full Name': 'Anthropic credits ',
      Description: "We'll give you $10 worth of Anthropic credits!",
      'Fulfillment Description': 'Available anywhere\n',
      'Cost Hours': 4,
      id: 'recxFrreATgUZDGJ5'
    },
    {
      'Full Name': 'Ryobi  4 Tool Combo Kit',
      Description: 'https://www.ryobitools.com/products/details/33287200146',
      'Fulfillment Description': 'Available US only. \n',
      'Cost Hours': 55,
      id: 'recy2MfTooxxeNjGG'
    },
    {
      'Full Name': 'One by Wacom',
      Description: 'Available in IN and CA.',
      'Cost Hours': 17,
      id: 'recys5YxOcHru6nRm'
    },
    {
      'Full Name': 'Octocat Plushie',
      'Fulfillment Description':
        'Fulfilled by USPS. Customs fees may apply if outside the US.\n',
      'Cost Hours': 15,
      Stock: 0,
      id: 'reczeivgpqIj7ajA2'
    }
  ]
  // try {
  //   const baseID = "app4kCWulfB02bV8Q"
  //   const shopItemsTable = new AirtablePlus({
  //     apiKey: process.env.AIRTABLE_API_KEY,
  //     baseID,
  //     tableName: "Shop Items"
  //   })
  //   const ordersTable = new AirtablePlus({
  //     apiKey: process.env.AIRTABLE_API_KEY,
  //     baseID,
  //     tableName: "Orders"
  //   })

  //   const records = await shopItemsTable.read()
  //   const newRecordsPromise = records.map(async record => {
  //     const fields = record.fields;
  //     let stock = fields["Stock"]

  //     if (stock && fields["Count of Orders Fulfilled"]) {
  //       stock -= fields["Count of Orders Fulfilled"]
  //     }
  //     return { id: record.id, ...record.fields, "Stock": (stock == null) ? null : (stock >= 0 ? stock : 0) }
  //   })

  //   const newRecords = await Promise.all(newRecordsPromise)

  //   return newRecords
  // } catch (error) {
  //   console.warn(`Failed to fetch Arcade shop items: ${error}. Returning empty props.`)
  //   return []
  // }
}

export default async function handler(req, res) {
  const data = await shopParts()

  const filteredData = data
    .filter(record => record['Enabled'])
    .map(record => {
      return {
        name: record['Name'],
        smallName: record['Small Name'],
        description: record['Description'],
        hours: record['Cost Hours'],
        imageURL: record['Image URL'],
        stock: record['Stock']
      }
    })

  return res.json(filteredData)
}
