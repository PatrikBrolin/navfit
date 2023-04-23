export const Get_Hero = (url) => `
{
  heroSectionCollection(limit: 1, where: { sida: "Startsida" }) {
    items {
      rubrik
      modulTyp
      sida
        undertext
        callToActionKnapp
        backgrundsbild{
          url
        }
    }
  }
}
`;


export const Get_FaqPage = (url) => `
{
  faqsCollection{
    items{
      question
      modulTyp
      awnser{json}
    }
  }
}
`;


export const Get_ContactPage = (url) => `
{
  kontaktCollection{
    items{
      modulTyp
      email
      telefonnummer
    }
  }
}
`;


