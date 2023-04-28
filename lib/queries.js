export const Get_IndexPage = (url) => `
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
       bildText
    }
  }
 
  recensionCollection{
    items{
      modulTyp
      namn
      recensionText{
        json
      }
      recensionBild{
        url
      }
    }
  }
  omStartsidaCollection{
    items{
      modulTyp
      kortIntroduktion{
        json
      }
      bild{
        url
      }
      bildText
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

export const Get_AboutPage = (url) => `
{
  omMigCollection{
    items{
      modulTyp
      rubrik
      paragrafText{
        json
      }
      utbildning{
        json
      }
      certifikat{
        json
      }
      bild{
        url
      }
      bildText
    }
  }
}
`;

export const Get_BookingPage = () => `
 {
  hurDetFungerarCollection(order:steg_ASC){
      items{
        modulTyp
        stegText{
          json
        }
        steg
      }
    }
    priserCollection{
      items{
        modulTyp
        kategori
        kostnad
      }
    }
}
  `;
