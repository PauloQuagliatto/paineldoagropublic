import React from 'react'

class NewsPage extends React.Component {
    constructor() {
        super()
        this.state = {
            news: []
        }
    }

    componentDidMount() {
        fetch('/api/news')
            .then(res => res.json())
            .then(news => this.setState({ news }))
    }

    render() {
        return (
            <div className="content-container content-container--shadow">
                <h1 className="list-header">Notícias</h1>
                <div className="list-body">
                    {this.state.news.map(notice =>
                        <a className="list-item list-item--news" href={notice.link} target="_blank" rel="noopener noreferrer" key={notice.id}>
                            <h1 className="list-item__title list-item__title--link">{notice.title}</h1>
                            <p className="list-item__data">{notice.subTitle}</p>
                        </a>
                    )}
                </div>
            </div>
        )
    }
}

export default NewsPage