import { Button } from "@/components/ui/button";
import { useState } from "react";

const ReadMore = ({ text, maxLength }: { text: string; maxLength: number }) => {
  const [isTruncated, setIsTruncated] = useState<boolean>(false);

  const toggleTruncate = () => {
    setIsTruncated((prev) => !prev);
  };

  const displayText = isTruncated ? text.slice(0, maxLength) : text;
  return (
    <div>
      <p className="whitespace-pre-line">{displayText}</p>
      {text.length > maxLength && (
        <Button variant='ghost' onClick={toggleTruncate}>{isTruncated ? "Show More" : "Show Less"}</Button>
      )}
    </div>
  );
};

export default ReadMore;
