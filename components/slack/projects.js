const projects = [
  {
    title: 'Brainwave device for thought-based computer interaction.',
    description:
      "BCI's team organizes in #nest Velit voluptate deserunt consequat. Velit voluptate deserunt consequat.Velit voluptate deserunt consequat.",
    img: 'bci',
    color: ['#ec3750', '#F58695'],
    itemId: 1
  },
  {
    title: 'A free domain service.',
    description:
      'Obl.ong’s team organizes in #oblong Velit voluptate deserunt consequat. Velit voluptate deserunt consequat.Velit voluptate deserunt consequat.',
    img: 'oblong',
    color: ['#ff8c37', '#F2A510']
  },
  {
    title: 'An open source VPN.',
    description:
      "Burrow's team organizes in #burrow Velit voluptate deserunt consequat. Velit voluptate deserunt consequat.Velit voluptate deserunt consequat.",
    img: 'burrow',
    color: ['#f1c40f', '#FAE078']
  },
  {
    title: 'Free compute infrastructure.',
    description:
      "Nest's team organizes in #nest Velit voluptate deserunt consequat. Velit voluptate deserunt consequat.Velit voluptate deserunt consequat.",
    img: 'nest',
    color: ['#33d6a6', '#51F5C5']
  },
  {
    title: 'A chat app and cell phone carrier.',
    description:
      "Nest's team organizes in #nest Velit voluptate deserunt consequat. Velit voluptate deserunt consequat.Velit voluptate deserunt consequat.",
    img: 'purplebubble',
    color: ['#5bc0de', '#88e5f8']
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
