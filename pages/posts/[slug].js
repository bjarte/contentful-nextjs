import { useRouter } from 'next/router'
import { useContentfulLiveUpdates } from '@contentful/live-preview/react';
import Head from 'next/head'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import PostBody from '../../components/post-body'
import MoreStories from '../../components/more-stories'
import Header from '../../components/header'
import PostHeader from '../../components/post-header'
import SectionSeparator from '../../components/section-separator'
import Layout from '../../components/layout'
import { getAllPostsWithSlug, getPostAndMorePosts } from '../../lib/api'
import PostTitle from '../../components/post-title'
import { CMS_NAME } from '../../lib/constants'

export default function Post({ post, morePosts, preview }) {

  const router = useRouter()

  // TODO: Replace this with useContentfulLiveUpdates(post);
  const updatedPost = post;

  // Following guide for setting up live review
  // https://www.contentful.com/developers/docs/tutorials/general/live-preview/#set-up-live-updates

  // This doesn't work, for some reason
  // Get vague error
  // RangeError: Maximum call stack size exceeded
  //   const updatedPost = useContentfulLiveUpdates(post);


  if (!router.isFallback && !updatedPost) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article>
              <Head>
                <title>
                  {`${updatedPost.title} | Next.js Blog Example with ${CMS_NAME}`}
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
          </>
        )}
      </Container>
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
