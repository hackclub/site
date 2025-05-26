
const raccoonMemes = [
    "https://hc-cdn.hel1.your-objectstorage.com/s/v3/d9cd0ec2986a69c60a6463cc05871ee128379461_282_445c10da4d8c63b029f6daa36d704c8e175af321_0screenshot_2024-05-16_at_00.18.39.webp",
    "https://hc-cdn.hel1.your-objectstorage.com/s/v3/47250a8e013f5077012585c0e77124cff16aa43f_283_7d532b0ed5f0f469b4d5461939b1be721bed2ec9_1screenshot_2024-05-16_at_00.18.23.webp",
    "https://hc-cdn.hel1.your-objectstorage.com/s/v3/5e57f24edd5d41627bbabdec9ceb688d75df83e4_284_83a3f2a824498ba9fd6b2c72f69d7a8d2f1c8342_2screenshot_2024-05-16_at_00.18.10.webp",
    "https://hc-cdn.hel1.your-objectstorage.com/s/v3/114d48280190e7a0b616d040de286cb1e0c96ce3_285_0840d92235da48b4813048cc3263764d20920ad7_3screenshot_2024-05-16_at_00.18.01.webp",
    "https://hc-cdn.hel1.your-objectstorage.com/s/v3/4845c9436c65d27d95c96311eff409808cd37520_286_0ea2acd15aee9534ebaaa18318b9cca2ccf45eff_4screenshot_2024-05-16_at_00.17.47.webp",
    "https://hc-cdn.hel1.your-objectstorage.com/s/v3/f2e18b101926a380047346d8b7a3705b0264eb3f_281_1054d7b6c931682bbc82e3314fcb7e88a26eeea9_5screenshot_2024-05-16_at_00.17.34.webp",
    // "https://hc-cdn.hel1.your-objectstorage.com/s/v3/ed2964f7f25e652176d0d372b0d77bc5bc37a86c_287_08356a9c7b640ad84fc2c816355cc5672a2e945e_6screenshot_2024-05-16_at_00.17.03.webp",
    "https://hc-cdn.hel1.your-objectstorage.com/s/v3/11d395c8e3807fd680ced9f9cbb9834383514972_288_febbc57bbdf79661462e6cf53406441796854354_7screenshot_2024-05-16_at_00.16.55.webp",
    "https://hc-cdn.hel1.your-objectstorage.com/s/v3/8569bb0fc71bec018873addd2b995e4c180328e6_289_6a6bd8056b382b4b6371d82bbcc9e2059f252d09_8screenshot_2024-05-16_at_00.16.47.webp",
    "https://hc-cdn.hel1.your-objectstorage.com/s/v3/4c1d235b857e1a8bb8ff1e41d7fc26e416121651_290_bd76142080a90d313d23729f68a58fb395a8541a_9screenshot_2024-05-16_at_00.16.41.webp",
    "https://hc-cdn.hel1.your-objectstorage.com/s/v3/72167bbf3e83a4277ef1a2ba911701bb191d3f40_291_53a630e4dd2609bba02783062c30b2cb2b7a8afc_063583bc6dfeca75c4fa5b4a9f777de8ac736131f.webp",
    "https://hc-cdn.hel1.your-objectstorage.com/s/v3/2e17bac496a8493c229ff47ce1386757e0f18eaf_292_7faf4ab1a594cda5d6b8ca1da37aa2cca414113d_423cfcde338b5918beda111113e119aebcbf47c90.webp",
    "https://hc-cdn.hel1.your-objectstorage.com/s/v3/c0da88e22e5a0cd75dbb305a7a6aca68776f32a3_293_6cbd76f077af7801521b751b11267128f8d2c760_7my-favorite-raccoon-memes-on-insta-v0-rnfh1ut4kpca1.webp",
    "https://cloud-15w2altd8-hack-club-bot.vercel.app/6eed531fa624a62ad59ff6a3fdce9a3a7_945977333666952908.webp",
    "https://hc-cdn.hel1.your-objectstorage.com/s/v3/cf6463ea97e976a887ae57a4c1100bc00eea2ab1_294_433c1be4983074afdbf82943cdf6e52526304990_57e6914854ab1b45f5c1c0ed49ae2165a.webp",
    "https://hc-cdn.hel1.your-objectstorage.com/s/v3/24f71b44d4774690349c9f75d1688990dbf0552d_295_78292d544eca5dbbd1e758b11cc955406a8084bc_0raccoon-nocturnaltrashposts-live-like-every-day-is-trash-day.webp",
    "https://hc-cdn.hel1.your-objectstorage.com/s/v3/86aa7c420ea7954fa0e772e9d0b7da8876b60296_296_c11da44be9760c87189238cf5ce5e2c4c7bac1e2_1raccoon-memes4.webp",
    "https://hc-cdn.hel1.your-objectstorage.com/s/v3/c054f81032c6b40ba2b56067ed3ff5be53bf16ed_297_a795df7edee3db0d2ee65380052df83c04df5566_2raccoon-memes-instagram-624ae8c78c21d__700.webp",
    "https://hc-cdn.hel1.your-objectstorage.com/s/v3/dbcb333f040c8f0652585aa03450e653d810672a_298_a0cc5406d23c495bd16e4f13f4ae38a03fd0f005_371uzrob1zfl._ac_uf1000_1000_ql80_.webp",
    "https://hc-cdn.hel1.your-objectstorage.com/s/v3/fc2e987b6fde397812041719782ece68ce57f72b_299_299e3df526c12093f879b0e7b472368cdecffcf2_42629715d15647a5c70d2cbb9ec43b489.webp",
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