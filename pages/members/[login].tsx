import React from 'react'
import { useRouter } from 'next/router'
import { GetStaticPaths, GetStaticProps } from 'next'

interface MemberProps {
  user: any
}

const Member: React.FC<MemberProps> = ({ user }) => {
  const { isFallback } = useRouter()

  if (isFallback) {
    return (
      <p>Loading</p>
    )
  }

  return (
    <div>
      <img
        src={user.avatar_url}
        alt={`${user.name} profile picture`}
        width='80'
        style={{
          borderRadius: 40
        }}
      />
      <h1>{user.name}</h1>
      <p>{user.bio}</p>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch('https://api.github.com/orgs/rocketseat/members')
  const members = await response.json()

  const paths = members.map((member: any) => {
    return { params: { login: member.login } }
  })

  return {
    paths,
    /*
      fallback false means that uncreated static pages on build will
      return 404 page, when true the pages will be created...
    */
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { login } = params

  const response = await fetch(`https://api.github.com/users/${login}`)
  const user = await response.json()

  return {
    props: {
      user
    },
    revalidate: 10,
  }
}

export default Member