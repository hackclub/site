
const raccoonMemes = [
    "https://cloud-mymt66p99-hack-club-bot.vercel.app/0screenshot_2024-05-16_at_00.18.39.png",
    "https://cloud-mymt66p99-hack-club-bot.vercel.app/1screenshot_2024-05-16_at_00.18.23.png",
    "https://cloud-mymt66p99-hack-club-bot.vercel.app/2screenshot_2024-05-16_at_00.18.10.png",
    "https://cloud-mymt66p99-hack-club-bot.vercel.app/3screenshot_2024-05-16_at_00.18.01.png",
    "https://cloud-mymt66p99-hack-club-bot.vercel.app/4screenshot_2024-05-16_at_00.17.47.png",
    "https://cloud-mymt66p99-hack-club-bot.vercel.app/5screenshot_2024-05-16_at_00.17.34.png",
    // "https://cloud-mymt66p99-hack-club-bot.vercel.app/6screenshot_2024-05-16_at_00.17.03.png",
    "https://cloud-mymt66p99-hack-club-bot.vercel.app/7screenshot_2024-05-16_at_00.16.55.png",
    "https://cloud-mymt66p99-hack-club-bot.vercel.app/8screenshot_2024-05-16_at_00.16.47.png",
    "https://cloud-mymt66p99-hack-club-bot.vercel.app/9screenshot_2024-05-16_at_00.16.41.png",
    "https://cloud-15w2altd8-hack-club-bot.vercel.app/063583bc6dfeca75c4fa5b4a9f777de8ac736131f.jpg",
    "https://cloud-15w2altd8-hack-club-bot.vercel.app/423cfcde338b5918beda111113e119aebcbf47c90.jpg",
    "https://cloud-15w2altd8-hack-club-bot.vercel.app/7my-favorite-raccoon-memes-on-insta-v0-rnfh1ut4kpca1.jpg",
    "https://cloud-15w2altd8-hack-club-bot.vercel.app/6eed531fa624a62ad59ff6a3fdce9a3a7_945977333666952908.webp",
    "https://cloud-15w2altd8-hack-club-bot.vercel.app/57e6914854ab1b45f5c1c0ed49ae2165a.jpg",
]

const getMeme = () => {
    return sample(raccoonMemes)
}

window.addEventListener("load", async (e) => {
    const el = document.querySelector("#meme")
    el.src = getMeme()
    el.onclick = () => {
        el.href = getMeme()
    }
})