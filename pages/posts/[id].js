import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";

import utilStyles from '../../styles/utils.module.css';

import Date from "../../components/date";

export default function Post(props) {
    return (
        <Layout>
            <Head>
                <title>{props.postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingX1}>{props.postData.title}</h1>
                <div>
                    <Date dateString={props.postData.date} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: props.postData.contentHtml }} />
            </article>
        </Layout>
    )
}

export async function getStaticPaths() {
    const paths = await getAllPostIds(); // because getAllPostIds is return promises first

    return { // contains the array of known paths returned by getAllPostIds(), which include the params defined by pages/posts/[id].js
        paths, fallback: false // If fallback is false, then any paths not returned by getStaticPaths will result in a 404 page.
    }
}

/*
    If fallback is true, then the behavior of getStaticProps changes:

        The paths returned from getStaticPaths will be rendered to HTML at build time.

        The paths that have not been generated at build time will not result in a 404 page. 
        Instead, Next.js will serve a “fallback” version of the page on the first request to such a path.

        In the background, Next.js will statically generate the requested path. Subsequent requests to 
        the same path will serve the generated page, just like other pages pre-rendered at build time.

*/

export async function getStaticProps({params}) {
    const postData = await getPostData(params.id);

    return {
        props: {
            postData
        }
    }
}