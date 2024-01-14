import * as React from "react"
import { TagBtn } from "../components/TagBtn"
import { Link } from "gatsby"

function Card(props) {
  const tags = props.tags.map(tagName => (
    <Link key={tagName} to={`/tag=${tagName}`}>
      <TagBtn name={tagName} />
    </Link>
  ))

  return (
    <div className="card-normal font-sans cursor-pointer hover:bg-primary-content border-b">
      <Link to={`/post${props.link}`} className="no-underline">
        <div className="p-4 text-base">
          <h2 className="card-titles text-3xl font-bold text-primary">{`[${props.category}]${props.title}`}</h2>
          <p className="text-base text-base-content font-semibold my-2">
            {props.content}
          </p>
          <div className="flex flex-wrap gap-2">{tags}</div>
          <p className="text-sm text-neutral-content font-semibold mt-2">
            {props.date}
          </p>
        </div>
      </Link>
    </div>
  )
}

export { Card }
