import { MDXRemote } from 'next-mdx-remote/rsc'
import { promises as fs } from 'fs';
import remarkGfm from 'remark-gfm'
import {compile} from '@mdx-js/mdx'

export default async function RemoteMdxPage({ params }) {
    const file = await fs.readFile(process.cwd() + `/app/lectures/content/es/${params.slug}.mdx`, { remarkPlugins: [remarkGfm] });
    return (
        <div className='container my-5 h-100'>
            <MDXRemote source={file} />
        </div>
    )
}