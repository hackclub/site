import { useEffect, useState, useRef } from 'react'
import { Button, Text, Box, Close, Flex } from 'theme-ui'
import ProjectView from '../../../components/arcade/showcase/project-view'
import SmallView from '../../../components/arcade/showcase/small-view-card'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import JSConfetti from 'js-confetti'

/** @jsxImportSource theme-ui */

// https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/guides/drop-animation.md#skipping-the-drop-animation
function getStyle(style, snapshot) {
  if (!snapshot.isDropAnimating) {
    return style
  }
  return {
    ...style,
    // cannot be 0, but make it super tiny
    transitionDuration: `0.001s`
  }
}

const styled = `
@import url(https://fonts.googleapis.com/css2?family=Slackey&family=Emblema+One&family=Gaegu&display=swap);
body, html {
  overflow-x: hidden;
  color: #35290F;
  }
.slackey {
  font-family: "Slackey", sans-serif;
 }
 .emblema {
    font-family: "Emblema One", system-ui;
 }

 .gaegu {
    font-family: "Gaegu", sans-serif;
 }

 body {
    background-color: #FAEFD6;
 }

@keyframes float {

  from,
  to {
      transform: translate(0%, -37%) rotate(-2deg);
  }

  25% {
      transform: translate(-2%, -40%) rotate(2deg);
  }

  50% {
      transform: translate(0%, -43%) rotate(-1deg);
  }

  75% {
      transform: translate(-1%, -40%) rotate(-1deg);
  }
}

a {
  color: inherit;
}
`

const Loading = () => (
  <div
    sx={{
      width: '100%',
      maxWidth: '1200px',
      margin: 'auto',
      textAlign: 'center'
    }}
  >
    Loading...
  </div>
)

const ErrorMessage = () => (
  <div
    sx={{
      width: '100%',
      maxWidth: '1200px',
      margin: 'auto',
      textAlign: 'center'
    }}
  >
    There was an error loading your project.
  </div>
)

//CREDIT: https://www.joshwcomeau.com/snippets/react-hooks/use-mouse-position/
const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: null, y: null })

  useEffect(() => {
    const updateMousePosition = ev => {
      setMousePosition({ x: ev.clientX, y: ev.clientY })
    }

    window.addEventListener('mousemove', updateMousePosition)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
    }
  }, [])

  return mousePosition
}

