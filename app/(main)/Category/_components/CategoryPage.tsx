import Content from "./Content";

export default function CategoryContent() {
  return (
    <div className="h-full w-full overflow-x-hidden bg-cardbackground rounded-xl shadow-xl p-1.5 xl:p-6">
      <h1 className="sm:text-4xl font-bold tracking-[2px] text-2xl text-primary">Single Room</h1>
      <Content />
    </div>
  );
}
