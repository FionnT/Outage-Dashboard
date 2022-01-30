const status = [
  {
    key: "New",
    value: "New",
    text: "New"
  },
  {
    key: "Update",
    value: "Update",
    text: "Update"
  },
  {
    key: "Stable",
    value: "Stable",
    text: "Stable"
  },
  {
    key: "Resolved",
    value: "Resolved",
    text: "Resolved"
  }
]

const severity = [
  {
    key: "Minor",
    value: "Minor",
    text: "Minor"
  },
  {
    key: "Major",
    value: "Major",
    text: "Major"
  },
  {
    key: "Critical",
    value: "Critical",
    text: "Critical"
  }
]

let categories = [
  { key: "Streaming", value: "Streaming", text: "Streaming" },
  { key: "Gaming", value: "Gaming", text: "Gaming" },
  { key: "Other", value: "Other", text: "Other" },
  { key: "Customer Service or Tools", value: "Customer Service or Tools", text: "Customer Service or Tools" }
]

let subcategories = [
  { key: "Tools", value: "Tools", text: "Tools", category: "Customer Service or Tools" },
  { key: "CS Site", value: "CS Site", text: "CS Site", category: "Customer Service or Tools" },
  { key: "All Streaming Platforms", value: "All Platforms", text: "All Streaming Platforms", category: "Streaming" },
  { key: "Android Mobile", value: "Android Mobile", text: "Android Mobile", category: "Streaming" },
  { key: "iOS (iPhone, iPad, iPod)", value: "iOS (iPhone, iPad, iPod)", text: "iOS (iPhone, iPad, iPod)", category: "Streaming" },
  {
    key: "Smart TV, Blu-ray, Set-top Box, Streaming Stick",
    value: "Smart TV, Blu-ray, Set-top Box, Streaming Stick",
    text: "Smart TV, Blu-ray, Set-top Box, Streaming Stick",
    category: "Streaming"
  },
  { key: "Apple TV", value: "Apple TV", text: "Apple TV", category: "Streaming" },
  { key: "Cast / Chromecast", value: "Cast / Chromecast", text: "Cast / Chromecast", category: "Streaming" },
  { key: "Windows", value: "Windows", text: "Windows App", category: "Streaming" },
  { key: "Web Browser (Mac / PC)", value: "Web Browser (Mac / PC)", text: "Web Browser (Mac / PC)", category: "Streaming" },
  { key: "Sony PS3 / PS4", value: "Sony PS3 / PS4", text: "Sony PS3 / PS4", category: "Streaming" },
  { key: "Microsoft Xbox 360 / One", value: "Microsoft Xbox 360 / One", text: "Microsoft Xbox 360 / One", category: "Streaming" },
  { key: "Nintendo WiiU", value: "Nintendo WiiU", text: "Nintendo Wii U", category: "Streaming" },
  { key: "All Gaming Platforms", value: "All Gaming Platforms", text: "All Gaming Platforms", category: "Gaming" },
  { key: "Android", value: "Android", text: "Android", category: "Gaming" },
  { key: "iOS", value: "iOS", text: "iOS", category: "Gaming" },
  { key: "Website", value: "Website", text: "Website", category: "Other" },
  { key: "Billing", value: "Billing", text: "Billing", category: "Other" },
  { key: "Account", value: "Account", text: "Account", category: "Other" },
  { key: "Contact Channels", value: "Contact Channels", text: "Contact Channels", category: "Other" },
  { key: "Phishing", value: "Phishing", text: "Phishing", category: "Other" }
]
const regions = [
  { key: "Global", value: "Global", text: "Global" },
  { key: "North America", value: "North America", text: "North America" },
  { key: "Latin America", value: "Latin America", text: "Latin America" },
  { key: "EU / EMEA", value: "EU / EMEA", text: "EU / EMEA" },
  { key: "Asia / ANZ", value: "Asia / ANZ", text: "Asia / ANZ" },
  { key: "North America - United States", value: "North America - United States", text: "North America - United States" },
  { key: "North America - Canada", value: "North America - Canada", text: "North America - Canada" },
  { key: "Latin America - Brazil", value: "Latin America - Brazil", text: "Latin America - Brazil" },
  { key: "Latin America - Mexico", value: "Latin America - Mexico", text: "Latin America - Mexico" },
  { key: "Latin America - Other", value: "Latin America - Other", text: "Latin America - Other" },
  { key: "EMEA - Austria", value: "EMEA - Austria", text: "EMEA - Austria" },
  { key: "EMEA - Belgium", value: "EMEA - Belgium", text: "EMEA - Belgium" },
  { key: "EMEA - France", value: "EMEA - France", text: "EMEA - France" },
  { key: "EMEA - Germany", value: "EMEA - Germany", text: "EMEA - Germany" },
  { key: "EMEA - Greece", value: "EMEA - Greece", text: "EMEA - Greece" },
  { key: "EMEA - Israel", value: "EMEA - Israel", text: "EMEA - Israel" },
  { key: "EMEA - Italy (Vatican City, San Morino", value: "EMEA - Italy (Vatican City, San Morino", text: "EMEA - Italy (Vatican City, San Morino" },
  { key: "EMEA - Luxemberg", value: "EMEA - Luxemberg", text: "EMEA - Luxemberg" },
  { key: "EMEA - Middle East", value: "EMEA - Middle East", text: "EMEA - Middle East" },
  { key: "EMEA - Netherlands", value: "EMEA - Netherlands", text: "EMEA - Netherlands" },
  { key: "EMEA - Nordics", value: "EMEA - Nordics", text: "EMEA - Nordics" },
  { key: "EMEA - Poland", value: "EMEA - Poland", text: "EMEA - Poland" },
  { key: "EMEA - Portugal", value: "EMEA - Portugal", text: "EMEA - Portugal" },
  { key: "EMEA - Romania", value: "EMEA - Romania", text: "EMEA - Romania" },
  { key: "EMEA - Spain (Andorra)", value: "EMEA - Spain (Andorra)", text: "EMEA - Spain (Andorra)" },
  { key: "EMEA - Switzerland", value: "EMEA - Switzerland", text: "EMEA - Switzerland" },
  { key: "EMEA - Turkey", value: "EMEA - Turkey", text: "EMEA - Turkey" },
  { key: "EMEA - UK", value: "EMEA - UK", text: "EMEA - UK" },
  { key: "Asia - Hong Kong, Macao, Singapore, Taiwan", value: "Asia - Hong Kong, Macao, Singapore, Taiwan", text: "Asia - Hong Kong, Macao, Singapore, Taiwan" },
  { key: "Asia - Japan", value: "Asia - Japan", text: "Asia - Japan" },
  { key: "Asia - Korea", value: "Asia - Korea", text: "Asia - Korea" },
  { key: "Asia - Thailand", value: "Asia - Thailand", text: "Asia - Thailand" },
  { key: "ANZ - Australia", value: "ANZ - Australia", text: "ANZ - Australia" },
  { key: "ANZ - New Zealand", value: "ANZ - New Zealand", text: "ANZ - New Zealand" }
]

let metrics = {
  "Customer Service or Tools": [
    {
      url: "https://google.com",
      name: "Example Relevant Page"
    },
    {
      url: "https://google.com",
      name: "Example Relevant Page"
    },
    {
      url: "https://google.com",
      name: "Example Relevant Page"
    }
  ],
  Streaming: [
    {
      url: "https://google.com",
      name: "Example Relevant Page"
    },
    {
      url: "https://google.com",
      name: "Example Relevant Page"
    },
    {
      url: "https://google.com",
      name: "Example Relevant Page"
    }
  ],
  Gaming: [
    {
      url: "https://google.com",
      name: "Example Relevant Page"
    },
    {
      url: "https://google.com",
      name: "Example Relevant Page"
    },{
      url: "https://google.com",
      name: "Example Relevant Page"
    },
  ],
  Other: [
    {
      url: "https://google.com",
      name: "Example Relevant Page"
    },
    {
      url: "https://google.com",
      name: "Example Relevant Page"
    },{
      url: "https://google.com",
      name: "Example Relevant Page"
    },
  ],
}
export { status, severity, categories, subcategories, regions, metrics }
