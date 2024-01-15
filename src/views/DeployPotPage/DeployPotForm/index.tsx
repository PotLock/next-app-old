import IconInfo from "@/assets/icons/IconInfo";
import {
  Button,
  Input,
  Radio,
  RadioGroup,
  Textarea,
  Tooltip,
} from "@nextui-org/react";
import React from "react";

const DeployPotForm = () => {
  return (
    <div className="flex flex-col w-full h-full gap-8 px-4 mb-14">
      {/* Pot details */}
      <div className="w-full h-full flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-1/2 gap-4 flex flex-col">
          <div className="font-semibold">Pot details</div>
        </div>
        <div className="w-full sm:w-1/2 gap-2 flex flex-col">
          <div className="flex flex-col gap-2">
            <div className="font-medium">Name</div>
            <Input size="sm" type="text" placeholder="Placeholder" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="font-medium">Description</div>
            <Textarea labelPlacement="outside" placeholder="Type description" />
            <div className="flex justify-end w-full text-[#7B7B7B]">0/320</div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-between">
            <div className="flex flex-col gap-2 w-full sm:w-1/2">
              <div className="font-medium flex flex-row gap-2 items-center">
                <p>Referee fee</p>
                <Tooltip content="I am a tooltip">
                  <IconInfo />
                </Tooltip>
              </div>
              <Input size="sm" type="text" placeholder="% 0" />
            </div>

            <div className="flex flex-col gap-2 w-full sm:w-1/2 ">
              <div className="font-medium flex flex-row gap-2 items-center">
                <p>Protocol fee</p>
                <Tooltip content="I am a tooltip">
                  <IconInfo />
                </Tooltip>
              </div>
              <div className="flex gap-2 ">
                <Input disabled size="sm" type="text" placeholder="% 2" />
                <IconInfo />

                <p className="text-[11px]">
                  Protocol fee is fixed by the platform
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-between">
            <div className="flex flex-col gap-2  w-full sm:w-1/2">
              <div className="font-medium ">Application start date</div>
              <Input size="sm" type="date" />
            </div>

            <div className="flex flex-col gap-2  w-full sm:w-1/2">
              <div className="font-medium ">Application end date</div>

              <Input size="sm" type="date" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-between">
            <div className="flex flex-col gap-2  w-full sm:w-1/2">
              <div className="font-medium ">Matching round start date</div>
              <Input size="sm" type="date" />
            </div>

            <div className="flex flex-col gap-2  w-full sm:w-1/2">
              <div className="font-medium ">Matching round end date</div>

              <Input size="sm" type="date" />
            </div>
          </div>
        </div>
      </div>

      {/* Chef details */}
      <div className="w-full h-full flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-1/2 gap-4 flex flex-col">
          <div className="font-semibold">Chef details</div>
        </div>
        <div className="w-full sm:w-1/2 gap-2 flex flex-col">
          <div className="flex flex-col sm:flex-row gap-6 justify-between">
            <div className="flex flex-col gap-2  w-full sm:w-1/2">
              <div className="font-medium ">Assign chef</div>
              <Input size="sm" type="text" placeholder="Eg defi center" />
            </div>

            <div className="flex flex-col gap-2  w-full sm:w-1/2 ">
              <div className="font-medium flex flex-row gap-2 items-center">
                <p>Chef fee</p>
                <Tooltip content="I am a tooltip">
                  <IconInfo />
                </Tooltip>
              </div>
              <Input disabled size="sm" type="text" placeholder="% 0" />
            </div>
          </div>
        </div>
      </div>

      {/* Application details */}
      <div className="w-full h-full flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-1/2 gap-4 flex flex-col">
          <div className="font-semibold">Application details</div>
        </div>
        <div className="w-full sm:w-1/2 gap-2 flex flex-col">
          <div className="flex flex-col sm:flex-row gap-6 justify-between">
            <div className="flex flex-col gap-2  w-full sm:w-1/2">
              <div className="font-medium ">Max. approved applicants</div>
              <Input size="sm" type="text" placeholder="4" />
            </div>

            <div className="flex flex-col gap-2  w-full sm:w-1/2  ">
              <div className="font-medium flex flex-row gap-2 items-center">
                <p className="font-medium ">Registry Requirement</p>
                <Tooltip content="I am a tooltip">
                  <IconInfo />
                </Tooltip>
              </div>
              <Input
                disabled
                size="sm"
                type="text"
                placeholder="Potlock Required"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Donor Requirements */}
      <div className="w-full h-full flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-1/2 gap-4 flex flex-col">
          <div className="font-semibold">Donor Requirements</div>
        </div>
        <div className="w-full sm:w-1/2 gap-2 flex flex-col">
          <RadioGroup orientation="horizontal">
            <div className="flex flex-col sm:flex-row justify-between w-full gap-4">
              <div className="border rounded-md py-[10px] px-4  w-full sm:w-1/2">
                <Radio value="buenos-aires">🤖 nada.bot human verified</Radio>
              </div>
              <div className="border rounded-md py-[10px] px-4  w-full sm:w-1/2">
                <Radio value="sydney">Advanced option</Radio>
              </div>
            </div>
          </RadioGroup>
        </div>
      </div>

      {/* Button deploy */}
      <div className="flex w-full justify-end gap-6">
      <Button >Cancel</Button>

      <Button color="danger">Deploy</Button>

      </div>
    </div>
  );
};

export default DeployPotForm;
