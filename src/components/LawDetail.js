import React from "react";
import { useParams, useNavigate } from "react-router-dom";

function LawDetail() {
  const { law } = useParams();
  const navigate = useNavigate();

  const lawDetails = {
    "The Prohibition of Child Marriage Act, 2006":
      "The Prohibition of Child Marriage Act, 2006, is an Indian law enacted to prevent child marriages, ensuring legal action against those who partake in or promote such practices. The Act empowers women by making child marriages voidable at the option of the contracting party who was a child at the time of marriage. This means that the female spouse has the right to legally dissolve the marriage until she reaches the age of 20. The Act also provides women protection from abuses and coercion related to child marriage, reinforcing their fundamental rights to freedom and choice in marriage.",
    "Special Marriage Act, 1954":
      "The Special Marriage Act, 1954, is an Indian legislation designed to facilitate the marriage of couples from different religions or castes without the necessity to convert. It enables civil marriages through a secular procedure. For women, this act is particularly empowering as it provides them equal rights in marriage, safeguarding their interests in marital relationships. Women have the right to marital property, and the Act includes provisions for alimony and maintenance in cases of divorce or separation, ensuring financial security. Additionally, it gives women the autonomy to marry outside their religion or caste while maintaining their religious identity, thus supporting their personal freedom and choices.",
    "Dowry Prohibition Act, 1961":
      "The Dowry Prohibition Act, 1961, is an Indian law enacted to curb the dowry system, which often places severe financial and social pressure on the bride's family. The Act makes the giving and receiving of dowry, defined as any property or valuable security given or agreed to be given directly or indirectly, a punishable offense. For women, this legislation is crucial as it aims to protect them from harassment, violence, and exploitation linked to dowry demands. Offenders can face a minimum imprisonment of five years.",
    "Indian Divorce Act, 1969":
      "The Indian Divorce Act of 1969, initially enacted in 1869, governs the dissolution of marriages within the Christian community in India, applying specifically to Christian couples. This Act allows for divorce on several grounds including adultery, conversion to another religion, and cruelty. For women, this Act is particularly significant as it recognizes their right to seek a divorce on the grounds of their husband's marital misconduct. It also allows women to claim alimony and child support, providing a legal mechanism for financial security post-divorce. The Act ensures that Christian women can seek divorce through civil proceedings without community stigma, aligning their legal rights with those of other communities in India.",
    "Maternity Benefit Act, 1861":
      "The Maternity Benefit Act, 1961, is an Indian law designed to protect the employment of women during the time of her maternity and entitles her to 'maternity benefit' – full paid absence from work to take care for her child. The act is applicable to all establishments employing 10 or more employees. Women are entitled to maternity benefits for a period of up to 26 weeks, which can be extended to 8 weeks before the expected delivery date and remaining after the birth. Additionally, the law provides for maternity leave for miscarriage or medical termination of pregnancy for a period of six weeks. This Act ensures that a woman's career is not adversely affected by pregnancy and childbirth, promoting workplace equality and protecting women against discrimination during maternity.",
    "Medical Termination of Pregnancy Act, 1971":
      "The Medical Termination of Pregnancy Act, 1971, is an Indian law that allows abortion under specific circumstances to reduce unsafe abortions and enhance women's reproductive rights. The Act permits abortion if the pregnancy endangers the woman's life or risks her physical or mental health, if there is a high probability of fetal abnormalities, or in instances of contraceptive failure for a married couple. Recent amendments have expanded the gestational limit for legal abortions and included provisions for unmarried women. Abortions up to 20 weeks require the consent of one medical practitioner, and those between 20 and 24 weeks need approvals from two practitioners under specified conditions.",
    "Sexual Harassment of Women at Workplace Act, 2013":
      "The Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013, was enacted in India to safeguard women against sexual harassment at their places of work. This law defines what constitutes sexual harassment and sets up procedures for dealing with complaints, including the mandatory establishment of Internal Complaints Committees (ICC) at all workplaces. Employers are required to adhere to the stipulations of the Act, facing penalties for non-compliance. It empowers women by promoting a safer working environment and enabling them to report incidents of harassment. Furthermore, the Act mandates that employers conduct regular training sessions to educate employees about the consequences of harassment.",
    "Equal Remuneration Act, 1976":
      "The Equal Remuneration Act, 1976, was established in India to address wage disparities based on gender. It mandates equal pay for men and women workers for the same work or work of a similar nature. This legislation not only covers salaries but also includes provisions for preventing discrimination in hiring and employment practices based on gender. It ensures that women have the right to the same terms of employment, promotions, training, and transfer as their male counterparts. Employers violating this law face penalties, including fines and imprisonment. The Act empowers women in the workforce by legally supporting their right to equal treatment and remuneration, thereby contributing to economic equality and promoting gender justice in the workplace.",
    "The Criminal Law (Amendment) Act, 2013":
      "The Criminal Law (Amendment) Act, 2013, is significant legislation passed in India in response to the urgent need for changes in the penal laws following widespread protests after the 2012 Delhi gang rape incident. This Act specifically aims to provide stricter punishments for sexual assault, rape, and other sex-related crimes. It introduced amendments to the Indian Penal Code, Code of Criminal Procedure, and the Indian Evidence Act. Key features include the introduction of new offenses such as stalking, voyeurism, and acid attacks, specifically recognizing the severe impact of these crimes on women. The Act also expanded the definition of rape, ensuring more rigorous penalties, including the death penalty for repeat offenders.",
    "Protection of Women from Domestic Violence Act, 2005":
      "The Protection of Women from Domestic Violence Act, 2005, is an Indian law specifically designed to protect women from violence in domestic spaces. It comprehensively addresses various forms of abuse including physical, emotional, sexual, verbal, and economic. The Act equips women with legal measures to safeguard their well-being and security within the family or household context. Women can obtain protection orders that prohibit perpetrators from continuing abuse and residence orders that restrict abusers' access to the victim’s residence or even require them to provide alternate housing. Additionally, the law mandates maintenance support, covering medical expenses and compensation for lost earnings, enforceable by court orders.",
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-pink-200">
      <div className="bg-white rounded-tl-3xl rounded-br-3xl shadow-lg p-6 max-w-xs w-full">
        <h2 className="text-xl font-bold mb-4">{law}</h2>
        <p className="mb-6 text-gray-700">{lawDetails[law]}</p>
        <div className="flex justify-center">
          <button
            onClick={() => navigate(-1)}
            className="back-button text-white text-lg p-2 rounded-md"
          >
            BACK
          </button>
        </div>
      </div>
    </div>
  );
}

export default LawDetail;
