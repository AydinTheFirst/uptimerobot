import { Button, TextInput } from "flowbite-react";
import { useRef } from "react";
import { FaSearch, FaTrash } from "react-icons/fa";

interface SearchInputProps {
  placeholder: string;
  size: "xs" | "sm" | "md" | "lg";
  onValueChange: (val: string) => void;
}
export const SearchInput = (props: SearchInputProps) => {
  const searchRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    props.onValueChange(value);
    return value;
  };

  const handleClear = () => {
    searchRef.current!.value = "";
    props.onValueChange("");
  };

  return (
    <div className="relative">
      <TextInput
        ref={searchRef}
        sizing={props.size}
        placeholder={props.placeholder}
        icon={FaSearch}
        onChange={handleSearch}
      />
      {searchRef.current?.value && (
        <Button
          color=""
          size={props.size}
          className="absolute top-0 end-0"
          onClick={handleClear}
        >
          <FaTrash />
        </Button>
      )}
    </div>
  );
};
