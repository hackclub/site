import { Input, Label, Text, Flex, Box } from 'theme-ui'
import ProjectView from './project-view'
import useForm from '../../../lib/use-form'
import CohortCard from './cohort-card'
import Submit from '../../submit'
import { useState } from 'react'

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
    console.log()
  return (
    <Flex>
      <form {...formProps}>
        <Label>
          <Text>Project name</Text>
          <Input
            {...useField('title')}
            placeholder="Arcade"
            sx={{ border: '1px solid', borderColor: 'muted', mb: 2 }}
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
        />
      </form>
      <Box sx={{ width: '50%' }}>
        <CohortCard {...previewProject} />
        <ProjectView {...previewProject} />
      </Box>
    </Flex>
  )
}

export default ProjectEditForm
