import {
  Select as ShadSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CiTrophy } from "react-icons/ci";

function Select({
  data,
  register,
  className = "",
  width = "full",
}: {
  data: any;
  register: any;
  className?: string;
  width?: string;
}) {
  return (
    <ShadSelect className={className ? className : ""} {...register}>
      <SelectTrigger className={`w-[${width}]`}>
        <SelectValue placeholder={data[0].text ? data[0].text : data[0].city} />
      </SelectTrigger>
      <SelectContent>
        {data?.map((element: any) => (
          <SelectItem key={element.value} value={element.value}>
            {element.text ? element.text : element.city}
          </SelectItem>
        ))}
      </SelectContent>
    </ShadSelect>
  );
}

export default Select;
