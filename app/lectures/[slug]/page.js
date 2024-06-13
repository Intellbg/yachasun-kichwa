import { MDXRemote } from 'next-mdx-remote/rsc'
import { promises as fs } from 'fs';
import remarkGfm from 'remark-gfm'
import lectures from '../data'
import lectureQuestions from '../lectureQuestions'
import MiniTestForm from '@/app/components/MiniTestForm';

export default async function RemoteMdxPage({ params }) {
    const file = await fs.readFile(process.cwd() + `/app/lectures/content/es/${params.slug}.mdx`, { remarkPlugins: [remarkGfm] });
    const lecture = lectures.find((element) => (element.slug == params.slug))
    const questions = lectureQuestions.filter((element) => (element.slug == params.slug))
    return (
        <div className='container my-5 py-5 h-100'>
            <div className='card p-5'>
                <MDXRemote source={file} />
                <hr/>
                <MiniTestForm questions={questions} />
                <a href={`/lectures/${lecture.next}`} className='text-center btn btn-success'>Enviar</a>
            </div>
        </div>
    )
}