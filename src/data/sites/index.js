const options = [
  {
    text: "CustomerServiceSite1",
    key: "cs1",
    value: "cs1"
  },
  {
    text: "CustomerServiceSite2",
    key: "cs2",
    value: "cs2"
  },
  {
    text: "CustomerServiceSite3",
    key: "cs3",
    value: "cs3"
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
