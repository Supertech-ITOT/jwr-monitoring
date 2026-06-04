import Card from "./_components/Card";
import Content from "./_components/Content";

export const metadata = {
  title: "Overview",
  description: "",
};

export default function UsersTable() {
  return (
    <div className="h-full w-full bg-cardbackground rounded-xl shadow-xl p-6">
      <h1 className="sm:text-6xl font-bold  tracking-[2px] text-3xl text-primary">Overview</h1>
      {/* Card */}
      <div className="w-full flex flex-row gap-6 items-center mt-6 overflow-x-auto">
        <Card />
      </div>
      <Content />
    </div>
  );
}
