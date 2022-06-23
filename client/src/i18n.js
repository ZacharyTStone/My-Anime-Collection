import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      landing: {
        title: "My Anime Collection",
        title_description:
          "My Anime Collection also called M.A.C. is an application that let's you track, and find new anime.",
        login_button: "Login/Register",
        demo_button: "Demo",
        testimonials: {
          title: "Testimonials",
          vegeta: {
            name: "Vegeta",
            description:
              " Get out of my way Earthling! I need to fight Kakarot!",
          },
          pikachu: {
            name: "Pikachu",
            description:
              "PIKA PIKA!! Pikachu! Pika PIKA pika pika. Pika PIKA pika pika.",
          },
          shinji: {
            name: "Shinji",
            description:
              "I guess I like My Anime Collection. Please don't make me pilot the EVA anymore...",
          },
          pegasus: {
            name: "Pegasus",
            description: "The best thing ever creAATED~~~ Good job, Zachy boy!",
          },
        },

        why: {
          title: "Why use My Anime Collection?",
          point1: " It's 100% free and contains no ads.",
          point2: "It's easy to use and intuitive.",
          point3:
            " We take security very seriously and use advanced encyrption to protect your information from breaches, and hacking attempts.",
          point4:
            "My Anime Collection does not use cookies to track you for advertising purposes and does not request personal data from any third parties.",
          point5:
            "We're always working on adding new features and improvements.",
        },

        call_to_action: {
          title: "Let's go find some anime!",
          contact_info: "For all inquieres please contact Zach Stone at",
        },
      },
    },
  },
  jp: {
    translation: {
      landing: {
        title: "マイ・アニメ・コレクション",
        title_description:
          "マイ・アニメ・コレクションはアニメを追跡し、新しいアニメを探すことができるアプリケーションです。",
        login_button: "ログイン/登録",
        demo_button: "デモ",

        testimonials: {
          title: "お客様の声",
          vegeta: {
            name: "ベジータ",
            description:
              "地球の邪魔にならないように！カカロットと戦う必要がある！",
          },
          pikachu: {
            name: "ピカチュウ",
            description: "ピカチュウ！ ピカピカピカピカ。 ピカピカピカピカ。",
          },
          shinji: {
            name: "シンジ",
            description:
              "私は私のアニメコレクションが好きだと思います。 もうEVAを操縦させないでください",
          },
          pegasus: {
            name: "ペグサス",
            description:
              "史上最高のものが作成されました~~~お疲れ様でした、Zachyboy！",
          },
        },
        why: {
          title: "何でマイ・アニメ・コレクションを使うの？",
          point1: "無料です。広告は含まれていません。",
          point2: "簡単です。インタラクティブです。",
          point3: "セキュリティーに非常に注意しています。",
          point4:
            "マイ・アニメ・コレクションは広告のためにクッキーを使用しません。",
          point5: "新しい機能や改善が続くたびにお客様にご連絡いたします。",
        },

        call_to_action: {
          title: "アニメを探してみよう！",
          contact_info: "ご質問はお気軽にお問い合わせください。",
        },
      },
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
