import { Input, Label, Text } from 'theme-ui'
import ProjectView from './project-view'
import useForm from '../../../lib/use-form'

const ProjectEditView = ({ project }) => {
  const { status, formProps, useField } = useForm(
    '/api/arcade/showcase/projects/edit',
    null,
    {
      method: 'PATCH',
      initData: { ...project }
    }
  )
  return (
    <div>
      <form {...formProps}>
        <Label>
          <Text>Project name</Text>
          <Input
            {...useField('title')}
            placeholder="Arcade"
            required
            sx={{ border: '1px solid', borderColor: 'muted', mb: 2 }}
          />
        </Label>
        <Label>
          <Text>Repo Link</Text>
          <Input
            {...useField('repoLink')}
            placeholder="https://github.com/hackclub/arcade"
            required
            sx={{ border: '1px solid', borderColor: 'muted', mb: 2 }}
          />
        </Label>
        <Label>
          <Text>Play Link</Text>
          <Input
            {...useField('playLink')}
            placeholder="https://hackclub.com/arcade"
            required
            sx={{ border: '1px solid', borderColor: 'muted', mb: 2 }}
          />
        </Label>
        <Label>
          <Text>Screenshot</Text>
          <Input
            {...useField('screenshot')}
            required
            sx={{ border: '1px solid', borderColor: 'muted', mb: 2 }}
          />
        </Label>
        <Label>
          <Text>Video</Text>
          <Input
            {...useField('video')}
            required
            sx={{ border: '1px solid', borderColor: 'muted', mb: 2 }}
          />
        </Label>
      </form>
      <ProjectView project={project} />
    </div>
  )
}

export default ProjectEditView
