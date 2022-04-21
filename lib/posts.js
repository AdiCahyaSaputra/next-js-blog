import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

import { remark } from 'remark'
import html from 'remark-html'


// current working directory (cwd) -> join -> posts
const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
    // get file name
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map(fileName => {
        // remove '.md' to get id
        const id = fileName.replace(/\.md$/, '');

        // read markdown as string
        const fullPath = path.join(postsDirectory, fileName); 
        const fileContents = fs.readFileSync(fullPath, 'utf-8');

        // parse with gray-matter
        const matterResult = matter(fileContents);

        return {
            id, ...matterResult.data
        }

    });

    // sort by date
    return allPostsData.sort(({date: a}, {date: b}) => {
        if(a < b) {
            return 1;
        } else if(a > b) {
            return -1;
        }

        return 0;
    })
}

export async function getAllPostIds() {
    /*
        The returned list is not just an array of strings — it must be an array of objects that look 
        like the comment above. Each object must have the params key and contain an object with the 
        id key (because we’re using [id] in the file name). Otherwise, getStaticPaths will fail.      
    */

    const fileNames = fs.readdirSync(postsDirectory); 

    return fileNames.map(filename => {
        return {
            params: {
                id: filename.replace(/\.md$/, '')
            }
        }
    })
}

export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf-8');

    const matterResult = matter(fileContents);

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content)

    const contentHtml = processedContent.toString()

    return {
        id, contentHtml, ...matterResult.data
    }
}