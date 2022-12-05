export const serviceDetailSectionsReferencesQuery = `
employee-> {
  ...,
  firstName,
  lastName,
  picture {
    asset->{
      url
    },
  }
},
sectors[]->{
  ...,
  graph->{
    iconImage{
      asset->{
        url,
        metadata{
          dimensions{
            height,
            width
          }
        }
      }
    }
  }
},
questionnaire->{
  questionnaireSlug {
    current
  },
},
graph {
  asset-> {
    ...
  }
},
goToQuestionnaire->{
  questionnaireSlug {
    current
  },
},
`;

export const contentModulesQuery = (
  extraQuery?: string,
): string => `contentModules[] {
    _key,
    _type,
    ...,
    image {
      asset->{
        url
      },
    },
    logo1 {
      asset->{
        url
      },
    },
    logo2 {
      asset->{
        url
      },
    },
    logo3 {
      asset->{
        url
      },
    },
    iconTopics-> {
      iconImage{
        asset->{
          url,
        }
      }
    },
    topImage {
      asset->{
        url
      },
    },
    review1 {
      ...,
      rating{
        asset->{
          url,
        }
      }
    },
    review2 {
      ...,
      rating{
        asset->{
          url,
        }
      }
    },
    brands[] {
      ...,
      image{
        asset->{
          url,
        }
      }
    },
    textWithIcon1 {
      title,
      icon-> {
        name,
        iconImage{
          asset->{
            url,
            metadata{
              dimensions{
                height,
                width
              }
            }
          }
        }
      },
    },
    textWithIcon1 {
      title,
      icon-> {
        name,
        iconImage{
          asset->{
            url,
            metadata{
              dimensions{
                height,
                width
              }
            }
          }
        }
      },
    },
    textWithIcon1 {
      title,
      icon-> {
        name,
        iconImage{
          asset->{
            url,
            metadata{
              dimensions{
                height,
                width
              }
            }
          }
        }
      },
    },
     textWithIcon2 {
      title,
      icon-> {
        name,
        iconImage{
          asset->{
            url,
            metadata{
              dimensions{
                height,
                width
              }
            }
          }
        }
      },
    },
    textWithIcon3 {
      title,
      icon-> {
        name,
        iconImage{
          asset->{
            url,
            metadata{
              dimensions{
                height,
                width
              }
            }
          }
        }
      },
    },
    textWithIcon4 {
      title,
      icon-> {
        name,
        iconImage{
          asset->{
            url,
            metadata{
              dimensions{
                height,
                width
              }
            }
          }
        }
      },
    },
    heroPartnerLogo {
       asset->{
         url
       }
    },
    jobCard {
      ...,
      image {
        asset->{
          url
        },
      }
    },
    goToQuestionnaire->{
      questionnaireSlug {
        current
      },
    },
    questionnaire->{
      questionnaireSlug {
        current
      },
    },
    quote-> {
      quoteText,
      quoteAuthor->{
        firstName,
        lastName,
        jobTitle,
        mobile,
        phone,
        email,
      }
    },
    logos[] {
      asset-> {
        url,
        metadata{
          dimensions{
            height,
            width
          }
        }
      }
    },
    tabs[] {
      ...,
      image {
        asset->{
          url
        },
      }
    },
    slider[] {
      ...,
      asset->{
        url
      }
    },
    iconRows[] {
      ...,
      icon->{
        iconImage{
          asset->{
            url
          }
        }
      }
    },
    employees[]-> {
      ...,
      firstName,
      lastName,
      picture {
        asset->{
          url
        },
      },
      sectors[]-> {
        ...,
      },
      cardPicture {
        ...,
        picture {
          asset->{
            url
          },
        }
      },
      newsGridPicture {
        ...,
        picture {
          asset->{
            url
          },
        }
      },
      detailPagePicture {
        ...,
        picture {
          asset->{
            url
          },
        }
      },
    },
    services[]-> {
      ...
    },
    sectorsGrid[]-> {
      ...,
      graph-> {
        name,
        iconImage{
          asset->{
            url,
            metadata{
              dimensions{
                height,
                width
              }
            }
          }
        }
      }
    },
    transactions[]-> {
      ...,
      companyLogo1 {
        asset->{
          url
        },
      },
      companyLogo2 {
        asset->{
          url
        },
      },
    },
    transaction-> {
      ...,
      companyLogo1 {
        asset->{
          url
        },
      },
      companyLogo2 {
        asset->{
          url
        },
      },
    },
    offices[]-> {
      ...
    },
    link {
      ...,
      page->{
        slug
      }
    },
    sectorsDropdown[]-> {
      ...,
      name,
      detailPageHeroImage {
        asset->{
          url,
        }
      },
    },
    servicesDropdown[]-> {
      name
    },
    button {
      ...,
      link->{
        slug
      },
      page->{
        slug
      },
      externalUrl
    },
    heroBgImage {
      asset->{
        url
      }
    },
    heroMobileBgImage {
      asset->{
        url
      }
    },
    industryReport-> {
      ...,
      image {
        asset-> {
          url
        }
      }
    },
${extraQuery || ''}
  }`;
