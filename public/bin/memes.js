
const raccoonMemes = [
    "https://hc-cdn.hel1.your-objectstorage.com/s/v3/445c10da4d8c63b029f6daa36d704c8e175af321_0screenshot_2024-05-16_at_00.18.39.png",
    "https://hc-cdn.hel1.your-objectstorage.com/s/v3/7d532b0ed5f0f469b4d5461939b1be721bed2ec9_1screenshot_2024-05-16_at_00.18.23.png",
    "https://hc-cdn.hel1.your-objectstorage.com/s/v3/83a3f2a824498ba9fd6b2c72f69d7a8d2f1c8342_2screenshot_2024-05-16_at_00.18.10.png",
    "https://hc-cdn.hel1.your-objectstorage.com/s/v3/0840d92235da48b4813048cc3263764d20920ad7_3screenshot_2024-05-16_at_00.18.01.png",
    "https://hc-cdn.hel1.your-objectstorage.com/s/v3/0ea2acd15aee9534ebaaa18318b9cca2ccf45eff_4screenshot_2024-05-16_at_00.17.47.png",
    "https://hc-cdn.hel1.your-objectstorage.com/s/v3/1054d7b6c931682bbc82e3314fcb7e88a26eeea9_5screenshot_2024-05-16_at_00.17.34.png",
    // "https://hc-cdn.hel1.your-objectstorage.com/s/v3/08356a9c7b640ad84fc2c816355cc5672a2e945e_6screenshot_2024-05-16_at_00.17.03.png",
    "https://hc-cdn.hel1.your-objectstorage.com/s/v3/febbc57bbdf79661462e6cf53406441796854354_7screenshot_2024-05-16_at_00.16.55.png",
    "https://hc-cdn.hel1.your-objectstorage.com/s/v3/6a6bd8056b382b4b6371d82bbcc9e2059f252d09_8screenshot_2024-05-16_at_00.16.47.png",
    "https://hc-cdn.hel1.your-objectstorage.com/s/v3/bd76142080a90d313d23729f68a58fb395a8541a_9screenshot_2024-05-16_at_00.16.41.png",
    "https://hc-cdn.hel1.your-objectstorage.com/s/v3/53a630e4dd2609bba02783062c30b2cb2b7a8afc_063583bc6dfeca75c4fa5b4a9f777de8ac736131f.jpg",
    "https://hc-cdn.hel1.your-objectstorage.com/s/v3/7faf4ab1a594cda5d6b8ca1da37aa2cca414113d_423cfcde338b5918beda111113e119aebcbf47c90.jpg",
    "https://hc-cdn.hel1.your-objectstorage.com/s/v3/6cbd76f077af7801521b751b11267128f8d2c760_7my-favorite-raccoon-memes-on-insta-v0-rnfh1ut4kpca1.jpg",
    "https://cloud-15w2altd8-hack-club-bot.vercel.app/6eed531fa624a62ad59ff6a3fdce9a3a7_945977333666952908.webp",
    "https://hc-cdn.hel1.your-objectstorage.com/s/v3/433c1be4983074afdbf82943cdf6e52526304990_57e6914854ab1b45f5c1c0ed49ae2165a.jpg",
    "https://hc-cdn.hel1.your-objectstorage.com/s/v3/78292d544eca5dbbd1e758b11cc955406a8084bc_0raccoon-nocturnaltrashposts-live-like-every-day-is-trash-day.jpg",
    "https://hc-cdn.hel1.your-objectstorage.com/s/v3/c11da44be9760c87189238cf5ce5e2c4c7bac1e2_1raccoon-memes4.jpg",
    "https://hc-cdn.hel1.your-objectstorage.com/s/v3/a795df7edee3db0d2ee65380052df83c04df5566_2raccoon-memes-instagram-624ae8c78c21d__700.jpg",
    "https://hc-cdn.hel1.your-objectstorage.com/s/v3/a0cc5406d23c495bd16e4f13f4ae38a03fd0f005_371uzrob1zfl._ac_uf1000_1000_ql80_.jpg",
    "https://hc-cdn.hel1.your-objectstorage.com/s/v3/299e3df526c12093f879b0e7b472368cdecffcf2_42629715d15647a5c70d2cbb9ec43b489.jpg",
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