import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <Button
      variant="ghost"
      size="lg"
      onClick={() => navigate(-1)}
      className="mb-6 hover:bg-primary/10 font-semibold"
    >
      <ArrowLeft className="w-5 h-5 mr-2" />
      Back
    </Button>
  );
}
