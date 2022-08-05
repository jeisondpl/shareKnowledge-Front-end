import 'draft-js/dist/Draft.css'
import { useEffect } from 'react'
import { useState } from 'react'
// import './styles/Editor.scss'
// import './styles/Forms.scss'
import {
  // Editor,
  EditorState,
  RichUtils,
  ContentState,
  convertToRaw,
  Modifier,
  AtomicBlockUtils,
} from 'draft-js'

import PhxEditorControls from './SpEditorControls'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import createImagePlugin from '@draft-js-plugins/image'
import createResizeablePlugin from '@draft-js-plugins/resizeable'
import Editor, { composeDecorators } from '@draft-js-plugins/editor'

export interface ICustomEditor {
  initialText?: string //Con html
  defaultText?: any //Sin html
  handleChange: any
  required?: boolean
  readOnly?: boolean
  length?: number
  ref?: any
  setLenght?: any //Campo por si se necesita validar la longitud del texto actual (Ej: DenieView.tsx)
  placeholder?: string
  isNewVersion?: boolean
  visibleTools?: boolean
  images?: any[]
  controlsLocation?: string
}

export default function SpEditor(props: ICustomEditor) {
  const resizeablePlugin = createResizeablePlugin()
  const decorator = composeDecorators(resizeablePlugin.decorator)
  const imagePlugin = createImagePlugin({ decorator })

  const plugins = [resizeablePlugin, imagePlugin]
  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty())
  const hashConfig = {
    trigger: '#',
    separator: ' ',
  }

  const MAX_LENGTH = props.length || 50000
  const currentCount = editorState.getCurrentContent().getPlainText().length

  const { readOnly = false, setLenght, visibleTools = true, controlsLocation = 'BOTTOM' } = props

  useEffect(() => {
    if (props.images?.length) {
      insertImages(props.images)
    }
  }, [props.images])

  useEffect(() => {
    if (setLenght) {
      setLenght(currentCount)
    }
  }, [currentCount])

  useEffect(() => {
    try {
      //Intenta cargar un texto con el formato adecuado
      if (props.initialText) {
        const blocksFromHtml = htmlToDraft(props.initialText)
        const { contentBlocks, entityMap } = blocksFromHtml
        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap)
        const editorState = EditorState.createWithContent(contentState)
        setEditorState(editorState)
      } else if (props.defaultText) {
        //Crea un formato para texto simple en caso de que se quiera iniciar con algo
        setEditorState(EditorState.createWithContent(ContentState.createFromText(props.defaultText)))
      } else {
        setEditorState(EditorState.createEmpty())
      }
    } catch (error) {
      //En caso de no poder cargar la info, lo crea vacio
      setEditorState(EditorState.createEmpty())
      console.log('error and empty format')
    }
  }, [props.initialText])

  const saveContent = (content: ContentState) => {
    if (editorState.getCurrentContent().hasText()) {
      const rawDraftContentState = convertToRaw(content)
      const markup = draftToHtml(rawDraftContentState, hashConfig)
      props.handleChange(markup)
    }
  }

  const onChange = (editorState: EditorState) => {
    const contentState = editorState.getCurrentContent()
    if (contentState.getPlainText().length <= MAX_LENGTH) {
      saveContent(contentState)
      setEditorState(editorState)
    }
  }

  const handleKeyCommand = (command: any, editorState: any) => {
    const newState = RichUtils.handleKeyCommand(editorState, command)

    if (newState) {
      onChange(newState)
      return 'handled'
    }

    return 'not-handled'
  }

  const toggleInlineStyle = (style: string) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style))
    onChange(RichUtils.toggleInlineStyle(editorState, style))
  }

  const toggleBlockType = (blockType: string) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType))
    onChange(RichUtils.toggleBlockType(editorState, blockType))
  }

  const onTab = (e: any) => {
    setEditorState(RichUtils.onTab(e, editorState, 4))
  }

  const handleBeforeInput = () => {
    const currentContent = editorState.getCurrentContent()
    const currentContentLength = currentContent.getPlainText('').length
    const selectedTextLength = getLengthOfSelectedText()

    if (currentContentLength - selectedTextLength > MAX_LENGTH - 1) {
      return 'handled'
    }
    return 'not-handled'
  }

  const getLengthOfSelectedText = () => {
    const currentSelection = editorState.getSelection()
    const isCollapsed = currentSelection.isCollapsed()

    let length = 0

    if (!isCollapsed) {
      const currentContent = editorState.getCurrentContent()
      const startKey = currentSelection.getStartKey()
      const endKey = currentSelection.getEndKey()
      const startBlock = currentContent.getBlockForKey(startKey)
      const isStartAndEndBlockAreTheSame = startKey === endKey
      const startBlockTextLength = startBlock.getLength()
      const startSelectedTextLength = startBlockTextLength - currentSelection.getStartOffset()
      const endSelectedTextLength = currentSelection.getEndOffset()
      const keyAfterEnd = currentContent.getKeyAfter(endKey)
      if (isStartAndEndBlockAreTheSame) {
        length += currentSelection.getEndOffset() - currentSelection.getStartOffset()
      } else {
        let currentKey = startKey

        while (currentKey && currentKey !== keyAfterEnd) {
          if (currentKey === startKey) {
            length += startSelectedTextLength + 1
          } else if (currentKey === endKey) {
            length += endSelectedTextLength
          } else {
            length += currentContent.getBlockForKey(currentKey).getLength() + 1
          }

          currentKey = currentContent.getKeyAfter(currentKey)
        }
      }
    }

    return length
  }

  const removeSelection = () => {
    const selection = editorState.getSelection()
    const startKey = selection.getStartKey()
    const startOffset = selection.getStartOffset()
    const endKey = selection.getEndKey()
    const endOffset = selection.getEndOffset()
    if (startKey !== endKey || startOffset !== endOffset) {
      const newContent = Modifier.removeRange(editorState.getCurrentContent(), selection, 'forward')
      const tempEditorState = EditorState.push(editorState, newContent, 'remove-range')
      setEditorState(tempEditorState)
      return tempEditorState
    }
    return editorState
  }

  const handleSpeechText = (text: string) => {
    addPastedContent(text, editorState)
  }

  const addPastedContent = (input: string, editorState: EditorState) => {
    const inputLength = editorState.getCurrentContent().getPlainText().length
    let remainingLength = MAX_LENGTH - inputLength

    const newContent = Modifier.insertText(editorState.getCurrentContent(), editorState.getSelection(), input.slice(0, remainingLength))
    let newState = EditorState.push(editorState, newContent, 'insert-characters')
    onChange(newState)
    setEditorState(newState)
  }

  const handlePastedText = (pastedText: string) => {
    const currentContent = editorState.getCurrentContent()
    const currentContentLength = currentContent.getPlainText('').length
    const selectedTextLength = getLengthOfSelectedText()

    if (currentContentLength + pastedText.length - selectedTextLength > MAX_LENGTH) {
      const selection = editorState.getSelection()
      const isCollapsed = selection.isCollapsed()
      const tempEditorState = !isCollapsed ? removeSelection() : editorState
      addPastedContent(pastedText, tempEditorState)

      return 'handled'
    }
    return 'not-handled'
  }

  //Permite la renderizacion de imagenes
  const myBlockRenderer = (contentBlock: any) => {
    const type = contentBlock.getType()
    if (type === 'atomic') {
      console.log(type)
      return {
        component: 'MEDIA',
        editable: false,
      }
    }
    return null
  }

  const insertImages = (images: any[]) => {
    console.log('IMAGES', images)
    images.map((image) => {
      const contentState = editorState.getCurrentContent()
      const contentStateWithEntity = contentState.createEntity('IMAGE', 'IMMUTABLE', {
        src: `data:${image.type};base64,${image.base64code}`,
      })
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
      const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity })
      setEditorState(AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' '))
    })
    console.log('Calling insert image')
  }

  return (
    <div className='Editor-container'>
      <div className='TextArea'>
        <Editor
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          handleBeforeInput={handleBeforeInput}
          handlePastedText={handlePastedText}
          onChange={onChange}
          onTab={onTab}
          spellCheck={true}
          autoCorrect='true'
          placeholder={props.placeholder && props.placeholder.length > 0 ? props.placeholder : 'Escribe algo...'}
          readOnly={readOnly}
          blockRendererFn={myBlockRenderer}
          plugins={plugins}
        />
        {props.isNewVersion ? (
          <label
            style={{
              position: 'absolute',
              top: '-70px',
              right: 0,
            }}
          >
            {currentCount + ' / ' + MAX_LENGTH || '50000'}
          </label>
        ) : (
          ''
        )}
      </div>
      {visibleTools && controlsLocation === 'BOTTOM' && (
        <PhxEditorControls
          currentCount={currentCount}
          toggleBlockType={toggleBlockType}
          toggleInlineStyle={toggleInlineStyle}
          handleSpeechText={handleSpeechText}
          MaxLenght={MAX_LENGTH}
          isNewVersion={props.isNewVersion}
          readOnly={readOnly}
        />
      )}
    </div>
  )
}
