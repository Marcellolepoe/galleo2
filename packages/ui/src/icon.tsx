import { EyeIcon, EyeOffIcon, Loader2, MoonIcon, SunIcon } from "lucide-react";
import { BrandLogo } from "./components/brand-logo";

export type IconProps = React.HTMLAttributes<SVGElement>;

export const Icons = {
  logo: (props: IconProps) => <BrandLogo {...props} />,
  moon: MoonIcon,
  sun: SunIcon,
  eyeOn: EyeIcon,
  eyeOff: EyeOffIcon,
  spinner: Loader2,
};