const Vote = () => {
  /* test data */
  // let originalProjects = {
  //   voted: true,
  //   cohort: {
  //     id: 'rectAjJ2Lv4dDhUGR'
  //   },
  //   showcases: [
  //     {
  //       id: 'rec4cl4TSvfwwnU6H',
  //       createdTime: '2024-08-14T13:47:49.000Z',
  //       fields: {
  //         Name: 'Blast-off',
  //         'Code Link': 'https://github.com/Ranger-NF/BlastOff',
  //         'Play Link': 'https://ranger-nf.itch.io/blastoff',
  //         Description: 'This is a description',
  //         color: '#14f0cb',
  //         textColor: '#ffffff',
  //         ScreenshotLink:
  //           'https://hc-cdn.hel1.your-objectstorage.com/s/v3/573f60aa94582dc4724fd16d69ec743ba17cd87c_147_1334b3c55573bdde6ca2d7a999f4f027bd4ca7a1_0instagram_profile_downloader.webp',
  //         ReadMeLink:
  //           'https://raw.githubusercontent.com/remarkjs/react-markdown/main/readme.md',
  //         'View link':
  //           'https://hackclub.com/arcade/showcase/project/rec4cl4TSvfwwnU6H'
  //       }
  //     },
  //     {
  //       id: 'recLyu8vD4mmUqYrA',
  //       createdTime: '2024-08-19T17:12:16.000Z',
  //       fields: {
  //         Name: 'Turtle T1 (A rabbit R1 spinoff)',
  //         'Code Link': 'https://github.com/briyandyju09/Turtle-T1',
  //         Description: 'A web based spin off to the not so liked rabbit R1',
  //         color: '#FAEFD6',
  //         ScreenshotLink:
  //           'https://hc-cdn.hel1.your-objectstorage.com/s/v3/40b3c09f0863184b505e10b4f6f7fa148fa83a42_148_e30957a80aa2be357665e20bed26d8be393dbe45_0image-19.webp',
  //         ReadMeLink:
  //           'https://raw.githubusercontent.com/briyandyju09/Turtle-T1/main/README.md',
  //         'View link':
  //           'https://hackclub.com/arcade/showcase/project/recLyu8vD4mmUqYrA'
  //       }
  //     },
  //     {
  //       id: 'recYZd9J9MS4fDuJC',
  //       createdTime: '2024-08-16T22:28:10.000Z',
  //       fields: {
  //         Name: 'peace-and-tranquility',
  //         'Code Link': 'https://github.com/maxwofford/peace-and-tranquility',
  //         'Play Link': 'https://dinosaurbbq.org/',
  //         Description: 'No one is around to help',
  //         color: '#293438',
  //         textColor: '#ffffff',
  //         ScreenshotLink:
  //           'https://hc-cdn.hel1.your-objectstorage.com/s/v3/573f60aa94582dc4724fd16d69ec743ba17cd87c_147_1334b3c55573bdde6ca2d7a999f4f027bd4ca7a1_0instagram_profile_downloader.webp',
  //         ReadMeLink:
  //           'https://raw.githubusercontent.com/remarkjs/react-markdown/main/readme.md',
  //         'View link':
  //           'https://hackclub.com/arcade/showcase/project/recYZd9J9MS4fDuJC'
  //       }
  //     },
  //     {
  //       id: 'reclIN8evh60EH90v',
  //       createdTime: '2024-08-17T05:57:05.000Z',
  //       fields: {
  //         Name: 'site2eeeEEE534',
  //         'Code Link': 'https://github.com/hackclub/site',
  //         'Play Link': 'https://hackclub.com',
  //         Description:
  //           '🌈 The new, new Hack Club website (uses Next.js & Theme UI).',
  //         color: '#68d0f8',
  //         textColor: '#fafafa',
  //         ScreenshotLink:
  //           'https://hc-cdn.hel1.your-objectstorage.com/s/v3/573f60aa94582dc4724fd16d69ec743ba17cd87c_147_1334b3c55573bdde6ca2d7a999f4f027bd4ca7a1_0instagram_profile_downloader.webp',
  //         ReadMeLink:
  //           'https://raw.githubusercontent.com/remarkjs/react-markdown/main/readme.md',
  //         'View link':
  //           'https://hackclub.com/arcade/showcase/project/reclIN8evh60EH90v'
  //       }
  //     },
  //     {
  //       id: 'reclIN8evh60EH2220v',
  //       createdTime: '2024-08-17T05:57:05.000Z',
  //       fields: {
  //         Name: 'site2eeeEEE53344',
  //         'Code Link': 'https://github.com/hackclub/site',
  //         'Play Link': 'https://hackclub.com',
  //         Description:
  //           '🌈 The new, new Hack Club website (uses Next.js & Theme UI).',
  //         color: '#68d0f8',
  //         textColor: '#fafafa',
  //         ScreenshotLink:
  //           'https://hc-cdn.hel1.your-objectstorage.com/s/v3/573f60aa94582dc4724fd16d69ec743ba17cd87c_147_1334b3c55573bdde6ca2d7a999f4f027bd4ca7a1_0instagram_profile_downloader.webp',
  //         ReadMeLink:
  //           'https://raw.githubusercontent.com/remarkjs/react-markdown/main/readme.md',
  //         'View link':
  //           'https://hackclub.com/arcade/showcase/project/reclIN8evh60EH90v'
  //       }
  //     }
  //   ]
  // }
  // originalProjects = originalProjects.showcases

  /* necessary to make drag and drop work */
  const [showUIElements, setShowUIElements] = useState(false)

  /* get projects */
  const [originalProjects, setOriginalProjects] = useState([])
  const [projects, setProjects] = useState(originalProjects)
  const projectCount = originalProjects.length

  /* for showing individual projects */
  const [openProjectId, setOpenProjectId] = useState('')
  const [openProject, setOpenProject] = useState([])

  /* status variables */
  const [loadStatus, setLoadStatus] = useState('loading')
  const [status, setStatus] = useState('loading')
  const [submitStatus, setSubmitStatus] = useState('loading')

  /* collect votes */
  const [creative, setCreative] = useState([])
  const [technical, setTechnical] = useState([])
  const [overall, setOverall] = useState([])
  const [voted, setVoted] = useState(false)
  // const [userId, setUserId] = useState('')

  /* change what is shown on page */
  const [showCreative, setShowCreative] = useState(true)
  const [showTechnical, setShowTechnical] = useState(false)
  const [showOverall, setShowOverall] = useState(false)
  const [endPage, setEndPage] = useState(false)
  const [isButtonActive, setIsButtonActive] = useState(false)
  const [startVote, setStartVote] = useState(false)
  const [startViewProject, setStartViewProject] = useState(false)
  const [currentView, setCurrentView] = useState(0)
  const [showForm, setShowForm] = useState(false)

  /* drag and drop logic */
  const [activeDroppableId, setActiveDroppableId] = useState(null)
  const [activeDroppable, setActiveDroppable] = useState(true)
  const dragItemRef = useRef(null)
  const [votes, setVotes] = useState({})
  /* check if it's loaded */

  useEffect(() => {
    setShowUIElements(true)
  }, [])

  /* load projects */
  const loadProjects = async () => {
    const token = window.localStorage.getItem('arcade.authToken')
    const response = await fetch('/api/arcade/showcase/cohort/active', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).catch(e => {
      console.error(e)
      setLoadStatus('error')
    })
    setLoadStatus('loading')
    const data = await response.json()
    if (data.error) {
      setLoadStatus('error')
      return
    } else {
      setProjects(data.showcases)
      setOriginalProjects(data.showcases)
      setVoted(data.voted)
      // setUserId(data.userId)
      setLoadStatus('success')
    }
  }

  useEffect(async () => {
    loadProjects()
  }, [])

  /* get individual project details */
  const getProjectDetails = async () => {
    const token = window.localStorage.getItem('arcade.authToken')
    setStatus('loading')

    try {
      if (openProjectId) {
        const response = await fetch(
          `/api/arcade/showcase/projects/${openProjectId}/show`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        const data = await response.json()
        console.log(data)
        if (data.error) {
          console.log(data.error)
          setStatus('error')
        } else {
          setOpenProject(data.project)
          setStatus('success')
        }
      }
    } catch (e) {
      console.error(e)
      setStatus('error')
    }
  }

  useEffect(() => {
    getProjectDetails()
  }, [openProjectId])

  const dialogRef = useRef(null)

  // useEffect(() => {
  //   const handleClickOutside = event => {
  //     if (dialogRef.current) {
  //       const rect = dialogRef.current.getBoundingClientRect()

  //       if (
  //         event.clientX < rect.left ||
  //         event.clientX > rect.right ||
  //         event.clientY < rect.top ||
  //         event.clientY > rect.bottom
  //       ) {
  //         dialogRef.current.close()
  //       }
  //     }
  //   }

  //   document.addEventListener('mousedown', handleClickOutside)
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside)
  //   }
  // }, [])

  /* HANDLE DRAG AND DROP LOGIC BELOW*/
  const [mousePosition, setMousePosition] = useState({ x: null, y: null })

  useEffect(() => {
    const updateMousePosition = ev => {
      setMousePosition({ x: ev.clientX, y: ev.clientY })
    }

    window.addEventListener('mousemove', updateMousePosition)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
    }
  }, [])

  const isCursorInsideBoundingBox = (cursorPosition, boundingBox) => {
    const { x, y, width, height } = boundingBox
    return (
      cursorPosition.x >= x &&
      cursorPosition.x <= x + width &&
      cursorPosition.y >= y &&
      cursorPosition.y <= y + height
    )
  }

  const getBoundingBoxes = () => {
    if (typeof document === 'undefined') {
      return []
    }
    const droppableIds = ['votes-1', 'votes-2', 'votes-3', 'votes-4', 'votes-5']

    const boundingBoxes = droppableIds
      .map(id => {
        const element = document.getElementById(id)
        if (element) {
          const rect = element.getBoundingClientRect()
          return {
            id,
            x: rect.left,
            y: rect.top,
            width: rect.width,
            height: rect.height
          }
        }
        return null
      })
      .filter(box => box !== null)

    return boundingBoxes
  }

  const boundingBoxes = getBoundingBoxes()

  // useEffect(() => {
  //   if (dragging) {
  //     console.log("DRAGGING")

  //     let insideVotingBox = false

  //     for (const box of boundingBoxes) {
  //       if (
  //         box.id.startsWith('votes') &&
  //         isCursorInsideBoundingBox(mousePosition, box)
  //       ) {
  //         insideVotingBox = true
  //         if (activeDroppableId != box.id) {
  //           setActiveDroppable(true)
  //           setActiveDroppableId(box.id)
  //         }
  //         break
  //       }
  //     }

  //     // if (!insideVotingBox && activeDroppable) {
  //     //   setActiveDroppable(false)
  //     //   setActiveDroppableId(null)
  //     // }
  //   }
  // }, [mousePosition])

  const onDragUpdate = update => {
    let insideVotingBox = false

    for (const box of boundingBoxes) {
      console.log(mousePosition)
      if (
        box.id.startsWith('votes') &&
        isCursorInsideBoundingBox(mousePosition, box)
      ) {
        insideVotingBox = true
        if (activeDroppableId != box.id) {
          setActiveDroppable(true)
          setActiveDroppableId(box.id)
        }
        break
      } else {
        insideVotingBox = false
      }
    }

    if (!insideVotingBox && activeDroppable) {
      setActiveDroppable(false)
      setActiveDroppableId(null)
    }
  }

  const onDragEnd = result => {
    const { source, destination } = result

    if (!destination) return

    console.log(destination)

    if (destination.droppableId == 'projects') {
      console.log('projects')
      return
    }

    if (activeDroppableId && activeDroppableId.startsWith('votes')) {
      const linkId = result.draggableId
      const voteId = activeDroppableId

      setVotes(prevVotes => {
        const updatedVotes = {
          ...prevVotes,
          [voteId]: linkId
        }

        console.log(updatedVotes)
        const votedProjectIds = Object.values(updatedVotes)

        const updatedProjects = originalProjects.filter(
          project => !votedProjectIds.includes(project.id)
        )

        setProjects(updatedProjects)

        return updatedVotes
      })

      setActiveDroppableId(null)
      setActiveDroppable(false)
    }
  }

  const deleteVote = voteId => {
    setVotes(prevVotes => {
      const updatedVotes = { ...prevVotes }

      delete updatedVotes[voteId]

      const votedProjectIds = Object.values(updatedVotes)

      const updatedProjects = originalProjects.filter(
        project => !votedProjectIds.includes(project.id)
      )

      setProjects(updatedProjects)

      return updatedVotes
    })
  }

  const renderVoteBox = voteId => {
    const linkId = votes[voteId] //checks if it was voted
    const project = originalProjects.find(link => link.id === linkId)

    if (project) {
      return (
        <div
          sx={{
            backgroundColor: '#F6E7C5',
            borderRadius: '10px',
            position: 'relative',
            height: '100%',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Close
            sx={{
              '&:hover': { cursor: 'pointer' },
              position: 'absolute',
              top: '0px',
              right: '0px',
              zIndex: 2,
              color: '#09AFB4'
            }}
            onClick={e => {
              deleteVote(voteId)
            }}
          />
          <Flex
            sx={{
              background: '#09AFB4',
              px: 2,
              py: 1,
              color: '#FAEFD6',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              width: '50px',
              flex: '0 0 50px'
            }}
          >
            <Text variant="subtitle" sx={{ mt: 0 }}>
              {voteId.replace('votes-', '')}
            </Text>
          </Flex>
          <Box sx={{ pl: 3 }}>
            <Text variant="subtitle" as="h3" sx={{ mt: 0, fontWeight: 'bold' }}>
              {project.fields.Name}
            </Text>
            <Text variant="caption" as="p" sx={{ color: '#35290F' }}>
              {project.fields.Description}
            </Text>
          </Box>
        </div>
      )
    }

    return (
      <div
        sx={{
          display: 'flex',
          alignItems: 'center',
          //   justifyContent: 'center',
          height: '100%',
          position: 'relative',
          backgroundColor: '#FAEFD6',
          borderRadius: '10px'
        }}
      >
        <Flex
          sx={{
            background: '#09AFB4',
            px: 2,
            py: 1,
            color: '#FAEFD6',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            width: '50px',
            flex: '0 0 50px'
          }}
        >
          <Text variant="subtitle" sx={{ mt: 0 }}>
            {voteId.replace('votes-', '')}
          </Text>
        </Flex>
        <Text sx={{ display: 'block', textAlign: 'center', width: '100%' }}>
          Drop here
        </Text>
      </div>
    )
  }

  /* VOTE SUBMISSION BELOW */
  useEffect(() => {
    if (Object.keys(votes).length == 5) {
      setIsButtonActive(true)
    } else {
      setIsButtonActive(false)
    }
  }, [votes])

  const extractVotes = votes => {
    const sortedKeys = Object.keys(votes).sort((a, b) => {
      const numA = parseInt(a.split('-')[1], 10)
      const numB = parseInt(b.split('-')[1], 10)
      return numA - numB
    })

    return sortedKeys.map(key => votes[key])
  }

  const voteCreative = () => {
    let ids = extractVotes(votes)
    setCreative(ids)
    setShowCreative(false)
    setVotes({})
    setProjects(originalProjects)
    setShowTechnical(true)
  }

  const voteTechnical = () => {
    let ids = extractVotes(votes)
    setTechnical(ids)
    setShowTechnical(false)
    setVotes({})
    setProjects(originalProjects)
    setShowOverall(true)
  }

  const voteOverall = () => {
    let ids = extractVotes(votes)
    setOverall(ids)
    setShowTechnical(false)
    setVotes({})
    setProjects(originalProjects)
    setEndPage(true)
  }

  const voteCreativeMobile = ids => {
    setCreative(ids)
    setShowCreative(false)
    setVotes({})
    setProjects(originalProjects)
    setShowTechnical(true)
  }

  const voteTechnicalMobile = ids => {
    setTechnical(ids)
    setShowTechnical(false)
    setVotes({})
    setProjects(originalProjects)
    setShowOverall(true)
  }

  const voteOverallMobile = ids => {
    setOverall(ids)
    setShowTechnical(false)
    setVotes({})
    setProjects(originalProjects)
    setEndPage(true)
  }

  const submitVote = async (overall, technical, creative) => {
    const authToken = window.localStorage.getItem('arcade.authToken')

    try {
      const response = await fetch('/api/arcade/showcase/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + authToken
        },
        body: JSON.stringify({
          overall,
          technical,
          creative
        })
      })

      const data = await response.json()

      if (data.error) {
        console.error('Error submitting vote:', data.error)
        setSubmitStatus('error')
      } else {
        console.log(data)
        setSubmitStatus('success')
        jsConfetti.current.addConfetti({
          confettiColors: ['#09AFB4', '#FF5C00']
        })
      }
    } catch (error) {
      console.error('Error submitting vote:', error)
      setSubmitStatus('error')
      throw error
    }
  }

  let jsConfetti = useRef()

  useEffect(() => {
    jsConfetti.current = new JSConfetti()
  }, [])

  useEffect(() => {
    if (overall.length > 0 && technical.length > 0 && creative.length > 0) {
      //skips first render
      submitVote(overall, technical, creative)
    }
  }, [endPage])

  //MOBILE w/ ChatGPT help
  const [selectedProjects, setSelectedProjects] = useState(Array(5).fill(''))

  const handleChange = (index, event) => {
    const newSelection = [...selectedProjects]
    newSelection[index] = event.target.value
    setSelectedProjects(newSelection)
  }

  const getFilteredOptions = currentIndex => {
    return projects.filter(
      project =>
        !selectedProjects.includes(project.fields.Name) ||
        selectedProjects[currentIndex] === project.fields.Name
    )
  }

  const handleSubmit = event => {
    event.preventDefault()

    const projectIds = selectedProjects.map(
      name => projects.find(project => project.fields.Name === name)?.id
    )
    console.log('Selected Project IDs:', projectIds)

    showCreative
      ? voteCreativeMobile(projectIds)
      : showTechnical
        ? voteTechnicalMobile(projectIds)
        : showOverall
          ? voteOverallMobile(projectIds)
          : null

    console.log(creative)
    setSelectedProjects(Array(5).fill(''))
  }

  return startVote == true ? (
    endPage == true ? (
      <div
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '100vw',
          backgroundColor: '#FAEFD6',
          color: '#35290F',
          flexDirection: 'column',
          gap: '20px',
          position: 'relative'
        }}
      >
        <img
          src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/94d650df329df96b071133d6a6a87998ac05da51_146_80a8ae178edb2ce540124f4c3033ffb05429bd39_0arcade_1.webp"
          sx={{
            width: '30%',
            maxWidth: '200px',
            position: 'absolute',
            top: '20px',
            right: '20px'
          }}
        />
        <Text
          variant="title"
          className="gaegu"
          sx={{ textAlign: 'center', maxWidth: '800px' }}
        >
          {submitStatus == 'loading'
            ? 'Loading...'
            : submitStatus == 'success'
              ? 'Thanks for voting!'
              : 'Ran into an error sending your votes'}
        </Text>

        <Text
          variant="subtitle"
          className="gaegu"
          sx={{ textAlign: 'center', maxWidth: '800px', mt: 0 }}
        >
          {submitStatus == 'loading' ? 'It takes a while' : ''}
        </Text>
        <Button
          as="a"
          href="/arcade/showcase/my"
          sx={{
            backgroundColor:
              currentView < projectCount - 1 ? '#09AFB4' : '#FF5C00',
            color: '#FAEFD6',
            borderRadius: '5px',
            border: 'none',
            px: '20px',
            transitionDuration: '0.3s',
            '&:hover': {
              transform: 'scale(1.05)'
            },
            width: 'fit-content'
          }}
        >
          See my projects
        </Button>
        <style>{styled}</style>
      </div>
    ) : (
      showUIElements && (
        <div>
          <div
            sx={{
              zIndex: 5,
              position: 'relative',
              color: '#35290F',
              height: ['100%', '100%', '100vh']
            }}
            className="gaegu"
          >
            <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
              <div
                sx={{
                  display: 'grid',
                  gridTemplateColumns: ['1fr', '1fr', '1fr 1fr'],
                  height: '100%',
                  minHeight: '100vh'
                }}
              >
                <div
                  sx={{
                    backgroundColor: '#F6E7C5',
                    pr: 3,
                    py: 4,
                    pl: 4,
                    overflowY: 'scroll',
                    height: '100%'
                  }}
                >
                  <Text variant="title" className="slackey" as="h1">
                    Ships
                  </Text>
                  <Text variant="subtitle" as="h4" sx={{ mb: 3 }}>
                    Drag and drop the projects to vote for them. Click on the
                    projects to see the details.
                  </Text>
                  <Droppable droppableId="projects">
                    {provided => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        sx={{
                          width: '100%',
                          display: 'grid',
                          gridTemplateColumns: ['1fr', '1fr', '1fr 1fr'],
                          gap: '10px'
                        }}
                      >
                        {projects.map((project, index) => (
                          <Draggable
                            key={project.id}
                            draggableId={project.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={el => {
                                  provided.innerRef(el)
                                  if (index === 0) dragItemRef.current = el // Capture ref for the first item as an example
                                }}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                onClick={e => {
                                  document
                                    .getElementById('show-project')
                                    .showModal()

                                  setOpenProjectId(project.id)
                                }}
                                style={getStyle(
                                  provided.draggableProps.style,
                                  snapshot
                                )}
                              >
                                <SmallView
                                  id={project.id}
                                  title={project.fields.Name}
                                  desc={project.fields.Description}
                                />
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
                <div
                  sx={{
                    pl: 4,
                    py: 3,
                    pr: 4,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <Text variant="subtitle">Choose top 5 for </Text>
                    <Text className="slackey" variant="subtitle" sx={{ pb: 3 }}>
                      {showCreative
                        ? 'Most creative ships'
                        : showTechnical
                          ? 'Most technical ships'
                          : 'Best overall ships'}
                    </Text>{' '}
                    <Text
                      variant="subtitle"
                      sx={{ pb: 3, fontStyle: 'italic' }}
                    >
                      Order matters!
                    </Text>
                    {showForm ? (
                      <Button
                        onClick={() => {
                          setShowForm(false)
                        }}
                        sx={{
                          border: '2px dashed #09AFB4',
                          background: 'transparent',
                          display: 'block',
                          mt: 3,
                          color: '#09AFB4',
                          borderRadius: '5px',
                          px: '20px',
                          transitionDuration: '0.3s',
                          '&:hover': {
                            transform: 'scale(1.05)'
                          },
                          width: 'fit-content'
                        }}
                      >
                        Use drag and Drop View
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          setShowForm(true)
                        }}
                        sx={{
                          backgroundColor: '#09AFB4',
                          display: 'block',
                          color: '#FAEFD6',
                          mt: 3,
                          borderRadius: '5px',
                          border: 'none',
                          px: '20px',
                          transitionDuration: '0.3s',
                          '&:hover': {
                            transform: 'scale(1.05)'
                          },
                          width: 'fit-content'
                        }}
                      >
                        Use form View
                      </Button>
                    )}
                    {!showForm ? (
                      <div sx={{ mt: 2 }}>
                        {[
                          'votes-1',
                          'votes-2',
                          'votes-3',
                          'votes-4',
                          'votes-5'
                        ].map(voteId => (
                          <Droppable key={voteId} droppableId={voteId}>
                            {provided => (
                              <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                id={voteId}
                                sx={{
                                  width: '100%',
                                  height: ['14vh', '14vh', '13.5vh'],
                                  minHeight: '80px',
                                  border: '2px dashed #09AFB4',
                                  borderRadius: '10px',
                                  mb: 3,
                                  backgroundColor:
                                    activeDroppableId === voteId
                                      ? '#F6E7C5'
                                      : '#FAEFD6',
                                  transition: 'transform 0.2s ease',
                                  transform:
                                    activeDroppableId === voteId
                                      ? activeDroppable == true
                                        ? 'scale(1.05)'
                                        : 'scale(1)'
                                      : 'scale(1)'
                                }}
                              >
                                {renderVoteBox(voteId)}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                        ))}
                        {isButtonActive ? (
                          <Button
                            onClick={e => {
                              showCreative
                                ? voteCreative()
                                : showTechnical
                                  ? voteTechnical()
                                  : showOverall
                                    ? voteOverall()
                                    : null
                            }}
                            sx={{
                              backgroundColor: '#09AFB4',
                              color: '#FAEFD6',
                              borderRadius: '5px',
                              border: 'none',
                              px: '20px',
                              transitionDuration: '0.3s',
                              '&:hover': {
                                transform: 'scale(1.05)'
                              },
                              width: 'fit-content'
                            }}
                          >
                            Place votes
                          </Button>
                        ) : (
                          <Button
                            sx={{
                              backgroundColor: '#09AFB4',
                              color: '#FAEFD6',
                              borderRadius: '5px',
                              border: 'none',
                              px: '20px',
                              width: 'fit-content',
                              opacity: 0.4,
                              transition: 'none',
                              '&:hover': {
                                transform: 'none'
                              },
                              cursor: 'not-allowed'
                            }}
                          >
                            Place votes
                          </Button>
                        )}
                      </div>
                    ) : (
                      <div sx={{ pb: 5, pt: 2 }}>
                        <form onSubmit={handleSubmit} id="s-form">
                          {[0, 1, 2, 3, 4].map(index => (
                            <div key={index} sx={{ display: 'flex' }}>
                              <label
                                htmlFor={`project-${index}`}
                                sx={{ mr: 2 }}
                              >
                                {index + 1}
                              </label>
                              <select
                                id={`project-${index}`}
                                value={selectedProjects[index]}
                                onChange={event => handleChange(index, event)}
                                required
                                sx={{
                                  border: '2px dashed #09AFB4',
                                  background: 'transparent',
                                  px: 2,
                                  py: 1,
                                  borderRadius: '2px',
                                  width: '100%',
                                  fontSize: [2, 3],
                                  mb: 3
                                }}
                                className="gaegu"
                              >
                                <option value="">Select a project</option>
                                {getFilteredOptions(index).map(project => (
                                  <option
                                    key={project.id}
                                    value={project.fields.Name}
                                  >
                                    {project.fields.Name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          ))}
                          <Button
                            type="submit"
                            sx={{
                              backgroundColor: '#09AFB4',
                              color: '#FAEFD6',
                              borderRadius: '5px',
                              border: 'none',
                              px: '20px',
                              transitionDuration: '0.3s',
                              '&:hover': {
                                transform: 'scale(1.05)'
                              },
                              width: 'fit-content'
                            }}
                          >
                            Vote now
                          </Button>
                        </form>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </DragDropContext>

            <dialog
              ref={dialogRef}
              id="show-project"
              sx={{
                borderRadius: '10px',
                border: '3px dashed #09AFB4',
                width: ['90vw', '90vw', '70vw'],
                position: 'relative'
              }}
              className="gaegu"
            >
              {status == 'loading' && <Loading />}

              {status == 'error' && <ErrorMessage />}

              {status == 'success' && (
                <ProjectView
                  preview="preview"
                  key={openProject.id}
                  id={openProject.id}
                  title={openProject.title}
                  desc={openProject.desc}
                  slack={openProject.slackLink}
                  codeLink={openProject.codeLink}
                  playLink={openProject.playLink}
                  images={openProject.images}
                  githubProf={openProject.githubProf}
                  user={openProject.user}
                  color={openProject.color}
                  textColor={openProject.textColor}
                  screenshot={openProject.screenshot}
                  video={openProject.video}
                  readMeLink={openProject.readMeLink}
                />
              )}
              <Close
                sx={{
                  '&:hover': { cursor: 'pointer' },
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  zIndex: 2,
                  color: '#FAEFD6',
                  background: '#09AFB4'
                }}
                onClick={e => {
                  document.getElementById('show-project').close()
                }}
              />
            </dialog>
          </div>

          <style>{styled}</style>
        </div>
      )
    )
  ) : startViewProject == true ? (
    <div>
      <div
        className="gaegu"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'fixed',
          zIndex: 5,
          px: 3,
          backgroundColor: '#FAEFD6',
          width: '100vw',
          py: 2
        }}
      >
        <Text
          variant="subtitle"
          sx={{ m: 0, color: '#35290F', fontSize: [1, 2] }}
        >
          {' '}
          Ship {currentView + 1}/{projectCount}
        </Text>
        <div>
          <Button
            onClick={e => {
              currentView > 0 ? setCurrentView(currentView - 1) : null
            }}
            sx={{
              backgroundColor: '#09AFB4',
              color: '#FAEFD6',
              borderRadius: '5px',
              border: 'none',
              px: '20px',
              transitionDuration: '0.3s',
              '&:hover': {
                transform: currentView > 0 ? 'scale(1.05)' : 'scale(1)'
              },
              width: 'fit-content',
              cursor: currentView > 0 ? 'pointer' : 'auto',
              opacity: currentView > 0 ? 1 : 0.3,
              mr: 3
            }}
          >
            Prev project
          </Button>
          <Button
            onClick={e => {
              currentView < projectCount - 1
                ? setCurrentView(currentView + 1)
                : setStartVote(true)
            }}
            sx={{
              backgroundColor:
                currentView < projectCount - 1 ? '#09AFB4' : '#FF5C00',
              color: '#FAEFD6',
              borderRadius: '5px',
              border: 'none',
              px: '20px',
              transitionDuration: '0.3s',
              '&:hover': {
                transform: 'scale(1.05)'
              },
              width: 'fit-content'
            }}
          >
            {currentView < projectCount - 1 ? 'Next project' : 'Start voting'}
          </Button>
        </div>
      </div>
      <div sx={{ height: '40px' }}></div>
      <ProjectView
        preview="preview"
        key={originalProjects[currentView].id}
        id={originalProjects[currentView].id}
        title={originalProjects[currentView].fields.Name}
        desc={originalProjects[currentView].fields.Description}
        codeLink={originalProjects[currentView].fields['Code Link']}
        playLink={originalProjects[currentView].fields['Play Link']}
        images={originalProjects[currentView].fields.ScreenshotLink}
        color={originalProjects[currentView].fields.color}
        textColor={originalProjects[currentView].fields.textColor}
        screenshot={originalProjects[currentView].fields.ScreenshotLink}
        readMeLink={originalProjects[currentView].fields.ReadMeLink}
      />

      <style>{styled}</style>
    </div>
  ) : (
    <div
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#FAEFD6',
        position: 'relative'
      }}
    >
      <img
        src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/94d650df329df96b071133d6a6a87998ac05da51_146_80a8ae178edb2ce540124f4c3033ffb05429bd39_0arcade_1.webp"
        sx={{
          width: '30%',
          maxWidth: '200px',
          position: 'absolute',
          top: '20px',
          right: '20px'
        }}
      />
      <div
        sx={{ width: '90vw', margin: 'auto', maxWidth: '800px' }}
        className="gaegu"
      >
        {loadStatus == 'success' ? (
          voted == true ? (
            <div
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#FAEFD6',
                color: '#35290F',
                flexDirection: 'column',
                gap: '20px',
                position: 'relative',
                textAlign: 'center'
              }}
            >
              <Text variant="title" className="gaegu">
                You've already voted.
              </Text>
              <Text variant="subtitle" sx={{ mt: 0 }}>
                If this is a mistake, please send a message to #arcade-help
              </Text>
              <Button
                as="a"
                href="/arcade/showcase/my"
                sx={{
                  backgroundColor:
                    currentView < projectCount - 1 ? '#09AFB4' : '#FF5C00',
                  color: '#FAEFD6',
                  borderRadius: '5px',
                  border: 'none',
                  px: '20px',
                  transitionDuration: '0.3s',
                  '&:hover': {
                    transform: 'scale(1.05)'
                  },
                  width: 'fit-content'
                }}
              >
                See my projects
              </Button>
              <style>{styled}</style>
            </div>
          ) : (
            <>
              <Text
                variant="title"
                className="slackey"
                as="h1"
                sx={{ color: '#FF5C00' }}
              >
                Voting for your favourite ships
              </Text>
              <Text variant="subtitle" as="h4" sx={{ mb: 3 }}>
                Please vote on a device with a mouse if possible. When you click
                start voting, you will first be shown {projectCount} projects in
                your cohort. After viewing these projects, you will get the
                chance to pick your top 5 projects for each category.
              </Text>
              <Button
                onClick={e => {
                  setStartViewProject(true)
                }}
                sx={{
                  backgroundColor: '#09AFB4',
                  color: '#FAEFD6',
                  borderRadius: '5px',
                  border: 'none',
                  px: '20px',
                  transitionDuration: '0.3s',
                  '&:hover': {
                    transform: 'scale(1.05)'
                  },
                  width: 'fit-content'
                }}
              >
                Vote now
              </Button>{' '}
            </>
          )
        ) : (
          <>
            <Text variant="subtitle" as="h4" sx={{ mb: 3 }}>
              {loadStatus}
            </Text>
            <Text variant="caption" as="h4">
              {loadStatus == 'loading'
                ? "Please give it some time. If it's taken too long, ask for help in #arcade-help"
                : 'Try logging in again with /showcase in Slack. If it persists, please ask for help in #arcade-help.'}
            </Text>
          </>
        )}
      </div>
      <style>{styled}</style>
    </div>
  )
}

export default Vote
