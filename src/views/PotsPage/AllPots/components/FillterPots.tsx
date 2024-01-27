import PotCard from "@/components/PotCard";
import { PROJECTS } from "@/constant";
import { Tab, Tabs } from "@nextui-org/react";

const FillterPots = () => {
  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Options">
        <Tab key="recently-deployed" title="Recently Deployed">
          <div className="flex items-center justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-3 sm:gap-y-8  sm:mx-0  gap-x-8">
              {PROJECTS.map((project, index) => (
                <PotCard key={index} />
              ))}
            </div>
          </div>
        </Tab>
        <Tab key="applications-open" title="Applications Open"></Tab>
        <Tab key="matching-round-open" title="Matching Round Open"></Tab>
        <Tab key="payouts" title="Payouts"></Tab>
        <Tab key="completed" title="Completed"></Tab>
      </Tabs>
    </div>
  );
};

export default FillterPots;
