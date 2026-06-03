
import Content from './_components/Content';
import { redirect } from 'next/navigation';

export const metadata = {
    title: "Category",
};
const CategoryPage = async ({ searchParams }) => {
    const params = await searchParams;
    const categoryId = Number(params.categoryId);
    const roomId = Number(params.roomId);
    if (!categoryId || !roomId) {
        redirect("/Category?categoryId=1&roomId=1");
    }
    return (
        <div
            className='h-full w-full bg-cardbackground rounded-xl shadow-xl p-6'>
            <h1 className='font-bold sm:text-6xl text-3xl text-primary tracking-[2px] uppercase animate-in slide-in-from-top-100 duration-1200'>{metadata.title} </h1>
            <Content categoryId={categoryId} roomId={roomId} />
        </div>
    )
}

export default CategoryPage 