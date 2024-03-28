export async function shippedProjectData() {
  // hardcode for now
  const projects = [
    {
      projectType: "onboard",
      action: "Build a PCB",
      makerAvatarURL: "https://cloud-aljm24x4q-hack-club-bot.vercel.app/1pxl_20231207_224502865.jpg",
      makerName: "Elliot",
      makerURL: "https://scrapbook.hackclub.com/elliot",
      projectName: "3D Printer Breakout Board",
      projectImageURL: "https://cloud-aljm24x4q-hack-club-bot.vercel.app/0pxl_20231207_224240789__1_.jpg",
    },
    {
      projectType: "sprig",
      action: "Make a game!",
      makerAvatarURL: "https://cloud-cbz7899cq-hack-club-bot.vercel.app/0110492450.png",
      makerName: "hatanuk",
      makerURL: "https://github.com/hackclub/sprig/pull/1534",
      projectName: "Spriggy Road",
      projectImageURL: "https://cloud-16a28htla-hack-club-bot.vercel.app/1img_1093.jpg",
    }
  ]
  return projects
}

// return a list of example YSWS projects
export default async function handler(req, res) {
  const results = await shippedProjectData()

  res.status(200).json(results)
}