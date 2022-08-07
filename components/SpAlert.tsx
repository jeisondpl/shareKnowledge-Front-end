import { Alert, Box } from '@mui/material'
import SpLoading from './SpLoading'
import color from '../Themes/Color'

// export type AlertColor = 'success' | 'info' | 'warning' | 'error';
interface Props {
  loading?: boolean
  success?: string
  error?: string
}

const SpAlert = ({ success, error, loading }: Props) => {
  const style = { borderLeft: `4px solid ${success ? color.success : color.error}` }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {success && (
        <Alert severity='success' style={style}>
          {success}
        </Alert>
      )}
      {error && (
        <Alert severity='error' style={style}>
          {error}
        </Alert>
      )}
      {loading && <SpLoading loading={loading} />}
    </Box>
  )
}

export default SpAlert
//
