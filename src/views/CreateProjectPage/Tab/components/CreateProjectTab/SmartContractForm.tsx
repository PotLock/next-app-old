import { IconDelete, IconPlus } from "@/assets/icons";
import { Button, Divider, Input, Select, SelectItem } from "@nextui-org/react";
import { SELECTiTEMS } from "@/constant";

type TSmartContract = { chain?: string; contactAddress?: string };

export default function SmartContractForm({
  smartcontracts,
  onSmartContractChange,
  setSmartContracts,
}: {
  smartcontracts: TSmartContract[];
  onSmartContractChange: (index: number, event: any) => void;
  setSmartContracts: (prev: any) => void;
}) {
  return (
    <>
      <Divider className="my-4" />
      <div className="w-full h-full flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-1/2 gap-4 flex flex-col">
          <div className="font-semibold">Smart Contracts</div>
          <div>
            Add smart contracts from different chains that belong to your
            application. (You checked it on the product details)
          </div>
        </div>
        <div className="w-full sm:w-1/2 gap-6 flex flex-col">
          {smartcontracts.map((item, index) => (
            <div className="w-full gap-6 flex flex-row" key={index}>
              <div className="flex flex-col gap-2 w-[25%]">
                <div className="font-medium">Add chain</div>
                <Select
                  size="sm"
                  name="chain"
                  placeholder="Select chain"
                  items={SELECTiTEMS}
                  onChange={(event) => onSmartContractChange(index, event)}
                  value={item.chain}
                >
                  {(options) => (
                    <SelectItem key={options.value} value={options.value}>
                      {options.label}
                    </SelectItem>
                  )}
                </Select>
              </div>
              <div className="flex flex-col gap-2 w-[75%]">
                <div className="font-medium">Contact address</div>
                <Input
                  size="sm"
                  type="text"
                  name="contactAddress"
                  placeholder="Contact address"
                  onChange={(event) => onSmartContractChange(index, event)}
                  value={item.contactAddress}
                />
              </div>
            </div>
          ))}

          <div className="flex justify-between gap-2">
            <Button
              color="danger"
              variant="light"
              startContent={<IconPlus />}
              onClick={() =>
                setSmartContracts((prev: any) => [
                  ...prev,
                  { chain: undefined, contactAddress: undefined },
                ])
              }
            >
              Add more contracts
            </Button>
            {!!smartcontracts.length && (
              <Button
                color="default"
                variant="light"
                startContent={<IconDelete />}
                onClick={() =>
                  setSmartContracts((prev: any) => [...prev].slice(0, -1))
                }
              >
                Remove Contract
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
