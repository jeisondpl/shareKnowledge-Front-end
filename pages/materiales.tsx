import React, { useState } from 'react'
import SpEditorControls from '../components/SpEditorControls'
import Layout from '../layout/Layout'
import createResizeablePlugin from '@draft-js-plugins/resizeable'
import createImagePlugin from '@draft-js-plugins/image'
import Editor, { composeDecorators } from '@draft-js-plugins/editor'
// import '../components/Styles/Editor.sass'

import {
  // Editor,
  EditorState,
  RichUtils,
  ContentState,
  convertToRaw,
  Modifier,
  AtomicBlockUtils,
} from 'draft-js'
import { Box, Grid } from '@mui/material'

import '../styles/Editor.module.scss'
import '../styles/Forms.module.scss'
import FormLoad from '../components/FormsLogin/FormLoad'

const Materiales = () => {
  const resizeablePlugin = createResizeablePlugin()
  const decorator = composeDecorators(resizeablePlugin.decorator)
  const imagePlugin = createImagePlugin({ decorator })
  const plugins = [resizeablePlugin, imagePlugin]
  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty())

  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item xs={6}>
        <Box sx={{ flex: 'auto' }}>
          <h2>Cargar Material</h2>
        </Box>
          <div className='Editor-container'>
            <FormLoad onSubmit={() => {}} titleBtn={'Cargar'}>
              <div className='TextArea' style={{height:"300px", border: '1px solid black', borderRadius: '10px', padding: '10px',marginTop: '10px' }}>
                <Editor
                  editorState={editorState}
                  handleKeyCommand={() => {}}
                  handleBeforeInput={() => {}}
                  handlePastedText={() => {}}
                  onChange={() => {}}
                  onTab={() => {}}
                  spellCheck={true}
                  autoCorrect='true'
                  placeholder={'Escribe algo...'}
                  readOnly={false}
                  blockRendererFn={() => {}}
                  plugins={plugins}
                />
              </div>

              <SpEditorControls
                currentCount={10}
                toggleBlockType={() => {}}
                toggleInlineStyle={() => {}}
                handleSpeechText={() => {}}
                MaxLenght={2000}
                isNewVersion={false}
                readOnly={false}
              />
            </FormLoad>
          </div>
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={8}></Grid>
      </Grid>
    </Layout>
  )
}

{
  /* <SpEditor readOnly={true} handleChange={(e: any) => {}} initialText={'hola'} /> */
}
export default Materiales
