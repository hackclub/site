import { Input, Label, Text } from 'theme-ui'
import useForm from '../../../lib/use-form'
import { useEffect, useState } from 'react'
import Submit from '../../submit'

const Loading = () => <div>Loading...</div>
const ErrorMsg = () => <div>There was an error loading your projects.</div>

async function projectAdded(response) {
  const projectID = response.project

  window.location.href = '/arcade/showcase/project/' + projectID + '/edit'
}

const NewProjectForm = ({authToken}) => {
  const { status, formProps, useField } = useForm(
    '/api/arcade/showcase/projects/add',
    projectAdded,
    { initData: {authToken} },
  )
  return (
    <div>
      <form {...formProps}>
        <Label>
          <Text>Repo / code link</Text>
          <Text color="muted">We'll pull in your project details from this repo</Text>
          <Input
            {...useField('codeLink')}
            placeholder="https://github.com/hackclub/arcade"
            required
            
            sx={{ border: '1px solid', borderColor: 'muted', mb: 2 }}
          />
        </Label>
        <Input {...useField('authToken')} type="hidden" />
      <Submit
        status={status}
        labels={{
          default: 'Submit repo',
          error: 'Something went wrong!',
          success: 'Pulling repo data'
        }}
        sx={{
          background: status == 'error' ? '#DE4E2B': '#09AFB4',
          borderRadius: '10px'
        }}
      />
      </form>
    </div>
  )
}

const ProjectAddView = () => {
  const [authToken, setAuthToken] = useState('')
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    const token = window.localStorage.getItem('arcade.authToken')
    if (!token) { setStatus('error') }
    setAuthToken(token)
    setStatus('success')
  }, [])

  return (
    <>
    {status === 'loading' && <Loading />}
    {status === 'error' && <ErrorMsg />}
    {status === 'success' && <NewProjectForm authToken={authToken} />}
    </>
  )
}

export default ProjectAddView
