import { Input, Label, Text, Flex, Box } from 'theme-ui'
import ProjectView from './project-view'
import useForm from '../../../lib/use-form'
import CohortCard from './cohort-card'
import Submit from '../../submit'
import { useState } from 'react'
import Icon from '@hackclub/icons'
const ProjectEditForm = ({ project }) => {
  const [previewProject, setPreviewProject] = useState(project)
  console.log({previewProject})
  function publishedChanges(e) {
    console.log('published changes')
  }
  const { status, formProps, useField, data } = useForm(
    `/api/arcade/showcase/projects/${project.id}/edit`,
    publishedChanges,
    {
      method: 'PATCH',
      initData: { ...project, recordId: project.id },
      bearer: window.localStorage.getItem('arcade.authToken')
    }
  )

  return (
    <Box sx={{
      width: '90vw',
      maxWidth: '800px',
      margin: 'auto'
    }}>
      <Text variant='subtitle' className='slackey' as='h3' sx={{textAlign: 'center', display: 'flex', width: '100%', mb: 2, color: '#333'}}><Icon glyph='edit' />Editing PROJECT NAME</Text>
      <Flex className='gaegu' sx={{backgroundColor: '#F4E7C7', p: 4, borderRadius: '10px'}}>
      <form {...formProps}>
        <Label>
          <Text>Project name</Text>
          <Input
            {...useField('title')}
            placeholder="Arcade"
            sx={{ border: '1px dashed', borderColor: '#09AFB4', mb: 2 }}
          />
        </Label>
        <Label>
          <Text>Repo Link</Text>
          <Input
            {...useField('codeLink')}
            placeholder="https://github.com/hackclub/arcade"
            sx={{ border: '1px solid', borderColor: 'muted', mb: 2 }}
          />
        </Label>
        <Label>
          <Text>Play Link</Text>
          <Input
            {...useField('playLink')}
            placeholder="https://hackclub.com/arcade"
            sx={{ border: '1px solid', borderColor: 'muted', mb: 2 }}
          />
        </Label>
        <Label>
          <Text>Screenshot</Text>
          <Input
            {...useField('screenshot')}
            sx={{ border: '1px solid', borderColor: 'muted', mb: 2 }}
          />
        </Label>
        <Label>
          <Text>Video</Text>
          <Input
            {...useField('video')}
            sx={{ border: '1px solid', borderColor: 'muted', mb: 2 }}
          />
        </Label>

        <Input {...useField('authToken')} type="hidden" />

        <Submit
          status={status}
          labels={{
            default: 'Publish changes',
            error: 'Something went wrong',
            success: 'Updated!'
          }}

          sx={{backgroundColor: '#09AFB4', borderRadius: '10px'}}
        />
      </form>
      <Box sx={{px: 3}}>
        <ProjectView {...previewProject}/>
      </Box>
      </Flex>
    </Box>
  )
}

export default ProjectEditForm
