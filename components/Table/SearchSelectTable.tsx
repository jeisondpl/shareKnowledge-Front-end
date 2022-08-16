import { memo, useEffect, useState } from 'react'
import { Material } from '../../types/Materiales'
import InputSearch from '../InputSearch'
import SpAlert from '../SpAlert'
import SpTable from './SpTable'
import { useAlert } from '../Hooks'
import { proccessTable } from '../Types/typeTable'

const SearchSelectTable = ({ name, data, onSelectMaterial }: { name: proccessTable; data: any[]; onSelectMaterial: (id: string) => string }) => {
  const [materiales, setMateriales] = useState<any[]>([])
  const { mensaje, onWarning } = useAlert(1000)

  useEffect(() => {
    setMateriales(data)
  }, [data])

  const onChange = (e: any) => {
    const { value } = e.target

    let dataAux: any[] = data

    if (name === 'Materiales') {
      dataAux = data.filter((row: any) => {
        if (value === '') {
          return row.titulo
        } else if (row.titulo.toLowerCase().includes(value.toLowerCase())) {
          return row.titulo
        }
      })
    }

    if (name === 'Categorias') {
      dataAux = data.filter((row: any) => {
        if (value === '') {
          return row.nombre
        } else if (row.nombre.toLowerCase().includes(value.toLowerCase())) {
          return row.nombre
        }
      })
    }
    setMateriales(dataAux)
  }

  const seleMaterial = (row: Material) => {
    const resp = onSelectMaterial(row.id)
    if (resp) {
      onWarning(`${resp} se encuentra seleccionado`)
    }
  }

  return (
    <SpTable name={name} rows={materiales} isAccion={false} onSelect={seleMaterial} height='' isTitle={false}>
      <InputSearch placeHolder={'Buscar materiales'} onChange={onChange} />
      <SpAlert warning={mensaje.warning} />
    </SpTable>
  )
}

export default memo(SearchSelectTable)
