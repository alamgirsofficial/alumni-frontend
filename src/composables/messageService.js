// src/composables/messageService.js

const STORAGE_KEY = "alumni_messages";

const demoMessages = [
  {
    id: 1,
    name: "Md. Rahim Ahmed",
    email: "rahim@example.com",
    phone: "+8801712345678",
    subject: "Membership সম্পর্কে জানতে চাই",
    message:
      "আমি Alumni Association-এর membership সম্পর্কে বিস্তারিত জানতে চাই। Membership নেওয়ার প্রক্রিয়াটি জানালে উপকৃত হব।",
    status: "new",
    isImportant: true,
    createdAt: "2026-08-27T10:30:00",
    readAt: null,
    repliedAt: null,
  },
  {
    id: 2,
    name: "Nusrat Jahan",
    email: "nusrat@example.com",
    phone: "+8801812345678",
    subject: "Upcoming Event সম্পর্কে",
    message:
      "আগামী alumni event-এ registration করার শেষ সময় কখন? এছাড়া event fee সম্পর্কে জানতে চাই।",
    status: "read",
    isImportant: false,
    createdAt: "2026-08-26T14:20:00",
    readAt: "2026-08-26T15:00:00",
    repliedAt: null,
  },
  {
    id: 3,
    name: "Sakib Hasan",
    email: "sakib@example.com",
    phone: "+8801912345678",
    subject: "Certificate Collection",
    message:
      "আমার alumni certificate এখনো সংগ্রহ করা হয়নি। Certificate collection-এর সময়সূচি জানালে ভালো হয়।",
    status: "replied",
    isImportant: false,
    createdAt: "2026-08-25T09:15:00",
    readAt: "2026-08-25T10:00:00",
    repliedAt: "2026-08-25T11:30:00",
  },
  {
    id: 4,
    name: "Tanvir Hossain",
    email: "tanvir@example.com",
    phone: "+8801612345678",
    subject: "Profile Update Problem",
    message:
      "আমার profile-এর কিছু তথ্য update করতে পারছি না। বিষয়টি একটু দেখে দিলে ভালো হয়।",
    status: "read",
    isImportant: false,
    createdAt: "2026-08-24T16:45:00",
    readAt: "2026-08-24T17:00:00",
    repliedAt: null,
  },
  {
    id: 5,
    name: "Farzana Akter",
    email: "farzana@example.com",
    phone: "+8801512345678",
    subject: "Alumni Card",
    message:
      "Alumni ID card পাওয়ার জন্য কী কী documents প্রয়োজন হবে?",
    status: "archived",
    isImportant: false,
    createdAt: "2026-08-22T11:10:00",
    readAt: "2026-08-22T11:30:00",
    repliedAt: null,
  },
   {
    id: 6,
    name: "Sakib Hasan",
    email: "sakib@example.com",
    phone: "+8801912345678",
    subject: "Certificate Collection",
    message:
      "আমার alumni certificate এখনো সংগ্রহ করা হয়নি। Certificate collection-এর সময়সূচি জানালে ভালো হয়।",
    status: "replied",
    isImportant: false,
    createdAt: "2026-08-25T09:15:00",
    readAt: "2026-08-25T10:00:00",
    repliedAt: "2026-08-25T11:30:00",
  },
  {
    id: 7,
    name: "Tanvir Hossain",
    email: "tanvir@example.com",
    phone: "+8801612345678",
    subject: "Profile Update Problem",
    message:
      "আমার profile-এর কিছু তথ্য update করতে পারছি না। বিষয়টি একটু দেখে দিলে ভালো হয়।",
    status: "read",
    isImportant: false,
    createdAt: "2026-08-24T16:45:00",
    readAt: "2026-08-24T17:00:00",
    repliedAt: null,
  },
  {
    id: 8,
    name: "Farzana Akter",
    email: "farzana@example.com",
    phone: "+8801512345678",
    subject: "Alumni Card",
    message:
      "Alumni ID card পাওয়ার জন্য কী কী documents প্রয়োজন হবে?",
    status: "archived",
    isImportant: false,
    createdAt: "2026-08-22T11:10:00",
    readAt: "2026-08-22T11:30:00",
    repliedAt: null,
  },
   {
    id: 9,
    name: "Sakib Hasan",
    email: "sakib@example.com",
    phone: "+8801912345678",
    subject: "Certificate Collection",
    message:
      "আমার alumni certificate এখনো সংগ্রহ করা হয়নি। Certificate collection-এর সময়সূচি জানালে ভালো হয়।",
    status: "replied",
    isImportant: false,
    createdAt: "2026-08-25T09:15:00",
    readAt: "2026-08-25T10:00:00",
    repliedAt: "2026-08-25T11:30:00",
  },
  {
    id: 10,
    name: "Tanvir Hossain",
    email: "tanvir@example.com",
    phone: "+8801612345678",
    subject: "Profile Update Problem",
    message:
      "আমার profile-এর কিছু তথ্য update করতে পারছি না। বিষয়টি একটু দেখে দিলে ভালো হয়।",
    status: "read",
    isImportant: false,
    createdAt: "2026-08-24T16:45:00",
    readAt: "2026-08-24T17:00:00",
    repliedAt: null,
  },
  {
    id: 11,
    name: "Farzana Akter",
    email: "farzana@example.com",
    phone: "+8801512345678",
    subject: "Alumni Card",
    message:
      "Alumni ID card পাওয়ার জন্য কী কী documents প্রয়োজন হবে?",
    status: "archived",
    isImportant: false,
    createdAt: "2026-08-22T11:10:00",
    readAt: "2026-08-22T11:30:00",
    repliedAt: null,
  },
];

const getMessages = () => {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(demoMessages)
    );

    return [...demoMessages];
  }

  try {
    return JSON.parse(stored);
  } catch {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(demoMessages)
    );

    return [...demoMessages];
  }
};

const saveMessages = (messages) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(messages)
  );
};

export const getAllMessages = () => {
  return getMessages();
};

export const getMessageById = (id) => {
  return getMessages().find(
    (message) => Number(message.id) === Number(id)
  );
};

export const updateMessage = (id, data) => {
  const messages = getMessages();

  const index = messages.findIndex(
    (message) => Number(message.id) === Number(id)
  );

  if (index === -1) return null;

  messages[index] = {
    ...messages[index],
    ...data,
  };

  saveMessages(messages);

  return messages[index];
};

export const markMessageAsRead = (id) => {
  return updateMessage(id, {
    status: "read",
    readAt: new Date().toISOString(),
  });
};

export const markMessageAsUnread = (id) => {
  return updateMessage(id, {
    status: "new",
    readAt: null,
  });
};

export const markMessageAsReplied = (id) => {
  return updateMessage(id, {
    status: "replied",
    readAt: getMessageById(id)?.readAt ||
      new Date().toISOString(),
    repliedAt: new Date().toISOString(),
  });
};

export const archiveMessage = (id) => {
  return updateMessage(id, {
    status: "archived",
  });
};

export const toggleMessageImportant = (id) => {
  const message = getMessageById(id);

  if (!message) return null;

  return updateMessage(id, {
    isImportant: !message.isImportant,
  });
};

export const deleteMessage = (id) => {
  const messages = getMessages();

  const updatedMessages = messages.filter(
    (message) => Number(message.id) !== Number(id)
  );

  saveMessages(updatedMessages);

  return true;
};