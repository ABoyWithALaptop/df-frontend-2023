import React, { useContext } from 'react'
import { ModalDeleteContext } from '../../util/context/modalDeleteContext'
import { BooksViewContext } from '../../util/context/bookViewContext'
import { ThemeContext } from '../../util/context/ThemeContext'


function TableBooks() {
  
  const modalDeleteContext = React.useContext(ModalDeleteContext)
  const { setDeleteItem } = modalDeleteContext
  const bookViewContext = React.useContext(BooksViewContext)
  const { currentView } = bookViewContext
  const propsDataList = Object.keys(currentView[0] || {})
  const {theme} = useContext(ThemeContext)

  const handleDelete = (item) => { 
    setDeleteItem(item)
  }
  const dataValue = currentView.map(
    (item, index) => {
      const render = propsDataList.map((value, index) => { 
        if ( value === "id") return null
        if (value === "name") return (
          <td colSpan="2" key={`${item} ${index}`} className={`${theme === 'dark'?"dark" :"" }`}>{item[value]}</td>
        )
        if (value === "topic") return (
          <td key={`${item} ${index}`} className={`${theme === 'dark'?"dark" :"" }`}>{item[value]}</td>
        )
        
        if (value === "pureName") return (
          <td key={`${item} ${index}`} className={`${theme === 'dark'?"dark" :"" }`}>
            <a className="deleteLink" onClick={() => handleDelete(item)}>Delete</a>
          </td>
        )
        return (
          <td key={`${item} ${index}`} className={`${theme === 'dark'?"dark" :"" }`}>{item[value]}</td>
        )

      })
      return render
    }
  )

  return (
    <div id='wrapperTable'>
      <table id="searchRes">
      <colgroup>
        {propsDataList.map((prop, index) => {
          if (prop === "pureName" || prop ==="id") return null
          if (prop === "name") return <col key={index} span="2" />
          return <col key={index} />
        })}
      </colgroup>
      <thead>
        <tr>
          <th colSpan="2" className={`${theme === 'dark'?"dark" :"" }`}>Name</th>
          <th className={`${theme === 'dark'?"dark" :"" }`}>Author</th>
          <th className={`${theme === 'dark'?"dark" :"" }`}>Topic</th>
          <th className={`${theme === 'dark'?"dark" :"" }`}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {dataValue.map((item, index) => <tr key={index}>{item}</tr>)}
      </tbody>
    </table>
    </div>
    
  )
}

export default TableBooks