export const ALL_STATS_DATA: any = [
  {
    "fee_ats_rlc": 0,
    "fee_county_disabled_tix": 0,
    "fee_marshal": 0,
    "fee_ypa": 0,
    "notices_boot": 0,
    "notices_meter": 0,
    "notices_suspended": 0,
    "notices_total": 0,
    "revenue_net": 0,
    "revenue_redlight": 0,
    "revenue_total": 0,
    "revenue_total_code_enf": 0,
    "revenue_total_code_enf_courts": 0,
    "revenue_total_pkg": 0,
    "tickets_other": 0,
    "tickets_peo": 0,
    "tickets_total": 0,
    "tickets_ypa": 0,
    "tickets_ypd": 0,
    "tix_code": 0,
    "tix_rlc": 0,
    "year": '2018'
  }
];

export const MONTHS: string[] = ['JAN','FEB', 'MAR', 'APR', 'MAY', 'JUN','JUL','AUG','SEP','OCT','NOV','DEC'];

export const DASHBOARD_TOTALS: any = {
  fee_ats_rlc: 0,
  fee_county_disabled_tix: 0,
  fee_marshal: 0,
  fee_ypa: 0,
  notices_boot: 0,
  notices_meter: 0,
  notices_suspended: 0,
  notices_total: 0,
  revenue_net: 0,
  revenue_redlight: 0,
  revenue_total: 0,
  revenue_total_code_enf: 0,
  revenue_total_code_enf_courts: 0,
  revenue_total_pkg: 0,
  tickets_other: 0,
  tickets_peo: 0,
  tickets_total: 0,
  tickets_ypa: 0,
  tickets_ypd: 0,
  tix_code: 0,
  tix_rlc: 0
};

export const PIE_FORMAT: any= [
  { category: 'Boot & Tow', value: 2 },
  { category: 'Suspended Registration', value: 3 },
  { category: 'Meter Violations', value: 4 }];

export const NET_REVENUE_DASHBOARD: any = {
    series: [{name: 'YEAR', data: [1]}],
    categories: ['MONTH']
}

export const KENDO_CHART_DATA_FORMAT: any = {
  series: [{name: 'YEAR', data: [1]}],
  categories: ['MONTH']
}


export const REDLIGHT_REVENUE_DASHBOARD: any = {
    series: [{name: 'YEAR', data: [1]}],
    categories: ['MONTH']
}


export const KENDO_PACKAGED_FORMAT: any = {
    kendoData: [
      {name: "", data: [0]},
      {name: "", data: [0]},
      {name: "", data: [0]},
      {name: "", data: [0]}
    ],
    totalPackage: {
      subtype1: 0,
      subtype2: 0,
      subtype3: 0,
      subtype4: 0
    },
    categories: ['JAN']
}

export const KENDO_PACKAGED_FORMAT_TWO: any = {
  kendoData: [
    {name: "", data: [0]},
    {name: "", data: [0]},
    {name: "", data: [0]},
    {name: "", data: [0]}
  ],
  totalPackage: {
    subtype1: 0,
    subtype2: 0,
    subtype3: 0,
    subtype4: 0
  },
  categories: ['JAN']
}
