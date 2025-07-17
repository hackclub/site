const projects = [
  {
    title: 'Putting the “You” in CPU.',
    description:
      'Curious exactly what happens when you run a program on your computer? Read this article to learn how multiprocessing works, what system calls really are, how computers manage memory with hardware interrupts, and how Linux loads executables.',
    img: 'bci',
    color: ['#ec3750', '#F58695'],
    link: 'https://cpu.land/',
    itemId: 0
  },
  {
    title: 'DoomPDF.',
    description:
      'A port of Doom (1993) that runs inside a PDF file.',
    img: 'burrow',
    link:'https://github.com/ading2210/doompdf',
    color: ['#f1c40f', '#FAE078'],
    itemId: 1
  },
  {
    title: 'Free compute infrastructure.',
    description:
      "The team behind Nest is building a free compute infrastructure for high schoolers to run their code on. It's like AWS, but free and for students.",
    img: 'nest',
    link: 'https://hackclub.app/',
    color: ['#33d6a6', '#51F5C5'],
    itemId: 2
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
