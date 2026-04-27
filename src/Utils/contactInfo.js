export const CONTACT_INFO_STORAGE_KEY = "blogify_admin_contact_info";

export const DEFAULT_CONTACT_INFO = {
  phone: "+91 6359717897",
  email: "parthkoshti3183@gmail.com",
};

export const getStoredContactInfo = () => {
  try {
    const stored = localStorage.getItem(CONTACT_INFO_STORAGE_KEY);
    if (!stored) {
      return DEFAULT_CONTACT_INFO;
    }

    const parsed = JSON.parse(stored);
    return {
      phone: parsed?.phone || DEFAULT_CONTACT_INFO.phone,
      email: parsed?.email || DEFAULT_CONTACT_INFO.email,
    };
  } catch {
    return DEFAULT_CONTACT_INFO;
  }
};
