import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCandidate } from "@/hooks/useCandidateStore";
import React, { Dispatch, FC, SetStateAction } from "react";

interface CandidateProps {
  id: number;
  name: string;
  description: string;
  selectedId: number | null;
  setSelectedId: Dispatch<SetStateAction<number>>;
}

const Candidate: FC<CandidateProps> = ({
  id,
  name,
  description,
  selectedId,
  setSelectedId,
}) => {
  const candidate = useCandidate();
  const handleClick = () => {
    setSelectedId(id);
    candidate.setSelectedId(id);
    candidate.setSelectedVoter(name);
  };
  return (
    <>
      <Card
        className={`hover:bg-slate-200 cursor-pointer ${
          selectedId === id ? "bg-slate-200" : ""
        }`}
        onClick={() => {
          handleClick();
        }}
      >
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          {/* <CardDescription>Card Description</CardDescription> */}
        </CardHeader>
        <CardContent>
          <p>{description}</p>
        </CardContent>
        {/* <CardFooter>
        <p>Card Footer</p>
      </CardFooter> */}
      </Card>
    </>
  );
};

export default Candidate;
