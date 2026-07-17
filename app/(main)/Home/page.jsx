import Card from "./_components/Card";
import Content from "./_components/Content";

export const metadata = {
  title: "Overview",
  description: "",
};

export default function UsersTable() {
  return (
    <div className="h-full w-full overflow-x-hidden bg-cardbackground rounded-xl shadow-xl p-1.5 xl:p-6">
      <h1 className="sm:text-4xl font-bold tracking-[2px] text-2xl text-primary">
        Overview
      </h1>
      <Card />
      <Content />
    </div>
  );
}
