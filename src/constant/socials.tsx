import {
  IconGithub,
  IconNear,
  IconTelegram,
  IconTwitter,
  IconWebsite,
} from "@/assets/icons";
import { ProjectDetail } from "@/contexts";

export const DATA_SOCIALS = [
  {
    id: 1,
    name: "Telegram",
    icons: <IconTelegram />,
    url: "telegram",
    defaultLink : "https://web.telegram.org"
  },
  {
    id: 2,
    name: "Github",
    icons: <IconGithub />,
    url: "github",
    defaultLink: "https://github.com"
  },
  {
    id: 3,
    name: "Website",
    icons: <IconWebsite />,
    url: "website",
    defaultLink: "wuipod.transistor.fm"
  },
  {
    id: 4,
    name: "Twitter",
    icons: <IconTwitter />,
    url: 'twitter',
    defaultLink: "https://twitter.com"
  },
  {
    id: 5,
    name: "NEAR",
    icons: <IconNear />,
    url: "near",
    defaultLink: "https://near.org"
  },
];
