interface DeptConfig {
  name: string;
  isNcr: boolean;
  isNg: boolean;
  isIpr: boolean;
}

export const deptConfig: DeptConfig[] = [
  {
    name: "Machining",
    isNcr: true,
    isNg: true,
    isIpr: true,
  },
  {
    name: "Stamping",
    isNcr: true,
    isNg: true,
    isIpr: true,
  },
  {
    name: "Machining (Welding)",
    isNcr: true,
    isNg: false,
    isIpr: true,
  },
  {
    name: "Subcon",
    isNcr: false,
    isNg: true,
    isIpr: false,
  },
  {
    name: "Molding Roof",
    isNcr: false,
    isNg: true,
    isIpr: false,
  },
  {
    name: "Slitting",
    isNcr: false,
    isNg: true,
    isIpr: false,
  }
]