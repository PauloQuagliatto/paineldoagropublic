import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
    return (
        <div className="content-container content-container--shadow">
            <p>Page Not Found</p>
            <Link to="/">Retornar para HomePage</Link>
        </div>
    )
}

export default NotFoundPage