import {
  Bot,
  ChevronRightIcon,
  Edit,
  EyeIcon,
  EyeOffIcon,
  Loader2,
  MenuIcon,
  MoonIcon,
  PlayIcon,
  RefreshCw,
  SquareIcon,
  SunIcon,
  ThumbsDown,
  ThumbsUp,
  Trash,
  XIcon,
} from "lucide-react";
import { BrandLogo } from "./components/base/brand-logo";
import { cn } from "./utils/cn";

export type IconProps = React.HTMLAttributes<SVGElement>;

export const Icons = {
  logo: (props: IconProps) => <BrandLogo {...props} />,
  play: PlayIcon,
  x: XIcon,
  stop: SquareIcon,
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
  bot: Bot,
  edit: Edit,
  refresh: RefreshCw,
  thumbsDown: ThumbsDown,
  thumbsUp: ThumbsUp,
  trash: Trash,
} as const;
