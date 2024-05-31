async function yap(text, {
  letterCallback = () => {},
  endCallback = () => {},
  baseRate = 1.9,
  rateVariance = 0.50,
  volume = 0.50
}) {
  const yap_sounds = {
    // these sounds and most of the yapping code are adapted from https://github.com/equalo-official/animalese-generator
    a: new Howl({ src: '/bin/yapping/a.wav', volume }),
    b: new Howl({ src: '/bin/yapping/b.wav', volume }),
    c: new Howl({ src: '/bin/yapping/c.wav', volume }),
    d: new Howl({ src: '/bin/yapping/d.wav', volume }),
    e: new Howl({ src: '/bin/yapping/e.wav', volume }),
    f: new Howl({ src: '/bin/yapping/f.wav', volume }),
    g: new Howl({ src: '/bin/yapping/g.wav', volume }),
    h: new Howl({ src: '/bin/yapping/h.wav', volume }),
    i: new Howl({ src: '/bin/yapping/i.wav', volume }),
    j: new Howl({ src: '/bin/yapping/j.wav', volume }),
    k: new Howl({ src: '/bin/yapping/k.wav', volume }),
    l: new Howl({ src: '/bin/yapping/l.wav', volume }),
    m: new Howl({ src: '/bin/yapping/m.wav', volume }),
    n: new Howl({ src: '/bin/yapping/n.wav', volume }),
    o: new Howl({ src: '/bin/yapping/o.wav', volume }),
    p: new Howl({ src: '/bin/yapping/p.wav', volume }),
    q: new Howl({ src: '/bin/yapping/q.wav', volume }),
    r: new Howl({ src: '/bin/yapping/r.wav', volume }),
    s: new Howl({ src: '/bin/yapping/s.wav', volume }),
    t: new Howl({ src: '/bin/yapping/t.wav', volume }),
    u: new Howl({ src: '/bin/yapping/u.wav', volume }),
    v: new Howl({ src: '/bin/yapping/v.wav', volume }),
    w: new Howl({ src: '/bin/yapping/w.wav', volume }),
    x: new Howl({ src: '/bin/yapping/x.wav', volume }),
    y: new Howl({ src: '/bin/yapping/y.wav', volume }),
    z: new Howl({ src: '/bin/yapping/z.wav', volume }),
    th: new Howl({ src: '/bin/yapping/th.wav', volume }),
    sh: new Howl({ src: '/bin/yapping/sh.wav', volume }),
    _: new Howl({ src: '/bin/yapping/_.wav', volume })
  }

  text = text.toLowerCase();
  const yap_queue = [];
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    try {
      if (char === 's' && text[i + 1] === 'h') { // test for 'sh' sound
        yap_queue.push(yap_sounds['sh']);
        continue;
      } else if (char === 't' && text[i + 1] === 'h') { // test for 'th' sound
        yap_queue.push(yap_sounds['th']);
        continue;
      } else if (char === 'h' && (text[i - 1] === 's' || text[i - 1] === 't')) { // test if previous letter was 's' or 't' and current letter is 'h'
        yap_queue.push(yap_sounds['_']);
        continue;
      } else if (char === ',' || char === '?' || char === '.') {
        yap_queue.push(yap_sounds['_']);
        continue;
      } else if (char === text[i - 1]) { // skip repeat letters
        yap_queue.push(yap_sounds['_']);
        continue;
      }
    } catch (e) {
      // who cares. pick up a foot ball
    }
    if (!char.match(/[a-zA-Z.]/)) {
      yap_queue.push(yap_sounds['_'])
      continue; // skip characters that are not letters or periods
    }
    yap_queue.push(yap_sounds[char])
  }

  function next_yap() {
    letterCallback(yap_queue.length)
    if (yap_queue.length === 0) {
      endCallback()
      return
    }
    let noise = yap_queue.shift()
    noise.rate(Math.random() * rateVariance + baseRate)
    noise.once('end', next_yap)
    noise.play()
  }

  next_yap();
}