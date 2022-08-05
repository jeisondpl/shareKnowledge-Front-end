import { IconButton } from '@mui/material'

import FormatBoldIcon from '@mui/icons-material/FormatBold'
import FormatItalicIcon from '@mui/icons-material/FormatItalic'
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined'
import FormatStrikethroughIcon from '@mui/icons-material/FormatStrikethrough'
import ListIcon from '@mui/icons-material/List'
// import './styles/Editor.scss'
import { useState } from 'react'
import FormatListNumberedRtlIcon from '@mui/icons-material/FormatListNumberedRtl'

export interface IPhxEditorControls {
  toggleInlineStyle: any
  toggleBlockType: any
  currentCount?: number
  handleSpeechText: any
  MaxLenght?: number
  isNewVersion?: boolean
  readOnly?: boolean
}

export default function SpEditorControls(props: IPhxEditorControls) {
  const { toggleBlockType, toggleInlineStyle, readOnly } = props

  const [headersPanelVisible, setHeadersPanelVisible] = useState(false)

  const INLINE_CONTROLS = [
    { icon: FormatBoldIcon, style: 'BOLD' },
    { icon: FormatItalicIcon, style: 'ITALIC' },
    { icon: FormatUnderlinedIcon, style: 'UNDERLINE' },
    { icon: FormatStrikethroughIcon, style: 'STRIKETHROUGH' },
  ]

  const BLOCK_CONTROLS = [
    { label: 'UL', style: 'unordered-list-item', icon: ListIcon },
    { label: 'OL', style: 'ordered-list-item', icon: FormatListNumberedRtlIcon },
    { label: 'Título 1', style: 'header-one' },
    { label: 'Título 2', style: 'header-two' },
    { label: 'Título 3', style: 'header-three' },
    { label: 'Título 4', style: 'header-four' },
    { label: 'Título 5', style: 'header-five' },
    { label: 'Título 6', style: 'header-six' },
  ]

  return (
    <div className={props.isNewVersion ? 'New-Editor-Toolbar' : 'Editor-Toolbar'}>
      {INLINE_CONTROLS.map((control, i) => (
        <IconButton key={i} onClick={() => toggleInlineStyle(control.style)} disabled={readOnly}>
          <control.icon fontSize='small' />
        </IconButton>
      ))}
      <IconButton onClick={() => toggleBlockType('unordered-list-item')} disabled={readOnly}>
        <ListIcon fontSize='small' />
      </IconButton>

      <IconButton onClick={() => toggleBlockType('ordered-list-item')} disabled={readOnly}>
        <FormatListNumberedRtlIcon fontSize='small' />
      </IconButton>

      <IconButton onClick={() => setHeadersPanelVisible(!headersPanelVisible)} disabled={readOnly}>
        <label style={{ fontSize: '15px' }}>Títulos</label>
      </IconButton>


      {headersPanelVisible && (
        <div style={{ backgroundColor: '#f6f6f6' }}>
          {BLOCK_CONTROLS.slice(2, BLOCK_CONTROLS.length).map((control, i) => (
            <IconButton key={i} onClick={() => toggleBlockType(control.style)} disabled={readOnly}>
              {control.icon ? <control.icon fontSize='small' /> : <label style={{ fontSize: '15px' }}>{control.label}</label>}
            </IconButton>
          ))}
        </div>
      )}
      {props.currentCount && !props.isNewVersion ? (
        <label
          style={{
            float: 'right',
            marginTop: '15px',
            alignSelf: 'center',
          }}
        >
          {props.currentCount + ' / ' + props.MaxLenght || '50000'}
        </label>
      ) : (
        ''
      )}
    </div>
  )
}
