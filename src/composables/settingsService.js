// src/services/settingsService.js

const STORAGE_KEY = "alumni_dashboard_settings";

const defaultSettings = {
  account: {
    name: "Md. Alamgir",
    username: "alamgir",
    email: "alamgir@example.com",
    phone: "+880 1712-345678",
  },

  security: {
    twoFactorEnabled: false,
  },

  notifications: {
    newMember: true,
    eventRegistration: true,
    newMessage: true,
    committeeUpdate: true,
    galleryUpdate: false,
    systemNotification: true,
    emailNotification: true,
  },

  appearance: {
    theme: "dark",
    accent: "cyan",
    compactSidebar: false,
    animations: true,
    glassEffect: true,
  },

  organization: {
    name: "Alumni Association",
    shortName: "AA",
    email: "contact@example.com",
    phone: "+880 1XXX-XXXXXX",
    address: "Chattogram, Bangladesh",
    website: "",
    facebook: "",
    linkedin: "",
    youtube: "",
  },

  // =========================
  // Email Settings
  // =========================
  email: {
    senderName: "Alumni Association",
    senderEmail: "noreply@example.com",
    replyTo: "contact@example.com",

    registrationEmail: true,
    eventRegistrationEmail: true,
    passwordResetEmail: true,
    systemEmail: true,
  },

  // =========================
  // Event Settings
  // =========================
  events: {
    registrationEnabled: true,
    approvalRequired: false,
    multipleRegistration: true,
    eventReminder: true,
    showPastEvents: true,
    allowCancellation: true,
  },

  // =========================
  // Member Settings
  // =========================
  members: {
    approvalRequired: true,
    profileEditing: true,
    showEmail: true,
    showPhone: false,
    showSocialLinks: true,
    publicProfile: true,
  },

  // =========================
  // Media Settings
  // =========================
  media: {
    maxImageSize: 5,
    autoCompress: true,
    generateThumbnail: true,
    allowedJpg: true,
    allowedPng: true,
    allowedWebp: true,
  },

  // =========================
  // System Settings
  // =========================
  system: {
    maintenanceMode: false,
    autoBackup: true,
    activityLog: true,
    cacheEnabled: true,
  },
};

function clone(data) {
  return JSON.parse(JSON.stringify(data));
}

export function getSettings() {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(defaultSettings)
    );

    return clone(defaultSettings);
  }

  try {
    const parsed = JSON.parse(stored);

    return {
      ...clone(defaultSettings),

      ...parsed,

      account: {
        ...defaultSettings.account,
        ...parsed.account,
      },

      security: {
        ...defaultSettings.security,
        ...parsed.security,
      },

      notifications: {
        ...defaultSettings.notifications,
        ...parsed.notifications,
      },

      appearance: {
        ...defaultSettings.appearance,
        ...parsed.appearance,
      },

      organization: {
        ...defaultSettings.organization,
        ...parsed.organization,
      },

      email: {
        ...defaultSettings.email,
        ...parsed.email,
      },

      events: {
        ...defaultSettings.events,
        ...parsed.events,
      },

      members: {
        ...defaultSettings.members,
        ...parsed.members,
      },

      media: {
        ...defaultSettings.media,
        ...parsed.media,
      },

      system: {
        ...defaultSettings.system,
        ...parsed.system,
      },
    };
  } catch {
    return clone(defaultSettings);
  }
}

export function saveSettings(settings) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(settings)
  );

  return settings;
}

export function resetSettings() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(defaultSettings)
  );

  return clone(defaultSettings);
}