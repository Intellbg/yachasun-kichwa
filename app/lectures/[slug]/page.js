import { MDXRemote } from 'next-mdx-remote/rsc'
import { promises as fs } from 'fs';
import remarkGfm from 'remark-gfm'
import lectures from '../data'

export default async function RemoteMdxPage({ params }) {

    // const data = await fetch.get(`${root}word/?lecture=${}`)
    //     .then((response) => response.json())
    //     .then((result) => console.log(result))
    //     .catch((error) => console.error(error));

    const file = await fs.readFile(process.cwd() + `/app/lectures/content/es/${params.slug}.mdx`, { remarkPlugins: [remarkGfm] });
    const lecture = lectures.find((element) => (element.slug == params.slug))
    return (
        <div className='container my-5 py-5 h-100'>
            <MDXRemote source={file} />
            <a href={`/lectures/${lecture.next}`} className='text-center btn btn-success'>Enviar</a>
        </div>
    )
}