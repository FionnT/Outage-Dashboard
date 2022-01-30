const options = [
  {
    text: "CustomerServiceSite1",
    key: "CustomerServiceSite1",
    value: "CustomerServiceSite1"
  },
  {
    text: "CustomerServiceSite2",
    key: "CustomerServiceSite2",
    value: "CustomerServiceSite2"
  },
  {
    text: "CustomerServiceSite3",
    key: "CustomerServiceSite3",
    value: "CustomerServiceSite3"
  }
]

const data = {
  CustomerServiceSite1: {
    skills: [
      "en_US",
      "en_CA",
      "en_LATAM",
      "en_ANZ",
      "en_ASIA"
    ],
    timezone: "Asia/Manila"
  },
  CustomerServiceSite2: {
    skills: ["en_US", "en_CA", "en_LATAM", "en_ANZ", "en_ASIA", "en_GB", "en_MEA", "en_EEU", "en_WEU"],
    timezone: "Asia/Manila"
  },
  CustomerServiceSite3: {
    skills: ["en_US", "en_CA", "en_LATAM", "en_ANZ", "en_ASIA", "en_GB", "en_MEA", "en_EEU", "en_WEU", "tl_PH"],
    timezone: "Asia/Manila"
  }
}

export { options, data }
