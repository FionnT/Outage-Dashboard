const message_map = [
  {
    key: "oa_disconnect_sys_maint",
    value: "oa_disconnect_sys_maint",
    text: "We are closed due to system maintenance. Please call back later and we will be happy to assist you (oa_disconnect_sys_maint).",
    warnregardingforceclose: "true" // This has to be a string because it's passed as a prop to the DOM and React doesn't like boolean props
  },
  {
    key: "oa_disconnect_emergency",
    value: "oa_disconnect_emergency",
    text: "We are unable to answer the phones at this time due to an unforeseen emergency. We will be available once the situation is resolved. We apologize for any inconvenience (oa_disconnect_emergency).",
    warnregardingforceclose: "true" // This has to be a string because it's passed as a prop to the DOM and React doesn't like boolean props
  },
  {
    key: "oa_service_issue",
    value: "oa_service_issue",
    text: "We are aware of reported service issues and are quickly working to resolve them (oa_service_issue)."
  },
  {
    key: "oa_phones_closed_refer_to_helpcenter",
    value: "oa_phones_closed_refer_to_helpcenter",
    text: "We're sorry, the phone lines are closed right now. For answers to common questions, please visit our help center. Sorry for the inconvenience, and thank you for your patience(oa_phones_closed_refer_to_helpcenter)",
    warnregardingforceclose: "true" // This has to be a string because it's passed as a prop to the DOM and React doesn't like boolean props
  }
]

const skills_map = [
  { value: "all", key: "all", region: "All", text: "All Languages" },
  { value: "en_US", key: "en_US", region: "English", text: "English United States (en_US)" },
  { value: "en_CA", key: "en_CA", region: "English", text: "English Canada (en_CA)" },
  { value: "en_GB", key: "en_GB", region: "English", text: "English UK/IE (en_GB)" },
  { value: "en_MEA", key: "en_MEA", region: "English", text: "English Middle East/Africa (en_MEA)" },
  { value: "en_EEU", key: "en_EEU", region: "English", text: "English CEE, Russia, Turkey & C. Asia(en_EEU)" },
  { value: "en_WEU", key: "en_WEU", region: "English", text: "English Benelux, DACH, France, Italy, Nordics, Spain/Portugal (en_WEU)" },
  { value: "en_ANZ", key: "en_ANZ", region: "English", text: "English Australia/New Zealand (en_ANZ)" },
  { value: "en_LATAM", key: "en_LATAM", region: "English", text: "English LatAm (Mexico, Other LatAm,Brazil) (en_LATAM)" },
  { value: "en_ASIA", key: "en_ASIA", region: "English", text: "English Asia (Japan, Korea, China, SEA,Taiwan/HK) (en_ASIA)" },
  { value: "en_INDIA", key: "en_INDIA", region: "English", text: "English India (hi_IN)" },
  { value: "es_MX", key: "es_MX", region: "LATAM", text: "Spanish (es_MX)" },
  { value: "pt_BR", key: "pt_BR", region: "LATAM", text: "Portuguese (pt_BR)" },
  { value: "ar_ME", key: "ar_ME", region: "EMEA", text: "Arabic (ar_ME)" },
  { value: "cs_CZ", key: "cs_CZ", region: "EMEA", text: "Czech (cs_CZ)" },
  { value: "da_DK", key: "da_DK", region: "EMEA", text: "Danish (da_DK)" },
  { value: "NL", key: "nl_NL", region: "EMEA", text: "Dutch (nl_NL)" },
  { value: "fi_FI", key: "fi_FI", region: "EMEA", text: "Finnish (fi_FI)" },
  { value: "FR", key: "fr_FR", region: "EMEA", text: "French (fr_FR)" },
  { value: "fr_AF", key: "fr_AF", region: "EMEA", text: "French Africa (fr_AF)" },
  { value: "fr_CA", key: "fr_CA", region: "EMEA", text: "French (Canada) (fr_CA)" },
  { value: "DE", key: "DE", region: "EMEA", text: "German (de_DE)" },
  { value: "el_GR", key: "el_GR", region: "EMEA", text: "Greek (el_GR)" },
  { value: "he_IL", key: "he_IL", region: "EMEA", text: "Hebrew (he_IL)" },
  { value: "hu_HU", key: "hu_HU", region: "EMEA", text: "Hungarian (hu_HU)" },
  { value: "it_IT", key: "it_IT", region: "EMEA", text: "Italian (it_IT)" },
  { value: "no_NO", key: "no_NO", region: "EMEA", text: "Norwegian Bokmal (no_NO)" },
  { value: "pl_PL", key: "pl_PL", region: "EMEA", text: "Polish (pl_PL)" },
  { value: "pt_PT", key: "pt_PT", region: "EMEA", text: "Portuguese (Portugal) (pt_PT)" },
  { value: "ro_RO", key: "ro_RO", region: "EMEA", text: "Romanian (ro_RO)" },
  { value: "es_ES", key: "es_ES", region: "EMEA", text: "Spanish (Spain) (es_ES)" },
  { value: "sv_SE", key: "sv_SE", region: "EMEA", text: "Swedish (sv_SE)" },
  { value: "tr_TR", key: "tr_TR", region: "EMEA", text: "Turkish (tr_TR)" },
  { value: "ms_MY", key: "ms_MY", region: "APAC", text: "Bahasa Malay (ms_MY)" },
  { value: "hi_IN", key: "hi_IN", region: "APAC", text: "Hindi (hi_IN)" },
  { value: "id_ID", key: "id_ID", region: "APAC", text: "Indonesian (id_ID)" },
  { value: "ja_JP", key: "ja_JP", region: "APAC", text: "Japanese (ja_JP)" },
  { value: "ko_KR", key: "ko_KR", region: "APAC", text: "Korean (ko_KR)" },
  { value: "zh_CN", key: "zh_CN", region: "APAC", text: "Mandarin (zh_CN)" },
  { value: "ru_RU", key: "ru_RU", region: "APAC", text: "Russian (ru_RU)" },
  { value: "ta_IN", key: "ta_IN", region: "APAC", text: "Tamil (ta_IN)" },
  { value: "te_IN", key: "te_IN", region: "APAC", text: "Telugu (te_IN)" },
  { value: "th_TH", key: "th_TH", region: "APAC", text: "Thai (th_TH)" },
  { value: "vi_VN", key: "vi_VN", region: "APAC", text: "Vietnamese (vi_VN)" }
]

export { message_map, skills_map }
