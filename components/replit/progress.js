import { Progress, Text, Box } from 'theme-ui'

const ProgressComponent = ({ progress }) => {
  if (!progress) return null

  const successCount = progress.successful + progress.failed.no_history
  const failedCount = progress.failed.timed_out + progress.failed.failed
  const processedCount = successCount + failedCount

  let title

  if (failedCount > 0) {
    title = `${progress.failed.timed_out} timed out, ${progress.failed.failed} failed.`
  }

  return (
    <Box sx={{ marginBottom: '1rem', textAlign: 'center' }}>
      <Text sx={{ fontSize: '1.2rem' }}>
        {progress.completed
          ? 'Export complete! Check your email.'
          : `${processedCount} of ${progress.repl_count} repls processed!
          ${title ? <Text>{title}</Text> : ''}`}
      </Text>

      <Progress
        sx={{ color: 'hsl(23, 94%, 32%)', backgroundColor: 'smoke' }}
        max={progress.repl_count}
        value={processedCount}
      ></Progress>
    </Box>
  )
}

export default ProgressComponent
