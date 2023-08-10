import { Checkbox, QRCode } from "antd";
import {
  FileImageOutlined,
  FileTextOutlined,
  PlaySquareOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

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

export default function PdfGen(): React.ReactElement {
  const currDateTime = dayjs().format("DD.MM.YYYY | HH:mm");

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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontWeight: "500",
          marginTop: "1rem",
        }}
      >
        <span style={{ fontSize: ".7rem" }}>E-Ma&apos;muriy ish</span>
        <span style={{ fontSize: ".7rem" }}>
          CHOP ETILGAN SANA: {currDateTime}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <div>
          {/* Header */}
          <span
            style={{ fontStyle: "italic", fontSize: "0.6rem", color: "grey" }}
          >
            Tabiiy gazdan foydalanish qoidagalariga asosan
          </span>
          <div
            style={{
              fontSize: "1.2rem",
              fontWeight: "500",
              marginBottom: "1rem",
              lineHeight: "1.4rem",
            }}
          >
            Tabiiy gazdan noqonuniy ravishda foydalanish <br /> holati
            bo&apos;yicha dalolatnoma-*
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}
          >
            {/* Seriya Raqam */}
            <div style={{ display: "flex", gap: "5rem" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  lineHeight: "1rem",
                }}
              >
                <span style={{ fontSize: "0.6rem", color: "grey" }}>
                  Seriya
                </span>
                <span
                  style={{
                    fontSize: "1.2rem",
                    color: "green",
                    fontWeight: "bold",
                  }}
                >
                  BH
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  lineHeight: "1rem",
                }}
              >
                <span style={{ fontSize: "0.6rem", color: "grey" }}>Raqam</span>
                <span
                  style={{
                    fontSize: "1.2rem",
                    color: "green",
                    fontWeight: "bold",
                  }}
                >
                  2240106381566
                </span>
              </div>
            </div>

            {/* Sana Viloyat */}
            <div style={{ display: "flex", gap: "7rem" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  lineHeight: "1rem",
                }}
              >
                <span style={{ fontSize: "0.6rem", color: "grey" }}>Sana</span>
                <span
                  style={{
                    fontSize: ".9rem",
                    color: "green",
                    fontWeight: "700",
                  }}
                >
                  01.03.2023
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  lineHeight: "1rem",
                }}
              >
                <span style={{ fontSize: "0.6rem", color: "grey" }}>
                  Viloyat, shahar, tuman
                </span>
                <span
                  style={{
                    fontSize: ".9rem",
                    color: "green",
                    fontWeight: "700",
                    textTransform: "uppercase",
                  }}
                >
                  Buxoro shofirkon tumani-*
                </span>
              </div>
            </div>
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

      {/* Korxona */}
      <div>
        <span
          style={{
            fontWeight: "500",
            fontSize: ".8rem",
            textTransform: "uppercase",
          }}
        >
          Dalolatnoma tuzgan korxona (Mas&apos;ul Xodim)
        </span>

        {/* Korxona details */}
        <div
          style={{
            margin: "0 1rem .3rem 4rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <div style={{ display: "flex", gap: "4rem" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                lineHeight: "1rem",
              }}
            >
              <span style={{ fontSize: "0.6rem", color: "grey" }}>Korxona</span>
              <span
                style={{
                  color: "green",
                  fontWeight: "700",
                  fontSize: "0.7rem",
                  textTransform: "uppercase",
                  lineHeight: ".8rem",
                }}
              >
                Energetika Vazirligi Huzuridagi <br />{" "}
                &quot;O&apos;zenergoinspeksiya&quot;-*
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "0.6rem", color: "grey" }}>
                Lavozimi
              </span>
              <span
                style={{
                  color: "green",
                  fontWeight: "700",
                  fontSize: ".7rem",
                }}
              >
                Bo&apos;lim boshlig&apos;i-*
              </span>
            </div>
          </div>

          <div style={{ display: "flex", gap: "4rem" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "0.6rem", color: "grey" }}>F.I.O</span>
              <span
                style={{
                  color: "green",
                  fontWeight: "700",
                  fontSize: ".7rem",
                  textTransform: "uppercase",
                }}
              >
                Hamroyev Bekzod Hamzayevich
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "0.6rem", color: "grey" }}>
                guvohnoma (seriyasi, raqami)
              </span>
              <span
                style={{
                  color: "green",
                  fontWeight: "700",
                  fontSize: ".7rem",
                  textTransform: "uppercase",
                }}
              >
                221
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div
        style={{
          display: "flex",
          margin: "1rem auto .2rem auto",
          paddingTop: ".5rem",
          borderTop: "3px dashed #ddd",
          borderBottom: "3px dashed #ddd",
        }}
      >
        {/* Left */}
        <div
          style={{
            flex: "1",
            display: "flex",
            flexDirection: "column",
            marginRight: ".5rem",
            borderRight: "3px dashed #ddd",
          }}
        >
          <div
            style={{
              fontWeight: "500",
              fontSize: ".8rem",
              textTransform: "uppercase",
              lineHeight: ".7rem",
            }}
          >
            Qoidabuzarlik sodir etgan shaxs
          </div>
          <span
            style={{
              fontWeight: "300",
              fontSize: "0.6rem",
              marginBottom: ".5rem",
            }}
          >
            shaxsning ma&apos;lumotlari, multibiometrik taqqoslash orqali
            identifikatsiya qilingan
          </span>
          {/* avatar with info */}
          <div
            style={{
              display: "flex",
              alignItems: "start",
              gap: "1rem",
              marginBottom: "1rem",
            }}
          >
            <div
              style={{
                border: "1px solid #aaa",
                borderRadius: ".6rem",
                padding: ".5rem .2rem 0 .2rem",
                background: "skyblue",
              }}
            >
              <img src="/man.png" alt="man" width={90} />
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: ".3rem" }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  lineHeight: ".8rem",
                }}
              >
                <span
                  style={{
                    fontSize: ".7rem",
                    fontWeight: "500",
                    color: "grey",
                  }}
                >
                  F.I.O
                </span>
                <span
                  style={{
                    fontSize: ".7rem",
                    fontWeight: "700",
                    color: "green",
                    textTransform: "uppercase",
                  }}
                >
                  Norov Ilhom Ibragimovich
                </span>
              </div>

              <div style={{ display: "flex", gap: "5rem" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    lineHeight: ".8rem",
                  }}
                >
                  <span style={{ fontSize: ".6rem", color: "grey" }}>
                    Tug&apos;ilgan sana
                  </span>
                  <span
                    style={{
                      fontSize: ".7rem",
                      color: "green",
                      fontWeight: "700",
                    }}
                  >
                    27.09.1985
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    lineHeight: ".8rem",
                  }}
                >
                  <span style={{ fontSize: ".6rem", color: "grey" }}>
                    Telefon raqami
                  </span>
                  <span
                    style={{
                      fontSize: ".7rem",
                      color: "green",
                      fontWeight: "700",
                    }}
                  >
                    +998 (98) 180-00-62
                  </span>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  lineHeight: ".8rem",
                }}
              >
                <span style={{ fontSize: ".6rem", color: "grey" }}>
                  Tug&apos;ilgan joyi
                </span>
                <span
                  style={{
                    fontSize: ".7rem",
                    fontWeight: "700",
                    color: "green",
                    textTransform: "uppercase",
                  }}
                >
                  O&apos;zbekiston, Buxoro, G&apos;ijduvon Tumani,
                  G&apos;ijduvon Tumani
                </span>
              </div>
            </div>
          </div>
          {/* passport seriya */}
          <div style={{ display: "flex", gap: "4rem", marginBottom: ".5rem" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                lineHeight: ".8rem",
              }}
            >
              <span style={{ fontSize: ".6rem", color: "grey" }}>
                Hujjat seriya va raqami
              </span>
              <span
                style={{
                  fontSize: ".7rem",
                  fontWeight: "700",
                  color: "green",
                  textTransform: "uppercase",
                }}
              >
                AA 1475156
              </span>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                lineHeight: ".8rem",
              }}
            >
              <span style={{ fontSize: ".6rem", color: "grey" }}>Millati</span>
              <span
                style={{
                  fontSize: ".7rem",
                  fontWeight: "700",
                  color: "green",
                  textTransform: "uppercase",
                }}
              >
                O&apos;zbek
              </span>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                lineHeight: ".8rem",
              }}
            >
              <span style={{ fontSize: ".6rem", color: "grey" }}>
                Fuqaroligi
              </span>
              <span
                style={{
                  fontSize: ".7rem",
                  fontWeight: "700",
                  color: "green",
                  textTransform: "uppercase",
                }}
              >
                O&apos;zbekiston fuqarosi
              </span>
            </div>
          </div>

          {/* korxona ma'lumotlari */}
          <div
            style={{
              border: "1px solid black",
              borderRadius: ".6rem",
              marginRight: ".5rem",
              padding: ".2rem",
              marginBottom: ".5rem",
            }}
          >
            <div
              style={{
                textAlign: "center",
                textTransform: "uppercase",
                fontSize: ".6rem",
                fontWeight: "700",
                marginBottom: ".5rem",
              }}
            >
              Korxona to&apos;g&apos;risidagi ma&apos;lumotlar:
            </div>

            <div
              style={{ display: "flex", gap: "3rem", marginBottom: ".5rem" }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  lineHeight: ".8rem",
                }}
              >
                <span style={{ fontSize: ".6rem", color: "grey" }}>
                  Korxona nomi
                </span>
                <span
                  style={{
                    fontSize: ".7rem",
                    color: "green",
                    fontWeight: "700",
                  }}
                >
                  &quot;Buxoro neft baza&quot; MCHJ
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  lineHeight: ".8rem",
                }}
              >
                <span style={{ fontSize: ".6rem", color: "grey" }}>
                  Faoliyat turi
                </span>
                <span
                  style={{
                    fontSize: ".7rem",
                    color: "green",
                    fontWeight: "700",
                  }}
                >
                  neft mahsulotlarini saqlash va sotish
                </span>
              </div>
            </div>

            <div
              style={{ display: "flex", gap: "3rem", marginBottom: ".5rem" }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  lineHeight: ".8rem",
                }}
              >
                <span style={{ fontSize: ".6rem", color: "grey" }}>STIR</span>
                <span
                  style={{
                    fontSize: ".7rem",
                    color: "green",
                    fontWeight: "700",
                  }}
                >
                  300 097 878
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  lineHeight: ".8rem",
                }}
              >
                <span style={{ fontSize: ".6rem", color: "grey" }}>
                  Dasturdagi abonent raqami
                </span>
                <span
                  style={{
                    fontSize: ".7rem",
                    color: "green",
                    fontWeight: "700",
                  }}
                >
                  10070021321
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  lineHeight: ".8rem",
                }}
              >
                <span style={{ fontSize: ".6rem", color: "grey" }}>
                  Kadastr raqami
                </span>
                <span
                  style={{
                    fontSize: ".7rem",
                    color: "green",
                    fontWeight: "700",
                  }}
                >
                  12:34:56:7890
                </span>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                lineHeight: ".8rem",
                marginBottom: ".5rem",
              }}
            >
              <span style={{ fontSize: ".6rem", color: "grey" }}>
                Yuridik manzili
              </span>
              <span
                style={{
                  fontSize: ".7rem",
                  fontWeight: "700",
                  color: "green",
                  textTransform: "uppercase",
                }}
              >
                O&apos;zbekiston, Toshkent shahri, M. Ulug&apos;bek tumani, -
                ul. TT3-2 mavzesi d. 19 kv. 23
              </span>
            </div>

            <div
              style={{ display: "flex", gap: "5rem", marginBottom: ".2rem" }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  lineHeight: ".8rem",
                }}
              >
                <span style={{ fontSize: ".6rem", color: "grey" }}>
                  Korxona rahbarining F.I.O
                </span>
                <span
                  style={{
                    fontSize: ".7rem",
                    color: "green",
                    fontWeight: "700",
                    textTransform: "uppercase",
                  }}
                >
                  Norov Ahmad Ibragimovich
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  lineHeight: ".8rem",
                }}
              >
                <span style={{ fontSize: ".6rem", color: "grey" }}>
                  Telefon raqami
                </span>
                <span
                  style={{
                    fontSize: ".7rem",
                    color: "green",
                    fontWeight: "700",
                  }}
                >
                  +998 (99) 001-01-01
                </span>
              </div>
            </div>
          </div>

          {/* gaz anjomlari */}
          <div
            style={{
              border: "1px solid black",
              borderRadius: ".6rem",
              marginRight: ".5rem",
              marginBottom: ".5rem",
              padding: ".2rem",
            }}
          >
            <div
              style={{
                textAlign: "center",
                textTransform: "uppercase",
                fontSize: ".6rem",
                fontWeight: "700",
                marginBottom: ".5rem",
              }}
            >
              Dastur bo&apos;yicha mavjud gaz anjomlari
            </div>

            <div
              style={{ display: "flex", gap: ".5rem", marginBottom: ".5rem" }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  lineHeight: ".6rem",
                }}
              >
                <span style={{ fontSize: ".6rem", color: "grey" }}>
                  Gaz hisoblash uskunasi turi
                </span>
                <span style={{ fontSize: ".7rem", fontWeight: "700" }}>
                  &quot;Avtopilot PRO&quot;
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  lineHeight: ".6rem",
                }}
              >
                <span style={{ fontSize: ".6rem", color: "grey" }}>soni</span>
                <span style={{ fontSize: ".7rem", fontWeight: "700" }}>2</span>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  lineHeight: ".6rem",
                }}
              >
                <span style={{ fontSize: ".6rem", color: "grey" }}>
                  zavod raqami
                </span>
                <span style={{ fontSize: ".7rem", fontWeight: "700" }}>
                  987654321
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  lineHeight: ".6rem",
                }}
              >
                <span style={{ fontSize: ".6rem", color: "grey" }}>
                  ko&apos;rsatkich (m<sup>3</sup>)
                </span>
                <span style={{ fontSize: ".7rem", fontWeight: "700" }}>
                  125 000
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  lineHeight: ".6rem",
                }}
              >
                <span style={{ fontSize: ".6rem", color: "grey" }}>
                  DQK muddati
                </span>
                <span style={{ fontSize: ".7rem", fontWeight: "700" }}>
                  25.05.2024
                </span>
              </div>
            </div>

            <div
              style={{ display: "flex", gap: "2rem", marginBottom: ".5rem" }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  lineHeight: ".6rem",
                }}
              >
                <span style={{ fontSize: ".6rem", color: "grey" }}>
                  Gazdan foydalanish uskunalari turi
                </span>
                <span style={{ fontSize: ".7rem", fontWeight: "700" }}>
                  Isitish pechi
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  lineHeight: ".6rem",
                }}
              >
                <span style={{ fontSize: ".6rem", color: "grey" }}>soni</span>
                <span style={{ fontSize: ".7rem", fontWeight: "700" }}>1</span>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: "2.65rem",
                fontSize: ".7rem",
                fontWeight: "700",
                marginBottom: "1rem",
              }}
            >
              <span>Par ishlab chiqarish qozoni</span>
              <span>2</span>
            </div>

            <div
              style={{
                textAlign: "center",
                textTransform: "uppercase",
                fontSize: ".6rem",
                fontWeight: "700",
                marginBottom: ".5rem",
              }}
            >
              Loyihadan tashqari aniqlangan gaz anjomlari
            </div>

            <div
              style={{ display: "flex", gap: "2rem", marginBottom: ".5rem" }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  lineHeight: ".6rem",
                }}
              >
                <span style={{ fontSize: ".6rem", color: "grey" }}>
                  Gazdan foydalanish uskunalari turi
                </span>
                <span style={{ fontSize: ".7rem", fontWeight: "700" }}>
                  Isitish pechi
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  lineHeight: ".6rem",
                }}
              >
                <span style={{ fontSize: ".6rem", color: "grey" }}>soni</span>
                <span style={{ fontSize: ".7rem", fontWeight: "700" }}>1</span>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: "2.65rem",
                fontSize: ".7rem",
                fontWeight: "700",
                marginBottom: "2rem",
              }}
            >
              <span>Par ishlab chiqarish qozoni</span>
              <span>1</span>
            </div>
          </div>
        </div>

        {/* Right */}
        <div style={{ flex: "1" }}>
          <div
            style={{
              fontWeight: "700",
              fontSize: ".7rem",
              textTransform: "uppercase",
              marginBottom: ".3rem",
            }}
          >
            &quot;Tabiiy gazdan foydalanish qoidagalari&quot;da
            ko&apos;rsatilgan qoidabuzarliklar sodir etildi
          </div>

          {/* qoidabuzarlik */}
          <div
            style={{
              display: "flex",
              gap: "2rem",
              alignItems: "center",
              marginBottom: ".5rem",
            }}
          >
            <span style={{ fontWeight: "500", fontSize: ".8rem" }}>
              qoidabuzarlik sodir etilgan sana
            </span>

            <div
              style={{
                display: "flex",
                gap: ".3rem",
                lineHeight: "1rem",
              }}
            >
              <span style={{ fontSize: ".6rem", color: "grey" }}>Vaqt:</span>
              <span
                style={{ fontSize: ".7rem", fontWeight: "700", color: "green" }}
              >
                17:47
              </span>
            </div>

            <div style={{ display: "flex", gap: ".3rem", lineHeight: "1rem" }}>
              <span style={{ fontSize: ".6rem", color: "grey" }}>Sana:</span>
              <span
                style={{ fontSize: ".7rem", fontWeight: "700", color: "green" }}
              >
                01.03.2023
              </span>
            </div>
          </div>

          {/* Band, qism */}
          <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
            <div
              style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}
            >
              <span style={{ fontSize: ".6rem", color: "grey" }}>Band</span>
              <span style={{ fontWeight: "700", color: "green" }}>133</span>
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}
            >
              <span style={{ fontSize: ".6rem", color: "grey" }}>Qism</span>
              <span style={{ fontWeight: "700", color: "green" }}>1</span>
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}
            >
              <span style={{ fontSize: ".6rem", color: "grey" }}>
                Kichik Band
              </span>
              <span style={{ fontWeight: "700", color: "green" }}>3</span>
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}
            >
              <span style={{ fontSize: ".6rem", color: "grey" }}>
                Qo&apos;shimcha modda
              </span>
              <span style={{ fontSize: ".7rem", fontWeight: "500" }}>
                yo&apos;q
              </span>
            </div>
          </div>

          {/* Dalolatnoma bn tanishdim */}
          <div style={{ fontSize: ".7rem", fontWeight: "700" }}>
            Dalolatnoma bilan tanishdim va mening huquq va majburiyatlarim
            tushuntirildi.
          </div>

          {/* qoidabuzar imzosi */}
          <div
            style={{
              fontSize: ".6rem",
              fontWeight: "300",
              marginBottom: ".5rem",
            }}
          >
            qoidabuzarlik sodir etgan shaxsning imzosi
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  border: "1px solid #ddd",
                  borderRadius: ".5rem",
                  display: "inline-block",
                  textAlign: "center",
                  width: "10rem",
                  fontSize: ".6rem",
                  fontWeight: "700",
                  lineHeight: ".7rem",
                  padding: ".3rem 0",
                }}
              >
                Elektron grafik imzo bilan tasdiqlangan <br /> 01.03.2023
              </span>
              <span style={{ fontSize: ".6rem", fontWeight: "300" }}>
                Elektron imzo
              </span>
            </div>
            <div style={{ fontSize: ".6rem" }}>
              <span style={{ display: "block", fontWeight: "500" }}>
                <Checkbox checked /> Men roziman
              </span>
              <span style={{ display: "block", fontWeight: "500" }}>
                <Checkbox /> Rozi emasman
              </span>
            </div>
          </div>

          {/* card 1 */}
          <div
            style={{
              border: "1px solid black",
              borderRadius: ".5rem",
              padding: "0 .5rem",
              marginBottom: ".8rem",
            }}
          >
            <span
              style={{ fontSize: ".6rem", color: "#777", fontWeight: "500" }}
            >
              Qoidabuzarlik qayerda sodir etilgan va qanday tartibda.{" "}
              <span style={{ fontWeight: "700", color: "black" }}>
                tafsiloti
              </span>
            </span>
            <p
              style={{
                fontSize: ".5rem",
                fontWeight: "700",
                color: "green",
                lineHeight: ".6rem",
              }}
            >
              01.03.2023 y, 17:47 VAQTDA, BUXORO, SHOFIRKON TUMANI HUDUDIDA
              NOROV ILHOM IBRAGIMOVICH 27.09.1985 Y. TUG&apos;ILGAN,
              &quot;133-1q-3k ***&quot; BANDI BO&apos;YICHA QOIDABUZARLIK SODIR
              ETDI. JUMLADAN: Vakolatli tashkilotlardan ruxsat olmasdan,
              loyiha-texnik hujjatlarsiz, shartnomasiz tabiiy gazdan foydalanib
              kelayotganligi aniqlandi. **
            </p>

            <div
              style={{
                textAlign: "right",
                paddingRight: ".5rem",
                marginBottom: ".8rem",
              }}
            >
              <span
                style={{
                  fontSize: ".5rem",
                  fontWeight: "300",
                  border: "1px solid #ddd",
                  borderRadius: ".4rem",
                  padding: ".3rem 2rem",
                }}
              >
                Foto ma&apos;lumot
              </span>
            </div>
          </div>

          {/* card 2 */}
          <div
            style={{
              border: "1px solid black",
              borderRadius: ".5rem",
              padding: "0 .5rem",
            }}
          >
            <span
              style={{ fontSize: ".6rem", color: "#777", fontWeight: "500" }}
            >
              Qoidabuzarlik sodir etgan shaxsning{" "}
              <span style={{ fontWeight: "700", color: "black" }}>
                tushuntirish xati
              </span>
            </span>
            <p
              style={{
                fontSize: ".5rem",
                fontWeight: "700",
                color: "green",
                lineHeight: ".6rem",
                marginBottom: ".3rem",
              }}
            >
              01.03.2023 y, 17:47 VAQTDA, BUXORO, SHOFIRKON TUMANI HUDUDIDA
              NOROV ILHOM IBRAGIMOVICH 27.09.1985 Y. TUG&apos;ILGAN,
              &quot;133-1q-3k ***&quot; BANDI BO&apos;YICHA QOIDABUZARLIK SODIR
              ETDIM.
            </p>

            <p
              style={{
                fontSize: ".5rem",
                fontWeight: "700",
                color: "green",
                lineHeight: ".6rem",
              }}
            >
              JUMLADAN, Vakolatli tashkilotlardan ruxsat olmasdan, loyiha-texnik
              hujjatlarsiz, shartnomasiz tabiiy gazdan foydalandim.
            </p>

            <div
              style={{
                textAlign: "right",
                paddingRight: ".5rem",
                marginBottom: ".8rem",
              }}
            >
              <span
                style={{
                  fontSize: ".5rem",
                  fontWeight: "300",
                  border: "1px solid #ddd",
                  borderRadius: ".4rem",
                  padding: ".3rem 2rem",
                }}
              >
                Elektron imzo
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* row 1 */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          marginBottom: ".8rem",
        }}
      >
        {/* xolislar */}
        <div style={{ flex: "1" }}>
          <div style={{ fontSize: ".8rem", marginBottom: ".2rem" }}>
            Sodir etilgan qoidabuzarlikni tasdiqlovchi xolislar:
          </div>

          <div style={{ display: "flex", gap: "1rem", marginLeft: "1rem" }}>
            <div
              style={{
                border: "1px solid black",
                borderRadius: ".5rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: ".5rem",
                padding: ".4rem .3rem",
                textAlign: "center",
              }}
            >
              <span style={{ fontSize: ".6rem", color: "grey" }}>
                Xolisning F.I.O, tug&apos;ilgan sanasi, telefoni va yashash
                manzili
              </span>
              <span style={{ fontSize: ".85rem", fontWeight: "700" }}>
                Xolis mavjud emas
              </span>
              <span
                style={{
                  fontSize: ".5rem",
                  fontWeight: "300",
                  border: "1px solid #ddd",
                  borderRadius: ".4rem",
                  padding: ".2rem 1rem",
                  margin: ".6rem 0 .2rem 0",
                  alignSelf: "flex-end",
                }}
              >
                Elektron imzo
              </span>
            </div>

            <div
              style={{
                border: "1px solid black",
                borderRadius: ".5rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: ".5rem",
                padding: ".4rem .3rem",
                textAlign: "center",
              }}
            >
              <span style={{ fontSize: ".6rem", color: "grey" }}>
                Xolisning F.I.O, tug&apos;ilgan sanasi, telefoni va yashash
                manzili
              </span>
              <span style={{ fontSize: ".85rem", fontWeight: "700" }}>
                Xolis mavjud emas
              </span>
              <span
                style={{
                  fontSize: ".5rem",
                  fontWeight: "300",
                  border: "1px solid #ddd",
                  borderRadius: ".4rem",
                  padding: ".2rem 1rem",
                  margin: ".6rem 0 .2rem 0",
                  alignSelf: "flex-end",
                }}
              >
                Elektron imzo
              </span>
            </div>
          </div>
        </div>

        {/* dalolatnoma */}
        <div style={{ flex: "1" }}>
          <div style={{ fontSize: ".8rem", marginBottom: ".2rem" }}>
            Dalolatnoma tuzgan shaxs imzosi:
          </div>

          <div
            style={{
              border: "1px solid black",
              borderRadius: ".5rem",
              height: "113px",
              position: "relative",
            }}
          >
            <span
              style={{
                fontSize: ".5rem",
                fontWeight: "300",
                border: "1px solid #ddd",
                borderRadius: ".7rem",
                padding: ".3rem 2rem",
                position: "absolute",
                right: "1rem",
                bottom: "1rem",
                height: "2.5rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Elektron imzo
            </span>
          </div>
        </div>
      </div>

      {/* row2 */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          marginBottom: "1rem",
        }}
      >
        {/* hujjatlar */}
        <div style={{ flex: "1" }}>
          <div
            style={{
              fontSize: ".6rem",
              marginBottom: ".2rem",
              fontWeight: "500",
              color: "green",
            }}
          >
            Dalolatnomaga ilova etilgan hujjatlar
          </div>

          <div
            style={{
              border: "1px solid black",
              borderRadius: ".5rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: ".7rem",
              padding: ".4rem .3rem",
              textAlign: "center",
              height: "70px",
            }}
          >
            <span
              style={{ fontSize: ".5rem", fontWeight: "500", color: "grey" }}
            >
              Qoidabuzarlik bo&apos;yicha ilova qilinayotgan hujjatlar, (foto,
              video va boshqa ma&apos;lumotlar)
            </span>

            <span>
              <FileTextOutlined style={{ fontSize: "1.6rem" }} />
              <FileImageOutlined style={{ fontSize: "1.6rem" }} />
              <PlaySquareOutlined style={{ fontSize: "1.6rem" }} />
            </span>
          </div>
        </div>

        {/* olib qo'yilgan */}
        <div style={{ flex: "1" }}>
          <div
            style={{ fontSize: ".6rem", marginBottom: ".2rem", color: "grey" }}
          >
            Olib qo&apos;yilgan ashyolari
          </div>

          <div
            style={{
              border: "1px solid black",
              borderRadius: ".5rem",
              fontSize: ".8rem",
              fontWeight: "700",
              height: "70px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span style={{ width: "60%" }}>
              Olib qo&apos;yilgan ashyolar ****
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
