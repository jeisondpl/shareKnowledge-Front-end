import React, { useState, useCallback } from 'react'
import SpEditorControls from '../../components/SpEditorControls'
import Layout from '../../layout/Layout'
import createResizeablePlugin from '@draft-js-plugins/resizeable'
import createImagePlugin from '@draft-js-plugins/image'
import Editor, { composeDecorators } from '@draft-js-plugins/editor'
import FormLoad from '../../components/Forms/FormLoadMaterial'
import { EditorState, RichUtils, ContentState, convertToRaw, Modifier, AtomicBlockUtils } from 'draft-js'
import { Box, Card, Grid, Button, DialogActions } from '@mui/material'
import { useRouter } from 'next/router'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Cancel'
import stylesEditor from '../../styles/editor.module.scss'
import stylesForms from '../../styles/forms.module.scss'
import SpUploadFile from '../../components/SpUploadFile'

const NuevoCurso = () => {
  const router = useRouter()
  const resizeablePlugin = createResizeablePlugin()
  const decorator = composeDecorators(resizeablePlugin.decorator)
  const imagePlugin = createImagePlugin({ decorator })
  const plugins = [resizeablePlugin, imagePlugin]
  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty())

  const onSubmit = useCallback(async (values: any) => {
    router.push('/materiales')
  }, [])

  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Box sx={{ flex: 'auto' }}>
            <h2>Cargar Cursos</h2>
          </Box>
          <div className={stylesEditor.editorContainer}>
            <Card className={stylesForms.card}>
              <FormLoad onSubmit={onSubmit} onCancel={() => {}} titleBtn={'Guardar'}>
                <div className={stylesForms.textArea}>
                  <Editor
                    editorState={editorState}
                    handleKeyCommand={() => {}}
                    handleBeforeInput={() => {}}
                    handlePastedText={() => {}}
                    onChange={() => {}}
                    onTab={() => {}}
                    spellCheck={true}
                    autoCorrect='true'
                    placeholder={'Descripcion del curso'}
                    readOnly={false}
                    blockRendererFn={() => {}}
                    plugins={plugins}
                  />
                </div>
                <div className={stylesForms.controls}>
                  <SpEditorControls
                    currentCount={10}
                    toggleBlockType={() => {}}
                    toggleInlineStyle={() => {}}
                    handleSpeechText={() => {}}
                    MaxLenght={2000}
                    isNewVersion={false}
                    readOnly={false}
                  />
                </div>
                <SpUploadFile deleteFile={() => {}} files={[]} handleFile={() => {}} multiple={false} placeholder='Haz click para seleccionar el archivo' validateSize={false} />
              </FormLoad>
            </Card>
          </div>
        </Grid>
        <Grid item xs={4}>
          <DialogActions>
            <Button variant='contained' color='inherit' endIcon={<CancelIcon />} onClick={() => router.push('/cursos')}>
              Cancelar
            </Button>
            <Button type='submit' variant='contained' color='primary' endIcon={<SaveIcon />}>
              Guardar
            </Button>
          </DialogActions>
        </Grid>
      </Grid>
    </Layout>
  )
}

{
  /* <SpEditor readOnly={true} handleChange={(e: any) => {}} initialText={'hola'} /> */
}
export default NuevoCurso
