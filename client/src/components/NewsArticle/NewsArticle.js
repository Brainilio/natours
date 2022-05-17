import React, { useEffect, useState } from "react"
import "./NewsArticle.scss"
import photo from "../../resource/jeshoots-com-9qQTUYm4ss4-unsplash.jpg"
import axios from "axios"
import Spinner from "../../components/Spinner/Spinner"
import dayjs from "dayjs"
const NewsArticle = () => {
	const key = process.env.REACT_APP_NEWS_API_KEY
	const proxyUrl = "https://cors-anywhere.herokuapp.com/"
	const URL = `https://newsapi.org/v2/top-headlines?q=travel&apiKey=${key}`
	const [news, setNews] = useState(null)
	console.log(key)

	useEffect(() => {
		axios
			.get(URL, {})
			.then((response) => {
				setNews(response.data.articles)
			})
			.catch((error) => console.log(error))
	}, [])
	return (
		<>
			{news ? (
				news.slice(0, 3).map((n) => (
					<div key={n.title} className="news-article">
						<div className="news-article-left">
							<img className="news-article-left-img" src={n.urlToImage} />
						</div>
						<div className="news-article-right">
							<div className="news-article-right-header">
								<h1>{n.title}</h1>
								<div className="news-headline-pill">
									{dayjs(n.publishedAt).format("DD MMM YYYY")}
								</div>
							</div>
							<div className="news-article-right-body">
								<p>{n.description}...</p>
							</div>
							<div className="news-article-right-footer">
								<span>{n.source.name}</span>
								<a href={n.url}>Read Article</a>
							</div>
						</div>
					</div>
				))
			) : (
				<Spinner />
			)}
		</>
	)
}

export default NewsArticle
