export default function Home({ org }) {
  return (
    <div>
      <h1>{org.login}</h1>
      <h3>{org.description}</h3>

      <p>
        Site: <a href={org.blog}>{org.blog}</a>
      </p>
    </div>
  )
}

export const getStaticProps = async () => {
  const response = await fetch('https://api.github.com/orgs/rocketseat')
  const data = await response.json()

  return {
    props: {
      org: data
    }
  }
}


/*
  When exporting getStaticProps function next when run build take
  the { props } witch this function return and pass it on the component.

  When to use: In some content that you dont need always the last version
  for example a post in a blog.

  What exactly it does: Generate an html with the data of the getStaticProps
  return for example some api response, so with that html cached more than
  one thousand requests to frontend doesn't means 1 thousand requests to backend

  For keep it updated: You will need to pass on the returing object of
  getStaticProps funtion a key called ravalidate in his value a number
  meaning the seconds between two updates
  Example: {
    props: {
      propsForComponent: myProps
    },
    revalidate: 10 (ten seconds)
  }
*/