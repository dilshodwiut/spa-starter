import { QRCode } from "antd";

const data = {
  id: 33,
  status: "created",
  is_juridic: false,
  logo: "/media/logo/image_6_NR4FG6H.svg",
  status_update_time: "2023-07-19T10:11:22.495267Z",
  status_duration_time: "259200.0",
  series: "TVL",
  number: "2300000031",
  parent_id: 31,
  doc_type_id: 1,
  act_series: "BH",
  act_number: "actte123456789",
  act_date: "2023-04-04T15:04:51Z",
  mahalla: "Navoiy ko'chasi",
  address: "Furor Progress",
  latitude: 41.299496,
  longitude: 69.240074,
  qr_code:
    "violation/qr_file/D58E0DAD46FB62099F46F47694BBE5F90D26D27ED29EA40BCF267C491C0655B4_AoZrqcE",
  is_sms: true,
  fabula:
    "test - fabula.  test - fabula.  test - fabula.  test - fabula.  test - fabula.",
  explanatoryText:
    "test - fabula.  test - fabula.  test - fabula.  test - fabula.  test - fabula.",
  equipments:
    '<!doctype html>\n<html lang="en">\n <head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Document</title>\n </head>\n <body style="margin: 0; padding: 0; box-sizing: border-box; font-size: small;">\n  <div style="width: 50%; height: 153px; margin: 0 auto; padding: 0 12px;">\n   <table style="\r\n          width: 100%;\r\n          border: 1px solid;\r\n          border-radius: 10px;\r\n          margin-top: 12px;\r\n        ">\n    <tbody>\n     <tr>\n      <td colspan="4"><h4 style="text-transform: uppercase; text-align: center">dastur bo\'yicha mavjud gaz anjomlari</h4></td>\n     </tr>\n     <tr>\n      <td style="padding: 0 4px 0 0 !important" colspan="4">\n       <table style="width: 100%;" short_name="meters_table">\n        <thead>\n         <tr style="vertical-align: text-top;">\n          <th><b>Gaz hisoblash uskunasi turi</b></th>\n          <th><b>Soni</b></th>\n          <th><b>Zavod raqami</b></th>\n          <th><b>Ko\'rsatkichi (m<sup>3</sup>)</b></th>\n          <th><b>DQK muddati</b></th>\n         </tr>\n        </thead>\n        <tbody style="text-align: center">\n         <tr short_name="meters_row">\n          <td style="text-align: center"><span short_name="meter_type"></span></td>\n          <td style="text-align: center"><span short_name="meter_count"></span></td>\n          <td style="text-align: center"><span short_name="meter_factory_number"></span></td>\n          <td style="text-align: center"><span short_name="meter_value"></span></td>\n          <td style="text-align: center"><span short_name="meter_date_DQK"></span></td>\n         </tr>\n        </tbody>\n       </table></td>\n     </tr>\n     <tr>\n      <td colspan="4">\n       <table style="margin: 6px 12px 12px; width: 50%;" short_name="inventories_table">\n        <thead style="text-align: left">\n         <tr>\n          <th colspan="1"><b>Gazdan foydalanish uskunlari turi</b></th>\n          <th></th>\n          <th colspan="2"><b>Soni</b></th>\n         </tr>\n        </thead>\n        <tbody style="text-align: center">\n         <tr short_name="inventories_row">\n          <td style="text-align: left"><span short_name="inventory_name"></span></td>\n          <td></td>\n          <td style="text-align: left"><span short_name="inventory_count"></span></td>\n         </tr>\n        </tbody>\n       </table></td>\n     </tr>\n    </tbody>\n   </table>\n  </div>\n </body>\n</html>',
  violation: {
    date: "2023-04-04T15:43:51Z",
    law_article_id: 1,
    additional_articles: [
      {
        law_article_id: 16,
      },
      {
        law_article_id: 17,
      },
    ],
    signature_date: "2017-10-31",
    signature:
      "violation/signature/D58E0DAD46FB62099F46F47694BBE5F90D26D27ED29EA40BCF267C491C0655B4_htpb4xt",
    is_agree: true,
  },
  region_id: 11,
  district_id: 140,
  employee: {
    first_name: "Elizabeth",
    last_name: "Olson",
    middle_name: "Uolson",
    certificate: "123",
    position: "Grp inspektor",
    signature:
      "signature/D58E0DAD46FB62099F46F47694BBE5F90D26D27ED29EA40BCF267C491C0655B4_eyUM7uk",
    organization: {
      id: 5,
      name: "Bektemir tumani",
    },
  },
  violation_person: {
    first_name: "Hugo",
    last_name: "Smith",
    middle_name: "Uatson",
    birth_date: "2009-04-04",
    phone: "901234567",
    avatar: "",
    place_of_birth: "Tashkent gorod",
    address: "Tashkent",
    pinfl: "12546512789856",
    document_type_id: null,
    document_series: "AA",
    document_number: "1234567",
    nationality: "Uzbek",
    citizenship: "uzbek",
  },
  violation_organization: {
    name: "test",
    type: "Food",
    stir: "11111",
    subscriber_number: "220810001",
    cadastral_number: "23123",
    address: "tashkent",
    director_fio: "James Uolson",
    phone: "901234567",
  },
  violation_type: null,
  witnesses: [
    {
      first_name: "HUGO",
      last_name: "SMITH",
      middle_name: "WATSON",
      birth_date: "2019-04-04",
      pinfl: "48946685418",
      phone: "911245789",
      address: "chilonzor",
      signature:
        "violation/witness/D58E0DAD46FB62099F46F47694BBE5F90D26D27ED29EA40BCF267C491C0655B4_7socxaf",
    },
    {
      first_name: "James",
      last_name: "Smith",
      middle_name: "Watson",
      birth_date: "2020-04-04",
      pinfl: "1234154948568",
      phone: "777777777",
      address: "yakkasaroy",
      signature:
        "violation/witness/D58E0DAD46FB62099F46F47694BBE5F90D26D27ED29EA40BCF267C491C0655B4_HJcAGAC",
    },
    {
      first_name: "Adam",
      last_name: "John",
      middle_name: "Johns",
      birth_date: "2000-04-04",
      pinfl: "1212121212121",
      phone: "984521454",
      address: "Yunsobod",
      signature:
        "violation/witness/D58E0DAD46FB62099F46F47694BBE5F90D26D27ED29EA40BCF267C491C0655B4_pCO4oX4",
    },
  ],
  files: [
    {
      file: "violation/violation/D58E0DAD46FB62099F46F47694BBE5F90D26D27ED29EA40BCF267C491C0655B4_nw9eQTl",
      type: "image",
    },
    {
      file: "violation/violation/D58E0DAD46FB62099F46F47694BBE5F90D26D27ED29EA40BCF267C491C0655B4_Yo0uXDQ",
      type: "image",
    },
    {
      file: "violation/violation/D58E0DAD46FB62099F46F47694BBE5F90D26D27ED29EA40BCF267C491C0655B4_s3zz3e4",
      type: "image",
    },
    {
      file: "violation/violation/D58E0DAD46FB62099F46F47694BBE5F90D26D27ED29EA40BCF267C491C0655B4_2KlQDtF",
      type: "image",
    },
    {
      file: "violation/violation/D58E0DAD46FB62099F46F47694BBE5F90D26D27ED29EA40BCF267C491C0655B4_yRKMVuT",
      type: "image",
    },
  ],
  equipment_consumptions: [
    {
      name: "pech",
      hourly_consumption: 11,
      daily_consumption: 321,
      price: 3213,
      illegal_days: 12,
      total_volume: 321,
      sum: 3123,
      tarrif: null,
    },
    {
      name: "ot",
      hourly_consumption: 14,
      daily_consumption: 123,
      price: 3123,
      illegal_days: 11,
      total_volume: 213,
      sum: 3123,
      tarrif: null,
    },
    {
      name: "qo'y",
      hourly_consumption: 12,
      daily_consumption: 121,
      price: 3123,
      illegal_days: 21,
      total_volume: 131,
      sum: 3211,
      tarrif: null,
    },
  ],
  equipment_docs: [],
  committee_members: [
    {
      fio: "SADFASFDA",
      position: "SADFSAFD",
      signature:
        "violation/CommitteeMembers/D58E0DAD46FB62099F46F47694BBE5F90D26D27ED29EA40BCF267C491C0655B4",
    },
  ],
  total_volume: 665,
  total_sum: 9457,
  region: {
    id: 11,
    name: "ТАШКЕНТСКАЯ",
    code: "27000",
    serial: "TVL",
    parent: null,
  },
  district: {
    id: 140,
    name: "БЕКАБАДСКИЙ ",
    code: "27220",
    translations: {
      ru: {
        name: "БЕКАБАДСКИЙ ",
      },
      uz: {
        name: "BEKOBOD TUMANI",
      },
      oz: {
        name: "BEKOBOD TUMANI",
      },
    },
  },
  doc_type: {
    id: 1,
    name: "Акт о незаконном использовании природного газа оптовыми абонентами",
    logo: "http://apied.devel.uz/media/logo/image_6_NR4FG6H.svg",
  },
  created_at: "2023-07-19T10:11:22.495267Z",
};

