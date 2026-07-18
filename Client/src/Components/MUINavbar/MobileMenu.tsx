import { useState } from "react";
import { HiMenu } from "react-icons/hi";
import NavLinks from "../UI/NavLinks";
import { Button } from "@/Components/UI/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/Components/UI/sheet";

const MobileMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="grow md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open navigation menu"
            className="text-primary-500"
          >
            <HiMenu size={28} />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-72"
          onClick={(e) => {
            if ((e.target as HTMLElement).closest("a")) setOpen(false);
          }}
        >
          <SheetHeader>
            <SheetTitle className="sr-only">Navigation</SheetTitle>
          </SheetHeader>
          <NavLinks vertical />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileMenu;
