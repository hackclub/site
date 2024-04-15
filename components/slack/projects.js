const projects = [
  {
    title: 'Brainwave device for thought-based computer interaction.',
    description:
      'The team of teens behind Monolith BCI is building both the hardware and software for a brainwave reading device to interact with computers using thoughts',
    img: 'bci',
    color: ['#ec3750', '#F58695'],
    itemId: 0
  },
  {
    title: 'A free domain service.',
    description:
      'The teenage hackers behind Oblong are building a free domain service and non-profit to break down the barriers of entry for building a website.',
    img: 'oblong',
    color: ['#ff8c37', '#F2A510'],
    itemId: 1
  },
  {
    title: 'An open source VPN.',
    description:
      'Lead by an ex-Apple engineer, the team behind Burrow is building an open source VPN to burrow through school firewalls and keep your data safe.',
    img: 'burrow',
    color: ['#f1c40f', '#FAE078'],
    itemId: 2
  },
  {
    title: 'Free compute infrastructure.',
    description:
      "The team behind Nest is building a free compute infrastructure for high schoolers to run their code on. It's like AWS, but free and for students.",
    img: 'nest',
    color: ['#33d6a6', '#51F5C5'],
    itemId: 3
  },
  {
    title: 'A chat app and cell phone carrier.',
    description:
      'The teenage PurpleBubble team are building a private, secure and open source chat app and cell phone carrier',
    img: 'purplebubble',
    color: ['#5bc0de', '#88e5f8'],
    itemId: 4
  }
]

export default projects

/*
Here lies the horizontal scroll menu. It's not currently in use, but it's here if anyone every wants it! - Toby
    const triggerRef = useRef(null)
    gsap.registerPlugin(ScrollTrigger)
  useEffect(() => {
    const sections = gsap.utils.toArray('.project')

    const projects = gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: 'none',
      duration: 1,
      scrollTrigger: {
        trigger: triggerRef.current,
        start: 'top top',
        end: () => '+=' + document.querySelector('.container').offsetWidth,
        scrub: 1.25,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        snap: 0.5 * (1 / (sections.length - 1))
      },
      onUpdate: function () {
        const progress = this.progress()
        if (progress < 1 / 6) {
          setColors(['red', '#F58695'])
        } else if (progress < 2 / 6) {
          setColors(['orange', '#F2A510'])
        } else if (progress < 3 / 6) {
          setColors(['yellow', '#FAE078'])
        } else if (progress < 4 / 6) {
          setColors(['green', '#51F5C5'])
        } else if (progress < 5 / 6) {
          setColors(['cyan', '#88e5f8'])
        } else {
          setColors(['purple', '#d786ff'])
        }
      }
    })
    return () => {
      projects.kill()
    }
  }, [])*/
