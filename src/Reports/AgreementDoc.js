import React, { useEffect, useState } from "react";
import {
  Document,
  Font,
  Page,
  Text,
  StyleSheet,
} from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";
import EtCurrency from "../Common/modules/currency";
import AmharicFont from "./font/ebrima.ttf";
import AgreementStyles from "./AgreementDoc/AgreementStyles";
import Btable from "./Table/Btable";
import { useParams } from "react-router-dom";
import axios from "axios";
import AgreementHeader from "./AgreementDoc/AgreementHeader";

const Styles = StyleSheet.create({
  text: {
    marginTop: 1,
    fontSize: 12,
    textAlign: "center",
    fontFamily: "OpenSans",
    fontWeight: "bold",
    color: "red",
  },
});

Font.register({
  family: "AmharicFont",
  src: AmharicFont,
});

Font.register({
  family: "OpenSans",
  fonts: [
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf",
    },
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf",
      fontWeight: 600,
    },
  ],
});

const Subtitle = ({ children, ...props }) => (
  <Text style={AgreementStyles.subtitle} {...props}>
    {children}
  </Text>
);

function AgreementDoc() {
  const { customerId, loanId } = useParams();
  const [customer, setCustomer] = useState([]);
  const [loan, setLoan] = useState([]);

  useEffect(() => {
    getCustomer();
    getLoan();
  }, []);


  const getCustomer = () => {
    axios
      .get(`${serverIP}customer/customers/${customerId}`)
      .then((res) => {
        console.log(res.data);
        setCustomer(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getLoan = () => {
    axios
      .get(`${serverIP}loan/loans/${loanId}`)
      .then((res) => {
        console.log(res.data);
        setLoan(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <PDFViewer style={{ width: "100%", height: 700 }}>
      <Document title="Loan Agreement">
        <Page style={AgreementStyles.body} wrap>
          <AgreementHeader />
          <Text style={AgreementStyles.author}>የውል ስጪ እና ውል ተቀባይ ኣድራሻ</Text>
          <Text style={AgreementStyles.text}>
            ከዚህ ቀጥሎ «ተበዳሪ» እየተባሉ የሚጠቀሱት፦ {customer.amDisplayName}
          </Text>
          <Text style={AgreementStyles.text}>
            አድራሻ፦ {customer.address + ", " + customer.mobileNo}
          </Text>
          <Text style={AgreementStyles.text}>
            ከዚህ ቀጥሎ «ተቋሙ» እየተባለ የሚጠራው፦ አሚጎስ የቁጠባና ብድር ህብረት ስራ ማህበር(ህስማ)
          </Text>
          <Text style={AgreementStyles.text}>
            አድራሻ፦ ፖስታሳ.ቁ፦ 20732/1000፤አዲስ አበባ ስልክ ቁጥር፦
          </Text>
          <Text style={AgreementStyles.text}>
            ይህንን በተወሰነ ጊዜ የሚከፈል ብድር (term loan) ውሉ በቀን 12/24/2023 ዓ.ም ቀጥሎ
            በተዘረዘሩት የውል ኣንቀጾች ተዋውለናል፡፡
          </Text>
          <Subtitle>አንቀጽ-1፦ ስለብድር እና ወለድ መጠን በተመለከተ </Subtitle>
          <Text style={AgreementStyles.text}>
            1.1. በዚህ ውል ውስጥ በተገለጸው ስምምነት መሰረት ከላይ ተበዳሪ ተብለው ስማቸውና ኣድራሻቸው የተገለጹት
            ኣባል ብድራቸው ከነኣጠቃላይ ወለዱ እንድሚከተለው ቀርበዋል። 1.1.1. ዋናው (principal) የብድር
            መጠን 1.1.2. የወልድ መጠን 1.1.3. ጠቅላላ ብድርና የወልድ መጠን ተቋሙ ለተበዳሪ ከላይ የተገለፁትን
            አበድሯል፡፡ ተበዳሪውም ገንዘቡን መቀበላቸውን አረጋግጠዋል፡፡
          </Text>

          <Text style={AgreementStyles.text}></Text>
          <Subtitle>አንቀጽ-2፦ የክፍያ ሁኔታ በተመለከተ</Subtitle>
          <Text style={AgreementStyles.text}>
            2.1. ተበዳሪው ብድሩ ከወስዱበት ጊዜ ጀምሮ ብድሩ ተክፍሎ እስከሚያልቅበት ማለትም _____ የሚከፈል ድምር
            ወርሀዊ ክፍያ ከነወለድ ጋር ብር{" "}
            <Text style={AgreementStyles.boldText}>
              {" "}
              {loan.totalDueForPeriod}{" "}
            </Text>{" "}
            እንድሚከፍሉ ተስማምትዋል።
          </Text>
          <Text style={AgreementStyles.text}>
            2.2. እንዲሁም በዚህ ውል መሰረት በየወቅቱ የሚከፈለው ማንኛውም ክፍያ መጀመሪያ ተቋሙ ከብድርሩ ጋር
            በተገናኘ ያወጣቸውን ልዩ ልዩ ወጪዎች ለመክፈል ፣ቀጥሎ ለወለድ ክፍያ ፣በመጨረሻም የብድሩን ዋና ገንዘብ
            ለመክፈል ይውላል፡፡
          </Text>

          <Subtitle>አንቀጽ-3፦ ስለ ብድር ወለድ እና ቅጣት እዲሁም ውል ስለማቋረጥ በተመለከተ </Subtitle>
          <Text style={AgreementStyles.text}>
            3.1. በተሰጠው ብድር ፥ተቛሙ በመቶ {loan.annualInterestRate} % በዓመት የብድር
            ወለድ ___ እንዲሁም ___ የኣገልግሎትና የኣኢንሹራንስ ክፍያ ከዋናው (principal) የብድር መጠን
            የሚያስብ ይሆናል። የወለድ መጠን ተቋሙ በየጊዜው እያሻሻለ በሚያወጣው የወለድ ተመን (interest rate)
            የሚተካ ይሆናል ፡፡
          </Text>
          <Text style={AgreementStyles.text}>
            3.2. ተበዳሪ ወርሀዊ እዳውን ባይከፍል ፣ መክፈል ካልቻለበት ቀን ጀምሮ በወርሃዊው የወለድና የዋናው ብድር
            ክፍያ ላይ በወር ሃያ በመቶ(20%) ቅጣት ይታሰባል። ነገርግን ተበዳሪው ለሁለት ተከታታይ የክፍያ ጊዜዎችን
            ሳይከፍል ከቀረ ክፍያ እንደተቋረጠና እንደ ተበላሸ ተቆጥሮ በህግ የሚጠይቅ ይሆናል፡፡
          </Text>

          <Text style={AgreementStyles.text}>
            3.3. ተበዳሪ በዚህ ውል የገቡት ግዴታ ካልተወጡ ተቋሙ ለተበዳሪው የ30 ቀን የጽሁፍ ማስጠንቀቂያ ሰጥቶ
            በማንኛውም ጊዜ ውሉን ለማቋረጥ ይችላል ፡፡
          </Text>
          <Text style={AgreementStyles.text}>
            3.4. ውሉ በሚቋረጠበት ጊዜ ተበዳሪ ያላቸውን ቀሪ እዳ በአንዴ ይከፍላሉ፡፡
          </Text>
          <Text style={AgreementStyles.text}>
            3.5. ተበዳሪ በዚህ ውል የገቡትን ግዴታ እንዲፈጽሙ ተቋሙ የችሮታ ጊዜ እንደማይሰጥ ተስማምተዋል፡፡
          </Text>

          <Subtitle>አንቀጽ-4፦ ወጪዎች በተመለከተ </Subtitle>
          <Text style={AgreementStyles.text}>
            4.1. የቴምብር ቀረጥ፣የውሉ ማስመዝገቢያ ክፍያ (ካለ)፣ ይህንን ውል ለማስፈጸም የሚደረገውን ማንኛውንም
            ወጪ ሁሉ ተበዳሪ ይከፍላል። እንዲሁም በተበዳሪ ሂሳብ ወስጥ በቂ ገነዘብ ባለመኖሩ ወይም በሌላም ምክንያት
            እንዲህ አይነቱ ወጪ በተቋሙ ከተከፈለ ወጪው ብድር ሂሳብ ላይ ተደምሮ ወለድ ይታሰብበታል ፡፡
          </Text>

          <Subtitle> አንቀጽ-5፦ ወጪዎች በተመለከተ </Subtitle>
          <Text style={AgreementStyles.text}>
            5.1. ተበዳሪ በዚህ ውል ውስጥ የተገለጸው ግዴታቸውን ያልፈጸሙ እንደሆነ ፣ ተበዳሪው በማንኛውም ተቋም
            ውስጥ ወይም በኣሚጎስ የገ/ቁ/ብ ህ/ስ/ማ ወስጥ ያስቀመጡትን ቁጠባና ሌሎች ገቢዎችን ወጪ በማድረግ ለዕዳ
            ማቻቻያ ሊያውለው ይችላል ፡፡
          </Text>
          <Text style={AgreementStyles.text}>
            5.2. በንዑስ አንቀጽ 5.1 እንደተጠቀሰ ፥ በተቋሙ በኩል ለተበዳሪ የሚከፈሉ ቼኮችንና የሚተላለፉ
            ገንዘቦችን ተቋሙ ለተበዳሪ እዳ ማቻቻያ ለማዋል ይችላል፡፡
          </Text>

          <Subtitle>አንቀጽ-6፦ የብድር ዋስትና በተመለከተ </Subtitle>
          <Text style={AgreementStyles.text}>
            6.1. ተበዳሪ ለብድር ክፍያ ዋስትና ይሆን ዘንድ ከዚህ በታች ባለው ሠንጠረዥ ውስጥ የተጠቀሰውን የተበዳሪና
            የባለቤት አክሲዬን ፣ ቁጠባና ሌላ ተቀማጭ ገንዘብ ለብድሩ በማስያዣነት ስጥቷል። ማሳሰቢያ ፡ መያዣው አግባብ
            ከሌለው በሚመለከተው ሠንጠረዥ ውስጥ ፤አግባግ የለውም ተብሎ ይጠቀሳል።
          </Text>

          <Subtitle></Subtitle>
          <Text style={AgreementStyles.text}></Text>

          <Text
            style={AgreementStyles.pageNumber}
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
            fixed
          />
        </Page>
      </Document>
    </PDFViewer>
  );
}


export default AgreementDoc;
