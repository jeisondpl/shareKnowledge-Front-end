import { Alert, Box } from '@mui/material'
import SpLoading from './SpLoading'
import color from '../Themes/Color'

// export type AlertColor = 'success' | 'info' | 'warning' | 'error';
interface Props {
  loading?: boolean
  success?: string
  error?: string
  warning?: string
}

const SpAlert = ({ success, error, loading, warning }: Props) => {
  const style = { borderLeft: `4px solid ${(success && color.success) || (error && color.error) || (warning && color.warning)}` }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '10px',
      }}
    >
      {success && (
        <Alert severity='success' style={style}>
          {success}
        </Alert>
      )}
      {warning && (
        <Alert severity='warning' style={style}>
          {warning}
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
