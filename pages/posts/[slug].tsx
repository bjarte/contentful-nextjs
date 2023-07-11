import { GetStaticProps, GetStaticPaths, NextPage } from 'next';

// import { useRouter } from 'next/router'
import {
  useContentfulInspectorMode,
  useContentfulLiveUpdates,
} from '@contentful/live-preview/react';

import Head from 'next/head'
// import ErrorPage from 'next/error'
import PostBody from '../../components/post-body'
import MoreStories from '../../components/more-stories'
import Header from '../../components/header'
import PostHeader from '../../components/post-header'
import SectionSeparator from '../../components/section-separator'
import Layout from '../../components/layout'
import { getAllPostsWithSlug, getPostAndMorePosts } from '../../lib/api'
// import PostTitle from '../../components/post-title'

export default function Post({ preview, post, morePosts }) {

  // const router = useRouter()

  // TODO: Replace this with useContentfulLiveUpdates(post);
  const updatedPost = post;

  let temp = useContentfulLiveUpdates(post)
  console.log(temp)

  // Following guide for setting up live review
  // https://www.contentful.com/developers/docs/tutorials/general/live-preview/#set-up-live-updates

  // This doesn't work, for some reason
  // Get vague error
  // RangeError: Maximum call stack size exceeded
  //   const updatedPost = useContentfulLiveUpdates(post);

  // if (!router.isFallback && !updatedPost) {
  //   return <ErrorPage statusCode={404} />
  // }

  return (
    <Layout preview={preview}>
      <Header title={updatedPost.title} />
      <article>
        <Head>
          <title>
            {`${updatedPost.title} | Bjarte's Blog`}
          </title>
          <meta property="og:image" content={updatedPost.coverImage.url} />
        </Head>
        <PostHeader
          title={updatedPost.title}
          coverImage={updatedPost.coverImage}
          date={updatedPost.date}
          author={updatedPost.author}
        />
        <PostBody content={updatedPost.content} />
      </article>
      <SectionSeparator />
      {morePosts && morePosts.length > 0 && (
        <MoreStories posts={morePosts} />
      )}
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false }) {
  const data = await getPostAndMorePosts(params.slug, preview)
  return {
    props: {
      preview,
      post: data?.post ?? null,
      morePosts: data?.morePosts ?? null,
    },
  }
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug()
  return {
    paths: allPosts?.map(({ slug }) => `/posts/${slug}`) ?? [],
    fallback: true,
  }
}