import {
  ChevronRightIcon,
  EyeIcon,
  EyeOffIcon,
  Loader2,
  MenuIcon,
  MoonIcon,
  PlayIcon,
  SunIcon,
  XIcon,
} from "lucide-react";
import { BrandLogo } from "./components/brand-logo";
import { cn } from "./utils/cn";

export type IconProps = React.HTMLAttributes<SVGElement>;

export const Icons = {
  logo: (props: IconProps) => <BrandLogo {...props} />,
  play: PlayIcon,
  x: XIcon,
  menu: MenuIcon,
  moon: MoonIcon,
  sun: SunIcon,
  eyeOn: EyeIcon,
  eyeOff: EyeOffIcon,
  spinner: (props: IconProps) => (
    <>
      <Loader2
        {...props}
        className={cn("h-4 w-4 animate-spin", props.className)}
        aria-hidden="true"
      />
      <span className="sr-only">loading </span>
    </>
  ),
  chevronRight: ChevronRightIcon,
};
