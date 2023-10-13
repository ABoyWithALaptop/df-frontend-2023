'use client'

import { useState, CSSProperties } from 'react'
import ClipLoader from 'react-spinners/ClipLoader'

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
}

function Loading() {
  let [loading, setLoading] = useState(true)
  let [color, setColor] = useState('#ffffff')

  return (
    <main className="main">
      <div className="sweet-loading">
        <ClipLoader
          color={color}
          loading={loading}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </main>
  )
}

export default Loading
