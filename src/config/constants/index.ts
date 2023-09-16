export const KEY_TOKEN = 'S0VZX1RPS0VOX1dFQg';
export const KEY_AUTH_INFO = 'YXV0aF9pbmZvWEB';
export const KEY_LANGUAGE = 'S0VZX0xBTkdVQUdF';
export const DEFAULT_LANGUAGE = 'vi';

export const TYPE_FORMAT_DATE_ASIA_HO_CHI_MINH = 'DD/MM/YYYY';
export const TYPE_FORMAT_DATE_ASIA_HO_CHI_MINH_01 = 'DD/MM';
export const TYPE_FORMAT_DATE_TIME_ASIA_HO_CHI_MINH_01 = 'DD/MM/YYYY HH:mm:ss';
export const TYPE_FORMAT_DATE_TIME_ASIA_HO_CHI_MINH_02 = 'HH:mm:ss DD/MM/YYYY';
export const TYPE_FORMAT_DATE_TIME_ASIA_HO_CHI_MINH_03 = 'DD/MM/YYYY HH:mm';
export const TYPE_FORMAT_TIME_ASIA_HO_CHI_MINH = 'HH:mm';
export const TYPE_FORMAT_DATE_SEND_REQUEST_SERVER = 'YYYY-MM-DD';
export const TYPE_FORMAT_DATE_SEND_REQUEST_BOOK_TICKET = 'YYYY-MM-DDTHH:mm:ss.SSSZ';
export const TYPE_FORMAT_HOUR_ASIA_HO_CHI_MINH = 'HH';
export const TYPE_FORMAT_MINUTE_ASIA_HO_CHI_MINH = 'mm';
export const TYPE_FORMAT_DATE_TIME = 'HH:mm DD/MM/YYYY';

export const REGEX_PHONE = /^[\+\d]{0,1}\d{7,15}$/gm;
export const REGEX_PASSWORD = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()]).{8,}$/;
export const REGEX_EMAIL =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const REGEX_NO_ALL_SPACE = /[^\s]+/g;

export const PAGE_SIZE_TABLE = 20;

export const DATA_SEARCH_TICKET = 'Zm9ybV9zZWFyY2hfdGlja2WEBV0';
export const DATA_BOOK_TICKET = 'REFUQV9CT09LX1RJQ0tFVAWEB';
export const KEY_FINAL_SEARCH_TIME = 'S0VZX0ZJTkFMX1NFQVJDSF9USU1FWEB';

export const KEY_CHANGE_MINUS = 'MINUS';
export const KEY_CHANGE_PLUS = 'PLUS';
export const KEY_CHANGE_ADULT = 'KEY_CHANGE_ADULT';
export const KEY_CHANGE_CHILDREN = 'KEY_CHANGE_CHILDREN';
export const KEY_CHANGE_INFANT = 'KEY_CHANGE_INFANT';
export const MAX_NUMBER_GUEST = 9;

export const KEY_BAGGAGE_DEPARTURE = 'baggageDeparture';
export const KEY_BAGGAGE_RETURN = 'baggageReturn';

export const KEY_INSURANCE_CODE = 'INSR';
export const KEY_PRIORITY_CODE = 'PRCI';
export const KEY_VOUCHER_CODE = 'VOUC';

//Image Url
export const CLOUD_FRONT_IMAGE_URL = process.env.NEXT_PUBLIC_URL_IMAGE;

// Filter flight ticket
export const KEY_FILTER_BY_AIRLINE_CODE = 'KEY_FILTER_BY_AIRLINE_CODE';
export const KEY_FILTER_BY_TIME = 'KEY_FILTER_BY_TIME';
export const KEY_ALL = 'KEY_ALL';

export const KEY_SORT_FLIGHT_TICKET = 'KEY_SORT_FLIGHT_TICKET';
export const KEY_SORT_EARLIEST_DEPARTURE = 'KEY_SORT_EARLIEST_DEPARTURE';
export const KEY_SORT_LATEST_DEPARTURE = 'KEY_SORT_LATEST_DEPARTURE';
export const KEY_SORT_THE_CHEAPEST = 'KEY_SORT_THE_CHEAPEST';
export const KEY_TOGGLE_PRICE_INCLUDES_TAX = 'KEY_TOGGLE_PRICE_INCLUDES_TAX';

export const INTERNATIONAL_AIRLINE_SYSTEM = 'GALILEO';
export const AREA_CODE_VIETNAM = 'VN';

export const AIRLINE_CODE = ['VN', 'QH', 'VJ', INTERNATIONAL_AIRLINE_SYSTEM];

// Mini app
export const KEY_TRANS_ID = 'transId';
export const KEY_SUB_ID = 'subId';
export const KEY_MERCHANT_CODE = 'merchant_code';
export const KEY_CHECK_SUM = 'check_sum';

export const KEY_SELECTED_CONVERSATION_DATA = 'selectedConversation';
export const KEY_CHAT_ITEM_DATA = 'chatItemData';

export const DARK_MODE = 'dark';
export const LIGHT_MODE = 'light';
export const KEY_THEME = 'theme';
