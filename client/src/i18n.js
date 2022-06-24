import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      anime: {
        episode: "EPISODES",
        synopsis: "Synopsis",
        add: "Add To Collection",
        delete: "Delete",
      },
      profile: {
        title: "Profile",
        name: "Name",
        last_name: "Last Name",
        email: "Email",
        theme: "Theme",
        save: "Save Changes",
        enjoy: "Enjoy the app?",
        buy_me_a_coffee: "Buy me a coffee",
        crypto: "Donate with Crypto",
        delete: "Delete Account",
        confirm: "Are you sure you want to delete this account?",
        wait: "Please wait...",
      },
      top_animes: {
        title: "Top Animes",
      },
      add_anime: {
        title: "Add Anime",
        search: "Title",
        sort: "Sort",
      },
      search_container: {
        title: "Filter Your Collection",
        search: "Search",
        sort: "Sort",
        clear_filters: "Clear Filters",
      },
      my_animes_container: {
        no_anime_message1: "Couldn't find any anime. Click",
        no_anime_message2: "Here To Add An Anime",
      },
      navbar: {
        home: "My Anime Collection",
        add: "Add Anime",
        top: "Top Animes",
        profile: "Profile",
        logout: "Logout",
      },
      login: {
        title: "Login",
        email: "Email",
        password: "Password",
        switch1: "Not a member yet?",
        switch2: "Register",
        submit: "Submit",
        alert_text: "Login Successful! Redirecting...",
      },
      register: {
        title: "Register",
        name: "Name",
        email: "Email",
        password: "Password",
        submit: "Submit",
        switch1: "Already a member?",
        switch2: "Login",
        alert_text: "User Created! Redirecting...",
      },

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
      anime: {
        episode: "エピソード",
        synopsis: "あらすじ",
        add: "コレクションに追加",
        delete: "削除",
      },

      profile: {
        title: "プロフィール",
        name: "名前",
        last_name: "姓",
        email: "メールアドレス",
        theme: "テーマ",
        save: "変更を保存",
        enjoy: "アプリを楽しんでいますか？",
        buy_me_a_coffee: "コーヒーを買いたいなら",
        crypto: "Cryptoを上げたいなら",
        delete: "アカウントを削除",
        confirm: "本当にアカウントを削除しましょうか？",
        wait: "しばらくお待ちください...",
      },

      top_animes: {
        title: "人気なアニメ",
      },
      add_anime: {
        title: "アニメを追加する",
        search: "タイトル",
        sort: "ソート",
      },

      search_container: {
        title: "コレクションをフィルターしましょう",
        search: "検索",
        sort: "ソート",
        clear_filters: "フィルターをクリア",
      },
      my_animes_container: {
        no_anime_message1: "アニメが見つかりませんでした。",
        no_anime_message2: "ここをクリックしてアニメを追加してください。",
      },
      navbar: {
        home: "マイアニメコレクション",
        add: "アニメを追加",
        top: "トップアニメ",
        profile: "プロフィール",
        logout: "ログアウト",
      },
      login: {
        title: "ログイン",
        email: "メールアドレス",
        password: "パスワード",
        switch1: "登録していませんか？",
        switch2: "登録",
        submit: "送信",
        alert_text: "ログインできました！",
      },
      register: {
        title: "登録",
        name: "名前",
        email: "メールアドレス",
        password: "パスワード",
        submit: "送信",
        switch1: "もう登録しています？",
        switch2: "ログイン",
        alert_text: "登録に成功しました！",
      },
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
            description: "邪魔になるな！カカロットと戦うぞ！",
          },
          pikachu: {
            name: "ピカチュウ",
            description: "ピカチュウ！ ピカピカピカピカ。 ピカピカピカピカ。",
          },
          shinji: {
            name: "シンジ",
            description:
              "アニメコレクションが好きだと思います。 もうEVAを乗りさせないでください",
          },
          pegasus: {
            name: "ペグサス",
            description:
              "ユーは史上最高のアプリを作成した~~~グッドジョブZachyボイ！",
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
