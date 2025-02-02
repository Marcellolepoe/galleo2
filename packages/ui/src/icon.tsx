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
  spinner: Loader2,
  chevronRight: ChevronRightIcon,
};
