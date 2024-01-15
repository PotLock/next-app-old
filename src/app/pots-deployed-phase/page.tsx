import Search from "@/components/Search";
import { Divider } from "@nextui-org/react";
import React from "react";

const PotsDeployedPhase = () => {
  return (
    <div className="w-full h-full px-[76px] gap-16 flex flex-col">
      {/* card */}
      <div className="flex gap-6 flex-col">
        <div className="text-[44px]">
          Web3 Open <br /> Source Software
        </div>
        <div className="flex gap-60">
          <div className="flex flex-col gap-6 w-1/2">
            <div className="flex gap-6">
              <div className="border py-[6px] px-2">
                Application Round Ended
              </div>
              <div className="border py-[6px] px-2">
                Matching Round Not Started
              </div>
            </div>
            <div>
              Grants for open-source projects primarily focused on developing on
              top -of, or advancing the broader Ethereum and/or Web3 industry.
              Applications submitted by November 8th are guaranteed to be
              reviewed before the start of the round.
            </div>
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="font-semibold">$2500</div>
                <div>DONATED</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="font-semibold">29</div>
                <div>DONORS</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 w-1/2">
            <Divider />
            <div>
              <div>~8323523.631 USD</div>
              <div className="flex items-end gap-2">
                <div className="text-2xl font-semibold">200,000 NEAR</div>
                <div>Matching funds available </div>
              </div>
            </div>
            <Divider />
            <div>
              <div className="flex gap-2 justify-between">
                <div>Application Round Not Started</div>
                <div className=" font-semibold">Starts in 7 Days </div>
              </div>
              <div className="flex gap-1">
                <div className="text-[#7B7B7B]">Application starts on </div>
                <div className="font-semibold">2023/11/1512:00 UTC</div>
                <div className="text-[#7B7B7B]"> and ends on</div>
              </div>
              <div className="font-semibold">2023/11/2923:59 UTC</div>
            </div>
          </div>
        </div>
      </div>

      {/* tab */}
      <div className="flex justify-between w-full gap-16">
        <div className="w-[15%]">
          <ul className="w-full gap-2 flex flex-col">
            <li className="flex items-center justify-center gap-2">
                <Divider className="h-6 w-1 bg-[#DD3345]"/>
              <a
                href="#"
                className="inline-flex items-center px-4 py-3  bg-[#FEF6EE] w-full"
                aria-current="page"
              >
                Projects
              </a>
            </li>
        
          </ul>
        </div>
        <div className="w-[85%]">
            <Search/>
        </div>
      </div>
    </div>
  );
};

export default PotsDeployedPhase;
