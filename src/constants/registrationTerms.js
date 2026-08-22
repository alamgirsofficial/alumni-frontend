/*
|--------------------------------------------------------------------------
| Registration Terms
|--------------------------------------------------------------------------
|
| Registration page-এর account creation terms এখানে রাখা হবে।
|
| পরে Laravel API থেকে terms আনলেও Register.vue-এর UI structure
| পরিবর্তন করার প্রয়োজন হবে না।
|
|--------------------------------------------------------------------------
*/

export const registrationTerms = [
    {
        id: 1,
        title: "সঠিক তথ্য প্রদান",
        description:
            "Registration করার সময় আপনার নাম, registration number, email/mobile number এবং অন্যান্য তথ্য সঠিকভাবে প্রদান করতে হবে।",
    },

    {
        id: 2,
        title: "Registration Number",
        description:
            "আপনার নিজস্ব ও বৈধ registration number ব্যবহার করতে হবে। অন্য কারও registration number ব্যবহার করা যাবে না।",
    },

    {
        id: 3,
        title: "Account Security",
        description:
            "আপনার password গোপন রাখতে হবে। অন্য কারও সাথে password share করা যাবে না।",
    },

    {
        id: 4,
        title: "Community Rules",
        description:
            "Alumni community-এর নিয়মনীতি মেনে চলতে হবে এবং কোনো ধরনের অসদাচরণ করা যাবে না।",
    },

    {
        id: 5,
        title: "Verification",
        description:
            "প্রয়োজন হলে কর্তৃপক্ষ আপনার registration information যাচাই করতে পারবে।",
    },
];