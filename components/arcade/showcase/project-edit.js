import { Input, Label, Text, Box, Grid } from 'theme-ui'
import ProjectView from './project-view'
import useForm from '../../../lib/use-form'
import Submit from '../../submit'
import Icon from '@hackclub/icons'
/** @jsxImportSource theme-ui */

const ProjectEditForm = ({ project }) => {
  const { status, formProps, useField, data } = useForm(
    `/api/arcade/showcase/projects/${project.id}/edit/`,
    null,
    {
      method: 'PATCH',
      initData: { ...project, recordId: project.id },
      bearer: typeof window !== 'undefined' ? window.localStorage.getItem('arcade.authToken') : null,
      clearOnSubmit: null
    }
  )

  const previewProject = {
    ...data
  }

  return (
    <Box
      sx={{
        width: '90vw',
        maxWidth: '1200px',
        margin: 'auto',
        position: 'relative',
        my: 5
      }}
    >
      <Text
        variant="subtitle"
        className="slackey"
        as="h3"
        sx={{
          textAlign: 'center',
          display: 'flex',
          width: '100%',
          mb: 2,
          color: '#333'
        }}
      >
        <Icon glyph="edit" />
        Editing {project.title} details
      </Text>
      <Text
        as="a"
        href="/arcade/showcase/my"
        sx={{
          border: '2px dashed #333',
          borderRadius: '5px',
          position: ['relative', 'relative', 'absolute'],
          display: 'flex',
          right: 0,
          top: 0,
          justifyContent: 'center',
          alignItems: 'center',
          px: 2,
          py: 1,
          transitionDuration: '0.4s',
          cursor: 'pointer',
          textDecoration: 'none',
          mb: 3,
          '&:hover': {
            background: '#333',
            color: '#f8e4c4'
          }
        }}
      >
        <Icon glyph="home" /> View all my ships
      </Text>
      <Grid
        className="gaegu"
        sx={{
          backgroundColor: '#F4E7C7',
          p: 4,
          borderRadius: '10px',
          gridTemplateColumns: ['1fr', '1fr 2fr']
        }}
      >
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
            <Text>Short description</Text>
            <Text variant="caption">
              This shows up on the showcase page. Keep it short and sweet!
            </Text>
            <Input
              {...useField('description')}
              placeholder="It's a party!"
              sx={{ border: '1px dashed', borderColor: '#09AFB4', mb: 2 }}
            />
          </Label>
          <Label>
            <Text>ReadMe Link</Text>
            <Input
              {...useField('readMeLink')}
              placeholder="https://github.com/hackclub/arcade/README.md"
              sx={{ border: '1px dashed', borderColor: '#09AFB4', mb: 2 }}
            />
          </Label>
          <Label>
            <Text>Repo Link</Text>
            <Input
              {...useField('codeLink')}
              placeholder="https://github.com/hackclub/arcade"
              sx={{ border: '1px dashed', borderColor: '#09AFB4', mb: 2 }}
            />
          </Label>
          <Label>
            <Text>Project link</Text>
            <Text variant="caption">
              Direct link to your project. Binaries download page, Website link, etc.
            </Text>
            <Input
              {...useField('playLink')}
              placeholder="https://hackclub.com/arcade"
              sx={{ border: '1px dashed', borderColor: '#09AFB4', mb: 2 }}
            />
          </Label>

          <Label>
            <Text>Screenshot link (required)</Text>
            <Text variant="caption">
              Demo your work! Post an image in{' '}
              <a href="https://hackclub.slack.com/archives/C016DEDUL87" target="_blank">#cdn</a>{' '}
              on Slack and paste the link here.
            </Text>
            <Input
              {...useField('screenshot')}
              type="url"
              sx={{ border: '1px dashed', borderColor: '#09AFB4', mb: 2 }}
            />
          </Label>
          <Label>
            <Text>Video demo (optional)</Text>
            <Text variant="caption">
              Short video demoing your project. YouTube link. Suggested for hardware projects.
            </Text>
            <Input
              {...useField('video')}
              type="url"
              sx={{ border: '1px dashed', borderColor: '#09AFB4', mb: 2 }}
            />
          </Label>

          <Label>
            <Text>Background Color</Text>
            <Input
              {...useField('color')}
              type="color"
              sx={{
                width: '150px',
                height: '50px',
                padding: '0',
                backgroundColor: 'transparent',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                zIndex: 1,
                position: 'relative'
              }}
            />
          </Label>
          <Label>
            <Text>Text Color</Text>
            <Input
              {...useField('textColor')}
              type="color"
              sx={{
                width: '150px',
                height: '50px',
                padding: '0',
                backgroundColor: 'transparent',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                zIndex: 1,
                position: 'relative'
              }}
            />
          </Label>
          <Label>
            <Text>#scrapbook Slack Link</Text>
            <Text variant="caption">
              This is just to show you worked on this for arcade!
            </Text>
            <Input
              {...useField('slackLink')}
              placeholder="https://hackclub.slack.com/archives/C016DEDUL87"
              sx={{ border: '1px dashed', borderColor: '#09AFB4', mb: 2 }}
            />
          </Label>
          <Label>
            <Text>Hours (estimated)</Text>
            <Text variant="caption">
              This isn't shown on the site and won't affect your chances, but it'll help us guage how accurate arcade was. Please be honest– this is just feedback for us for future events we run!
            </Text>
            <Input
              {...useField('hours')}
              type="number"
              min="1"
              sx={{ border: '1px dashed', borderColor: '#09AFB4', mb: 2 }}
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
            sx={{
              borderRadius: '10px'
            }}
          />
        </form>
        <Box
          sx={{
            border: '2px dashed #09AFB4',
            borderRadius: '5px'
          }}
        >
          <ProjectView {...previewProject} />
        </Box>
      </Grid>
    </Box>
  )
}

export default ProjectEditForm
