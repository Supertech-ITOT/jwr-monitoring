import FrequencyBtn from "@/components/FrequencyBtn";
import Chart from "./Chart";
import TableUI from "./TableUI";
import CategoryFilter from "./CategoryFilter";

export default function Content({ categoryId, roomId }) {
  return (
    <>
      <div className="flex justify-end gap-2 mt-4">
        <FrequencyBtn />
        <CategoryFilter categoryId={categoryId} roomId={roomId} />
        {/* <Download id={id} /> */}
      </div>
      <div className="mt-6 flex flex-col xl:flex-row gap-6 w-full ">
        <div className="flex-2 bg-cardbackground border border-border rounded-xl shadow-xl w-full h-[600px]">
          <Chart />
          <div
            id="sensor-chart-visible"
            className="hidden pointer-events-none"
            style={{ width: "1920px" }}
          >
            <Chart isExport={true} />
          </div>
        </div>
        <div className="flex-1 bg-cardbackground border border-border rounded-xl shadow-xl w-full xl:w-1/3 h-[600px] flex flex-col overflow-hidden">
          <TableUI />
        </div>
      </div>
    </>
  );
}
