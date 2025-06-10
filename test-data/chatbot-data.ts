export const spanishTestData = {
  language: 'spanish' as const,
  services: {
    buttonText: 'Nuestros Servicios',
    subOption: 'Desarrollo de Software',
    expectedResponses: ['MushroomSoft,'],
    screenshotPath: 'screenshots/SoftwareDevolpment_ES.png'
  },
  pricing: {
    buttonText: 'Cotizaciones',
    expectedResponses: ['info@mushroomsoft-it.com', 'Correo'],
    screenshotPath: 'screenshots/Pricing_ES.png'
  },
  contactLocation: {
    buttonText: 'Contacto y Ubicación',
    expectedResponses: ['Quito, Ecuador', 'WhatsApp: +593 99 512 1992'],
    screenshotPath: 'screenshots/Contact&Location_ES.png'
  },
  team: {
    buttonText: 'Nuestro Equipo',
    initialMember: 'CTO',
    notVisibleMembers: ['Gerente de Oficina', 'Gerente USA', 'Marketing', 'RRHH', 'Contabilidad', 'Información General']
  }
};

export const englishTestData = {
  language: 'english' as const,
  services: {
    buttonText: 'Our Services',
    subOption: 'Software Development',
    expectedResponses: ['MushroomSoft,'],
    screenshotPath: 'screenshots/SoftwareDevolpment_EN.png'
  },
  pricing: {
    buttonText: 'Pricing',
    expectedResponses: ['info@mushroomsoft-it.com', 'Email'],
    screenshotPath: 'screenshots/Pricing_EN.png'
  },
  contactLocation: {
    buttonText: 'Contact & Location',
    expectedResponses: ['Quito, Ecuador', 'WhatsApp: +593 99 512 1992'],
    screenshotPath: 'screenshots/Contact&Location_EN.png'
  },
  team: {
    buttonText: 'Our Team',
    initialMember: 'CTO',
    notVisibleMembers: ['Office Manager', 'USA Manager', 'Marketing', 'HR', 'Accounting', 'General Information']
  }
};