export default function PdfGen2(): React.ReactElement {
  return (
    <div
      id="document"
      style={{
        // backgroundColor: "#f5f5f5",
        width: "210mm",
        minHeight: "297mm",
        marginLeft: "auto",
        marginRight: "auto",
        fontFamily: "Roboto",
      }}
    >
      <div style={{ fontSize: ".7rem", fontWeight: "500", marginTop: "1rem" }}>
        E-Ma&apos;muriy ish
      </div>
      {/* qr code */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <div style={{ display: "flex", gap: "1rem" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: ".9rem",
                fontWeight: "500",
                color: "grey",
              }}
            >
              <span>Seriya</span>
              <span>Raqam</span>
              <span>Sana</span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: ".9rem",
              }}
            >
              <strong>AND</strong>
              <strong>2240106381566</strong>
              <strong>01.03.2023</strong>
            </div>
          </div>
          <div
            style={{
              border: "1px solid #ddd",
              borderRadius: ".5rem",
              padding: ".4rem",
            }}
          >
            <QRCode value={data.qr_code} bordered={false} size={85} />
          </div>
        </div>
      </div>
      {/* header */}
      <div
        style={{
          fontSize: ".6rem",
          fontStyle: "italic",
          lineHeight: ".8rem",
        }}
      >
        Tabiiy gazdan foydalanish qoidalariga asosan
      </div>
      <div
        style={{
          fontSize: "1.2rem",
          fontWeight: "500",
          width: "55%",
          lineHeight: "1.4rem",
          marginBottom: "1rem",
        }}
      >
        Tabiiy gazdan noqonuniy foydalanish holati yuzasidan gaz hajmini
        hisoblash dalolatnomasi
      </div>
      table
    </div>
  );
}
