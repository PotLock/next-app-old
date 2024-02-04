export const DATA_NAVBAR = (id: any) => [
  {
    id: 1,
    name: "Home",
    url: `/project/${id}`,
  },
  // {
  //   id: 2,
  //   name: "Social feed",
  //   url: `/project/${id}/social-feed`,
  // },
  {
    id: 3,
    name: "Pots",
    url: `/project/${id}/pots`,
  },
  {
    id: 4,
    name: "Attestations",
    url: `/project/${id}/attestations`,
  },
  {
    id: 5,
    name: "Funding raised",
    url: `/project/${id}/raised`,
  },
];

export const DATA_PROFILE = [
  {
    id: 1,
    name: "DecntralMedia",
    userName: "@basedev.near",
    status: [
      {
        id: 1,
        title: "DeFi",
      },
      {
        id: 2,
        title: "Open source",
      },
      {
        id: 3,
        title: "Non profit",
      },
    ],
    followers: 12,
    following: 977,
  },
];

export const DATA_ABOUT = [
  {
    id: 1,
    value: "$2500",
    text: "Contributed",
  },
  {
    id: 2,
    value: "29",
    text: "Donors",
  },
  {
    id: 1,
    value: "$395",
    text: "Total matched",
  },
];

export const DATA_OVERVIEW = [
  {
    id: 1,
    title: "Overview",
    content:
      "Lorem ipsum dolor sit amet consectetur. Tortor ut pellentesque amet in ultricies id aliquam etiam leo. Diam condimentum ut non amet fringilla urna viverra at leo. Sit velit commodo libero nunc pulvinar tortor eu montes. Amet nisl urna dictum risus turpis. Dignissim vulputate mattis feugiat aenean at quam. Tristique non ornare bibendum senectus gravida purus in posuere. Habitant nulla facilisis ipsum velit eget id eu ac. Pellentesque ultricies mattis ornare enim. Gravida tortor urna eget hendrerit cras a tortor non imperdiet. Quisque montes nisl felis at tortor ultricies. In iaculis ultrices nunc ac enim tellus. At id quis amet nulla quisque.",
  },
  {
    id: 2,
    title: "Our Roadmap",
    content:
      "Dui malesuada aenean nunc a aenean et magna libero. Imperdiet faucibus congue eget pulvinar aliquet suspendisse sem integer quam. Purus facilisi nisl id aliquet adipiscing feugiat gravida. Est risus ut id purus. Congue enim id odio sit sem.",
  },
  {
    id: 3,
    title: "Team members",
    user: [
      {
        id: 1,
        url: "",
        userName: "@basedev.near",
      },
      {
        id: 2,
        url: "",
        userName: "@shot.near",
      },
      {
        id: 1,
        url: "",
        userName: "@uibj.near",
      },
      {
        id: 1,
        url: "",
        userName: "@user.near",
      },
    ],
  },
  {
    id: 4,
    title: "Socials",
    socials: [
      {
        id: 1,
        name: "Telegram",
        // icons: <IconTelegram />,
      },
      {
        id: 2,
        name: "Github",
        // icons: <IconGithub />,
      },
      {
        id: 1,
        name: "Website",
        // icons: <IconWebsite />,
      },
      {
        id: 1,
        name: "Twitter",
        // icons: <IconTwitter />,
      },
      {
        id: 1,
        name: "NEAR",
        // icons: <IconNear />,
      },
    ],
  },
];

export const DATA_ITEMS_SEARCH = [
  {
    key: "all",
    label: "All posts",
    subLabel: 4,
  },
  {
    key: "photos",
    label: "Photos",
    subLabel: 4,
  },
  {
    key: "videos",
    label: "Videos",
    subLabel: 5,
  },
  {
    key: "text",
    label: "Text",
    subLabel: 3,
  },
];

export const DATA_ITEMS_SEARCH_RAISED = [
  {
    key: "all",
    label: "All donations",
    subLabel: 4,
  },
  {
    key: "matched",
    label: "Matched Donations",
    subLabel: 4,
  },
  {
    key: "direct",
    label: "Direct Donation",
    subLabel: 5,
  },
  {
    key: "payouts",
    label: "Pot Payouts",
    subLabel: 3,
  },
  {
    key: "random",
    label: "Random Dation",
    subLabel: 3,
  },
];

