const Article = (props) => {
    return (
        <article>
        <h2>
          {props.title}
        </h2>
        <p>{props.content}</p>
      </article>
    );
}

export default Article;