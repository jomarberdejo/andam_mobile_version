import { z } from "zod";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";

export const icons = {
  index: (props) => <FontAwesome5 name="ambulance" size={26} {...props} />,
  pnp: (props) => <MaterialIcons name="local-police" size={26} {...props} />,
  bfp: (props) => (
    <FontAwesome5 name="fire-extinguisher" size={26} {...props} />
  ),
  lgu: (props) => <FontAwesome5 name="landmark" size={26} {...props} />,
};

export const registerSchema = z.object({
  fullName: z
    .string()
    .min(5, { message: "Full name should be at least 5 characters long" }),
  username: z
    .string()
    .min(5, { message: "Username should be at least 5 characters long" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      }
    ),
  contactNumber: z
    .string()
    .length(11, { message: "Contact number must be 11 digits long" })
    .regex(/^\d+$/, {
      message: "Contact number should contain only numeric characters",
    }),
});

export const loginSchema = z.object({
  username: z.string().min(1, {
    message: "Username is required.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

export const profileSchema = z.object({
  fullName: z
    .string()
    .min(5, { message: "Full name should be at least 5 characters long" }),
  email: z
    .union([z.string().email("Invalid email address"), z.null()])
    .optional(),

  contactNumber: z
    .string()
    .length(11, { message: "Contact number must be 11 digits long" })
    .regex(/^\d+$/, {
      message: "Contact number should contain only numeric characters",
    }),
});

export const reportSchema = z.object({
  detail: z
    .string()
    .min(10, { message: "Details should be at least 10 characters long" }),
});

export const backgroundImages = {
  BFP: require("../assets/images/bfp-cover.png"),
  LGU: require("../assets/images/lgu-cover.jpg"),
  PNP: require("../assets/images/pnp-cover.jpg"),
  MDRRMO: require("../assets/images/mdrr-cover.jpg"),
};

export const agencies = [
  { label: "Bureau of Fire Protection (BFP)", value: "BFP" },
  { label: "Local Government Unit (LGU)", value: "LGU" },
  { label: "Philippine National Police (PNP)", value: "PNP" },
  {
    label: "Municipal Disaster Risk Reduction and Management Office (MDRRMO)",
    value: "MDRRMO",
  },
];

export const whatToDo = {
  title: "What to Do in an Emergency",
  icon: "bulb",
  content: [
    {
      title: "General",
      steps: [
        "1. Stay calm.",
        "2. Follow instructions from authorities.",
        "3. Keep yourself and others safe.",
      ],
    },
    {
      title: "Earthquake",
      steps: [
        "1. Drop, Cover, and Hold On.",
        "2. Stay indoors until the shaking stops and it's safe to exit.",
        "3. Move away from windows, heavy furniture, and other objects that may fall.",
      ],
    },
    {
      title: "Fire",
      steps: [
        "1. Alert others and evacuate the building immediately.",
        "2. Stay low to the ground if there's smoke, and use a cloth to cover your nose and mouth.",
        "3. Feel doors with the back of your hand before opening; if it's hot, don't open it.",
      ],
    },
    {
      title: "Flood",
      steps: [
        "1. Move to higher ground and avoid floodwaters.",
        "2. Do not walk, swim, or drive through floodwaters.",
        "3. Follow evacuation orders from authorities.",
      ],
    },
  ],
};

export const kitCheckList = {
  title: "Emergency Kit Checklist",
  icon: "list",
  content: [
    {
      item: "Water",
      icon: "water-outline",
      description:
        "Ensure you have an adequate supply of drinking water for each person in your household.",
    },
    {
      item: "First Aid Kit",
      icon: "medkit-outline",
      description:
        "Prepare a first aid kit containing essential medical supplies such as bandages, antiseptic wipes, and pain relievers.",
    },
    {
      item: "Flashlight",
      icon: "flashlight-outline",
      description:
        "Include a flashlight with extra batteries to provide illumination during power outages.",
    },
    {
      item: "Non-perishable Food",
      icon: "restaurant-outline",
      description:
        "Stock up on non-perishable food items like canned goods, granola bars, and dried fruits to sustain you during emergencies.",
    },
    {
      item: "Blankets",
      icon: "bed-outline",
      description:
        "Keep warm blankets or sleeping bags on hand to maintain body heat in cold weather.",
    },
    {
      item: "Multi-tool",
      icon: "hammer-outline",
      description:
        "A multi-tool can be handy for various tasks such as opening cans, cutting wires, or making repairs.",
    },
    {
      item: "Whistle",
      icon: "megaphone-outline",
      description:
        "Include a whistle to attract attention and signal for help in case you are trapped or in need of assistance.",
    },
    {
      item: "Portable Radio",
      icon: "radio-outline",
      description:
        "A portable radio with batteries or a hand-crank option can keep you informed of emergency broadcasts and updates.",
    },
    {
      item: "Personal Hygiene Items",
      icon: "hand-right-outline",
      description:
        "Pack personal hygiene items such as soap, toothpaste, and hand sanitizer to maintain cleanliness and prevent the spread of germs.",
    },
    {
      item: "Important Documents",
      icon: "document-outline",
      description:
        "Keep copies of essential documents like identification, insurance policies, and medical records in a waterproof container.",
    },
  ],
};

export const evacuationProcedure = {
  title: "Evacuation Procedures",
  icon: "ios-walk",
  content: [
    {
      title: "Routes",
      steps: [
        "1. Follow the designated evacuation routes.",
        "2. Stay calm and assist others if necessary.",
        "3. Proceed to the assembly area.",
      ],
    },
    {
      title: "Meet",
      steps: [
        "1. Designate a meeting point outside of your home where everyone can gather in case of evacuation.",
        "2. Ensure all household members know the location of this meeting point.",
        "3. Choose a location away from the house but easily accessible to all family members.",
      ],
    },
    {
      title: "Communication",
      steps: [
        "1. Establish a communication plan with family members or roommates in case you are separated during an emergency.",
        "2. Exchange contact information and establish a protocol for checking in and providing updates on your status.",
        "3. Decide on alternative means of communication in case phone lines are down, such as text messaging or social media.",
      ],
    },
  ],
};

export const termsAndConditionsText =
  "1. Acceptance of Terms: By using our app ANDAM, you agree to abide" +
  " by the following terms and conditions.\n\n" +
  "2. User Conduct: You agree not to engage in any unethical or" +
  " illegal activities, including but not limited to spamming, pranks," +
  " or any other activities that may harm others.\n\n" +
  "3. Data Privacy and Security: ANDAM is committed to ensuring the" +
  " safety and privacy of your data. We implement strict security" +
  " measures to protect your personal information and adhere to all" +
  " relevant data protection regulations.\n\n" +
  "4. Intellectual Property: All content and materials provided by" +
  " ANDAM, including but not limited to text, images, logos, and" +
  " software, are protected by intellectual property laws. You agree" +
  " not to use, reproduce, or distribute any content from the app" +
  " without prior authorization.\n\n" +
  '5. Disclaimer of Warranties: ANDAM provides the app on an "as is"' +
  ' and "as available" basis, without any warranties or' +
  " representations of any kind. We do not guarantee the accuracy," +
  " completeness, or reliability of any content or services provided" +
  " through the app.\n\n" +
  "6. Limitation of Liability: In no event shall ANDAM be liable for" +
  " any indirect, incidental, special, or consequential damages" +
  " arising out of or in any way connected with your use of the app.\n\n" +
  "By checking the box below, you acknowledge that you have read," +
  " understood, and agree to abide by the above terms and conditions.";