export const DONORS_TABLE = [
  {
    id: 1,
    name: "Tony Reichert",
    role: "CEO",
    team: "Management",
    status: "active",
    age: "29",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    email: "tony.reichert@example.com",
  },
  {
    id: 2,
    name: "Zoey Lang",
    role: "Tech Lead",
    team: "Development",
    status: "paused",
    age: "25",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    email: "zoey.lang@example.com",
  },
  {
    id: 3,
    name: "Jane Fisher",
    role: "Sr. Dev",
    team: "Development",
    status: "active",
    age: "22",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    email: "jane.fisher@example.com",
  },
  {
    id: 4,
    name: "William Howard",
    role: "C.M.",
    team: "Marketing",
    status: "vacation",
    age: "28",
    avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    email: "william.howard@example.com",
  },
  {
    id: 5,
    name: "Kristen Copper",
    role: "S. Manager",
    team: "Sales",
    status: "active",
    age: "24",
    avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
    email: "kristen.cooper@example.com",
  },
  {
    id: 6,
    name: "Brian Kim",
    role: "P. Manager",
    team: "Management",
    age: "29",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    email: "brian.kim@example.com",
    status: "Active",
  },
  {
    id: 7,
    name: "Michael Hunt",
    role: "Designer",
    team: "Design",
    status: "paused",
    age: "27",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29027007d",
    email: "michael.hunt@example.com",
  },
  {
    id: 8,
    name: "Samantha Brooks",
    role: "HR Manager",
    team: "HR",
    status: "active",
    age: "31",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e27027008d",
    email: "samantha.brooks@example.com",
  },
  {
    id: 9,
    name: "Frank Harrison",
    role: "F. Manager",
    team: "Finance",
    status: "vacation",
    age: "33",
    avatar: "https://i.pravatar.cc/150?img=4",
    email: "frank.harrison@example.com",
  },
  {
    id: 10,
    name: "Emma Adams",
    role: "Ops Manager",
    team: "Operations",
    status: "active",
    age: "35",
    avatar: "https://i.pravatar.cc/150?img=5",
    email: "emma.adams@example.com",
  },
  {
    id: 11,
    name: "Brandon Stevens",
    role: "Jr. Dev",
    team: "Development",
    status: "active",
    age: "22",
    avatar: "https://i.pravatar.cc/150?img=8",
    email: "brandon.stevens@example.com",
  },
];

export const DATA_POTS = [
  {
    id: 1,
    title: "GameNetWeb3 Grant: Forging the Future of Web3 Gaming",
    descripton:
      "Welcome to the GameNetWeb3 Grant project, where we're paving the way for the future of gaming by weaving together Web3 technology and innovative networking. Our vision is to establish a dynamic network that fosters collaboration, connectivity, and growth among Web3 game developers, enthusiasts, and players.",
    valueNear: "1,347.69 NEAR",
    valueDola: "~$20,123.12",
    status: "Matched",
    timeOut: "1 day left in round",
  },
  {
    id: 2,
    title: "Web3 Open Source Software",
    descripton:
      "Grants for open-source projects primarily focused on developing on top of, or advancing the broader Ethereum and/or Web3 industry. Applications submitted by November 8th are guaranteed to be reviewed before the start of the round.",
    valueNear: "200,000 NEAR",
    valueDola: "~$20,123.12",
    status: "Matched",
    timeOut: "1 day left to apply",
  },
  {
    id: 3,
    title: "GameNetWeb3 Grant: Forging the Future of Web3 Gaming",
    descripton:
      "Welcome to the GameNetWeb3 Grant project, where we're paving the way for the future of gaming by weaving together Web3 technology and innovative networking. Our vision is to establish a dynamic network that fosters collaboration, connectivity, and growth among Web3 game developers, enthusiasts, and players.",
    valueNear: "1,347.69 NEAR",
    valueDola: "~$20,123.12",
    status: "Matched",
    timeOut: "1 day left in round",
  },
];
